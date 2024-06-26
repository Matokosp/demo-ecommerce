import groq from "groq";

export const PRODUCT_WITH_VARIANT_FIELDS = groq`
  _id,
  "_type": "productWithVariant",
  "available": !store.isDeleted && store.status == 'active',
  "gid": store.gid,
  "slug": store.slug.current,
  "image": store.previewImageUrl,
  "price": store.priceRange,
  "title": store.title,
  "variantGid": coalesce(^.variant->store.gid, store.variants[0]->store.gid)
`;
