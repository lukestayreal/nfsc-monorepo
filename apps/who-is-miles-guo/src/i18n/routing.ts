import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale } from '../../constants/app.constants';

export const routing = defineRouting({
  locales,
  defaultLocale,
});
