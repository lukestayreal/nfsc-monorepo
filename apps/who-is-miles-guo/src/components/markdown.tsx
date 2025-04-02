'use client';

import { Link } from '@/i18n/navigation';
import ReactMarkdown, { Components } from 'react-markdown';

const components: Components = {
  a: ({ ...props }) => <Link href={String(props.href)} {...props} />,
  h1: ({ ...props }) => <h1 className="text-2xl font-bold" {...props} />,
  h2: ({ ...props }) => (
    <h2
      className="my-5 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0"
      {...props}
    />
  ),
};

export default function Markdown({
  children,
}: {
  children: string | undefined;
}) {
  return <ReactMarkdown components={components}>{children}</ReactMarkdown>;
}
