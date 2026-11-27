import { CircleCheck, CircleDashed, CircleHelp, CircleX, TriangleAlert } from "lucide-react";
import { nombreVeredicto } from "@/mocks/verificaciones";
import type { Veredicto } from "@/mocks/tipos";
import { Insignia, type TonoInsignia } from "../ui/Insignia";

const estilo: Record<Veredicto, { tono: TonoInsignia; Icono: typeof CircleCheck }> = {
  verificado: { tono: "verificado", Icono: CircleCheck },
  enganoso: { tono: "enganoso", Icono: TriangleAlert },
  falso: { tono: "falso", Icono: CircleX },
  "sin-evidencia": { tono: "sin-verificar", Icono: CircleHelp },
  "sin-verificar": { tono: "sin-verificar", Icono: CircleDashed },
};

/** Badge de veredicto: color + icono + texto. Plano y derecho, sin efecto sello. */
export function SelloVeredicto({ veredicto, grande = false, className }: { veredicto: Veredicto; grande?: boolean; className?: string }) {
  const e = estilo[veredicto];
  return (
    <Insignia tono={e.tono} tamano={grande ? "md" : "sm"} className={className}>
      <e.Icono size={grande ? 14 : 12} strokeWidth={2} aria-hidden />
      {nombreVeredicto[veredicto]}
    </Insignia>
  );
}
