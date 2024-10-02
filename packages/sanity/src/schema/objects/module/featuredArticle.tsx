import {BlockElementIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.featuredArticle',
  title: 'Featured Article',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 2,
    }),
    // Select featured
    defineField({
      name: 'featured',
      title: 'Featured Article',
      type: 'reference',
      to: [{type: 'article'}],
    }),
    // Featured image
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
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
        title: 'Featured Article',
        subtitle: 'Article information & image',
      }
    },
  },
})
