import {DocumentIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // Name
    defineField({
      name: 'title',
      type: 'internationalizedArrayString',
      group: 'editorial',
    }),
    // Slug
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      group: 'editorial',
      validation: (rule) => rule.required(),
    }),
    // Image
    defineField({
      name: 'image',
      type: 'image',
      group: 'editorial',
    }),
    // Content
    defineField({
      name: 'content',
      title: 'Content',
      type: 'internationalizedArraySimpleBlockContent',
      group: 'editorial',
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo.page',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title?.[0]?.value,
      }
    },
  },
})
