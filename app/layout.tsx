import type { Metadata } from 'next';
import './globals.css';
import NavBar from './components/Navbar/NavBar';

export const metadata: Metadata = {
  title: 'Somewhere In Africa',
  description: 'Admin dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body style={{ backgroundColor: '#efefef' }}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
