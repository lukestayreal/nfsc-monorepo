import { getAllPosts, getCategoryPost } from '@/sanity/queries'
import { setRequestLocale } from 'next-intl/server'
import { LocaleEnum } from '../../../constants/app.constants'
import Timeline from '@/post/components/timeline'

export default async function HomePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: LocaleEnum }>
  searchParams: Promise<{ category: string }>
}) {
  const { locale } = await params
  const { category } = await searchParams

  setRequestLocale(locale)

  const posts = category
    ? await getCategoryPost(category, locale)
    : await getAllPosts(100, locale)

  return <Timeline posts={posts} locale={locale} />
}
