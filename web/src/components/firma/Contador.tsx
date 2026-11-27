"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useReducirMovimiento } from "@/lib/movimiento";

/**
 * Cifra que cuenta desde 0 la primera vez que entra en pantalla (600 ms).
 * Con «reducir movimiento» aparece directamente el valor final. El ancho no
 * salta porque los números son tabulares.
 */
export function Contador({ valor, className }: { valor: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visto = useInView(ref, { once: true });
  const reducir = useReducirMovimiento();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!visto || reducir) return;
    const c = animate(0, valor, { duration: 0.6, ease: [0.4, 0, 0.2, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [visto, valor, reducir]);
  return (
    <span ref={ref} className={cn("tabular", className)}>
      {reducir ? valor : v}
    </span>
  );
}
