import { ArrowDownRight, ArrowUpRight, Minus, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Linea, Tendencia } from "@/mocks/tipos";
import { MuestraLinea } from "./BarraDeSesgo";

/** Metadato como etiqueta y valor (nunca unidos con " · "). */
export function Meta({ etiqueta, children, mono = false, className }: { etiqueta: string; children: ReactNode; mono?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline gap-1.5", className)}>
      <span className="text-muted">{etiqueta}</span>
      <span className={cn("text-text", mono && "tabular")}>{children}</span>
    </span>
  );
}

export function FilaMeta({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-wrap items-baseline gap-x-4 gap-y-1 text-chico", className)}>{children}</div>;
}

export function DeltaTendencia({ tendencia, delta, className }: { tendencia: Tendencia; delta: number; className?: string }) {
  const Icono = tendencia === "sube" ? ArrowUpRight : tendencia === "baja" ? ArrowDownRight : Minus;
  const texto = tendencia === "sube" ? "Sube" : tendencia === "baja" ? "Baja" : "Estable";
  return (
    <span className={cn("inline-flex items-center gap-1", tendencia === "sube" ? "text-signal" : "text-muted", className)}>
      <Icono size={14} strokeWidth={1.5} aria-hidden />
      <span className="sr-only">{texto}</span>
      <span className="text-dato font-medium tabular">
        {delta > 0 ? "+" : delta < 0 ? "−" : "±"}
        {Math.abs(delta)} %
      </span>
    </span>
  );
}

/** "Sugerido por IA" + confianza, como etiqueta y valor. */
export function ConfianzaIA({ valor, etiqueta = "Sugerido por IA", className }: { valor: number; etiqueta?: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-dato", className)}>
      <span className="inline-flex items-center gap-1 text-muted">
        <Sparkles size={12} strokeWidth={1.5} aria-hidden />
        {etiqueta}
      </span>
      <span className="inline-flex items-baseline gap-1">
        <span className="text-muted">confianza</span>
        <span className="font-medium tabular text-text">{valor} %</span>
      </span>
    </span>
  );
}

export function Etiqueta({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-editorial border border-border bg-surface-2 px-1.5 py-0.5 text-dato text-muted", className)}>
      {children}
    </span>
  );
}

const nombreLinea: Record<Linea, string> = { izquierda: "Izquierda", centro: "Centro", derecha: "Derecha", "a-validar": "A validar" };
const textoLinea: Record<Linea, string> = { izquierda: "text-izquierda-texto", centro: "text-centro", derecha: "text-derecha", "a-validar": "text-muted" };

export function EtiquetaLinea({ linea, ejemplo = false, className }: { linea: Linea; ejemplo?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-dato", className)}>
      <MuestraLinea linea={linea} />
      <span className={textoLinea[linea]}>{nombreLinea[linea]}</span>
      {ejemplo && <span className="text-muted">(ejemplo)</span>}
    </span>
  );
}

export function DatosEjemplo({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-flex h-6 items-center gap-1.5 rounded-pildora border border-enganoso-borde bg-enganoso-suave px-2 text-dato font-medium text-enganoso", className)}
      title="Todo lo que ves son datos ficticios para validar la interfaz"
    >
      <span className="h-1.5 w-1.5 rounded-punto bg-enganoso" aria-hidden />
      Datos de ejemplo
    </span>
  );
}

export function TituloSeccion({ children, accion, id, className }: { children: ReactNode; accion?: ReactNode; id?: string; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between gap-4 pb-3", className)}>
      <h2 id={id} className="text-tarjeta">
        {children}
      </h2>
      {accion}
    </div>
  );
}
