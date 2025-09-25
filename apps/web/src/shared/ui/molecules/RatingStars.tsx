import { useMemo, useState, KeyboardEvent } from "react";
import clsx from "clsx";
import RatingStar from "../atoms/RatingStar";

type Props = {
  value: number;                     // 現在値（0〜outOf）
  outOf?: number;                    // 既定: 5
  editable?: boolean;                // trueで選択可能
  onChange?: (next: number) => void; // editable時に必須
  size?: "sm" | "md";
  showValue?: boolean;               // 右側に「3/5」を表示
  ariaLabel?: string;                // 読み上げ用（非編集時に有効）
  className?: string;
};

export default function RatingStars({
    value,
    outOf = 5,
    editable = false,
    onChange,
    size = "md",
    showValue = false,
    ariaLabel = "Rating",
    className,
}: Props) {
    const [hover, setHover] = useState<number | null>(null);
    const displayValue = hover ?? value;

    // useMemoブログ
    const stars = useMemo(() => Array.from({ length: outOf }, (_, i) => i + 1), [outOf]);

    const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
        if (!editable || !onChange) return;
        
        if (e.key === "ArrowRight" || e.key === "ArrowUp") {
            e.preventDefault();
            onChange(Math.min(outOf, (value || 0) + 1));
        } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
            e.preventDefault();
            onChange(Math.max(0, (value || 0) - 1));
        } else if (e.key === "Home") {
            e.preventDefault();
            onChange(0);
        } else if (e.key === "End") {
            e.preventDefault();
            onChange(outOf);
        }
    };

    if (!editable) {
        // 表示専用
        return (
            <div
                role="img"
                aria-label={`${ariaLabel}: ${value}/${outOf}`}
                className={clsx("flex items-center gap-1", className)}
            >
                {stars.map((i) => (
                    <RatingStar key={i} size={size} filled={i <= displayValue} />
                ))}
                {showValue && (
                    <span className="ml-1 text-sm text-gray-600">{value}/{outOf}</span>
                )}
            </div>
        )
    }

    return (
        <div
            role="radiogroup"
            aria-label={ariaLabel}
            className={clsx("flex items-center gap-1", className)}
            onKeyDown={handleKey}
            onMouseLeave={() => setHover(null)}
        >
            {stars.map((i) => {
                const checked = i <= value && (i === value || value === outOf ? true : i === value);
                const filled = i <= displayValue;

                return (
                    <button
                        key={i}
                        type="button"
                        role="radio"
                        aria-checked={checked}
                        tabIndex={i === Math.max(1, Math.min(value || 1, outOf)) ? 0 : -1}
                        className="p-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
                        onMouseEnter={() => setHover(i)}
                        onClick={() => onChange && onChange(i)}
                    >
                        <RatingStar size={size} filled={filled} ariaLabel={undefined} />
                    </button>
                );
            })}
            {showValue && (
                <span className="ml-1 text-sm text-gray-600" aria-live="polite">
                    {value}/{outOf}
                </span>
            )}
        </div>
    );
}