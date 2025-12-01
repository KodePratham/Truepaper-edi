'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CHAIN_CONFIG, CONTRACT_ADDRESS } from '@/config/contract';

const CONTRACT_ABI = [
  "function getAllCertificateIds() external view returns (bytes32[])",
  "function verifyCertificate(bytes32 _certificateId) external view returns (bool isValid, string memory personName, string memory ipfsHash, address issuer, uint256 timestamp, bool isRevoked)"
];

export default function CertificatesList() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const provider = new ethers.JsonRpcProvider(CHAIN_CONFIG.rpcUrl);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        
        const ids = await contract.getAllCertificateIds();
        
        const items = await Promise.all(ids.map(async (id: string) => {
          const [isValid, name, ipfsHash, issuer, timestamp, isRevoked] = 
            await contract.verifyCertificate(id);
            
          return {
            id,
            name,
            ipfsHash,
            issuer,
            date: new Date(Number(timestamp) * 1000).toLocaleString(),
            isValid: isValid && !isRevoked,
            isRevoked
          };
        }));
        
        setCertificates(items.reverse()); // Show newest first
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCertificates();
  }, []);

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h1 style={styles.title}>Issued Certificates</h1>
        <p style={styles.subtitle}>Registry of all certificates on BSC Testnet</p>

        {loading ? (
          <div style={styles.loading}>Loading registry...</div>
        ) : (
          <div style={styles.grid}>
            {certificates.map((cert) => (
              <div key={cert.id} style={styles.card}>
                <div style={styles.cardHeader}>
                    <span style={cert.isValid ? styles.badgeValid : styles.badgeRevoked}>
                        {cert.isValid ? 'Valid' : 'Revoked'}
                    </span>
                    <span style={styles.date}>{cert.date}</span>
                </div>
                <h3 style={styles.name}>{cert.name}</h3>
                <p style={styles.id}>ID: {cert.id.substring(0, 10)}...{cert.id.substring(cert.id.length - 6)}</p>
                <div style={styles.actions}>
                    <a 
                        href={`https://gateway.pinata.cloud/ipfs/${cert.ipfsHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.link}
                    >
                        📄 View Document
                    </a>
                    <a 
                        href={`https://testnet.bscscan.com/address/${cert.issuer}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.issuerLink}
                    >
                        👤 Issuer
                    </a>
                </div>
              </div>
            ))}
            {certificates.length === 0 && <p>No certificates found.</p>}
          </div>
        )}
      </div>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    minHeight: '100vh',
    padding: '2rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#f8fafc',
    color: '#1e293b',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    marginBottom: '0.5rem',
    color: '#0f172a',
  },
  subtitle: {
    color: '#64748b',
    marginBottom: '2rem',
    fontSize: '1.1rem',
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    color: '#64748b',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  badgeValid: {
    backgroundColor: '#dcfce7',
    color: '#166534',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  badgeRevoked: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  date: {
    fontSize: '0.875rem',
    color: '#94a3b8',
  },
  name: {
    fontSize: '1.25rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    color: '#0f172a',
  },
  id: {
    fontSize: '0.875rem',
    color: '#64748b',
    fontFamily: 'monospace',
    marginBottom: '1.5rem',
    backgroundColor: '#f1f5f9',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    display: 'inline-block',
  },
  actions: {
    marginTop: 'auto',
    display: 'flex',
    gap: '1rem',
    borderTop: '1px solid #f1f5f9',
    paddingTop: '1rem',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    flex: 1,
  },
  issuerLink: {
    color: '#64748b',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
};
