'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoginInProgress(true);

    try {
      const loadingToastId = toast.loading('Logging in...');

      await signIn('credentials', { email, password, callbackUrl: '/' });

      toast.dismiss(loadingToastId);

      toast.success('Login successful');
    } catch {
      toast.dismiss();

      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoginInProgress(false);
    }
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-red-500 text-4xl mb-4">Login</h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          name="email"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loginInProgress}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loginInProgress}
        />
        <button type="submit" disabled={loginInProgress}>
          Login
        </button>
        <div className="text-center my-4 text-gray-500">
          <Link href={'/forget-password'} className="underline">
            Forgot Password?
          </Link>
        </div>
        <div className="my-4 text-gray-500 text-center">
          or login with provider
        </div>
        <button
          className="flex gap-4 justify-center"
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
          Don&apos;t have an account?{' '}
          <Link href={'/register'} className="underline">
            Register here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
