import OtherPosts from '@/components/otherPosts'
import WriteComment from '@/components/write-comment'
import { urlFor } from '@/sanity/lib/image'
import { getOtherPosts, getPost } from '@/sanity/queries'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'
import Markdown from '@/components/markdown'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { LocaleEnum } from '../../../../../../constants/app.constants'
import { Link } from '@/i18n/navigation'
import { FeatureFlags } from '@/constant'
import { ArticleLayout } from '@/components/ArticleLayout'

type props = {
  params: Promise<{ slug: string; locale: LocaleEnum }>
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
    <>
      <ArticleLayout post={post}>
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
              </div>
            </div>
          </div>
        </div>
        <OtherPosts otherPosts={otherPosts} />

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
      </ArticleLayout>
    </>
  )
}

export default SinglePostPage
