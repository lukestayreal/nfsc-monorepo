import { getAllPosts, getCategoryPost } from '@/sanity/queries'
import { setRequestLocale } from 'next-intl/server'
import { LocaleEnum } from '../../../constants/app.constants'
import Timeline from '@/post/components/timeline'
import { redirect } from 'next/navigation'

export default async function HomePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: LocaleEnum }>
  searchParams: Promise<{ category: string; order: 'asc' | 'desc' }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const awaitedSearchParams = await searchParams
  const { category, order } = awaitedSearchParams

  if (!order) {
    redirect(
      `?${new URLSearchParams({
        ...awaitedSearchParams,
        order: 'asc',
      }).toString()}`,
    )
  }

  const posts = category
    ? await getCategoryPost(category, locale)
    : await getAllPosts(100, locale)

  return <Timeline posts={posts} locale={locale} order={order} />
}
