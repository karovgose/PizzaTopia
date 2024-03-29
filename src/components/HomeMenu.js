'use client';
import Image from 'next/legacy/image';
import React, { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import SectionHeaders from './SectionHeaders';
import { useSession } from 'next-auth/react';

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('api/menu-items').then((response) =>
      response.json().then((menuItems) => {
        setBestSellers(menuItems.slice(2, 5));
        setIsLoading(false);
      })
    );
  }, []);

  return (
    <section>
      <div className="hidden md:block absolute  left-0 right-0 w-full">
        <div className="absolute left-0 -top-[70px] -z-10">
          <Image src={'/salad1.png'} alt={'salad'} width={109} height={189} />
        </div>
        <div className="hidden md:block absolute -top-[100px] right-0 -z-10">
          <Image src={'/salad2.png'} alt={'salad'} width={107} height={195} />
        </div>
      </div>

      <div className="text-center my-4">
        <SectionHeaders
          subHeader={'check out'}
          mainHeader={'Our Recommendation'}
        />
      </div>
      {isLoading && (
        <div className="flex justify-center items-center">
          <span className="loading loading-bars loading-md"></span>
        </div>
      )}
      <div className="grid sm:grid-cols-3 gap-4">
        {bestSellers.length > 0 &&
          bestSellers.map((item) => <MenuItem key={item._id} {...item} />)}
      </div>
    </section>
  );
}
