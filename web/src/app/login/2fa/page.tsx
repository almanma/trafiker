import type { Metadata } from "next";
import { Suspense } from "react";
import { SkeletonFormulario } from "@/components/firma/Skeletons";
import { EstadoServidor } from "@/components/firma/EstadoServidor";
import { MarcoAcceso } from "../MarcoAcceso";
import { Codigo } from "./Codigo";

export const metadata: Metadata = { title: "Segundo factor" };

export default function Pagina2FA({ searchParams }: PageProps<"/login/2fa">) {
  return (
    <MarcoAcceso>
      <Suspense fallback={null}>
        <EstadoServidor busqueda={searchParams} esqueleto={<SkeletonFormulario />}>
          <Codigo />
        </EstadoServidor>
      </Suspense>
    </MarcoAcceso>
  );
}
