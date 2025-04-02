import React from 'react';
import { useTranslations } from 'next-intl';

export default function Banner() {
  const t = useTranslations('HomePage');

  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-5 text-center">
      <h3 className="font-semibold">WiMG</h3>
      <h2 className="text-5xl font-bold tracking-wide">{t('title')}</h2>
      <p className="tracking-wide">{t('subtitle', { firstName: 'World' })}</p>
    </div>
  );
}
