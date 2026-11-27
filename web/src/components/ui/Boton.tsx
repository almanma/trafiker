import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variante = "primario" | "secundario" | "fantasma" | "peligro";
type Tamano = "sm" | "md";

/**
 * Botón. Primario en color de marca con elevación e1; secundario blanco con
 * borde de 1 px; fantasma sin fondo; peligro para acciones destructivas.
 * Táctil 44 px en móvil; 36 px (md) o 32 px (sm) desde tablet.
 */
export const clasesBoton = (variante: Variante = "secundario", className?: string, tamano: Tamano = "md") =>
  cn(
    "relative inline-flex min-h-11 select-none items-center justify-center gap-2 whitespace-nowrap rounded-control text-chico font-medium",
    tamano === "md" ? "px-3.5 md:min-h-9" : "px-2.5 md:min-h-8",
    "transition-[background-color,color,box-shadow,transform] duration-150 ease-[var(--ease-base)] active:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-50",
    variante === "primario" && "bg-signal text-sobre-senal shadow-e1 hover:bg-signal-hover hover:shadow-e2",
    variante === "secundario" && "border border-border-strong bg-surface text-text shadow-e1 hover:bg-surface-2",
    variante === "fantasma" && "text-muted hover:bg-surface-2 hover:text-text",
    variante === "peligro" && "border border-falso-borde bg-surface text-falso hover:bg-falso-suave",
    className,
  );

export const Boton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { variante?: Variante; tamano?: Tamano }>(
  function Boton({ variante, tamano, className, type = "button", ...p }, ref) {
    return <button ref={ref} type={type} className={clasesBoton(variante, className, tamano)} {...p} />;
  },
);

/** Chip de filtro (píldora). Activo: tinte de marca, no negro sólido. */
export function Chip({ activo, className, ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { activo?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={activo}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 rounded-pildora border px-3 text-chico font-medium md:min-h-8",
        "transition-[color,background-color,border-color,transform] duration-150 ease-[var(--ease-base)] active:scale-[0.97]",
        activo ? "border-signal bg-signal-suave text-signal" : "border-border bg-surface text-muted hover:border-border-strong hover:text-text",
        className,
      )}
      {...p}
    />
  );
}
