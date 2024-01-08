'use client';

import Tabs from '@/components/Tabs';
import { UseProfile } from '@/components/UseProfile';
import { ArrowRightCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MenuItemsPage() {
  const { loading, data } = UseProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('/api/menu-items').then((response) => {
      response.json().then((menuItems) => {
        setMenuItems(menuItems);
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
    <section className="mt-8 max-w-2xlg mx-auto">
      <Tabs isAdmin={true} />
      <div className="mt-8">
        <Link
          className="button flex gap-2 justify-center"
          href={'/menu-items/new'}
        >
          <span>Create new menu item</span>
          <ArrowRightCircle />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
        <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
          {menuItems.length > 0 &&
            menuItems.map((item) => (
              <Link
                href={'/menu-items/edit/' + item._id}
                className="bg-gray-200 rounded-lg p-4 flex flex-col justify-center items-center"
                key={item.id}
              >
                <div className="relative">
                  <Image src={item.image} alt="" width={200} height={200} />
                </div>
                <div className="text-center mt-2">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
