"use client";

import { Newspaper } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Noticia, Veredicto } from "@/mocks/tipos";
import { verificaciones } from "@/mocks/verificaciones";
import { ChipFuente } from "../ui/ChipFuente";
import { Insignia } from "../ui/Insignia";
import { BarraDeSesgo, contarPorLinea } from "./BarraDeSesgo";
import { DeltaTendencia } from "./Basicos";
import { SelloVeredicto } from "./SelloVeredicto";

/** Veredicto más grave entre las verificaciones ligadas a la noticia (o «sin verificar»). */
export function veredictoDe(noticiaId: string): Veredicto {
  const orden: Veredicto[] = ["falso", "enganoso", "sin-evidencia", "verificado"];
  const propios = verificaciones.filter((v) => v.noticiaId === noticiaId).map((v) => v.veredicto);
  return orden.find((o) => propios.includes(o)) ?? "sin-verificar";
}

/**
 * Tarjeta de noticia: tema y territorio, titular, resumen, fuentes,
 * estado de verificación y cuántos medios la cubren. Todo el titular es el
 * botón que abre el detalle.
 */
export function TarjetaNoticia({
  noticia,
  onAbrir,
  seleccionada,
  maxFuentes = 3,
  conResumen = true,
  className,
}: {
  noticia: Noticia;
  onAbrir?: (id: string) => void;
  seleccionada?: boolean;
  maxFuentes?: number;
  conResumen?: boolean;
  className?: string;
}) {
  const medios = Array.from(new Set(noticia.articulos.map((a) => a.medioId)));
  const resto = medios.length - maxFuentes;
  return (
    <article
      aria-labelledby={`tn-${noticia.id}`}
      className={cn(
        "group relative flex flex-col gap-3 rounded-panel border bg-surface p-4 shadow-e1 transition-[box-shadow,border-color] duration-200 ease-[var(--ease-base)] md:p-5",
        "hover:border-border-strong hover:shadow-e2",
        seleccionada ? "border-signal" : "border-border",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Insignia>{noticia.tema}</Insignia>
        <span className="text-dato text-muted">{noticia.territorio}</span>
        <DeltaTendencia tendencia={noticia.tendencia} delta={noticia.delta} className="ml-auto" />
      </div>
      <h3 id={`tn-${noticia.id}`} className="text-tarjeta">
        <button
          type="button"
          data-noticia={noticia.id}
          onClick={() => onAbrir?.(noticia.id)}
          className="text-left transition-colors duration-150 after:absolute after:inset-0 after:rounded-panel group-hover:text-signal"
        >
          {noticia.titular}
        </button>
      </h3>
      {conResumen && <p className="line-clamp-2 text-chico text-muted">{noticia.resumen}</p>}
      <BarraDeSesgo conteo={contarPorLinea(noticia.articulos)} compacta />
      <div className="relative flex flex-wrap items-center gap-1.5">
        {medios.slice(0, maxFuentes).map((m) => (
          <ChipFuente key={m} medioId={m} />
        ))}
        {resto > 0 && <span className="text-dato text-muted">+{resto}</span>}
        <span className="ml-auto inline-flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-dato text-muted">
            <Newspaper size={12} strokeWidth={1.75} aria-hidden />
            <span className="tabular text-text">{medios.length}</span> medios
          </span>
          <SelloVeredicto veredicto={veredictoDe(noticia.id)} />
        </span>
      </div>
    </article>
  );
}
