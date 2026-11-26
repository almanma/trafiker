import type { Metadata } from "next";
import { Suspense } from "react";
import { EstadoVacio } from "@/components/firma/Estados";
import { EstadoServidor } from "@/components/firma/EstadoServidor";
import { SkeletonGrafico } from "@/components/firma/Skeletons";
import { VistaTendencias } from "./VistaTendencias";

export const metadata: Metadata = { title: "Tendencias" };

export default function PaginaTendencias({ searchParams }: PageProps<"/tendencias">) {
  return (
    <Suspense fallback={<SkeletonGrafico />}>
      <EstadoServidor busqueda={searchParams} esqueleto={<SkeletonGrafico />} vacio={<EstadoVacio titulo="Aún no hay suficientes notas." texto="Las tendencias necesitan al menos 24 horas de lectura. Vuelve mañana a las 05:00." />}>
        <VistaTendencias />
      </EstadoServidor>
    </Suspense>
  );
}
