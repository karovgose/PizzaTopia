import { FileQuestion, Home, Phone, Utensils } from 'lucide-react';
import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="min-w-full bg-gray-900 rounded-lg text-white p-4 mt-2">
      {' '}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center py-2">
        {' '}
        <div className="md:w-1/2 text-center md:text-left">
          {' '}
          <Link
            href="/"
            className="text-2xl  hover:text-red-500 transition-all duration-300 font-bold tracking-wider"
          >
            {' '}
            PizzaTopia{' '}
          </Link>{' '}
          <p className="mt-2">
            {' '}
            Delivering delicious pizzas to your doorstep!{' '}
          </p>{' '}
        </div>{' '}
        <div className="flex justify-center md:justify-end mt-4 md:mt-0">
          {' '}
          <ul className="flex gap-6">
            {' '}
            <li>
              {' '}
              <Link
                href="/"
                className="hover:text-red-600 transition duration-300"
              >
                {' '}
                <Home />{' '}
              </Link>{' '}
            </li>{' '}
            <li>
              {' '}
              <Link
                href="/menu"
                className="hover:text-red-600 transition duration-300"
              >
                {' '}
                <Utensils />{' '}
              </Link>{' '}
            </li>{' '}
            <li>
              {' '}
              <Link
                href="/#about"
                className="hover:text-red-600 transition duration-300"
              >
                {' '}
                <FileQuestion />{' '}
              </Link>{' '}
            </li>{' '}
            <li>
              {' '}
              <Link
                href="/#contact"
                className="hover:text-red-600 transition duration-300"
              >
                {' '}
                <Phone />{' '}
              </Link>{' '}
            </li>{' '}
          </ul>{' '}
        </div>{' '}
      </div>{' '}
      <div className=" py-4 text-sm  text-center">
        {' '}
        © 2023 PizzaTopia. All rights reserved.{' '}
      </div>{' '}
    </footer>
  );
}
