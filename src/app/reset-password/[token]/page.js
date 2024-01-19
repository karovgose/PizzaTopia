'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ResetPasswordPage({ params }) {
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch('/api/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: params.token }),
        });

        if (response.status === 400) {
          setError('Invalid  token or has expired');
          setVerified(true);
        }
        if (response.status === 200) {
          setError('');
          setVerified(true);
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        setError('Try again');
        console.log(error);
      }
    };
    verifyToken();
  }, [params.token]);

  async function handleFormSubmit(e) {
    e.preventDefault();
    const password = e.target[0].value;
    const toastId = toast.loading('Processing...');

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, email: user?.email }),
      });

      if (response.ok) {
        toast.success('Password change successfully!', { id: toastId });
        router.push('/login');
      } else {
        toast.error('Password reset failed.', { id: toastId });
      }
    } catch (error) {
      toast.error('Error resetting password. Please try again later.', {
        id: toastId,
      });
    }
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-red-500 text-4xl mb-4">Reset Password</h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          name="password"
          type="password"
          placeholder="password"
          required
        />
        <button type="submit" disabled={error.length > 0}>
          Reset Password
        </button>
        <p className="text-red-500 text-[16px] mb-4">{error && error}</p>
      </form>
    </section>
  );
}
