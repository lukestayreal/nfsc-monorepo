'use client'

import { Card } from '../../components/Card'
import { Section } from '../../components/Section'
import Container from '../../components/container'
import Image from 'next/image'
import bannerEnImage from '@/images/banner-en.png'
import bannerZhImage from '@/images/banner-zh.png'
import dayjs from 'dayjs'
import { ALL_POSTS_QUERYResult, CATEGORIES_QUERYResult } from '@/sanity/types'
import { useTranslations } from 'next-intl'
import { LocaleEnum } from '../../../constants/app.constants'
import { displayDate } from '@/utils/dayjs.util'
import { useSearchParams } from 'next/navigation'
import { useRouter } from '@/i18n/navigation'

function Appearance({
  title,
  description,
  event,
  cta,
  href,
}: {
  title: string
  description: string
  event: string
  cta: string
  href: string
}) {
  return (
    <Card as="article" className="my-4 py-2">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{event}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

export default function Timeline({
  posts,
  locale,
  order,
  categories,
}: {
  posts: ALL_POSTS_QUERYResult
  locale: LocaleEnum
  order: 'asc' | 'desc'
  categories: CATEGORIES_QUERYResult
}) {
  const t = useTranslations('post')
  const router = useRouter()

  const searchParams = useSearchParams()

  const postsGroupByYear: {
    year: number
    posts: {
      publishedAt: string | null
      excerpt: string | null
      title: string | null
      slug: string | null
    }[]
  }[] = []

  posts
    .sort((p1, p2) => {
      return order === 'asc'
        ? dayjs(p1.publishedAt).diff(p2.publishedAt)
        : -dayjs(p1.publishedAt).diff(p2.publishedAt)
    })
    .forEach((post) => {
      const year = dayjs(post.publishedAt).get('year')

      const lastItem = postsGroupByYear[postsGroupByYear.length - 1]
      if (lastItem && year === lastItem.year) {
        lastItem.posts.push(post)
      } else {
        postsGroupByYear.push({ year, posts: [post] })
      }
    })

  return (
    <div className="bg-white">
      <div className="relative isolate">
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)] stroke-gray-200"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
            width="100%"
            height="100%"
            strokeWidth={0}
          />
        </svg>
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
        >
          <div
            style={{
              clipPath:
                'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
            }}
            className="aspect-801/1036 w-[50.0625rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
        <div className="overflow-hidden lg:m-4">
          {locale === 'en' ? (
            <Image
              src={bannerEnImage}
              alt=""
              width={1952}
              height={998}
              className="inset-0 -z-10 size-full object-cover"
            />
          ) : (
            <Image
              src={bannerZhImage}
              alt=""
              width={1952}
              height={998}
              className="inset-0 -z-10 size-full object-cover"
            />
          )}
        </div>
      </div>
      <Container className="mt-12">
        <div className="flex items-center justify-between">
          {categories.map((category) => {
            return (
              <div
                key={category.slug}
                onClick={() => {
                  if (!category.slug) return

                  const newSearchParams = new URLSearchParams(searchParams)
                  newSearchParams.set('category', category.slug)

                  router.push(`/?${newSearchParams.toString()}`)
                }}
              >
                {category.title}
              </div>
            )
          })}
        </div>
      </Container>
      {postsGroupByYear.map((item) => {
        return (
          <Container key={item.year} className="mt-12">
            <Section title={String(item.year)}>
              {item.posts.map((post) => {
                return (
                  <Appearance
                    key={post.slug}
                    href={`/post/${post.slug}`}
                    title={post.title ?? ''}
                    description={post.excerpt ?? ''}
                    event={displayDate(locale, post.publishedAt)}
                    cta={t('readMore')}
                  />
                )
              })}
            </Section>
          </Container>
        )
      })}
    </div>
  )
}
