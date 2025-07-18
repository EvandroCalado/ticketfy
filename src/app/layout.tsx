import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { SpeedInsights } from '@vercel/speed-insights/next';

import { Toaster } from '@/components/ui/sonner';

import './globals.css';
import { ThemeProvider } from './theme-provider';

const primary = Inter({
  variable: '--font-primary',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Ticketfy',
    default: 'Ticketfy',
  },
  description: 'Uma plataforma de tickets',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='pt-BR' suppressHydrationWarning>
      {/* <ReactScan /> */}
      <body className={`${primary.variable} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster position='top-right' invert richColors />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
