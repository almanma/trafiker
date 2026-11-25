"use client";

import { RotateCw, WifiOff } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Boton, clasesBoton } from "../ui/Boton";

/** Ilustración lineal propia: radar en calma, sin detecciones. */
function IlustracionRadarVacio() {
  return (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none" aria-hidden className="text-border-strong">
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
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none" aria-hidden className="text-border-strong">
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M14 70 H52 L60 52 L68 86 L74 70 H86" />
        <path d="M102 70 H146" strokeDasharray="3 5" />
      </g>
      <path d="M90 60 L98 80" className="stroke-falso" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
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
    <section className={cn("flex flex-col items-start gap-4 py-16", className)} aria-live="polite">
      <IlustracionRadarVacio />
      <h2 className="text-tarjeta serif-display">{titulo}</h2>
      <p className="max-w-lectura text-cuerpo text-muted">{texto}</p>
      {accion ?? (
        <Link href="?" className={clasesBoton("secundario")}>
          Quitar filtros
        </Link>
      )}
    </section>
  );
}

export function EstadoError({ className }: { className?: string }) {
  return (
    <section role="alert" className={cn("flex flex-col items-start gap-4 py-16", className)}>
      <IlustracionCorte />
      <h2 className="text-tarjeta serif-display">No pudimos leer esta sección.</h2>
      <p className="max-w-lectura text-cuerpo text-muted">
        Una de las fuentes no respondió a tiempo. Tus datos anteriores siguen a salvo; prueba de nuevo o revisa el estado de las fuentes.
      </p>
      <div className="flex flex-wrap gap-2">
        <Link href="?" className={clasesBoton("primario")}>
          <RotateCw size={16} strokeWidth={1.5} aria-hidden />
          Reintentar
        </Link>
        <Link href="/fuentes" className={clasesBoton("fantasma")}>
          Ver estado de las fuentes
        </Link>
      </div>
    </section>
  );
}

export function EstadoSinConexion({ className }: { className?: string }) {
  return (
    <section role="status" className={cn("flex flex-col items-start gap-4 py-16", className)}>
      <WifiOff size={32} strokeWidth={1.5} className="text-muted" aria-hidden />
      <h2 className="text-tarjeta serif-display">Sin conexión.</h2>
      <p className="max-w-lectura text-cuerpo text-muted">Estás viendo el brief guardado de las 04:52. Lo actualizamos en cuanto vuelva la señal.</p>
      <Boton variante="secundario" onClick={() => location.reload()}>
        Volver a intentar
      </Boton>
    </section>
  );
}

export type Estado = "normal" | "vacio" | "carga" | "error" | "sin-conexion";

/** Lee ?estado= y muestra el estado diseñado correspondiente. Va dentro de <Suspense>. */
export function EstadoPantalla({
  children,
  esqueleto,
  vacio,
}: {
  children: ReactNode;
  esqueleto: ReactNode;
  vacio?: ReactNode;
}) {
  const estado = (useSearchParams().get("estado") ?? "normal") as Estado;
  if (estado === "carga") return <>{esqueleto}</>;
  if (estado === "error") return <EstadoError />;
  if (estado === "sin-conexion") return <EstadoSinConexion />;
  if (estado === "vacio") return <>{vacio ?? <EstadoVacio />}</>;
  return <>{children}</>;
}
