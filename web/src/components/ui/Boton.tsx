import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variante = "primario" | "secundario" | "fantasma";

export const clasesBoton = (variante: Variante = "secundario", className?: string) =>
  cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-control px-3 text-chico font-medium md:min-h-9",
    "transition-[background-color,color,transform] duration-150 ease-[var(--ease-base)] active:scale-[0.98]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    variante === "primario" && "bg-signal text-sobre-senal hover:bg-text hover:text-bg",
    variante === "secundario" && "bg-surface-2 text-text shadow-[inset_0_0_0_1px_var(--t-border-strong)] hover:bg-surface",
    variante === "fantasma" && "text-muted hover:bg-surface-2 hover:text-text",
    className,
  );

export const Boton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { variante?: Variante }>(
  function Boton({ variante, className, type = "button", ...p }, ref) {
    return <button ref={ref} type={type} className={clasesBoton(variante, className)} {...p} />;
  },
);

/** Chip de filtro: la única píldora del sistema. */
export function Chip({ activo, className, ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { activo?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={activo}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 rounded-pildora px-3 text-chico md:min-h-8",
        "transition-colors duration-150 ease-[var(--ease-base)]",
        activo ? "bg-text text-bg" : "text-muted shadow-[inset_0_0_0_1px_var(--t-border-strong)] hover:text-text",
        className,
      )}
      {...p}
    />
  );
}
