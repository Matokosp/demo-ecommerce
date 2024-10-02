// app/routes/_store.($lang).$handle.tsx
import { Await, useLoaderData, useParams } from "@remix-run/react";
import type { SeoHandleFunction } from "@shopify/hydrogen";
import {
  defer,
  type LoaderFunctionArgs,
  type SerializeFrom,
} from "@shopify/remix-oxygen";
import clsx from "clsx";
import { SanityPreview } from "hydrogen-sanity";
import { Suspense } from "react";
import invariant from "tiny-invariant";

import { Breadcrumb } from "~/components/elements/Breadcrumb";
import { Footer } from "~/components/global/Footer";
import PageHero from "~/components/heroes/Page";
import { Section } from "~/components/layout/Section";
import ModuleGrid from "~/components/modules/ModuleGrid";
import PortableText from "~/components/portableText/PortableText";
import { baseLanguage } from "~/data/countries";
import type { SanityHeroPage, SanityPage } from "~/lib/sanity";
import { ColorTheme } from "~/lib/theme";
import { fetchGids, notFound, validateLocale } from "~/lib/utils";
import { PAGE_QUERY } from "~/queries/sanity/page";

const seo: SeoHandleFunction<typeof loader> = ({ data }) => ({
  title: data?.page?.seo?.title,
  description: data?.page?.seo?.description,
  media: data?.page?.seo?.image,
});

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

  const page = await context.sanity.query<SanityPage>({
    query: PAGE_QUERY,
    params: {
      slug: handle,
      language,
      baseLanguage,
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

  const pagePaths = [{ slug: null, title: page?.title }];

  return (
    <SanityPreview
      data={page}
      query={PAGE_QUERY}
      params={{ slug: handle, language, baseLanguage }}
    >
      {(page) => (
        <ColorTheme value={page?.colorTheme}>
          <Suspense>
            <Await resolve={gids}>
              <Breadcrumb paths={pagePaths} colorTheme={page?.colorTheme} />
              {/* Page hero */}
              {page?.showHero && (
                <PageHero
                  fallbackTitle={page?.title || ""}
                  hero={page?.hero as SanityHeroPage}
                />
              )}
              {/* Body title */}
              {page?.bodyTitle && (
                <div
                  className="pb-30 text-center"
                  style={{
                    backgroundColor: page?.colorTheme?.background,
                    color: page?.colorTheme?.text,
                  }}
                >
                  <h2>{page.bodyTitle}</h2>
                </div>
              )}
              {/* Body */}
              {page?.body && (
                <Section
                  style={{
                    backgroundColor: page?.colorTheme?.background,
                    color: page?.colorTheme?.text,
                  }}
                >
                  <div className="col-start-4 col-end-10">
                    <PortableText
                      blocks={page.body}
                      centered
                      className={clsx("mx-auto pb-24 pt-8")}
                    />
                  </div>
                </Section>
              )}
              {/* Modules */}
              {page?.modules && (
                <ModuleGrid
                  items={page.modules}
                  colorTheme={page?.colorTheme}
                />
              )}
              <Footer colorTheme={page?.colorTheme} />
            </Await>
          </Suspense>
        </ColorTheme>
      )}
    </SanityPreview>
  );
}
