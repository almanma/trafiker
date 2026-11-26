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
import { claseCampo } from "@/components/ui/Campo";
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

  return (
    <div className="relative z-10 flex min-h-dvh flex-col px-4 py-6 md:px-16 md:py-10">
      <header className="flex items-center justify-between gap-4">
        <Link href="/hoy" aria-label="Trafiker, ir a Hoy" className="flex min-h-11 items-center">
          <Wordmark alto={28} />
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block">
            <DatosEjemplo />
          </span>
          <Link href="/hoy" className="inline-flex min-h-11 items-center text-chico text-muted hover:text-text">
            Salir
          </Link>
        </div>
      </header>

      {/* Indicador de pasos: aquí la secuencia sí es real. */}
      <nav aria-label="Pasos" className="mt-10">
        <ol className="grid grid-cols-4 gap-2">
          {pasos.map((p, i) => (
            <li key={p} className={cn("pt-3 text-dato", i <= paso ? "shadow-senal-arriba text-text" : "text-muted shadow-[inset_0_2px_0_0_var(--t-border-strong)]")} aria-current={i === paso ? "step" : undefined}>
              <span className="font-mono tabular">{String(i + 1).padStart(2, "0")}</span>
              <span className="ml-2 hidden sm:inline">{p}</span>
            </li>
          ))}
        </ol>
      </nav>

      <main id="contenido" className="mx-auto w-full max-w-contenido flex-1 py-10">
        <AnimatePresence mode="wait">
          <motion.section key={paso} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transPanel} aria-live="polite">
            {paso === 0 && (
              <div className="grid gap-10 md:grid-cols-12">
                <div className="md:col-span-5">
                  <h1 className="text-secundario titular md:text-hero">¿Dónde se juega tu campaña?</h1>
                  <p className="mt-4 max-w-lectura text-cuerpo text-muted">Elige uno o varios territorios. El radar dará prioridad a lo que pase allí y a sus medios locales.</p>
                  <p className="mt-6 text-chico">
                    Elegidos{" "}
                    <span className="text-text">{territorio.map((t) => departamentos.find((d) => d.id === t)?.nombre).join(", ") || "ninguno"}</span>
                  </p>
                </div>
                <div className="md:col-span-7">
                  <MapaColombia seleccion={territorio} onElegir={(id) => alternar(territorio, setTerritorio, id)} />
                  <p className="mt-3 text-dato text-muted">Mapa estilizado: un hexágono por departamento.</p>
                </div>
              </div>
            )}

            {paso === 1 && (
              <div className="max-w-3xl">
                <h1 className="text-secundario titular md:text-hero">¿Qué medios lees?</h1>
                <p className="mt-4 max-w-lectura text-cuerpo text-muted">Marca los que importan en tu territorio. La línea editorial queda «a validar» hasta que la confirmes en Fuentes.</p>
                <ul className="mt-8">
                  {medios.map((m) => {
                    const on = mediosSel.includes(m.id);
                    return (
                      <li key={m.id} className="shadow-regla">
                        <label className="flex min-h-12 cursor-pointer items-center gap-4 py-2">
                          <input type="checkbox" checked={on} onChange={() => alternar(mediosSel, setMediosSel, m.id)} className="h-5 w-5 accent-[var(--t-signal)]" />
                          <span className="flex-1 text-cuerpo">{m.nombre}</span>
                          <span className="hidden text-chico text-muted sm:inline">{m.region}</span>
                          <EtiquetaLinea linea={m.linea} ejemplo={m.lineaEjemplo} />
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {paso === 2 && (
              <div className="max-w-3xl">
                <h1 className="text-secundario titular md:text-hero">¿Qué temas te pueden doler?</h1>
                <p className="mt-4 max-w-lectura text-cuerpo text-muted">Te avisaremos primero cuando uno de estos temas suba.</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {temasSensibles.map((t) => (
                    <Chip key={t} activo={temas.includes(t)} onClick={() => alternar(temas, setTemas, t)}>
                      {temas.includes(t) && <Check size={14} strokeWidth={1.5} aria-hidden />}
                      {t}
                    </Chip>
                  ))}
                </div>
              </div>
            )}

            {paso === 3 && (
              <div className="max-w-3xl">
                <h1 className="text-secundario titular md:text-hero">¿Cómo habla tu candidato?</h1>
                <p className="mt-4 max-w-lectura text-cuerpo text-muted">Las ideas de contenido se ajustarán a estas palabras y a esta postura.</p>
                <div className="mt-8">
                  <label htmlFor="clave" className="text-chico">
                    Palabras clave
                  </label>
                  <div className="mt-2 flex gap-2">
                    <input
                      id="clave"
                      value={nuevaClave}
                      onChange={(e) => setNuevaClave(e.target.value)}
                      onKeyDown={(e: KeyboardEvent) => e.key === "Enter" && (e.preventDefault(), agregarClave())}
                      className={claseCampo}
                      placeholder="Escribe y pulsa Enter"
                    />
                    <Boton onClick={agregarClave}>Agregar</Boton>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {claves.map((c) => (
                      <li key={c}>
                        <Chip activo onClick={() => setClaves(claves.filter((x) => x !== c))} aria-label={`Quitar ${c}`}>
                          {c}
                          <X size={14} strokeWidth={1.5} aria-hidden />
                        </Chip>
                      </li>
                    ))}
                  </ul>
                </div>
                <label className="mt-8 flex flex-col gap-2 text-chico">
                  Postura
                  <textarea value={postura} onChange={(e) => setPostura(e.target.value)} rows={3} className={cn(claseCampo, "h-auto py-2.5")} />
                </label>
              </div>
            )}

            {fin && (
              <div className="max-w-3xl">
                <h1 className="text-secundario titular md:text-hero">Listo. Te esperamos a las {hora}.</h1>
                <p className="mt-4 max-w-lectura text-cuerpo text-muted">Elige a qué hora y por dónde recibir el brief. En esta fase solo se genera el archivo; nada se envía.</p>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-chico">
                    Hora del brief
                    <select value={hora} onChange={(e) => setHora(e.target.value)} className={cn(claseCampo, "font-mono")}>
                      {["04:30", "05:00", "05:30", "06:00"].map((h) => (
                        <option key={h}>{h}</option>
                      ))}
                    </select>
                  </label>
                  <fieldset className="text-chico">
                    <legend>Canal</legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Chip activo={canal === "correo"} onClick={() => setCanal("correo")}>
                        Correo
                      </Chip>
                      <Chip disabled className="cursor-not-allowed">
                        WhatsApp <span className="text-dato">Próximamente</span>
                      </Chip>
                    </div>
                  </fieldset>
                </div>
              </div>
            )}
          </motion.section>
        </AnimatePresence>
      </main>

      <footer className="flex items-center justify-between gap-4 pt-4 shadow-regla-arriba">
        <Boton variante="fantasma" onClick={() => setPaso((p) => Math.max(0, p - 1))} disabled={paso === 0}>
          Atrás
        </Boton>
        <span className="font-mono text-dato tabular text-muted">
          {Math.min(paso + 1, pasos.length)} de {pasos.length}
        </span>
        {fin ? (
          <Boton
            variante="primario"
            onClick={() => {
              toast("Campaña configurada", { description: "Guardado solo en esta sesión." });
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
      </footer>
    </div>
  );
}
