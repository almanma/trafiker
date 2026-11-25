import type { Metadata } from "next";
import { Suspense } from "react";
import { EstadoPantalla } from "@/components/firma/Estados";
import { SkeletonLista } from "@/components/firma/Skeletons";
import { VistaGuia } from "./VistaGuia";

export const metadata: Metadata = { title: "Guía de marca" };

export default function PaginaGuia() {
  return (
    <Suspense fallback={<SkeletonLista filas={4} />}>
      <EstadoPantalla esqueleto={<SkeletonLista filas={4} />}>
        <VistaGuia />
      </EstadoPantalla>
    </Suspense>
  );
}
