import { ComponentProps, ReactNode } from "react";
import clsx from "clsx";

type Props = ComponentProps<"button"> & {
    variant?: "solid" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    fullWidth?: boolean;
    loading?: boolean;
    ariaLabel?: string;
};

export default function Button({
    className,
    variant = "solid",
    size = "md",
    iconLeft,
    iconRight,
    fullWidth = false,
    loading = false,
    children,
    ariaLabel,
    ...props

}: Props) {
    const base =
    "inline-flex items-center justify-center rounded-2xl font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const sizes = {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-11 px-5 text-lg",
    };

    const variants = {
        solid: "bg-black text-white hover:bg-black/90",
        outline:
        "border border-gray-300 text-black hover:bg-gray-50 dark:border-gray-600",
        ghost: "text-black hover:bg-gray-100 dark:text-white",
    };

    return (
        <button
            className={clsx(
                base,
                sizes[size],
                variants[variant],
                fullWidth && "w-full",
                className
            )}
            aria-busy={loading || undefined}
            aria-label={typeof children === "undefined" ? ariaLabel : undefined}
            {...props}
        >
            {iconLeft && <span className="mr-2">{iconLeft}</span>}
            {!loading && children}
            {loading && (
                <span className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
    
            )}
            {iconRight && !loading && <span className="ml-2">{iconRight}</span>}
        </button>
    );
}