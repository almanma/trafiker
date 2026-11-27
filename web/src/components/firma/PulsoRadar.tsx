import { cn } from "@/lib/cn";

/**
 * Elemento firma: punto ámbar que respira junto a la hora de actualización.
 * Solo vive en el encabezado de /hoy.
 */
export function PulsoRadar({ hora, className }: { hora: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-chico text-muted", className)}>
      <span className="relative inline-flex h-2.5 w-2.5" aria-hidden>
        <span className="animate-pulso absolute inset-0 rounded-punto bg-signal" />
        <span className="relative h-2.5 w-2.5 rounded-punto bg-signal" />
      </span>
      <span>Actualizado</span>
      <time className="text-dato tabular text-text" dateTime={`2026-11-24T${hora}:00-05:00`}>
        {hora}
      </time>
    </span>
  );
}

/** Barrido circular muy tenue para el encabezado de /hoy. */
export function BarridoRadar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={cn("pointer-events-none", className)}
      aria-hidden
      fill="none"
    >
      <g className="stroke-border">
        <circle cx="200" cy="200" r="70" />
        <circle cx="200" cy="200" r="130" />
        <circle cx="200" cy="200" r="190" />
        <path d="M200 10 V390 M10 200 H390" />
      </g>
      <g className="animate-barrido" style={{ transformOrigin: "200px 200px" }}>
        <path d="M200 200 L200 10 A190 190 0 0 1 334 66 Z" className="fill-signal" opacity="0.05" />
        <path d="M200 200 L334 66" className="stroke-signal" opacity="0.25" />
      </g>
    </svg>
  );
}
