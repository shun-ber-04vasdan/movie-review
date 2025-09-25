import NextLink from "next/link"; // ブログ
import { AnchorHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  external?: boolean;        // 外部リンクかどうか
  underline?: "auto" | "always" | "none";
  children: ReactNode;
};

export default function Link({
  href,
  external = false,
  underline = "auto",
  className,
  children,
  ...props
}: Props) {
  const classes = clsx(
    "text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
    underline === "always" && "underline",
    underline === "none" && "no-underline",
    underline === "auto" && "hover:underline",
    className
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
        <span className="ml-1 text-xs" aria-hidden>
          ↗
        </span>
      </a>
    );
  }

  return (
    <NextLink href={href} className={classes} {...props}>
      {children}
    </NextLink>
  );
}
