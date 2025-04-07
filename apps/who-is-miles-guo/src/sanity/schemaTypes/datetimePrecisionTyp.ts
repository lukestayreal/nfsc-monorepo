import { defineType } from 'sanity'

export const DatetimePrecision = [
  { title: 'Year', value: 'year' },
  { title: 'Month', value: 'month' },
  { title: 'Enterprise', value: 'enterprise' },
]

export const DatetimePrecisionType = defineType({
  name: 'datetimePrecision',
  title: 'Datetime Precision',
  type: 'string',
  options: {
    list: DatetimePrecision.map(({ title, value }) => ({ title, value })),
    layout: 'radio',
  },
})
