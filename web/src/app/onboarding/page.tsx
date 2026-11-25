import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { EstadoPantalla } from "@/components/firma/Estados";
import { Asistente } from "./Asistente";

export const metadata: Metadata = { title: "Configurar campaña" };

export default function PaginaOnboarding() {
  return (
    <Suspense fallback={null}>
      <EstadoPantalla esqueleto={<div className="m-8 h-96 animate-respira rounded-control bg-surface-2" role="status" aria-label="Cargando" />}>
        <Asistente />
      </EstadoPantalla>
      <Toaster />
    </Suspense>
  );
}
