"use client";

import * as T from "@radix-ui/react-tabs";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Pestañas (Radix Tabs) con regla inferior; la activa se marca en ámbar. */
export function Pestanas({
  valor,
  onCambio,
  opciones,
  etiqueta,
  children,
  className,
}: {
  valor: string;
  onCambio: (v: string) => void;
  opciones: { id: string; nombre: ReactNode; deshabilitada?: boolean }[];
  etiqueta: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <T.Root value={valor} onValueChange={onCambio} className={className}>
      <T.List aria-label={etiqueta} className="flex gap-1 overflow-x-auto shadow-regla">
        {opciones.map((o) => (
          <T.Trigger
            key={o.id}
            value={o.id}
            disabled={o.deshabilitada}
            className={cn(
              "inline-flex min-h-11 shrink-0 items-center gap-2 px-3 text-chico text-muted transition-colors duration-150 ease-[var(--ease-base)] md:min-h-10",
              "hover:text-text data-[state=active]:text-text data-[state=active]:shadow-[inset_0_-2px_0_0_var(--t-signal)]",
              "disabled:cursor-not-allowed disabled:hover:text-muted",
            )}
          >
            {o.nombre}
          </T.Trigger>
        ))}
      </T.List>
      {children}
    </T.Root>
  );
}

export const PanelPestana = T.Content;
