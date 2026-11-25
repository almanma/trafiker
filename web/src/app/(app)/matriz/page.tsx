import type { Metadata } from "next";
import { Suspense } from "react";
import { EstadoPantalla, EstadoVacio } from "@/components/firma/Estados";
import { SkeletonMatriz } from "@/components/firma/Skeletons";
import { VistaMatriz } from "./VistaMatriz";

export const metadata: Metadata = { title: "Matriz" };

export default function PaginaMatriz() {
  return (
    <Suspense fallback={<SkeletonMatriz />}>
      <EstadoPantalla esqueleto={<SkeletonMatriz />} vacio={<EstadoVacio titulo="Todavía no hay hechos para comparar." texto="Cuando al menos dos medios cubran el mismo hecho, aparecerá una fila aquí." />}>
        <VistaMatriz />
      </EstadoPantalla>
    </Suspense>
  );
}
