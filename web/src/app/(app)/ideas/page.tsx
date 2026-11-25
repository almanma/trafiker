import type { Metadata } from "next";
import { Suspense } from "react";
import { EstadoPantalla, EstadoVacio } from "@/components/firma/Estados";
import { SkeletonKanban } from "@/components/firma/Skeletons";
import { VistaIdeas } from "./VistaIdeas";

export const metadata: Metadata = { title: "Ideas" };

export default function PaginaIdeas() {
  return (
    <Suspense fallback={<SkeletonKanban />}>
      <EstadoPantalla esqueleto={<SkeletonKanban />} vacio={<EstadoVacio titulo="Todavía no hay ideas." texto="Abre una noticia y pulsa «Convertir en idea», o espera al brief de las 05:00." />}>
        <VistaIdeas />
      </EstadoPantalla>
    </Suspense>
  );
}
