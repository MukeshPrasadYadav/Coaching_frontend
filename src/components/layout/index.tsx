import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import type { HTMLAttributes } from "react";
const gapVariants = cva("", { variants: { gap: { none: "gap-0", xs: "gap-1", sm: "gap-2", md: "gap-4", lg: "gap-6", xl: "gap-8" } }, defaultVariants: { gap: "md" } });
type BoxProps = HTMLAttributes<HTMLDivElement>;
export function Container({ className, ...props }: BoxProps) { return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props}/>; }
export function Page({ className, ...props }: BoxProps) { return <main className={cn("min-h-screen bg-background py-8", className)} {...props}/>; }
export function Section({ className, ...props }: BoxProps) { return <section className={cn("py-6", className)} {...props}/>; }
export function PageHeader({ className, ...props }: BoxProps) { return <header className={cn("mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center", className)} {...props}/>; }
export function Stack({ className, gap, ...props }: BoxProps & VariantProps<typeof gapVariants>) { return <div className={cn("flex flex-col", gapVariants({ gap }), className)} {...props}/>; }
export function Flex({ className, gap, ...props }: BoxProps & VariantProps<typeof gapVariants>) { return <div className={cn("flex items-center", gapVariants({ gap }), className)} {...props}/>; }
export function Grid({ className, gap, ...props }: BoxProps & VariantProps<typeof gapVariants>) { return <div className={cn("grid", gapVariants({ gap }), className)} {...props}/>; }
export function Spacer({ size = "md" }: { size?: "sm" | "md" | "lg" | "xl" }) { return <div aria-hidden="true" className={cn({ sm: "h-2", md: "h-4", lg: "h-6", xl: "h-8" }[size])}/>; }
