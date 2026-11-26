"use client";

import { motion } from "framer-motion";
import { movimiento } from "@/styles/tokens";

/**
 * Transición entre pantallas: el template se vuelve a montar en cada cambio
 * de sección, y el contenido entra con un fundido y 6 px de desplazamiento
 * (200 ms). Con «reducir movimiento», MotionConfig deja solo el fundido.
 */
export default function TransicionPagina({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: movimiento.panel.duracion, ease: movimiento.panel.curva }}
    >
      {children}
    </motion.div>
  );
}
