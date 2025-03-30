import Banner from '@/components/banner';
import Categories from '@/components/categories';
import Container from '@/components/container';
import FeaturedPosts from '@/components/featuredPosts';
import { urlFor } from '@/sanity/lib/image';
import { getAllPosts } from '@/sanity/queries';
import dayjs from 'dayjs';
import { ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const posts = await getAllPosts(5);
  
  return (
    <div className="overflow-hidden">
      <Container>
        <Banner />
        <FeaturedPosts />
        <div className="mt-16 pb-24">
          <Categories />
          <div>
            {posts?.length === 0 ? (
              <div>No Post Available</div>
            ) : (
              <div className="mt-6">
                {posts?.map((post) => (
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
                      <p className="mt-3 text-sm/6 text-gray-500">
                        {post?.excerpt}
                      </p>
                      <div className="mt-4">
                        <Link
                          href={`/post/${post?.slug}`}
                          className="flex items-center gap-1 text-sm/5 font-medium"
                        >
                          <span className="absolute inset-4" />
                          Read more{' '}
                          <ChevronRightIcon className="size-4 text-gray-400" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
