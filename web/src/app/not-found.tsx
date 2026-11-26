import Link from "next/link";
import { EstadoVacio } from "@/components/firma/Estados";
import { clasesBoton } from "@/components/ui/Boton";

/** Dirección que no existe en Trafiker. */
export default function NoExiste() {
  return (
    <main id="contenido" className="px-4 py-16">
      <EstadoVacio
        titulo="Esta página no está en el radar."
        texto="Revisa la dirección o vuelve al brief de hoy, que tiene lo más reciente."
        accion={
          <Link href="/hoy" className={clasesBoton("primario", "mt-2")}>
            Ir al brief de hoy
          </Link>
        }
      />
    </main>
  );
}
