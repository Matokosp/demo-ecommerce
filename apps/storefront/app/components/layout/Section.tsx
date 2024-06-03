import clsx from "clsx";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode | ReactNode[];
  className?: string;
  style?: any;
  noPadding?: boolean;
  screenHight?: boolean;
}

export const Section = ({
  children,
  className,
  style,
  noPadding,
}: SectionProps) => {
  return (
    <section
      style={style}
      className={clsx(
        `grid h-full grid-cols-12 gap-x-5  ${className ?? ""}`,
        !noPadding ? "p-[22px]" : ""
      )}
    >
      {children}
    </section>
  );
};
