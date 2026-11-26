"use client";

import * as Popover from "@radix-ui/react-popover";
import { Command } from "cmdk";
import * as D from "@radix-ui/react-dialog";
import { CalendarDays, Check, ChevronDown, Menu, Moon, Search, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Toaster } from "sonner";
import { cn } from "@/lib/cn";
import { fechaCorta } from "@/lib/fecha";
import { campanas } from "@/mocks/campanas";
import { noticias, noticiaPorId } from "@/mocks/noticias";
import { DatosEjemplo } from "../firma/Basicos";
import { DetalleNoticia } from "../firma/DetalleNoticia";
import { Wordmark } from "../firma/Wordmark";
import { Dialogo, Drawer } from "../ui/Dialogo";
import { useApp } from "./Estado";
import { atajos, secciones, secundarias } from "./Navegacion";

function activa(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

/* ───────────── Riel lateral (escritorio) ───────────── */
function Riel() {
  const pathname = usePathname();
  return (
    <nav aria-label="Secciones" className="sticky top-0 hidden h-dvh w-[88px] shrink-0 flex-col items-stretch py-5 shadow-[inset_-1px_0_0_0_var(--t-border)] md:flex">
      <Link href="/hoy" className="mx-auto mb-8 grid h-11 w-11 place-items-center rounded-control" aria-label="Trafiker, ir a Hoy">
        <svg width="28" height="28" viewBox="0 0 36 36" aria-hidden className="text-text">
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 6 V30" strokeWidth="2.6" />
            <path d="M11.5 21 H15 L17.4 15 L20.2 24 L22.8 10" strokeWidth="1.8" />
            <path d="M14.5 20 L24 30" strokeWidth="2.4" />
          </g>
          <circle cx="23.6" cy="9" r="2.2" className="fill-signal" />
        </svg>
      </Link>
      <ul className="flex flex-col gap-1">
        {secciones.map((s) => {
          const on = activa(pathname, s.href);
          return (
            <li key={s.href}>
              <Link
                href={s.href}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "group relative flex flex-col items-center gap-1 px-2 py-2.5 text-dato transition-colors duration-150 ease-[var(--ease-base)]",
                  on ? "text-text shadow-senal-izq" : "text-muted hover:text-text",
                )}
              >
                <s.Icono size={20} strokeWidth={1.5} aria-hidden />
                <span>{s.nombre}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <ul className="mt-auto flex flex-col gap-1">
        {secundarias.map((s) => {
          const on = activa(pathname, s.href);
          return (
            <li key={s.href}>
              <Link
                href={s.href}
                aria-current={on ? "page" : undefined}
                title={s.nombre}
                className={cn("flex flex-col items-center gap-1 px-2 py-2 text-dato", on ? "text-text shadow-senal-izq" : "text-muted hover:text-text")}
              >
                <s.Icono size={18} strokeWidth={1.5} aria-hidden />
                <span className="text-center leading-tight">{s.nombre.split(" ")[0]}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ───────────── Barra inferior (móvil) ───────────── */
function BarraInferior() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  return (
    <>
      <nav aria-label="Secciones" className="fixed inset-x-0 bottom-0 z-30 bg-bg pb-[env(safe-area-inset-bottom)] shadow-regla-arriba md:hidden">
        <ul className="grid grid-cols-6">
          {secciones
            .filter((s) => s.movil)
            .map((s) => {
              const on = activa(pathname, s.href);
              return (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    aria-current={on ? "page" : undefined}
                    className={cn("flex min-h-14 flex-col items-center justify-center gap-0.5 text-dato", on ? "text-text shadow-senal-arriba" : "text-muted")}
                  >
                    <s.Icono size={20} strokeWidth={1.5} aria-hidden />
                    <span className="max-w-full truncate px-0.5">{s.nombre === "Verificación" ? "Verificar" : s.nombre}</span>
                  </Link>
                </li>
              );
            })}
          <li>
            <button type="button" onClick={() => setMenu(true)} className="flex min-h-14 w-full flex-col items-center justify-center gap-0.5 text-dato text-muted" aria-haspopup="dialog">
              <Menu size={20} strokeWidth={1.5} aria-hidden />
              <span>Menú</span>
            </button>
          </li>
        </ul>
      </nav>
      <Dialogo abierto={menu} onCambio={setMenu} titulo="Menú">
        <ul className="flex flex-col">
          {[secciones[5], ...secundarias].map((s) => (
            <li key={s.href}>
              <Link href={s.href} onClick={() => setMenu(false)} className="flex min-h-11 items-center gap-3 py-2 text-cuerpo shadow-regla">
                <s.Icono size={18} strokeWidth={1.5} aria-hidden className="text-muted" />
                {s.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </Dialogo>
    </>
  );
}

/* ───────────── Barra superior ───────────── */
function Selector({ icono, valor, children, etiqueta }: { icono?: ReactNode; valor: string; children: (cerrar: () => void) => ReactNode; etiqueta: string }) {
  const [abierto, setAbierto] = useState(false);
  return (
    <Popover.Root open={abierto} onOpenChange={setAbierto}>
      <Popover.Trigger
        aria-label={etiqueta}
        className="inline-flex min-h-11 max-w-[11rem] items-center gap-1.5 rounded-control px-2.5 text-chico text-text hover:bg-surface-2 md:min-h-9 md:max-w-none"
      >
        {icono}
        <span className="truncate">{valor}</span>
        <ChevronDown size={14} strokeWidth={1.5} className="shrink-0 text-muted" aria-hidden />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="start" sideOffset={6} collisionPadding={16} className="z-50 min-w-56 rounded-panel bg-surface-2 p-1.5 shadow-flota">
          {children(() => setAbierto(false))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function Opcion({ activa, children, onClick }: { activa: boolean; children: ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex min-h-11 w-full items-center justify-between gap-4 rounded-control px-2.5 text-left text-chico hover:bg-surface md:min-h-9">
      {children}
      {activa && <Check size={14} strokeWidth={1.5} className="text-signal" aria-hidden />}
    </button>
  );
}

const fechas = ["2026-11-24", "2026-11-23", "2026-11-22", "2026-11-21"];

function BarraSuperior() {
  const { campanaId, setCampanaId, tema, alternarTema, setPaletaAbierta } = useApp();
  const [fecha, setFecha] = useState(fechas[0]);
  const campana = campanas.find((c) => c.id === campanaId)!;
  return (
    <header className="sticky top-0 z-20 bg-bg shadow-regla">
      <div className="mx-auto flex h-14 max-w-contenido items-center gap-1 px-2 md:gap-2 md:px-8">
        <Link href="/hoy" className="mr-1 flex min-h-11 items-center rounded-control px-1 md:hidden" aria-label="Trafiker, ir a Hoy">
          <Wordmark alto={22} />
        </Link>
        <Selector etiqueta="Territorio o campaña" valor={campana.nombre}>
          {(cerrar) =>
            campanas.map((c) => (
              <Opcion
                key={c.id}
                activa={c.id === campanaId}
                onClick={() => {
                  setCampanaId(c.id);
                  cerrar();
                }}
              >
                <span>
                  {c.nombre} <span className="text-muted">{c.cargo}</span>
                </span>
              </Opcion>
            ))
          }
        </Selector>
        <div className="hidden sm:block">
          <Selector etiqueta="Fecha del brief" icono={<CalendarDays size={14} strokeWidth={1.5} className="text-muted" aria-hidden />} valor={fechaCorta(fecha)}>
            {(cerrar) =>
              fechas.map((f) => (
                <Opcion
                  key={f}
                  activa={f === fecha}
                  onClick={() => {
                    setFecha(f);
                    cerrar();
                  }}
                >
                  <span className="font-mono text-dato tabular">{fechaCorta(f)}</span>
                </Opcion>
              ))
            }
          </Selector>
        </div>
        <span className="ml-auto hidden lg:block">
          <DatosEjemplo />
        </span>
        <button
          type="button"
          onClick={() => setPaletaAbierta(true)}
          className="ml-auto inline-flex min-h-11 items-center gap-2 rounded-control bg-input px-2.5 text-chico text-muted shadow-[inset_0_0_0_1px_var(--t-border)] hover:text-text md:min-h-9 lg:ml-3"
          aria-label="Abrir la paleta de comandos"
        >
          <Search size={14} strokeWidth={1.5} aria-hidden />
          <span className="hidden md:inline">Buscar o ir a</span>
          <kbd className="hidden font-mono text-dato md:inline">⌘K</kbd>
        </button>
        <button
          type="button"
          onClick={alternarTema}
          className="grid h-11 w-11 place-items-center rounded-control text-muted hover:bg-surface-2 hover:text-text md:h-9 md:w-9"
          aria-label={tema === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {tema === "dark" ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
        </button>
      </div>
    </header>
  );
}

/* ───────────── Paleta de comandos ───────────── */
function Paleta() {
  const { paletaAbierta, setPaletaAbierta, abrirNoticia, alternarTema, setAyudaAbierta } = useApp();
  const router = useRouter();
  const ir = (href: string) => {
    setPaletaAbierta(false);
    router.push(href);
  };
  const itemCls = "flex min-h-11 cursor-pointer items-center gap-3 rounded-control px-3 text-chico text-text data-[selected=true]:bg-surface md:min-h-9";
  const grupoCls = "px-1 pb-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-dato [&_[cmdk-group-heading]]:text-muted";
  return (
    <D.Root open={paletaAbierta} onOpenChange={setPaletaAbierta}>
      <D.Portal>
        <D.Overlay className="fixed inset-0 z-40 bg-bg opacity-60" />
        <D.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-[10vh] z-50 w-[calc(100vw-32px)] max-w-xl -translate-x-1/2 overflow-hidden rounded-panel bg-surface-2 shadow-flota backdrop-blur-xl"
        >
          <D.Title className="sr-only">Paleta de comandos</D.Title>
          <Command label="Paleta de comandos" loop>
            <div className="flex items-center gap-2 px-4 shadow-regla">
              <Search size={16} strokeWidth={1.5} className="text-muted" aria-hidden />
              <Command.Input placeholder="Busca una noticia, sección o acción" className="h-12 w-full bg-transparent text-cuerpo text-text outline-none placeholder:text-muted" />
            </div>
            <Command.List className="max-h-[60vh] overflow-y-auto py-2">
              <Command.Empty className="px-4 py-6 text-chico text-muted">Nada con ese nombre. Prueba con un tema o un medio.</Command.Empty>
              <Command.Group heading="Ir a" className={grupoCls}>
                {[...secciones, ...secundarias].map((s) => (
                  <Command.Item key={s.href} value={`ir ${s.nombre}`} onSelect={() => ir(s.href)} className={itemCls}>
                    <s.Icono size={16} strokeWidth={1.5} aria-hidden className="text-muted" />
                    {s.nombre}
                  </Command.Item>
                ))}
              </Command.Group>
              <Command.Group heading="Noticias de hoy" className={grupoCls}>
                {noticias.map((n) => (
                  <Command.Item
                    key={n.id}
                    value={`${n.titular} ${n.tema}`}
                    onSelect={() => {
                      setPaletaAbierta(false);
                      abrirNoticia(n.id);
                    }}
                    className={itemCls}
                  >
                    <span className="truncate">{n.titular}</span>
                  </Command.Item>
                ))}
              </Command.Group>
              <Command.Group heading="Acciones" className={grupoCls}>
                <Command.Item value="cambiar tema claro oscuro" onSelect={() => { alternarTema(); setPaletaAbierta(false); }} className={itemCls}>
                  Cambiar tema claro u oscuro
                </Command.Item>
                <Command.Item value="ayuda atajos teclado" onSelect={() => { setPaletaAbierta(false); setAyudaAbierta(true); }} className={itemCls}>
                  Ver atajos de teclado
                </Command.Item>
                <Command.Item value="cerrar sesion salir" onSelect={() => ir("/login")} className={itemCls}>
                  Cerrar sesión
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        </D.Content>
      </D.Portal>
    </D.Root>
  );
}

/* ───────────── Atajos globales ───────────── */
function esCampoDeTexto(t: EventTarget | null) {
  const el = t as HTMLElement | null;
  return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable);
}

function AtajosGlobales() {
  const { setPaletaAbierta, setAyudaAbierta } = useApp();
  const router = useRouter();
  const g = useRef<number>(0);
  useEffect(() => {
    const rutas: Record<string, string> = { h: "/hoy", m: "/matriz", t: "/tendencias", i: "/ideas", f: "/fuentes", v: "/verificacion" };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletaAbierta(true);
        return;
      }
      if (esCampoDeTexto(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "?") {
        setAyudaAbierta(true);
        return;
      }
      const k = e.key.toLowerCase();
      if (Date.now() - g.current < 1200 && rutas[k]) {
        g.current = 0;
        e.preventDefault();
        e.stopImmediatePropagation();
        router.push(rutas[k]);
        return;
      }
      if (k === "g") g.current = Date.now();
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, [router, setPaletaAbierta, setAyudaAbierta]);
  return null;
}

function Ayuda() {
  const { ayudaAbierta, setAyudaAbierta } = useApp();
  return (
    <Dialogo abierto={ayudaAbierta} onCambio={setAyudaAbierta} titulo="Atajos de teclado" descripcion="Trafiker se maneja sin soltar el teclado.">
      <dl className="grid grid-cols-[auto_1fr] gap-x-6">
        {atajos.map((a) => (
          <div key={a.que} className="contents">
            <dt className="flex gap-1 py-2 shadow-regla">
              {a.teclas.map((t) => (
                <kbd key={t} className="min-w-6 rounded-editorial bg-surface px-1.5 text-center font-mono text-dato shadow-[inset_0_-1px_0_0_var(--t-border-strong)]">
                  {t}
                </kbd>
              ))}
            </dt>
            <dd className="py-2 text-chico text-muted shadow-regla">{a.que}</dd>
          </div>
        ))}
      </dl>
    </Dialogo>
  );
}

function DrawerGlobal() {
  const { noticiaAbierta, abrirNoticia } = useApp();
  const n = noticiaAbierta ? noticiaPorId[noticiaAbierta] : null;
  return (
    <Drawer abierto={!!n} onCambio={(v) => !v && abrirNoticia(null)} titulo={n?.titular ?? "Detalle"}>
      {n && <DetalleNoticia noticia={n} enDrawer />}
    </Drawer>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 flex min-h-dvh">
      <Riel />
      <div className="min-w-0 flex-1">
        <BarraSuperior />
        <main id="contenido" className="mx-auto max-w-contenido px-4 pb-28 pt-6 md:px-8 md:pb-16 md:pt-10">
          {children}
        </main>
      </div>
      <BarraInferior />
      <Paleta />
      <Ayuda />
      <DrawerGlobal />
      <AtajosGlobales />
      <Toaster
        position="bottom-right"
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: "flex w-[calc(100vw-32px)] max-w-sm flex-col gap-0.5 rounded-panel bg-surface-2 px-4 py-3 text-chico text-text shadow-flota md:w-96",
            title: "text-chico font-medium",
            description: "text-dato text-muted",
          },
        }}
        offset={{ bottom: 88, right: 16 }}
      />
    </div>
  );
}
