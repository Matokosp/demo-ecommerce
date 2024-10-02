import {BlockElementIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.articleBody',
  title: 'Article Body',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    // Title
    defineField({
      name: 'textContent',
      title: 'Body Text',
      type: 'simpleBlockContent',
    }),
    // Featured image
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'textContent',
    },
    prepare(selection) {
      console.log(selection)
      return {
        title: selection.title[0].children[0].text,
      }
    },
  },
})
