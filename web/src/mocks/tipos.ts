export type Linea = "izquierda" | "centro" | "derecha" | "a-validar";
export type Tono = "favor" | "neutral" | "contra";
export type Tendencia = "sube" | "estable" | "baja";
export type Veredicto = "verificado" | "enganoso" | "falso" | "sin-evidencia" | "sin-verificar";
export type Formato = "video" | "carrusel" | "hilo";
export type ColumnaIdea = "sugerida" | "produccion" | "publicada" | "descartada";

export interface Medio {
  id: string;
  nombre: string;
  inicial: string;
  tipo: "RSS" | "Google News" | "GDELT";
  region: string;
  alcance: "nacional" | "regional";
  linea: Linea;
  /** true = línea asignada solo para la demo; no es una validación. */
  lineaEjemplo: boolean;
  feed: string;
  salud: "ok" | "error";
  ultimaLectura: string;
  notasHoy: number;
}

export interface Articulo {
  medioId: string;
  titular: string;
  hora: string;
  url: string;
  tono: Tono;
  /** 1 = mención, 2 = nota, 3 = despliegue principal */
  intensidad: 1 | 2 | 3;
}

export interface Mirada {
  medioId: string;
  titular: string;
  /** palabras del titular que cambian frente a los otros lados */
  resaltar: string[];
}

export interface Noticia {
  id: string;
  titular: string;
  resumen: string;
  resumenIA: string;
  confianzaIA: number;
  tema: string;
  territorio: string;
  alcance: "nacional" | "regional";
  tendencia: Tendencia;
  delta: number;
  articulos: Articulo[];
  lineaDeTiempo: { hora: string; texto: string }[];
  actores: { nombre: string; rol: string; menciones: number }[];
  datosClave: { dato: string; fuente: string; url: string }[];
  tresMiradas?: { izquierda: Mirada; centro: Mirada; derecha: Mirada };
}

export interface Verificacion {
  id: string;
  dato: string;
  noticiaId: string;
  dicho: { medioId: string; hora: string; url: string; quien: string };
  contraste: { fuente: string; tipo: "oficial" | "fact-checker"; dice: string; url: string };
  veredicto: Veredicto;
  confianza: number;
}

export interface Idea {
  id: string;
  columna: ColumnaIdea;
  titulo: string;
  gancho: string;
  angulo: string;
  tono: string;
  formato: Formato;
  duracion?: string;
  dato: { texto: string; fuente: string; url: string };
  confianza: number;
  noticiaId: string;
  guion: string[];
}

export interface SerieTema {
  tema: string;
  h24: number[];
  d7: number[];
  delta: number;
  tendencia: Tendencia;
}

export interface Campana {
  id: string;
  nombre: string;
  cargo: string;
}
