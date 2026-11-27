"use client";

import { motion } from "framer-motion";
import { useEsPrimeraCarga } from "@/lib/movimiento";
import { movimiento } from "@/styles/tokens";

/**
 * Transición entre pantallas: el template se vuelve a montar en cada cambio
 * de sección, y el contenido entra con un fundido y 6 px de desplazamiento
 * (200 ms). Con «reducir movimiento», MotionConfig deja solo el fundido.
 * En la carga directa no se anima: el HTML llega visible (mejor LCP).
 */
export default function TransicionPagina({ children }: { children: React.ReactNode }) {
  const primera = useEsPrimeraCarga();
  return (
    <motion.div
      initial={primera ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: movimiento.panel.duracion, ease: movimiento.panel.curva }}
    >
      {children}
    </motion.div>
  );
}
