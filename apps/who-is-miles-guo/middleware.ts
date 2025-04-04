import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export { auth as middleware } from './auth';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|studio|feed.xml|.*\\..*).*)',
};
