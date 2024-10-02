import {AsteriskIcon} from '@sanity/icons'
import pluralize from 'pluralize-esm'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.productShowcase',
  title: 'Product Showcase',
  type: 'object',
  icon: AsteriskIcon,
  fields: [
    // Layout
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Default tiles', value: 'default'},
          {title: 'Big tiles', value: 'big'},
        ],
        layout: 'radio',
      },
    }),
    // Direction
    defineField({
      name: 'direction',
      title: 'Direction',
      type: 'string',
      options: {
        list: [
          {title: 'Left to Right', value: 'default'},
          {title: 'Right to Left', value: 'rtl'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'modules',
      title: 'Products',
      type: 'array',
      of: [{type: 'module.product'}],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      products: 'modules',
      title: 'title',
    },
    prepare(selection) {
      const {products, title} = selection
      return {
        subtitle: 'Products',
        title:
          products?.length > 0
            ? pluralize('product', products.length, true) + ' | ' + title
            : 'No products',
        media: AsteriskIcon,
      }
    },
  },
})
