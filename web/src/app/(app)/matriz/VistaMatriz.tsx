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
import { PanelPestana, Pestanas } from "@/components/ui/Pestanas";
import { cn } from "@/lib/cn";
import { medioPorId, medios, mediosPorLinea } from "@/mocks/medios";
import { noticias } from "@/mocks/noticias";
import type { Linea, Mirada } from "@/mocks/tipos";

const reglaGrupo: Record<Linea, string> = {
  izquierda: "shadow-[inset_0_2px_0_0_var(--t-izquierda)]",
  centro: "shadow-[inset_0_2px_0_0_var(--t-centro)]",
  derecha: "shadow-[inset_0_2px_0_0_var(--t-derecha)]",
  "a-validar": "shadow-[inset_0_2px_0_0_var(--t-border-strong)]",
};
const subrayado: Record<Exclude<Linea, "a-validar">, string> = {
  izquierda: "decoration-izquierda",
  centro: "decoration-centro",
  derecha: "decoration-derecha",
};

const temas = Array.from(new Set(noticias.map((n) => n.tema)));

export function VistaMatriz() {
  const { abrirNoticia } = useApp();
  const [vista, setVista] = useState("matriz");
  const [tema, setTema] = useState<string | null>(null);
  const [alcance, setAlcance] = useState<"nacional" | "regional" | null>(null);
  const [lineasOn, setLineasOn] = useState<Linea[]>(["izquierda", "centro", "derecha", "a-validar"]);
  const [activa, setActiva] = useState<[number, number]>([0, 0]);

  const filas = noticias.filter((n) => (!tema || n.tema === tema) && (!alcance || n.alcance === alcance));
  const grupos = useMemo(() => mediosPorLinea(medios).filter((g) => lineasOn.includes(g.id) && g.medios.length), [lineasOn]);
  const columnas = grupos.flatMap((g) => g.medios);

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
    document.querySelector<HTMLElement>(`[data-celda="${nr}-${nc}"]`)?.focus();
  };

  const alternarLinea = (l: Linea) => setLineasOn((ls) => (ls.includes(l) ? (ls.length > 1 ? ls.filter((x) => x !== l) : ls) : [...ls, l]));

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4 pb-6">
        <div>
          <h1 className="text-secundario serif-display md:text-hero">Matriz de cobertura</h1>
          <p className="mt-3 max-w-lectura text-cuerpo text-muted">
            Qué medio contó qué, y con qué tono. Las filas son los hechos del día; las columnas, los medios agrupados por línea editorial.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DatosEjemplo className="lg:hidden" />
          <Boton
            variante="secundario"
            onClick={() => toast("Imagen exportada", { description: "Lleva la marca de agua de Trafiker. Se guardó solo en este equipo; nada se envía." })}
          >
            <ImageDown size={16} strokeWidth={1.5} aria-hidden />
            Exportar imagen
          </Boton>
        </div>
      </header>

      <div className="flex flex-col gap-3 pb-6" role="group" aria-label="Filtros">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-16 text-dato text-muted">Tema</span>
          <Chip activo={!tema} onClick={() => setTema(null)}>
            Todos
          </Chip>
          {temas.map((t) => (
            <Chip key={t} activo={tema === t} onClick={() => setTema(tema === t ? null : t)}>
              {t}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-16 text-dato text-muted">Alcance</span>
          <Chip activo={!alcance} onClick={() => setAlcance(null)}>
            Todo
          </Chip>
          <Chip activo={alcance === "nacional"} onClick={() => setAlcance(alcance === "nacional" ? null : "nacional")}>
            Nacional
          </Chip>
          <Chip activo={alcance === "regional"} onClick={() => setAlcance(alcance === "regional" ? null : "regional")}>
            Regional
          </Chip>
          <span className="ml-0 w-16 text-dato text-muted sm:ml-4 sm:w-auto">Línea</span>
          {(["izquierda", "centro", "derecha", "a-validar"] as Linea[]).map((l) => (
            <Chip key={l} activo={lineasOn.includes(l)} onClick={() => alternarLinea(l)}>
              {l === "a-validar" ? "A validar" : l[0].toUpperCase() + l.slice(1)}
            </Chip>
          ))}
        </div>
      </div>

      <Pestanas
        valor={vista}
        onCambio={setVista}
        etiqueta="Vista"
        opciones={[
          { id: "matriz", nombre: "Matriz" },
          { id: "miradas", nombre: "Mismo hecho, tres miradas" },
        ]}
      >
        <PanelPestana value="matriz" className="pt-6 outline-none">
          {filas.length === 0 ? (
            <EstadoVacio titulo="Ningún hecho con esos filtros." texto="Prueba con otro tema o vuelve a incluir lo regional." />
          ) : (
            <>
              <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
                <div
                  role="grid"
                  aria-label="Cobertura por hecho y medio. Usa las flechas para moverte."
                  aria-rowcount={filas.length + 1}
                  onKeyDown={mover}
                  className="grid w-max min-w-full [--col-hecho:148px] md:[--col-hecho:220px]"
                  style={{ gridTemplateColumns: `minmax(var(--col-hecho), 320px) ${grupos.map((g) => `repeat(${g.medios.length}, minmax(44px, 56px))`).join(" 16px ")}` }}
                >
                  {/* Cabecera de grupo */}
                  <div role="row" className="contents">
                    <div role="columnheader" className="sticky left-0 z-10 bg-bg" />
                    {grupos.map((g, gi) => (
                      <Fragment key={g.id}>
                        {gi > 0 && <div aria-hidden />}
                        <div role="columnheader" className={cn("px-1 pb-2 pt-2", reglaGrupo[g.id])} style={{ gridColumn: `span ${g.medios.length}` }}>
                          <CabeceraGrupo linea={g.id} ejemplo={g.medios.some((m) => m.lineaEjemplo)} />
                        </div>
                      </Fragment>
                    ))}
                  </div>
                  {/* Cabecera de medios */}
                  <div role="row" className="contents">
                    <div role="columnheader" className="sticky left-0 z-10 flex items-end bg-bg pb-2 text-dato text-muted shadow-regla">
                      Hecho
                    </div>
                    {grupos.map((g, gi) => (
                      <Fragment key={g.id}>
                        {gi > 0 && <div aria-hidden className="shadow-regla" />}
                        {g.medios.map((m) => (
                          <div key={m.id} role="columnheader" title={m.nombre} className="flex h-24 items-end justify-center pb-2 shadow-regla">
                            <span className="text-dato text-muted [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">{m.nombre}</span>
                          </div>
                        ))}
                      </Fragment>
                    ))}
                  </div>
                  {filas.map((n, r) => (
                    <div role="row" key={n.id} className="contents">
                      <div role="rowheader" className="sticky left-0 z-10 flex items-center bg-bg py-1 pr-4 shadow-regla">
                        <button type="button" onClick={() => abrirNoticia(n.id)} className="line-clamp-3 min-h-11 text-left font-serif text-chico serif-texto hover:text-signal md:line-clamp-2 md:min-h-0 md:text-cuerpo">
                          {n.titular}
                        </button>
                      </div>
                      {grupos.map((g, gi) => (
                        <Fragment key={g.id}>
                          {gi > 0 && <div aria-hidden className="shadow-regla" />}
                          {g.medios.map((m) => {
                            const c = columnas.indexOf(m);
                            return (
                              <div key={m.id} className="shadow-regla">
                                <CeldaMatriz
                                  medio={m}
                                  articulo={n.articulos.find((a) => a.medioId === m.id)}
                                  hechoTitular={n.titular}
                                  activa={activa[0] === r && activa[1] === c}
                                  onFoco={() => setActiva([r, c])}
                                  fila={r}
                                  columna={c}
                                />
                              </div>
                            );
                          })}
                        </Fragment>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-dato text-muted" aria-label="Leyenda">
                {(
                  [
                    ["favor", "A favor"],
                    ["neutral", "Neutral"],
                    ["contra", "En contra"],
                  ] as const
                ).map(([t, txt]) => (
                  <span key={t} className="inline-flex items-center gap-1">
                    <GlifoTono tono={t} linea="centro" intensidad={3} />
                    {txt}
                  </span>
                ))}
                <span className="inline-flex items-center gap-1">
                  <GlifoTono linea="centro" />
                  No cubrió
                </span>
                <span>La intensidad del glifo indica cuánto lo cubrió.</span>
              </div>
            </>
          )}
        </PanelPestana>

        <PanelPestana value="miradas" className="pt-6 outline-none">
          <TresMiradas />
        </PanelPestana>
      </Pestanas>
    </div>
  );
}

const corto: Record<Linea, string> = { izquierda: "Izq.", centro: "Centro", derecha: "Der.", "a-validar": "A validar" };
const textoLinea: Record<Linea, string> = { izquierda: "text-izquierda-texto", centro: "text-centro", derecha: "text-derecha", "a-validar": "text-muted" };

/** Cabecera de grupo compacta: cabe aunque el grupo tenga un solo medio. */
function CabeceraGrupo({ linea, ejemplo }: { linea: Linea; ejemplo: boolean }) {
  return (
    <span className="flex flex-col items-start gap-1 text-dato">
      <MuestraLinea linea={linea} />
      <span className={textoLinea[linea]}>{corto[linea]}</span>
      {ejemplo && <span className="text-muted">ejemplo</span>}
    </span>
  );
}

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
      <p className="mt-6 max-w-lectura font-serif text-lectura serif-texto text-muted">{n.titular}</p>
      <div className="mt-6 grid md:grid-cols-3">
        {lados.map((l, i) => {
          const m = n.tresMiradas![l];
          const medio = medioPorId[m.medioId];
          const art = n.articulos.find((a) => a.medioId === m.medioId);
          return (
            <section key={l} className={cn("py-6 md:px-6", reglaGrupo[l], i > 0 && "md:border-l md:border-border")} aria-label={l}>
              <EtiquetaLinea linea={l} ejemplo={medio.lineaEjemplo} />
              <h2 className="mt-4 text-tarjeta serif-display">
                <Resaltado m={m} linea={l} />
              </h2>
              <div className="mt-4 flex flex-wrap gap-x-4 text-dato">
                <span className="text-muted">
                  Medio <span className="text-text">{medio.nombre}</span>
                </span>
                {art && (
                  <span className="text-muted">
                    Hora <span className="font-mono tabular text-text">{art.hora}</span>
                  </span>
                )}
              </div>
              {art && (
                <a href={art.url} target="_blank" rel="noreferrer" className="mt-2 inline-block break-all font-mono text-dato text-muted underline decoration-border-strong underline-offset-2 hover:text-signal">
                  {art.url.replace("https://", "")}
                </a>
              )}
            </section>
          );
        })}
      </div>
      <p className="mt-6 max-w-lectura text-chico text-muted">
        Subrayadas, las palabras que cambian entre un lado y otro. La línea editorial de estos medios es de ejemplo y está pendiente de validar.
      </p>
    </div>
  );
}
