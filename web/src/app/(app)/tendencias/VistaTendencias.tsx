"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Lock } from "lucide-react";
import { curveMonotoneX, line } from "d3-shape";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { DatosEjemplo, DeltaTendencia } from "@/components/firma/Basicos";
import { Contador } from "@/components/firma/Contador";
import { Sparkline } from "@/components/firma/Sparkline";
import { Chip } from "@/components/ui/Boton";
import { PanelPestana, Pestanas } from "@/components/ui/Pestanas";
import { Tarjeta } from "@/components/ui/Tarjeta";
import { cn } from "@/lib/cn";
import { dias7, enAscenso, horas24, temas } from "@/mocks/tendencias";

type Periodo = "h24" | "d7";
const curva = [0.4, 0, 0.2, 1] as const;

/** Ancho real del contenedor, para dibujar el SVG sin deformar el texto. */
function useAncho<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [ancho, setAncho] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setAncho(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, ancho] as const;
}

/** Marcas «redondas» para el eje Y: 0 y tres pasos de 1, 2, 5, 10… */
function marcasY(max: number) {
  const paso = [1, 2, 5, 10, 15, 20, 25, 50, 100].find((p) => p * 3 >= max) ?? Math.ceil(max / 3);
  return [0, paso, paso * 2, paso * 3];
}

/**
 * Líneas por tema. Un tema va resaltado en color de marca y con su nombre al
 * final de la línea; los demás quedan en gris como contexto. La cruz de
 * lectura sigue al puntero (o al teclado) y el tooltip da la cifra exacta.
 */
