import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const primary = Inter({
  variable: '--font-primary',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Ticketfy',
    default: 'Ticketfy',
  },
  description: 'A ticketing platform',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='pt-BR'>
      <body className={`${primary.variable}`}>{children}</body>
    </html>
  );
};

export default RootLayout;
