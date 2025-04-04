import { Metadata } from 'next'
import '../../globals.css'
import 'easymde/dist/easymde.min.css'
import { SessionProvider } from 'next-auth/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { Providers } from '../providers'
import { Layout } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Who is Miles Guo? | WiMG',
  description:
    'Stay informed with product updates, company news, and insights on how to sell smarter at your company.',
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    redirect('/en')
  }

  setRequestLocale(locale)

  return (
    <html lang={locale} className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap"
        />
        <meta name="apple-mobile-web-app-title" content="WiMG" />
      </head>
      <body className="flex h-full overflow-x-hidden bg-zinc-50 antialiased dark:bg-black">
        <SessionProvider>
          <NextIntlClientProvider>
            <Providers>
              <div className="flex w-full">
                <Layout>{children}</Layout>
              </div>
              <Analytics />
            </Providers>
          </NextIntlClientProvider>
        </SessionProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
