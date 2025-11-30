import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TruePaper - Blockchain Certificate Verification',
  description: 'Issue and verify certificates on BSC blockchain with PDF storage on IPFS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#fff' }}>{children}</body>
    </html>
  );
}
