import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),
    defineField({
      name: "isFeatured",
      title: "Is Featured",
      type: "boolean",
      description: "Toggle to Featured on or off",
      initialValue: false,
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      isFeatured: "isFeatured",
    },
    prepare(selection) {
      const { author, isFeatured } = selection;
      return {
        ...selection,
        subtitle: author && `${isFeatured ? "Featured | " : ""} By ${author}`,
      };
    },
  },
});
