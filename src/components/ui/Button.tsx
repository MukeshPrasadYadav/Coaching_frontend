import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
}

export function Button({ loading = false, children, disabled, ...props }: ButtonProps) {
  return (
    <button className="button" disabled={disabled || loading} {...props}>
      {loading && <span className="spinner" aria-hidden="true" />}
      {loading ? "Please wait…" : children}
    </button>
  );
}
