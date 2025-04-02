import { DocumentTextIcon } from '@sanity/icons';
import {
  defineArrayMember,
  defineField,
  defineType,
  SlugValidationContext,
} from 'sanity';

// Create the function
// This checks that there are no other documents
// With this published or draft _id
// Or this schema type
// With the same slug and language
export async function isUniqueOtherThanLanguage(
  slug: string,
  context: SlugValidationContext
) {
  const { document, getClient } = context;
  if (!document?.language) {
    return true;
  }
  const client = getClient({ apiVersion: '2023-04-24' });
  const id = document._id.replace(/^drafts\./, '');
  const params = {
    draft: `drafts.${id}`,
    published: id,
    language: document.language,
    slug,
  };
  const query = `!defined(*[
    !(_id in [$draft, $published]) &&
    slug.current == $slug &&
    language == $language
  ][0]._id)`;
  const result = await client.fetch(query, params);
  return result;
}

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        isUnique: isUniqueOtherThanLanguage,
      },
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'markdown',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Is Featured',
      type: 'boolean',
      description: 'Toggle to Featured on or off',
      initialValue: false,
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      isFeatured: 'isFeatured',
    },
    prepare(selection) {
      const { author, isFeatured } = selection;
      return {
        ...selection,
        subtitle: author && `${isFeatured ? 'Featured | ' : ''} By ${author}`,
      };
    },
  },
});
