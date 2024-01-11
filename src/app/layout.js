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

function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-4 rounded-lg mt-2">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center py-2">
        <div className="md:w-1/2 text-center md:text-left">
          <Link
            href="/"
            className="text-2xl text-red-500 font-bold tracking-wider"
          >
            PizzaTopia
          </Link>
          <p className="mt-2 text-gray-300">
            Delivering delicious pizzas to your doorstep!
          </p>
        </div>

        <div className="flex justify-center md:justify-end mt-4 md:mt-0">
          <ul className="flex gap-6">
            <li>
              <Link
                href="/"
                className="hover:text-red-400 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/menu"
                className="hover:text-red-400 transition duration-300"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                href="/#about"
                className="hover:text-red-400 transition duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/#contact"
                className="hover:text-red-400 transition duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 py-4 text-sm text-gray-400 text-center">
        © 2023 PizzaTopia. All rights reserved.
      </div>
    </footer>
  );
}

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

            <Footer />
          </AppContext>
        </main>
      </body>
    </html>
  );
}
