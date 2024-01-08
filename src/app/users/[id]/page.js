'use client';
import Tabs from '@/components/Tabs';
import { UseProfile } from '@/components/UseProfile';
import UserForm from '@/components/UserForm';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function EditUserPage() {
  const { loading, data } = UseProfile();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/profile?_id=' + id).then((response) => {
      response.json().then((user) => {
        setUser(user);
      });
    });
  }, []);

  function handleSaveButtonClick(e, data) {
    e.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...user, ...data, _id: id }),
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    toast.promise(savingPromise, {
      loading: 'Saving user...',
      success: 'User saved!',
      error: 'User saving failed!',
    });
  }

  if (loading) {
    return 'Loading user info...';
  }

  if (!data.admin) {
    return 'Not an admin';
  }

  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <Tabs isAdmin={true} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
}
