import type { ReactNode } from "react";

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <main className="auth-page">
      <section className="auth-brand" aria-label="Coaching Management System">
        <div className="brand-mark">CM</div>
        <div>
          <p className="eyebrow">Coaching Management</p>
          <h1>Teach with clarity.<br />Grow with purpose.</h1>
          <p className="brand-copy">One focused workspace for your institute, educators, and students.</p>
        </div>
        <p className="brand-foot">Secure access · Simple management</p>
      </section>
      <section className="auth-panel">
        <div className="auth-card">
          <div className="mobile-brand"><span className="brand-mark small">CM</span> Coaching Management</div>
          <p className="eyebrow">Account access</p>
          <h2>{title}</h2>
          <p className="subtitle">{subtitle}</p>
          {children}
        </div>
      </section>
    </main>
  );
}
