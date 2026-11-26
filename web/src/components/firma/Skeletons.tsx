import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/* Skeletons con la forma real de cada pantalla: tarjetas blancas con
   bloques grises adentro. Un solo brillo por pantalla (una franja clara que
   barre todo el contenedor), no una animación por bloque. Con «reducir
   movimiento» el brillo se apaga y queda la forma quieta. */

/** Bloque gris (texto, cifra, gráfico). `fuerte` para bloques sobre fondo gris. */
function B({ className, style, fuerte = false }: { className?: string; style?: CSSProperties; fuerte?: boolean }) {
  return <div className={cn("rounded-editorial", fuerte ? "bg-border-strong" : "bg-surface-2", className)} style={style} />;
}

/** Tarjeta vacía con la piel del sistema. */
function T({ className, children, relleno = true }: { className?: string; children?: ReactNode; relleno?: boolean }) {
  return <div className={cn("rounded-panel border border-border bg-surface shadow-e1", relleno && "p-4 md:p-5", className)}>{children}</div>;
}

function Contenedor({ children, etiqueta }: { children: ReactNode; etiqueta: string }) {
  return (
    <div className="brillo" role="status" aria-label={etiqueta} aria-busy="true">
      {children}
    </div>
  );
}

/** Título y bajada de página. */
function Cabecera({ conAccion = false }: { conAccion?: boolean }) {
  return (
    <div className="flex items-end justify-between gap-4 pb-8">
      <div className="w-full">
        <B className="h-8 w-56 md:h-10 md:w-72" />
        <B className="mt-3 h-4 w-full max-w-md" />
      </div>
      {conAccion && <B className="hidden h-9 w-36 shrink-0 md:block" />}
    </div>
  );
}

/** Tarjeta de noticia: insignias, titular de dos líneas, resumen, barra, fuentes. */
function TarjetaNoticiaSk() {
  return (
    <T className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <B className="h-5 w-20" />
        <B className="h-4 w-16" />
        <B className="ml-auto h-4 w-12" />
      </div>
      <B className="h-5 w-full" />
      <B className="h-5 w-3/4" />
      <B className="mt-1 h-3.5 w-full" />
      <B className="h-3.5 w-2/3" />
      <B className="mt-1 h-1.5 w-full" />
      <div className="flex items-center gap-1.5">
        <B className="h-7 w-24" />
        <B className="h-7 w-24" />
        <B className="ml-auto h-5 w-16" />
      </div>
    </T>
  );
}

export function SkeletonBrief() {
  return (
    <Contenedor etiqueta="Cargando el brief">
      <B className="h-4 w-64" />
      <B className="mt-4 h-9 w-72 md:h-10 md:w-96" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-6">
          <T>
            <B className="h-4 w-36" />
            <div className="mt-4 grid gap-3">
              {["w-full", "w-11/12", "w-4/5"].map((w) => (
                <div key={w} className="flex items-center gap-3">
                  <B className="h-5 w-5 shrink-0 rounded-pildora" />
                  <B className={cn("h-4", w)} />
                </div>
              ))}
            </div>
          </T>
          <div className="grid gap-4 md:grid-cols-2">
            <TarjetaNoticiaSk />
            <TarjetaNoticiaSk />
            <TarjetaNoticiaSk />
            <TarjetaNoticiaSk />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <T>
            <B className="h-4 w-28" />
            {[0, 1, 2].map((i) => (
              <div key={i} className="mt-4 flex items-start gap-3">
                <B className="h-4 flex-1" />
                <B className="h-5 w-16" />
              </div>
            ))}
          </T>
          <T>
            <B className="h-4 w-24" />
            <B className="mt-4 h-14 w-full" />
            <B className="mt-3 h-14 w-full" />
          </T>
        </div>
      </div>
    </Contenedor>
  );
}

