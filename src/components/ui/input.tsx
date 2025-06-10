import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      {...props}
      className={cn(
        "w-full rounded-xl border border-gray-300 bg-white/60 px-4 py-2 text-gray-900 placeholder-gray-500 shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300",
        "dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-400 dark:focus:ring-indigo-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    />
  );
});

Input.displayName = "Input";

export { Input };
