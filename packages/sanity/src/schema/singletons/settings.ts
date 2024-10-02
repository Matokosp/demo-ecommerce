import {CogIcon, PackageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

const TITLE = 'Settings'
interface ProductOptions {
  title: string
}

export default defineType({
  name: 'settings',
  title: TITLE,
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      default: true,
      name: 'navigation',
      title: 'Navigation',
    },
    {
      name: 'footer',
      title: 'Footer',
    },
    {
      name: 'productOptions',
      title: 'Product options',
    },
    {
      name: 'notFoundPage',
      title: '404 page',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // Navigation Labels
    defineField({
      name: 'navigationLabels',
      title: 'Navigation Labels',
      type: 'array',
      group: 'navigation',
      of: [
        {
          name: 'label',
          title: 'Label',
          type: 'text',
          rows: 1,
        },
      ],
    }),
    // Navigation legend
    defineField({
      name: 'navigationLegend',
      title: 'Navigation Legend',
      type: 'text',
      rows: 2,
      group: 'navigation',
    }),
    // Shop Image
    defineField({
      name: 'shopImage',
      title: 'Shop Image',
      group: 'navigation',
      type: 'image',
    }),
    // Menu
    defineField({
      name: 'menu',
      title: 'Menu',
      type: 'object',
      group: 'navigation',
      options: {
        collapsed: false,
        collapsible: true,
      },
      fields: [
        // Links
        defineField({
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [
            {
              name: 'collectionGroup',
              title: 'Collection group',
              type: 'object',
              icon: PackageIcon,
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (rule) => rule.required(),
                },
                {
                  name: 'collectionLinks',
                  title: 'Collection links',
                  type: 'array',
                  validation: (rule) => rule.unique().max(6),
                  of: [
                    {
                      name: 'collection',
                      type: 'reference',
                      weak: true,
                      to: [{type: 'collection'}],
                    },
                  ],
                },
                {
                  name: 'productLinks',
                  title: 'Product links',
                  type: 'array',
                  of: [
                    {
                      name: 'product',
                      type: 'reference',
                      weak: true,
                      to: [{type: 'product'}],
                    },
                  ],
                },
                {
                  name: 'collectionProducts',
                  title: 'Collection products',
                  type: 'reference',
                  description: 'Products from this collection will be listed',
                  weak: true,
                  to: [{type: 'collection'}],
                },
              ],
            },
            {type: 'linkInternal'},
            {type: 'linkExternal'},
          ],
        }),
        defineField({
          name: 'allProducts',
          type: 'linkInternal',
          title: 'All products link',
        }),
      ],
    }),
    // Journal Image
    defineField({
      name: 'journalImage',
      title: 'Journal Image',
      group: 'navigation',
      type: 'image',
    }),
    // Journal link
    defineField({
      name: 'journalLinks',
      title: 'Journal Links',
      type: 'object',
      group: 'navigation',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'linkInternal',
        }),
      ],
    }),
    // Navigation content links
    defineField({
      name: 'contentMenu',
      title: 'Content Menu',
      type: 'object',
      group: 'navigation',
      options: {
        collapsed: false,
        collapsible: true,
      },
      fields: [
        // Title
        defineField({
          name: 'title',
          title: 'Title',
          type: 'text',
          rows: 2,
        }),
        // Links
        defineField({
          name: 'contentLinks',
          title: 'Content Links',
          type: 'array',
          of: [{type: 'linkInternal'}, {type: 'linkExternal'}],
        }),
      ],
    }),
    // Site logo
    defineField({
      name: 'siteLogo',
      title: 'Site Logo',
      type: 'image',
    }),
    // Footer
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      group: 'footer',
      options: {
        collapsed: false,
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'subscribeText',
          title: 'Subscribe Text',
          type: 'text',
        }),
        //Column One Links Title
        defineField({
          name: 'columnOneTitle',
          title: 'Column one title',
          type: 'text',
          rows: 2,
        }),
        // Links
        defineField({
          name: 'linksOne',
          title: 'Links Column One',
          type: 'array',
          of: [{type: 'linkInternal'}, {type: 'linkExternal'}],
        }),
        //Column Two Links Title
        defineField({
          name: 'columnTwoTitle',
          title: 'Column two title',
          type: 'text',
          rows: 2,
        }),
        // Links
        defineField({
          name: 'linksTwo',
          title: 'Links Column Two',
          type: 'array',
          of: [{type: 'linkInternal'}, {type: 'linkExternal'}],
        }),
        //Column Three Links Title
        defineField({
          name: 'columnThreeTitle',
          title: 'Column three title',
          type: 'text',
          rows: 2,
        }),
        // Links
        defineField({
          name: 'linksThree',
          title: 'Links Column Three',
          type: 'array',
          of: [{type: 'linkInternal'}, {type: 'linkExternal'}],
        }),
        // Links
        defineField({
          name: 'bottomLinks',
          title: 'Bottom Links',
          type: 'array',
          of: [{type: 'linkInternal'}, {type: 'linkExternal'}],
        }),
        // Legend
        defineField({
          name: 'legend',
          title: 'Legend',
          type: 'internationalizedArrayString',
        }),
        // copyright
        defineField({
          name: 'copyright',
          title: 'Copyright',
          type: 'internationalizedArrayString',
        }),
        // Language box text
        defineField({
          name: 'languageBox',
          title: 'Language Box Text',
          type: 'text',
        }),
      ],
    }),
    // Shipping info
    defineField({
      name: 'menuShipping',
      title: 'Menu shipping information',
      type: 'text',
      rows: 2,
      group: 'navigation',
    }),
    // Custom product options
    defineField({
      name: 'customProductOptions',
      title: 'Custom product options',
      type: 'array',
      group: 'productOptions',
      of: [
        {
          name: 'customProductOption.color',
          type: 'customProductOption.color',
        },
        {
          name: 'customProductOption.size',
          type: 'customProductOption.size',
        },
      ],
      validation: (rule) =>
        rule.custom((options: ProductOptions[] | undefined) => {
          // Each product option type must have a unique title
          if (options) {
            const uniqueTitles = new Set(options.map((option) => option.title))
            if (options.length > uniqueTitles.size) {
              return 'Each product option type must have a unique title'
            }
          }
          return true
        }),
    }),
    // Not found page
    defineField({
      name: 'notFoundPage',
      title: '404 page',
      type: 'object',
      group: 'notFoundPage',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'collection',
          title: 'Collection',
          type: 'reference',
          description: 'Collection products displayed on this page',
          weak: true,
          to: [
            {
              name: 'collection',
              type: 'collection',
            },
          ],
        }),
        // Color theme
        defineField({
          name: 'colorTheme',
          title: 'Color theme',
          type: 'reference',
          to: [{type: 'colorTheme'}],
        }),
      ],
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      description: 'Defaults for every page',
      options: {
        collapsed: false,
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Site title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          validation: (rule) =>
            rule.max(150).warning('Longer descriptions may be truncated by search engines'),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      hidden: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: TITLE,
      }
    },
  },
})
