import type { SerieTema } from "./tipos";

/* Series de menciones de ejemplo (notas por hora / por día). */

export const temas: SerieTema[] = [
  { tema: "Movilidad", h24: [2, 2, 1, 1, 0, 1, 3, 4, 3, 3, 2, 3, 4, 3, 3, 4, 5, 6, 9, 12, 14, 11, 9, 7], d7: [18, 22, 20, 19, 25, 31, 52], delta: 64, tendencia: "sube" },
  { tema: "Economía", h24: [1, 1, 0, 0, 1, 3, 5, 4, 3, 3, 3, 4, 4, 5, 4, 5, 7, 10, 12, 9, 7, 5, 4, 6], d7: [30, 28, 26, 29, 27, 33, 46], delta: 41, tendencia: "sube" },
  { tema: "Seguridad", h24: [3, 2, 2, 1, 2, 4, 7, 6, 5, 6, 8, 9, 8, 6, 5, 5, 4, 4, 4, 3, 3, 2, 2, 2], d7: [21, 19, 24, 22, 20, 23, 29], delta: 28, tendencia: "sube" },
  { tema: "Servicios públicos", h24: [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 3, 5, 7, 6, 4, 3, 2, 1], d7: [6, 5, 7, 6, 8, 9, 12], delta: 33, tendencia: "sube" },
  { tema: "Salud", h24: [1, 1, 1, 0, 0, 1, 2, 2, 2, 3, 3, 4, 4, 5, 5, 6, 5, 4, 3, 2, 2, 1, 1, 1], d7: [24, 26, 25, 24, 27, 25, 26], delta: 3, tendencia: "estable" },
  { tema: "Congreso", h24: [0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 3, 4, 5, 6, 5, 4, 3, 2, 2, 1, 1, 1, 0], d7: [19, 21, 18, 22, 20, 21, 20], delta: -2, tendencia: "estable" },
  { tema: "Elecciones", h24: [0, 0, 0, 0, 0, 0, 1, 1, 2, 3, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], d7: [14, 15, 13, 12, 11, 10, 9], delta: -12, tendencia: "baja" },
  { tema: "Infraestructura", h24: [0, 0, 0, 0, 1, 2, 3, 4, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], d7: [8, 7, 9, 8, 9, 10, 12], delta: 19, tendencia: "sube" },
];

export const enAscenso = {
  actores: [
    { nombre: "Concejo de Bogotá", delta: 58, menciones: 21 },
    { nombre: "Ministerio de Hacienda", delta: 37, menciones: 34 },
    { nombre: "Gobernación del Cauca", delta: 31, menciones: 12 },
    { nombre: "Superintendencia de Servicios Públicos", delta: 22, menciones: 6 },
    { nombre: "Agencia Nacional de Infraestructura", delta: 14, menciones: 4 },
  ],
  terminos: [
    { nombre: "quórum", delta: 72, menciones: 18 },
    { nombre: "regla fiscal", delta: 44, menciones: 15 },
    { nombre: "cupo de endeudamiento", delta: 39, menciones: 16 },
    { nombre: "tarifa de energía", delta: 30, menciones: 9 },
    { nombre: "consejo de seguridad", delta: 18, menciones: 7 },
  ],
};

export const horas24 = Array.from({ length: 24 }, (_, i) => `${String((5 + i) % 24).padStart(2, "0")}:00`);
export const dias7 = ["18/11", "19/11", "20/11", "21/11", "22/11", "23/11", "24/11"];
