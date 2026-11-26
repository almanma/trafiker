import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Superficie base: blanca sobre el fondo gris, borde de 1 px, radio 12 y
 * elevación e1. `interactiva` sube a e2 al pasar el mouse.
 */
export function Tarjeta({
  interactiva = false,
  relleno = true,
  className,
  ...p
}: HTMLAttributes<HTMLDivElement> & { interactiva?: boolean; relleno?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-panel border border-border bg-surface shadow-e1",
        relleno && "p-4 md:p-5",
        interactiva && "transition-[box-shadow,border-color] duration-200 ease-[var(--ease-base)] hover:border-border-strong hover:shadow-e2",
        className,
      )}
      {...p}
    />
  );
}

/** Encabezado de tarjeta: título a la izquierda, acción a la derecha. */
export function CabeceraTarjeta({ titulo, accion, className }: { titulo: React.ReactNode; accion?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <h3 className="text-chico font-semibold text-text">{titulo}</h3>
      {accion}
    </div>
  );
}
