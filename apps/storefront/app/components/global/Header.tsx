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
  const { layout } = useRootLoaderData();
  const { menuLinks } = layout || {};
  const { siteLogo } = layout;

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <header
      className={clsx(
        "align-center h-svh fixed top-0 z-40 flex h-screen w-[60px] flex-col",
        "md:px-8",
        ""
      )}
      role="banner"
    >
      <HeaderBackground
        logo={siteLogo}
        handleOpen={handleOpen}
        isOpen={isOpen}
      />
      {menuLinks && <MobileNavigation menuLinks={menuLinks} />}
      {menuLinks && (
        <Navigation
          menuLinks={menuLinks}
          handleClose={handleClose}
          isOpen={isOpen}
        />
      )}
      {/* Accounts, country selector + cart toggle */}
      <div className="fixed right-0 top-10">
        <HeaderActions />
      </div>
    </header>
  );
}
