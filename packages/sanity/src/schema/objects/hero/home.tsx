import {defineField} from 'sanity'

export const COLORS = [
  {title: 'White', value: '#fff'},
  {title: 'Black', value: '#000'},
]

export default defineField({
  name: 'hero.home',
  title: 'Home hero',
  type: 'object',
  fields: [
    // Section color
    defineField({
      name: 'color',
      title: 'Select the text color',
      type: 'string',
      options: {
        list: COLORS.map(({title, value}) => ({title, value})),
        layout: 'radio',
      },
    }),
    // Image
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
    }),
    // Title
    defineField({
      name: 'title',
      title: 'CTA Text',
      type: 'text',
      rows: 3,
    }),
    // Link
    defineField({
      name: 'links',
      title: 'CTA Link',
      type: 'array',
      of: [{type: 'linkInternal'}, {type: 'linkExternal'}],
      validation: (rule) => rule.max(1),
    }),
    // Content
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      validation: (rule) => rule.max(1),
      of: [
        {
          name: 'productWithVariant',
          title: 'Product with variant',
          type: 'productWithVariant',
        },
        {
          name: 'imageWithProductHotspots',
          title: 'Image',
          type: 'imageWithProductHotspots',
        },
      ],
    }),
    // Text content
    defineField({
      name: 'textContent',
      title: 'Text Content',
      type: 'text',
    }),
  ],
})
