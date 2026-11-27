"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useState, type KeyboardEvent } from "react";
import { toast } from "sonner";
import { ConfianzaIA, DatosEjemplo } from "@/components/firma/Basicos";
import { TarjetaIdea, textoIdea } from "@/components/firma/TarjetaIdea";
import { BotonCopiar } from "@/components/ui/BotonCopiar";
import { Drawer } from "@/components/ui/Dialogo";
import { useApp } from "@/components/shell/Estado";
import { cn } from "@/lib/cn";
import { columnasIdea, nombreFormato } from "@/mocks/ideas";
import type { ColumnaIdea, Idea } from "@/mocks/tipos";

const orden = columnasIdea.map((c) => c.id) as ColumnaIdea[];
const nombreCol = Object.fromEntries(columnasIdea.map((c) => [c.id, c.nombre])) as Record<ColumnaIdea, string>;

function Tarjeta({ idea, onVerGuion, onMover }: { idea: Idea; onVerGuion: () => void; onMover: (dir: -1 | 1) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: idea.id });
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      onMover(e.key === "ArrowRight" ? 1 : -1);
      return;
    }
    if (e.key === "Enter") {
      onVerGuion();
      return;
    }
    listeners?.onKeyDown?.(e);
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      role="listitem"
      {...listeners}
      onKeyDown={onKeyDown}
      aria-describedby="instrucciones-kanban"
      aria-label={`${idea.titulo}. ${nombreFormato[idea.formato]}. En ${nombreCol[idea.columna]}.`}
      style={transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined}
      className={cn(
        "cursor-grab touch-none rounded-panel transition-[transform,box-shadow] duration-150 ease-[var(--ease-base)] active:cursor-grabbing",
        isDragging && "relative z-20 rotate-1 shadow-e3",
      )}
    >
      <TarjetaIdea idea={idea} onVerGuion={onVerGuion} className={cn("transition-shadow hover:shadow-e2", isDragging && "shadow-e3")} />
    </div>
  );
}

function Columna({ id, ideas, children }: { id: ColumnaIdea; ideas: Idea[]; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <section
      ref={setNodeRef}
      aria-labelledby={`col-${id}`}
      className={cn(
        "flex min-h-48 flex-col rounded-panel border border-transparent bg-surface-2 p-2.5 transition-colors duration-150",
        isOver && "border-signal bg-signal-suave",
      )}
    >
      <div className="flex items-center justify-between px-1.5 pb-2.5 pt-1">
        <h2 id={`col-${id}`} className="text-chico font-semibold">
          {nombreCol[id]}
        </h2>
        <span className="grid h-5 min-w-5 place-items-center rounded-pildora bg-surface px-1.5 text-dato font-medium text-muted tabular" aria-label={`${ideas.length} ideas`}>
          {ideas.length}
        </span>
      </div>
      <div role="list" aria-label={nombreCol[id]} className="flex flex-col gap-2.5">
        {children}
        {ideas.length === 0 && <p className="rounded-control border border-dashed border-border-strong px-3 py-6 text-center text-chico text-muted">Arrastra aquí una idea.</p>}
      </div>
    </section>
  );
}

