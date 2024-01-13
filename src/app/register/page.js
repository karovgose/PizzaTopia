'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setCreatingUser(true);
    setError(false);
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      setError(true);
    } else {
      setUserCreated(true);
    }
    setCreatingUser(false);
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-red-500 text-4xl mb-4">Register</h1>
      {userCreated && (
        <div className="my-4 text-center">
          User created. <br /> Now you can{' '}
          <Link href={'/login'} className="underline">
            Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          Error <br /> Please try again
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={creatingUser}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={creatingUser}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <div className="my-4 text-gray-500 text-center">
          or login with provider
        </div>
        <button
          className="flex gap-4 justify-center "
          onClick={() => signIn('google', { callbackUrl: '/' })}
          type="button"
        >
          <Image
            src={'/google.png'}
            alt={'google icon'}
            width={24}
            height={24}
          />
          Login with google
        </button>
        <div className="text-center my-4 text-gray-500 pt-2">
          Already have a account?{' '}
          <Link href={'/login'} className="underline">
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
