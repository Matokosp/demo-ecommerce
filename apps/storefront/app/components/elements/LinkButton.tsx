import clsx from "clsx";

import Link from "~/components/elements/Link";
import type { SanityLink } from "~/lib/sanity";

import { Arrow } from "./Icons";

type ButtonMode = "default" | "outline" | "centered";
type ButtonTone = "critical" | "default" | "shopPay" | "invert";
type ButtonLayout = "spread" | "default";

type ButtonStyleOptions = {
  mode?: ButtonMode;
  tone?: ButtonTone;
};

type Props = {
  backgroundColor?: string;
  className?: string;
  link: SanityLink;
  textColor?: string;
  mode?: ButtonMode;
  tone?: ButtonTone;
  layout?: ButtonLayout;
  noIcon?: boolean;
};

export const defaultButtonStyles = (options?: ButtonStyleOptions) => {
  const mode: ButtonMode = options?.mode || "default";
  const tone: ButtonTone = options?.tone || "default";

  return clsx([
    "inline-flex h-[2.5rem] rounded-full items-center justify-center overflow-hidden p-4 text-md font-semibold duration-[350ms] ease group",
    "disabled:opacity-20 disabled:bg-opacity-100",
    mode === "default" &&
      clsx([
        tone === "invert" && "border-color-limestone !text-black bg-limestone",
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
    mode === "centered" &&
      clsx([
        "justify-center",
        tone === "default" &&
          "border-color-offBlack text-white bg-black hover:bg-blackOpacity hover:text-limestone hover:border-blackOpacity",
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
  noIcon,
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
        layout === "spread" && mode !== "centered"
          ? "flex w-full justify-between"
          : mode === "centered"
          ? "flex w-full justify-center"
          : ""
      )}
      link={link}
      style={{ background: backgroundColor, color: textColor }}
    >
      <span>{layout === "spread" ? link.title.split("|")[0] : link.title}</span>
      <span
        className={`${
          mode !== "centered" && "ml-6"
        } flex items-center gap-x-4 transition-all`}
      >
        {layout === "spread" && <span>{link.title.split("|")[1]}</span>}
        {!noIcon && (
          <Arrow
            invert={tone === "invert"}
            fill={mode === "outline" || tone === "invert" ? "black" : "white"}
          />
        )}
      </span>
    </Link>
  );
}
