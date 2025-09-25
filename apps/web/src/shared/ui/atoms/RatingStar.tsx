import { HTMLAttributes } from "react";
import clsx from "clsx";

type Props = HTMLAttributes<HTMLSpanElement> & {
  filled?: boolean;     // 塗りつぶし状態
  size?: "sm" | "md";   // 星の大きさ
  ariaLabel?: string;   // アイコン単体で使うとき用
};

export default function RatingStar({
  filled = false,
  size = "md",
  ariaLabel,
  className,
  ...props
}: Props) {
  const sizes = {
    sm: "text-sm",
    md: "text-base",
  };

  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={clsx(
        sizes[size],
        filled ? "text-yellow-500" : "text-gray-300",
        className
      )}
      {...props}
    >
      ★
    </span>
  );
}
