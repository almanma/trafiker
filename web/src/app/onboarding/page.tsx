import type { Metadata } from "next";
import { Suspense } from "react";
import { SkeletonFormulario } from "@/components/firma/Skeletons";
import { Toaster } from "sonner";
import { EstadoPantalla } from "@/components/firma/Estados";
import { Asistente } from "./Asistente";

export const metadata: Metadata = { title: "Configurar campaña" };

export default function PaginaOnboarding() {
  return (
    <Suspense fallback={null}>
      <EstadoPantalla esqueleto={<SkeletonFormulario />}>
        <Asistente />
      </EstadoPantalla>
      <Toaster />
    </Suspense>
  );
}
