import groq from "groq";

export const PRODUCT = groq`
  _id,
  "_type": "productWithVariant",
  "available": !store.isDeleted && store.status == 'active',
  "gid": store.gid,
  "title": store.title,
  "previewImageUrl": store.previewImageUrl,
  "slug": store.slug.current,
  "onlineStoreUrl": store.onlineStoreUrl,
  "variantGid": coalesce(^.variant->store.gid, store.variants[0]->store.gid)
`;
