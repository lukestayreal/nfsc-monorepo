'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig, defineField } from 'sanity'
import { structureTool } from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'
import { markdownSchema } from 'sanity-plugin-markdown/next'
import { documentInternationalization } from '@sanity/document-internationalization'
import { LocaleEnum } from './constants/app.constants'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({
      defaultApiVersion: apiVersion,
    }),
    markdownSchema(),
    documentInternationalization({
      supportedLanguages: [
        { id: LocaleEnum.en, title: 'English' },
        { id: LocaleEnum.zh, title: '中文' },
      ],
      schemaTypes: ['post'],
    }),
    internationalizedArray({
      languages: [
        { id: LocaleEnum.en, title: 'English' },
        { id: LocaleEnum.zh, title: '中文' },
      ],
      defaultLanguages: ['en'],
      fieldTypes: ['string'],
    }),
  ],
})
