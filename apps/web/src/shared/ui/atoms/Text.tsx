import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  size?: "sm" | "md" | "lg";
  tone?: "default" | "muted" | "danger" | "success";
  truncate?: boolean;
  clamp?: number;         // 行数制限
  children: ReactNode;
  className?: string;
};

export default function Text({
  size = "md",
  tone = "default",
  truncate = false,
  clamp,
  children,
  className,
}: Props) {
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const tones = {
    default: "text-gray-900",
    muted: "text-gray-500",
    danger: "text-red-600",
    success: "text-green-600",
  };

  return (
    <p
      className={clsx(
        sizes[size],
        tones[tone],
        truncate && "truncate",
        clamp && `line-clamp-${clamp}`,
        className
      )}
    >
      {children}
    </p>
  );
}
