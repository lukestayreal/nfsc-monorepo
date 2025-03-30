'use client';

import Image from 'next/image';
import Link from 'next/link';
import Markdown from 'react-markdown';

export const components = {
  a: (a: { href: string; children: any }) => {
    return (
      <Link href={`${a.href}`} target="_blank">
        {a.children?.toString()}{' '}
      </Link>
    );
  },
  img: (img: { src: any; alt: any }) => {
    return (
      <div className="relative mx-auto h-auto w-full">
        <Image
          className="object-fill"
          priority
          src={img.src}
          alt={img.alt}
          width={800}
          height={400}
        />
      </div>
    );
  },
};
export default function WimgMarkdown({ children }: any) {
  return <Markdown children={children} components={components as any} />;
}
