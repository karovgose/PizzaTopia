'use client';

import { UseProfile } from '@/components/UseProfile';
import Tabs from '@/components/Tabs';
import MenuItemForm from '@/components/MenuItemForm';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { ArrowLeftCircle } from 'lucide-react';
import { redirect, useParams } from 'next/navigation';
import DeleteButton from '@/components/DeleteButton';

export default function EditMenuItemPage() {
  const { loading, data } = UseProfile();
  const { id } = useParams();
  const [redirectTo, setRedirectTo] = useState(false);
  const [menuItem, setMenuItem] = useState(null);

  useEffect(() => {
    fetch('/api/menu-items').then((response) => {
      response.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItem(item);
      });
    });
  }, [id]);

  if (loading) {
    return 'Loading user info...';
  }
  if (!data.admin) {
    return 'Not an admin!';
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

  async function handleFormSubmit(e, data) {
    e.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menu-items', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: 'Update item....',
      success: 'Update item complete!',
      error: 'Update item fail!',
    });
    setRedirectTo(true);
  }

  async function handleDeleteMenuItem() {
    const promiseDelete = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menu-items?_id=' + id, {
        method: 'DELETE',
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(promiseDelete, {
      loading: 'Deleting item....',
      success: 'Deleting item complete!',
      error: 'Deleting item fail!',
    });
    setRedirectTo(true);
  }

  if (redirectTo) {
    return redirect('/menu-items');
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <Tabs isAdmin={true} />
      <div className="max-w-lg mx-auto mt-8">
        <Link href={'/menu-items'} className="button flex gap-2 justify-center">
          <ArrowLeftCircle />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
      <div className="max-w-md mx-auto mt-4">
        <div className="max-w-xs ml-auto pl-4">
          <DeleteButton
            label={'Delete this menu item'}
            onDelete={handleDeleteMenuItem}
          />
        </div>
      </div>
    </section>
  );
}
