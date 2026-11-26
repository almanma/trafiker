"use client";

import { Plus } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { DatosEjemplo } from "@/components/firma/Basicos";
import { MuestraLinea } from "@/components/firma/BarraDeSesgo";
import { Boton } from "@/components/ui/Boton";
import { Campo, Entrada, Selector } from "@/components/ui/Campo";
import { Insignia } from "@/components/ui/Insignia";
import { Fila, Tabla, Td, Th } from "@/components/ui/Tabla";
import { Contador } from "@/components/firma/Contador";
import { Dialogo } from "@/components/ui/Dialogo";
import { cn } from "@/lib/cn";
import { lineas, medios as iniciales } from "@/mocks/medios";
import type { Linea, Medio } from "@/mocks/tipos";

function Salud({ m }: { m: Medio }) {
  const ok = m.salud === "ok";
  return (
    <Insignia tono={ok ? "verificado" : "falso"}>
      <span className="relative inline-flex h-1.5 w-1.5" aria-hidden>
        {ok && <span className="absolute inset-0 animate-pulso rounded-punto bg-verificado" />}
        <span className={cn("relative h-1.5 w-1.5 rounded-punto", ok ? "bg-verificado" : "bg-falso")} />
      </span>
      {ok ? "Responde" : "Error"}
    </Insignia>
  );
}

export function VistaFuentes() {
  const [lista, setLista] = useState<Medio[]>(iniciales);
  const [dialogo, setDialogo] = useState(false);

  const cambiarLinea = (id: string, linea: Linea) => {
    setLista((l) => l.map((m) => (m.id === id ? { ...m, linea, lineaEjemplo: false } : m)));
    toast.success("Línea editorial actualizada", { description: "Solo en esta sesión." });
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
    toast.success("Fuente agregada", { description: `${nombre} se leerá en la próxima corrida. Línea: a validar.` });
  };

  const sanas = lista.filter((m) => m.salud === "ok").length;

  const notas = lista.reduce((t, m) => t + m.notasHoy, 0);

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4 pb-6">
        <div>
          <h1 className="text-hero">Fuentes</h1>
          <p className="mt-2 max-w-lectura text-cuerpo text-muted">
            Medios que lee el radar cada madrugada. La línea editorial la defines tú: mientras no la valides, queda como «a validar».
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DatosEjemplo className="lg:hidden" />
          <Boton variante="primario" onClick={() => setDialogo(true)}>
            <Plus size={16} strokeWidth={2} aria-hidden />
            Agregar fuente
          </Boton>
        </div>
      </header>

      <div className="mb-5 grid grid-cols-3 gap-3">
        {[
          ["Responden", <><Contador valor={sanas} /> <span className="text-chico font-medium text-muted">de {lista.length}</span></>],
          ["Notas leídas hoy", <Contador key="n" valor={notas} />],
          ["Última corrida", <span key="h" className="tabular">04:49</span>],
        ].map(([etiqueta, valor]) => (
          <div key={String(etiqueta)} className="rounded-panel border border-border bg-surface px-4 py-3 shadow-e1">
            <p className="text-dato font-medium text-muted">{etiqueta}</p>
            <p className="mt-0.5 text-secundario font-semibold">{valor}</p>
          </div>
        ))}
      </div>

      <Tabla>
        <caption className="sr-only">Fuentes del radar con su tipo, región, línea editorial y estado</caption>
        <thead>
          <tr>
            <Th>Medio</Th>
            <Th className="hidden md:table-cell">Tipo</Th>
            <Th className="hidden lg:table-cell">Región</Th>
            <Th>Línea editorial</Th>
            <Th className="hidden sm:table-cell">Salud</Th>
            <Th numerica className="hidden md:table-cell">
              Notas hoy
            </Th>
            <Th numerica className="hidden sm:table-cell">
              Última lectura
            </Th>
          </tr>
        </thead>
        <tbody>
          {lista.map((m) => (
            <Fila key={m.id}>
              <Td>
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-control border border-border bg-surface-2 text-dato font-semibold text-muted" aria-hidden>
                    {m.inicial}
                  </span>
                  <div className="min-w-0">
                    <p className="text-chico font-medium">{m.nombre}</p>
                    <p className="max-w-[16rem] truncate font-mono text-dato text-muted" title={m.feed}>
                      {m.feed.replace(/^https?:\/\//, "")}
                    </p>
                    <span className="mt-1 inline-block sm:hidden">
                      <Salud m={m} />
                    </span>
                  </div>
                </div>
              </Td>
              <Td className="hidden text-muted md:table-cell">{m.tipo}</Td>
              <Td className="hidden text-muted lg:table-cell">{m.region}</Td>
              <Td>
                <div className="flex items-center gap-2">
                  <MuestraLinea linea={m.linea} />
                  <label className="w-32">
                    <span className="sr-only">Línea editorial de {m.nombre}</span>
                    <Selector value={m.linea} onChange={(e) => cambiarLinea(m.id, e.target.value as Linea)} compacto>
                      {lineas.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.nombre}
                        </option>
                      ))}
                    </Selector>
                  </label>
                  {m.lineaEjemplo && <Insignia tono="enganoso">ejemplo</Insignia>}
                </div>
              </Td>
              <Td className="hidden sm:table-cell">
                <Salud m={m} />
              </Td>
              <Td numerica className="hidden font-medium md:table-cell">
                {m.notasHoy}
              </Td>
              <Td numerica className={cn("hidden sm:table-cell", m.salud === "error" ? "font-medium text-falso" : "text-muted")}>
                {m.ultimaLectura}
              </Td>
            </Fila>
          ))}
        </tbody>
      </Tabla>

      <Dialogo abierto={dialogo} onCambio={setDialogo} titulo="Agregar fuente" descripcion="Se guarda solo en esta sesión. La línea editorial queda «a validar».">
        <form onSubmit={agregar} className="flex flex-col gap-4">
          <Campo etiqueta="Nombre del medio">{(a) => <Entrada name="nombre" required placeholder="Ej. Vanguardia" {...a} />}</Campo>
          <Campo etiqueta="Tipo">
            {(a) => (
              <Selector name="tipo" defaultValue="RSS" {...a}>
                <option>RSS</option>
                <option>Google News</option>
                <option>GDELT</option>
              </Selector>
            )}
          </Campo>
          <Campo etiqueta="URL del feed o consulta" ayuda="Un feed RSS o una consulta de Google News, como site:dominio.com when:1d.">
            {(a) => <Entrada name="feed" className="font-mono text-chico" placeholder="https://… o site:dominio.com when:1d" {...a} />}
          </Campo>
          <Campo etiqueta="Región">{(a) => <Entrada name="region" placeholder="Ej. Santander" {...a} />}</Campo>
          <div className="flex justify-end gap-2 pt-2">
            <Boton variante="fantasma" onClick={() => setDialogo(false)}>
              Cancelar
            </Boton>
            <Boton variante="primario" type="submit">
              Agregar fuente
            </Boton>
          </div>
        </form>
      </Dialogo>
    </div>
  );
}
