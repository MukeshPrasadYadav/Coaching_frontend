import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import { Spinner } from "./loading";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  { variants: {
    variant: {
      primary: "bg-primary text-primary-foreground hover:brightness-110",
      secondary: "bg-secondary text-secondary-foreground hover:brightness-95",
      outline: "border border-border bg-transparent text-text-primary hover:bg-muted",
      ghost: "text-text-primary hover:bg-muted",
      danger: "bg-danger text-white hover:brightness-110",
      success: "bg-success text-white hover:brightness-110",
      link: "h-auto text-primary underline-offset-4 hover:underline",
    },
    size: { sm: "h-8 px-3 text-xs", md: "h-10 px-4 text-sm", lg: "h-12 px-6 text-base", icon: "size-10 p-0" },
    fullWidth: { true: "w-full" },
  }, defaultVariants: { variant: "primary", size: "md" } },
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean; leftIcon?: ReactNode; rightIcon?: ReactNode; asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, fullWidth, loading, disabled, leftIcon, rightIcon, children, type = "button", asChild, ...props }, ref,
) {
  const Component = asChild ? Slot : "button";
  return <Component ref={ref} type={asChild ? undefined : type} className={cn(buttonVariants({ variant, size, fullWidth }), className)} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
    {loading ? <Spinner size="sm" /> : leftIcon}{children}{!loading && rightIcon}
  </Component>;
});
