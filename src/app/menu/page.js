'use client';
import MenuItem from '@/components/MenuItem';
import SectionHeaders from '@/components/SectionHeaders';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const session = useSession();
  const { status } = session;
  useEffect(() => {
    fetch('api/categories').then((response) =>
      response.json().then((categories) => setCategories(categories))
    );
    fetch('api/menu-items').then((response) =>
      response.json().then((menuItems) => setMenuItems(menuItems))
    );
  }, []);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-bars loading-md"></span>
      </div>
    );
  }

  return (
    <section>
      {categories?.length > 0 &&
        categories.map((category) => (
          <div key={category._id}>
            <div className="text-center">
              <SectionHeaders mainHeader={category.name} />
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
              {menuItems
                .filter((item) => item.category === category._id)
                .map((item) => (
                  <div key={item._id}>
                    <MenuItem {...item} />
                  </div>
                ))}
            </div>
          </div>
        ))}
    </section>
  );
}
