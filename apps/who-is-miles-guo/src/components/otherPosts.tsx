import { GET_OTHERS_POSTS_QUERYResult } from '@/sanity/types'
import React from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { displayDate } from '@/utils/dayjs.util'
import { LocaleEnum } from '../../constants/app.constants'

export default async function OtherPosts({
  otherPosts,
  locale,
}: {
  otherPosts: GET_OTHERS_POSTS_QUERYResult
  locale: LocaleEnum
}) {
  const t = await getTranslations('post')

  return (
    <>
      <p className="my-3 mb-5 py-2 text-xl font-semibold">
        {t('youMayAlsoLike')}
      </p>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {otherPosts?.map((post, index) => (
          <div key={index} className="group relative">
            <div className="overflow-hidden rounded-tl-2xl rounded-tr-2xl">
              {post?.mainImage && (
                <Image
                  src={urlFor(post?.mainImage).url()}
                  width={500}
                  height={500}
                  alt="mainImage"
                  className="aspect-auto w-full rounded-tl-2xl rounded-tr-2xl object-cover shadow-xl duration-300 group-hover:scale-105"
                />
              )}
            </div>
            <div className="rounded-br-2xl rounded-bl-2xl bg-gray-100 p-5">
              {post?.slug && (
                <Link href={`/post/${post?.slug.current}`}>
                  <span className="absolute inset-0" />
                  <p className="mb-2 line-clamp-1 text-sm font-semibold">
                    {post?.title}
                  </p>
                </Link>
              )}
              <div className="flex flex-wrap items-center justify-between">
                {post?.author && (
                  <div className="flex items-center gap-3">
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
                <p className="font-mono text-xs/5 font-semibold tracking-widest text-gray-500 uppercase">
                  {displayDate(locale, post?.publishedAt)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
