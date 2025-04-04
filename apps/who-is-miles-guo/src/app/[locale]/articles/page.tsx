import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getAllPosts } from '@/sanity/queries'
import { LocaleEnum } from '../../../../constants/app.constants'

function Article({
  article,
}: {
  article: {
    title: string | null
    publishedAt: string | null
    excerpt: string | null
    slug: string | null
  }
}) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.publishedAt ? article.publishedAt : undefined}
          className="md:hidden"
          decorate
        >
          {formatDate(article.publishedAt ?? '')}
        </Card.Eyebrow>
        <Card.Description>{article.excerpt}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.publishedAt ? article.publishedAt : undefined}
        className="mt-1 max-md:hidden"
      >
        {formatDate(article.publishedAt ?? '')}
      </Card.Eyebrow>
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.',
}

export default async function ArticlesIndex({
  params,
}: {
  params: Promise<{ locale: LocaleEnum }>
}) {
  const { locale } = await params

  const posts = await getAllPosts(5, locale)

  return (
    <SimpleLayout
      title="Writing on software design, company building, and the aerospace industry."
      intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {posts.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
