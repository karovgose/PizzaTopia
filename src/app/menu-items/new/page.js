'use client';
import { UseProfile } from '@/components/UseProfile';
import Tabs from '@/components/Tabs';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { ArrowLeftCircle } from 'lucide-react';
import { redirect } from 'next/navigation';
import MenuItemForm from '@/components/MenuItemForm';

export default function NewMenuItemPage() {
  const { loading, data } = UseProfile();

  const [redirectTo, setRedirectTo] = useState(false);
  if (loading) {
    return 'Loading user info...';
  }
  if (!data.admin) {
    return 'Not an admin!';
  }

  async function handleFormSubmit(e, data) {
    e.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menu-items', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: 'Saving item....',
      success: 'Item saved!',
      error: 'Saving item fail!',
    });
    setRedirectTo(true);
  }

  if (redirectTo) {
    return redirect('/menu-items');
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
    <section className="mt-8 max-w-lg mx-auto">
      <Tabs isAdmin={true} />
      <div className="m-w-md mx-auto mt-8">
        <Link href={'/menu-items'} className="button flex gap-2 justify-center">
          <ArrowLeftCircle />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
}
