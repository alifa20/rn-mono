import type { Metadata } from 'next';
import { ThemeProviders } from '../theme';

export const metadata: Metadata = {
  title: 'Klotti Seller'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ThemeProviders>{children}</ThemeProviders>
      </body>
    </html>
  );
}
