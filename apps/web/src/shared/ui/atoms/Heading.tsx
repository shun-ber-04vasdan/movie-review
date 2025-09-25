import { ElementType, ReactNode } from "react";
import clsx from "clsx";

type Props = {
  as?: ElementType;                 // DOMタグ（デフォ h2）
  level?: 1 | 2 | 3 | 4 | 5 | 6;    // 意味的な見出しレベル
  align?: "start" | "center" | "end";
  children: ReactNode;
  className?: string;
};

export default function Heading({
  as,
  level = 2,
  align = "start",
  children,
  className,
}: Props) {
  const Tag = as ?? (`h${level}` as ElementType);

  const sizes = {
    1: "text-3xl font-bold",
    2: "text-2xl font-bold",
    3: "text-xl font-semibold",
    4: "text-lg font-semibold",
    5: "text-base font-semibold",
    6: "text-sm font-semibold",
  };

  return (
    <Tag
      className={clsx(
        sizes[level],
        align === "center" && "text-center",
        align === "end" && "text-right",
        className
      )}
    >
      {children}
    </Tag>
  );
}
