import { Image } from "@shopify/hydrogen";
import clsx from "clsx";
import { useEffect, useState } from "react";

import { Link } from "~/components/Link";

export default function HeaderBackground({
  logo,
  handleOpen,
  isOpen,
}: {
  logo?: { url: string };
  handleOpen: () => void;
  isOpen: boolean;
}) {
  const [scrolledDown, setScrolledDown] = useState(false);

  const handleScroll = () => {
    setScrolledDown(window.scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Trigger handler on mount to account for reloads
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className="absolute inset-0 cursor-pointer bg-limestone"
      onMouseEnter={() => handleOpen()}
    >
      <div
        className={clsx(
          "absolute bottom-0 left-1/2 top-0 flex w-full -translate-x-1/2 items-center justify-center",
          "lg:w-full",
          isOpen ? "border-1 border-r border-solid border-lightGray" : ""
        )}
      >
        <Link to="/" className={"w-[36px]"}>
          <Image src={logo ? logo.url : "#"} />
        </Link>
      </div>
    </div>
  );
}
