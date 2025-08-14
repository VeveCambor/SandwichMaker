import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SandwichMaker - Kdo chystá chlebíčky?',
  description: 'Aplikace pro sledování, kdo tento měsíc chystá chlebíčky',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
