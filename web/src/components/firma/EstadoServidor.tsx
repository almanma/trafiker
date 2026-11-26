import type { ReactNode } from "react";
import { EstadoError, EstadoSinConexion, EstadoVacio } from "./Estados";

export type Estado = "normal" | "vacio" | "carga" | "error" | "sin-conexion";
type Busqueda = Promise<Record<string, string | string[] | undefined>>;

/**
 * Lee ?estado= en el servidor y muestra el estado diseñado (vacío, carga,
 * error, sin conexión) o el contenido normal. Al leerlo aquí y no con
 * useSearchParams en el navegador, el HTML llega con el contenido real y no
 * con un skeleton (mejor LCP). Va dentro de <Suspense>.
 */
export async function EstadoServidor({
  busqueda,
  children,
  esqueleto,
  vacio,
}: {
  busqueda: Busqueda;
  children: ReactNode;
  esqueleto: ReactNode;
  vacio?: ReactNode;
}) {
  const valor = (await busqueda).estado;
  const estado = (typeof valor === "string" ? valor : "normal") as Estado;
  if (estado === "carga") return <>{esqueleto}</>;
  if (estado === "error") return <EstadoError />;
  if (estado === "sin-conexion") return <EstadoSinConexion />;
  if (estado === "vacio") return <>{vacio ?? <EstadoVacio />}</>;
  return <>{children}</>;
}
