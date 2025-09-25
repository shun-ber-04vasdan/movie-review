import { forwardRef, TextareaHTMLAttributes, useCallback, useId } from "react";
import clsx from "clsx";

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> & {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  rows?: number;          // 既定 4
  autoGrow?: boolean;     // 入力に応じて高さを自動調整
  showCount?: boolean;    // maxLength 指定時にカウンタ表示
};

const Textarea = forwardRef<HTMLTextAreaElement, Props>(function Textarea(
    {
        id,
        label,
        helperText,
        error,
        className,
        fullWidth = false,
        rows = 4,
        autoGrow = false,
        showCount = false,
        maxLength,
        onInput,
        ...props
    },
    ref
) {
    const autoId = useId();
    const textareaId = id ?? `ta-${autoId}`;
    const helpId = helperText ? `${textareaId}-help` : undefined;
    const errId = error ? `${textareaId}-err` : undefined;

    // ブログにする
    const handleInput = useCallback<NonNullable<typeof onInput>>(
        (e) => {
            if (autoGrow) {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = `${el.scrollHeight}px`;
            }
            onInput?.(e);
        },
        [autoGrow, onInput]
    );

    // ブログにする
    const valueLength =
        typeof props.value === "string"
            ? props.value.length
            : typeof props.defaultValue === "string"
            ? props.defaultValue.length
            : 0;

    return (
         <div className={clsx(fullWidth && "w-full")}>
            {label && (
                <label
                htmlFor={textareaId}
                className="mb-1 block text-sm font-medium text-gray-800"
                >
                {label}
                </label>
            )}

            <div
                className={clsx(
                "rounded-2xl border bg-white transition focus-within:ring-2 focus-within:ring-offset-2",
                error
                    ? "border-red-500 focus-within:ring-red-500"
                    : "border-gray-300 focus-within:ring-black",
                className
                )}
            >
                <textarea
                id={textareaId}
                ref={ref}
                rows={rows}
                className={clsx(
                    "w-full resize-none bg-transparent px-3 py-2 outline-none",
                    "placeholder:text-gray-400"
                )}
                aria-invalid={!!error || undefined}
                aria-describedby={clsx(helpId, errId) || undefined}
                maxLength={maxLength}
                onInput={handleInput}
                {...props}
                />
            </div>

            <div className="mt-1 flex items-start justify-between">
                {helperText && !error && (
                <p id={helpId} className="text-xs text-gray-500">
                    {helperText}
                </p>
                )}
                {error && (
                <p id={errId} className="text-xs text-red-600">
                    {error}
                </p>
                )}
                {showCount && typeof maxLength === "number" && (
                <p className="ml-auto text-xs text-gray-500">
                    {valueLength}/{maxLength}
                </p>
                )}
            </div>
        </div>
    );
});

export default Textarea;