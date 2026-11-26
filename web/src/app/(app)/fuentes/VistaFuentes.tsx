"use client";

import { Plus } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { DatosEjemplo } from "@/components/firma/Basicos";
import { MuestraLinea } from "@/components/firma/BarraDeSesgo";
import { Boton } from "@/components/ui/Boton";
import { claseCampo } from "@/components/ui/Campo";
import { Dialogo } from "@/components/ui/Dialogo";
import { cn } from "@/lib/cn";
import { lineas, medios as iniciales } from "@/mocks/medios";
import type { Linea, Medio } from "@/mocks/tipos";

function Salud({ m }: { m: Medio }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-chico", m.salud === "ok" ? "text-verificado" : "text-falso")}>
      <span className="relative inline-flex h-2 w-2" aria-hidden>
        <span className={cn("h-2 w-2 rounded-punto", m.salud === "ok" ? "bg-verificado" : "bg-falso")} />
      </span>
      {m.salud === "ok" ? "Responde" : "Error"}
    </span>
  );
}

export function VistaFuentes() {
  const [lista, setLista] = useState<Medio[]>(iniciales);
  const [dialogo, setDialogo] = useState(false);

  const cambiarLinea = (id: string, linea: Linea) => {
    setLista((l) => l.map((m) => (m.id === id ? { ...m, linea, lineaEjemplo: false } : m)));
    toast("Línea editorial actualizada", { description: "Solo en esta sesión." });
  };

  const agregar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const nombre = String(f.get("nombre") || "Nueva fuente");
    setLista((l) => [
      ...l,
      {
        id: `nueva-${Date.now()}`,
        nombre,
        inicial: nombre.slice(0, 2).toUpperCase(),
        tipo: f.get("tipo") as Medio["tipo"],
        region: String(f.get("region") || "Nacional"),
        alcance: "regional",
        linea: "a-validar",
        lineaEjemplo: false,
        feed: String(f.get("feed") || ""),
        salud: "ok",
        ultimaLectura: "—",
        notasHoy: 0,
      },
    ]);
    setDialogo(false);
    toast("Fuente agregada", { description: `${nombre} se leerá en la próxima corrida. Línea: a validar.` });
  };

  const sanas = lista.filter((m) => m.salud === "ok").length;

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4 pb-6">
        <div>
          <h1 className="text-secundario titular md:text-hero">Fuentes</h1>
          <p className="mt-3 max-w-lectura text-cuerpo text-muted">
            Medios que lee el radar cada madrugada. La línea editorial la defines tú: mientras no la valides, queda como «a validar».
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DatosEjemplo className="lg:hidden" />
          <Boton variante="primario" onClick={() => setDialogo(true)}>
            <Plus size={16} strokeWidth={1.5} aria-hidden />
            Agregar fuente
          </Boton>
        </div>
      </header>

      <p className="pb-4 text-chico text-muted">
        Responden <span className="font-mono text-dato tabular text-text">{sanas}</span> de{" "}
        <span className="font-mono text-dato tabular text-text">{lista.length}</span>. Última corrida a las{" "}
        <span className="font-mono text-dato tabular text-text">04:49</span>.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[340px] border-collapse text-left">
          <caption className="sr-only">Fuentes del radar con su tipo, región, línea editorial y estado</caption>
          <thead>
            <tr className="text-dato text-muted shadow-regla">
              <th scope="col" className="py-2 pr-4 font-normal">Medio</th>
              <th scope="col" className="hidden py-2 pr-4 font-normal md:table-cell">Tipo</th>
              <th scope="col" className="hidden py-2 pr-4 font-normal lg:table-cell">Región</th>
              <th scope="col" className="py-2 pr-4 font-normal">Línea editorial</th>
              <th scope="col" className="hidden py-2 pr-4 font-normal sm:table-cell">Salud</th>
              <th scope="col" className="hidden py-2 pr-4 text-right font-normal md:table-cell">Notas hoy</th>
              <th scope="col" className="hidden py-2 text-right font-normal sm:table-cell">Última lectura</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((m) => (
              <tr key={m.id} className="shadow-regla">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-editorial bg-surface-2 text-chico shadow-[inset_0_0_0_1px_var(--t-border)]" aria-hidden>
                      {m.inicial}
                    </span>
                    <div className="min-w-0">
                      <p className="text-cuerpo">{m.nombre}</p>
                      <p className="max-w-[16rem] truncate font-mono text-dato text-muted" title={m.feed}>
                        {m.feed}
                      </p>
                      <span className="sm:hidden">
                        <Salud m={m} />
                      </span>
                    </div>
                  </div>
                </td>
                <td className="hidden py-3 pr-4 text-chico md:table-cell">{m.tipo}</td>
                <td className="hidden py-3 pr-4 text-chico lg:table-cell">{m.region}</td>
                <td className="py-3 pr-4">
                  <label className="flex items-center gap-2">
                    <MuestraLinea linea={m.linea} />
                    <span className="sr-only">Línea editorial de {m.nombre}</span>
                    <select
                      value={m.linea}
                      onChange={(e) => cambiarLinea(m.id, e.target.value as Linea)}
                      className="h-11 rounded-control bg-input px-2 text-chico text-text shadow-[inset_0_0_0_1px_var(--t-border)] md:h-9"
                    >
                      {lineas.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.nombre}
                        </option>
                      ))}
                    </select>
                    {m.lineaEjemplo && <span className="text-dato text-muted">ejemplo</span>}
                  </label>
                </td>
                <td className="hidden py-3 pr-4 sm:table-cell">
                  <Salud m={m} />
                </td>
                <td className="hidden py-3 pr-4 text-right font-mono text-dato tabular md:table-cell">{m.notasHoy}</td>
                <td className={cn("hidden py-3 text-right font-mono text-dato tabular sm:table-cell", m.salud === "error" ? "text-falso" : "text-muted")}>{m.ultimaLectura}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialogo abierto={dialogo} onCambio={setDialogo} titulo="Agregar fuente" descripcion="Se guarda solo en esta sesión. La línea editorial queda «a validar».">
        <form onSubmit={agregar} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-chico">
            Nombre del medio
            <input name="nombre" required className={claseCampo} placeholder="Ej. Vanguardia" />
          </label>
          <label className="flex flex-col gap-1.5 text-chico">
            Tipo
            <select name="tipo" className={claseCampo} defaultValue="RSS">
              <option>RSS</option>
              <option>Google News</option>
              <option>GDELT</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-chico">
            URL del feed o consulta
            <input name="feed" className={cn(claseCampo, "font-mono text-dato")} placeholder="https://… o site:dominio.com when:1d" />
          </label>
          <label className="flex flex-col gap-1.5 text-chico">
            Región
            <input name="region" className={claseCampo} placeholder="Ej. Santander" />
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <Boton variante="fantasma" onClick={() => setDialogo(false)}>
              Cancelar
            </Boton>
            <Boton variante="primario" type="submit">
              Agregar
            </Boton>
          </div>
        </form>
      </Dialogo>
    </div>
  );
}
