"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Boton } from "./Boton";

async function copiar(texto: string) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    // Respaldo para navegadores sin permiso de portapapeles.
    const t = document.createElement("textarea");
    t.value = texto;
    t.setAttribute("readonly", "");
    t.style.position = "fixed";
    t.style.opacity = "0";
    document.body.appendChild(t);
    t.select();
    const ok = document.execCommand("copy");
    t.remove();
    return ok;
  }
}

/**
 * Copia un texto y confirma en el mismo botón: el icono cambia a un check
 * con un pequeño rebote y el texto dice «Copiado» durante 1,6 s. El cambio
 * se anuncia a lectores de pantalla.
 */
export function BotonCopiar({ texto, etiqueta = "Copiar", className }: { texto: string; etiqueta?: string; className?: string }) {
  const [copiado, setCopiado] = useState(false);
  const espera = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(espera.current), []);

  return (
    <Boton
      tamano="sm"
      variante="secundario"
      className={cn(copiado && "border-verificado-borde text-verificado", className)}
      onKeyDown={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={async (e) => {
        e.stopPropagation();
        if (await copiar(texto)) {
          setCopiado(true);
          window.clearTimeout(espera.current);
          espera.current = window.setTimeout(() => setCopiado(false), 1600);
        }
      }}
    >
      <span className="relative grid h-3.5 w-3.5 place-items-center" aria-hidden>
        <AnimatePresence initial={false} mode="popLayout">
          {copiado ? (
            <motion.span key="ok" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }} transition={{ type: "spring", stiffness: 600, damping: 22 }}>
              <Check size={14} strokeWidth={2.5} />
            </motion.span>
          ) : (
            <motion.span key="copiar" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }} transition={{ duration: 0.12 }}>
              <Copy size={14} strokeWidth={1.75} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span aria-live="polite">{copiado ? "Copiado" : etiqueta}</span>
    </Boton>
  );
}
