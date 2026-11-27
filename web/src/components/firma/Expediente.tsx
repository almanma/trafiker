"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Landmark, PenLine, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import { medioPorId } from "@/mocks/medios";
import type { Verificacion } from "@/mocks/tipos";
import { Boton } from "../ui/Boton";
import { ChipFuente } from "../ui/ChipFuente";
import { ConfianzaIA } from "./Basicos";
import { SelloVeredicto } from "./SelloVeredicto";

const enlace = "inline-flex min-h-11 items-center gap-1 text-chico font-medium text-signal hover:text-signal-hover hover:underline underline-offset-2 md:min-h-0";

/**
 * Expediente de verificación: veredicto, la afirmación tal como circuló,
 * dónde y quién la dijo, la evidencia que la contrasta y las dos fuentes
 * enlazadas. La decisión final la toma la persona («Marcar revisado»).
 */
export function Expediente({
  v,
  revisado = false,
  onRevisado,
  onUsar,
  className,
}: {
  v: Verificacion;
  revisado?: boolean;
  onRevisado?: () => void;
  onUsar?: () => void;
  className?: string;
}) {
  const medio = medioPorId[v.dicho.medioId];
  const Evidencia = v.contraste.tipo === "oficial" ? Landmark : ShieldCheck;
  return (
    <article
      aria-labelledby={`dato-${v.id}`}
      className={cn(
        "overflow-hidden rounded-panel border bg-surface shadow-e1 transition-[border-color,box-shadow] duration-200 hover:shadow-e2",
        revisado ? "border-verificado-borde" : "border-border",
        className,
      )}
    >
      <div className="grid gap-5 p-4 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:p-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <SelloVeredicto veredicto={v.veredicto} grande />
            <span className="text-dato text-muted">
              Expediente <span className="font-medium text-text">{v.id.replace("v-", "").toUpperCase()}</span>
            </span>
            <AnimatePresence>
              {revisado && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.16 }}
                  className="inline-flex items-center gap-1 text-dato font-medium text-verificado"
                >
                  <Check size={12} strokeWidth={2.5} aria-hidden />
                  Revisado
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <h3 id={`dato-${v.id}`} className="mt-3 max-w-[34ch] text-secundario">
            «{v.dato.replace(/^"|"$/g, "")}»
          </h3>
          <p className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-chico text-muted">
            Lo dijo <span className="font-medium text-text">{v.dicho.quien.toLowerCase()}</span> en
            <ChipFuente medioId={medio.id} href={v.dicho.url} />a las <span className="font-medium text-text tabular">{v.dicho.hora}</span>
          </p>
        </div>

        <div className="rounded-control border border-border bg-surface-2 p-4">
          <p className="inline-flex items-center gap-1.5 text-dato font-medium text-muted">
            <Evidencia size={14} strokeWidth={1.75} aria-hidden />
            Evidencia · {v.contraste.tipo === "oficial" ? "fuente oficial" : "fact-checker"}
          </p>
          <p className="mt-1 text-cuerpo font-semibold">{v.contraste.fuente}</p>
          <p className="mt-1.5 text-cuerpo text-muted">{v.contraste.dice}</p>
          <a href={v.contraste.url} target="_blank" rel="noreferrer" className={cn(enlace, "mt-2")}>
            Ver la fuente <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
          </a>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border bg-surface px-4 py-3 md:px-5">
        <span className="text-dato text-muted">Fuentes enlazadas:</span>
        <a href={v.dicho.url} target="_blank" rel="noreferrer" className={enlace}>
          Declaración en {medio.nombre} <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
        </a>
        <a href={v.contraste.url} target="_blank" rel="noreferrer" className={enlace}>
          {v.contraste.fuente} <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
        </a>
        <ConfianzaIA valor={v.confianza} etiqueta="Cruce sugerido por IA" />
        <div className="flex w-full gap-2 sm:ml-auto sm:w-auto">
          <Boton tamano="sm" variante="secundario" onClick={onRevisado} aria-pressed={revisado} className={revisado ? "border-verificado-borde text-verificado" : undefined}>
            <Check size={14} strokeWidth={2} aria-hidden />
            {revisado ? "Revisado" : "Marcar revisado"}
          </Boton>
          <Boton tamano="sm" variante="fantasma" onClick={onUsar}>
            <PenLine size={14} strokeWidth={1.75} aria-hidden />
            Usar en contenido
          </Boton>
        </div>
      </div>
    </article>
  );
}
