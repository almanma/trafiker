/**
 * Tokens de Trafiker. Fuente única de verdad: globals.css los replica en
 * variables CSS (:root = madrugada, [data-theme="light"] = edición de mañana)
 * y en @theme de Tailwind. El autochequeo compara los colores computados
 * contra esta lista.
 */

export const color = {
  madrugada: {
    bg: "#0B0D12",
    surface: "#12151C",
    surface2: "#1A1E27",
    border: "rgba(237,233,225,0.10)",
    borderStrong: "rgba(237,233,225,0.18)",
    text: "#EDE9E1",
    muted: "#8A8F98",
    signal: "#FFB547",
    izquierda: "#8B7CF6",
    izquierdaTexto: "#9D90F8",
    centro: "#A8A29E",
    derecha: "#E07A3F",
    verificado: "#6FCF97",
    enganoso: "#FFB547",
    falso: "#F2665E",
    sinEvidencia: "#8A8F98",
    sobreSenal: "#0B0D12",
    input: "rgba(255,255,255,0.05)",
  },
  manana: {
    bg: "#F7F4EE",
    surface: "#EFEAE1",
    surface2: "#E9E2D6",
    border: "#E2D9CB",
    borderStrong: "#CDBFAA",
    text: "#14161B",
    muted: "#5E5A55",
    signal: "#8A5A00",
    izquierda: "#5B4BC4",
    izquierdaTexto: "#5B4BC4",
    centro: "#5E5A55",
    derecha: "#9A4A1C",
    verificado: "#2F7A50",
    enganoso: "#8A5A00",
    falso: "#B42E26",
    sinEvidencia: "#5E5A55",
    sobreSenal: "#F7F4EE",
    input: "rgba(20,22,27,0.04)",
  },
} as const;

/** Escala tipográfica: 8 tamaños, ninguno más. */
export const tipo = {
  dato: { size: 12, line: 1.33, font: "mono" },
  chico: { size: 13, line: 1.45, font: "sans" },
  cuerpo: { size: 15, line: 1.6, tracking: "-0.011em", font: "sans" },
  lectura: { size: 18, line: 1.5, font: "serif|sans" },
  tarjeta: { size: 24, line: 1.17, font: "serif" },
  secundario: { size: 32, line: 1.1, font: "serif" },
  hero: { size: 48, line: 1, tracking: "-0.01em", font: "serif" },
  portada: { size: 72, line: 1, tracking: "-0.01em", font: "serif" },
} as const;

export const espacio = [4, 8, 12, 16, 24, 32, 48, 64, 96] as const;

/** Tres radios con jerarquía (+ píldora solo para chips de filtro). */
export const radio = {
  editorial: 3, // bloques editoriales y noticias (FT, The Verge)
  control: 8, // controles e inputs (Linear, Raycast)
  panel: 12, // paneles flotantes, drawers, menús (Linear)
  pildora: 9999, // solo chips de filtro
} as const;

export const sombra = {
  flotaMadrugada:
    "inset 0 1px 0 0 rgba(255,255,255,0.1), 0 30px 50px 0 rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.06)",
  flotaManana: "rgba(77,72,69,0.15) 0 1px 4px 0, rgba(77,72,69,0.2) 0 8px 14px 0",
  halo: "rgba(215,201,175,0.05) 0 0 20px 5px",
} as const;

export const movimiento = {
  base: { duracion: 0.16, curva: [0.25, 0.46, 0.45, 0.94] as const }, // Linear
  panel: { duracion: 0.2, curva: [0.4, 0, 0.2, 1] as const }, // Resend
  cascada: { stagger: 0.03, y: 8 },
  pulso: { duracion: 2.4 },
} as const;

export const contenido = { ancho: 1416, columnas: 12 } as const;
