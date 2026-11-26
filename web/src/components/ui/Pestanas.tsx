"use client";

import * as T from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Pestañas (Radix Tabs). Dos variantes:
 * - subrayado: regla inferior; el indicador de marca se desliza entre pestañas.
 * - segmentado: control compacto con fondo gris y pastilla blanca que se desliza.
 */
export function Pestanas({
  valor,
  onCambio,
  opciones,
  etiqueta,
  variante = "subrayado",
  children,
  className,
}: {
  valor: string;
  onCambio: (v: string) => void;
  opciones: { id: string; nombre: ReactNode; deshabilitada?: boolean }[];
  etiqueta: string;
  variante?: "subrayado" | "segmentado";
  children?: ReactNode;
  className?: string;
}) {
  const grupo = useId();
  const segmentado = variante === "segmentado";
  return (
    <T.Root value={valor} onValueChange={onCambio} className={className}>
      <T.List
        aria-label={etiqueta}
        className={cn(
          segmentado ? "inline-flex gap-0.5 rounded-control border border-border bg-surface-2 p-0.5" : "flex gap-1 overflow-x-auto border-b border-border",
        )}
      >
        {opciones.map((o) => {
          const activa = o.id === valor;
          return (
            <T.Trigger
              key={o.id}
              value={o.id}
              disabled={o.deshabilitada}
              className={cn(
                "relative inline-flex shrink-0 items-center gap-2 text-chico font-medium text-muted transition-colors duration-150 ease-[var(--ease-base)]",
                "hover:text-text data-[state=active]:text-text disabled:cursor-not-allowed disabled:hover:text-muted",
                segmentado ? "min-h-11 rounded-[6px] px-3 md:min-h-8" : "min-h-11 px-3 md:min-h-10",
              )}
            >
              {activa && (
                <motion.span
                  layoutId={`pestana-${grupo}`}
                  transition={{ type: "spring", stiffness: 520, damping: 40 }}
                  className={cn(
                    "absolute",
                    segmentado ? "inset-0 rounded-[6px] border border-border bg-surface shadow-e1" : "inset-x-2 -bottom-px h-0.5 rounded-pildora bg-signal",
                  )}
                  aria-hidden
                />
              )}
              <span className="relative inline-flex items-center gap-2">{o.nombre}</span>
            </T.Trigger>
          );
        })}
      </T.List>
      {children}
    </T.Root>
  );
}

export const PanelPestana = T.Content;
