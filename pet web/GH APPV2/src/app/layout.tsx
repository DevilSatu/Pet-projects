import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GitHub Profile Analyzer',
  description: 'Analyze GitHub profiles and build professional resumes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-github-bg">
        {children}
      </body>
    </html>
  );
}
