"use client";

import { Clapperboard, GalleryHorizontal, MessagesSquare } from "lucide-react";
import { cn } from "@/lib/cn";
import { nombreFormato } from "@/mocks/ideas";
import type { Idea } from "@/mocks/tipos";
import { ConfianzaIA, Meta } from "./Basicos";

const iconoFormato = { video: Clapperboard, carrusel: GalleryHorizontal, hilo: MessagesSquare };

function Encabezado({ idea }: { idea: Idea }) {
  const Icono = iconoFormato[idea.formato];
  return (
    <div className="flex items-center justify-between gap-2 text-dato text-muted">
      <span className="inline-flex items-center gap-1.5">
        <Icono size={14} strokeWidth={1.5} aria-hidden />
        {nombreFormato[idea.formato]}
        {idea.duracion && <span className="font-mono tabular text-text">{idea.duracion}</span>}
      </span>
      <span className="font-mono tabular">{idea.confianza} %</span>
    </div>
  );
}

function Dato({ idea }: { idea: Idea }) {
  return (
    <p className="mt-3 text-dato text-muted">
      <span>Dato de partida </span>
      <span className="text-text">{idea.dato.texto} </span>
      <a href={idea.dato.url} target="_blank" rel="noreferrer" className="text-signal underline underline-offset-2">
        {idea.dato.fuente}
      </a>
    </p>
  );
}

/**
 * La tarjeta cambia de forma según el formato:
 * video = marco vertical con el gancho; carrusel = láminas apiladas;
 * hilo = texto corrido con regla, sin caja.
 */
export function TarjetaIdea({ idea, compacta = false, className }: { idea: Idea; compacta?: boolean; className?: string }) {
  if (compacta) {
    return (
      <article className={cn("py-4 shadow-regla", className)}>
        <Encabezado idea={idea} />
        <p className="mt-2 font-serif text-lectura serif-texto">{idea.gancho}</p>
        <p className="mt-1 text-chico text-muted">{idea.angulo}</p>
      </article>
    );
  }

  if (idea.formato === "video") {
    return (
      <article className={cn("rounded-control bg-surface p-3 shadow-[inset_0_0_0_1px_var(--t-border)]", className)}>
        <Encabezado idea={idea} />
        <div className="mt-3 flex gap-3">
          <div className="grid aspect-[9/16] w-16 shrink-0 place-items-end rounded-editorial bg-surface-2 p-1.5 shadow-[inset_0_0_0_1px_var(--t-border-strong)]" aria-hidden>
            <span className="h-1 w-full rounded-punto bg-signal" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lectura serif-texto">{idea.titulo}</h3>
            <p className="mt-1 text-chico text-muted">{idea.gancho}</p>
          </div>
        </div>
        <Dato idea={idea} />
      </article>
    );
  }

  if (idea.formato === "carrusel") {
    return (
      <article className={cn("relative pt-2", className)}>
        <span className="absolute inset-x-3 top-0 h-3 rounded-editorial bg-surface-2 shadow-[inset_0_0_0_1px_var(--t-border)]" aria-hidden />
        <div className="relative rounded-editorial bg-surface p-3 shadow-[inset_0_0_0_1px_var(--t-border-strong)]">
          <Encabezado idea={idea} />
          <h3 className="mt-2 text-lectura serif-texto">{idea.titulo}</h3>
          <ol className="mt-2 flex gap-1" aria-label="Láminas">
            {idea.guion.map((g, i) => (
              <li key={g} className="h-1 flex-1 rounded-punto bg-border-strong" title={g}>
                <span className="sr-only">
                  Lámina {i + 1}: {g}
                </span>
              </li>
            ))}
          </ol>
          <Dato idea={idea} />
        </div>
      </article>
    );
  }

  return (
    <article className={cn("py-3 pl-3 shadow-regla-izq", className)}>
      <Encabezado idea={idea} />
      <h3 className="mt-2 text-lectura serif-texto">{idea.titulo}</h3>
      <p className="mt-1 font-serif text-cuerpo serif-texto text-muted">{idea.gancho}</p>
      <div className="mt-2 flex flex-wrap gap-x-4 text-dato">
        <Meta etiqueta="Tono">{idea.tono}</Meta>
      </div>
      <Dato idea={idea} />
    </article>
  );
}

export function DetalleIdea({ idea }: { idea: Idea }) {
  return (
    <div className="flex flex-col gap-3 text-chico">
      <Meta etiqueta="Ángulo">{idea.angulo}</Meta>
      <Meta etiqueta="Tono">{idea.tono}</Meta>
      <ConfianzaIA valor={idea.confianza} />
    </div>
  );
}
