import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {I18nFields} from 'sanity-plugin-i18n-fields'

export default defineConfig({
  name: 'default',
  title: 'nfsc-web-sanity-studio',

  projectId: 'bd4sbtzg',
  dataset: 'development',

  plugins: [
    structureTool(),
    visionTool(),
    I18nFields({
      locales: [
        {code: 'en', label: 'en', title: 'English', default: true},
        {code: 'cn', label: 'cn', title: 'Chinese'},
      ],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
