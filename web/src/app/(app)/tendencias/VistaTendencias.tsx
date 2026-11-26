"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { Lock } from "lucide-react";
import { stack, stackOffsetWiggle, stackOrderInsideOut, area, curveBasis } from "d3-shape";
import { useEffect, useRef, useState } from "react";
import { DatosEjemplo, DeltaTendencia } from "@/components/firma/Basicos";
import { Sparkline } from "@/components/firma/Sparkline";
import { Chip } from "@/components/ui/Boton";
import { PanelPestana, Pestanas } from "@/components/ui/Pestanas";
import { cn } from "@/lib/cn";
import { dias7, enAscenso, horas24, temas } from "@/mocks/tendencias";

/* Tonos del streamgraph: una sola familia (tinta), el tema que más sube en ámbar. */
const opacidades = [0.9, 0.75, 0.62, 0.5, 0.4, 0.32, 0.25, 0.2];

function Streamgraph({ periodo }: { periodo: "h24" | "d7" }) {
  const ancho = 960;
  const alto = 280;
  const etiquetas = periodo === "h24" ? horas24 : dias7;
  const n = etiquetas.length;
  const filas = Array.from({ length: n }, (_, i) => Object.fromEntries(temas.map((t) => [t.tema, t[periodo][i]])));
  const series = stack<Record<string, number>>().keys(temas.map((t) => t.tema)).offset(stackOffsetWiggle).order(stackOrderInsideOut)(filas);
  const min = Math.min(...series.flatMap((s) => s.map((d) => d[0])));
  const max = Math.max(...series.flatMap((s) => s.map((d) => d[1])));
  const x = (i: number) => (i / (n - 1)) * ancho;
  const y = (v: number) => alto - 24 - ((v - min) / (max - min || 1)) * (alto - 40);
  const gen = area<[number, number]>().x((_, i) => x(i)).y0((d) => y(d[0])).y1((d) => y(d[1])).curve(curveBasis);
  const masSube = [...temas].sort((a, b) => b.delta - a.delta)[0].tema;
  const orden = temas.map((t) => t.tema);

  return (
    <figure>
      <svg viewBox={`0 0 ${ancho} ${alto}`} className="h-auto w-full" role="img" aria-label={`Volumen de notas por tema, ${periodo === "h24" ? "últimas 24 horas" : "últimos 7 días"}. Sube más: ${masSube}.`}>
        {series.map((s) => {
          const i = orden.indexOf(s.key);
          const acento = s.key === masSube;
          return (
            <path
              key={s.key}
              d={gen(s.map((d) => [d[0], d[1]] as [number, number])) ?? ""}

              opacity={acento ? 0.85 : opacidades[i] * 0.35}
              className={cn(acento ? "fill-signal" : "fill-text", "stroke-bg")}
              strokeWidth="0.75"
            >
              <title>{s.key}</title>
            </path>
          );
        })}
        {etiquetas.map((e, i) =>
          periodo === "d7" || i % 4 === 0 ? (
            <text key={e} x={Math.min(Math.max(x(i), 16), ancho - 16)} y={alto - 4} textAnchor="middle" className="fill-muted font-mono" style={{ fontSize: 12 }}>
              {e}
            </text>
          ) : null,
        )}
      </svg>
      <figcaption className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-dato text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-3 rounded-editorial bg-signal" aria-hidden />
          {masSube}, el que más sube
        </span>
        <span>Los demás temas, en tinta. Pasa el cursor por una franja para ver su nombre.</span>
      </figcaption>
    </figure>
  );
}

function Contador({ valor }: { valor: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visto = useInView(ref, { once: true });
  const reducir = useReducedMotion();
  const [v, setV] = useState(reducir ? valor : 0);
  useEffect(() => {
    if (!visto || reducir) return;
    const c = animate(0, valor, { duration: 0.6, ease: [0.4, 0, 0.2, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [visto, valor, reducir]);
  return (
    <span ref={ref} className="font-mono tabular">
      {reducir ? valor : v}
    </span>
  );
}

export function VistaTendencias() {
  const [periodo, setPeriodo] = useState<"h24" | "d7">("h24");
  const [senal, setSenal] = useState("medios");
  const ranking = [...temas].sort((a, b) => b.delta - a.delta);

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4 pb-6">
        <div>
          <h1 className="text-secundario titular md:text-hero">Tendencias</h1>
          <p className="mt-3 max-w-lectura text-cuerpo text-muted">Qué temas ganan espacio y cuáles se apagan, medidos por el número de notas.</p>
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
                <Lock size={14} strokeWidth={1.5} aria-hidden /> Redes <span className="text-dato">Próximamente X</span>
              </>
            ),
          },
        ]}
      >
        <PanelPestana value="medios" className="pt-6 outline-none">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Periodo">
            <Chip activo={periodo === "h24"} onClick={() => setPeriodo("h24")}>
              24 h
            </Chip>
            <Chip activo={periodo === "d7"} onClick={() => setPeriodo("d7")}>
              7 días
            </Chip>
          </div>
          <div className="mt-6">
            <Streamgraph periodo={periodo} />
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-12">
            <section className="md:col-span-7" aria-labelledby="ranking">
              <h2 id="ranking" className="pb-3 text-tarjeta shadow-regla">
                Temas que suben y bajan
              </h2>
              <ol>
                {ranking.map((t, i) => (
                  <li key={t.tema} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 py-3 shadow-regla sm:grid-cols-[2rem_1fr_auto_5rem]">
                    <span className="hidden font-mono text-dato tabular text-muted sm:block">{i + 1}</span>
                    <span className="text-cuerpo">{t.tema}</span>
                    <Sparkline datos={t[periodo]} acento={t.tendencia === "sube" && i === 0} etiqueta={`${t.tema}: ${t[periodo].join(", ")}`} />
                    <span className="col-span-2 text-right sm:col-span-1">
                      <DeltaTendencia tendencia={t.tendencia} delta={t.delta} />
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            <div className="grid gap-10 md:col-span-5">
              {(
                [
                  ["actores", "Actores en ascenso", enAscenso.actores],
                  ["terminos", "Términos en ascenso", enAscenso.terminos],
                ] as const
              ).map(([id, titulo, lista]) => (
                <section key={id} aria-labelledby={id}>
                  <h2 id={id} className="pb-3 text-tarjeta shadow-regla">
                    {titulo}
                  </h2>
                  <ul>
                    {lista.map((a) => (
                      <li key={a.nombre} className="flex items-baseline justify-between gap-4 py-2.5 shadow-regla">
                        <span className={cn("text-cuerpo", id === "terminos" && "")}>{a.nombre}</span>
                        <span className="flex items-baseline gap-4 text-dato">
                          <span className="text-muted">
                            notas <Contador valor={a.menciones} />
                          </span>
                          <span className="text-signal">
                            +<Contador valor={a.delta} /> %
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </PanelPestana>
        <PanelPestana value="trends" className="pt-6 outline-none">
          <div className="max-w-lectura py-10">
            <h2 className="text-tarjeta titular">Google Trends, en preparación.</h2>
            <p className="mt-3 text-cuerpo text-muted">
              Aquí verás el interés de búsqueda por tema en Colombia, comparado con el volumen en medios. En el piloto todavía no se consulta.
            </p>
          </div>
        </PanelPestana>
      </Pestanas>
    </div>
  );
}
