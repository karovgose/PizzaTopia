import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import Header from '@/components/Header';
import AppContext from '@/components/AppContext';
import { Toaster } from 'react-hot-toast';
import { ArrowBigUpIcon } from 'lucide-react';

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

            <footer className="p-8">
              <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="md:w-1/2 text-center md:text-left">
                  <Link href="/" className="text-red-600 font-semibold">
                    PizzaTopia
                  </Link>
                  <p className="mt-2">
                    Delivering delicious pizzas to your doorstep!
                  </p>
                </div>

                <div className="flex justify-center md:justify-end mt-4 md:mt-0">
                  <ul className="flex gap-6">
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href="/menu">Menu</Link>
                    </li>
                    <li>
                      <Link href="/#about">About</Link>
                    </li>
                    <li>
                      <Link href="/#contact">Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-500 mt-8 pt-4 text-sm text-gray-500 text-center">
                © 2023 PizzaTopia. All rights reserved.
              </div>
            </footer>
          </AppContext>
        </main>
      </body>
    </html>
  );
}
