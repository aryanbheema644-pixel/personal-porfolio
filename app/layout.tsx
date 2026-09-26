import type { Metadata, Viewport } from 'next';
import { Inter, Pixelify_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const pixel = Pixelify_Sans({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-pixelify' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains' });

export const metadata: Metadata = {
  title: 'Aryan Bheema — press start',
  description:
    "GTM engineer in the Founder's Office at Beyond Border. Metallurgy student at NIT Warangal. Play through the journey.",
};

export const viewport: Viewport = {
  themeColor: '#0c0e1f',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // extensions (e.g. rtrvr) inject attributes on <html> before hydration
    <html lang="en" className={`${inter.variable} ${pixel.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
