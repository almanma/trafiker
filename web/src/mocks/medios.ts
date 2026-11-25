import type { Linea, Medio } from "./tipos";

/**
 * Medios reales; datos de lectura ficticios.
 * Línea editorial: "a-validar" salvo cuatro asignadas SOLO para la demo
 * (lineaEjemplo: true). La usuaria debe validarlas antes de cualquier uso.
 */
export const medios: Medio[] = [
  { id: "noticias-uno", nombre: "Noticias Uno", inicial: "N1", tipo: "RSS", region: "Nacional", alcance: "nacional", linea: "izquierda", lineaEjemplo: true, feed: "https://www.noticiasuno.com/feed/", salud: "ok", ultimaLectura: "04:41", notasHoy: 14 },
  { id: "la-silla-vacia", nombre: "La Silla Vacía", inicial: "SV", tipo: "RSS", region: "Nacional", alcance: "nacional", linea: "centro", lineaEjemplo: true, feed: "https://www.lasillavacia.com/feed/", salud: "ok", ultimaLectura: "04:44", notasHoy: 9 },
  { id: "semana", nombre: "Semana", inicial: "S", tipo: "Google News", region: "Nacional", alcance: "nacional", linea: "derecha", lineaEjemplo: true, feed: "site:semana.com when:1d", salud: "ok", ultimaLectura: "04:46", notasHoy: 31 },
  { id: "el-colombiano", nombre: "El Colombiano", inicial: "EC", tipo: "Google News", region: "Antioquia", alcance: "regional", linea: "derecha", lineaEjemplo: true, feed: "site:elcolombiano.com when:1d", salud: "ok", ultimaLectura: "04:46", notasHoy: 18 },
  { id: "el-tiempo", nombre: "El Tiempo", inicial: "ET", tipo: "RSS", region: "Nacional", alcance: "nacional", linea: "a-validar", lineaEjemplo: false, feed: "https://www.eltiempo.com/rss/politica.xml", salud: "ok", ultimaLectura: "04:40", notasHoy: 27 },
  { id: "el-espectador", nombre: "El Espectador", inicial: "EE", tipo: "RSS", region: "Nacional", alcance: "nacional", linea: "a-validar", lineaEjemplo: false, feed: "https://www.elespectador.com/politica/rss/", salud: "ok", ultimaLectura: "04:40", notasHoy: 22 },
  { id: "cambio", nombre: "Cambio", inicial: "C", tipo: "Google News", region: "Nacional", alcance: "nacional", linea: "a-validar", lineaEjemplo: false, feed: "site:cambiocolombia.com when:1d", salud: "ok", ultimaLectura: "04:47", notasHoy: 7 },
  { id: "caracol", nombre: "Caracol", inicial: "CR", tipo: "Google News", region: "Nacional", alcance: "nacional", linea: "a-validar", lineaEjemplo: false, feed: "site:caracolradio.com when:1d", salud: "ok", ultimaLectura: "04:47", notasHoy: 24 },
  { id: "rcn", nombre: "RCN", inicial: "R", tipo: "Google News", region: "Nacional", alcance: "nacional", linea: "a-validar", lineaEjemplo: false, feed: "site:noticiasrcn.com when:1d", salud: "error", ultimaLectura: "02:10", notasHoy: 0 },
  { id: "la-republica", nombre: "La República", inicial: "LR", tipo: "RSS", region: "Nacional", alcance: "nacional", linea: "a-validar", lineaEjemplo: false, feed: "https://www.larepublica.co/rss", salud: "ok", ultimaLectura: "04:42", notasHoy: 11 },
  { id: "el-heraldo", nombre: "El Heraldo", inicial: "EH", tipo: "GDELT", region: "Caribe", alcance: "regional", linea: "a-validar", lineaEjemplo: false, feed: "domain:elheraldo.co sourcecountry:CO", salud: "ok", ultimaLectura: "04:49", notasHoy: 8 },
  { id: "el-pais-cali", nombre: "El País Cali", inicial: "EP", tipo: "GDELT", region: "Valle del Cauca", alcance: "regional", linea: "a-validar", lineaEjemplo: false, feed: "domain:elpais.com.co sourcecountry:CO", salud: "ok", ultimaLectura: "04:49", notasHoy: 6 },
];

export const medioPorId = Object.fromEntries(medios.map((m) => [m.id, m])) as Record<string, Medio>;

export const lineas: { id: Linea; nombre: string }[] = [
  { id: "izquierda", nombre: "Izquierda" },
  { id: "centro", nombre: "Centro" },
  { id: "derecha", nombre: "Derecha" },
  { id: "a-validar", nombre: "A validar" },
];

export const nombreLinea: Record<Linea, string> = {
  izquierda: "Izquierda",
  centro: "Centro",
  derecha: "Derecha",
  "a-validar": "A validar",
};

export function mediosPorLinea(lista: Medio[] = medios) {
  return lineas.map((l) => ({ ...l, medios: lista.filter((m) => m.linea === l.id) }));
}

/** URL de ejemplo: dominio inexistente a propósito, para no apuntar a notas reales. */
export function urlEjemplo(medioId: string, slug: string) {
  return `https://ejemplo.trafiker.local/${medioId}/${slug}`;
}
