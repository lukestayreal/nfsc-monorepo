import { getAllPosts } from '@/sanity/queries'
import { setRequestLocale } from 'next-intl/server'
import { LocaleEnum } from '../../../constants/app.constants'
import HomepageContent from '@/components/homepage'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: LocaleEnum }>
}) {
  const { locale } = await params

  setRequestLocale(locale)

  const posts = await getAllPosts(100, locale)

  return <HomepageContent posts={posts}></HomepageContent>
}
