import { cn } from "@/lib/cn";

/* Skeletons con la forma real de cada pantalla. Una sola animación
   (respira) en el contenedor, no una por bloque. */

function B({ className }: { className?: string }) {
  return <div className={cn("rounded-editorial bg-surface-2", className)} />;
}

function Contenedor({ children, etiqueta }: { children: React.ReactNode; etiqueta: string }) {
  return (
    <div className="animate-respira" role="status" aria-label={etiqueta} aria-busy="true">
      {children}
    </div>
  );
}

export function SkeletonBrief() {
  return (
    <Contenedor etiqueta="Cargando el brief">
      <B className="h-12 w-2/3 md:h-16" />
      <B className="mt-4 h-4 w-48" />
      <div className="mt-10 grid gap-3">
        <B className="h-6 w-full max-w-3xl" />
        <B className="h-6 w-5/6 max-w-3xl" />
        <B className="h-6 w-2/3 max-w-3xl" />
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-9">
          <B className="h-10 w-full" />
          <B className="mt-3 h-10 w-3/4" />
          <B className="mt-6 h-5 w-full max-w-xl" />
          <B className="mt-2 h-5 w-5/6 max-w-xl" />
          <B className="mt-6 h-2.5 w-full max-w-md" />
          <div className="mt-10 grid gap-6 md:grid-cols-12">
            <B className="h-40 md:col-span-6" />
            <B className="h-40 md:col-span-3" />
            <B className="h-40 md:col-span-3" />
          </div>
        </div>
        <div className="flex flex-col gap-4 md:col-span-3">
          <B className="h-6 w-1/2" />
          <B className="h-16" />
          <B className="h-16" />
          <B className="h-16" />
        </div>
      </div>
    </Contenedor>
  );
}

export function SkeletonMatriz() {
  return (
    <Contenedor etiqueta="Cargando la matriz">
      <div className="flex gap-2">
        <B className="h-8 w-24" />
        <B className="h-8 w-24" />
        <B className="h-8 w-24" />
      </div>
      <div className="mt-8 grid gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <B className="h-6 w-48 shrink-0 md:w-72" />
            {Array.from({ length: 12 }).map((__, j) => (
              <B key={j} className="hidden h-6 w-6 shrink-0 sm:block" />
            ))}
          </div>
        ))}
      </div>
    </Contenedor>
  );
}

export function SkeletonLista({ filas = 6 }: { filas?: number }) {
  return (
    <Contenedor etiqueta="Cargando">
      {Array.from({ length: filas }).map((_, i) => (
        <div key={i} className="grid gap-3 py-6 shadow-regla md:grid-cols-12">
          <div className="md:col-span-7">
            <B className="h-3 w-40" />
            <B className="mt-3 h-6 w-4/5" />
            <B className="mt-2 h-3 w-56" />
          </div>
          <div className="md:col-span-5">
            <B className="h-4 w-24" />
            <B className="mt-3 h-4 w-full" />
            <B className="mt-2 h-4 w-2/3" />
          </div>
        </div>
      ))}
    </Contenedor>
  );
}

export function SkeletonTabla() {
  return (
    <Contenedor etiqueta="Cargando fuentes">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-3 shadow-regla">
          <B className="h-8 w-8 shrink-0" />
          <B className="h-4 w-40" />
          <B className="hidden h-4 w-24 md:block" />
          <B className="hidden h-4 w-24 md:block" />
          <B className="ml-auto h-4 w-12" />
        </div>
      ))}
    </Contenedor>
  );
}

export function SkeletonKanban() {
  return (
    <Contenedor etiqueta="Cargando ideas">
      <div className="grid gap-6 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <B className="h-5 w-28" />
            <B className="h-36" />
            <B className="h-24" />
          </div>
        ))}
      </div>
    </Contenedor>
  );
}

export function SkeletonGrafico() {
  return (
    <Contenedor etiqueta="Cargando tendencias">
      <B className="h-8 w-56" />
      <B className="mt-6 h-64 w-full" />
      <div className="mt-8 grid gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <B key={i} className="h-8 w-full" />
        ))}
      </div>
    </Contenedor>
  );
}
