import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <div className="px-10 md:px-20 lg:px-36">
          {children}
        </div>
      </body>
    </html>
  );
}
