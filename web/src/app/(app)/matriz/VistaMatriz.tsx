"use client";

import { ImageDown } from "lucide-react";
import { Fragment, useMemo, useState, type KeyboardEvent } from "react";
import { toast } from "sonner";
import { DatosEjemplo, EtiquetaLinea } from "@/components/firma/Basicos";
import { MuestraLinea } from "@/components/firma/BarraDeSesgo";
import { CeldaMatriz, GlifoTono } from "@/components/firma/CeldaMatriz";
import { EstadoVacio } from "@/components/firma/Estados";
import { useApp } from "@/components/shell/Estado";
import { Boton, Chip } from "@/components/ui/Boton";
import { Selector } from "@/components/ui/Campo";
import { ChipFuente } from "@/components/ui/ChipFuente";
import { PanelPestana, Pestanas } from "@/components/ui/Pestanas";
import { cn } from "@/lib/cn";
import { medioPorId, medios, mediosPorLinea, nombreLinea } from "@/mocks/medios";
import { noticias } from "@/mocks/noticias";
import type { Linea, Mirada } from "@/mocks/tipos";

const subrayado: Record<Exclude<Linea, "a-validar">, string> = {
  izquierda: "decoration-izquierda",
  centro: "decoration-centro",
  derecha: "decoration-derecha",
};

const temas = Array.from(new Set(noticias.map((n) => n.tema)));

const tinte: Record<Linea, string> = {
  izquierda: "bg-izquierda-suave",
  centro: "bg-centro-suave",
  derecha: "bg-derecha-suave",
  "a-validar": "bg-surface-2",
};

