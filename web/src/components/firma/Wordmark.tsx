import { cn } from "@/lib/cn";

/**
 * Wordmark propia: "Trafi" + k dibujada + "er", en la serif de titulares.
 * El brazo superior de la k es un pulso (línea de señal); termina en un
 * punto ámbar, la única nota de color de la marca.
 */
export function Wordmark({ className, alto = 28 }: { className?: string; alto?: number }) {
  const ancho = (alto * 118) / 36;
  return (
    <svg
      role="img"
      aria-label="Trafiker"
      width={ancho}
      height={alto}
      viewBox="0 0 118 36"
      className={cn("text-text", className)}
      data-wordmark
    >
      <text
        x="0"
        y="27"
        textLength="60"
        lengthAdjust="spacingAndGlyphs"
        className="fill-text font-serif serif-display"
        style={{ fontSize: 29, letterSpacing: "-0.01em" }}
        aria-hidden
      >
        Trafi
      </text>
      {/* k: asta + pulso + pierna */}
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M65.5 5 V27" strokeWidth="2.4" />
        <path d="M66 19.5 H69 L71 14.5 L73.4 22 L75.6 10.5" strokeWidth="1.6" />
        <path d="M68.6 18.6 L77 27" strokeWidth="2.2" />
      </g>
      <circle cx="76.4" cy="9.4" r="1.9" className="fill-signal" aria-hidden />
      <text
        x="80"
        y="27"
        textLength="37"
        lengthAdjust="spacingAndGlyphs"
        className="fill-text font-serif serif-display"
        style={{ fontSize: 29 }}
        aria-hidden
      >
        er
      </text>
    </svg>
  );
}
