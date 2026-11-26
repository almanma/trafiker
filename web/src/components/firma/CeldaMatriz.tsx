"use client";

import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import { cn } from "@/lib/cn";
import type { Articulo, Linea, Medio } from "@/mocks/tipos";
import { Meta } from "./Basicos";

const relleno: Record<Linea, string> = {
  izquierda: "fill-izquierda",
  centro: "fill-centro",
  derecha: "fill-derecha",
  "a-validar": "fill-muted",
};

const nombreTono = { favor: "a favor", neutral: "neutral", contra: "en contra" } as const;

/** Glifo del tono: triángulo arriba (a favor), círculo (neutral), triángulo abajo (en contra). */
export function GlifoTono({ tono, linea, intensidad }: { tono?: Articulo["tono"]; linea: Linea; intensidad?: 1 | 2 | 3 }) {
  if (!tono) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
        <circle cx="10" cy="10" r="1.25" className="fill-border-strong" />
      </svg>
    );
  }
  const op = intensidad === 3 ? 1 : intensidad === 2 ? 0.72 : 0.45;
  const s = intensidad === 3 ? 1 : intensidad === 2 ? 0.85 : 0.7;
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
      <g transform={`translate(10 10) scale(${s}) translate(-10 -10)`} opacity={op} className={relleno[linea]}>
        {tono === "favor" && <path d="M10 3.5 L17 15.5 H3 Z" />}
        {tono === "neutral" && <circle cx="10" cy="10" r="6" />}
        {tono === "contra" && <path d="M10 16.5 L17 4.5 H3 Z" />}
      </g>
    </svg>
  );
}

export function CeldaMatriz({
  medio,
  articulo,
  hechoTitular,
  activa,
  onFoco,
  fila,
  columna,
}: {
  medio: Medio;
  articulo?: Articulo;
  hechoTitular: string;
  activa: boolean;
  onFoco: () => void;
  fila: number;
  columna: number;
}) {
  const [abierta, setAbierta] = useState(false);
  const etiqueta = articulo
    ? `${medio.nombre}: ${nombreTono[articulo.tono]}, intensidad ${articulo.intensidad} de 3, ${articulo.hora}`
    : `${medio.nombre}: no cubrió`;

  return (
    <div role="gridcell" className="flex items-center justify-center" aria-label={etiqueta}>
      <Popover.Root open={abierta} onOpenChange={setAbierta}>
        <Popover.Trigger asChild>
          <button
            type="button"
            tabIndex={activa ? 0 : -1}
            data-celda={`${fila}-${columna}`}
            aria-label={etiqueta}
            onFocus={() => {
              onFoco();
              if (articulo) setAbierta(true);
            }}
            onBlur={() => setAbierta(false)}
            onMouseEnter={() => articulo && setAbierta(true)}
            onMouseLeave={() => setAbierta(false)}
            className={cn(
              "grid h-11 w-11 place-items-center rounded-control transition-colors duration-150 ease-[var(--ease-base)] md:h-9 md:w-9",
              "hover:bg-surface hover:shadow-e1",

            )}
          >
            <GlifoTono tono={articulo?.tono} linea={medio.linea} intensidad={articulo?.intensidad} />
          </button>
        </Popover.Trigger>
        {articulo && (
          <Popover.Portal>
            <Popover.Content
              side="top"
              sideOffset={6}
              collisionPadding={16}
              onOpenAutoFocus={(e) => e.preventDefault()}
              onCloseAutoFocus={(e) => e.preventDefault()}
              className="z-50 w-72 rounded-panel border border-border bg-surface p-4 text-chico shadow-e3"
            >
              <p className="text-dato text-muted">{hechoTitular}</p>
              <p className="mt-2 text-cuerpo font-semibold">{articulo.titular}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-dato">
                <Meta etiqueta="Medio">{medio.nombre}</Meta>
                <Meta etiqueta="Hora" mono>
                  {articulo.hora}
                </Meta>
                <Meta etiqueta="Tono">{nombreTono[articulo.tono]}</Meta>
              </div>
              <a href={articulo.url} className="mt-3 inline-flex items-center gap-1 text-dato font-medium text-signal hover:underline" target="_blank" rel="noreferrer">
                Abrir la nota original ↗
              </a>
            </Popover.Content>
          </Popover.Portal>
        )}
      </Popover.Root>
    </div>
  );
}
