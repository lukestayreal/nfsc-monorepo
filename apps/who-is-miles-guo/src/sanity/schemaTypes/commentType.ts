import { CommentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const commentType = defineType({
  name: "comment",
  type: "document",
  title: "Comment",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "approved",
      title: "Approved",
      type: "boolean",
      description: "Comments won't show on the site without approval",
    }),
    defineField({
      name: "email",
      type: "string",
    }),
    defineField({
      name: "comment",
      type: "text",
    }),
    defineField({
      name: "post",
      type: "reference",
      to: [{ type: "post" }],
    }),
    defineField({
      name: "imageUrl",
      type: "string",
      title: "User image link",
    }),
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],

  preview: {
    select: {
      title: "name",
      email: "email",
      approved: "approved",
      media: "image",
    },
    prepare({ title, approved, email, media }) {
      return {
        title,
        subtitle: `${approved ? "Approved" : "In review"} | User: ${email}`,
        media: media ? media : CommentIcon,
      };
    },
  },
});
