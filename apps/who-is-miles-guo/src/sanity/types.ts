/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: 'sanity.imagePaletteSwatch';
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: 'sanity.imagePalette';
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: 'sanity.imageDimensions';
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: 'sanity.fileAsset';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type Geopoint = {
  _type: 'geopoint';
  lat?: number;
  lng?: number;
  alt?: number;
};

export type Comment = {
  _id: string;
  _type: 'comment';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  approved?: boolean;
  email?: string;
  comment?: string;
  post?: {
    _ref: string;
    _type: 'reference';
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: 'post';
  };
  imageUrl?: string;
  image?: {
    asset?: {
      _ref: string;
      _type: 'reference';
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: 'image';
  };
};

export type Post = {
  _id: string;
  _type: 'post';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  author?: {
    _ref: string;
    _type: 'reference';
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: 'author';
  };
  mainImage?: {
    asset?: {
      _ref: string;
      _type: 'reference';
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: 'image';
  };
  categories?: Array<{
    _ref: string;
    _type: 'reference';
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: 'category';
  }>;
  publishedAt?: string;
  body?: Array<
    | {
        children?: Array<{
          marks?: Array<string>;
          text?: string;
          _type: 'span';
          _key: string;
        }>;
        style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
        listItem?: 'bullet';
        markDefs?: Array<{
          href?: string;
          _type: 'link';
          _key: string;
        }>;
        level?: number;
        _type: 'block';
        _key: string;
      }
    | {
        asset?: {
          _ref: string;
          _type: 'reference';
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt?: string;
        _type: 'image';
        _key: string;
      }
  >;
  markdown?: string;
  isFeatured?: boolean;
  excerpt?: string;
};

export type Author = {
  _id: string;
  _type: 'author';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  image?: {
    asset?: {
      _ref: string;
      _type: 'reference';
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: 'image';
  };
  bio?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: 'span';
      _key: string;
    }>;
    style?: 'normal';
    listItem?: never;
    markDefs?: Array<{
      href?: string;
      _type: 'link';
      _key: string;
    }>;
    level?: number;
    _type: 'block';
    _key: string;
  }>;
};

export type Category = {
  _id: string;
  _type: 'category';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  description?: string;
};

export type Slug = {
  _type: 'slug';
  current?: string;
  source?: string;
};

export type BlockContent = Array<
  | {
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: 'span';
        _key: string;
      }>;
      style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
      listItem?: 'bullet';
      markDefs?: Array<{
        href?: string;
        _type: 'link';
        _key: string;
      }>;
      level?: number;
      _type: 'block';
      _key: string;
    }
  | {
      asset?: {
        _ref: string;
        _type: 'reference';
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      _type: 'image';
      _key: string;
    }
>;

export type SanityImageCrop = {
  _type: 'sanity.imageCrop';
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityImageHotspot = {
  _type: 'sanity.imageHotspot';
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageAsset = {
  _id: string;
  _type: 'sanity.imageAsset';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
  _type: 'sanity.assetSourceData';
  name?: string;
  id?: string;
  url?: string;
};

export type SanityImageMetadata = {
  _type: 'sanity.imageMetadata';
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type Markdown = string;

export type AllSanitySchemaTypes =
  | SanityImagePaletteSwatch
  | SanityImagePalette
  | SanityImageDimensions
  | SanityFileAsset
  | Geopoint
  | Comment
  | Post
  | Author
  | Category
  | Slug
  | BlockContent
  | SanityImageCrop
  | SanityImageHotspot
  | SanityImageAsset
  | SanityAssetSourceData
  | SanityImageMetadata
  | Markdown;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ./src/sanity/queries.ts
// Variable: FEATURED_POSTS_QUERY
// Query: *[_type=='post' && isFeatured==true] | order(publishedAt desc)[0...$quantity]{    title,    'slug':slug.current,    publishedAt,    mainImage,    excerpt,    author->{        name, image    }}
export type FEATURED_POSTS_QUERYResult = Array<{
  title: string | null;
  slug: string | null;
  publishedAt: string | null;
  mainImage: {
    asset?: {
      _ref: string;
      _type: 'reference';
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: 'image';
  } | null;
  excerpt: string | null;
  author: {
    name: string | null;
    image: {
      asset?: {
        _ref: string;
        _type: 'reference';
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: 'image';
    } | null;
  } | null;
}>;
// Variable: ALL_POSTS_QUERY
// Query: *[  _type == "post"]|order(publishedAt desc)[0...$quantity]{  title,  "slug": slug.current,  publishedAt,  excerpt,  author->{    name,    image,  },}
export type ALL_POSTS_QUERYResult = Array<{
  title: string | null;
  slug: string | null;
  publishedAt: string | null;
  excerpt: string | null;
  author: {
    name: string | null;
    image: {
      asset?: {
        _ref: string;
        _type: 'reference';
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: 'image';
    } | null;
  } | null;
}>;
// Variable: CATEGORIES_QUERY
// Query: *[_type=='category']|order(title asc){  title,  "slug":slug.current}
export type CATEGORIES_QUERYResult = Array<{
  title: string | null;
  slug: string | null;
}>;
// Variable: POST_QUERY
// Query: *[_type=='post' && slug.current == $slug][0]{   publishedAt,  title,  mainImage,  excerpt,  body,  markdown,  _id,  author->{    name,    image,  },  categories[]->{    title,    "slug": slug.current,  },  "comments": *[_type == "comment" && post._ref == ^._id && approved == true]{    name,    email,    comment,    image,    _id  }}
export type POST_QUERYResult = {
  publishedAt: string | null;
  title: string | null;
  mainImage: {
    asset?: {
      _ref: string;
      _type: 'reference';
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: 'image';
  } | null;
  excerpt: string | null;
  body: Array<
    | {
        children?: Array<{
          marks?: Array<string>;
          text?: string;
          _type: 'span';
          _key: string;
        }>;
        style?: 'blockquote' | 'h1' | 'h2' | 'h3' | 'h4' | 'normal';
        listItem?: 'bullet';
        markDefs?: Array<{
          href?: string;
          _type: 'link';
          _key: string;
        }>;
        level?: number;
        _type: 'block';
        _key: string;
      }
    | {
        asset?: {
          _ref: string;
          _type: 'reference';
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt?: string;
        _type: 'image';
        _key: string;
      }
  > | null;
  markdown: string | null;
  _id: string;
  author: {
    name: string | null;
    image: {
      asset?: {
        _ref: string;
        _type: 'reference';
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: 'image';
    } | null;
  } | null;
  categories: Array<{
    title: string | null;
    slug: string | null;
  }> | null;
  comments: Array<{
    name: string | null;
    email: string | null;
    comment: string | null;
    image: {
      asset?: {
        _ref: string;
        _type: 'reference';
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: 'image';
    } | null;
    _id: string;
  }>;
} | null;
// Variable: CATEGORY_POST
// Query: *[  _type == "post"  && select(defined($category) => $category in categories[]->slug.current, true)]|order(publishedAt desc){  title,  "slug": slug.current,  publishedAt,  excerpt,  author->{    name,    image,  },}
export type CATEGORY_POSTResult = Array<{
  title: string | null;
  slug: string | null;
  publishedAt: string | null;
  excerpt: string | null;
  author: {
    name: string | null;
    image: {
      asset?: {
        _ref: string;
        _type: 'reference';
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: 'image';
    } | null;
  } | null;
}>;
// Variable: GET_OTHERS_POSTS_QUERY
// Query: *[  _type == "post"  && defined(slug.current)  && slug.current != $currentSlug]|order(publishedAt desc)[0...$quantity]{  publishedAt,  title,  mainImage,  excerpt,  body,  slug,  author->{    name,    image,  },  categories[]->{    title,    "slug": slug.current,  }}
export type GET_OTHERS_POSTS_QUERYResult = Array<{
  publishedAt: string | null;
  title: string | null;
  mainImage: {
    asset?: {
      _ref: string;
      _type: 'reference';
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: 'image';
  } | null;
  excerpt: string | null;
  body: Array<
    | {
        children?: Array<{
          marks?: Array<string>;
          text?: string;
          _type: 'span';
          _key: string;
        }>;
        style?: 'blockquote' | 'h1' | 'h2' | 'h3' | 'h4' | 'normal';
        listItem?: 'bullet';
        markDefs?: Array<{
          href?: string;
          _type: 'link';
          _key: string;
        }>;
        level?: number;
        _type: 'block';
        _key: string;
      }
    | {
        asset?: {
          _ref: string;
          _type: 'reference';
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt?: string;
        _type: 'image';
        _key: string;
      }
  > | null;
  slug: Slug | null;
  author: {
    name: string | null;
    image: {
      asset?: {
        _ref: string;
        _type: 'reference';
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: 'image';
    } | null;
  } | null;
  categories: Array<{
    title: string | null;
    slug: string | null;
  }> | null;
}>;

// Query TypeMap
import 'next-sanity';
declare module 'next-sanity' {
  interface SanityQueries {
    "*[_type=='post' && isFeatured==true] | order(publishedAt desc)[0...$quantity]{\n    title,\n    'slug':slug.current,\n    publishedAt,\n    mainImage,\n    excerpt,\n    author->{\n        name, image\n    }\n}": FEATURED_POSTS_QUERYResult;
    '*[\n  _type == "post"\n]|order(publishedAt desc)[0...$quantity]{\n  title,\n  "slug": slug.current,\n  publishedAt,\n  excerpt,\n  author->{\n    name,\n    image,\n  },\n}': ALL_POSTS_QUERYResult;
    '*[_type==\'category\']|order(title asc){\n  title,\n  "slug":slug.current\n}': CATEGORIES_QUERYResult;
    '*[_type==\'post\' && slug.current == $slug][0]{\n   publishedAt,\n  title,\n  mainImage,\n  excerpt,\n  body,\n  markdown,\n  _id,\n  author->{\n    name,\n    image,\n  },\n  categories[]->{\n    title,\n    "slug": slug.current,\n  },\n  "comments": *[_type == "comment" && post._ref == ^._id && approved == true]{\n    name,\n    email,\n    comment,\n    image,\n    _id\n  }\n}': POST_QUERYResult;
    '*[\n  _type == "post"\n  && select(defined($category) => $category in categories[]->slug.current, true)\n]|order(publishedAt desc){\n  title,\n  "slug": slug.current,\n  publishedAt,\n  excerpt,\n  author->{\n    name,\n    image,\n  },\n}': CATEGORY_POSTResult;
    '*[\n  _type == "post"\n  && defined(slug.current)\n  && slug.current != $currentSlug\n]|order(publishedAt desc)[0...$quantity]{\n  publishedAt,\n  title,\n  mainImage,\n  excerpt,\n  body,\n  slug,\n  author->{\n    name,\n    image,\n  },\n  categories[]->{\n    title,\n    "slug": slug.current,\n  }\n}': GET_OTHERS_POSTS_QUERYResult;
  }
}
