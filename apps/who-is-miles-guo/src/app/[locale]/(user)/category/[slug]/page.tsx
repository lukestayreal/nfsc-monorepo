import { Button } from '@/components/button';
import Categories from '@/components/categories';
import Container from '@/components/container';
import { Link } from '@/i18n/navigation';
import { urlFor } from '@/sanity/lib/image';
import { getCategoryPost } from '@/sanity/queries';
import dayjs from 'dayjs';
import { ChevronRightIcon, FileX2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { LocaleEnum } from '../../../../../../constants/app.constants';

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string; locale: LocaleEnum }>;
}) => {
  const { slug, locale } = await params;

  const posts = await getCategoryPost(slug, locale);

  return (
    <div>
      <Container>
        <div className="py-10 flex flex-col md:flex-row items-start gap-10">
          <Categories currentCategory={slug} noFeed={true} locale={locale} />
          <div className="flex-1">
            {posts?.length > 0 ? (
              <div className="mt-2">
                <h2 className="font-medium text-lg">
                  All post by{' '}
                  <span className="font-semibold capitalize underline underline-offset-2 decoration-[1px]">
                    {slug}
                  </span>
                </h2>
                {posts?.map((post) => {
                  return (
                    <div
                      key={post?.slug}
                      className="relative grid grid-cols-1 border-b border-b-gray-100 py-10 first:border-t first:border-t-gray-200 max-sm:gap-3 sm:grid-cols-3"
                    >
                      <div>
                        <p className="text-sm/5 max-sm:text-gray-700 sm:font-medium">
                          {dayjs(post?.publishedAt).format(
                            'dddd, MMMM D, YYYY'
                          )}
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
                            <p className="text-gray-700">
                              {post?.author?.name}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="sm:col-span-2 sm:max-w-2xl">
                        <h2 className="text-sm/5 font-medium">{post?.title}</h2>
                        <p className="mt-3 text-sm/6 text-gray-500">
                          {post?.excerpt}
                        </p>
                        <div className="mt-4">
                          <Link
                            href={`${locale}/post/${post?.slug}`}
                            className="flex items-center gap-1 text-sm/5 font-medium"
                          >
                            <span className="absolute inset-4" />
                            Read more{' '}
                            <ChevronRightIcon className="size-4 text-gray-400" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <FileX2
                    className="h-10 w-10 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  No posts found
                </h2>
                <p className="text-muted-foreground mb-4">
                  It seems there are no posts available for{' '}
                  <span className="font-semibold capitalize underline underline-offset-2 decoration-[1px]">
                    {slug}
                  </span>{' '}
                  category.
                </p>
                <Button href="/">Back to Home</Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
