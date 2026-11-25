import type { Metadata } from "next";
import { Suspense } from "react";
import { EstadoPantalla, EstadoVacio } from "@/components/firma/Estados";
import { SkeletonBrief } from "@/components/firma/Skeletons";
import { VistaHoy } from "./VistaHoy";

export const metadata: Metadata = { title: "Hoy" };

export default function PaginaHoy() {
  return (
    <Suspense fallback={<SkeletonBrief />}>
      <EstadoPantalla
        esqueleto={<SkeletonBrief />}
        vacio={<EstadoVacio titulo="Nada nuevo desde las 04:52." texto="Esta madrugada ningún medio publicó algo nuevo sobre tu territorio. El brief de ayer sigue vigente." />}
      >
        <VistaHoy />
      </EstadoPantalla>
    </Suspense>
  );
}
