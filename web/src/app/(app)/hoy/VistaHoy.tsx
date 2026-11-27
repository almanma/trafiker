"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Clapperboard, GalleryHorizontal, MessagesSquare, Sparkles } from "lucide-react";
import Link from "next/link";
import { useMemo, type ReactNode } from "react";
import { DatosEjemplo } from "@/components/firma/Basicos";
import { Contador } from "@/components/firma/Contador";
import { PulsoRadar } from "@/components/firma/PulsoRadar";
import { SelloVeredicto } from "@/components/firma/SelloVeredicto";
import { TarjetaNoticia, veredictoDe } from "@/components/firma/TarjetaNoticia";
import { useApp } from "@/components/shell/Estado";
import { useNavegacionNoticias } from "@/components/shell/useNavegacionNoticias";
import { Insignia } from "@/components/ui/Insignia";
import { Tarjeta } from "@/components/ui/Tarjeta";
import { cn } from "@/lib/cn";
import { useEsPrimeraCarga } from "@/lib/movimiento";
import { fechaLarga } from "@/lib/fecha";
import { campanas } from "@/mocks/campanas";
import { nombreFormato } from "@/mocks/ideas";
import { medioPorId, medios } from "@/mocks/medios";
import { brief, noticias } from "@/mocks/noticias";
import type { Noticia } from "@/mocks/tipos";
import { verificaciones } from "@/mocks/verificaciones";
import { movimiento } from "@/styles/tokens";

/* El brief entra escalonado (cada bloque 30 ms después del anterior) al llegar
   desde otra sección. En la carga directa llega visible: el splash ya cubre
   ese momento y así el contenido no espera al JavaScript para verse. */
const cascada: Variants = { oculto: {}, visible: { transition: { staggerChildren: movimiento.cascada.stagger } } };
const pieza: Variants = {
  oculto: { opacity: 0, y: movimiento.cascada.y },
  visible: { opacity: 1, y: 0, transition: { duration: movimiento.panel.duracion, ease: movimiento.base.curva } },
};

const iconoFormato = { video: Clapperboard, carrusel: GalleryHorizontal, hilo: MessagesSquare };

/** Relevancia = cuántos medios distintos cubren el hecho; empata la intensidad total. */
function porRelevancia(lista: Noticia[]) {
  const medios = (n: Noticia) => new Set(n.articulos.map((a) => a.medioId)).size;
  const peso = (n: Noticia) => n.articulos.reduce((s, a) => s + a.intensidad, 0);
  return [...lista].sort((a, b) => medios(b) - medios(a) || peso(b) - peso(a));
}

function Cifra({ etiqueta, valor, detalle, href }: { etiqueta: string; valor: ReactNode; detalle: string; href?: string }) {
  const cuerpo = (
    <>
      <p className="text-dato font-medium text-muted">{etiqueta}</p>
      <p className="mt-1 text-secundario font-semibold">{valor}</p>
      <p className="mt-0.5 truncate text-dato text-muted">{detalle}</p>
    </>
  );
  const clases = "block rounded-panel border border-border bg-surface px-4 py-3 shadow-e1";
  return href ? (
    <Link href={href} className={cn(clases, "transition-[box-shadow,border-color] duration-200 hover:border-border-strong hover:shadow-e2")}>
      {cuerpo}
    </Link>
  ) : (
    <div className={clases}>{cuerpo}</div>
  );
}

function EncabezadoSeccion({ id, titulo, ayuda, accion }: { id: string; titulo: string; ayuda?: string; accion?: ReactNode }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-4">
      <div>
        <h2 id={id} className="text-tarjeta">
          {titulo}
        </h2>
        {ayuda && <p className="text-dato text-muted">{ayuda}</p>}
      </div>
      {accion}
    </div>
  );
}

const enlaceSeccion = "inline-flex min-h-11 items-center gap-1 text-chico font-medium text-signal hover:text-signal-hover md:min-h-0";

