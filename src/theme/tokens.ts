export const colors = {
  primary: "var(--color-primary)", secondary: "var(--color-secondary)", success: "var(--color-success)",
  warning: "var(--color-warning)", danger: "var(--color-danger)", info: "var(--color-info)",
  background: "var(--color-background)", surface: "var(--color-surface)", border: "var(--color-border)",
  text: "var(--color-text-primary)", textSecondary: "var(--color-text-secondary)", muted: "var(--color-text-muted)",
} as const;
export const spacing = { xs: "0.25rem", sm: "0.5rem", md: "1rem", lg: "1.5rem", xl: "2rem", "2xl": "3rem" } as const;
export const radius = { sm: "0.375rem", md: "0.5rem", lg: "0.75rem", xl: "1rem", full: "9999px" } as const;
export const shadow = { sm: "0 1px 2px rgb(0 0 0 / 0.05)", md: "0 8px 24px rgb(0 0 0 / 0.12)", lg: "0 20px 50px rgb(0 0 0 / 0.18)" } as const;
export const zIndex = { base: 0, dropdown: 30, sticky: 40, overlay: 50, modal: 60, toast: 70 } as const;
export const duration = { fast: 150, normal: 200, slow: 300 } as const;
export const breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 } as const;
