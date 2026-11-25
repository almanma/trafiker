"use client";

import { DatosEjemplo, DeltaTendencia, EtiquetaLinea } from "@/components/firma/Basicos";
import { BarraDeSesgo } from "@/components/firma/BarraDeSesgo";
import { GlifoTono } from "@/components/firma/CeldaMatriz";
import { IconoBalanza, IconoLupa, IconoRadar } from "@/components/firma/Iconos";
import { PulsoRadar } from "@/components/firma/PulsoRadar";
import { SelloVeredicto } from "@/components/firma/SelloVeredicto";
import { Sparkline } from "@/components/firma/Sparkline";
import { Wordmark } from "@/components/firma/Wordmark";
import { Boton, Chip } from "@/components/ui/Boton";
import { contraste, formatoRatio } from "@/lib/contraste";
import { color, tipo } from "@/styles/tokens";

const pares: { nombre: string; clave: keyof typeof color.madrugada; uso: string }[] = [
  { nombre: "Texto", clave: "text", uso: "Papel en la madrugada, tinta en la mañana" },
  { nombre: "Muted", clave: "muted", uso: "Metadatos, ayudas" },
  { nombre: "Señal", clave: "signal", uso: "Solo lo vivo, lo nuevo y el foco" },
  { nombre: "Izquierda", clave: "izquierda", uso: "Línea editorial (violeta, nunca rojo)" },
  { nombre: "Centro", clave: "centro", uso: "Línea editorial (arena)" },
  { nombre: "Derecha", clave: "derecha", uso: "Línea editorial (cobre, nunca azul)" },
  { nombre: "Verificado", clave: "verificado", uso: "Veredicto, con icono y texto" },
  { nombre: "Falso", clave: "falso", uso: "Veredicto, con icono y texto" },
];

const referencias = [
  ["Linear", "https://linear.app/", "Base del modo oscuro (#08090A, #101112, #1C1D1E), densidad, 160 ms y cubic-bezier(0.25,0.46,0.45,0.94), mono en 15,5 % del texto, radios 4/6/8/12."],
  ["Resend", "https://resend.com/", "Serif display grande sobre fondo oscuro, tracking −0,01 em, lectura 18/1,5, paneles a 150–200 ms con cubic-bezier(0.4,0,0.2,1)."],
  ["Financial Times", "https://www.ft.com/", "Estructura editorial, rejilla de 12 columnas con bloques de 3, radios de 2–4 px, papel cálido y sombra en tono papel."],
  ["Raycast", "https://www.raycast.com/", "Brillo hairline en capas flotantes, input de 42 px y radio 8, foco de 2 px."],
  ["The Verge", "https://www.theverge.com/", "Separadores con regla interior de 1 px (inset 0 −1px 0 0) en lugar de sombras."],
  ["Ground News", "https://ground.news/", "Antirreferencia de color: su pareja azul #204986 y rojo #802727 es justo la que Trafiker no usa. Solo se toma la idea de la barra de balance."],
];

function Bloque({ id, titulo, children }: { id: string; titulo: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid gap-6 py-12 shadow-regla md:grid-cols-12">
      <h2 id={id} className="text-tarjeta serif-display md:col-span-3">
        {titulo}
      </h2>
      <div className="min-w-0 md:col-span-9">{children}</div>
    </section>
  );
}

