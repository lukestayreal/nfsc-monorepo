import { Button } from '@/components/button'
import Container from '@/components/container'
import OtherPosts from '@/components/otherPosts'
import WriteComment from '@/components/write-comment'
import { urlFor } from '@/sanity/lib/image'
import { getOtherPosts, getPost } from '@/sanity/queries'
import dayjs from 'dayjs'
import { ChevronLeftIcon } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'
import Markdown from '@/components/markdown'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { LocaleEnum } from '../../../../../../constants/app.constants'
import { Link } from '@/i18n/navigation'
import { FeatureFlags } from '@/constant'
import { Prose } from '@/components/Prose'

type props = {
  params: Promise<{ slug: string; locale: LocaleEnum }>
}

function ArrowLeftIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export async function generateMetadata({ params }: props): Promise<Metadata> {
  const { slug, locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations('Metadata')

  const post = await getPost(slug, locale)

  if (!post)
    return {
      title: 'Post not found',
      description: t('description'),
    }

  const { mainImage, categories } = post

  const title = post.title ? post.title : 'Post not found'
  const description = slug

  const images = mainImage
    ? [
        {
          url: urlFor(mainImage).url(),
          alt: 'Your alt text',
        },
      ]
    : undefined
  const keywords = categories?.map((category) =>
    category?.title ? category?.title : '',
  )

  return {
    title: slug,
    description,
    keywords,
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

const SinglePostPage = async ({ params }: props) => {
  const { slug, locale } = await params

  const post = (await getPost(slug, locale)) || notFound()
  const otherPosts = await getOtherPosts(slug, 3, locale)

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          {
            <button
              type="button"
              aria-label="Go back to articles"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </button>
          }
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                {post?.title}
              </h1>
              <time
                dateTime={post?.publishedAt ? post?.publishedAt : ''}
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <span className="ml-3">
                  {dayjs(post?.publishedAt).format('dddd, MMMM D, YYYY')}
                </span>
              </time>
            </header>
            <Prose className="mt-8" data-mdx-content>
              <div className="overflow-hidden">
                <div className="flex flex-wrap items-center gap-5 max-lg:justify-between lg:flex-col lg:items-start">
                  {post?.author && (
                    <div className="mt-6 flex items-center gap-3">
                      {post?.author?.image && (
                        <Image
                          src={urlFor(post?.author?.image).url()}
                          alt="authorImage"
                          width={50}
                          height={50}
                          className="aspect-square size-6 rounded-full object-cover"
                        />
                      )}
                      <p className="text-gray-700">{post?.author?.name}</p>
                    </div>
                  )}
                  {Array.isArray(post?.categories) && (
                    <div className="flex flex-wrap gap-2">
                      {post?.categories?.map((category) => (
                        <Link
                          key={category?.slug}
                          href={`/category/${category?.slug}`}
                          className="rounded-full border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium text-gray-500"
                        >
                          {category?.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="text-gray-700">
                    <div className="max-w-2xl xl:mx-auto">
                      {post?.mainImage && (
                        <Image
                          src={urlFor(post?.mainImage).url()}
                          width={800}
                          height={800}
                          className="mb-10 aspect-3/2 rounded-2xl object-cover shadow-xl"
                          alt="postMainImage"
                        />
                      )}
                      {post.body && <Markdown>{post.body}</Markdown>}
                      <div className="mt-10">
                        <Button variant="secondary" href={`/`}>
                          <ChevronLeftIcon className="size-4" />
                          Back to Blog
                        </Button>
                      </div>
                    </div>
                  </div>
                  {FeatureFlags.comment && (
                    <div className="mt-10 max-w-2xl">
                      <WriteComment _id={post?._id} />
                      {post?.comments?.length > 0 && (
                        <div className="p-5">
                          <div className="mx-auto flex w-full max-w-2xl flex-col space-y-2 rounded-md p-10 shadow-sm shadow-rose-600">
                            <h3 className="text-4xl font-semibold">Comments</h3>
                            <hr className="pb-2" />
                            {post?.comments?.map((comment) => (
                              <div key={comment?._id}>
                                <p>
                                  <span className="font-semibold text-blue-700">
                                    {comment?.name}
                                  </span>
                                  : {comment?.comment}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <OtherPosts otherPosts={otherPosts} />
            </Prose>
          </article>
        </div>
      </div>
    </Container>
  )
}

export default SinglePostPage
