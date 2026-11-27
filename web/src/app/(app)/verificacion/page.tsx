import type { Metadata } from "next";
import { Suspense } from "react";
import { EstadoVacio } from "@/components/firma/Estados";
import { EstadoServidor } from "@/components/firma/EstadoServidor";
import { SkeletonLista } from "@/components/firma/Skeletons";
import { VistaVerificacion } from "./VistaVerificacion";

export const metadata: Metadata = { title: "Verificación" };

export default function PaginaVerificacion({ searchParams }: PageProps<"/verificacion">) {
  return (
    <Suspense fallback={<SkeletonLista />}>
      <EstadoServidor busqueda={searchParams} esqueleto={<SkeletonLista />} vacio={<EstadoVacio titulo="Sin datos dudosos por ahora." texto="Ningún dato de hoy necesita contraste. Si aparece uno, lo verás aquí con su fuente." />}>
        <VistaVerificacion />
      </EstadoServidor>
    </Suspense>
  );
}
