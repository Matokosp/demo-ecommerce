import { Image } from "@shopify/hydrogen";
import clsx from "clsx";

import { Link } from "~/components/Link";

export default function HeaderBackground({
  logo,
  isOpen,
  navigationLegend,
  navigationLabels,
  setIsOpen,
}: {
  logo?: { url: string };
  isOpen: number | null;
  setIsOpen: React.Dispatch<React.SetStateAction<number | null>>;
  navigationLegend: string;
  navigationLabels: string[];
}) {
  return (
    <div
      className="absolute inset-0 flex cursor-pointer flex-col justify-between bg-limestone"
      onMouseEnter={() => setIsOpen(0)}
      onClick={() => setIsOpen(null)}
    >
      <div
        className={clsx(
          "absolute bottom-0 left-1/2 top-0 flex w-full -translate-x-1/2 items-center justify-center",
          "lg:w-full",
          isOpen !== null
            ? "border-1 border-r border-solid border-lightGray"
            : ""
        )}
      >
        <Link to="/" className={"w-[36px]"}>
          <Image src={logo ? logo.url : "#"} />
        </Link>
      </div>
      <div className="absolute left-8 top-10 flex origin-right translate-x-[-100%] translate-y-[-50%] -rotate-90 gap-x-10">
        {navigationLabels.map((label, idx: number) => {
          return (
            <button
              className={clsx(
                "text-body w-[max-content] duration-300",
                isOpen === idx && "opacity-30"
              )}
              onMouseEnter={() => setIsOpen(navigationLabels.length - 1 - idx)}
              key={label}
            >
              {label}
            </button>
          );
        })}
      </div>
      <p
        className={clsx(
          "absolute bottom-10 left-10 w-[155px] origin-bottom-left -rotate-90"
        )}
      >
        {navigationLegend}
      </p>
    </div>
  );
}
