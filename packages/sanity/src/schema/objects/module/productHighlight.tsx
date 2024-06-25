import {StarIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.productHighlight',
  title: 'Product Highlight',
  type: 'object',
  icon: StarIcon,
  fieldsets: [
    {
      name: 'copy',
      title: 'Copy',
    },
  ],
  fields: [
    // Text color
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      options: {
        list: ['white', 'black'],
      },
    }),
    // Order
    defineField({
      name: 'order',
      title: 'Order',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {title: 'Content on left', value: 'left'},
          {title: 'Content on right', value: 'right'},
        ],
      },
      initialValue: {
        list: 'left',
      },
    }),
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    // Body
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 2,
    }),
    // Link
    defineField({
      name: 'links',
      title: 'Link',
      type: 'array',
      of: [{type: 'linkInternal'}, {type: 'linkExternal'}],
      validation: (rule) => rule.max(1),
    }),
    // Background
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection
      return {
        subtitle: title,
        title: 'Product highlight',
        media: StarIcon,
      }
    },
  },
})