export function SkeletonMatriz() {
  return (
    <Contenedor etiqueta="Cargando la matriz">
      <Cabecera conAccion />
      <div className="flex flex-wrap gap-2">
        {[16, 20, 20, 16, 24].map((w, i) => (
          <B key={i} className="h-8 rounded-pildora" style={{ width: `${w * 4}px` }} />
        ))}
      </div>
      <T relleno={false} className="mt-6 overflow-hidden">
        <div className="flex items-end gap-3 border-b border-border bg-surface-2 px-4 py-3">
          <B fuerte className="h-3 w-40 shrink-0 md:w-64" />
          {Array.from({ length: 12 }).map((_, j) => (
            <B key={j} fuerte className="hidden h-12 w-6 shrink-0 sm:block" />
          ))}
        </div>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0">
            <div className="w-40 shrink-0 md:w-64">
              <B className="h-3.5 w-full" />
              <B className="mt-1.5 h-3.5 w-2/3" />
            </div>
            {Array.from({ length: 12 }).map((__, j) => (
              <span key={j} className="hidden w-6 shrink-0 place-items-center sm:grid">
                <B className={cn("rounded-pildora", (i + j) % 3 === 0 ? "h-3 w-3" : "h-1.5 w-1.5")} />
              </span>
            ))}
          </div>
        ))}
      </T>
    </Contenedor>
  );
}

export function SkeletonGrafico() {
  return (
    <Contenedor etiqueta="Cargando tendencias">
      <Cabecera />
      <div className="flex gap-4 border-b border-border pb-3">
        <B className="h-4 w-16" />
        <B className="h-4 w-24" />
        <B className="h-4 w-16" />
      </div>
      <T className="mt-6">
        <div className="flex justify-between">
          <B className="h-4 w-40" />
          <B className="h-8 w-28" />
        </div>
        <div className="relative mt-6 h-56 md:h-72">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="absolute inset-x-0 border-t border-dashed border-border" style={{ top: `${i * 33}%` }} />
          ))}
          <svg viewBox="0 0 400 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
            <path d="M0 80 C60 70 90 40 150 45 S260 20 300 30 S370 55 400 35 L400 100 L0 100 Z" className="fill-surface-2" />
          </svg>
        </div>
        <div className="mt-3 flex justify-between">
          {Array.from({ length: 6 }).map((_, i) => (
            <B key={i} className="h-3 w-10" />
          ))}
        </div>
      </T>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {[0, 1].map((k) => (
          <T key={k}>
            <B className="h-4 w-40" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="mt-4 flex items-center gap-3">
                <B className="h-4 w-4" />
                <B className="h-4 flex-1" />
                <B className="h-6 w-20" />
                <B className="h-4 w-12" />
              </div>
            ))}
          </T>
        ))}
      </div>
    </Contenedor>
  );
}

/** Lista de expedientes (verificación): afirmación, veredicto y evidencia. */
export function SkeletonLista({ filas = 4 }: { filas?: number }) {
  return (
    <Contenedor etiqueta="Cargando">
      <Cabecera />
      <div className="flex flex-wrap gap-2 pb-6">
        {[18, 22, 24, 26, 22].map((w, i) => (
          <B key={i} className="h-8 rounded-pildora" style={{ width: `${w * 4}px` }} />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: filas }).map((_, i) => (
          <T key={i} className="grid gap-5 md:grid-cols-12">
            <div className="md:col-span-7">
              <B className="h-3 w-48" />
              <B className="mt-3 h-5 w-5/6" />
              <B className="mt-2 h-5 w-1/2" />
              <B className="mt-3 h-3 w-56" />
            </div>
            <div className="md:col-span-5">
              <div className="flex justify-between">
                <B className="h-4 w-28" />
                <B className="h-6 w-20" />
              </div>
              <B className="mt-3 h-3.5 w-full" />
              <B className="mt-2 h-3.5 w-3/4" />
              <div className="mt-4 flex gap-2">
                <B className="h-9 w-32" />
                <B className="h-9 w-32" />
              </div>
            </div>
          </T>
        ))}
      </div>
    </Contenedor>
  );
}

