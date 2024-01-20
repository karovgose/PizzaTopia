'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();

    // Check if passwords match
    if (password !== repeatPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setCreatingUser(true);
    setError(false);
    const loadingToast = toast.loading('Creating user...', { duration: 0 });

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json(); // Parse the response data

      if (data.message === 'Email already exists') {
        // Check if the email already exists
        toast.error('Email already exists.'); // Show an error message
      } else if (!response.ok) {
        setError(true);
        toast.error('Error creating user. Please try again.');
      } else {
        setUserCreated(true);
        setEmail('');
        setPassword('');
        setRepeatPassword(''); // Clear the repeated password
        toast.success('User created successfully!');
      }
    } catch {
      setError(true);
      toast.error('Error creating user. Please try again.');
    } finally {
      toast.dismiss(loadingToast);
      setCreatingUser(false);
    }
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-red-500 text-4xl mb-4">Register</h1>
      {userCreated && (
        <div className="my-4 text-center">
          User created. <br /> Now you can{' '}
          <Link href={'/login'} className="underline">
            Login »
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
        <input
          type="password"
          placeholder="repeat password"
          value={repeatPassword} // Use the repeatPassword state variable
          onChange={(e) => setRepeatPassword(e.target.value)} // Update the repeatPassword state variable
          disabled={creatingUser}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
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
          Already have a account?{' '}
          <Link href={'/login'} className="underline">
            Login here »
          </Link>
        </div>
      </form>
    </section>
  );
}
