"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { DatosEjemplo } from "@/components/firma/Basicos";
import { EstadoVacio } from "@/components/firma/Estados";
import { Expediente } from "@/components/firma/Expediente";
import { CircleCheck, CircleHelp, CircleX, TriangleAlert } from "lucide-react";
import { Chip } from "@/components/ui/Boton";
import { noticiaPorId } from "@/mocks/noticias";
import type { Veredicto } from "@/mocks/tipos";
import { nombreVeredicto, verificaciones } from "@/mocks/verificaciones";

const veredictos = ["falso", "enganoso", "sin-evidencia", "verificado"] as const satisfies readonly Veredicto[];
const iconos = { falso: CircleX, enganoso: TriangleAlert, "sin-evidencia": CircleHelp, verificado: CircleCheck };
const colorIcono = { falso: "text-falso", enganoso: "text-enganoso", "sin-evidencia": "text-sin-verificar", verificado: "text-verificado" };

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
          <h1 className="text-hero">Verificación</h1>
          <p className="mt-2 max-w-lectura text-cuerpo text-muted">
            Datos que circulan hoy, cruzados con fuentes oficiales y fact-checkers. Cada expediente enlaza a su fuente; la decisión final es tuya.
          </p>
        </div>
        <DatosEjemplo className="lg:hidden" />
      </header>

      {noticia && noticiaPorId[noticia] && (
        <p className="mb-4 rounded-control border border-border bg-surface px-3 py-2 text-chico text-muted">
          Filtrado por la noticia <span className="font-medium text-text">{noticiaPorId[noticia].titular}</span>
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2 pb-5" role="group" aria-label="Filtrar por veredicto">
        <Chip activo={!filtro} onClick={() => setFiltro(null)}>
          Todos <span className="text-dato tabular opacity-80">{verificaciones.length}</span>
        </Chip>
        {veredictos.map((v) => {
          const Icono = iconos[v];
          return (
            <Chip key={v} activo={filtro === v} onClick={() => setFiltro(filtro === v ? null : v)}>
              <Icono size={14} strokeWidth={2} aria-hidden className={colorIcono[v]} />
              {nombreVeredicto[v]}
              <span className="text-dato tabular opacity-80">{conteo(v)}</span>
            </Chip>
          );
        })}
        <span className="ml-auto hidden text-dato text-muted sm:inline">
          Revisados <span className="font-medium text-text tabular">{revisados.length}</span> de {verificaciones.length}
        </span>
      </div>

      {lista.length === 0 ? (
        <EstadoVacio titulo="Sin datos dudosos por ahora." texto="Ningún dato de hoy coincide con ese filtro. Buena señal, pero el radar sigue mirando." />
      ) : (
        <div className="flex flex-col gap-4">
        {lista.map((v) => (
          <Expediente
            key={v.id}
            v={v}
            revisado={revisados.includes(v.id)}
            onRevisado={() => {
              setRevisados((r) => (r.includes(v.id) ? r.filter((x) => x !== v.id) : [...r, v.id]));
              toast.success(revisados.includes(v.id) ? "Marcado como pendiente" : "Marcado como revisado", { description: "Solo en esta sesión." });
            }}
            onUsar={() => toast.success("Dato agregado a tus ideas", { description: "Con su fuente enlazada. Nada se publica." })}
          />
        ))}
        </div>
      )}
    </div>
  );
}
