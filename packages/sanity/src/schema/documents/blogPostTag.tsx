export default {
  name: 'blogPostTag',
  title: 'Blog tag',
  type: 'document',
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}: {title: {value: string}[]}) {
      return {
        title: title[0].value,
      }
    },
  },
  fieldsets: [
    {
      title: 'SEO & metadata',
      name: 'metadata',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
    },
    {
      title: 'Meta title',
      name: 'metaTitle',
      type: 'string',
      description: 'This title populates meta-tags on the webpage',
      fieldset: 'metadata',
    },
    {
      title: 'Meta description',
      name: 'metaDescription',
      type: 'text',
      description: 'This description populates meta-tags on the webpage',
      fieldset: 'metadata',
    },
    {
      title: 'Open Graph Image',
      name: 'openGraphImage',
      type: 'image',
      description: 'Image for sharing previews on Facebook, Twitter etc.',
      fieldset: 'metadata',
    },
  ],
}
