import type { Metadata } from "next";
import { Suspense } from "react";
import { SkeletonFormulario } from "@/components/firma/Skeletons";
import { EstadoPantalla } from "@/components/firma/Estados";
import { Acceso } from "./Acceso";
import { MarcoAcceso } from "./MarcoAcceso";

export const metadata: Metadata = { title: "Acceso" };

export default function PaginaLogin() {
  return (
    <MarcoAcceso>
      <Suspense fallback={null}>
        <EstadoPantalla esqueleto={<SkeletonFormulario />}>
          <Acceso />
        </EstadoPantalla>
      </Suspense>
    </MarcoAcceso>
  );
}
