import {TagIcon} from '@sanity/icons'
import type {ListItemBuilder, StructureBuilder} from 'sanity/desk'
import DocumentsPane from 'sanity-plugin-documents-pane'

import defineStructure from '../utils/defineStructure'

/**
 * Show articles for this tag
 */
const articlesPane = (S: StructureBuilder) => {
  return S.view
    .component(DocumentsPane)
    .options({
      query: `
        *[_type == "article"] {
          _id, 
          _type, 
          "title": coalesce(title[_key == "en"][0].value)
        }
      `,
      params: {},
    })
    .id('articles')
    .title('Articles')
}

export default defineStructure<ListItemBuilder>((S) => {
  return S.listItem()
    .title('Article Post Tag')
    .icon(TagIcon)
    .id('blog-post-tag-list-item')
    .schemaType('blogPostTag')
    .child(
      S.documentTypeList('blogPostTag').child((documentId, context) => {
        const documentNode = context.structureContext.resolveDocumentNode({
          documentId,
          schemaType: 'blogPostTag',
        })

        return documentNode.views([...documentNode.getViews(), articlesPane(S)])
      })
    )
})
