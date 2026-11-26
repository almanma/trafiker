import { ChevronDown, CircleAlert } from "lucide-react";
import { forwardRef, useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Campo de texto: blanco, borde de 1 px, elevación e1; 44 px en móvil, 40 px desde tablet. */
const baseCampo =
  "w-full rounded-control border border-border-strong bg-input px-3 text-cuerpo text-text shadow-e1 placeholder:text-muted transition-colors duration-150 hover:border-muted focus-visible:border-signal aria-[invalid=true]:border-falso disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-muted";
export const claseCampo = `h-11 md:h-10 ${baseCampo}`;
/** Variante compacta para tablas y barras de filtros: 32 px desde tablet. */
export const claseCampoCompacto = `h-11 md:h-8 ${baseCampo} md:text-chico`;

/**
 * Campo con etiqueta, ayuda y error. Pasa el id y aria-describedby al control
 * que recibe como función: <Campo etiqueta="Correo">{(a) => <Entrada {...a} />}</Campo>
 */
export function Campo({
  etiqueta,
  ayuda,
  error,
  className,
  children,
}: {
  etiqueta: string;
  ayuda?: string;
  error?: string;
  className?: string;
  children: (a: { id: string; "aria-describedby"?: string; "aria-invalid"?: boolean }) => ReactNode;
}) {
  const id = useId();
  const idAyuda = `${id}-ayuda`;
  const describe = error || ayuda ? idAyuda : undefined;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-chico font-medium text-text">
        {etiqueta}
      </label>
      {children({ id, "aria-describedby": describe, "aria-invalid": error ? true : undefined })}
      {(error || ayuda) && (
        <p id={idAyuda} className={cn("inline-flex items-center gap-1 text-dato", error ? "text-falso" : "text-muted")}>
          {error && <CircleAlert size={12} strokeWidth={2} aria-hidden />}
          {error ?? ayuda}
        </p>
      )}
    </div>
  );
}

export const Entrada = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { compacto?: boolean }>(function Entrada({ className, compacto, ...p }, ref) {
  return <input ref={ref} className={cn(compacto ? claseCampoCompacto : claseCampo, className)} {...p} />;
});

/** Select nativo (accesible y rápido en móvil) con la piel del sistema. */
export const Selector = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement> & { compacto?: boolean }>(function Selector({ className, compacto, ...p }, ref) {
  return (
    <span className="relative inline-flex w-full">
      <select ref={ref} className={cn(compacto ? claseCampoCompacto : claseCampo, "appearance-none pr-9", className)} {...p} />
      <ChevronDown size={16} strokeWidth={1.75} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
    </span>
  );
});