function Guion({ idea }: { idea: Idea }) {
  return (
    <div className="grid gap-6 p-5 md:grid-cols-[240px_minmax(0,1fr)] md:p-6">
      <div className="mx-auto aspect-[9/19] w-60 rounded-[28px] border border-border-strong bg-text p-2 shadow-e2" aria-hidden>
        <div className="flex h-full flex-col overflow-hidden rounded-[22px] bg-surface p-4">
          <div className="mx-auto mb-4 h-1 w-10 rounded-pildora bg-border-strong" />
          <p className="text-dato text-muted">
            {nombreFormato[idea.formato]} {idea.duracion && <span className="tabular">{idea.duracion}</span>}
          </p>
          <p className="mt-2 text-cuerpo font-semibold">{idea.gancho}</p>
          <p className="mt-auto text-dato text-muted">Fuente: {idea.dato.fuente}</p>
        </div>
      </div>
      <div>
        <h2 className="text-secundario">{idea.titulo}</h2>
        <dl className="mt-3 grid gap-2 text-chico">
          <div className="flex gap-2">
            <dt className="w-16 shrink-0 text-muted">Ángulo</dt>
            <dd>{idea.angulo}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-16 shrink-0 text-muted">Tono</dt>
            <dd>{idea.tono}</dd>
          </div>
        </dl>
        <h3 className="mt-6 text-chico font-semibold">Guion</h3>
        <ol className="mt-2 flex flex-col gap-2">
          {idea.guion.length ? (
            idea.guion.map((g, k) => (
              <li key={g} className="flex gap-3 rounded-control border border-border bg-surface-2 px-3 py-2 text-chico">
                <span className="text-dato font-semibold text-muted tabular">{k + 1}</span>
                {g}
              </li>
            ))
          ) : (
            <li className="text-chico text-muted">Sin guion todavía.</li>
          )}
        </ol>
        <p className="mt-4 text-dato text-muted">
          Dato de partida: <span className="text-text">{idea.dato.texto}</span>{" "}
          <a href={idea.dato.url} target="_blank" rel="noreferrer" className="font-medium text-signal hover:underline">
            {idea.dato.fuente}
          </a>
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <BotonCopiar texto={[textoIdea(idea), "", "Guion:", ...idea.guion].join("\n")} etiqueta="Copiar idea y guion" />
          <ConfianzaIA valor={idea.confianza} />
        </div>
      </div>
    </div>
  );
}

export function VistaIdeas() {
  const { ideas, moverIdea } = useApp();
  const [abierta, setAbierta] = useState<string | null>(null);
  const sensores = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }), useSensor(KeyboardSensor));
  const ideaAbierta = ideas.find((i) => i.id === abierta);

  const mover = (idea: Idea, a: ColumnaIdea) => {
    if (idea.columna === a) return;
    const antes = idea.columna;
    moverIdea(idea.id, a);
    toast.success(`Movida a ${nombreCol[a]}`, {
      description: idea.titulo,
      action: { label: "Deshacer", onClick: () => moverIdea(idea.id, antes) },
    });
  };
  const onDragEnd = (e: DragEndEvent) => {
    const idea = ideas.find((i) => i.id === e.active.id);
    if (idea && e.over) mover(idea, e.over.id as ColumnaIdea);
  };

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4 pb-6">
        <div>
          <h1 className="text-hero">Ideas</h1>
          <p className="mt-2 max-w-lectura text-cuerpo text-muted">
            Lo que la IA sugiere publicar hoy, con su gancho y su dato de partida. Tú decides qué pasa a producción.
          </p>
        </div>
        <DatosEjemplo className="lg:hidden" />
      </header>
      <p id="instrucciones-kanban" className="mb-4 max-w-lectura text-dato text-muted">
        Arrastra con el mouse, o enfoca una tarjeta y usa las flechas izquierda y derecha para cambiarla de columna. Enter abre su guion.
      </p>

      <DndContext sensors={sensores} onDragEnd={onDragEnd} accessibility={{ screenReaderInstructions: { draggable: "Pulsa espacio para tomar la tarjeta, flechas para moverla y espacio para soltarla." } }}>
        <div className="grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {orden.map((col) => {
            const lista = ideas.filter((i) => i.columna === col);
            return (
              <Columna key={col} id={col} ideas={lista}>
                {lista.map((i) => (
                  <Tarjeta
                    key={i.id}
                    idea={i}
                    onVerGuion={() => setAbierta(i.id)}
                    onMover={(dir) => {
                      const k = orden.indexOf(i.columna) + dir;
                      if (k >= 0 && k < orden.length) mover(i, orden[k]);
                    }}
                  />
                ))}
              </Columna>
            );
          })}
        </div>
      </DndContext>

      <Drawer abierto={!!ideaAbierta} onCambio={(v) => !v && setAbierta(null)} titulo={ideaAbierta ? `Guion: ${ideaAbierta.titulo}` : "Guion"}>
        {ideaAbierta && <Guion idea={ideaAbierta} />}
      </Drawer>
    </div>
  );
}
