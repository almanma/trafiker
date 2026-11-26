"use client";

import { Check, PenLine } from "lucide-react";
import { cn } from "@/lib/cn";
import { medioPorId } from "@/mocks/medios";
import type { Verificacion } from "@/mocks/tipos";
import { Boton } from "../ui/Boton";
import { ConfianzaIA, Meta } from "./Basicos";
import { SelloVeredicto } from "./SelloVeredicto";

/**
 * Expediente de verificación. Se lee como una ficha: dato, dónde se dijo,
 * contraste y sello. Separado por reglas, no por cajas idénticas.
 */
export function Expediente({
  v,
  revisado,
  onRevisado,
  onUsar,
  compacto = false,
  className,
}: {
  v: Verificacion;
  revisado?: boolean;
  onRevisado?: () => void;
  onUsar?: () => void;
  compacto?: boolean;
  className?: string;
}) {
  const medio = medioPorId[v.dicho.medioId];
  if (compacto) {
    return (
      <article className={cn("py-4 shadow-regla", className)}>
        <div className="flex items-start justify-between gap-3">
          <p className="text-lectura">{v.dato}</p>
          <SelloVeredicto veredicto={v.veredicto} />
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-dato">
          <Meta etiqueta="Dicho en">{medio.nombre}</Meta>
          <Meta etiqueta="Contraste">
            <a className="underline decoration-border-strong underline-offset-2 hover:text-signal" href={v.contraste.url} target="_blank" rel="noreferrer">
              {v.contraste.fuente}
            </a>
          </Meta>
        </div>
      </article>
    );
  }

  return (
    <article className={cn("grid gap-6 py-8 shadow-regla md:grid-cols-12", className)} aria-labelledby={`dato-${v.id}`}>
      <div className="md:col-span-7">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-dato">
          <Meta etiqueta="Expediente" mono>
            {v.id.replace("v-", "").toUpperCase()}
          </Meta>
          <Meta etiqueta="Dicho en">{medio.nombre}</Meta>
          <Meta etiqueta="Hora" mono>
            {v.dicho.hora}
          </Meta>
          <Meta etiqueta="Quién">{v.dicho.quien}</Meta>
        </div>
        <h3 id={`dato-${v.id}`} className="mt-3 max-w-[30ch] text-tarjeta titular">
          {v.dato}
        </h3>
        <a href={v.dicho.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-11 items-center break-all font-mono text-dato text-muted underline md:min-h-0 decoration-border-strong underline-offset-2 hover:text-signal">
          {v.dicho.url.replace("https://", "")}
        </a>
      </div>

      <div className="md:col-span-5 md:pl-6 md:shadow-regla-izq">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-chico text-muted">{v.contraste.tipo === "oficial" ? "Fuente oficial" : "Fact-checker"}</p>
            <p className="text-cuerpo">{v.contraste.fuente}</p>
          </div>
          <SelloVeredicto veredicto={v.veredicto} grande />
        </div>
        <p className="mt-3 max-w-lectura text-cuerpo text-muted">{v.contraste.dice}</p>
        <a href={v.contraste.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-11 items-center break-all font-mono text-dato text-signal underline md:min-h-0 underline-offset-2">
          {v.contraste.url.replace("https://", "")}
        </a>
        <div className="mt-4">
          <ConfianzaIA valor={v.confianza} etiqueta="Cruce sugerido por IA" />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Boton variante={revisado ? "secundario" : "primario"} onClick={onRevisado} aria-pressed={revisado}>
            <Check size={16} strokeWidth={1.5} aria-hidden />
            {revisado ? "Revisado" : "Marcar revisado"}
          </Boton>
          <Boton variante="fantasma" onClick={onUsar}>
            <PenLine size={16} strokeWidth={1.5} aria-hidden />
            Usar en contenido
          </Boton>
        </div>
      </div>
    </article>
  );
}
