import { CircleCheck, CircleHelp, CircleX, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/cn";
import { nombreVeredicto } from "@/mocks/verificaciones";
import type { Veredicto } from "@/mocks/tipos";

const estilo: Record<Veredicto, { texto: string; borde: string; Icono: typeof CircleCheck }> = {
  verificado: { texto: "text-verificado", borde: "border-verificado", Icono: CircleCheck },
  enganoso: { texto: "text-enganoso", borde: "border-enganoso", Icono: TriangleAlert },
  falso: { texto: "text-falso", borde: "border-falso", Icono: CircleX },
  "sin-evidencia": { texto: "text-sin-evidencia", borde: "border-sin-evidencia", Icono: CircleHelp },
};

/** Filtro de "tinta": bordes irregulares, como un sello de goma. Se monta una vez. */
export function FiltroTinta() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
      <filter id="tinta" x="-5%" y="-20%" width="110%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="ruido" />
        <feDisplacementMap in="SourceGraphic" in2="ruido" scale="1.6" />
      </filter>
    </svg>
  );
}

/** Sello de veredicto: color + icono + texto (nunca solo color). */
export function SelloVeredicto({ veredicto, grande = false, className }: { veredicto: Veredicto; grande?: boolean; className?: string }) {
  const e = estilo[veredicto];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-editorial border-2 font-mono tabular",
        grande ? "-rotate-2 px-2.5 py-1 text-chico" : "px-1.5 py-0.5 text-dato",
        e.texto,
        e.borde,
        className,
      )}
      style={{ filter: grande ? "url(#tinta)" : undefined }}
    >
      <e.Icono size={grande ? 16 : 12} strokeWidth={1.5} aria-hidden />
      {nombreVeredicto[veredicto]}
    </span>
  );
}
