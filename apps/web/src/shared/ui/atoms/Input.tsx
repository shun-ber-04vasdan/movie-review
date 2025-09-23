import { forwardRef, InputHTMLAttributes, ReactNode, useId } from "react";
import clsx from "clsx";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  helperText?: string;
  error?: string;
  prefix?: ReactNode;         // アイコンやテキスト
  suffix?: ReactNode;         // アイコンやテキスト
  fullWidth?: boolean;
};

const Input = forwardRef<HTMLInputElement, Props>(function Input(
    {
        id,
        label,
        helperText,
        error,
        prefix,
        suffix,
        className,
        fullWidth = false,
        ...props
    },
    ref
) {
    const autoId = useId();
    const inputId = id ?? `in-${autoId}`;
    const helpId = helperText ? `${inputId}-help` : undefined;
    const errId = error ? `${inputId}-err` : undefined;

    return (
        <div className={clsx(fullWidth && "w-full")}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="mb-1 block text-sm font-medium text-gray-800"
                >
                    {label}
                </label>
            )}
            <div
                className={clsx(
                    "flex items-center gap-2 rounded-2xl border bg-white px-3 py-2 transition",
                    "focus-within:ring-2 focus-within:ring-offset-2",
                    error
                        ? "border-red-500 focus-within:ring-red-500"
                        : "border-gray-300 focus-within:ring-black",
                    className
                )}
            >
                {prefix && <span className="shrink-0">{prefix}</span>}
                <input
                    id={inputId}
                    ref={ref}
                    className={clsx(
                        "min-w-0 flex-1 bg-transparent outline-none",
                        "placeholder:text-gray-400"
                    )}
                    aria-invalid={!!error || undefined}
                    aria-describedby={clsx(helpId, errId) || undefined}
                    {...props}
                />
                {suffix && <span className="shrink-0">{suffix}</span>}
            </div>

            {helperText && !error && (
                <p id={helpId} className="mt-1 text-xs text-gray-500">
                {helperText}
                </p>
            )}
            {error && (
                <p id={errId} className="mt-1 text-xs text-red-600">
                {error}
                </p>
            )};
        </div>
    )
});

export default Input;