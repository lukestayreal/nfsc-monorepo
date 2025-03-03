import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'nfsc-web-sanity-studio',

  projectId: 'bd4sbtzg',
  dataset: 'development',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
