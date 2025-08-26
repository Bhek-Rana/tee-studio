
import { GoogleOAuthProvider } from '@react-oauth/google';
import './globals.css';
import type { Metadata } from 'next';
import Provider from './provider';

export const metadata: Metadata = {
  title: 'Tee Studio',
  description: 'Custom T-shirt design app',
};

export default function RootLayout({
  children,
}: Readonly <{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       className={'${geistSans.variable} ${geistMono.variable'}
       >
         <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
        <div className='px-10 md:px-20 lg:px-36 '>
          <Provider>
             {children}

          </Provider>
          
        </div>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

