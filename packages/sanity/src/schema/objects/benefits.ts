import {StackCompactIcon} from '@sanity/icons'
import {defineField} from 'sanity'

import blocksToText from '../../utils/blocksToText'

export default defineField({
  name: 'benefits',
  title: 'Benefits',
  type: 'array',
  icon: StackCompactIcon,
  of: [
    {
      name: 'benefit',
      title: 'Benefit',
      type: 'object',
      icon: false,
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'text',
          title: 'Text',
          type: 'simpleBlockContent',
          validation: (rule) => rule.required(),
        }),
      ],
      preview: {
        select: {
          body: 'text',
          title: 'title',
        },
        prepare(selection) {
          const {title, body} = selection
          return {
            subtitle: body && blocksToText(body),
            title,
          }
        },
      },
    },
  ],
})
