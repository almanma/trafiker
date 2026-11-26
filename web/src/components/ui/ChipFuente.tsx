import { cn } from "@/lib/cn";
import { medioPorId } from "@/mocks/medios";
import { MuestraLinea } from "../firma/BarraDeSesgo";

/**
 * Chip de fuente: iniciales + nombre del medio (+ muestra de su línea
 * editorial si se pide). Si lleva `href`, enlaza a la nota original.
 */
export function ChipFuente({ medioId, href, conLinea = false, className }: { medioId: string; href?: string; conLinea?: boolean; className?: string }) {
  const m = medioPorId[medioId];
  if (!m) return null;
  const clases = cn(
    "inline-flex h-7 max-w-full items-center gap-1.5 rounded-control border border-border bg-surface pl-1 pr-2 text-dato font-medium text-text",
    href && "transition-colors duration-150 hover:border-border-strong hover:bg-surface-2",
    className,
  );
  const contenido = (
    <>
      <span className="grid h-5 min-w-5 place-items-center rounded-[4px] bg-surface-2 px-0.5 text-dato font-semibold text-muted" aria-hidden>
        {m.inicial}
      </span>
      <span className="truncate">{m.nombre}</span>
      {conLinea && <MuestraLinea linea={m.linea} />}
    </>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={clases}>
      {contenido}
    </a>
  ) : (
    <span className={clases}>{contenido}</span>
  );
}
