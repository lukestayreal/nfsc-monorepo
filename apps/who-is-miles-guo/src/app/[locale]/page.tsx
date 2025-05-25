import { getAllPosts, getCategoryPost } from '@/sanity/queries'
import { setRequestLocale } from 'next-intl/server'
import { LocaleEnum } from '../../../constants/app.constants'
import Timeline from '@/post/components/timeline'
import { redirect } from 'next/navigation'
import { getCategories } from '@/sanity/requests/category.requests'

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
  const { category: categorySlug, order } = awaitedSearchParams

  if (!order) {
    redirect(
      `?${new URLSearchParams({
        ...awaitedSearchParams,
        order: 'asc',
      }).toString()}`,
    )
  }

  const categories = await getCategories(locale)

  const posts = categorySlug
    ? await getCategoryPost(categorySlug, locale)
    : await getAllPosts(100, locale)

  return (
    <Timeline
      posts={posts}
      locale={locale}
      order={order}
      categories={categories}
    />
  )
}