function GraficoLineas({ periodo, elegido }: { periodo: Periodo; elegido: string }) {
  const [ref, ancho] = useAncho<HTMLDivElement>();
  const reducir = useReducedMotion();
  const [i, setI] = useState<number | null>(null);
  const etiquetas = periodo === "h24" ? horas24 : dias7;
  const n = etiquetas.length;
  const alto = 280;
  const estrecho = ancho < 520;
  const m = { arriba: 12, derecha: estrecho ? 84 : 112, abajo: 28, izquierda: 32 };
  const w = Math.max(ancho - m.izquierda - m.derecha, 10);
  const h = alto - m.arriba - m.abajo;
  const max = Math.max(...temas.flatMap((t) => t[periodo]));
  const ticks = marcasY(max);
  const tope = ticks[ticks.length - 1];
  const x = (k: number) => m.izquierda + (k / (n - 1)) * w;
  const y = (v: number) => m.arriba + h - (v / tope) * h;
  const gen = line<number>().x((_, k) => x(k)).y(y).curve(curveMonotoneX);
  const orden = [...temas].sort((a, b) => (a.tema === elegido ? 1 : b.tema === elegido ? -1 : 0));
  const sel = temas.find((t) => t.tema === elegido)!;

  const mover = (e: PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const k = Math.round(((e.clientX - r.left - m.izquierda) / w) * (n - 1));
    setI(Math.min(n - 1, Math.max(0, k)));
  };
  const valores = i === null ? [] : [...temas].map((t) => ({ tema: t.tema, v: t[periodo][i] })).sort((a, b) => b.v - a.v);

  return (
    <div ref={ref} className="relative">
      {ancho > 0 && (
        <svg
          width={ancho}
          height={alto}
          role="img"
          aria-label={`Notas por ${periodo === "h24" ? "hora en las últimas 24 horas" : "día en los últimos 7 días"}. Resaltado: ${elegido}. La tabla de datos está debajo para lectores de pantalla.`}
          tabIndex={0}
          onPointerMove={mover}
          onPointerLeave={() => setI(null)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") setI((v) => Math.min(n - 1, (v ?? -1) + 1));
            else if (e.key === "ArrowLeft") setI((v) => Math.max(0, (v ?? n) - 1));
            else if (e.key === "Escape") setI(null);
            else return;
            e.preventDefault();
          }}
          onBlur={() => setI(null)}
          className="touch-pan-y rounded-control outline-offset-4"
        >
          {/* Rejilla y eje Y, recesivos */}
          {ticks.map((t) => (
            <g key={t}>
              <line x1={m.izquierda} x2={m.izquierda + w} y1={y(t)} y2={y(t)} className="stroke-border" strokeDasharray={t === 0 ? undefined : "2 4"} />
              <text x={m.izquierda - 8} y={y(t)} dy="0.32em" textAnchor="end" className="fill-muted tabular" style={{ fontSize: 12 }}>
                {t}
              </text>
            </g>
          ))}
          {etiquetas.map((e, k) =>
            (periodo === "d7" && (!estrecho || k % 2 === 0)) || (periodo === "h24" && k % (estrecho ? 8 : 4) === 0) ? (
              <text key={e} x={x(k)} y={alto - 8} textAnchor="middle" className="fill-muted tabular" style={{ fontSize: 12 }}>
                {e}
              </text>
            ) : null,
          )}

          {/* Líneas: contexto gris y el tema elegido en marca, al frente */}
          {orden.map((t) => {
            const on = t.tema === elegido;
            return (
              <motion.path
                key={`${periodo}-${t.tema}-${on}`}
                d={gen(t[periodo]) ?? ""}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={on ? 2.5 : 1.5}
                className={on ? "stroke-signal" : "stroke-border-strong"}
                initial={reducir ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: on ? 0.9 : 0.6, ease: curva }}
              />
            );
          })}
          {/* Rótulo directo del tema elegido */}
          <motion.text
            key={`${periodo}-${elegido}-rotulo`}
            x={x(n - 1) + 8}
            y={y(sel[periodo][n - 1])}
            dy="0.32em"
            className="fill-text font-semibold"
            style={{ fontSize: 12 }}
            initial={reducir ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reducir ? 0 : 0.7, duration: 0.2 }}
          >
            {elegido}
          </motion.text>

          {/* Cruz de lectura */}
          {i !== null && (
            <g pointerEvents="none">
              <line x1={x(i)} x2={x(i)} y1={m.arriba} y2={m.arriba + h} className="stroke-muted" strokeWidth="1" />
              <circle cx={x(i)} cy={y(sel[periodo][i])} r="5" className="fill-signal stroke-surface" strokeWidth="2" />
            </g>
          )}
        </svg>
      )}

      {/* Tooltip con las cifras exactas de ese momento */}
      {i !== null && (
        <div
          role="status"
          className="pointer-events-none absolute top-2 z-10 w-52 rounded-control border border-border bg-surface p-3 shadow-e3"
          style={{ left: Math.min(Math.max(x(i) > ancho * 0.55 ? x(i) - 220 : x(i) + 12, 0), Math.max(ancho - 208, 0)) }}
        >
          <p className="text-dato font-semibold tabular">{periodo === "h24" ? `${etiquetas[i]} h` : etiquetas[i]}</p>
          <ul className="mt-1.5 flex flex-col gap-0.5">
            {valores.slice(0, 5).map((v) => (
              <li key={v.tema} className={cn("flex items-center justify-between gap-3 text-dato", v.tema === elegido ? "font-semibold text-text" : "text-muted")}>
                <span className="inline-flex items-center gap-1.5 truncate">
                  <span className={cn("h-0.5 w-3 shrink-0 rounded-pildora", v.tema === elegido ? "bg-signal" : "bg-border-strong")} aria-hidden />
                  {v.tema}
                </span>
                <span className="tabular">{v.v} notas</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Los mismos datos, en tabla, para lectores de pantalla */}
      <table className="sr-only">
        <caption>Notas por tema y {periodo === "h24" ? "hora" : "día"}</caption>
        <thead>
          <tr>
            <th scope="col">Tema</th>
            {etiquetas.map((e) => (
              <th key={e} scope="col">
                {e}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {temas.map((t) => (
            <tr key={t.tema}>
              <th scope="row">{t.tema}</th>
              {t[periodo].map((v, k) => (
                <td key={k}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Barra horizontal que crece desde 0 al entrar en pantalla. */
function Barra({ valor, max, acento = false, className }: { valor: number; max: number; acento?: boolean; className?: string }) {
  const reducir = useReducedMotion();
  return (
    <span className={cn("block h-2 overflow-hidden rounded-pildora bg-surface-2", className)} aria-hidden>
      <motion.span
        className={cn("block h-full rounded-pildora", acento ? "bg-signal" : "bg-border-strong")}
        initial={reducir ? false : { width: 0 }}
        whileInView={{ width: `${(valor / max) * 100}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: curva }}
        style={reducir ? { width: `${(valor / max) * 100}%` } : undefined}
      />
    </span>
  );
}

/** Barra divergente: sube hacia la derecha en marca, baja hacia la izquierda en gris. */
function BarraDelta({ delta, max }: { delta: number; max: number }) {
  const reducir = useReducedMotion();
  const pct = (Math.abs(delta) / max) * 50;
  return (
    <span className="relative block h-2 w-full rounded-pildora bg-surface-2" aria-hidden>
      <span className="absolute inset-y-[-3px] left-1/2 w-px bg-border-strong" />
      <motion.span
        className={cn("absolute inset-y-0 rounded-pildora", delta >= 0 ? "left-1/2 bg-signal" : "right-1/2 bg-muted")}
        initial={reducir ? false : { width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: curva }}
        style={reducir ? { width: `${pct}%` } : undefined}
      />
    </span>
  );
}

export function VistaTendencias() {
  const [periodo, setPeriodo] = useState<Periodo>("h24");
  const [senal, setSenal] = useState("medios");
  const ranking = [...temas].sort((a, b) => b.delta - a.delta);
  const [elegido, setElegido] = useState(ranking[0].tema);
  const maxDelta = Math.max(...temas.map((t) => Math.abs(t.delta)));
  const total = (t: (typeof temas)[number]) => t[periodo].reduce((s, v) => s + v, 0);

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4 pb-6">
        <div>
          <h1 className="text-hero">Tendencias</h1>
          <p className="mt-2 max-w-lectura text-cuerpo text-muted">Qué temas ganan espacio y cuáles se apagan, medidos por el número de notas publicadas.</p>
        </div>
        <DatosEjemplo className="lg:hidden" />
      </header>

      <Pestanas
        valor={senal}
        onCambio={setSenal}
        etiqueta="Señal"
        opciones={[
          { id: "medios", nombre: "Medios" },
          { id: "trends", nombre: "Google Trends" },
          {
            id: "redes",
            deshabilitada: true,
            nombre: (
              <>
                <Lock size={14} strokeWidth={1.75} aria-hidden /> Redes <span className="text-dato font-normal">Próximamente X</span>
              </>
            ),
          },
        ]}
      >
        <PanelPestana value="medios" className="pt-6 outline-none">
          <Tarjeta className="md:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-tarjeta">Notas por {periodo === "h24" ? "hora" : "día"}</h2>
                <p className="text-dato text-muted">
                  Resaltado: <span className="font-medium text-text">{elegido}</span>. Elige otro tema en la lista de abajo; pasa el cursor o usa las flechas para ver cifras.
                </p>
              </div>
              <div className="flex gap-2" role="group" aria-label="Periodo">
                <Chip activo={periodo === "h24"} onClick={() => setPeriodo("h24")}>
                  24 horas
                </Chip>
                <Chip activo={periodo === "d7"} onClick={() => setPeriodo("d7")}>
                  7 días
                </Chip>
              </div>
            </div>
            <div className="mt-5">
              <GraficoLineas periodo={periodo} elegido={elegido} />
            </div>
          </Tarjeta>

          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            <Tarjeta relleno={false} className="lg:col-span-7">
              <div className="border-b border-border px-5 py-4">
                <h2 id="ranking" className="text-tarjeta">
                  Temas que suben y bajan
                </h2>
                <p className="text-dato text-muted">Cambio frente al periodo anterior. Toca un tema para resaltarlo arriba.</p>
              </div>
              <ol aria-labelledby="ranking">
                {ranking.map((t, k) => {
                  const on = t.tema === elegido;
                  return (
                    <li key={t.tema}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => setElegido(t.tema)}
                        className={cn(
                          "grid min-h-12 w-full grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-x-3 border-b border-border px-5 py-2.5 text-left transition-colors last:border-b-0 sm:grid-cols-[1.5rem_minmax(0,9rem)_96px_minmax(0,1fr)_4.5rem]",
                          on ? "bg-signal-suave" : "hover:bg-surface-2",
                        )}
                      >
                        <span className="text-dato font-semibold text-muted tabular">{k + 1}</span>
                        <span className={cn("truncate text-chico font-medium", on && "text-signal")}>{t.tema}</span>
                        <Sparkline datos={t[periodo]} acento={on} etiqueta={`${t.tema}: ${total(t)} notas`} className="hidden sm:block" />
                        <span className="hidden sm:block">
                          <BarraDelta delta={t.delta} max={maxDelta} />
                        </span>
                        <span className="text-right">
                          <DeltaTendencia tendencia={t.tendencia} delta={t.delta} />
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </Tarjeta>

            <div className="flex flex-col gap-6 lg:col-span-5">
              {(
                [
                  ["actores", "Actores en ascenso", enAscenso.actores],
                  ["terminos", "Términos en ascenso", enAscenso.terminos],
                ] as const
              ).map(([id, titulo, lista]) => {
                const max = Math.max(...lista.map((a) => a.menciones));
                return (
                  <Tarjeta key={id} relleno={false}>
                    <div className="flex items-end justify-between border-b border-border px-5 py-4">
                      <h2 id={id} className="text-tarjeta">
                        {titulo}
                      </h2>
                      <span className="text-dato text-muted">notas · cambio</span>
                    </div>
                    <ul aria-labelledby={id}>
                      {lista.map((a, k) => (
                        <li key={a.nombre} className="border-b border-border px-5 py-3 last:border-b-0">
                          <div className="flex items-baseline justify-between gap-4">
                            <span className="truncate text-chico font-medium">{id === "terminos" ? `«${a.nombre}»` : a.nombre}</span>
                            <span className="flex shrink-0 items-baseline gap-3 text-dato">
                              <Contador valor={a.menciones} className="font-medium text-text" />
                              <span className="w-12 text-right font-medium text-signal">
                                +<Contador valor={a.delta} /> %
                              </span>
                            </span>
                          </div>
                          <Barra valor={a.menciones} max={max} acento={k === 0} className="mt-2" />
                        </li>
                      ))}
                    </ul>
                  </Tarjeta>
                );
              })}
            </div>
          </div>
        </PanelPestana>

        <PanelPestana value="trends" className="pt-6 outline-none">
          <Tarjeta className="max-w-2xl md:p-6">
            <h2 className="text-tarjeta">Google Trends, en preparación.</h2>
            <p className="mt-2 text-cuerpo text-muted">
              Aquí verás el interés de búsqueda por tema en Colombia, comparado con el volumen en medios. En el piloto todavía no se consulta.
            </p>
          </Tarjeta>
        </PanelPestana>
      </Pestanas>
    </div>
  );
}
