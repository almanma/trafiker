"use client";

import { useSyncExternalStore } from "react";
import { movimiento } from "@/styles/tokens";

export const transBase = { duration: movimiento.base.duracion, ease: movimiento.base.curva };
export const transPanel = { duration: movimiento.panel.duracion, ease: movimiento.panel.curva };

const consulta = "(prefers-reduced-motion: reduce)";
function suscribir(cb: () => void) {
  const mq = window.matchMedia(consulta);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * ¿La persona pidió reducir movimiento? Seguro para hidratar: en el servidor
 * y en el primer render del cliente devuelve false (así el HTML coincide) y
 * justo después devuelve la preferencia real. Las animaciones deben usarlo
 * para poner su duración en 0, no para cambiar el estado inicial.
 */
export function useReducirMovimiento() {
  return useSyncExternalStore(suscribir, () => window.matchMedia(consulta).matches, () => false);
}
