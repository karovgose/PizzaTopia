'use client';
import React, { useContext, useState } from 'react';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { CartContext } from './AppContext';
import { MenuIcon, ShoppingCartIcon } from 'lucide-react';

export default function Header() {
  const session = useSession();
  const status = session.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }

  function AuthLinks({ status }) {
    if (status === 'authenticated') {
      return (
        <>
          <Link className="whitespace-nowrap" href={'/profile'}>
            Hello, {userName}
          </Link>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-8 py-2 rounded-full"
          >
            Logout
          </button>
        </>
      );
    } else {
      return (
        <>
          {' '}
          <Link href="/login">Login</Link>
          <Link
            className="bg-red-500 text-white px-8 py-2 rounded-full"
            href="/register"
          >
            Register
          </Link>
        </>
      );
    }
  }

  return (
    <header>
      <div className="flex justify-between md:hidden">
        {' '}
        <Link href="/" className="text-red-600 font-semibold">
          PizzaTopia
        </Link>
        <div className="flex items-center gap-8">
          <Link href={'/cart'} className="relative">
            <ShoppingCartIcon />
            {cartProducts?.length > 0 && (
              <span
                className="absolute
           -top-3 -right-4 bg-red-500 text-white text-xs py-1 px-2 rounded-full leading-3"
              >
                {cartProducts.length}
              </span>
            )}
          </Link>
          <button
            className="p-1 border-0"
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center"
        >
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
          <AuthLinks status={status} />
        </div>
      )}

      <div className="hidden md:flex items-center justify-between">
        {' '}
        <nav className="flex items-center gap-8 text-slate-500 font-semibold justify-evenly flex-grow">
          <Link href="/" className="text-red-600 font-semibold">
            PizzaTopia
          </Link>
          <div className="flex justify-center gap-3 space-x-5">
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/#about">About</Link>
            <Link href="/#contact">Contact</Link>
          </div>
        </nav>
        <nav className="flex items-center gap-4 text-slate-500 font-semibold">
          <AuthLinks status={status} />
          <Link href={'/cart'} className="relative">
            <ShoppingCartIcon />
            {cartProducts?.length > 0 && (
              <span
                className="absolute
     -top-3 -right-4 bg-red-500 text-white text-xs py-1 px-2 rounded-full leading-3"
              >
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
