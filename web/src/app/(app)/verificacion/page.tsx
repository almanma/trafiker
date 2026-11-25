import type { Metadata } from "next";
import { Suspense } from "react";
import { EstadoPantalla, EstadoVacio } from "@/components/firma/Estados";
import { SkeletonLista } from "@/components/firma/Skeletons";
import { VistaVerificacion } from "./VistaVerificacion";

export const metadata: Metadata = { title: "Verificación" };

export default function PaginaVerificacion() {
  return (
    <Suspense fallback={<SkeletonLista />}>
      <EstadoPantalla esqueleto={<SkeletonLista />} vacio={<EstadoVacio titulo="Sin datos dudosos por ahora." texto="Ningún dato de hoy necesita contraste. Si aparece uno, lo verás aquí con su fuente." />}>
        <VistaVerificacion />
      </EstadoPantalla>
    </Suspense>
  );
}
