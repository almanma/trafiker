"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import { DatosEjemplo, TituloSeccion } from "@/components/firma/Basicos";
import { Expediente } from "@/components/firma/Expediente";
import { FilaTitular, NoticiaEstandar, NoticiaHero } from "@/components/firma/Noticias";
import { BarridoRadar, PulsoRadar } from "@/components/firma/PulsoRadar";
import { TarjetaIdea } from "@/components/firma/TarjetaIdea";
import { useApp } from "@/components/shell/Estado";
import { useNavegacionNoticias } from "@/components/shell/useNavegacionNoticias";
import { fechaLarga } from "@/lib/fecha";
import { campanas } from "@/mocks/campanas";
import { brief, noticias } from "@/mocks/noticias";
import { verificaciones } from "@/mocks/verificaciones";
import { movimiento } from "@/styles/tokens";

/* Único momento orquestado de la app: la carga del brief entra en cascada. */
const cascada: Variants = { oculto: {}, visible: { transition: { staggerChildren: movimiento.cascada.stagger } } };
const pieza: Variants = {
  oculto: { opacity: 0, y: movimiento.cascada.y },
  visible: { opacity: 1, y: 0, transition: { duration: movimiento.panel.duracion, ease: movimiento.base.curva } },
};

const enlace = "inline-flex min-h-11 items-center md:min-h-0 text-chico text-muted underline decoration-border-strong underline-offset-4 hover:text-text";

export function VistaHoy() {
  const { abrirNoticia, campanaId, ideas } = useApp();
  const ids = useMemo(() => noticias.map((n) => n.id), []);
  const { seleccionada } = useNavegacionNoticias(ids);
  const campana = campanas.find((c) => c.id === campanaId)!;
  const [hero, n2, n3, n4, ...resto] = noticias;
  const alertas = verificaciones.filter((v) => v.veredicto !== "verificado").slice(0, 3);
  const sugeridas = ideas.filter((i) => i.columna === "sugerida").slice(0, 3);
  const props = (id: string) => ({ onAbrir: abrirNoticia, seleccionada: seleccionada === id });

  return (
    <motion.div initial="oculto" animate="visible" variants={cascada}>
      <header className="relative overflow-hidden pb-10 shadow-regla">
        <BarridoRadar className="absolute -right-24 -top-28 hidden h-[420px] w-[420px] md:block" />
        <motion.div variants={pieza} className="relative flex flex-wrap items-center gap-x-6 gap-y-2">
          <PulsoRadar hora={brief.actualizado} />
          <span className="text-chico text-muted">
            Territorio <span className="text-text">{campana.nombre}</span>
          </span>
          <DatosEjemplo className="lg:hidden" />
        </motion.div>
        <motion.h1 variants={pieza} className="relative mt-4 text-hero serif-display md:text-portada">
          {fechaLarga(brief.fecha)}
        </motion.h1>
        <motion.p variants={pieza} className="relative mt-3 text-lectura text-muted">
          {brief.saludo}
        </motion.p>
      </header>

      <motion.section variants={pieza} aria-labelledby="treinta" className="py-8 shadow-regla">
        <h2 id="treinta" className="text-lectura serif-texto text-muted">
          En 30 segundos
        </h2>
        <div className="mt-3 max-w-lectura font-serif text-tarjeta serif-texto">
          {brief.enTreintaSegundos.map((f) => (
            <p key={f} className="mt-2 first:mt-0">
              {f}
            </p>
          ))}
        </div>
      </motion.section>

      <div className="grid gap-x-8 gap-y-10 pt-10 md:grid-cols-12">
        {/* Columna principal (9): hero, bloque 6+3+3 y lista de titulares, sobre su propia rejilla de 12. */}
        <div className="grid gap-x-8 gap-y-10 md:col-span-8 md:grid-cols-12 lg:col-span-9">
          <motion.div variants={pieza} className="md:col-span-12">
            <NoticiaHero noticia={hero} {...props(hero.id)} />
          </motion.div>
          <motion.div variants={pieza} className="md:col-span-12 lg:col-span-6">
            <NoticiaEstandar noticia={n2} variante="amplia" {...props(n2.id)} className="h-full" />
          </motion.div>
          <motion.div variants={pieza} className="md:col-span-6 lg:col-span-3 lg:pl-8 lg:shadow-regla-izq">
            <NoticiaEstandar noticia={n3} {...props(n3.id)} className="h-full" />
          </motion.div>
          <motion.div variants={pieza} className="md:col-span-6 lg:col-span-3 lg:pl-8 lg:shadow-regla-izq">
            <NoticiaEstandar noticia={n4} {...props(n4.id)} className="h-full" />
          </motion.div>
          <motion.section variants={pieza} className="md:col-span-12" aria-labelledby="tambien">
            <TituloSeccion id="tambien">También en el radar</TituloSeccion>
            <div className="grid gap-x-8 sm:grid-cols-2 xl:grid-cols-4">
              {resto.map((n) => (
                <FilaTitular key={n.id} noticia={n} {...props(n.id)} />
              ))}
            </div>
          </motion.section>
        </div>

        <aside className="flex flex-col gap-10 md:col-span-4 md:pl-8 md:shadow-regla-izq lg:col-span-3" aria-label="Para verificar e ideas">
          <motion.section variants={pieza} aria-labelledby="para-verificar">
            <TituloSeccion id="para-verificar" accion={<Link href="/verificacion" className={enlace}>Ver todo</Link>}>
              Para verificar
            </TituloSeccion>
            {alertas.map((v) => (
              <Expediente key={v.id} v={v} compacto />
            ))}
          </motion.section>
          <motion.section variants={pieza} aria-labelledby="ideas-hoy">
            <TituloSeccion id="ideas-hoy" accion={<Link href="/ideas" className={enlace}>Tablero</Link>}>
              Ideas para hoy
            </TituloSeccion>
            {sugeridas.map((i) => (
              <TarjetaIdea key={i.id} idea={i} compacta />
            ))}
          </motion.section>
        </aside>
      </div>

      <p className="mt-10 text-dato text-muted">
        Atajos: <kbd className="font-mono">J</kbd> y <kbd className="font-mono">K</kbd> para moverte, <kbd className="font-mono">Enter</kbd> para abrir,{" "}
        <kbd className="font-mono">E</kbd> para crear idea, <kbd className="font-mono">?</kbd> para ver todos.
      </p>
    </motion.div>
  );
}
