import type { Metadata } from "next";
import { Suspense } from "react";
import { EstadoVacio } from "@/components/firma/Estados";
import { EstadoServidor } from "@/components/firma/EstadoServidor";
import { SkeletonBrief } from "@/components/firma/Skeletons";
import { VistaHoy } from "./VistaHoy";

export const metadata: Metadata = { title: "Hoy" };

export default function PaginaHoy({ searchParams }: PageProps<"/hoy">) {
  return (
    <Suspense fallback={<SkeletonBrief />}>
      <EstadoServidor busqueda={searchParams}
        esqueleto={<SkeletonBrief />}
        vacio={<EstadoVacio titulo="Nada nuevo desde las 04:52." texto="Esta madrugada ningún medio publicó algo nuevo sobre tu territorio. El brief de ayer sigue vigente." />}
      >
        <VistaHoy />
      </EstadoServidor>
    </Suspense>
  );
}
