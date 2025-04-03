import { Link } from '@/i18n/navigation';
import clsx from 'clsx';
import React from 'react';

export default function Logo({
  className,
}: {
  className?: string;
}) {
  return (
    <Link href={`/`} title="Home">
      <h2
        className={clsx(
          'text-lg font-semibold px-4 group-hover:text-pink-700 duration-300',
          className
        )}
      >
        WiMG
      </h2>
    </Link>
  );
}
