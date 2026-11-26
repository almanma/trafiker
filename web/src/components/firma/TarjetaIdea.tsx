"use client";

import { Clapperboard, GalleryHorizontal, MessagesSquare, ScrollText, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import { nombreFormato } from "@/mocks/ideas";
import type { Idea } from "@/mocks/tipos";
import { Boton } from "../ui/Boton";
import { BotonCopiar } from "../ui/BotonCopiar";
import { Insignia } from "../ui/Insignia";

export const iconoFormato = { video: Clapperboard, carrusel: GalleryHorizontal, hilo: MessagesSquare };

/** Texto listo para pegar en el chat del equipo: idea, gancho, ángulo y dato con su fuente. */
export function textoIdea(idea: Idea) {
  return [
    `${idea.titulo} (${nombreFormato[idea.formato]}${idea.duracion ? `, ${idea.duracion}` : ""})`,
    `Gancho: ${idea.gancho}`,
    `Ángulo: ${idea.angulo}`,
    `Dato: ${idea.dato.texto} Fuente: ${idea.dato.fuente} ${idea.dato.url}`,
  ].join("\n");
}

/**
 * Tarjeta de idea accionable: formato sugerido, título, ángulo, gancho y
 * dato de partida con su fuente. Acciones: copiar la idea y ver el guion.
 */
export function TarjetaIdea({ idea, onVerGuion, className }: { idea: Idea; onVerGuion?: () => void; className?: string }) {
  const Icono = iconoFormato[idea.formato];
  return (
    <article className={cn("flex flex-col gap-3 rounded-panel border border-border bg-surface p-4 shadow-e1", className)} aria-labelledby={`idea-${idea.id}`}>
      <div className="flex items-center justify-between gap-2">
        <Insignia>
          <Icono size={12} strokeWidth={2} aria-hidden />
          {nombreFormato[idea.formato]}
          {idea.duracion && <span className="font-normal">· {idea.duracion}</span>}
        </Insignia>
        <span className="inline-flex items-center gap-1 text-dato text-muted" title="Confianza de la sugerencia de IA">
          <Sparkles size={12} strokeWidth={1.75} aria-hidden />
          <span className="tabular">{idea.confianza} %</span>
        </span>
      </div>
      <h3 id={`idea-${idea.id}`} className="text-cuerpo font-semibold leading-snug">
        {idea.titulo}
      </h3>
      <dl className="flex flex-col gap-1.5 text-chico">
        <div>
          <dt className="text-dato font-medium text-muted">Ángulo</dt>
          <dd>{idea.angulo}</dd>
        </div>
        <div>
          <dt className="text-dato font-medium text-muted">Gancho</dt>
          <dd className="border-l-2 border-signal pl-2 italic text-text">{idea.gancho}</dd>
        </div>
      </dl>
      <p className="text-dato text-muted">
        Dato de partida: <span className="text-text">{idea.dato.texto}</span>{" "}
        <a href={idea.dato.url} target="_blank" rel="noreferrer" className="font-medium text-signal hover:underline" onPointerDown={(e) => e.stopPropagation()}>
          {idea.dato.fuente}
        </a>
      </p>
      <div className="mt-auto flex flex-wrap gap-2 pt-1">
        <BotonCopiar texto={textoIdea(idea)} />
        {onVerGuion && (
          <Boton
            tamano="sm"
            variante="fantasma"
            onKeyDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onVerGuion();
            }}
          >
            <ScrollText size={14} strokeWidth={1.75} aria-hidden />
            Ver guion
          </Boton>
        )}
      </div>
    </article>
  );
}
