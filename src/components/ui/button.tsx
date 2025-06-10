import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // ✨ Modern, standout primary button
        default:
          "bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-100 transition-transform duration-200 focus-visible:ring-cyan-400 ring-offset-white dark:ring-offset-gray-950",

        // 🔥 Danger button
        destructive:
          "bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 focus-visible:ring-red-500 ring-offset-white dark:ring-offset-gray-950",

        // 🪟 Minimal outline
        outline:
          "border border-gray-300 text-gray-900 bg-transparent px-4 py-2 rounded-md hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800",

        // 🧊 Secondary button
        secondary:
          "bg-gray-100 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",

        // 👻 Ghost (invisible until hover)
        ghost:
          "text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md dark:text-gray-300 dark:hover:bg-gray-800",

        // 🔗 Link style
        link:
          "text-teal-600 underline-offset-4 hover:underline dark:text-teal-400",
      },
      size: {
        default: "h-10",
        sm: "h-9 px-3 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
