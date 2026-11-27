import type { Metadata } from "next";
import { Suspense } from "react";
import { EstadoVacio } from "@/components/firma/Estados";
import { EstadoServidor } from "@/components/firma/EstadoServidor";
import { SkeletonMatriz } from "@/components/firma/Skeletons";
import { VistaMatriz } from "./VistaMatriz";

export const metadata: Metadata = { title: "Matriz" };

export default function PaginaMatriz({ searchParams }: PageProps<"/matriz">) {
  return (
    <Suspense fallback={<SkeletonMatriz />}>
      <EstadoServidor busqueda={searchParams} esqueleto={<SkeletonMatriz />} vacio={<EstadoVacio titulo="Todavía no hay hechos para comparar." texto="Cuando al menos dos medios cubran el mismo hecho, aparecerá una fila aquí." />}>
        <VistaMatriz />
      </EstadoServidor>
    </Suspense>
  );
}
