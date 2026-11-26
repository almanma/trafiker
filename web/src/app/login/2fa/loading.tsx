import { SkeletonFormulario } from "@/components/firma/Skeletons";

/** Pantalla de carga de la ruta: misma forma que el formulario real. */
export default function Cargando() {
  return (
    <div className="px-4 py-24">
      <SkeletonFormulario />
    </div>
  );
}
