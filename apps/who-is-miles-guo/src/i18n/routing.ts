import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zh-Hans', 'zh-Hant'],
  defaultLocale: 'en',
});
