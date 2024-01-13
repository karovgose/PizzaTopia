import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          We couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link href="/">
          <span className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-ful">
            Return Home
          </span>
        </Link>
      </div>
    </div>
  );
}
