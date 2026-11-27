"use client";

import { useState, useSyncExternalStore } from "react";
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

/* Toda navegación interna empieza con un clic, un toque o una tecla. Mientras
   no haya ocurrido ninguno, seguimos en la carga directa (aunque partes de la
   página se hidraten más tarde por streaming). */
let interactuado = false;
if (typeof window !== "undefined") {
  const marcar = () => {
    interactuado = true;
  };
  window.addEventListener("pointerdown", marcar, { once: true, capture: true });
  window.addEventListener("keydown", marcar, { once: true, capture: true });
}

/**
 * true en la carga directa de la página (y siempre en el servidor).
 * Sirve para no esconder el contenido con opacidad 0 antes de que llegue el
 * JavaScript: en la primera carga no hay animación de entrada (el splash ya
 * cubre ese momento); al navegar dentro de la app, sí.
 */
export function useEsPrimeraCarga() {
  const [primera] = useState(() => !interactuado);
  return primera;
}
