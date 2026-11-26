"use client";

import { useEffect } from "react";
import { EstadoError } from "@/components/firma/Estados";

/** Si una pantalla falla, la barra lateral sigue en pie y se puede reintentar. */
export default function ErrorApp({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <EstadoError
      titulo="Algo se cruzó en esta pantalla."
      texto="No es culpa tuya. El resto de Trafiker sigue funcionando; reintenta y, si vuelve a pasar, revisa el estado de las fuentes."
      onReintentar={retry}
    />
  );
}
