import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getAllPosts } from '@/sanity/queries'
import { LocaleEnum } from '../../../../constants/app.constants'
import { Link } from '@/i18n/navigation'

function Article({
  post,
}: {
  post: {
    title: string | null
    publishedAt: string | null
    excerpt: string | null
    slug: string | null
  }
}) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Link href={`/post/${post.slug}`}>
          <Card.Title>{post.title}</Card.Title>
        </Link>
        <Card.Eyebrow
          as="time"
          dateTime={post.publishedAt ? post.publishedAt : undefined}
          className="md:hidden"
          decorate
        >
          {formatDate(post.publishedAt ?? '')}
        </Card.Eyebrow>
        <Card.Description>{post.excerpt}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={post.publishedAt ? post.publishedAt : undefined}
        className="mt-1 max-md:hidden"
      >
        {formatDate(post.publishedAt ?? '')}
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
        <div className="my-16 flex max-w-3xl flex-col">
          {posts.map((article) => (
            <Article key={article.slug} post={article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
