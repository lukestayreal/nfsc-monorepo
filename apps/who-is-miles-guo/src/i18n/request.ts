import { getRequestConfig } from 'next-intl/server';
import { hasLocale, IntlErrorCode } from 'next-intl';
import { routing } from './routing';
import { Formats } from 'next-intl';

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        // Missing translations are expected and should only log an error
        console.error(error);
      } else {
        // Other errors indicate a bug in the app and should be reported
        // TODO reportToErrorTracking(error);
      }
    },
 
    getMessageFallback({namespace, key, error}) {
      const path = [namespace, key].filter((part) => part != null).join('.');
 
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return path + ' is not yet translated';
      } else {
        return 'Dear developer, please fix this message: ' + path;
      }
    }
  };
});

export const formats = {
  dateTime: {
    short: {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  },
  number: {
    precise: {
      maximumFractionDigits: 5,
    },
  },
  list: {
    enumeration: {
      style: 'long',
      type: 'conjunction',
    },
  },
} satisfies Formats;
