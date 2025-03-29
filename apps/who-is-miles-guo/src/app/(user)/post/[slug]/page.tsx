import { Button } from '@/components/button';
import Container from '@/components/container';
import OtherPosts from '@/components/otherPosts';
import WriteComment from '@/components/write-comment';
import { urlFor } from '@/sanity/lib/image';
import { getOtherPosts, getPost } from '@/sanity/queries';
import { Category } from '@/types';
import dayjs from 'dayjs';
import { ChevronLeftIcon } from 'lucide-react';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import type { Metadata } from 'next';

type props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: props): Promise<Metadata> {
  const { slug } = await params;

  const post = (await getPost(slug)) || notFound();

  return {
    title: slug,
    description: slug,
    keywords:['miles guo', 'blog', 'post'],
    openGraph: {
      images: post?.mainImage?.url,
    },
  };
}

const SinglePostPage = async ({ params }: props) => {
  const { slug } = await params;
  const post = (await getPost(slug)) || notFound();
  const otherPosts = await getOtherPosts(slug, 3);

  console.log(post);

  return (
    <div className="overflow-hidden">
      <Container className="mt-16">
        <p className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500">
          {dayjs(post?.publishedAt).format('dddd, MMMM D, YYYY')}
        </p>
        <h1 className="text-4xl font-medium tracking-tighter sm:text-6xl text-gray-950 text-pretty mt-2">
          {post?.title}
        </h1>
        <div className="mt-16 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
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
                {post?.categories?.map((category: Category) => (
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
                    className="mb-10 aspect-[3/2] rounded-2xl object-cover shadow-xl"
                    alt="postMainImage"
                  />
                )}
                {post?.body && (
                  <PortableText
                    value={post?.body}
                    components={{
                      block: {
                        normal: ({ children }) => (
                          <p className="my-2 text-base/8 first:mt-0 last:mb-0">
                            {children}
                          </p>
                        ),
                        h2: ({ children }) => (
                          <h2 className="my-5 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="my-5 text-xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                            {children}
                          </h3>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="my-2.5 border-l-2 border-l-gray-300 pl-6 text-base/8 text-gray-950 first:mt-0 last:mb-0">
                            {children}
                          </blockquote>
                        ),
                      },
                      types: {
                        image: ({ value }) => (
                          <Image
                            alt={value.alt || ''}
                            src={urlFor(value).url()}
                            className="w-full rounded-2xl"
                            width={1400}
                            height={1000}
                          />
                        ),
                        separator: ({ value }) => {
                          switch (value.style) {
                            case 'line':
                              return (
                                <hr className="my-8 border-t border-gray-200" />
                              );
                            case 'space':
                              return <div className="my-8" />;
                            default:
                              return null;
                          }
                        },
                      },
                      list: {
                        bullet: ({ children }) => (
                          <ul className="list-disc pl-4 text-base/8 marker:text-gray-400">
                            {children}
                          </ul>
                        ),
                        number: ({ children }) => (
                          <ol className="list-decimal pl-4 text-base/8 marker:text-gray-400">
                            {children}
                          </ol>
                        ),
                      },
                      listItem: {
                        bullet: ({ children }) => {
                          return (
                            <li className="my-2 pl-2 has-[br]:mb-8">
                              {children}
                            </li>
                          );
                        },
                        number: ({ children }) => {
                          return (
                            <li className="my-2 pl-2 has-[br]:mb-8">
                              {children}
                            </li>
                          );
                        },
                      },
                      marks: {
                        strong: ({ children }) => (
                          <strong className="font-semibold text-gray-950">
                            {children}
                          </strong>
                        ),
                        code: ({ children }) => (
                          <>
                            <span aria-hidden>`</span>
                            <code className="text-[15px]/8 font-semibold text-gray-950">
                              {children}
                            </code>
                            <span aria-hidden>`</span>
                          </>
                        ),
                        link: ({ value, children }) => {
                          return (
                            <Link
                              href={value.href}
                              className="font-medium text-gray-950 underline decoration-gray-400 underline-offset-4 data-[hover]:decoration-gray-600"
                            >
                              {children}
                            </Link>
                          );
                        },
                      },
                    }}
                  />
                )}
                <div className="mt-10">
                  <Button variant="outline" href={'/'}>
                    <ChevronLeftIcon className="size-4" />
                    Back to Blog
                  </Button>
                </div>
              </div>
            </div>
            {/* Comments will go here */}
            <div className="mt-10 max-w-2xl">
              <WriteComment _id={post?._id} />
              {post?.comments?.length > 0 && (
                <div className="p-5">
                  <div className="w-full flex flex-col p-10 rounded-md max-w-2xl mx-auto shadow-rose-600 shadow space-y-2">
                    <h3 className="text-4xl font-semibold">Comments</h3>
                    <hr className="pb-2" />
                    {post?.comments?.map((comment) => (
                      <div key={comment?._id}>
                        <p>
                          <span className="text-blue-700 font-semibold">
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
          </div>
        </div>
      </Container>
      <OtherPosts otherPosts={otherPosts} />
    </div>
  );
};

export default SinglePostPage;
