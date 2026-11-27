import type { Metadata } from "next";
import { Suspense } from "react";
import { SkeletonFormulario } from "@/components/firma/Skeletons";
import { Toaster } from "sonner";
import { EstadoServidor } from "@/components/firma/EstadoServidor";
import { Asistente } from "./Asistente";

export const metadata: Metadata = { title: "Configurar campaña" };

export default function PaginaOnboarding({ searchParams }: PageProps<"/onboarding">) {
  return (
    <Suspense fallback={null}>
      <EstadoServidor busqueda={searchParams} esqueleto={<SkeletonFormulario />}>
        <Asistente />
      </EstadoServidor>
      <Toaster />
    </Suspense>
  );
}
