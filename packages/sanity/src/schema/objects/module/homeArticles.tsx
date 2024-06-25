import {BlockElementIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.homeArticles',
  title: 'Home Articles',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    // Description
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 8,
      validation: (rule) => rule.required(),
    }),
    // Select featured
    defineField({
      name: 'featured',
      title: 'Featured Article',
      type: 'reference',
      to: [{type: 'article'}],
    }),
    // Featured images
    defineField({
      name: 'firstImage',
      title: 'First Featured Image',
      type: 'image',
    }),
    defineField({
      name: 'secondImage',
      title: 'Second Featured Image',
      type: 'image',
    }),
    // Link
    defineField({
      name: 'link',
      title: 'CTA Link',
      type: 'array',
      of: [{type: 'linkInternal'}, {type: 'linkExternal'}],
      validation: (rule) => rule.max(1),
    }),
  ],
  preview: {
    select: {
      collectionTitle: 'collection.store.title',
      imageUrl: 'collection.store.imageUrl',
      isDeleted: 'collection.store.isDeleted',
    },
    prepare(selection) {
      return {
        media: BlockElementIcon,
        subtitle: 'Home Articles',
        title: 'Featured article and carousel',
      }
    },
  },
})
