import {FolderIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({
      name: 'parent',
      type: 'reference',
      to: [{type: 'category'}],
      // This ensures we cannot select other "children"
      options: {
        filter: '!defined(parent)',
      },
    }),
  ],
  // Customize the preview so parents are visualized in the studio
  preview: {
    select: {
      title: 'title',
      subtitle: 'parent.title',
    },
    prepare: ({title, subtitle}) => ({
      title,
      subtitle: subtitle ? `– ${subtitle}` : ``,
    }),
  },
})
