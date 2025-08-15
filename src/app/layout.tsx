import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { LazySpeedInsights } from '@/components/shared/lazy-speed-insights';
import { LazyToaster } from '@/components/shared/lazy-toaster';

import './globals.css';
import { ThemeProvider } from './theme-provider';

const primary = Inter({
  variable: '--font-primary',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
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
      <body className={`${primary.variable} antialiased`}>
        <NuqsAdapter>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <LazyToaster />
          <LazySpeedInsights />
        </NuqsAdapter>
      </body>
    </html>
  );
};

export default RootLayout;
