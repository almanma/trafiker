import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { EstadoPantalla } from "@/components/firma/Estados";
import { SkeletonLista } from "@/components/firma/Skeletons";
import { DatosEjemplo } from "@/components/firma/Basicos";

export const metadata: Metadata = { title: "Showcase" };

const pantallas = [
  { ruta: "/hoy", nombre: "Hoy", archivo: "hoy", que: "El brief de las 5 a. m." },
  { ruta: "/matriz", nombre: "Matriz de cobertura", archivo: "matriz", que: "La pantalla firma" },
  { ruta: "/noticia/cupo-endeudamiento-bogota", nombre: "Detalle de noticia", archivo: "noticia", que: "También se abre como drawer" },
  { ruta: "/tendencias", nombre: "Tendencias", archivo: "tendencias", que: "Streamgraph y ranking" },
  { ruta: "/verificacion", nombre: "Verificación", archivo: "verificacion", que: "Expedientes con sello" },
  { ruta: "/ideas", nombre: "Ideas", archivo: "ideas", que: "Kanban y guion" },
  { ruta: "/fuentes", nombre: "Fuentes", archivo: "fuentes", que: "Salud de los feeds" },
  { ruta: "/onboarding", nombre: "Configurar campaña", archivo: "onboarding", que: "Wizard de cuatro pasos" },
  { ruta: "/login", nombre: "Acceso", archivo: "login", que: "Login" },
  { ruta: "/login/2fa", nombre: "Segundo factor", archivo: "login-2fa", que: "Código de seis dígitos" },
  { ruta: "/guia", nombre: "Guía de marca", archivo: "guia", que: "Tokens y referencias" },
];

export default function PaginaShowcase() {
  return (
    <Suspense fallback={<SkeletonLista />}>
      <EstadoPantalla esqueleto={<SkeletonLista />}>
        <Galeria />
      </EstadoPantalla>
    </Suspense>
  );
}

function Galeria() {
  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4 pb-8 shadow-regla">
        <div>
          <h1 className="text-secundario titular md:text-hero">Showcase</h1>
          <p className="mt-3 max-w-lectura text-cuerpo text-muted">
            Todas las pantallas en escritorio (1440 px) y móvil (390 px). Prueba los estados con <span className="font-mono text-dato">?estado=vacio</span>,{" "}
            <span className="font-mono text-dato">carga</span>, <span className="font-mono text-dato">error</span> o{" "}
            <span className="font-mono text-dato">sin-conexion</span>.
          </p>
        </div>
        <DatosEjemplo />
      </header>

      <ul className="grid gap-x-8 md:grid-cols-2">
        {pantallas.map((p, i) => (
          <li key={p.ruta} className={i === 0 ? "py-8 shadow-regla md:col-span-2" : "py-8 shadow-regla"}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-tarjeta titular">
                <Link href={p.ruta} className="inline-flex min-h-11 items-center hover:text-signal">
                  {p.nombre}
                </Link>
              </h2>
              <span className="font-mono text-dato text-muted">{p.ruta}</span>
            </div>
            <p className="mt-1 text-chico text-muted">{p.que}</p>
            <div className="mt-4 flex items-start gap-4">
              <Link href={p.ruta} className="block min-w-0 flex-[4] overflow-hidden rounded-editorial shadow-[inset_0_0_0_1px_var(--t-border-strong)]" aria-label={`${p.nombre}, escritorio`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/showcase/${p.archivo}-escritorio.png`} alt={`Captura de ${p.nombre} en escritorio`} width={1440} height={900} loading="lazy" className="h-auto w-full" />
              </Link>
              <Link href={p.ruta} className="block w-[22%] min-w-16 overflow-hidden rounded-control shadow-[inset_0_0_0_1px_var(--t-border-strong)]" aria-label={`${p.nombre}, móvil`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/showcase/${p.archivo}-movil.png`} alt={`Captura de ${p.nombre} en móvil`} width={390} height={844} loading="lazy" className="h-auto w-full" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
