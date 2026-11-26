"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { toast } from "sonner";
import { campanas } from "@/mocks/campanas";
import { ideas as ideasIniciales } from "@/mocks/ideas";
import { noticiaPorId } from "@/mocks/noticias";
import type { ColumnaIdea, Idea } from "@/mocks/tipos";

type Tema = "dark" | "light";

interface EstadoApp {
  campanaId: string;
  setCampanaId: (id: string) => void;
  tema: Tema;
  alternarTema: () => void;
  noticiaAbierta: string | null;
  abrirNoticia: (id: string | null) => void;
  ideas: Idea[];
  moverIdea: (id: string, columna: ColumnaIdea) => void;
  convertirEnIdea: (noticiaId: string) => void;
  paletaAbierta: boolean;
  setPaletaAbierta: (v: boolean) => void;
  ayudaAbierta: boolean;
  setAyudaAbierta: (v: boolean) => void;
}

const Ctx = createContext<EstadoApp | null>(null);

export function useApp() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp fuera de ProveedorApp");
  return c;
}

function suscribirTema(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
}
const leerTema = (): Tema => (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");

export function ProveedorApp({ children }: { children: ReactNode }) {
  const [campanaId, setCampanaId] = useState(campanas[0].id);
  const tema = useSyncExternalStore(suscribirTema, leerTema, () => "light" as Tema);
  const [noticiaAbierta, abrirNoticia] = useState<string | null>(null);
  const [ideas, setIdeas] = useState<Idea[]>(ideasIniciales);
  const [paletaAbierta, setPaletaAbierta] = useState(false);
  const [ayudaAbierta, setAyudaAbierta] = useState(false);

  const alternarTema = useCallback(() => {
    const nuevo = leerTema() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nuevo);
    try {
      localStorage.setItem("trafiker-tema-v2", nuevo);
    } catch {}
  }, []);

  const moverIdea = useCallback((id: string, columna: ColumnaIdea) => {
    setIdeas((lista) => lista.map((i) => (i.id === id ? { ...i, columna } : i)));
  }, []);

  const convertirEnIdea = useCallback((noticiaId: string) => {
    const n = noticiaPorId[noticiaId];
    if (!n) return;
    const nueva: Idea = {
      id: `i-${noticiaId}-${Date.now()}`,
      columna: "sugerida",
      titulo: n.titular,
      gancho: n.datosClave[0]?.dato ?? n.resumen,
      angulo: "Por definir",
      tono: "Por definir",
      formato: "hilo",
      dato: { texto: n.datosClave[0]?.dato ?? "", fuente: n.datosClave[0]?.fuente ?? "", url: n.datosClave[0]?.url ?? "" },
      confianza: n.confianzaIA,
      noticiaId,
      guion: [],
    };
    setIdeas((l) => [nueva, ...l]);
    toast("Idea creada en Sugerida", { description: "Solo en esta sesión. Nada se envía." });
  }, []);

  const valor = useMemo(
    () => ({
      campanaId,
      setCampanaId,
      tema,
      alternarTema,
      noticiaAbierta,
      abrirNoticia,
      ideas,
      moverIdea,
      convertirEnIdea,
      paletaAbierta,
      setPaletaAbierta,
      ayudaAbierta,
      setAyudaAbierta,
    }),
    [campanaId, tema, alternarTema, noticiaAbierta, ideas, moverIdea, convertirEnIdea, paletaAbierta, ayudaAbierta],
  );

  return (
    <Ctx.Provider value={valor}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </Ctx.Provider>
  );
}
