import type { Metadata } from "next";
import { Suspense } from "react";
import { EstadoServidor } from "@/components/firma/EstadoServidor";
import { SkeletonLista } from "@/components/firma/Skeletons";
import { VistaGuia } from "./VistaGuia";

export const metadata: Metadata = { title: "Sistema de diseño" };

export default function PaginaGuia({ searchParams }: PageProps<"/guia">) {
  return (
    <Suspense fallback={<SkeletonLista filas={3} />}>
      <EstadoServidor busqueda={searchParams} esqueleto={<SkeletonLista filas={3} />}>
        <VistaGuia />
      </EstadoServidor>
    </Suspense>
  );
}
