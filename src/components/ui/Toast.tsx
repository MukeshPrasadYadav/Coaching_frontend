import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from "lucide-react";
import { subscribeToToasts, type ToastPayload } from "../../lib/toast";
import { cn } from "../../lib/cn";
import { Button } from "./Button";
const icons = { success: CheckCircle2, error: AlertCircle, warning: TriangleAlert, info: Info };
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastPayload[]>([]);
  useEffect(() => subscribeToToasts(toast => { setToasts(items => [...items, toast]); window.setTimeout(() => setToasts(items => items.filter(item => item.id !== toast.id)), 4000); }), []);
  const dismiss = (id: number) => setToasts(items => items.filter(item => item.id !== id));
  return <>{children}<div className="fixed right-4 top-4 z-[70] grid w-[min(24rem,calc(100vw-2rem))] gap-2" aria-live="polite" aria-atomic="true">{toasts.map(toast => { const Icon = icons[toast.kind]; return <div key={toast.id} className={cn("flex items-start gap-3 rounded-lg border bg-surface p-4 shadow-lg", { success: "border-success/40", error: "border-danger/40", warning: "border-warning/40", info: "border-info/40" }[toast.kind])}><Icon className={cn("mt-0.5 size-5 shrink-0", { success: "text-success", error: "text-danger", warning: "text-warning", info: "text-info" }[toast.kind])}/><p className="flex-1 text-sm">{toast.message}</p><Button variant="ghost" size="icon" className="-m-2 size-8" onClick={() => dismiss(toast.id)} aria-label="Dismiss notification"><X className="size-4"/></Button></div>; })}</div></>;
}
