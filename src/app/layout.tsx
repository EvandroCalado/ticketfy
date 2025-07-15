import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ReactScan } from '@/components/shared/react-scan';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';
import { ThemeProvider } from './theme-provider';

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
    <html lang='pt-BR' suppressHydrationWarning>
      <ReactScan />
      <body className={`${primary.variable}`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster position='top-right' invert richColors />
      </body>
    </html>
  );
};

export default RootLayout;
