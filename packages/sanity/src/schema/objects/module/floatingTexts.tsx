import {MasterDetailIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.floatingTexts',
  title: 'Floating Texts',
  type: 'object',
  icon: MasterDetailIcon,
  fields: [
    // Layout
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Scattered texts', value: 'default'},
          {title: 'Two column', value: 'columns'},
        ],
        layout: 'radio',
      },
    }),
    // Featured image
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      hidden: ({parent}) => parent?.layout === 'columns',
    }),
    // Reference image
    defineField({
      name: 'referenceImage',
      title: 'Reference Image',
      type: 'image',
      hidden: ({parent}) => parent?.layout === 'default',
    }),
    defineField({
      name: 'reference',
      title: 'Reference text',
      type: 'simpleBlockContent',
      hidden: ({parent}) => parent?.layout === 'default',
    }),
    defineField({
      name: 'copy',
      title: 'Copy texts',
      type: 'array',
      of: [
        {
          name: 'contents',
          type: 'object',
          title: 'Contents',
          fields: [
            {
              name: 'simplecontent',
              type: 'simpleBlockContent',
              title: 'Simple Content',
            },
          ],
          preview: {
            select: {
              blocks: 'simplecontent',
            },
            prepare({blocks}: {blocks: any}) {
              const blockText =
                blocks && blocks[0]?.children?.[0]?.text ? blocks[0].children[0].text : 'No content'

              return {
                title: blockText,
                subtitle: 'Text content',
              }
            },
          },
        },
      ],
      validation: (rule) =>
        rule.custom((fields: any, context) => {
          const {parent}: any = context
          if (parent?.layout === 'default' && fields.length > 3) {
            return 'Maximum 3 items allowed for default layout'
          }
          if (parent?.layout === 'columns' && fields.length > 2) {
            return 'Maximum 2 items allowed for columns layout'
          }
          return true
        }),
    }),
    defineField({
      name: 'legend',
      title: 'Legend',
      type: 'text',
      hidden: ({parent}) => parent?.layout === 'columns',
      rows: 2,
    }),
  ],
  preview: {
    prepare(selection) {
      return {
        media: MasterDetailIcon,
        title: 'Floating Texts',
        subtitle: 'Floating texts',
      }
    },
  },
})
