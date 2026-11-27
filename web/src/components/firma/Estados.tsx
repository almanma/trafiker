"use client";

import { RotateCw, WifiOff } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Boton, clasesBoton } from "../ui/Boton";

/** Ilustración lineal propia: radar en calma, sin detecciones. */
function IlustracionRadarVacio() {
  return (
    <svg width="128" height="96" viewBox="0 0 160 120" fill="none" aria-hidden className="text-border-strong">
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M20 110 A60 60 0 0 1 140 110" />
        <path d="M45 110 A35 35 0 0 1 115 110" />
        <path d="M68 110 A12 12 0 0 1 92 110" />
        <path d="M80 110 V40" strokeDasharray="2 4" />
        <path d="M10 110 H150" />
      </g>
      <path d="M80 110 L122 66" className="stroke-signal" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="80" cy="110" r="3" className="fill-signal" />
    </svg>
  );
}

function IlustracionCorte() {
  return (
    <svg width="128" height="96" viewBox="0 0 160 120" fill="none" aria-hidden className="text-border-strong">
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M14 70 H52 L60 52 L68 86 L74 70 H86" />
        <path d="M102 70 H146" strokeDasharray="3 5" />
      </g>
      <path d="M90 60 L98 80" className="stroke-falso" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Marco común de los estados: panel centrado, ilustración, frase útil y acción. */
function MarcoEstado({ children, className, ...p }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("mx-auto my-8 flex max-w-xl flex-col items-center gap-3 rounded-panel border border-dashed border-border-strong bg-surface px-6 py-12 text-center", className)}
      {...p}
    >
      {children}
    </section>
  );
}

export function EstadoVacio({
  titulo = "Nada nuevo desde las 04:52.",
  texto = "El radar sigue mirando. Cuando un medio publique algo que coincida con tus filtros, aparecerá aquí.",
  accion,
  className,
}: {
  titulo?: string;
  texto?: string;
  accion?: ReactNode;
  className?: string;
}) {
  return (
    <MarcoEstado className={className} aria-live="polite">
      <IlustracionRadarVacio />
      <h2 className="text-secundario">{titulo}</h2>
      <p className="max-w-md text-cuerpo text-muted">{texto}</p>
      {accion ?? (
        <Link href="?" className={clasesBoton("secundario", "mt-2")}>
          Quitar filtros
        </Link>
      )}
    </MarcoEstado>
  );
}

/**
 * Error amable. Con `onReintentar` (error.tsx) vuelve a pintar la sección;
 * sin él, recarga la ruta sin parámetros de estado.
 */
export function EstadoError({
  titulo = "No pudimos leer esta sección.",
  texto = "Una de las fuentes no respondió a tiempo. Tus datos anteriores siguen a salvo; prueba de nuevo o revisa el estado de las fuentes.",
  onReintentar,
  className,
}: {
  titulo?: string;
  texto?: string;
  onReintentar?: () => void;
  className?: string;
}) {
  return (
    <MarcoEstado role="alert" className={className}>
      <IlustracionCorte />
      <h2 className="text-secundario">{titulo}</h2>
      <p className="max-w-md text-cuerpo text-muted">{texto}</p>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {onReintentar ? (
          <Boton variante="primario" onClick={onReintentar}>
            <RotateCw size={16} strokeWidth={1.75} aria-hidden />
            Reintentar
          </Boton>
        ) : (
          <Link href="?" className={clasesBoton("primario")}>
            <RotateCw size={16} strokeWidth={1.75} aria-hidden />
            Reintentar
          </Link>
        )}
        <Link href="/fuentes" className={clasesBoton("fantasma")}>
          Ver estado de las fuentes
        </Link>
      </div>
    </MarcoEstado>
  );
}

export function EstadoSinConexion({ className }: { className?: string }) {
  return (
    <MarcoEstado role="status" className={className}>
      <span className="grid h-14 w-14 place-items-center rounded-pildora bg-surface-2 text-muted" aria-hidden>
        <WifiOff size={24} strokeWidth={1.75} />
      </span>
      <h2 className="text-secundario">Sin conexión.</h2>
      <p className="max-w-md text-cuerpo text-muted">Estás viendo el brief guardado de las 04:52. Lo actualizamos en cuanto vuelva la señal.</p>
      <Boton variante="secundario" className="mt-2" onClick={() => location.reload()}>
        Volver a intentar
      </Boton>
    </MarcoEstado>
  );
}
