import type { Metadata } from "next";
import { Suspense } from "react";
import { SkeletonFormulario } from "@/components/firma/Skeletons";
import { EstadoServidor } from "@/components/firma/EstadoServidor";
import { Acceso } from "./Acceso";
import { MarcoAcceso } from "./MarcoAcceso";

export const metadata: Metadata = { title: "Acceso" };

export default function PaginaLogin({ searchParams }: PageProps<"/login">) {
  return (
    <MarcoAcceso>
      <Suspense fallback={null}>
        <EstadoServidor busqueda={searchParams} esqueleto={<SkeletonFormulario />}>
          <Acceso />
        </EstadoServidor>
      </Suspense>
    </MarcoAcceso>
  );
}
