"use client";

import { motion } from "framer-motion";
import { area, curveMonotoneX, line } from "d3-shape";
import { cn } from "@/lib/cn";
import { useReducirMovimiento } from "@/lib/movimiento";

/** Sparkline que se dibuja una sola vez al montar. */
export function Sparkline({
  datos,
  ancho = 96,
  alto = 28,
  acento = false,
  className,
  etiqueta,
}: {
  datos: number[];
  ancho?: number;
  alto?: number;
  acento?: boolean;
  className?: string;
  etiqueta?: string;
}) {
  const reducir = useReducirMovimiento();
  const max = Math.max(...datos, 1);
  const x = (i: number) => (i / (datos.length - 1)) * (ancho - 4) + 2;
  const y = (v: number) => alto - 3 - (v / max) * (alto - 6);
  const d = line<number>().x((_, i) => x(i)).y(y).curve(curveMonotoneX)(datos) ?? "";
  const relleno = area<number>().x((_, i) => x(i)).y0(alto).y1(y).curve(curveMonotoneX)(datos) ?? "";
  const ultimo = datos[datos.length - 1];

  return (
    <svg
      width={ancho}
      height={alto}
      viewBox={`0 0 ${ancho} ${alto}`}
      className={cn("overflow-visible", className)}
      role="img"
      aria-label={etiqueta ?? `Serie: ${datos.join(", ")}`}
    >
      <path d={relleno} className={acento ? "fill-signal" : "fill-muted"} opacity="0.08" />
      <motion.path
        d={d}
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={acento ? "stroke-signal" : "stroke-muted"}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reducir ? 0 : 0.6, ease: [0.4, 0, 0.2, 1] }}
      />
      <circle cx={x(datos.length - 1)} cy={y(ultimo)} r="2" className={acento ? "fill-signal" : "fill-muted"} />
    </svg>
  );
}
