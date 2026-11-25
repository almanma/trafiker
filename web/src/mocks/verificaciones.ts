import { urlEjemplo } from "./medios";
import type { Verificacion } from "./tipos";

/* Verificaciones FICTICIAS. Los nombres de fuentes oficiales y fact-checkers
   son reales; lo que "dicen" aquí es de ejemplo y los enlaces no existen. */

export const verificaciones: Verificacion[] = [
  {
    id: "v-desempleo",
    dato: "\"El desempleo en Bogotá es el más alto de la década\"",
    noticiaId: "cupo-endeudamiento-bogota",
    dicho: { medioId: "semana", hora: "21:40", url: urlEjemplo("semana", "concejo-metro"), quien: "Un concejal citado" },
    contraste: {
      fuente: "DANE",
      tipo: "oficial",
      dice: "La serie del mercado laboral muestra picos más altos en años anteriores de la década.",
      url: urlEjemplo("dane", "mercado-laboral-bogota"),
    },
    veredicto: "falso",
    confianza: 88,
  },
  {
    id: "v-recorte",
    dato: "\"El recorte deja sin plata a todos los programas sociales\"",
    noticiaId: "recorte-presupuestal",
    dicho: { medioId: "noticias-uno", hora: "19:20", url: urlEjemplo("noticias-uno", "recorte-programas"), quien: "Un senador de la oposición" },
    contraste: {
      fuente: "Colombiacheck",
      tipo: "fact-checker",
      dice: "El decreto aplaza partidas específicas; no todas las líneas sociales están incluidas.",
      url: urlEjemplo("colombiacheck", "recorte-programas-sociales"),
    },
    veredicto: "enganoso",
    confianza: 74,
  },
  {
    id: "v-censo",
    dato: "\"La consulta del censo electoral dura 30 días\"",
    noticiaId: "censo-electoral",
    dicho: { medioId: "el-tiempo", hora: "09:20", url: urlEjemplo("el-tiempo", "censo-electoral"), quien: "Nota del medio" },
    contraste: {
      fuente: "Registraduría",
      tipo: "oficial",
      dice: "La resolución fija un periodo de 30 días calendario para comentarios.",
      url: urlEjemplo("registraduria", "resolucion-censo"),
    },
    veredicto: "verificado",
    confianza: 93,
  },
  {
    id: "v-tasas",
    dato: "\"La inflación ya está dentro de la meta\"",
    noticiaId: "tasas-banco-republica",
    dicho: { medioId: "la-republica", hora: "06:00", url: urlEjemplo("la-republica", "tasas-quietas"), quien: "Un analista citado" },
    contraste: {
      fuente: "Banco de la República",
      tipo: "oficial",
      dice: "El último dato publicado sigue por encima del rango meta.",
      url: urlEjemplo("banrep", "inflacion-meta"),
    },
    veredicto: "falso",
    confianza: 81,
  },
  {
    id: "v-energia",
    dato: "\"El Caribe paga la luz más cara del país\"",
    noticiaId: "tarifas-energia-caribe",
    dicho: { medioId: "noticias-uno", hora: "20:10", url: urlEjemplo("noticias-uno", "caribe-luz"), quien: "Titular del medio" },
    contraste: {
      fuente: "AFP Factual",
      tipo: "fact-checker",
      dice: "No hay una comparación pública consolidada por regiones para el último mes.",
      url: urlEjemplo("afp-factual", "tarifas-caribe"),
    },
    veredicto: "sin-evidencia",
    confianza: 58,
  },
  {
    id: "v-quorum",
    dato: "\"Faltaron cuatro concejales para el quórum\"",
    noticiaId: "cupo-endeudamiento-bogota",
    dicho: { medioId: "el-tiempo", hora: "21:55", url: urlEjemplo("el-tiempo", "quorum-metro"), quien: "Nota del medio" },
    contraste: {
      fuente: "Detector de mentiras (La Silla Vacía)",
      tipo: "fact-checker",
      dice: "El acta de la sesión coincide con el conteo reportado.",
      url: urlEjemplo("la-silla-vacia", "detector-quorum"),
    },
    veredicto: "verificado",
    confianza: 90,
  },
];

export const nombreVeredicto = {
  verificado: "Verificado",
  enganoso: "Engañoso",
  falso: "Falso",
  "sin-evidencia": "Sin evidencia",
} as const;
