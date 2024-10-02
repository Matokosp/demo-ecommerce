import clsx from "clsx";
import { useState } from "react";

import HeaderActions from "~/components/global/HeaderActions";
import HeaderBackground from "~/components/global/HeaderBackground";
import MobileNavigation from "~/components/global/MobileNavigation";
import Navigation from "~/components/global/Navigation";
import { useRootLoaderData } from "~/root";

/**
 * A server component that specifies the content of the header on the website
 */
export default function Header() {
  const { layout, selectedLocale, sanityDataset, sanityProjectID } =
    useRootLoaderData();

  const { menuLinks } = layout || {};
  const {
    siteLogo,
    navigationLegend,
    navigationLabels,
    contentMenu,
    allProducts,
    journalLinks,
    menuShipping,
    shopImage,
    journalImage,
    latestArticles,
  } = layout;

  const [isOpen, setIsOpen] = useState<number | null>(null);
  const localePrefix =
    selectedLocale.language.toLocaleLowerCase() +
    "-" +
    selectedLocale.country.toLocaleLowerCase();

  return (
    <header
      className={clsx(
        "align-center h-svh fixed top-0 z-40 flex h-screen w-[62px] flex-col",
        "md:px-8",
        "border-r-[1px] border-[rgba(0,0,0,0.1)]"
      )}
      role="banner"
      onMouseLeave={() => setIsOpen(null)}
    >
      <HeaderBackground
        logo={siteLogo}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        navigationLegend={navigationLegend}
        navigationLabels={navigationLabels}
      />
      {menuLinks && <MobileNavigation menuLinks={menuLinks} />}
      {menuLinks && contentMenu && (
        <Navigation
          menuLinks={menuLinks}
          contentMenu={contentMenu}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          navigationLabels={navigationLabels}
          allProducts={allProducts}
          localePrefix={localePrefix}
          menuShipping={menuShipping}
          journalImage={journalImage}
          shopImage={shopImage}
          sanityDataset={sanityDataset}
          sanityProjectID={sanityProjectID}
          journalLinks={journalLinks}
          latestArticles={latestArticles}
        />
      )}
      {/* Accounts, country selector + cart toggle */}
      <div className="fixed right-0 top-10">
        <HeaderActions />
      </div>
    </header>
  );
}
