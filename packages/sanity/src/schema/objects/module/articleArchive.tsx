import {DashboardIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.articleArchive',
  title: 'Articles Archive',
  type: 'object',
  icon: DashboardIcon,
  fields: [
    // Layout
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'With landscape items', value: 'landscape'},
          {title: 'All square items', value: 'square'},
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: {
      layout: 'layout',
    },
    prepare(selection) {
      return {
        media: DashboardIcon,
        title: 'Articles Archive',
        subtitle: selection.layout.charAt(0).toUpperCase() + selection.layout.slice(1),
      }
    },
  },
})
