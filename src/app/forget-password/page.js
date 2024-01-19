'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [resetInProgress, setResetInProgress] = useState(false);
  const router = useRouter();

  async function handleFormSubmit(e) {
    e.preventDefault();
    setResetInProgress(true);
    const toastId = toast.loading('Processing...');

    try {
      const response = await fetch('/api/forget-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success(
          'Success! A password reset link has been sent to your email.',
          { id: toastId }
        );
        router.push('/');
      } else {
        toast.error(
          'Failed to initiate password reset. Please check the email and try again.',
          { id: toastId }
        );
      }
    } catch (error) {
      toast.error(
        'An error occurred while initiating the password reset. Please try again later.',
        { id: toastId }
      );
    } finally {
      setResetInProgress(false);
    }
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-red-500 text-4xl mb-4">
        Forgot Password
      </h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          name="email"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={resetInProgress}
        />
        <button type="submit" disabled={resetInProgress}>
          Reset Password
        </button>
      </form>
    </section>
  );
}
