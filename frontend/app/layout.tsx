import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tee Studio',
  description: 'Custom T-shirt design app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '1rem', background: '#333', color: '#fff' }}>
          <h1>Tee Studio</h1>
        </header>
        <main style={{ padding: '2rem' }}>{children}</main>
        <footer style={{ padding: '1rem', background: '#f1f1f1', textAlign: 'center' }}>
          © {new Date().getFullYear()} Tee Studio
        </footer>
      </body>
    </html>
  );
}
