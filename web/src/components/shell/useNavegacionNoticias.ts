"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useApp } from "./Estado";

/** J/K mueve la selección, Enter abre (botón nativo), E crea idea, V va a verificación. */
export function useNavegacionNoticias(ids: string[]) {
  const [sel, setSel] = useState(-1);
  const { convertirEnIdea, noticiaAbierta, paletaAbierta } = useApp();
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey || noticiaAbierta || paletaAbierta) return;
      const k = e.key.toLowerCase();
      if (k === "j" || k === "k") {
        e.preventDefault();
        setSel((s) => {
          const n = k === "j" ? Math.min(ids.length - 1, s + 1) : Math.max(0, s - 1);
          const el = document.querySelector<HTMLElement>(`[data-noticia="${ids[n]}"]`);
          el?.focus({ preventScroll: true });
          el?.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
          return n;
        });
      } else if (k === "e" && sel >= 0) {
        convertirEnIdea(ids[sel]);
      } else if (k === "v" && sel >= 0) {
        router.push(`/verificacion?noticia=${ids[sel]}`);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ids, sel, convertirEnIdea, router, noticiaAbierta, paletaAbierta]);

  return { seleccionada: sel >= 0 ? ids[sel] : null };
}
