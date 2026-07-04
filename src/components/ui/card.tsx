import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
const cardVariants = cva("rounded-lg bg-surface text-text-primary", { variants: { variant: { default: "border border-border", outlined: "border-2 border-border", elevated: "border border-border shadow-lg", hover: "border border-border transition hover:-translate-y-0.5 hover:shadow-lg" } }, defaultVariants: { variant: "default" } });
export interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card({ className, variant, ...props }, ref) { return <div ref={ref} className={cn(cardVariants({ variant }), className)} {...props}/>; });
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardHeader({ className, ...props }, ref) { return <div ref={ref} className={cn("space-y-1.5 p-6 pb-0", className)} {...props}/>; });
export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardContent({ className, ...props }, ref) { return <div ref={ref} className={cn("p-6", className)} {...props}/>; });
export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardFooter({ className, ...props }, ref) { return <div ref={ref} className={cn("flex items-center gap-3 p-6 pt-0", className)} {...props}/>; });
