import {BlockElementIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.collectionsSwiper',
  title: 'Collections Swiper',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    // First Collection
    defineField({
      name: 'firstCollection',
      title: 'First Collection Swiper',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    // First Collection Items
    defineField({
      name: 'firstCollectionItems',
      title: 'First Collection Products',
      type: 'array',
      of: [{type: 'module.product'}],
      validation: (rule) => rule.required().max(4),
    }),

    // Second Collection
    defineField({
      name: 'secondCollection',
      title: 'Second Collection Swiper',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    // Second Collection Items
    defineField({
      name: 'secondCollectionItems',
      title: 'Second Collection Products',
      type: 'array',
      of: [{type: 'module.product'}],
      validation: (rule) => rule.required().max(4),
    }),

    // Third Collection
    defineField({
      name: 'thirdCollection',
      title: 'Third Collection Swiper',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    // Third Collection Items
    defineField({
      name: 'thirdCollectionItems',
      title: 'Third Collection Products',
      type: 'array',
      of: [{type: 'module.product'}],
      validation: (rule) => rule.required().max(4),
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
        subtitle: 'Collection Swiper',
        title: 'Collection items swiper',
      }
    },
  },
})
