"use client";

import { cn } from "@/lib/cn";
import { departamentos } from "@/mocks/campanas";

/**
 * Cartograma de hexágonos de Colombia: un hexágono por departamento,
 * ubicado de forma aproximada. Simplificación propia, no un mapa exacto.
 */
export function MapaColombia({ seleccion, onElegir }: { seleccion: string[]; onElegir: (id: string) => void }) {
  const t = 48; // ancho del hexágono (≥ 44 px táctil)
  const h = t * 1.1547;
  const ancho = 6.5 * t + 8;
  const alto = 8 * h * 0.75 + h * 0.25 + 8;
  const puntos = (cx: number, cy: number) =>
    [0, 60, 120, 180, 240, 300].map((a) => {
      const r = ((a - 90) * Math.PI) / 180;
      return `${(cx + (h / 2 - 1.5) * Math.cos(r)).toFixed(1)},${(cy + (h / 2 - 1.5) * Math.sin(r)).toFixed(1)}`;
    });

  return (
    <div className="relative mx-auto w-full max-w-[340px]" style={{ aspectRatio: `${ancho} / ${alto}` }}>
      <svg viewBox={`0 0 ${ancho} ${alto}`} className="absolute inset-0 h-full w-full" aria-hidden>
        {departamentos.map((d) => {
          const cx = 4 + t / 2 + d.c * t + (d.r % 2 ? t / 2 : 0);
          const cy = 4 + h / 2 + d.r * h * 0.75;
          const on = seleccion.includes(d.id);
          return (
            <polygon
              key={d.id}
              points={puntos(cx, cy).join(" ")}
              className={cn(on ? "fill-signal stroke-signal" : "fill-surface-2 stroke-border-strong", "transition-colors duration-150")}
              strokeWidth="1"
            />
          );
        })}
      </svg>
      <ul className="absolute inset-0" aria-label="Departamentos">
        {departamentos.map((d) => {
          const cx = 4 + t / 2 + d.c * t + (d.r % 2 ? t / 2 : 0);
          const cy = 4 + h / 2 + d.r * h * 0.75;
          const on = seleccion.includes(d.id);
          return (
            <li key={d.id} className="absolute" style={{ left: `${((cx - t / 2) / ancho) * 100}%`, top: `${((cy - t / 2) / alto) * 100}%`, width: `${(t / ancho) * 100}%`, height: `${(t / alto) * 100}%` }}>
              <button
                type="button"
                aria-pressed={on}
                title={d.nombre}
                aria-label={d.nombre}
                onClick={() => onElegir(d.id)}
                className={cn("grid h-full w-full place-items-center rounded-punto font-mono text-dato", on ? "bg-signal text-sobre-senal" : "text-muted hover:text-text")}
              >
                {d.abr}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
