"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { DatosEjemplo } from "@/components/firma/Basicos";
import { EstadoVacio } from "@/components/firma/Estados";
import { Expediente } from "@/components/firma/Expediente";
import { SelloVeredicto } from "@/components/firma/SelloVeredicto";
import { Chip } from "@/components/ui/Boton";
import { noticiaPorId } from "@/mocks/noticias";
import type { Veredicto } from "@/mocks/tipos";
import { verificaciones } from "@/mocks/verificaciones";

const veredictos: Veredicto[] = ["falso", "enganoso", "sin-evidencia", "verificado"];

export function VistaVerificacion() {
  const noticia = useSearchParams().get("noticia");
  const [filtro, setFiltro] = useState<Veredicto | null>(null);
  const [revisados, setRevisados] = useState<string[]>([]);
  const lista = verificaciones.filter((v) => (!filtro || v.veredicto === filtro) && (!noticia || v.noticiaId === noticia));
  const conteo = (v: Veredicto) => verificaciones.filter((x) => x.veredicto === v).length;

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4 pb-6">
        <div>
          <h1 className="text-secundario serif-display md:text-hero">Verificación</h1>
          <p className="mt-3 max-w-lectura text-cuerpo text-muted">
            Datos que circulan hoy, cruzados con fuentes oficiales y fact-checkers. Cada expediente enlaza a su fuente; la decisión final es tuya.
          </p>
        </div>
        <DatosEjemplo className="lg:hidden" />
      </header>

      {noticia && noticiaPorId[noticia] && (
        <p className="mb-4 text-chico text-muted">
          Filtrado por la noticia <span className="text-text">{noticiaPorId[noticia].titular}</span>
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2 pb-2 shadow-regla" role="group" aria-label="Filtrar por veredicto">
        <Chip activo={!filtro} onClick={() => setFiltro(null)}>
          Todos <span className="font-mono text-dato tabular">{verificaciones.length}</span>
        </Chip>
        {veredictos.map((v) => (
          <Chip key={v} activo={filtro === v} onClick={() => setFiltro(filtro === v ? null : v)} className="pl-1.5">
            <SelloVeredicto veredicto={v} className="border-0 px-0.5" />
            <span className="font-mono text-dato tabular">{conteo(v)}</span>
          </Chip>
        ))}
      </div>

      {lista.length === 0 ? (
        <EstadoVacio titulo="Sin datos dudosos por ahora." texto="Ningún dato de hoy coincide con ese filtro. Buena señal, pero el radar sigue mirando." />
      ) : (
        lista.map((v) => (
          <Expediente
            key={v.id}
            v={v}
            revisado={revisados.includes(v.id)}
            onRevisado={() => {
              setRevisados((r) => (r.includes(v.id) ? r.filter((x) => x !== v.id) : [...r, v.id]));
              toast(revisados.includes(v.id) ? "Marcado como pendiente" : "Marcado como revisado", { description: "Solo en esta sesión." });
            }}
            onUsar={() => toast("Dato agregado a tus ideas", { description: "Con su fuente enlazada. Nada se publica." })}
          />
        ))
      )}
    </div>
  );
}
