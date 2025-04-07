import { type Metadata } from 'next'

import NewHomepage from '@/components/new-homepage'
import { setRequestLocale } from 'next-intl/server'
import { LocaleEnum } from '../../../../constants/app.constants'
import { getAllPosts } from '@/sanity/queries'

export const metadata: Metadata = {
  title: 'Speaking',
  description:
    'I’ve spoken at events all around the world and been interviewed for many podcasts.',
}

export default async function Speaking({
  params,
}: {
  params: Promise<{ locale: LocaleEnum }>
}) {
  const { locale } = await params

  setRequestLocale(locale)

  const posts = await getAllPosts(5, locale)

  return <NewHomepage posts={posts}></NewHomepage>
}
