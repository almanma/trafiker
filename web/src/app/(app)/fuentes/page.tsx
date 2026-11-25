import type { Metadata } from "next";
import { Suspense } from "react";
import { EstadoPantalla, EstadoVacio } from "@/components/firma/Estados";
import { SkeletonTabla } from "@/components/firma/Skeletons";
import { VistaFuentes } from "./VistaFuentes";

export const metadata: Metadata = { title: "Fuentes" };

export default function PaginaFuentes() {
  return (
    <Suspense fallback={<SkeletonTabla />}>
      <EstadoPantalla esqueleto={<SkeletonTabla />} vacio={<EstadoVacio titulo="Aún no hay fuentes." texto="Agrega tu primer medio con su feed RSS o una consulta de Google News." />}>
        <VistaFuentes />
      </EstadoPantalla>
    </Suspense>
  );
}
