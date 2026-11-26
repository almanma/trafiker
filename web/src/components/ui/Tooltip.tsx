"use client";

import { cloneElement, useEffect, useId, useRef, useState, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Tooltip accesible y liviano (sin dependencia nueva). Aparece con 250 ms de
 * espera al pasar el mouse, al instante con el foco, y se cierra con Escape.
 * Siempre está en el DOM: el lector de pantalla lo lee vía aria-describedby.
 */
export function Tooltip({
  texto,
  children,
  lado = "arriba",
  className,
}: {
  texto: ReactNode;
  children: ReactElement<{ "aria-describedby"?: string }>;
  lado?: "arriba" | "abajo";
  className?: string;
}) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const espera = useRef<number | undefined>(undefined);

  const abrir = (inmediato = false) => {
    window.clearTimeout(espera.current);
    if (inmediato) setVisible(true);
    else espera.current = window.setTimeout(() => setVisible(true), 250);
  };
  const cerrar = () => {
    window.clearTimeout(espera.current);
    setVisible(false);
  };

  useEffect(() => {
    if (!visible) return;
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && setVisible(false);
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [visible]);
  useEffect(() => () => window.clearTimeout(espera.current), []);

  return (
    <span className="relative inline-flex" onPointerEnter={() => abrir()} onPointerLeave={cerrar} onFocus={() => abrir(true)} onBlur={cerrar}>
      {cloneElement(children, { "aria-describedby": id })}
      <span
        role="tooltip"
        id={id}
        className={cn(
          "pointer-events-none absolute left-1/2 z-50 w-max max-w-64 -translate-x-1/2 rounded-control bg-text px-2.5 py-1.5 text-dato font-medium text-bg shadow-e3",
          "transition-[opacity,transform] duration-150 ease-[var(--ease-base)]",
          lado === "arriba" ? "bottom-full mb-2" : "top-full mt-2",
          visible ? "translate-y-0 opacity-100" : cn("opacity-0", lado === "arriba" ? "translate-y-1" : "-translate-y-1"),
          className,
        )}
      >
        {texto}
      </span>
    </span>
  );
}
