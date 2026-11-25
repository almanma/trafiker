import type { Metadata } from "next";
import { Suspense } from "react";
import { EstadoPantalla } from "@/components/firma/Estados";
import { MarcoAcceso } from "../MarcoAcceso";
import { Codigo } from "./Codigo";

export const metadata: Metadata = { title: "Segundo factor" };

export default function Pagina2FA() {
  return (
    <MarcoAcceso>
      <Suspense fallback={null}>
        <EstadoPantalla esqueleto={<div className="h-64 animate-respira rounded-control bg-surface-2" role="status" aria-label="Cargando" />}>
          <Codigo />
        </EstadoPantalla>
      </Suspense>
    </MarcoAcceso>
  );
}
