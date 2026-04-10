import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'GMF Festival Map',
  description: 'Interactive festival map for GMF'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
