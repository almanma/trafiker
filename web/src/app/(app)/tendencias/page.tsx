import type { Metadata } from "next";
import { Suspense } from "react";
import { EstadoPantalla, EstadoVacio } from "@/components/firma/Estados";
import { SkeletonGrafico } from "@/components/firma/Skeletons";
import { VistaTendencias } from "./VistaTendencias";

export const metadata: Metadata = { title: "Tendencias" };

export default function PaginaTendencias() {
  return (
    <Suspense fallback={<SkeletonGrafico />}>
      <EstadoPantalla esqueleto={<SkeletonGrafico />} vacio={<EstadoVacio titulo="Aún no hay suficientes notas." texto="Las tendencias necesitan al menos 24 horas de lectura. Vuelve mañana a las 05:00." />}>
        <VistaTendencias />
      </EstadoPantalla>
    </Suspense>
  );
}
