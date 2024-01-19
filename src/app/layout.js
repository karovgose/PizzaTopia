import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import AppContext from '@/components/AppContext';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PizzaTopia',
  description: 'Delivering delicious pizzas to your doorstep!',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="scroll-smooth focus:scroll-auto"
      data-theme="cupcake"
    >
      <body className={inter.className}>
        <main className="max-w-4xl mx-auto p-4">
          <AppContext>
            <Toaster />
            <Header />
            {children}
          </AppContext>
          <Footer />
        </main>
      </body>
    </html>
  );
}