export function VistaGuia() {
  return (
    <div>
      <header className="pb-12 shadow-regla">
        <div className="flex items-center justify-between gap-4">
          <Wordmark alto={56} />
          <DatosEjemplo className="lg:hidden" />
        </div>
        <h1 className="mt-10 max-w-[18ch] text-hero serif-display md:text-portada">La sala de control de la madrugada.</h1>
        <p className="mt-6 max-w-lectura font-serif text-lectura serif-texto text-muted">
          Calma, precisión y criterio editorial. Trafiker se usa a las 5 a. m., con café, para decidir en cinco minutos qué contar hoy. Sobrio y agudo, con un punto de tensión
          periodística: ni corporativo ni «startup alegre».
        </p>
      </header>

      <Bloque id="wordmark" titulo="Wordmark">
        <div className="flex flex-wrap items-end gap-10">
          <Wordmark alto={72} />
          <Wordmark alto={28} />
        </div>
        <p className="mt-4 max-w-lectura text-cuerpo text-muted">
          «Trafi» y «er» en Newsreader; la k está dibujada. Su brazo es un pulso de señal que termina en un punto ámbar: la única nota de color de la marca.
        </p>
      </Bloque>

      <Bloque id="paleta" titulo="Paleta y contraste">
        <div className="grid gap-x-8 md:grid-cols-2">
          {(["madrugada", "manana"] as const).map((modo) => {
            const c = color[modo];
            return (
              <div key={modo}>
                <h3 className="pb-2 text-lectura serif-texto shadow-regla">{modo === "madrugada" ? "Madrugada (oscuro)" : "Edición de mañana (claro)"}</h3>
                <ul>
                  {pares.map((p) => (
                    <li key={p.clave} className="flex items-center gap-3 py-2.5 shadow-regla">
                      <span className="h-8 w-8 shrink-0 rounded-editorial shadow-[inset_0_0_0_1px_var(--t-border-strong)]" style={{ background: c[p.clave] }} aria-hidden />
                      <span className="min-w-0 flex-1">
                        <span className="block text-chico">{p.nombre}</span>
                        <span className="block text-dato text-muted">{p.uso}</span>
                      </span>
                      <span className="text-right font-mono text-dato tabular">
                        <span className="block">{c[p.clave]}</span>
                        <span className="block text-muted">{formatoRatio(contraste(c[p.clave], c.bg))}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 font-mono text-dato text-muted">
                  bg {c.bg} surface {c.surface} surface-2 {c.surface2}
                </p>
              </div>
            );
          })}
        </div>
      </Bloque>

      <Bloque id="tipografia" titulo="Tipografía">
        <ul>
          {(Object.entries(tipo) as [keyof typeof tipo, (typeof tipo)[keyof typeof tipo]][]).reverse().map(([k, t]) => (
            <li key={k} className="flex flex-col gap-1 py-3 shadow-regla md:flex-row md:items-baseline md:gap-6">
              <span className="w-40 shrink-0 font-mono text-dato tabular text-muted">
                {t.size} px {k}
              </span>
              <span
                className={
                  {
                    portada: "text-hero serif-display md:text-portada",
                    hero: "text-secundario serif-display md:text-hero",
                    secundario: "text-secundario serif-display",
                    tarjeta: "font-serif text-tarjeta serif-texto",
                    lectura: "font-serif text-lectura serif-texto",
                    cuerpo: "text-cuerpo",
                    chico: "text-chico",
                    dato: "font-mono text-dato tabular",
                  }[k]
                }
              >
                {k === "dato" ? "04:52 +64 % 9 medios" : k === "cuerpo" || k === "chico" ? "Inter para la interfaz, con tracking de Linear." : "Newsreader en titulares"}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-lectura text-chico text-muted">Ocho tamaños, ni uno más. En móvil, 72 baja a 48 y 48 baja a 32. Lectura a 65 caracteres por línea como máximo.</p>
      </Bloque>

      <Bloque id="forma" titulo="Forma, profundidad y movimiento">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lectura serif-texto">Tres radios</h3>
            <div className="mt-4 flex items-end gap-4">
              {[
                ["rounded-editorial", "3 px noticias"],
                ["rounded-control", "8 px controles"],
                ["rounded-panel", "12 px paneles"],
              ].map(([r, t]) => (
                <div key={r} className="flex flex-col items-start gap-2">
                  <span className={`h-14 w-14 bg-surface-2 shadow-[inset_0_0_0_1px_var(--t-border-strong)] ${r}`} aria-hidden />
                  <span className="font-mono text-dato text-muted">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lectura serif-texto">Sombra solo en lo que flota</h3>
            <div className="mt-4 rounded-panel bg-surface-2 p-4 text-chico shadow-flota">Paleta, drawer, popover, toast.</div>
            <p className="mt-3 text-dato text-muted">Las noticias se separan con reglas de 1 px.</p>
          </div>
          <div>
            <h3 className="text-lectura serif-texto">Movimiento</h3>
            <ul className="mt-3 text-chico">
              <li className="py-1.5 shadow-regla">
                Hover y press <span className="font-mono text-dato text-muted">160 ms</span>
              </li>
              <li className="py-1.5 shadow-regla">
                Paneles <span className="font-mono text-dato text-muted">200 ms</span>
              </li>
              <li className="py-1.5 shadow-regla">
                Cascada del brief <span className="font-mono text-dato text-muted">30 ms 8 px</span>
              </li>
              <li className="py-1.5 shadow-regla">
                Pulso de radar <span className="font-mono text-dato text-muted">2,4 s</span>
              </li>
            </ul>
          </div>
        </div>
      </Bloque>

      <Bloque id="componentes" titulo="Componentes firma">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-chico text-muted">Barra de sesgo</h3>
            <BarraDeSesgo conteo={{ izquierda: 2, centro: 1, derecha: 3, "a-validar": 5 }} />
          </div>
          <div>
            <h3 className="mb-3 text-chico text-muted">Sellos de veredicto</h3>
            <div className="flex flex-wrap gap-3">
              <SelloVeredicto veredicto="verificado" grande />
              <SelloVeredicto veredicto="enganoso" grande />
              <SelloVeredicto veredicto="falso" grande />
              <SelloVeredicto veredicto="sin-evidencia" grande />
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-chico text-muted">Celdas de la matriz</h3>
            <div className="flex items-center gap-2">
              <GlifoTono tono="favor" linea="izquierda" intensidad={3} />
              <GlifoTono tono="neutral" linea="centro" intensidad={2} />
              <GlifoTono tono="contra" linea="derecha" intensidad={3} />
              <GlifoTono tono="contra" linea="derecha" intensidad={1} />
              <GlifoTono linea="centro" />
            </div>
            <div className="mt-3 flex flex-wrap gap-4">
              <EtiquetaLinea linea="izquierda" />
              <EtiquetaLinea linea="centro" />
              <EtiquetaLinea linea="derecha" />
              <EtiquetaLinea linea="a-validar" />
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-chico text-muted">Pulso, tendencia y sparkline</h3>
            <div className="flex flex-wrap items-center gap-6">
              <PulsoRadar hora="04:52" />
              <DeltaTendencia tendencia="sube" delta={64} />
              <Sparkline datos={[2, 3, 2, 4, 6, 9, 14, 11]} acento />
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-chico text-muted">Iconos propios</h3>
            <div className="flex gap-4 text-text">
              <IconoRadar size={28} />
              <IconoBalanza size={28} />
              <IconoLupa size={28} />
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-chico text-muted">Controles</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Boton variante="primario">Primario</Boton>
              <Boton>Secundario</Boton>
              <Boton variante="fantasma">Fantasma</Boton>
              <Chip activo>Chip activo</Chip>
              <Chip>Chip</Chip>
            </div>
          </div>
        </div>
      </Bloque>

      <Bloque id="referencias" titulo="Referencias medidas">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left">
            <caption className="sr-only">Referencias y qué se tomó de cada una</caption>
            <thead>
              <tr className="text-dato text-muted shadow-regla">
                <th scope="col" className="py-2 pr-6 font-normal">Referencia</th>
                <th scope="col" className="py-2 font-normal">Qué se tomó (la medida, no el estilo)</th>
              </tr>
            </thead>
            <tbody>
              {referencias.map(([n, url, que]) => (
                <tr key={n} className="align-top shadow-regla">
                  <td className="py-3 pr-6">
                    <span className="block text-cuerpo">{n}</span>
                    <a href={url} target="_blank" rel="noreferrer" className="font-mono text-dato text-muted underline decoration-border-strong underline-offset-2 hover:text-signal">
                      {url.replace("https://", "")}
                    </a>
                  </td>
                  <td className="max-w-lectura py-3 text-chico">{que}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Bloque>
    </div>
  );
}