export function SkeletonTabla() {
  return (
    <Contenedor etiqueta="Cargando fuentes">
      <Cabecera conAccion />
      <T relleno={false} className="overflow-hidden">
        <div className="flex gap-6 border-b border-border bg-surface-2 px-4 py-3">
          {["w-24", "w-12", "w-16", "w-24", "w-12"].map((w, i) => (
            <B key={i} fuerte className={cn("h-3", w, i > 1 && "hidden md:block")} />
          ))}
          <B fuerte className="ml-auto h-3 w-16" />
        </div>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-border px-4 py-3 last:border-b-0">
            <B className="h-8 w-8 shrink-0" />
            <div className="w-48">
              <B className="h-4 w-32" />
              <B className="mt-1.5 h-3 w-44" />
            </div>
            <B className="hidden h-4 w-20 md:block" />
            <B className="hidden h-9 w-32 md:block" />
            <B className="hidden h-5 w-20 md:block" />
            <B className="ml-auto h-4 w-10" />
          </div>
        ))}
      </T>
    </Contenedor>
  );
}

export function SkeletonKanban() {
  return (
    <Contenedor etiqueta="Cargando ideas">
      <Cabecera />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[3, 1, 1, 1].map((n, i) => (
          <div key={i} className="flex flex-col gap-3 rounded-panel bg-surface-2 p-3">
            <div className="flex justify-between px-1">
              <B fuerte className="h-4 w-24" />
              <B fuerte className="h-4 w-5" />
            </div>
            {Array.from({ length: n }).map((_, j) => (
              <T key={j} relleno={false} className="p-4">
                <div className="flex justify-between">
                  <B className="h-5 w-20" />
                  <B className="h-4 w-10" />
                </div>
                <B className="mt-3 h-5 w-full" />
                <B className="mt-1.5 h-5 w-2/3" />
                <B className="mt-3 h-3.5 w-full" />
                <div className="mt-4 flex gap-2">
                  <B className="h-8 flex-1" />
                  <B className="h-8 w-8" />
                </div>
              </T>
            ))}
          </div>
        ))}
      </div>
    </Contenedor>
  );
}

export function SkeletonDetalle() {
  return (
    <Contenedor etiqueta="Cargando la noticia">
      <B className="h-4 w-40" />
      <div className="mt-6 flex gap-2">
        <B className="h-5 w-20" />
        <B className="h-5 w-16" />
      </div>
      <B className="mt-4 h-8 w-full max-w-3xl md:h-10" />
      <B className="mt-2 h-8 w-2/3 max-w-2xl md:h-10" />
      <T className="mt-8 max-w-3xl">
        <B className="h-4 w-36" />
        <B className="mt-4 h-4 w-full" />
        <B className="mt-2 h-4 w-11/12" />
        <B className="mt-2 h-4 w-3/5" />
        <B className="mt-5 h-2.5 w-full" />
      </T>
      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
        <T>
          <B className="h-4 w-44" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="mt-4 flex gap-3">
              <B className="h-4 w-4 shrink-0" />
              <div className="flex-1">
                <B className="h-4 w-5/6" />
                <B className="mt-1.5 h-3 w-48" />
              </div>
            </div>
          ))}
        </T>
        <T>
          <B className="h-4 w-32" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="mt-4 flex gap-3">
              <B className="h-3 w-10 shrink-0" />
              <B className="h-3 flex-1" />
            </div>
          ))}
        </T>
      </div>
    </Contenedor>
  );
}

/** Formulario centrado (login, 2FA, onboarding). */
export function SkeletonFormulario() {
  return (
    <Contenedor etiqueta="Cargando">
      <div className="mx-auto w-full max-w-sm">
        <B className="h-8 w-48" />
        <B className="mt-3 h-4 w-64" />
        <B className="mt-8 h-3 w-16" />
        <B className="mt-2 h-10 w-full" />
        <B className="mt-5 h-3 w-20" />
        <B className="mt-2 h-10 w-full" />
        <B fuerte className="mt-6 h-10 w-full" />
      </div>
    </Contenedor>
  );
}
