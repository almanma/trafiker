"use client";

import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";
import { cn } from "@/lib/cn";
import { medioPorId } from "@/mocks/medios";
import type { Noticia } from "@/mocks/tipos";
import { BarraDeSesgo, contarPorLinea } from "./BarraDeSesgo";
import { DeltaTendencia, FilaMeta, Meta } from "./Basicos";

type PropsNoticia = {
  noticia: Noticia;
  onAbrir?: (id: string) => void;
  seleccionada?: boolean;
  className?: string;
};

export function medioPrincipal(n: Noticia) {
  const a = [...n.articulos].sort((x, y) => y.intensidad - x.intensidad || x.hora.localeCompare(y.hora))[0];
  return { medio: medioPorId[a.medioId], articulo: a };
}

/** Botón-titular común: abre el detalle y es el destino de J/K. */
function Titular({ noticia, onAbrir, className, children }: { noticia: Noticia; onAbrir?: (id: string) => void; className?: string; children: React.ReactNode }) {
  return (
    <motion.h3 layoutId={`titular-${noticia.id}`} className={className}>
      <button
        type="button"
        data-noticia={noticia.id}
        onClick={() => onAbrir?.(noticia.id)}
        className="text-left outline-offset-4 transition-colors duration-150 ease-[var(--ease-base)] hover:text-signal"
      >
        {children}
      </button>
    </motion.h3>
  );
}

export function NoticiaHero({ noticia, onAbrir, seleccionada, className }: PropsNoticia) {
  const { medio, articulo } = medioPrincipal(noticia);
  return (
    <article
      className={cn("relative pb-8 ", seleccionada ? "shadow-regla-senal" : "shadow-regla", seleccionada && " pl-4", className)}
      aria-labelledby={`h-${noticia.id}`}
    >
      <FilaMeta className="mb-4">
        <Meta etiqueta="Tema">{noticia.tema}</Meta>
        <Meta etiqueta="Territorio">{noticia.territorio}</Meta>
        <Meta etiqueta="Primera nota" mono>
          {articulo.hora}
        </Meta>
      </FilaMeta>
      <Titular noticia={noticia} onAbrir={onAbrir} className="max-w-[22ch] text-secundario serif-display md:text-hero">
        <span id={`h-${noticia.id}`}>{noticia.titular}</span>
      </Titular>
      <p className="mt-5 max-w-lectura font-serif text-lectura serif-texto text-text">{noticia.resumen}</p>
      <div className="mt-6 grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <BarraDeSesgo conteo={contarPorLinea(noticia.articulos)} className="max-w-md" />
        <FilaMeta>
          <Meta etiqueta="Medios" mono>
            {noticia.articulos.length}
          </Meta>
          <span className="inline-flex items-baseline gap-1.5">
            <span className="text-muted">Tendencia</span>
            <DeltaTendencia tendencia={noticia.tendencia} delta={noticia.delta} />
          </span>
          <Meta etiqueta="Lo abrió">{medio.nombre}</Meta>
        </FilaMeta>
      </div>
    </article>
  );
}

/** Noticia estándar. "amplia" ocupa 6 columnas; "columna", 3. */
export function NoticiaEstandar({ noticia, onAbrir, seleccionada, variante = "columna", className }: PropsNoticia & { variante?: "amplia" | "columna" }) {
  const { medio, articulo } = medioPrincipal(noticia);
  return (
    <article className={cn("relative flex flex-col pb-6 ", seleccionada ? "shadow-regla-senal" : "shadow-regla", seleccionada && " pl-3", className)}>
      <FilaMeta className="mb-3 text-dato">
        <Meta etiqueta="Tema">{noticia.tema}</Meta>
        <DeltaTendencia tendencia={noticia.tendencia} delta={noticia.delta} />
      </FilaMeta>
      <Titular noticia={noticia} onAbrir={onAbrir} className={cn(variante === "amplia" ? "text-tarjeta md:text-secundario" : "text-tarjeta", "serif-display")}>
        {noticia.titular}
      </Titular>
      {variante === "amplia" && <p className="mt-3 max-w-lectura text-cuerpo text-muted">{noticia.resumen}</p>}
      <div className="mt-auto pt-4">
        <BarraDeSesgo conteo={contarPorLinea(noticia.articulos)} compacta />
        <FilaMeta className="mt-2 text-dato">
          <Meta etiqueta="Medios" mono>
            {noticia.articulos.length}
          </Meta>
          <Meta etiqueta={medio.nombre} mono>
            {articulo.hora}
          </Meta>
        </FilaMeta>
      </div>
    </article>
  );
}

/** Fila de titular para la lista de cuatro columnas. */
export function FilaTitular({ noticia, onAbrir, seleccionada, indice, className }: PropsNoticia & { indice?: number }) {
  return (
    <article className={cn("flex gap-3 py-3 ", seleccionada ? "shadow-regla-senal" : "shadow-regla", seleccionada && " pl-3", className)}>
      <Newspaper size={14} strokeWidth={1.5} className="mt-1 shrink-0 text-muted" aria-hidden />
      <div className="min-w-0">
        <Titular noticia={noticia} onAbrir={onAbrir} className="font-serif text-lectura serif-texto">
          {noticia.titular}
        </Titular>
        <FilaMeta className="mt-1 text-dato">
          <Meta etiqueta="Medios" mono>
            {noticia.articulos.length}
          </Meta>
          <DeltaTendencia tendencia={noticia.tendencia} delta={noticia.delta} />
        </FilaMeta>
      </div>
      {indice !== undefined && <span className="sr-only">Noticia {indice}</span>}
    </article>
  );
}