export function VistaHoy() {
  const { abrirNoticia, campanaId, ideas } = useApp();
  const primera = useEsPrimeraCarga();
  const campana = campanas.find((c) => c.id === campanaId)!;
  const ordenadas = useMemo(() => porRelevancia(noticias), []);
  const ids = useMemo(() => ordenadas.map((n) => n.id), [ordenadas]);
  const { seleccionada } = useNavegacionNoticias(ids);
  const clave = ordenadas.slice(0, 7);
  const resto = ordenadas.slice(7);

  const porVerificar = verificaciones.filter((v) => v.veredicto !== "verificado");
  const falsos = verificaciones.filter((v) => v.veredicto === "falso").length;
  const sugeridas = ideas.filter((i) => i.columna === "sugerida");
  const responden = medios.filter((m) => m.salud === "ok").length;
  const suben = noticias.filter((n) => n.tendencia === "sube").length;
  const fecha = fechaLarga(brief.fecha);

  return (
    <motion.div initial={primera ? false : "oculto"} animate="visible" variants={cascada}>
      {/* Encabezado: fecha, territorio y hora de actualización */}
      <motion.header variants={pieza} className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <PulsoRadar hora={brief.actualizado} />
            <span className="text-chico text-muted">
              Territorio <span className="font-medium text-text">{campana.nombre}</span>
            </span>
          </div>
          <h1 className="mt-2 text-hero md:text-portada">{fecha.charAt(0).toUpperCase() + fecha.slice(1)}</h1>
          <p className="mt-1 text-cuerpo text-muted">{brief.saludo}</p>
        </div>
        <DatosEjemplo className="lg:hidden" />
      </motion.header>

      {/* Cifras del día: todas se cuentan de los datos, ninguna es inventada */}
      <motion.div variants={pieza} className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Cifra etiqueta="Hechos del día" valor={<Contador valor={noticias.length} />} detalle={`${suben} van en ascenso`} />
        <Cifra etiqueta="Medios leídos" valor={<><Contador valor={responden} /><span className="text-lectura font-medium text-muted"> de {medios.length}</span></>} detalle={`${medios.length - responden} sin responder`} href="/fuentes" />
        <Cifra etiqueta="Por verificar" valor={<Contador valor={porVerificar.length} />} detalle={`${falsos} marcados como falsos`} href="/verificacion" />
        <Cifra etiqueta="Ideas sugeridas" valor={<Contador valor={sugeridas.length} />} detalle="Listas para revisar" href="/ideas" />
      </motion.div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex min-w-0 flex-col gap-8">
          {/* Resumen ejecutivo */}
          <motion.section variants={pieza} aria-labelledby="resumen">
            <Tarjeta className="md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 id="resumen" className="text-tarjeta">
                  Resumen ejecutivo
                </h2>
                <Insignia tono="marca">
                  <Sparkles size={12} strokeWidth={2} aria-hidden />
                  Generado por IA, revisa las fuentes
                </Insignia>
              </div>
              <ol className="mt-4 flex flex-col gap-3">
                {brief.enTreintaSegundos.map((f, i) => (
                  <li key={f} className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-pildora bg-signal-suave text-dato font-semibold text-signal tabular" aria-hidden>
                      {i + 1}
                    </span>
                    <p className="max-w-lectura text-lectura">{f}</p>
                  </li>
                ))}
              </ol>
            </Tarjeta>
          </motion.section>

          {/* Hechos clave por relevancia */}
          <section aria-labelledby="hechos">
            <motion.div variants={pieza}>
              <EncabezadoSeccion
                id="hechos"
                titulo="Hechos clave"
                ayuda="Ordenados por relevancia: cuántos medios distintos los cubren."
                accion={
                  <Link href="/matriz" className={enlaceSeccion}>
                    Ver en la matriz <ArrowRight size={14} strokeWidth={2} aria-hidden />
                  </Link>
                }
              />
            </motion.div>
            <div className="grid gap-4 md:grid-cols-2">
              {clave.map((n, i) => (
                <motion.div key={n.id} variants={pieza} className={i === 0 ? "md:col-span-2" : undefined}>
                  <TarjetaNoticia
                    noticia={n}
                    rango={i + 1}
                    destacada={i === 0}
                    maxFuentes={i === 0 ? 5 : 3}
                    onAbrir={abrirNoticia}
                    seleccionada={seleccionada === n.id}
                    className="h-full"
                  />
                </motion.div>
              ))}
            </div>
          </section>

          {/* El resto, en lista compacta */}
          <motion.section variants={pieza} aria-labelledby="tambien">
            <EncabezadoSeccion id="tambien" titulo="También en el radar" />
            <Tarjeta relleno={false}>
              <ol>
                {resto.map((n, i) => {
                  const cubren = new Set(n.articulos.map((a) => a.medioId)).size;
                  return (
                    <li key={n.id} className={cn("group relative flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0 hover:bg-surface-2", seleccionada === n.id && "bg-surface-2")}>
                      <span className="w-6 shrink-0 text-dato font-semibold text-muted tabular">#{i + 8}</span>
                      <div className="min-w-0 flex-1">
                        <button
                          type="button"
                          data-noticia={n.id}
                          onClick={() => abrirNoticia(n.id)}
                          className="text-left text-cuerpo font-medium after:absolute after:inset-0 group-hover:text-signal"
                        >
                          {n.titular}
                        </button>
                        <p className="text-dato text-muted">
                          {n.tema} · {n.territorio}
                        </p>
                      </div>
                      <span className="hidden shrink-0 text-dato text-muted sm:inline">
                        <span className="font-medium text-text tabular">{cubren}</span> medios
                      </span>
                      <SelloVeredicto veredicto={veredictoDe(n.id)} className="relative" />
                    </li>
                  );
                })}
              </ol>
            </Tarjeta>
          </motion.section>
        </div>

        {/* Columna derecha: lo que hay que revisar y lo que se puede publicar */}
        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start" aria-label="Para verificar e ideas">
          <motion.section variants={pieza} aria-labelledby="para-verificar">
            <Tarjeta relleno={false}>
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <h2 id="para-verificar" className="text-chico font-semibold">
                  Para verificar
                </h2>
                <Link href="/verificacion" className={enlaceSeccion}>
                  Ver todo
                </Link>
              </div>
              <ul>
                {porVerificar.slice(0, 3).map((v) => (
                  <li key={v.id} className="border-b border-border px-4 py-3 last:border-b-0">
                    <SelloVeredicto veredicto={v.veredicto} />
                    <p className="mt-1.5 text-chico font-medium">«{v.dato.replace(/^"|"$/g, "")}»</p>
                    <p className="mt-1 text-dato text-muted">
                      Dicho en {medioPorId[v.dicho.medioId].nombre} · contraste{" "}
                      <a href={v.contraste.url} target="_blank" rel="noreferrer" className="font-medium text-signal underline-offset-2 hover:underline">
                        {v.contraste.fuente}
                      </a>
                    </p>
                  </li>
                ))}
              </ul>
            </Tarjeta>
          </motion.section>

          <motion.section variants={pieza} aria-labelledby="ideas-hoy">
            <Tarjeta relleno={false}>
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <h2 id="ideas-hoy" className="text-chico font-semibold">
                  Ideas para hoy
                </h2>
                <Link href="/ideas" className={enlaceSeccion}>
                  Tablero
                </Link>
              </div>
              <ul>
                {sugeridas.slice(0, 3).map((i) => {
                  const Icono = iconoFormato[i.formato];
                  return (
                    <li key={i.id} className="border-b border-border px-4 py-3 last:border-b-0">
                      <span className="inline-flex items-center gap-1.5 text-dato text-muted">
                        <Icono size={14} strokeWidth={1.75} aria-hidden />
                        {nombreFormato[i.formato]}
                        {i.duracion && <span className="tabular">{i.duracion}</span>}
                      </span>
                      <p className="mt-1 text-chico font-medium">{i.titulo}</p>
                      <p className="mt-0.5 text-dato text-muted">{i.angulo}</p>
                    </li>
                  );
                })}
              </ul>
            </Tarjeta>
          </motion.section>

          <motion.p variants={pieza} className="hidden px-1 text-dato text-muted lg:block">
            <kbd className="rounded-[4px] border border-border bg-surface px-1">J</kbd> <kbd className="rounded-[4px] border border-border bg-surface px-1">K</kbd> para moverte,{" "}
            <kbd className="rounded-[4px] border border-border bg-surface px-1">Enter</kbd> abre, <kbd className="rounded-[4px] border border-border bg-surface px-1">E</kbd> crea idea,{" "}
            <kbd className="rounded-[4px] border border-border bg-surface px-1">?</kbd> todos los atajos.
          </motion.p>
        </aside>
      </div>
    </motion.div>
  );
}
