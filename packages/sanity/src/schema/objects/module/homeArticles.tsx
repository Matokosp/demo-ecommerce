import {BlockElementIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.homeArticles',
  title: 'Home Articles',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    // First Collection
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      validation: (rule) => rule.required(),
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
