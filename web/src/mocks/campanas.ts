import type { Campana } from "./tipos";

export const campanas: Campana[] = [
  { id: "bogota", nombre: "Bogotá", cargo: "Alcaldía" },
  { id: "antioquia", nombre: "Gobernación de Antioquia", cargo: "Gobernación" },
];

export const temasSensibles = [
  "Seguridad",
  "Movilidad",
  "Salud",
  "Impuestos",
  "Corrupción",
  "Servicios públicos",
  "Educación",
  "Medio ambiente",
  "Empleo",
  "Vivienda",
];

/**
 * Mapa estilizado de Colombia como cartograma de hexágonos: una celda por
 * departamento, ubicada de forma aproximada (norte arriba). No es un mapa
 * geográfico exacto; es una simplificación propia.
 */
export const departamentos: { id: string; nombre: string; abr: string; c: number; r: number }[] = [
  { id: "san-andres", nombre: "San Andrés", abr: "SAP", c: 0, r: 0 },
  { id: "la-guajira", nombre: "La Guajira", abr: "LAG", c: 5, r: 0 },
  { id: "atlantico", nombre: "Atlántico", abr: "ATL", c: 3, r: 1 },
  { id: "magdalena", nombre: "Magdalena", abr: "MAG", c: 4, r: 1 },
  { id: "cesar", nombre: "Cesar", abr: "CES", c: 5, r: 1 },
  { id: "cordoba", nombre: "Córdoba", abr: "COR", c: 2, r: 2 },
  { id: "sucre", nombre: "Sucre", abr: "SUC", c: 3, r: 2 },
  { id: "bolivar", nombre: "Bolívar", abr: "BOL", c: 4, r: 2 },
  { id: "norte-de-santander", nombre: "Norte de Santander", abr: "NSA", c: 5, r: 2 },
  { id: "choco", nombre: "Chocó", abr: "CHO", c: 1, r: 3 },
  { id: "antioquia", nombre: "Antioquia", abr: "ANT", c: 2, r: 3 },
  { id: "santander", nombre: "Santander", abr: "SAN", c: 3, r: 3 },
  { id: "boyaca", nombre: "Boyacá", abr: "BOY", c: 4, r: 3 },
  { id: "arauca", nombre: "Arauca", abr: "ARA", c: 5, r: 3 },
  { id: "risaralda", nombre: "Risaralda", abr: "RIS", c: 1, r: 4 },
  { id: "caldas", nombre: "Caldas", abr: "CAL", c: 2, r: 4 },
  { id: "cundinamarca", nombre: "Cundinamarca", abr: "CUN", c: 3, r: 4 },
  { id: "casanare", nombre: "Casanare", abr: "CAS", c: 4, r: 4 },
  { id: "vichada", nombre: "Vichada", abr: "VIC", c: 5, r: 4 },
  { id: "valle", nombre: "Valle del Cauca", abr: "VAC", c: 0, r: 5 },
  { id: "quindio", nombre: "Quindío", abr: "QUI", c: 1, r: 5 },
  { id: "tolima", nombre: "Tolima", abr: "TOL", c: 2, r: 5 },
  { id: "bogota", nombre: "Bogotá D. C.", abr: "BOG", c: 3, r: 5 },
  { id: "meta", nombre: "Meta", abr: "MET", c: 4, r: 5 },
  { id: "guainia", nombre: "Guainía", abr: "GUA", c: 5, r: 5 },
  { id: "cauca", nombre: "Cauca", abr: "CAU", c: 0, r: 6 },
  { id: "huila", nombre: "Huila", abr: "HUI", c: 1, r: 6 },
  { id: "caqueta", nombre: "Caquetá", abr: "CAQ", c: 2, r: 6 },
  { id: "guaviare", nombre: "Guaviare", abr: "GVR", c: 3, r: 6 },
  { id: "vaupes", nombre: "Vaupés", abr: "VAU", c: 4, r: 6 },
  { id: "narino", nombre: "Nariño", abr: "NAR", c: 0, r: 7 },
  { id: "putumayo", nombre: "Putumayo", abr: "PUT", c: 1, r: 7 },
  { id: "amazonas", nombre: "Amazonas", abr: "AMA", c: 3, r: 7 },
];
