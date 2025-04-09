import { urlFor } from '@/sanity/lib/image'
import { getFeaturedPosts } from '@/sanity/queries'
import Image from 'next/image'
import React from 'react'
import { LocaleEnum } from '../../constants/app.constants'
import { Link } from '@/i18n/navigation'
import { displayDate } from '@/utils/dayjs.util'

export default async function FeaturedPosts({
  locale,
}: {
  locale: LocaleEnum
}) {
  const featuredPosts = await getFeaturedPosts(3, locale)
  if (featuredPosts?.length === 0) {
    return
  }

  return (
    <div className="mt-10">
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {featuredPosts?.map((post) => (
          <div
            key={post?.slug}
            className="group relative flex flex-col rounded-3xl bg-white p-2 shadow-md ring-1 shadow-black/5 ring-black/5"
          >
            <div className="overflow-hidden rounded-2xl">
              {post?.mainImage && (
                <Image
                  alt={post?.mainImage?.alt || ''}
                  src={urlFor(post?.mainImage).url()}
                  width={800}
                  height={800}
                  className="aspect-3/2 w-full rounded-2xl object-cover duration-500 group-hover:scale-110"
                />
              )}
            </div>
            <div className="flex flex-1 flex-col p-8">
              <p className="text-sm/5 text-gray-700">
                {displayDate(locale, post?.publishedAt)}
              </p>
              <div className="mt-2 text-base/7 font-medium">
                <Link href={`/post/${post?.slug}`}>
                  <span className="absolute inset-0" />
                  {post?.title}
                </Link>
              </div>
              <div className="mt-2 flex-1 text-sm/6 text-gray-500">
                {post?.excerpt}
              </div>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
