import type { ReactNode } from "react";
import { DatosEjemplo } from "@/components/firma/Basicos";
import { BarridoRadar } from "@/components/firma/PulsoRadar";
import { Wordmark } from "@/components/firma/Wordmark";

/** Marco de acceso: wordmark, radar muy tenue de fondo y nota de proyecto privado. */
export function MarcoAcceso({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 flex min-h-dvh flex-col overflow-hidden px-4 py-8 md:px-16">
      <BarridoRadar className="absolute -right-40 top-1/2 h-[760px] w-[760px] -translate-y-1/2 opacity-60" />
      <header className="relative flex items-center justify-between">
        <Wordmark alto={32} />
        <DatosEjemplo />
      </header>
      <main id="contenido" className="relative my-auto w-full max-w-sm py-12">
        {children}
      </main>
      <footer className="relative text-dato text-muted">Proyecto privado en validación. Nada se publica ni se envía.</footer>
    </div>
  );
}
