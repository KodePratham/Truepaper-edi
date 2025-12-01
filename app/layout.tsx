import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TruePaper - Blockchain Certificate Verification',
  description: 'Verify blockchain-issued certificates with PDF storage on IPFS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#f8fafc' }}>{children}</body>
    </html>
  );
}
