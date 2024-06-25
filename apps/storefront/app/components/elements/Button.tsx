import { RemixLinkProps } from "@remix-run/react/dist/components";
import clsx from "clsx";
import type { ButtonHTMLAttributes, ElementType } from "react";
import { twMerge } from "tailwind-merge";

import { Link } from "~/components/Link";

type ButtonMode = "default" | "outline";
type ButtonTone = "critical" | "default" | "shopPay" | "invert";

type RemixLinkPropsOptional = Omit<RemixLinkProps, "to"> & {
  to?: RemixLinkProps["to"];
};

type Props = {
  as?: ElementType;
  className?: string;
  mode?: ButtonMode;
  onClick?: () => void;
  to?: string;
  tone?: ButtonTone;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  RemixLinkPropsOptional;

type ButtonStyleOptions = {
  mode?: ButtonMode;
  tone?: ButtonTone;
};

export const defaultButtonStyles = (options?: ButtonStyleOptions) => {
  const mode: ButtonMode = options?.mode || "default";
  const tone: ButtonTone = options?.tone || "default";

  return clsx([
    "inline-flex h-[2.5rem] rounded-full items-center justify-center overflow-hidden p-4 text-md font-semibold duration-200 ease-out group",
    "disabled:opacity-20 disabled:bg-opacity-100",
    "hover:bg-black hover:bg-opacity-100",
    mode === "default" &&
      clsx([
        tone === "critical" && "bg-red",
        tone === "default" && "bg-offBlack",
        tone === "shopPay" && "bg-shopPay",
        "hover:opacity-80 text-white",
      ]),
    mode === "outline" &&
      clsx([
        tone === "invert" && "border-color-limestone text-limestone",
        tone === "critical" && "border-color-red text-red",
        tone === "default" && "border-color-offBlack text-offBlack",
        tone === "shopPay" && "border-color-shopPay text-shopPay",
        "bg-transparent border",
        "hover:bg-black hover:text-limestone hover:border-black hover:font-bold",
      ]),
  ]);
};

export default function Button({
  as = "button",
  className,
  mode = "default",
  tone,
  ...props
}: Props) {
  const Component = props?.to ? Link : as;

  return (
    <Component
      className={twMerge(defaultButtonStyles({ mode, tone }), className)}
      {...props}
    />
  );
}
