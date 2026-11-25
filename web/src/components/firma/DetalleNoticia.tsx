"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { mediosPorLinea, medioPorId } from "@/mocks/medios";
import type { Noticia } from "@/mocks/tipos";
import { Boton } from "../ui/Boton";
import { useApp } from "../shell/Estado";
import { BarraDeSesgo, contarPorLinea } from "./BarraDeSesgo";
import { ConfianzaIA, DeltaTendencia, EtiquetaLinea, FilaMeta, Meta } from "./Basicos";
import { GlifoTono } from "./CeldaMatriz";

const tono = { favor: "a favor", neutral: "neutral", contra: "en contra" } as const;

export function DetalleNoticia({ noticia, enDrawer = false }: { noticia: Noticia; enDrawer?: boolean }) {
  const { convertirEnIdea } = useApp();
  const grupos = mediosPorLinea()
    .map((g) => ({ ...g, articulos: noticia.articulos.filter((a) => medioPorId[a.medioId].linea === g.id) }))
    .filter((g) => g.articulos.length);

  return (
    <div className={cn("px-4 pb-16 md:px-8", enDrawer ? "pt-6" : "pt-2")}>
      <FilaMeta className="mb-4">
        <Meta etiqueta="Tema">{noticia.tema}</Meta>
        <Meta etiqueta="Territorio">{noticia.territorio}</Meta>
        <span className="inline-flex items-baseline gap-1.5">
          <span className="text-muted">Tendencia</span>
          <DeltaTendencia tendencia={noticia.tendencia} delta={noticia.delta} />
        </span>
      </FilaMeta>
      <motion.h1 layoutId={enDrawer ? `titular-${noticia.id}` : undefined} className="max-w-[24ch] text-secundario serif-display md:text-hero">
        {noticia.titular}
      </motion.h1>

      <section className="mt-8 max-w-lectura" aria-labelledby="resumen-ia">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="resumen-ia" className="text-lectura serif-texto">
            Resumen neutral
          </h2>
          <ConfianzaIA valor={noticia.confianzaIA} etiqueta="Resumen por IA" />
        </div>
        <p className="mt-2 font-serif text-lectura serif-texto">{noticia.resumenIA}</p>
      </section>

      <div className="mt-6 max-w-md">
        <BarraDeSesgo conteo={contarPorLinea(noticia.articulos)} />
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-12">
        <section className="md:col-span-7" aria-labelledby="por-medio">
          <h2 id="por-medio" className="pb-3 text-tarjeta serif-texto shadow-regla">
            Cómo lo cuenta cada medio
          </h2>
          {grupos.map((g) => (
            <div key={g.id} className="pt-5">
              <EtiquetaLinea linea={g.id} />
              <ul className="mt-2">
                {g.articulos.map((a) => (
                  <li key={a.medioId} className="flex gap-3 py-3 shadow-regla">
                    <span className="mt-0.5 shrink-0" title={tono[a.tono]}>
                      <GlifoTono tono={a.tono} linea={g.id} intensidad={a.intensidad} />
                    </span>
                    <div className="min-w-0">
                      <a href={a.url} target="_blank" rel="noreferrer" className="font-serif text-lectura serif-texto hover:text-signal">
                        {a.titular}
                      </a>
                      <FilaMeta className="mt-1 text-dato">
                        <Meta etiqueta="Medio">{medioPorId[a.medioId].nombre}</Meta>
                        <Meta etiqueta="Hora" mono>
                          {a.hora}
                        </Meta>
                        <Meta etiqueta="Tono">{tono[a.tono]}</Meta>
                      </FilaMeta>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <aside className="flex flex-col gap-10 md:col-span-5">
          <section aria-labelledby="linea-tiempo">
            <h2 id="linea-tiempo" className="pb-3 text-tarjeta serif-texto shadow-regla">
              Línea de tiempo
            </h2>
            <ol className="mt-4 border-l border-border-strong pl-4">
              {noticia.lineaDeTiempo.map((e) => (
                <li key={e.hora + e.texto} className="relative pb-4">
                  <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-punto bg-border-strong" aria-hidden />
                  <time className="font-mono text-dato tabular text-muted">{e.hora}</time>
                  <p className="text-chico">{e.texto}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="actores">
            <h2 id="actores" className="pb-3 text-tarjeta serif-texto shadow-regla">
              Actores mencionados
            </h2>
            <ul>
              {noticia.actores.map((a) => (
                <li key={a.nombre} className="flex items-baseline justify-between gap-3 py-2 shadow-regla">
                  <span className="text-chico">
                    {a.nombre} <span className="text-muted">{a.rol}</span>
                  </span>
                  <span className="font-mono text-dato tabular text-muted">{a.menciones}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="datos-clave">
            <h2 id="datos-clave" className="pb-3 text-tarjeta serif-texto shadow-regla">
              Datos clave
            </h2>
            <ul>
              {noticia.datosClave.map((d) => (
                <li key={d.dato} className="py-3 shadow-regla">
                  <p className="text-chico">{d.dato}</p>
                  <a href={d.url} target="_blank" rel="noreferrer" className="text-dato text-signal underline underline-offset-2">
                    Fuente: {d.fuente}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        <Boton variante="primario" onClick={() => convertirEnIdea(noticia.id)}>
          <Lightbulb size={16} strokeWidth={1.5} aria-hidden />
          Convertir en idea
        </Boton>
        {enDrawer && (
          <Link href={`/noticia/${noticia.id}`} className="inline-flex min-h-11 items-center rounded-control px-3 text-chico text-muted hover:bg-surface-2 hover:text-text md:min-h-9">
            Abrir como página
          </Link>
        )}
      </div>
    </div>
  );
}
