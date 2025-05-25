import { CATEGORIES_QUERY } from '../queries/category.queries'

import { LocaleEnum } from '../../../constants/app.constants'
import { clientFetch } from '../lib/client'
import { CATEGORY_QUERY } from '../queries/category.queries'

export const getCategories = async (language: LocaleEnum) => {
  return await clientFetch({
    query: CATEGORIES_QUERY,
    params: { language },
  })
}

export const getCategory = async (slug: string, language: LocaleEnum) => {
  return await clientFetch({
    query: CATEGORY_QUERY,
    params: { language, slug },
  })
}
