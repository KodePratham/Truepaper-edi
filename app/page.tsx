'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import Link from 'next/link';
import { CHAIN_CONFIG, CONTRACT_ADDRESS } from '@/config/contract';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const CONTRACT_ABI = [
  "function verifyCertificate(bytes32 _certificateId) external view returns (bool isValid, string memory personName, string memory ipfsHash, address issuer, uint256 timestamp, bool isRevoked)",
];

export default function Home() {
  const [verifyId, setVerifyId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function verifyCertificate() {
    if (!verifyId.trim()) {
      setError('Please enter a certificate ID');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const provider = new ethers.JsonRpcProvider(CHAIN_CONFIG.rpcUrl);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

      const [isValid, name, ipfsHash, issuer, timestamp, isRevoked] = 
        await contract.verifyCertificate(verifyId);

      if (timestamp > 0) {
        const date = new Date(Number(timestamp) * 1000).toLocaleString();
        setResult({
          isValid: isValid && !isRevoked,
          personName: name,
          ipfsHash,
          issuer,
          date,
          isRevoked,
        });
      } else {
        setError('Certificate not found');
      }
    } catch (err: any) {
      setError('Certificate not found or invalid ID format');
    }
    setLoading(false);
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      verifyCertificate();
    }
  }

  return (
    <main style={styles.main}>
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <div style={styles.navLeft}>
            <span style={styles.brand}>TruePaper</span>
            <Link href="/certificates-xyz" style={styles.navLink}>
              Registry
            </Link>
          </div>
          <span style={styles.badge}>BSC Testnet</span>
        </div>
      </nav>

      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Certificate Verification</h1>
          <p style={styles.subtitle}>Verify the authenticity of blockchain-issued documents.</p>

          <div style={styles.searchContainer}>
            <input
              placeholder="Enter Certificate ID (e.g., 0x123...)"
              value={verifyId}
              onChange={(e) => setVerifyId(e.target.value)}
              onKeyPress={handleKeyPress}
              style={styles.searchInput}
            />
            <button onClick={verifyCertificate} disabled={loading} style={styles.searchButton}>
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </div>

          {error && (
            <div style={styles.errorBox}>
              <p style={styles.errorMessage}>⚠️ {error}</p>
            </div>
          )}

          {result && (
            <div style={result.isValid ? styles.validBox : styles.invalidBox}>
              <div style={styles.statusHeader}>
                <span style={styles.statusIcon}>{result.isValid ? '✓' : '✕'}</span>
                <h3 style={styles.statusTitle}>{result.isValid ? 'Valid Certificate' : 'Invalid Certificate'}</h3>
              </div>
              
              <div style={styles.resultDetails}>
                <div style={styles.detailRow}>
                  <span style={styles.label}>Recipient</span>
                  <span style={styles.value}>{result.personName}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.label}>Issued Date</span>
                  <span style={styles.value}>{result.date}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.label}>Issuer</span>
                  <span style={styles.valueMono}>{result.issuer}</span>
                </div>
                
                {result.isRevoked && <div style={styles.revokedBanner}>⚠️ This certificate has been revoked by the issuer.</div>}
                
                <a 
                  href={`https://gateway.pinata.cloud/ipfs/${result.ipfsHash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={styles.pdfButton}
                >
                  View Original Document
                </a>
              </div>
            </div>
          )}
        </div>

        <footer style={styles.footer}>
          <p>Secured by Binance Smart Chain (Testnet)</p>
        </footer>
      </div>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#f8fafc',
    color: '#1e293b',
  },
  navbar: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    padding: '1rem 0',
  },
  navContent: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  navLink: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#64748b',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  brand: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: '-0.025em',
  },
  badge: {
    fontSize: '0.75rem',
    fontWeight: '600',
    backgroundColor: '#F0B90B',
    color: '#000',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    padding: '2.5rem',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: '800',
    marginBottom: '0.75rem',
    color: '#0f172a',
    letterSpacing: '-0.025em',
  },
  subtitle: {
    color: '#64748b',
    marginBottom: '2.5rem',
    fontSize: '1rem',
    lineHeight: '1.5',
  },
  searchContainer: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '2rem',
  },
  searchInput: {
    flex: 1,
    padding: '0.875rem 1rem',
    fontSize: '1rem',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    outline: 'none',
    transition: 'all 0.2s',
    backgroundColor: '#f8fafc',
    fontFamily: 'monospace',
  },
  searchButton: {
    padding: '0.875rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    backgroundColor: '#0f172a',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  errorBox: {
    padding: '1rem',
    backgroundColor: '#fef2f2',
    border: '1px solid #fee2e2',
    borderRadius: '8px',
    color: '#991b1b',
    marginBottom: '1.5rem',
    textAlign: 'left',
  },
  errorMessage: {
    margin: 0,
    fontSize: '0.9rem',
  },
  validBox: {
    border: '1px solid #bbf7d0',
    backgroundColor: '#f0fdf4',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  invalidBox: {
    border: '1px solid #fecaca',
    backgroundColor: '#fef2f2',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  statusHeader: {
    padding: '1rem 1.5rem',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  statusIcon: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  statusTitle: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  resultDetails: {
    padding: '1.5rem',
    textAlign: 'left',
  },
  detailRow: {
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  label: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#64748b',
    fontWeight: '600',
  },
  value: {
    fontSize: '1rem',
    color: '#0f172a',
    fontWeight: '500',
  },
  valueMono: {
    fontSize: '0.9rem',
    color: '#334155',
    fontFamily: 'monospace',
    wordBreak: 'break-all',
  },
  revokedBanner: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    padding: '0.75rem',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '600',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  pdfButton: {
    display: 'block',
    width: '100%',
    marginTop: '1.5rem',
    padding: '0.75rem',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    textDecoration: 'none',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'background-color 0.2s',
  },
  footer: {
    marginTop: '3rem',
    color: '#94a3b8',
    fontSize: '0.875rem',
  },
};
