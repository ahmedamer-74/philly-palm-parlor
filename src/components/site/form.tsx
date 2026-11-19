import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const base = "w-full rounded-xl border bg-card px-4 text-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-gold focus:ring-2 focus:ring-gold/20";

export function Field({ label, htmlFor, children, className, hint }: { label: string; htmlFor: string; children: ReactNode; className?: string; hint?: string }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(base, "h-11", props.className)} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(base, "min-h-28 py-3", props.className)} />;
}

export function NativeSelect(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(base, "h-11 appearance-none bg-card", props.className)} />;
}

export function FormCard({ step, title, children }: { step?: number; title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border bg-card p-6 shadow-soft sm:p-8">
      <h2 className="mb-6 flex items-center gap-3 text-2xl text-primary">
        {step != null && <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-gold font-sans text-sm font-bold text-gold-foreground">{step}</span>}
        {title}
      </h2>
      {children}
    </section>
  );
}
