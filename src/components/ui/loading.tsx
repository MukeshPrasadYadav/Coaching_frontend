import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { cn } from "../../lib/cn";

const spinnerVariants = cva("animate-spin", { variants: { size: { sm: "size-4", md: "size-6", lg: "size-10" } }, defaultVariants: { size: "md" } });
export function Spinner({ size, className, label = "Loading" }: VariantProps<typeof spinnerVariants> & { className?: string; label?: string }) { return <LoaderCircle role="status" aria-label={label} className={cn(spinnerVariants({ size }), className)} />; }
export function Skeleton({ className }: { className?: string }) { return <div aria-hidden="true" className={cn("animate-pulse rounded-md bg-muted", className)} />; }
export function FullPageLoader({ label = "Loading application" }: { label?: string }) { return <div className="grid min-h-screen place-items-center"><div className="flex flex-col items-center gap-3"><Spinner size="lg" /><span className="text-sm text-muted-foreground">{label}</span></div></div>; }
export function CardSkeleton() { return <div className="space-y-4 rounded-lg border bg-surface p-6"><Skeleton className="h-6 w-2/5" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-4/5" /></div>; }
export function TableSkeleton({ rows = 5 }: { rows?: number }) { return <div className="space-y-3" aria-label="Loading table">{Array.from({ length: rows }, (_, index) => <Skeleton key={index} className="h-12 w-full" />)}</div>; }
