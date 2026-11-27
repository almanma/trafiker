"use client";

import { Copy, Download, Plus, Trash2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { DatosEjemplo, DeltaTendencia, EtiquetaLinea } from "@/components/firma/Basicos";
import { BarraDeSesgo } from "@/components/firma/BarraDeSesgo";
import { GlifoTono } from "@/components/firma/CeldaMatriz";
import { EstadoError, EstadoVacio } from "@/components/firma/Estados";
import { PulsoRadar } from "@/components/firma/PulsoRadar";
import { SelloVeredicto } from "@/components/firma/SelloVeredicto";
import { Sparkline } from "@/components/firma/Sparkline";
import { TarjetaNoticia } from "@/components/firma/TarjetaNoticia";
import { Wordmark } from "@/components/firma/Wordmark";
import { Boton, Chip } from "@/components/ui/Boton";
import { Campo, Entrada, Selector } from "@/components/ui/Campo";
import { ChipFuente } from "@/components/ui/ChipFuente";
import { Insignia } from "@/components/ui/Insignia";
import { Pestanas } from "@/components/ui/Pestanas";
import { Fila, Tabla, Td, Th } from "@/components/ui/Tabla";
import { Tarjeta } from "@/components/ui/Tarjeta";
import { Tooltip } from "@/components/ui/Tooltip";
import { contraste, formatoRatio } from "@/lib/contraste";
import { cn } from "@/lib/cn";
import { medios, nombreLinea } from "@/mocks/medios";
import { noticias } from "@/mocks/noticias";
import type { Veredicto } from "@/mocks/tipos";
import { color, movimiento, radio, sombra, tipo } from "@/styles/tokens";

type Clave = keyof typeof color.claro;
const c = color.claro;

const secciones = [
  ["color", "Color"],
  ["tipografia", "Tipografía"],
  ["forma", "Elevación y forma"],
  ["botones", "Botones y chips"],
  ["badges", "Badges de estado"],
  ["noticias", "Tarjetas de noticia"],
  ["fuentes", "Chips de fuente"],
  ["tablas", "Tablas"],
  ["pestanas", "Pestañas y tooltips"],
  ["campos", "Inputs"],
  ["estados", "Vacío y error"],
  ["movimiento", "Movimiento"],
] as const;

const neutros: [string, Clave, string][] = [
  ["Fondo", "bg", "Lienzo de la app"],
  ["Superficie", "surface", "Tarjetas, tablas, inputs"],
  ["Superficie 2", "surface2", "Encabezados de tabla, hover"],
  ["Borde", "border", "1 px en todo contenedor"],
  ["Borde fuerte", "borderStrong", "Inputs, hover de tarjeta"],
  ["Texto", "text", "Titulares y datos"],
  ["Secundario", "muted", "Metadatos y ayudas"],
];

const semanticos: { nombre: string; fg: Clave; bg: Clave; veredicto: Veredicto }[] = [
  { nombre: "Verificado", fg: "verificado", bg: "verificadoSuave", veredicto: "verificado" },
  { nombre: "Engañoso", fg: "enganoso", bg: "enganosoSuave", veredicto: "enganoso" },
  { nombre: "Falso", fg: "falso", bg: "falsoSuave", veredicto: "falso" },
  { nombre: "Sin verificar", fg: "sinVerificar", bg: "sinVerificarSuave", veredicto: "sin-verificar" },
];

const referencias = [
  ["Linear", "Densidad, filas de 1 px y foco visible; el gris del texto secundario."],
  ["Vercel", "Geist y Geist Mono, números tabulares y la paleta casi neutra con un solo acento."],
  ["Stripe", "Sombras en capas, frías y difusas, en lugar de una sola sombra gris."],
  ["Notion", "Estados vacíos con una frase útil y una acción, nunca solo «no hay datos»."],
];

const claseTipo: Record<keyof typeof tipo, string> = {
  dato: "text-dato",
  chico: "text-chico",
  cuerpo: "text-cuerpo",
  lectura: "text-lectura",
  tarjeta: "text-tarjeta",
  secundario: "text-secundario",
  hero: "text-hero",
  portada: "text-portada",
};

function Seccion({ id, titulo, texto, children }: { id: string; titulo: string; texto?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`t-${id}`} className="scroll-mt-24 border-t border-border py-10 first:border-t-0 first:pt-0">
      <h2 id={`t-${id}`} className="text-secundario">
        {titulo}
      </h2>
      {texto && <p className="mt-2 max-w-lectura text-cuerpo text-muted">{texto}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Subtitulo({ children }: { children: ReactNode }) {
  return <h3 className="mb-3 text-chico font-semibold text-text">{children}</h3>;
}

function Muestra({ nombre, hex, uso, fondo = c.bg }: { nombre: string; hex: string; uso: string; fondo?: string }) {
  const ratio = hex.startsWith("#") && fondo.startsWith("#") ? contraste(hex, fondo) : null;
  return (
    <li className="flex items-center gap-3 rounded-control border border-border bg-surface p-2.5">
      <span className="h-10 w-10 shrink-0 rounded-editorial border border-border" style={{ background: hex }} aria-hidden />
      <span className="min-w-0 flex-1">
        <span className="block text-chico font-medium">{nombre}</span>
        <span className="block truncate text-dato text-muted">{uso}</span>
      </span>
      <span className="text-right text-dato tabular">
        <span className="block font-mono">{hex}</span>
        {ratio !== null && ratio > 1.5 && <span className="block text-muted">{formatoRatio(ratio)}</span>}
      </span>
    </li>
  );
}

export function VistaGuia() {
  const [pestana, setPestana] = useState("hoy");
  const [vista, setVista] = useState("tarjetas");

  return (
    <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
      <nav aria-label="Secciones de la guía" className="hidden lg:block">
        <ul className="sticky top-24 flex flex-col gap-0.5 text-chico">
          {secciones.map(([id, nombre]) => (
            <li key={id}>
              <a href={`#${id}`} className="block rounded-control px-2.5 py-1.5 text-muted transition-colors hover:bg-surface-2 hover:text-text">
                {nombre}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="min-w-0">
        <header className="pb-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Wordmark alto={36} />
            <DatosEjemplo />
          </div>
          <h1 className="mt-8 text-hero md:text-portada">Sistema de diseño</h1>
          <p className="mt-3 max-w-lectura text-lectura text-muted">
            Dirección «Centro de control»: una herramienta de inteligencia que se lee en dos minutos a las 5 a. m. Fondo gris muy claro, superficies blancas en capas,
            un solo color de marca y estados que nunca dependen solo del color.
          </p>
        </header>

        <Seccion id="color" titulo="Color" texto="Todo texto cumple AA (4,5:1 o más). El ratio que ves es contra el fondo de la app. El verde petróleo de marca está lejos del rojo, azul y morado de los partidos.">
          <div className="grid gap-8 xl:grid-cols-2">
            <div>
              <Subtitulo>Marca</Subtitulo>
              <ul className="grid gap-2">
                <Muestra nombre="Marca" hex={c.signal} uso="Acción principal, foco, lo nuevo" />
                <Muestra nombre="Marca hover" hex={c.signalHover} uso="Hover del botón primario" />
                <Muestra nombre="Marca suave" hex={c.signalSuave} uso="Chip activo, fondos de acento" />
              </ul>
              <div className="mt-6">
                <Subtitulo>Neutros</Subtitulo>
                <ul className="grid gap-2">
                  {neutros.map(([n, k, u]) => (
                    <Muestra key={k} nombre={n} hex={c[k]} uso={u} />
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <Subtitulo>Verificación</Subtitulo>
              <ul className="grid gap-2">
                {semanticos.map((s) => (
                  <li key={s.nombre} className="flex items-center gap-3 rounded-control border border-border bg-surface p-2.5">
                    <span className="h-10 w-10 shrink-0 rounded-editorial border border-border" style={{ background: c[s.bg] }} aria-hidden>
                      <span className="m-3 block h-4 w-4 rounded-punto" style={{ background: c[s.fg] }} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <SelloVeredicto veredicto={s.veredicto} />
                    </span>
                    <span className="text-right text-dato tabular">
                      <span className="block font-mono">{c[s.fg]}</span>
                      <span className="block text-muted">{formatoRatio(contraste(c[s.fg], c[s.bg]))} sobre su tinte</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Subtitulo>Línea editorial</Subtitulo>
                <p className="mb-3 text-chico text-muted">Violeta, arena y cobre, cada una con su patrón. Nunca rojo contra azul.</p>
                <ul className="grid gap-2">
                  {(["izquierda", "centro", "derecha"] as const).map((l) => (
                    <li key={l} className="flex items-center gap-3 rounded-control border border-border bg-surface p-2.5">
                      <EtiquetaLinea linea={l} className="flex-1" />
                      <Insignia tono={l}>{nombreLinea[l]}</Insignia>
                      <span className="text-right text-dato tabular">
                        <span className="block font-mono">{c[l]}</span>
                        <span className="block text-muted">{formatoRatio(contraste(c[l], c.bg))}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <BarraDeSesgo className="mt-4" conteo={{ izquierda: 2, centro: 1, derecha: 3, "a-validar": 5 }} />
              </div>
            </div>
          </div>
        </Seccion>

        <Seccion id="tipografia" titulo="Tipografía" texto="Geist para todo; Geist Mono solo para URLs y códigos. Ocho tamaños, ni uno más. Las cifras siempre en números tabulares.">
          <Tarjeta relleno={false}>
            <ul>
              {(Object.entries(tipo) as [keyof typeof tipo, (typeof tipo)[keyof typeof tipo]][]).reverse().map(([k, t]) => (
                <li key={k} className="flex flex-col gap-1 border-b border-border px-4 py-4 last:border-b-0 md:flex-row md:items-baseline md:gap-6 md:px-5">
                  <span className="w-44 shrink-0 text-dato text-muted tabular">
                    <span className="font-medium text-text">{k}</span> {t.size}/{t.line}
                    {"peso" in t ? ` ${t.peso}` : ""}
                  </span>
                  <span className={cn(claseTipo[k], "peso" in t && "font-semibold")}>
                    {k === "dato" ? "Actualizado 04:52 · 9 medios · +64 %" : t.uso}
                  </span>
                </li>
              ))}
            </ul>
          </Tarjeta>
          <p className="mt-3 text-chico text-muted">
            Números tabulares: <span className="tabular font-medium text-text">11:11 · 04:52 · 1.248 · 99 %</span>
          </p>
        </Seccion>

        <Seccion id="forma" titulo="Elevación y forma" texto="Tres niveles de sombra en capas, nunca un gris duro. Todo contenedor lleva borde de 1 px. Tres radios.">
          <div className="grid gap-4 sm:grid-cols-3">
            {(Object.entries(sombra) as [keyof typeof sombra, (typeof sombra)[keyof typeof sombra]][]).map(([k, s]) => (
              <div key={k} className={cn("rounded-panel border border-border bg-surface p-5", { e1: "shadow-e1", e2: "shadow-e2", e3: "shadow-e3" }[k])}>
                <p className="text-chico font-semibold">{k.toUpperCase()}</p>
                <p className="mt-1 text-dato text-muted">{s.uso}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-end gap-6">
            {(["editorial", "control", "panel"] as const).map((r) => (
              <div key={r} className="flex flex-col items-start gap-2">
                <span className={cn("h-14 w-14 border border-border-strong bg-surface-2", { editorial: "rounded-editorial", control: "rounded-control", panel: "rounded-panel" }[r])} aria-hidden />
                <span className="text-dato text-muted tabular">
                  {radio[r]} px {r}
                </span>
              </div>
            ))}
          </div>
        </Seccion>

        <Seccion id="botones" titulo="Botones y chips" texto="Un primario por vista. 44 px de alto en móvil para el dedo; 36 px desde tablet.">
          <Tarjeta className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              <Boton variante="primario">
                <Plus size={16} strokeWidth={2} aria-hidden />
                Agregar fuente
              </Boton>
              <Boton>
                <Download size={16} strokeWidth={1.75} aria-hidden />
                Exportar
              </Boton>
              <Boton variante="fantasma">Cancelar</Boton>
              <Boton variante="peligro">
                <Trash2 size={16} strokeWidth={1.75} aria-hidden />
                Descartar
              </Boton>
              <Boton variante="primario" disabled>
                Deshabilitado
              </Boton>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Boton tamano="sm" variante="primario">
                Pequeño
              </Boton>
              <Boton tamano="sm">Pequeño</Boton>
              <Boton tamano="sm" variante="fantasma">
                Pequeño
              </Boton>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Chip activo>Todos</Chip>
              <Chip>Movilidad</Chip>
              <Chip>Economía</Chip>
              <Chip>Salud</Chip>
            </div>
          </Tarjeta>
        </Seccion>

        <Seccion id="badges" titulo="Badges de estado" texto="Planos, con icono y texto. El veredicto se lee aunque no se vea el color.">
          <Tarjeta className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {(["verificado", "enganoso", "falso", "sin-evidencia", "sin-verificar"] as const).map((v) => (
                <SelloVeredicto key={v} veredicto={v} grande />
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {(["verificado", "enganoso", "falso", "sin-verificar"] as const).map((v) => (
                <SelloVeredicto key={v} veredicto={v} />
              ))}
              <Insignia>Movilidad</Insignia>
              <Insignia tono="marca">Nuevo</Insignia>
              <Insignia tono="izquierda">Izquierda</Insignia>
              <Insignia tono="centro">Centro</Insignia>
              <Insignia tono="derecha">Derecha</Insignia>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <PulsoRadar hora="04:52" />
              <DeltaTendencia tendencia="sube" delta={64} />
              <DeltaTendencia tendencia="baja" delta={-12} />
              <Sparkline datos={[2, 3, 2, 4, 6, 9, 14, 11]} acento />
              <span className="flex items-center gap-2">
                <GlifoTono tono="favor" linea="izquierda" intensidad={3} />
                <GlifoTono tono="neutral" linea="centro" intensidad={2} />
                <GlifoTono tono="contra" linea="derecha" intensidad={3} />
              </span>
            </div>
          </Tarjeta>
        </Seccion>

        <Seccion id="noticias" titulo="Tarjetas de noticia" texto="Tema, territorio y tendencia arriba; titular; resumen; balance de cobertura; fuentes, cuántos medios y el estado de verificación.">
          <div className="grid gap-4 md:grid-cols-2">
            {noticias.slice(0, 2).map((n) => (
              <TarjetaNoticia key={n.id} noticia={n} />
            ))}
          </div>
        </Seccion>

        <Seccion id="fuentes" titulo="Chips de fuente" texto="Iniciales y nombre del medio; con enlace, abren la nota original.">
          <Tarjeta className="flex flex-wrap gap-2">
            {medios.slice(0, 6).map((m) => (
              <ChipFuente key={m.id} medioId={m.id} conLinea />
            ))}
          </Tarjeta>
        </Seccion>

        <Seccion id="tablas" titulo="Tablas" texto="Encabezado fijo cuando la tabla tiene scroll propio, filas con hover y cifras a la derecha.">
          <Tabla>
            <caption className="sr-only">Medios de ejemplo</caption>
            <thead>
              <tr>
                <Th>Medio</Th>
                <Th>Tipo</Th>
                <Th>Línea editorial</Th>
                <Th numerica>Notas hoy</Th>
                <Th numerica>Última lectura</Th>
              </tr>
            </thead>
            <tbody>
              {medios.map((m) => (
                <Fila key={m.id}>
                  <Td className="font-medium">{m.nombre}</Td>
                  <Td className="text-muted">{m.tipo}</Td>
                  <Td>
                    <EtiquetaLinea linea={m.linea} ejemplo={m.lineaEjemplo} />
                  </Td>
                  <Td numerica>{m.notasHoy}</Td>
                  <Td numerica className="text-muted">
                    {m.ultimaLectura}
                  </Td>
                </Fila>
              ))}
            </tbody>
          </Tabla>
        </Seccion>

        <Seccion id="pestanas" titulo="Pestañas y tooltips" texto="El indicador se desliza a la pestaña activa. El tooltip aparece al pasar el mouse o con el foco del teclado, y Escape lo cierra.">
          <Tarjeta className="flex flex-col gap-6">
            <Pestanas
              etiqueta="Ejemplo de pestañas"
              valor={pestana}
              onCambio={setPestana}
              opciones={[
                { id: "hoy", nombre: "Medios" },
                { id: "trends", nombre: "Google Trends" },
                { id: "redes", nombre: "Redes", deshabilitada: true },
              ]}
            />
            <Pestanas
              etiqueta="Ejemplo de control segmentado"
              variante="segmentado"
              valor={vista}
              onCambio={setVista}
              opciones={[
                { id: "tarjetas", nombre: "Tarjetas" },
                { id: "lista", nombre: "Lista" },
                { id: "matriz", nombre: "Matriz" },
              ]}
            />
            <div className="flex flex-wrap gap-3">
              <Tooltip texto="Copiar el gancho al portapapeles">
                <Boton>
                  <Copy size={16} strokeWidth={1.75} aria-hidden />
                  Copiar
                </Boton>
              </Tooltip>
              <Tooltip texto="Confianza del cruce sugerido por la IA" lado="abajo">
                <Boton variante="fantasma">¿Qué es esto?</Boton>
              </Tooltip>
            </div>
          </Tarjeta>
        </Seccion>

        <Seccion id="campos" titulo="Inputs" texto="Etiqueta siempre visible, ayuda debajo y error con icono y texto.">
          <Tarjeta className="grid gap-5 md:grid-cols-2">
            <Campo etiqueta="Correo" ayuda="El de tu campaña.">
              {(a) => <Entrada type="email" placeholder="tu@campaña.co" {...a} />}
            </Campo>
            <Campo etiqueta="Feed RSS" error="Esa dirección no responde.">
              {(a) => <Entrada defaultValue="https://ejemplo.trafiker.local/feed" {...a} />}
            </Campo>
            <Campo etiqueta="Línea editorial" ayuda="Mientras no la valides, queda «a validar».">
              {(a) => (
                <Selector defaultValue="a-validar" {...a}>
                  <option value="a-validar">A validar</option>
                  <option value="izquierda">Izquierda</option>
                  <option value="centro">Centro</option>
                  <option value="derecha">Derecha</option>
                </Selector>
              )}
            </Campo>
            <Campo etiqueta="Territorio">{(a) => <Entrada disabled defaultValue="Bogotá D. C." {...a} />}</Campo>
          </Tarjeta>
        </Seccion>

        <Seccion id="estados" titulo="Vacío y error" texto="Siempre una frase útil y una salida.">
          <div className="grid gap-4 xl:grid-cols-2">
            <EstadoVacio className="my-0 max-w-none" accion={<Boton>Quitar filtros</Boton>} />
            <EstadoError className="my-0 max-w-none" />
          </div>
        </Seccion>

        <Seccion id="movimiento" titulo="Movimiento" texto="Rápido y con propósito. Con «reducir movimiento» activado, todo aparece sin desplazamientos.">
          <Tabla>
            <caption className="sr-only">Duraciones de animación</caption>
            <thead>
              <tr>
                <Th>Uso</Th>
                <Th numerica>Duración</Th>
              </tr>
            </thead>
            <tbody>
              <Fila>
                <Td>Hover, press y foco</Td>
                <Td numerica>{movimiento.base.duracion * 1000} ms</Td>
              </Fila>
              <Fila>
                <Td>Paneles, drawer y pestañas</Td>
                <Td numerica>{movimiento.panel.duracion * 1000} ms</Td>
              </Fila>
              <Fila>
                <Td>Aparición escalonada (entre elementos)</Td>
                <Td numerica>{movimiento.cascada.stagger * 1000} ms</Td>
              </Fila>
            </tbody>
          </Tabla>
          <h3 className="mt-8 mb-3 text-chico font-semibold">Referencias</h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {referencias.map(([n, q]) => (
              <li key={n} className="rounded-control border border-border bg-surface p-3">
                <span className="block text-chico font-semibold">{n}</span>
                <span className="block text-chico text-muted">{q}</span>
              </li>
            ))}
          </ul>
        </Seccion>
      </div>
    </div>
  );
}
