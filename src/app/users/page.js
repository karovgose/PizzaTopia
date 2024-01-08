'use client';
import Tabs from '@/components/Tabs';
import { UseProfile } from '@/components/UseProfile';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function UsersPage() {
  const { loading, data } = UseProfile();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users').then((response) => {
      response.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

  if (loading) {
    return <span className="loading loading-ring loading-md"></span>;
  }

  if (!data.admin) {
    return 'Not an admin';
  }

  return (
    <section className="mt-8 mx-auto max-w-lg">
      <Tabs isAdmin={true} />
      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex flex-col sm:flex-row items-center gap-4"
            >
              <div className="flex-grow sm:grid sm:grid-cols-2 sm:gap-4">
                <div className="text-gray-900 text-center p-1">
                  {!!user.name && <span>{user.name}</span>}
                  {!user.name && <span className="italic">No name</span>}
                </div>
                <span className="text-gray-500">{user.email}</span>
              </div>
              <div className="sm:mt-0 mt-2">
                <Link className="button" href={'users/' + user._id}>
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
