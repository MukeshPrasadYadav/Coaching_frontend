export type ToastKind = "success" | "error" | "warning" | "info";
export interface ToastPayload { id: number; message: string; kind: ToastKind; }
type Listener = (toast: ToastPayload) => void;
const listeners = new Set<Listener>();
function emit(message: string, kind: ToastKind) { const toast = { id: Date.now() + Math.random(), message, kind }; listeners.forEach(listener => listener(toast)); }
export function subscribeToToasts(listener: Listener) { listeners.add(listener); return () => { listeners.delete(listener); }; }
export const toastSuccess = (message: string) => emit(message, "success");
export const toastError = (message: string) => emit(message, "error");
export const toastWarning = (message: string) => emit(message, "warning");
export const toastInfo = (message: string) => emit(message, "info");
