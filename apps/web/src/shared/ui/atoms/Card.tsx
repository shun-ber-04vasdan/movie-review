import { ElementType, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type BaseProps = {
  as?: ElementType;
  padding?: "none" | "sm" | "md" | "lg";
  interactive?: boolean;     // hover影/フォーカスリング
  header?: ReactNode;        // 上部スロット（任意）
  footer?: ReactNode;        // 下部スロット（任意）
  children?: ReactNode; // ブログ
};

type Props = BaseProps & Omit<HTMLAttributes<HTMLElement>, "children">;

export default function Card({
  as: Tag = "div", // ブログ
  padding = "md",
  interactive = false,
  header,
  footer,
  className,
  children,
  ...props
}: Props) {
  const paddings = {
    none: "p-0",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <Tag
      className={clsx(
        "rounded-2xl border bg-white shadow-sm",
        interactive && "transition hover:shadow focus-within:ring-2 focus-within:ring-offset-2",
        paddings[padding],
        className
      )}
      {...props}
    >
      {header && <div className={clsx(padding !== "none" && "mb-3")}>{header}</div>}
      {children}
      {footer && <div className={clsx(padding !== "none" && "mt-3")}>{footer}</div>}
    </Tag>
  );
}
