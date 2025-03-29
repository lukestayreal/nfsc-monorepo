import { GET_OTHERS_POSTS_QUERYResult } from "@/sanity/types";
import React from "react";
import Container from "./container";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import dayjs from "dayjs";

export default async function OtherPosts({
  otherPosts,
}: {
  otherPosts: GET_OTHERS_POSTS_QUERYResult;
}) {
  return (
    <Container className="mb-10">
      <p className="text-xl font-semibold mb-5">You may also like</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {otherPosts?.map((post, index) => (
          <div key={index} className="group relative">
            <div className="overflow-hidden rounded-tr-2xl rounded-tl-2xl">
              {post?.mainImage && (
                <Image
                  src={urlFor(post?.mainImage).url()}
                  width={500}
                  height={500}
                  alt="mainImage"
                  className=" aspect-[3/2] w-full rounded-tr-2xl rounded-tl-2xl object-cover shadow-xl group-hover:scale-105 duration-300"
                />
              )}
            </div>
            <div className="p-5 bg-gray-100 rounded-br-2xl rounded-bl-2xl">
              {post?.slug && (
                <Link href={`/post/${post?.slug?.current}`}>
                  <span className="absolute inset-0" />
                  <p className="text-sm font-semibold mb-2 line-clamp-1">
                    {post?.title}
                  </p>
                </Link>
              )}
              <div className="flex items-center flex-wrap justify-between">
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
                <p className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500">
                  {dayjs(post?.publishedAt).format("dddd, MMMM D, YYYY")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
