import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ArrowRightCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="mt-4 flex flex-col md:flex-row">
      <div className="flex flex-col justify-center py-4 md:py-12 md:w-1/2">
        <h1 className="text-4xl font-semibold">
          Experience Pizza Paradise Delivered to Your Doorstep
        </h1>
        <p className="my-6 text-gray-500">
          Unleash your taste buds with our exquisite flavors and handcrafted
          pizzas
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href={'/menu'}
            className="bg-red-500 text-white uppercase text-sm px-4 py-2 rounded-full flex gap-2 items-center border-0"
          >
            Order now
            <ArrowRightCircle />
          </Link>
          <Link
            href={'#about'}
            className="flex gap-2 items-center p-y-2 text-gray-600 font-semibold border-0"
          >
            Learn more <ArrowRightCircle />
          </Link>
        </div>
      </div>

      <div className="relative hidden md:block md:w-1/2">
        <div className="w-full h-96 relative">
          <Image
            src="/pizza.png"
            alt="pizza"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </section>
  );
}
