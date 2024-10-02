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
      type: 'text',
      rows: 2,
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
    // Image
    defineField({
      name: 'image',
      type: 'image',
      title: 'Hero Image',
      group: 'editorial',
    }),
    // Preamble
    defineField({
      name: 'preamble',
      title: 'Preamble',
      type: 'text',
      rows: 2,
      group: 'editorial',
    }),
    // Author
    defineField({
      name: 'author',
      title: 'Author',
      type: 'text',
      rows: 2,
      group: 'editorial',
    }),
    // Estimated time
    defineField({
      name: 'time',
      title: 'Estimated time',
      type: 'text',
      rows: 2,
      group: 'editorial',
    }),
    // Description
    defineField({
      name: 'description',
      title: 'Description',
      type: 'simpleBlockContent',
      group: 'editorial',
    }),
    // Content heading
    defineField({
      name: 'contentHeading',
      title: 'Content Heading',
      type: 'simpleBlockContent',
      group: 'editorial',
    }),
    // Content
    defineField({
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{type: 'module.articleBody'}],
      group: 'editorial',
      // validation: (Rule) => Rule.required().min(1),
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo.page',
      group: 'seo',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      hidden: false,
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
        title: title,
        subtitle: language?.toUpperCase(),
      }
    },
  },
})
