import { Await, useLoaderData, useParams } from "@remix-run/react";
import type { SeoHandleFunction } from "@shopify/hydrogen";
import {
  defer,
  type LoaderFunctionArgs,
  type SerializeFrom,
} from "@shopify/remix-oxygen";
import { SanityPreview } from "hydrogen-sanity";
import { Suspense } from "react";
import invariant from "tiny-invariant";

import { Body } from "~/components/articles/Body";
import { Hero } from "~/components/articles/Hero";
import { Footer } from "~/components/global/Footer";
import { ArticleGallery } from "~/components/sections/ArticleGallery";
import type { SanityArticlePage } from "~/lib/sanity";
import { ColorTheme } from "~/lib/theme";
import { fetchGids, notFound, validateLocale } from "~/lib/utils";
import { ARTICLE_QUERY } from "~/queries/sanity/article";

const seo: SeoHandleFunction<typeof loader> = ({ data }) => {
  const title = data.page.title;
  return {
    title: title || data?.page?.title,
    description: data?.page?.seo?.description,
    media: data?.page?.seo?.image,
  };
};

export const handle = {
  seo,
};

export async function loader({ params, context }: LoaderFunctionArgs) {
  validateLocale({ context, params });
  const language = context.storefront.i18n.language.toLowerCase();

  const { handle } = params;
  invariant(handle, "Missing page handle");

  const cache = context.storefront.CacheCustom({
    mode: "public",
    maxAge: 60,
    staleWhileRevalidate: 60,
  });

  const page = await context.sanity.query<SanityArticlePage>({
    query: ARTICLE_QUERY,
    params: {
      slug: handle,
      language,
    },
    cache,
  });

  if (!page) {
    throw notFound();
  }

  // Resolve any references to products on the Storefront API
  const gids = fetchGids({ page, context });

  return defer({ language, page, gids });
}

export default function Page() {
  const { language, page, gids } =
    useLoaderData<SerializeFrom<typeof loader>>();
  const { handle } = useParams();

  return (
    <SanityPreview
      data={page}
      query={ARTICLE_QUERY}
      params={{ slug: handle, language }}
    >
      {(page) => (
        <ColorTheme value={page?.colorTheme}>
          <Suspense>
            <Await resolve={gids}>
              {/* Hero */}
              <Hero
                content={{
                  title: page?.title ?? "",
                  tags: page?.tags ?? [],
                  description: page?.description ?? [],
                  author: page?.author ?? "",
                  time: page?.time ?? "",
                  image: page?.image ?? null,
                }}
              />
              {/* Content body */}
              <Body
                heading={page?.contentHeading ?? null}
                content={
                  page?.content ?? [
                    { textContent: null, image: null, _key: "" },
                  ]
                }
              />
              {/* Articles */}
              <ArticleGallery
                articles={page?.latestArticles}
                filtered={page?.title}
                bg={"secondary"}
              />
              <Footer colorTheme={{ background: "#EEE8D8", text: "black" }} />
            </Await>
          </Suspense>
        </ColorTheme>
      )}
    </SanityPreview>
  );
}
