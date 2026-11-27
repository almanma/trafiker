import Link from "next/link";
import { EstadoVacio } from "@/components/firma/Estados";
import { clasesBoton } from "@/components/ui/Boton";

/** Noticia o página que no existe (por ejemplo, un enlace viejo). */
export default function NoEncontrada() {
  return (
    <EstadoVacio
      titulo="Esta página no está en el radar."
      texto="Puede que el enlace sea de otro día o que la noticia se haya fusionado con otra. El brief de hoy tiene lo más reciente."
      accion={
        <Link href="/hoy" className={clasesBoton("primario", "mt-2")}>
          Ir al brief de hoy
        </Link>
      }
    />
  );
}
