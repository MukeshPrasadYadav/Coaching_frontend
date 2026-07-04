import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
const badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", { variants: { variant: { success: "bg-success/15 text-success", danger: "bg-danger/15 text-danger", warning: "bg-warning/15 text-warning", info: "bg-info/15 text-info", secondary: "bg-secondary text-secondary-foreground" } }, defaultVariants: { variant: "secondary" } });
export function Badge({ variant, className, children }: VariantProps<typeof badgeVariants> & { className?: string; children: React.ReactNode }) { return <span className={cn(badgeVariants({ variant }), className)}>{children}</span>; }
