import { Button } from '@/components/button'
import Container from '@/components/container'
import { getCategories, getCategory, getCategoryPost } from '@/sanity/queries'
import { FileX2 } from 'lucide-react'
import React from 'react'
import { LocaleEnum } from '../../../../../../constants/app.constants'
import { setRequestLocale } from 'next-intl/server'
import { CategoryNavigationMenu } from '@/components/category-navigation-menu'
import { PostList } from '@/post/components/post-list.component'

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string; locale: LocaleEnum }>
}) => {
  const { slug, locale } = await params

  setRequestLocale(locale)

  const category = await getCategory(slug, locale)

  const posts = await getCategoryPost(slug, locale)

  const categories = await getCategories(locale)

  return (
    <div>
      <Container>
        <div className="flex flex-col items-start gap-10 py-10 md:flex-row">
          <CategoryNavigationMenu categories={categories} />
          <div className="flex-1">
            {posts?.length > 0 ? (
              <div className="mt-2">
                <h2 className="text-lg font-medium">{category?.title}</h2>
                <PostList posts={posts} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <div className="mb-4 rounded-full bg-muted p-3">
                  <FileX2
                    className="h-10 w-10 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="mb-2 text-xl font-semibold text-foreground">
                  No posts found
                </h2>
                <p className="mb-4 text-muted-foreground">
                  It seems there are no posts available for{' '}
                  <span className="font-semibold capitalize underline decoration-[1px] underline-offset-2">
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
  )
}

export default CategoryPage
