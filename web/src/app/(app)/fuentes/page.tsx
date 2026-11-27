import type { Metadata } from "next";
import { Suspense } from "react";
import { EstadoVacio } from "@/components/firma/Estados";
import { EstadoServidor } from "@/components/firma/EstadoServidor";
import { SkeletonTabla } from "@/components/firma/Skeletons";
import { VistaFuentes } from "./VistaFuentes";

export const metadata: Metadata = { title: "Fuentes" };

export default function PaginaFuentes({ searchParams }: PageProps<"/fuentes">) {
  return (
    <Suspense fallback={<SkeletonTabla />}>
      <EstadoServidor busqueda={searchParams} esqueleto={<SkeletonTabla />} vacio={<EstadoVacio titulo="Aún no hay fuentes." texto="Agrega tu primer medio con su feed RSS o una consulta de Google News." />}>
        <VistaFuentes />
      </EstadoServidor>
    </Suspense>
  );
}
