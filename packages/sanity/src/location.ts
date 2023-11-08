import type {DocumentLocationResolver, DocumentLocationsState} from '@sanity/presentation'
import {map} from 'rxjs'

const firstSegmentBasedOnType = {
  product: '/products/',
  page: '/page/',
  collection: '/collections/',
}

export const locate: DocumentLocationResolver = (params, context) => {
  console.log({params, context})
  const {type, id} = params
  const {documentStore} = context
  if (type == 'home') {
    const doc$ = documentStore.listenQuery(`*[_id == $id]`, {id}, {perspective: 'previewDrafts'})

    return doc$.pipe(
      map((doc) => {
        // @todo: Make this dynamic using the same language logic as the storefront router
        const href = id == 'home-en' ? '/' : `/no-no`
        return {
          locations: [
            {
              title: doc.seo?.title || 'Home',
              href,
            },
          ],
        } satisfies DocumentLocationsState
      }),
    )
  }
  if (type == 'product') {
    const docs$ = documentStore.listenQuery(
      `*[references($id)]`,
      {id},
      {perspective: 'previewDrafts'},
    )

    return docs$.pipe(
      map((docs) => {
        //console.log({docs})
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const href = id == 'home-en' ? '/' : `/no-no`
        return {
          locations: docs.map((doc: any) => ({
            title: doc.seo?.title || doc.store.title || 'No title',
            href: `${firstSegmentBasedOnType[doc._type]}${doc.store?.slug.current || ''}`,
          })),
        } satisfies DocumentLocationsState
      }),
    )
  }

  return null
}
