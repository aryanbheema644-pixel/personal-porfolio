import type { Metadata } from 'next';
import { Inter, Comic_Neue, VT323, Anton } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const comicNeue = Comic_Neue({ subsets: ['latin'], weight: ['700'], variable: '--font-comic-neue' });
const vt323 = VT323({ subsets: ['latin'], weight: ['400'], variable: '--font-vt323' });
const anton = Anton({ subsets: ['latin'], weight: ['400'], variable: '--font-anton' });

export const metadata: Metadata = {
  title: 'aryan bheema — portfolio',
  description: 'nice brainrot portfolio. tap right.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${comicNeue.variable} ${vt323.variable} ${anton.variable}`}
    >
      <body className="font-sans antialiased bg-black overflow-hidden">{children}</body>
    </html>
  );
}
