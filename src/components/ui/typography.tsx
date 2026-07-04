import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const typographyVariants = cva("text-text-primary", { variants: { variant: {
  title: "text-3xl font-bold tracking-tight md:text-4xl", subtitle: "text-xl font-semibold tracking-tight",
  body: "text-sm leading-6", small: "text-xs leading-5", muted: "text-sm leading-6 text-muted-foreground",
  error: "text-sm text-danger",
} }, defaultVariants: { variant: "body" } });
type TypographyProps = HTMLAttributes<HTMLElement> & VariantProps<typeof typographyVariants>;

export const Text = forwardRef<HTMLParagraphElement, TypographyProps>(function Text({ className, variant, ...props }, ref) { return <p ref={ref} className={cn(typographyVariants({ variant }), className)} {...props} />; });
export const Heading = forwardRef<HTMLHeadingElement, TypographyProps>(function Heading({ className, variant = "title", ...props }, ref) { return <h1 ref={ref} className={cn(typographyVariants({ variant }), className)} {...props} />; });
export const SubHeading = forwardRef<HTMLHeadingElement, TypographyProps>(function SubHeading({ className, variant = "subtitle", ...props }, ref) { return <h2 ref={ref} className={cn(typographyVariants({ variant }), className)} {...props} />; });
export const Caption = forwardRef<HTMLElement, TypographyProps>(function Caption({ className, variant = "small", ...props }, ref) { return <span ref={ref} className={cn(typographyVariants({ variant }), className)} {...props} />; });
export const Label = forwardRef<HTMLLabelElement, TypographyProps & { htmlFor?: string }>(function Label({ className, variant = "small", ...props }, ref) { return <label ref={ref} className={cn(typographyVariants({ variant }), "font-medium", className)} {...props} />; });
