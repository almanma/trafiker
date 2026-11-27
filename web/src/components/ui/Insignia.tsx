import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type TonoInsignia =
  | "neutro"
  | "marca"
  | "verificado"
  | "enganoso"
  | "falso"
  | "sin-verificar"
  | "izquierda"
  | "centro"
  | "derecha";

const tonos: Record<TonoInsignia, string> = {
  neutro: "border-border bg-surface-2 text-muted",
  marca: "border-transparent bg-signal-suave text-signal",
  verificado: "border-verificado-borde bg-verificado-suave text-verificado",
  enganoso: "border-enganoso-borde bg-enganoso-suave text-enganoso",
  falso: "border-falso-borde bg-falso-suave text-falso",
  "sin-verificar": "border-sin-verificar-borde bg-sin-verificar-suave text-sin-verificar",
  izquierda: "border-transparent bg-izquierda-suave text-izquierda-texto",
  centro: "border-transparent bg-centro-suave text-centro",
  derecha: "border-transparent bg-derecha-suave text-derecha",
};

/**
 * Badge de estado. Plano, con borde de 1 px y tinte suave; el texto siempre
 * va con el color (nunca solo color). Dos tamaños.
 */
export function Insignia({
  tono = "neutro",
  tamano = "sm",
  className,
  ...p
}: HTMLAttributes<HTMLSpanElement> & { tono?: TonoInsignia; tamano?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-editorial border font-medium tabular",
        tamano === "sm" ? "h-5 px-1.5 text-dato" : "h-6 px-2 text-chico",
        tonos[tono],
        className,
      )}
      {...p}
    />
  );
}
