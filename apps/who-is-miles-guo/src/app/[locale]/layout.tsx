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
import { LocaleEnum } from '../../../constants/app.constants'

type props = {
  params: Promise<{ locale: LocaleEnum }>
}

export async function generateMetadata({ params }: props): Promise<Metadata> {
  const { locale } = await params

  const title = locale === 'en' ? 'Who is Miles Guo?' : '谁是郭文贵？'
  const description =
    locale === 'en' ? 'Click to know more about Miles Guo' : '点击了解更多'

  const images = [
    {
      url:
        locale === 'en'
          ? 'https://whoismilesguo.info/banner-en.png'
          : 'https://whoismilesguo.info/banner-zh.png',
      alt: 'Who is Miles Guo?',
    },
  ]

  return {
    title,
    description,
    keywords: [
      'miles guo',
      '郭文贵',
      'whistleblower',
      'whistleblower movement',
      '新中国联邦',
    ],
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
    openGraph: {
      title,
      description,
      images,
    },
  }
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
