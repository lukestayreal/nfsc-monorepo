import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@heroicons/react/16/solid'

export default function Banner() {
  const t = useTranslations('HomePage');

  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-5 text-center">
      <h3 className="font-semibold">WiMG</h3>
      <h2 className="text-5xl font-bold tracking-wide">{t('title')}</h2>
      <p className="tracking-wide">
        Read along to understand Miles Guo better, so to understand the word.
      </p>
      <Button href="/">Get Started</Button>
    </div>
  );
}
