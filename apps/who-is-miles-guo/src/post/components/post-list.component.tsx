'use client'

import { Link } from '@/i18n/navigation'
import { urlFor } from '@/sanity/lib/image'
import { CATEGORY_POSTResult } from '@/sanity/types'
import dayjs from 'dayjs'
import { ChevronRightIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export const PostList = ({ posts }: { posts: CATEGORY_POSTResult }) => {
  const t = useTranslations('post')

  return posts?.map((post) => {
    return (
      <div
        key={post?.slug}
        className="relative grid grid-cols-1 border-b border-b-gray-100 py-10 first:border-t first:border-t-gray-200 max-sm:gap-3 sm:grid-cols-3"
      >
        <div>
          <p className="text-sm/5 max-sm:text-gray-700 sm:font-medium">
            {dayjs(post?.publishedAt).format('dddd, MMMM D, YYYY')}
          </p>
          {post?.author && (
            <div className="mt-2.5 flex items-center gap-3">
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
        <div className="sm:col-span-2 sm:max-w-2xl">
          <h2 className="text-sm/5 font-medium">{post?.title}</h2>
          <p className="mt-3 text-sm/6 text-gray-500">{post?.excerpt}</p>
          <div className="mt-4">
            <Link
              href={`/post/${post?.slug}`}
              className="flex items-center gap-1 text-sm/5 font-medium"
            >
              <span className="absolute inset-4" />
              {t('readMore')}
              <ChevronRightIcon className="size-4 text-gray-400" />
            </Link>
          </div>
        </div>
      </div>
    )
  })
}
