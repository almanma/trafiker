import type { Metadata } from "next";
import { Suspense } from "react";
import { SkeletonFormulario } from "@/components/firma/Skeletons";
import { EstadoPantalla } from "@/components/firma/Estados";
import { MarcoAcceso } from "../MarcoAcceso";
import { Codigo } from "./Codigo";

export const metadata: Metadata = { title: "Segundo factor" };

export default function Pagina2FA() {
  return (
    <MarcoAcceso>
      <Suspense fallback={null}>
        <EstadoPantalla esqueleto={<SkeletonFormulario />}>
          <Codigo />
        </EstadoPantalla>
      </Suspense>
    </MarcoAcceso>
  );
}
