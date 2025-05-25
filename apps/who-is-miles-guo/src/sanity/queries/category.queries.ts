import { defineQuery } from 'next-sanity'

export const CATEGORY_QUERY =
  defineQuery(`*[_type=='category' && slug.current == $slug][0]{
    "title": title[_key == $language][0].value,
    "slug":slug.current
  }`)

export const CATEGORIES_QUERY =
  defineQuery(`*[_type=='category']|order(title asc){
    "title": title[_key == $language][0].value,
    "slug":slug.current
  }`)
