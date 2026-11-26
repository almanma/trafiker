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
import { ConfianzaIA, DatosEjemplo, Meta } from "@/components/firma/Basicos";
import { TarjetaIdea } from "@/components/firma/TarjetaIdea";
import { useApp } from "@/components/shell/Estado";
import { cn } from "@/lib/cn";
import { columnasIdea, nombreFormato } from "@/mocks/ideas";
import type { ColumnaIdea, Idea } from "@/mocks/tipos";

const orden = columnasIdea.map((c) => c.id) as ColumnaIdea[];
const nombreCol = Object.fromEntries(columnasIdea.map((c) => [c.id, c.nombre])) as Record<ColumnaIdea, string>;

function Tarjeta({ idea, activa, onSeleccionar, onMover }: { idea: Idea; activa: boolean; onSeleccionar: () => void; onMover: (dir: -1 | 1) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: idea.id });
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      onMover(e.key === "ArrowRight" ? 1 : -1);
      return;
    }
    if (e.key === "Enter") {
      onSeleccionar();
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
      onClick={onSeleccionar}
      aria-describedby="instrucciones-kanban"
      aria-label={`${idea.titulo}. ${nombreFormato[idea.formato]}. En ${nombreCol[idea.columna]}.`}
      style={transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined}
      className={cn(
        "cursor-grab touch-none rounded-control transition-[transform,box-shadow] duration-150 ease-[var(--ease-base)] active:cursor-grabbing",
        isDragging && "relative z-20 -translate-y-0.5 shadow-flota",
        activa && "outline outline-2 outline-offset-2 outline-border-strong",
      )}
    >
      <TarjetaIdea idea={idea} />
    </div>
  );
}

function Columna({ id, ideas, children }: { id: ColumnaIdea; ideas: Idea[]; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <section
      ref={setNodeRef}
      aria-labelledby={`col-${id}`}
      className={cn("flex min-h-48 flex-col rounded-editorial px-1 pb-4 transition-colors duration-150", isOver && "bg-surface")}
    >
      <div className="flex items-baseline justify-between pb-3 shadow-regla">
        <h2 id={`col-${id}`} className="text-lectura">
          {nombreCol[id]}
        </h2>
        <span className="font-mono text-dato tabular text-muted" aria-label={`${ideas.length} ideas`}>
          {ideas.length}
        </span>
      </div>
      <div role="list" aria-label={nombreCol[id]} className="mt-4 flex flex-col gap-4">
        {children}
        {ideas.length === 0 && <p className="py-6 text-chico text-muted">Arrastra aquí una idea.</p>}
      </div>
    </section>
  );
}

function Telefono({ idea }: { idea: Idea | undefined }) {
  if (!idea) return null;
  return (
    <aside aria-labelledby="guion" className="lg:sticky lg:top-20">
      <h2 id="guion" className="pb-3 text-tarjeta shadow-regla">
        Vista previa del guion
      </h2>
      <div className="mt-4 flex justify-center">
        <div className="relative aspect-[9/19] w-60 rounded-panel bg-bg p-2 shadow-flota">
          <div className="flex h-full flex-col overflow-hidden rounded-control bg-surface-2 p-4">
            <div className="mx-auto mb-4 h-1 w-10 rounded-punto bg-border-strong" aria-hidden />
            <p className="text-dato text-muted">
              {nombreFormato[idea.formato]} {idea.duracion && <span className="font-mono">{idea.duracion}</span>}
            </p>
            <p className="mt-2 text-lectura">{idea.gancho}</p>
            <ol className="mt-4 flex flex-col gap-2 overflow-y-auto">
              {idea.guion.length ? (
                idea.guion.map((g) => (
                  <li key={g} className="text-dato text-text">
                    {g}
                  </li>
                ))
              ) : (
                <li className="text-dato text-muted">Sin guion todavía.</li>
              )}
            </ol>
            <p className="mt-auto pt-3 text-dato text-muted">
              Fuente <a href={idea.dato.url} target="_blank" rel="noreferrer" className="text-signal underline">{idea.dato.fuente}</a>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-2 text-chico">
        <Meta etiqueta="Ángulo">{idea.angulo}</Meta>
        <Meta etiqueta="Tono">{idea.tono}</Meta>
        <ConfianzaIA valor={idea.confianza} />
      </div>
    </aside>
  );
}

export function VistaIdeas() {
  const { ideas, moverIdea } = useApp();
  const [sel, setSel] = useState<string>(ideas[0]?.id);
  const sensores = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }), useSensor(KeyboardSensor));

  const mover = (idea: Idea, a: ColumnaIdea) => {
    if (idea.columna === a) return;
    moverIdea(idea.id, a);
    toast(`Movida a ${nombreCol[a]}`, { description: idea.titulo });
  };
  const onDragEnd = (e: DragEndEvent) => {
    const idea = ideas.find((i) => i.id === e.active.id);
    if (idea && e.over) mover(idea, e.over.id as ColumnaIdea);
  };

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4 pb-6">
        <div>
          <h1 className="text-secundario titular md:text-hero">Ideas</h1>
          <p className="mt-3 max-w-lectura text-cuerpo text-muted">
            Lo que la IA sugiere publicar hoy, con su gancho y su dato de partida. Tú decides qué pasa a producción.
          </p>
        </div>
        <DatosEjemplo className="lg:hidden" />
      </header>
      <p id="instrucciones-kanban" className="mb-6 max-w-lectura text-dato text-muted">
        Arrastra con el mouse, o enfoca una tarjeta y usa las flechas izquierda y derecha para cambiarla de columna. Enter muestra su guion.
      </p>

      <div className="grid gap-10 lg:grid-cols-12">
        <DndContext sensors={sensores} onDragEnd={onDragEnd} accessibility={{ screenReaderInstructions: { draggable: "Pulsa espacio para tomar la tarjeta, flechas para moverla y espacio para soltarla." } }}>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-9 xl:grid-cols-4">
            {orden.map((col) => {
              const lista = ideas.filter((i) => i.columna === col);
              return (
                <Columna key={col} id={col} ideas={lista}>
                  {lista.map((i) => (
                    <Tarjeta
                      key={i.id}
                      idea={i}
                      activa={sel === i.id}
                      onSeleccionar={() => setSel(i.id)}
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
        <div className="lg:col-span-3">
          <Telefono idea={ideas.find((i) => i.id === sel)} />
        </div>
      </div>
    </div>
  );
}
