import {DocumentIcon} from '@sanity/icons'
import {defineField} from 'sanity'

import {isUniqueOtherThanLanguage, validateSlug} from '../../utils/validateSlug'

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
    {
      title: 'Category',
      name: 'tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'blogPostTag'}}],
      validation: (Rule) => Rule.required().min(1),
      group: 'editorial',
    },
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
      options: {source: 'title', isUnique: isUniqueOtherThanLanguage},
      validation: validateSlug,
      group: 'editorial',
    }),
    // Description
    defineField({
      name: 'description',
      title: 'Description',
      type: 'internationalizedArraySimpleBlockContent',
      group: 'editorial',
    }),
    // Author
    defineField({
      name: 'author',
      title: 'Author',
      type: 'internationalizedArrayString',
      group: 'editorial',
    }),
    // Estimated time
    defineField({
      name: 'time',
      title: 'Estimated time',
      type: 'internationalizedArrayString',
      group: 'editorial',
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
      active: 'active',
      seoImage: 'seo.image',
      title: 'title',
      language: 'language',
    },
    prepare(selection) {
      const {seoImage, title, language} = selection

      return {
        media: seoImage,
        title: title[0].value,
        subtitle: language?.toUpperCase(),
      }
    },
  },
})
