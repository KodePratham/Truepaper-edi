'use client';

import { useState, useRef } from 'react';
import { ethers } from 'ethers';
import { CHAIN_CONFIG } from '@/config/contract';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
const CONTRACT_ABI = [
  "function issueCertificate(string calldata _personName, string calldata _ipfsHash) external returns (bytes32)",
  "function revokeCertificate(bytes32 _certificateId) external",
  "function authorizeIssuer(address _issuer) external",
  "function authorizedIssuers(address) external view returns (bool)",
  "event CertificateIssued(bytes32 indexed certificateId, string personName, string ipfsHash, address indexed issuer, uint256 timestamp)"
];

const MAX_FILE_SIZE = 100 * 1024 * 1024;

export default function AdminPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [personName, setPersonName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [revokeId, setRevokeId] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask!');
      return;
    }
    try {
      const chainIdHex = '0x' + CHAIN_CONFIG.chainId.toString(16);
      
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainIdHex }],
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: chainIdHex,
              chainName: CHAIN_CONFIG.chainName,
              nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
              rpcUrls: [CHAIN_CONFIG.rpcUrl],
              blockExplorerUrls: [CHAIN_CONFIG.blockExplorer],
            }],
          });
        }
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setWalletAddress(accounts[0]);
    } catch (err: any) {
      alert(`Error connecting: ${err.message}`);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert('File size must be under 100MB');
      return;
    }

    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file');
      return;
    }

    setSelectedFile(file);
  }

  async function uploadToPinata(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const metadata = JSON.stringify({
      name: `TruePaper_${personName}_${Date.now()}`,
    });
    formData.append('pinataMetadata', metadata);

    const response = await fetch('/api/ipfs', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to upload to IPFS');
    }

    const data = await response.json();
    return data.IpfsHash;
  }

  async function issueCertificate() {
    if (!walletAddress) {
      alert('Connect wallet first');
      return;
    }
    if (!personName.trim()) {
      alert('Enter person name');
      return;
    }
    if (!selectedFile) {
      alert('Select a PDF file');
      return;
    }

    setLoading(true);
    setUploadProgress(0);
    try {
      setResult('Uploading PDF to IPFS...');
      setUploadProgress(30);
      const ipfsHash = await uploadToPinata(selectedFile);
      setUploadProgress(60);

      setResult('Issuing certificate on blockchain...');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.issueCertificate(personName, ipfsHash);
      setUploadProgress(80);
      const receipt = await tx.wait();

      const event = receipt.logs.find((log: any) => {
        try {
          const parsed = contract.interface.parseLog(log);
          return parsed?.name === 'CertificateIssued';
        } catch {
          return false;
        }
      });

      let certificateId = '';
      if (event) {
        const parsed = contract.interface.parseLog(event);
        certificateId = parsed?.args[0];
      }

      setUploadProgress(100);
      setResult(
        `✅ Certificate Issued!\n\n` +
        `Certificate ID: ${certificateId}\n` +
        `Person: ${personName}\n` +
        `IPFS Hash: ${ipfsHash}\n` +
        `PDF Link: https://gateway.pinata.cloud/ipfs/${ipfsHash}\n` +
        `Transaction: ${tx.hash}\n` +
        `View on Explorer: ${CHAIN_CONFIG.blockExplorer}/tx/${tx.hash}`
      );

      setPersonName('');
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      setResult(`Error: ${err.message}`);
    }
    setLoading(false);
  }

  async function revokeCertificate() {
    if (!walletAddress) {
      alert('Connect wallet first');
      return;
    }
    if (!revokeId.trim()) {
      alert('Enter certificate ID to revoke');
      return;
    }

    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.revokeCertificate(revokeId);
      await tx.wait();

      setResult(`✅ Certificate Revoked!\n\nCertificate ID: ${revokeId}\nTransaction: ${tx.hash}`);
      setRevokeId('');
    } catch (err: any) {
      setResult(`Error: ${err.message}`);
    }
    setLoading(false);
  }

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>🔐 TruePaper Admin</h1>
      <p style={styles.subtitle}>Certificate Management Panel</p>

      <button onClick={connectWallet} style={styles.connectBtn}>
        {walletAddress 
          ? `🔗 ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` 
          : '🦊 Connect MetaMask'}
      </button>

      <section style={styles.section}>
        <h2>📝 Issue Certificate</h2>
        <input
          placeholder="Person's Full Name"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          style={styles.input}
        />
        <div style={styles.fileUpload}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            style={styles.fileInput}
          />
          {selectedFile && (
            <p style={styles.fileName}>
              📄 {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div style={styles.progressBar}>
            <div style={{ ...styles.progress, width: `${uploadProgress}%` }} />
          </div>
        )}
        <button onClick={issueCertificate} disabled={loading} style={styles.button}>
          {loading ? '⏳ Processing...' : '🎓 Issue Certificate'}
        </button>
      </section>

      <section style={styles.section}>
        <h2>🗑️ Revoke Certificate</h2>
        <input
          placeholder="Certificate ID to revoke (0x...)"
          value={revokeId}
          onChange={(e) => setRevokeId(e.target.value)}
          style={styles.input}
        />
        <button onClick={revokeCertificate} disabled={loading} style={styles.revokeButton}>
          {loading ? '⏳ Processing...' : '❌ Revoke Certificate'}
        </button>
      </section>

      {result && (
        <pre style={styles.result}>{result}</pre>
      )}

      <footer style={styles.footer}>
        <p>Network: {CHAIN_CONFIG.chainName} (Chain ID: {CHAIN_CONFIG.chainId})</p>
        <a href="/" style={styles.backLink}>← Back to Verification</a>
      </footer>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    padding: '2rem',
    maxWidth: '700px',
    margin: '0 auto',
    fontFamily: 'system-ui, sans-serif',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '2rem',
  },
  connectBtn: {
    display: 'block',
    width: '100%',
    padding: '1rem',
    fontSize: '1.1rem',
    backgroundColor: '#7c3aed',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '2rem',
  },
  section: {
    marginBottom: '2rem',
    padding: '1.5rem',
    border: '1px solid #ddd',
    borderRadius: '12px',
    backgroundColor: '#fafafa',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  fileUpload: {
    marginBottom: '1rem',
  },
  fileInput: {
    width: '100%',
    padding: '0.5rem',
  },
  fileName: {
    marginTop: '0.5rem',
    color: '#333',
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#eee',
    borderRadius: '4px',
    marginBottom: '1rem',
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#7c3aed',
    transition: 'width 0.3s',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  revokeButton: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#dc2626',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  result: {
    background: '#f5f5f5',
    padding: '1rem',
    borderRadius: '8px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
    fontSize: '0.9rem',
    lineHeight: '1.6',
  },
  footer: {
    textAlign: 'center',
    marginTop: '2rem',
    color: '#666',
    fontSize: '0.9rem',
  },
  backLink: {
    color: '#7c3aed',
    textDecoration: 'none',
  },
};
