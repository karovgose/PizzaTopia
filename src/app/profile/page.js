'use client';
import EditableImage from '@/components/EditableImage';
import MenuItemForm from '@/components/MenuItemForm';
import Tabs from '@/components/Tabs';
import UserForm from '@/components/UserForm';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const session = useSession();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile')
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setIsAdmin(data.admin);
        });
    }
  }, [session, status]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-bars loading-md"></span>
      </div>
    );
  }
  if (status === 'unauthenticated') return redirect('/login');

  async function handleProfileUpdate(e, data) {
    e.preventDefault();
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await toast.promise(Promise.resolve(), {
          loading: 'Saving...',
          success: 'Profile saved!',
        });
      } else {
        await toast.promise(Promise.reject(), {
          loading: 'Saving...',
          error: 'Profile update failed!',
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function fileChange(e) {
    const files = e?.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set('file', files[0]);

      const uploadingPromise = new Promise(async (resolve, reject) => {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: data,
        });
        const srcImg = await response.json();
        setLink(srcImg);
        if (response.ok) resolve();
        else reject();
      });
      await toast.promise(uploadingPromise, {
        loading: 'Uploading....',
        success: 'Upload complete!',
        error: 'Upload complete! fail!',
      });
    }
  }

  return (
    <section className="mt-8">
      <Tabs isAdmin={isAdmin} />

      <div className="max-w-lg mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileUpdate} />
      </div>
    </section>
  );
}
