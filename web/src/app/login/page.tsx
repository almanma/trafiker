import type { Metadata } from "next";
import { Suspense } from "react";
import { EstadoPantalla } from "@/components/firma/Estados";
import { Acceso } from "./Acceso";
import { MarcoAcceso } from "./MarcoAcceso";

export const metadata: Metadata = { title: "Acceso" };

export default function PaginaLogin() {
  return (
    <MarcoAcceso>
      <Suspense fallback={null}>
        <EstadoPantalla esqueleto={<div className="h-64 animate-respira rounded-control bg-surface-2" role="status" aria-label="Cargando" />}>
          <Acceso />
        </EstadoPantalla>
      </Suspense>
    </MarcoAcceso>
  );
}
