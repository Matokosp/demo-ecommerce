import CalloutModule from "~/components/modules/Callout";
import CallToActionModule from "~/components/modules/CallToAction";
import CollectionModule from "~/components/modules/Collection";
import ImageModule from "~/components/modules/Image";
import InstagramModule from "~/components/modules/Instagram";
import ProductModule from "~/components/modules/Product";
import type { SanityModule } from "~/lib/sanity";

import { ArticleArchive } from "./ArticleArchive";
import CollectionsSwiper from "./CollectionsSwiper";
import { FeaturedArticle } from "./FeaturedArticle";
import { FloatingTexts } from "./FloatingTexts";
import { HomeArticles } from "./HomeArticles";
import ProductHighlight from "./ProductHighlight";
import { ProductShowcase } from "./ProductShowcase";

type Props = {
  imageAspectClassName?: string;
  module: SanityModule;
  colorTheme?: { background: string; text: string };
};

export default function Module({
  imageAspectClassName,
  module,
  colorTheme,
}: Props) {
  switch (module._type) {
    case "module.callout":
      return <CalloutModule module={module} />;
    case "module.callToAction":
      return <CallToActionModule module={module} />;
    case "module.collection":
      return <CollectionModule module={module} />;
    case "module.collectionsSwiper":
      return <CollectionsSwiper module={module} />;
    case "module.homeArticles":
      return <HomeArticles module={module} />;
    case "module.image":
      return <ImageModule module={module} />;
    case "module.instagram":
      return <InstagramModule module={module} />;
    case "module.productHighlight":
      return <ProductHighlight module={module} />;
    case "module.featuredArticle":
      return <FeaturedArticle module={module} />;
    case "module.articleArchive":
      return <ArticleArchive module={module} />;
    case "module.productShowcase":
      return <ProductShowcase module={module} />;
    case "module.floatingTexts":
      return <FloatingTexts module={module} colorTheme={colorTheme} />;
    case "module.product":
      return (
        <ProductModule
          imageAspectClassName={imageAspectClassName}
          module={module}
        />
      );
    default:
      return null;
  }
}
