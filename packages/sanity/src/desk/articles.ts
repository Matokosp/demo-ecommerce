import {DocumentIcon} from '@sanity/icons'
import type {ListItemBuilder, StructureBuilder} from 'sanity/desk'
import DocumentsPane from 'sanity-plugin-documents-pane'

import defineStructure from '../utils/defineStructure'

/**
 * Show products where a article is used
 */
const productsPane = (S: StructureBuilder) =>
  S.view
    .component(DocumentsPane)
    .options({
      query: `
        {
          'products': *[_type == 'product']{
            _id, _type, composition, 'title': store.title
          }
        }
        {
          'drafts': products[_id in path('drafts.**')],
          'published': products[!(_id in path('drafts.**'))]
        }
        {
          drafts,
          published,
          'both': published[('drafts.'+_id) in ^.drafts[]._id]{'published': @, 'draft': ^.drafts[_id == ('drafts.' + ^._id)][0]}
        }
        {
          'onlyDrafts': drafts[!(_id in ^.both[].draft._id)]{'draft': @},
          'onlyPublished': published[!(_id in ^.both[].published._id)]{'published': @},
          both
        }
        {
          'products': [...onlyDrafts, ...both, ...onlyPublished]{'latest': coalesce(draft, published)}[].latest
        }.products[references($id)] | order(title)
      `,
      params: {id: `_id`},
    })
    .id('products')
    .title('Products')

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Articles')
    .icon(DocumentIcon)
    .schemaType('article')
    .child(
      S.documentTypeList('article').child((documentId, context) => {
        const documentNode = context.structureContext.resolveDocumentNode({
          documentId,
          schemaType: 'article',
        })

        return documentNode.views([...documentNode.getViews(), productsPane(S)])
      })
    )
)
