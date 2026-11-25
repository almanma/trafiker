"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";
import { medioPorId } from "@/mocks/medios";
import type { Articulo, Linea } from "@/mocks/tipos";

export type Conteo = Record<Linea, number>;

export function contarPorLinea(articulos: Articulo[]): Conteo {
  const c: Conteo = { izquierda: 0, centro: 0, derecha: 0, "a-validar": 0 };
  for (const a of articulos) c[medioPorId[a.medioId]?.linea ?? "a-validar"]++;
  return c;
}

const orden: Linea[] = ["izquierda", "centro", "derecha", "a-validar"];
const etiqueta: Record<Linea, string> = { izquierda: "Izq.", centro: "Centro", derecha: "Der.", "a-validar": "A validar" };

/** Patrones SVG por línea: el sesgo se lee sin depender del color. */
export function PatronesLinea({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={`${id}-izquierda`} width="4" height="4" patternUnits="userSpaceOnUse">
        <rect width="4" height="4" className="fill-izquierda" />
      </pattern>
      <pattern id={`${id}-centro`} width="4" height="4" patternUnits="userSpaceOnUse">
        <rect width="4" height="4" className="fill-centro" />
        <circle cx="2" cy="2" r="0.8" className="fill-bg" opacity="0.55" />
      </pattern>
      <pattern id={`${id}-derecha`} width="4" height="4" patternUnits="userSpaceOnUse">
        <rect width="4" height="4" className="fill-derecha" />
        <path d="M0 3.5 H4" className="stroke-bg" strokeWidth="1" opacity="0.45" />
      </pattern>
      <pattern id={`${id}-a-validar`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="5" height="5" className="fill-transparent" />
        <path d="M0 0 V5" className="stroke-muted" strokeWidth="2.2" opacity="0.4" />
      </pattern>
    </defs>
  );
}

/** Muestra mínima del patrón de una línea (leyendas, tablas). */
export function MuestraLinea({ linea, className }: { linea: Linea; className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" className={cn("shrink-0", className)} aria-hidden>
      <PatronesLinea id={id} />
      <rect x="0.5" y="0.5" width="11" height="11" rx="2" fill={`url(#${id}-${linea})`} className="stroke-border-strong" />
    </svg>
  );
}

export function BarraDeSesgo({
  conteo,
  compacta = false,
  className,
}: {
  conteo: Conteo;
  compacta?: boolean;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const total = orden.reduce((s, l) => s + conteo[l], 0) || 1;
  const anchos = orden.map((l) => (conteo[l] / total) * 100);
  const inicios = anchos.map((_, i) => anchos.slice(0, i).reduce((a, b) => a + b, 0));
  const descripcion = orden.map((l) => `${etiqueta[l]} ${conteo[l]}`).join(", ");

  return (
    <figure className={cn("w-full", className)} aria-label={`Balance de cobertura: ${descripcion}`}>
      <svg width="100%" height={compacta ? 6 : 10} preserveAspectRatio="none" viewBox="0 0 100 10" aria-hidden>
        <PatronesLinea id={id} />
        <rect width="100" height="10" className="fill-surface-2" />
        {orden.map((l, i) => (
          <rect key={l} x={inicios[i]} width={Math.max(anchos[i] - 0.6, 0)} height="10" fill={`url(#${id}-${l})`} />
        ))}
      </svg>
      {!compacta && (
        <figcaption className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-dato text-muted">
          {orden.map((l) => (
            <span key={l} className="inline-flex items-center gap-1.5">
              <MuestraLinea linea={l} />
              <span>{etiqueta[l]}</span>
              <span className="font-mono tabular text-text">{conteo[l]}</span>
            </span>
          ))}
        </figcaption>
      )}
    </figure>
  );
}
