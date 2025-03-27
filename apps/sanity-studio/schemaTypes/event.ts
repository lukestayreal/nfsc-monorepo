import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'i18n.string',
    }),
    {
      type: 'markdown',
      description: 'A Github flavored markdown field with image uploading',
      name: 'markdown',
    },
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'person',
      title: 'Person',
      type: 'reference',
      to: {type: 'person'},
    }),
    defineField({
      name: 'people',
      title: 'People',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'person'}],
        },
      ],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'datetime',
      title: 'Date Time',
      type: 'datetime',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'i18n.text',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      personName: 'person.name',
      datetime: 'datetime',
      media: 'mainImage',
    },
    prepare(selection) {
      const {title, datetime} = selection
      const date = new Date(datetime)

      return {
        ...selection,
        title: title && `${title.en} ${title.cn} `,
        subtitle: date && `${date.toDateString()}`,
      }
    },
  },
})