export function VistaMatriz() {
  const { abrirNoticia } = useApp();
  const [vista, setVista] = useState("matriz");
  const [tema, setTema] = useState<string>("");
  const [alcance, setAlcance] = useState<"nacional" | "regional" | null>(null);
  const [lineasOn, setLineasOn] = useState<Linea[]>(["izquierda", "centro", "derecha", "a-validar"]);
  const [activa, setActiva] = useState<[number, number]>([0, 0]);
  const [encima, setEncima] = useState<[number, number] | null>(null);

  const filas = noticias.filter((n) => (!tema || n.tema === tema) && (!alcance || n.alcance === alcance));
  const grupos = useMemo(() => mediosPorLinea(medios).filter((g) => lineasOn.includes(g.id) && g.medios.length), [lineasOn]);
  const columnas = grupos.flatMap((g) => g.medios);
  const inicioGrupo = new Set(grupos.slice(1).map((g) => g.medios[0].id));

  const mover = (e: KeyboardEvent<HTMLDivElement>) => {
    const [r, c] = activa;
    let nr = r,
      nc = c;
    if (e.key === "ArrowRight") nc = Math.min(columnas.length - 1, c + 1);
    else if (e.key === "ArrowLeft") nc = Math.max(0, c - 1);
    else if (e.key === "ArrowDown") nr = Math.min(filas.length - 1, r + 1);
    else if (e.key === "ArrowUp") nr = Math.max(0, r - 1);
    else if (e.key === "Home") nc = 0;
    else if (e.key === "End") nc = columnas.length - 1;
    else return;
    e.preventDefault();
    setActiva([nr, nc]);
    setEncima([nr, nc]);
    document.querySelector<HTMLElement>(`[data-celda="${nr}-${nc}"]`)?.focus();
  };

  const alternarLinea = (l: Linea) => setLineasOn((ls) => (ls.includes(l) ? (ls.length > 1 ? ls.filter((x) => x !== l) : ls) : [...ls, l]));
  const filaOn = (r: number) => encima?.[0] === r;
  const colOn = (c: number) => encima?.[1] === c;

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4 pb-6">
        <div>
          <h1 className="text-hero">Matriz de cobertura</h1>
          <p className="mt-2 max-w-lectura text-cuerpo text-muted">
            Qué medio contó qué, y con qué tono. Las filas son los hechos del día; las columnas, los medios agrupados por línea editorial.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DatosEjemplo className="lg:hidden" />
          <Boton
            variante="secundario"
            onClick={() => toast.success("Imagen exportada", { description: "Lleva la marca de agua de Trafiker. Se guardó solo en este equipo; nada se envía." })}
          >
            <ImageDown size={16} strokeWidth={1.75} aria-hidden />
            Exportar imagen
          </Boton>
        </div>
      </header>

      <Pestanas
        valor={vista}
        onCambio={setVista}
        etiqueta="Vista"
        variante="segmentado"
        opciones={[
          { id: "matriz", nombre: "Matriz" },
          { id: "miradas", nombre: "Mismo hecho, tres miradas" },
        ]}
      >
        <PanelPestana value="matriz" className="pt-5 outline-none">
          <div className="flex flex-col gap-3 pb-4 lg:flex-row lg:flex-wrap lg:items-center" role="group" aria-label="Filtros">
            <label className="flex items-center gap-2 lg:w-56">
              <span className="sr-only">Tema</span>
              <Selector value={tema} onChange={(e) => setTema(e.target.value)} compacto>
                <option value="">Todos los temas</option>
                {temas.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Selector>
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <Chip activo={!alcance} onClick={() => setAlcance(null)}>
                Todo
              </Chip>
              <Chip activo={alcance === "nacional"} onClick={() => setAlcance(alcance === "nacional" ? null : "nacional")}>
                Nacional
              </Chip>
              <Chip activo={alcance === "regional"} onClick={() => setAlcance(alcance === "regional" ? null : "regional")}>
                Regional
              </Chip>
            </div>
            <span className="hidden h-5 w-px bg-border lg:block" aria-hidden />
            <div className="flex flex-wrap items-center gap-2" aria-label="Líneas editoriales visibles">
              {(["izquierda", "centro", "derecha", "a-validar"] as Linea[]).map((l) => (
                <Chip key={l} activo={lineasOn.includes(l)} onClick={() => alternarLinea(l)}>
                  <MuestraLinea linea={l} />
                  {corto[l]}
                </Chip>
              ))}
            </div>
          </div>

          {filas.length === 0 ? (
            <EstadoVacio titulo="Ningún hecho con esos filtros." texto="Prueba con otro tema o vuelve a incluir lo regional." accion={<Boton onClick={() => { setTema(""); setAlcance(null); }}>Quitar filtros</Boton>} />
          ) : (
            <>
              <div className="max-h-[calc(100dvh-220px)] min-h-80 overflow-auto rounded-panel border border-border bg-surface shadow-e1" onPointerLeave={() => setEncima(null)}>
                <div
                  role="grid"
                  aria-label="Cobertura por hecho y medio. Usa las flechas para moverte."
                  aria-rowcount={filas.length + 2}
                  onKeyDown={mover}
                  className="grid w-full [--col-hecho:180px] md:[--col-hecho:260px]"
                  style={{
                    gridTemplateColumns: `minmax(var(--col-hecho), 1fr) repeat(${columnas.length}, 72px)`,
                    minWidth: `calc(var(--col-hecho) + ${columnas.length * 72}px)`,
                  }}
                >
                  {/* Fila 1: grupos por línea editorial (fija arriba) */}
                  <div role="row" className="contents">
                    <div role="columnheader" className="sticky left-0 top-0 z-30 row-span-2 flex items-end border-b border-r border-border bg-surface-2 px-4 pb-3 text-dato font-medium text-muted">
                      Hecho
                    </div>
                    {grupos.map((g) => (
                      <div
                        key={g.id}
                        role="columnheader"
                        className={cn("sticky top-0 z-20 flex h-12 flex-col justify-center border-b border-border px-2.5 text-dato font-medium", tinte[g.id], inicioGrupo.has(g.medios[0].id) && "border-l")}
                        style={{ gridColumn: `span ${g.medios.length}` }}
                        title={`${nombreLinea[g.id]}${g.medios.some((m) => m.lineaEjemplo) ? " (línea de ejemplo, por validar)" : ""}`}
                      >
                        <span className="inline-flex items-center gap-1.5">
                          <MuestraLinea linea={g.id} />
                          <span className={textoLinea[g.id]}>{g.medios.length > 1 ? nombreLinea[g.id] : corto[g.id]}</span>
                        </span>
                        {g.medios.some((m) => m.lineaEjemplo) && <span className="font-normal leading-tight text-muted">ejemplo</span>}
                      </div>
                    ))}
                  </div>
                  {/* Fila 2: medios (fija debajo de los grupos) */}
                  <div role="row" className="contents">
                    {columnas.map((m, c) => (
                      <div
                        key={m.id}
                        role="columnheader"
                        title={m.nombre}
                        className={cn(
                          "sticky top-12 z-20 flex h-14 items-center justify-center border-b border-border px-0.5 text-center text-dato font-medium leading-tight transition-colors duration-150",
                          colOn(c) ? "bg-surface-2 text-text" : "bg-surface text-muted",
                          inicioGrupo.has(m.id) && "border-l",
                        )}
                      >
                        <span className="line-clamp-3 hyphens-auto">{m.nombre}</span>
                      </div>
                    ))}
                  </div>
                  {filas.map((n, r) => {
                    const cubren = new Set(n.articulos.map((a) => a.medioId)).size;
                    return (
                      <div role="row" key={n.id} className="contents">
                        <div
                          role="rowheader"
                          onPointerEnter={() => setEncima([r, -1])}
                          className={cn(
                            "sticky left-0 z-10 flex flex-col justify-center border-b border-r border-border px-4 py-2.5 transition-colors duration-150",
                            filaOn(r) ? "bg-surface-2" : "bg-surface",
                          )}
                        >
                          <button type="button" onClick={() => abrirNoticia(n.id)} className="line-clamp-2 text-left text-chico font-medium hover:text-signal">
                            {n.titular}
                          </button>
                          <span className="mt-0.5 text-dato text-muted">
                            {n.tema} · <span className="tabular">{cubren}</span> medios
                          </span>
                        </div>
                        {columnas.map((m, c) => (
                          <div
                            key={m.id}
                            onPointerEnter={() => setEncima([r, c])}
                            className={cn(
                              "flex items-center justify-center border-b border-border transition-colors duration-150",
                              filaOn(r) || colOn(c) ? "bg-surface-2" : "",
                              filaOn(r) && colOn(c) && "bg-signal-suave",
                              inicioGrupo.has(m.id) && "border-l",
                            )}
                          >
                            <CeldaMatriz
                              medio={m}
                              articulo={n.articulos.find((a) => a.medioId === m.id)}
                              hechoTitular={n.titular}
                              activa={activa[0] === r && activa[1] === c}
                              onFoco={() => {
                                setActiva([r, c]);
                                setEncima([r, c]);
                              }}
                              fila={r}
                              columna={c}
                            />
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-dato text-muted" aria-label="Leyenda">
                {(
                  [
                    ["favor", "A favor"],
                    ["neutral", "Neutral"],
                    ["contra", "En contra"],
                  ] as const
                ).map(([t, txt]) => (
                  <span key={t} className="inline-flex items-center gap-1">
                    <GlifoTono tono={t} linea="a-validar" intensidad={3} />
                    {txt}
                  </span>
                ))}
                <span className="inline-flex items-center gap-1">
                  <GlifoTono linea="centro" />
                  No cubrió
                </span>
                <span>El color es la línea del medio; el tamaño, cuánto lo cubrió.</span>
              </div>
            </>
          )}
        </PanelPestana>

        <PanelPestana value="miradas" className="pt-5 outline-none">
          <TresMiradas />
        </PanelPestana>
      </Pestanas>
    </div>
  );
}

const corto: Record<Linea, string> = { izquierda: "Izq.", centro: "Centro", derecha: "Der.", "a-validar": "A validar" };
const textoLinea: Record<Linea, string> = { izquierda: "text-izquierda-texto", centro: "text-centro", derecha: "text-derecha", "a-validar": "text-muted" };

function Resaltado({ m, linea }: { m: Mirada; linea: Exclude<Linea, "a-validar"> }) {
  const partes = m.titular.split(new RegExp(`(${m.resaltar.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi"));
  return (
    <>
      {partes.map((p, i) =>
        m.resaltar.some((w) => w.toLowerCase() === p.toLowerCase()) ? (
          <span key={i} className={cn("underline decoration-2 underline-offset-[6px]", subrayado[linea])}>
            {p}
          </span>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

function TresMiradas() {
  const conMiradas = noticias.filter((n) => n.tresMiradas);
  const [id, setId] = useState(conMiradas[0].id);
  const n = conMiradas.find((x) => x.id === id)!;
  const lados = ["izquierda", "centro", "derecha"] as const;
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Hecho">
        {conMiradas.map((x) => (
          <Chip key={x.id} activo={x.id === id} onClick={() => setId(x.id)}>
            {x.tema}
          </Chip>
        ))}
      </div>
      <p className="mt-5 max-w-lectura text-lectura font-medium">{n.titular}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {lados.map((l) => {
          const m = n.tresMiradas![l];
          const medio = medioPorId[m.medioId];
          const art = n.articulos.find((a) => a.medioId === m.medioId);
          return (
            <section key={l} className="overflow-hidden rounded-panel border border-border bg-surface shadow-e1" aria-label={nombreLinea[l]}>
              <div className={cn("flex items-center justify-between px-4 py-2.5", tinte[l])}>
                <EtiquetaLinea linea={l} ejemplo={medio.lineaEjemplo} />
              </div>
              <div className="p-4">
                <h2 className="text-tarjeta">
                  <Resaltado m={m} linea={l} />
                </h2>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-dato text-muted">
                  <ChipFuente medioId={medio.id} href={art?.url} />
                  {art && <span className="tabular">{art.hora}</span>}
                </div>
              </div>
            </section>
          );
        })}
      </div>
      <p className="mt-4 max-w-lectura text-chico text-muted">
        Subrayadas, las palabras que cambian entre un lado y otro. La línea editorial de estos medios es de ejemplo y está pendiente de validar.
      </p>
    </div>
  );
}
