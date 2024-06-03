import clsx from "clsx";

import Link from "~/components/elements/Link";
import type { SanityLink } from "~/lib/sanity";

import { Arrow } from "./Icons";

type ButtonMode = "default" | "outline";
type ButtonTone = "critical" | "default" | "shopPay" | "invert";

type ButtonStyleOptions = {
  mode?: ButtonMode;
  tone?: ButtonTone;
};

type Props = {
  backgroundColor?: string;
  className?: string;
  link: SanityLink;
  textColor?: string;
  mode?: "default" | "outline";
  tone?: "critical" | "default" | "shopPay" | "invert";
  layout?: "spread" | "default";
};

export const defaultButtonStyles = (options?: ButtonStyleOptions) => {
  const mode: ButtonMode = options?.mode || "default";
  const tone: ButtonTone = options?.tone || "default";

  return clsx([
    "inline-flex h-[2.5rem] rounded-full items-center justify-center overflow-hidden p-4 text-md font-semibold duration-[350ms] ease group",
    "disabled:opacity-20 disabled:bg-opacity-100",
    mode === "default" &&
      clsx([
        tone === "critical" && "bg-red",
        tone === "default" && "bg-black",
        tone === "shopPay" && "bg-shopPay",
        "hover:bg-opacity-[0.7] text-white",
      ]),
    mode === "outline" &&
      clsx([
        tone === "invert" && "border-color-limestone text-limestone",
        tone === "critical" && "border-color-red text-red",
        tone === "default" && "border-color-offBlack text-offBlack",
        tone === "shopPay" && "border-color-shopPay text-shopPay",
        "bg-transparent border",
        "hover:bg-black hover:text-limestone hover:border-black",
      ]),
  ]);
};

export default function LinkButton({
  backgroundColor,
  className,
  link,
  textColor,
  mode,
  tone,
  layout,
}: Props) {
  if (!link.title) {
    return null;
  }

  return (
    <Link
      className={clsx(
        defaultButtonStyles({
          mode: mode ?? "default",
          tone: tone ?? "default",
        }),
        className,
        layout === "spread" ? "flex w-full justify-between" : ""
      )}
      link={link}
      style={{ background: backgroundColor, color: textColor }}
    >
      <span>{layout === "spread" ? link.title.split("|")[0] : link.title}</span>
      <span className="ml-6 flex items-center gap-x-4 transition-all">
        {layout === "spread" && <span>{link.title.split("|")[1]}</span>}
        <Arrow fill={mode === "outline" ? "black" : "white"} />
      </span>
    </Link>
  );
}
