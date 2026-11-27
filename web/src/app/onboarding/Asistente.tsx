"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type KeyboardEvent } from "react";
import { toast } from "sonner";
import { DatosEjemplo, EtiquetaLinea } from "@/components/firma/Basicos";
import { MapaColombia } from "@/components/firma/MapaColombia";
import { Wordmark } from "@/components/firma/Wordmark";
import { Boton, Chip } from "@/components/ui/Boton";
import { Campo, Entrada, Selector, claseCampo } from "@/components/ui/Campo";
import { Insignia } from "@/components/ui/Insignia";
import { cn } from "@/lib/cn";
import { transPanel } from "@/lib/movimiento";
import { departamentos, temasSensibles } from "@/mocks/campanas";
import { medios } from "@/mocks/medios";

const pasos = ["Territorio", "Medios locales", "Temas sensibles", "Discurso"];

export function Asistente() {
  const router = useRouter();
  const [paso, setPaso] = useState(0);
  const [territorio, setTerritorio] = useState<string[]>(["bogota"]);
  const [mediosSel, setMediosSel] = useState<string[]>(medios.filter((m) => m.alcance === "regional").map((m) => m.id).concat("el-tiempo"));
  const [temas, setTemas] = useState<string[]>(["Movilidad", "Seguridad"]);
  const [claves, setClaves] = useState<string[]>(["metro", "seguridad en barrios"]);
  const [nuevaClave, setNuevaClave] = useState("");
  const [postura, setPostura] = useState("Gestión con resultados medibles; tono firme y sin ataques personales.");
  const [hora, setHora] = useState("05:00");
  const [canal, setCanal] = useState("correo");
  const fin = paso === pasos.length;

  const alternar = (lista: string[], set: (v: string[]) => void, v: string) => set(lista.includes(v) ? lista.filter((x) => x !== v) : [...lista, v]);
  const agregarClave = () => {
    const c = nuevaClave.trim();
    if (c && !claves.includes(c)) setClaves([...claves, c]);
    setNuevaClave("");
  };

  const progreso = (Math.min(paso, pasos.length) + 1) / (pasos.length + 1);

  return (
    <div className="relative z-10 flex min-h-dvh flex-col">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between gap-4 px-4">
          <Link href="/hoy" aria-label="Trafiker, ir a Hoy" className="flex min-h-11 items-center">
            <Wordmark alto={24} />
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block">
              <DatosEjemplo />
            </span>
            <Link href="/hoy" className="inline-flex min-h-11 items-center rounded-control px-2 text-chico font-medium text-muted hover:bg-surface-2 hover:text-text md:min-h-9">
              Salir
            </Link>
          </div>
        </div>
        {/* Barra de progreso: avanza con cada paso */}
        <div className="h-0.5 bg-border" aria-hidden>
          <motion.div className="h-full bg-signal" initial={false} animate={{ width: `${(fin ? 1 : progreso) * 100}%` }} transition={transPanel} />
        </div>
      </header>

      <div className="mx-auto w-full max-w-4xl flex-1 px-4 pb-28 pt-8">
        {/* Pasos: número (o check), nombre y estado */}
        <nav aria-label="Pasos">
          <ol className="grid grid-cols-4 gap-2">
            {pasos.map((p, i) => {
              const hecho = i < paso;
              const actual = i === paso;
              return (
                <li key={p} aria-current={actual ? "step" : undefined} className="flex min-w-0 items-center gap-2">
                  <span
                    className={cn(
                      "grid h-7 w-7 shrink-0 place-items-center rounded-pildora border text-dato font-semibold tabular transition-colors duration-200",
                      hecho && "border-signal bg-signal text-sobre-senal",
                      actual && "border-signal bg-signal-suave text-signal",
                      !hecho && !actual && "border-border-strong bg-surface text-muted",
                    )}
                  >
                    {hecho ? <Check size={14} strokeWidth={2.5} aria-hidden /> : i + 1}
                    <span className="sr-only">{hecho ? " (hecho)" : actual ? " (actual)" : ""}</span>
                  </span>
                  <span className={cn("hidden truncate text-chico font-medium sm:block", actual || hecho ? "text-text" : "text-muted")}>{p}</span>
                </li>
              );
            })}
          </ol>
        </nav>

        <main id="contenido" className="mt-6">
          <AnimatePresence mode="wait">
            <motion.section
              key={paso}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={transPanel}
              aria-live="polite"
              className="rounded-panel border border-border bg-surface p-5 shadow-e1 md:p-8"
            >
              <p className="text-dato font-medium text-signal">{fin ? "Último paso" : `Paso ${paso + 1} de ${pasos.length}`}</p>
              {paso === 0 && (
                <div className="mt-1 grid gap-8 md:grid-cols-2 md:items-center">
                  <div>
                    <h1 className="text-hero">¿Dónde se juega tu campaña?</h1>
                    <p className="mt-2 text-cuerpo text-muted">Elige uno o varios territorios. El radar dará prioridad a lo que pase allí y a sus medios locales.</p>
                    <div className="mt-5">
                      <p className="text-dato font-medium text-muted">Elegidos</p>
                      <ul className="mt-1.5 flex flex-wrap gap-1.5">
                        {territorio.length ? (
                          territorio.map((t) => (
                            <li key={t}>
                              <Insignia tono="marca" tamano="md">
                                {departamentos.find((d) => d.id === t)?.nombre}
                              </Insignia>
                            </li>
                          ))
                        ) : (
                          <li className="text-chico text-muted">Ninguno todavía. Toca un hexágono.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <MapaColombia seleccion={territorio} onElegir={(id) => alternar(territorio, setTerritorio, id)} />
                    <p className="mt-2 text-center text-dato text-muted">Mapa estilizado: un hexágono por departamento.</p>
                  </div>
                </div>
              )}

              {paso === 1 && (
                <div className="mt-1">
                  <h1 className="text-hero">¿Qué medios lees?</h1>
                  <p className="mt-2 max-w-lectura text-cuerpo text-muted">Marca los que importan en tu territorio. La línea editorial queda «a validar» hasta que la confirmes en Fuentes.</p>
                  <ul className="mt-6 overflow-hidden rounded-control border border-border">
                    {medios.map((m) => {
                      const on = mediosSel.includes(m.id);
                      return (
                        <li key={m.id} className="border-b border-border last:border-b-0">
                          <label className={cn("flex min-h-12 cursor-pointer items-center gap-3 px-3 py-2 transition-colors", on ? "bg-signal-suave/60" : "hover:bg-surface-2")}>
                            <input type="checkbox" checked={on} onChange={() => alternar(mediosSel, setMediosSel, m.id)} className="h-4 w-4 accent-[var(--t-signal)]" />
                            <span className="flex-1 text-chico font-medium">{m.nombre}</span>
                            <span className="hidden text-dato text-muted sm:inline">{m.region}</span>
                            <EtiquetaLinea linea={m.linea} ejemplo={m.lineaEjemplo} />
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="mt-2 text-dato text-muted">
                    <span className="font-medium text-text tabular">{mediosSel.length}</span> de {medios.length} seleccionados
                  </p>
                </div>
              )}

              {paso === 2 && (
                <div className="mt-1">
                  <h1 className="text-hero">¿Qué temas te pueden doler?</h1>
                  <p className="mt-2 max-w-lectura text-cuerpo text-muted">Te avisaremos primero cuando uno de estos temas suba.</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {temasSensibles.map((t) => (
                      <Chip key={t} activo={temas.includes(t)} onClick={() => alternar(temas, setTemas, t)}>
                        {temas.includes(t) && <Check size={14} strokeWidth={2} aria-hidden />}
                        {t}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}

              {paso === 3 && (
                <div className="mt-1">
                  <h1 className="text-hero">¿Cómo habla tu candidato?</h1>
                  <p className="mt-2 max-w-lectura text-cuerpo text-muted">Las ideas de contenido se ajustarán a estas palabras y a esta postura.</p>
                  <div className="mt-6 flex flex-col gap-5">
                    <div>
                      <label htmlFor="clave" className="text-chico font-medium">
                        Palabras clave
                      </label>
                      <div className="mt-1.5 flex gap-2">
                        <Entrada
                          id="clave"
                          value={nuevaClave}
                          onChange={(e) => setNuevaClave(e.target.value)}
                          onKeyDown={(e: KeyboardEvent) => e.key === "Enter" && (e.preventDefault(), agregarClave())}
                          placeholder="Escribe y pulsa Enter"
                        />
                        <Boton onClick={agregarClave} className="md:min-h-10">
                          Agregar
                        </Boton>
                      </div>
                      <ul className="mt-2.5 flex flex-wrap gap-2">
                        {claves.map((c) => (
                          <li key={c}>
                            <Chip activo onClick={() => setClaves(claves.filter((x) => x !== c))} aria-label={`Quitar ${c}`}>
                              {c}
                              <X size={14} strokeWidth={2} aria-hidden />
                            </Chip>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <label className="flex flex-col gap-1.5 text-chico font-medium">
                      Postura
                      <textarea value={postura} onChange={(e) => setPostura(e.target.value)} rows={3} className={cn(claseCampo, "h-auto py-2.5 font-normal")} />
                    </label>
                  </div>
                </div>
              )}

              {fin && (
                <div className="mt-1">
                  <h1 className="text-hero">Listo. Te esperamos a las {hora}.</h1>
                  <p className="mt-2 max-w-lectura text-cuerpo text-muted">Elige a qué hora y por dónde recibir el brief. En esta fase solo se genera el archivo; nada se envía.</p>
                  <dl className="mt-6 grid gap-3 rounded-control border border-border bg-surface-2 p-4 text-chico sm:grid-cols-2">
                    <div>
                      <dt className="text-dato text-muted">Territorio</dt>
                      <dd className="font-medium">{territorio.map((t) => departamentos.find((d) => d.id === t)?.nombre).join(", ") || "Sin elegir"}</dd>
                    </div>
                    <div>
                      <dt className="text-dato text-muted">Medios</dt>
                      <dd className="font-medium tabular">{mediosSel.length} seleccionados</dd>
                    </div>
                    <div>
                      <dt className="text-dato text-muted">Temas sensibles</dt>
                      <dd className="font-medium">{temas.join(", ") || "Ninguno"}</dd>
                    </div>
                    <div>
                      <dt className="text-dato text-muted">Palabras clave</dt>
                      <dd className="font-medium">{claves.join(", ") || "Ninguna"}</dd>
                    </div>
                  </dl>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <Campo etiqueta="Hora del brief">
                      {(a) => (
                        <Selector value={hora} onChange={(e) => setHora(e.target.value)} {...a}>
                          {["04:30", "05:00", "05:30", "06:00"].map((h) => (
                            <option key={h}>{h}</option>
                          ))}
                        </Selector>
                      )}
                    </Campo>
                    <fieldset>
                      <legend className="text-chico font-medium">Canal</legend>
                      <div className="mt-1.5 flex flex-wrap gap-2">
                        <Chip activo={canal === "correo"} onClick={() => setCanal("correo")}>
                          Correo
                        </Chip>
                        <Chip disabled className="cursor-not-allowed opacity-70">
                          WhatsApp <Insignia>Próximamente</Insignia>
                        </Chip>
                      </div>
                    </fieldset>
                  </div>
                </div>
              )}
            </motion.section>
          </AnimatePresence>
        </main>
      </div>

      <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-surface/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3">
          <Boton variante="secundario" onClick={() => setPaso((p) => Math.max(0, p - 1))} disabled={paso === 0}>
            Atrás
          </Boton>
          <span className="text-dato text-muted tabular">
            {fin ? "Revisión final" : `Paso ${paso + 1} de ${pasos.length}`}
          </span>
          {fin ? (
            <Boton
              variante="primario"
              onClick={() => {
                toast.success("Campaña configurada", { description: "Guardado solo en esta sesión." });
                router.push("/hoy");
              }}
            >
              Ir al brief
            </Boton>
          ) : (
            <Boton variante="primario" onClick={() => setPaso((p) => p + 1)}>
              {paso === pasos.length - 1 ? "Terminar" : "Siguiente"}
            </Boton>
          )}
        </div>
      </footer>
    </div>
  );
}
