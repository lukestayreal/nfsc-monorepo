import { FileQuestion } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const NotFoundPage = async () => {
  const heads = await headers();

  const pathname = heads.get('x-invoke-path') || '';

  if (pathname === '') redirect('/en');

  return (
    <html lang="en">
      <body>
        <div className="flex items-center justify-center py-32 flex-col text-center">
          <FileQuestion className="h-24 w-24 text-gray-400 mb-8 animate-pulse" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            404 - Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Oops! The page you&apos;re looking for doesn&apos;t exit or has been
            moved
          </p>
          <Link
            href={'/'}
            className=" bg-black text-white py-2 px-6 rounded-full hover:scale-110 transition-all ease-in-out transform duration-300"
          >
            Go back home
          </Link>
        </div>
      </body>
    </html>
  );
};
export default NotFoundPage;
