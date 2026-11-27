import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Tabla del sistema: contenedor blanco con borde, encabezado gris fijo
 * (sticky) y filas con hover. Las cifras van a la derecha y tabulares.
 */
export function Tabla({ className, contenedor, ...p }: HTMLAttributes<HTMLTableElement> & { contenedor?: string }) {
  return (
    <div className={cn("relative overflow-auto rounded-panel border border-border bg-surface shadow-e1", contenedor)}>
      <table className={cn("w-full border-separate border-spacing-0 text-left text-chico", className)} {...p} />
    </div>
  );
}

export function Th({ className, numerica, ...p }: ThHTMLAttributes<HTMLTableCellElement> & { numerica?: boolean }) {
  return (
    <th
      scope="col"
      className={cn(
        "sticky top-0 z-10 h-10 whitespace-nowrap border-b border-border bg-surface-2 px-4 text-dato font-medium text-muted",
        numerica && "text-right",
        className,
      )}
      {...p}
    />
  );
}

export function Td({ className, numerica, ...p }: TdHTMLAttributes<HTMLTableCellElement> & { numerica?: boolean }) {
  return <td className={cn("border-b border-border px-4 py-3 align-middle", numerica && "text-right tabular", className)} {...p} />;
}

export function Fila({ className, ...p }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn("transition-colors duration-150 hover:bg-surface-2 [&:last-child>td]:border-b-0", className)} {...p} />;
}
