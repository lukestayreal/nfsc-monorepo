import { defineQuery } from 'next-sanity'
import { clientFetch } from './lib/client'
import { FEATURED_POSTS_QUERYResult } from './types'
import { LocaleEnum } from '../../constants/app.constants'

const FEATURED_POSTS_QUERY =
  defineQuery(`*[_type=='post' && isFeatured==true && language == $language] | order(publishedAt desc)[0...$quantity]{
    title,
    'slug':slug.current,
    language,
    publishedAt,
    mainImage,
    excerpt,
    author->{
        name, image
    }
}`)

export const getFeaturedPosts = async (
  quantity: number,
  language: LocaleEnum,
): Promise<FEATURED_POSTS_QUERYResult> => {
  return await clientFetch({
    query: FEATURED_POSTS_QUERY,
    params: { quantity, language },
  })
}

const ALL_POSTS_QUERY = defineQuery(`*[
  _type == "post" && language == $language
]|order(publishedAt desc)[0...$quantity]{
  title,
  "slug": slug.current,
  language,
  publishedAt,
  excerpt,
  author->{
    name,
    image,
  },
}`)

export const getAllPosts = async (quantity: number, language: LocaleEnum) => {
  return await clientFetch({
    query: ALL_POSTS_QUERY,
    params: { quantity, language },
  })
}

const POST_QUERY =
  defineQuery(`*[_type=='post' && slug.current == $slug && language == $language][0]{
  publishedAt,
  title,
  mainImage,
  excerpt,
  body,
  markdown,
  _id,
  author->{
    name,
    image,
  },
  categories[]->{
    "title": title[_key == $language][0].value,
    "slug": slug.current,
  },
  "comments": *[_type == "comment" && post._ref == ^._id && approved == true]{
    name,
    email,
    comment,
    image,
    _id
  }
}`)

export const getPost = async (slug: string, language: LocaleEnum) => {
  return await clientFetch({
    query: POST_QUERY,
    params: { slug, language },
  })
}

const CATEGORY_POST = defineQuery(`*[
  _type == "post"
  && select(defined($categorySlug) => $categorySlug in categories[]->slug.current, true)
  && language == $language
]|order(publishedAt desc){
  title,
  "slug": slug.current,
  language,
  publishedAt,
  excerpt,
  author->{
    name,
    image,
  },
}`)

export const getCategoryPost = async (
  categorySlug: string,
  language: LocaleEnum,
) => {
  return await clientFetch({
    query: CATEGORY_POST,
    params: {
      categorySlug,
      language,
    },
  })
}

const GET_OTHERS_POSTS_QUERY = defineQuery(`*[
  _type == "post"
  && defined(slug.current)
  && slug.current != $currentSlug
  && language == $language
]|order(publishedAt desc)[0...$quantity]{
  publishedAt,
  title,
  mainImage,
  excerpt,
  body,
  slug,
  author->{
    name,
    image,
  },
  categories[]->{
    "title": title[_key == $language][0].value,
    "slug": slug.current,
  }
}`)

export const getOtherPosts = async (
  currentSlug: string,
  quantity: number,
  language: LocaleEnum,
) => {
  return await clientFetch({
    query: GET_OTHERS_POSTS_QUERY,
    params: { currentSlug, quantity, language },
  })
}
