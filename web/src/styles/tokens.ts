/**
 * Tokens de Trafiker — dirección B «Centro de control».
 * Fuente única de verdad para la guía y el autochequeo. globals.css los
 * replica como variables CSS (:root/[data-theme="light"] = claro, principal;
 * [data-theme="dark"] = oscuro) y en @theme de Tailwind.
 */

export const color = {
  claro: {
    bg: "#F7F8FA",
    surface: "#FFFFFF",
    surface2: "#F1F3F6",
    border: "#E4E7EC",
    borderStrong: "#CED4DC",
    text: "#0E1116",
    muted: "#5A6472",
    signal: "#0F6B73",
    signalHover: "#0B575E",
    signalSuave: "#E7F3F3",
    sobreSenal: "#FFFFFF",
    input: "#FFFFFF",
    izquierda: "#5B45C9",
    izquierdaTexto: "#5B45C9",
    izquierdaSuave: "#EFECFB",
    centro: "#71675A",
    centroSuave: "#F3F0EA",
    derecha: "#A3481A",
    derechaSuave: "#FBEEE6",
    verificado: "#17703F",
    verificadoSuave: "#E9F6EE",
    verificadoBorde: "#BCE2CA",
    enganoso: "#8F5200",
    enganosoSuave: "#FEF4E2",
    enganosoBorde: "#F1D39C",
    falso: "#B3261E",
    falsoSuave: "#FDECEA",
    falsoBorde: "#F4C2BE",
    sinVerificar: "#4F5B69",
    sinVerificarSuave: "#F0F2F5",
    sinVerificarBorde: "#D3D9E0",
  },
  oscuro: {
    bg: "#0B0D10",
    surface: "#121519",
    surface2: "#1A1E24",
    border: "rgba(255,255,255,0.08)",
    borderStrong: "rgba(255,255,255,0.14)",
    text: "#EDEFF2",
    muted: "#8F98A5",
    signal: "#4FC1C6",
    signalHover: "#7DD3D6",
    signalSuave: "rgba(79,193,198,0.12)",
    sobreSenal: "#0B0D10",
    input: "rgba(255,255,255,0.04)",
    izquierda: "#9B8CFA",
    izquierdaTexto: "#A99CFA",
    izquierdaSuave: "rgba(155,140,250,0.14)",
    centro: "#B5AC9E",
    centroSuave: "rgba(181,172,158,0.12)",
    derecha: "#E9894F",
    derechaSuave: "rgba(233,137,79,0.14)",
    verificado: "#5FD08F",
    verificadoSuave: "rgba(95,208,143,0.12)",
    verificadoBorde: "rgba(95,208,143,0.32)",
    enganoso: "#F2B544",
    enganosoSuave: "rgba(242,181,68,0.12)",
    enganosoBorde: "rgba(242,181,68,0.32)",
    falso: "#F2665E",
    falsoSuave: "rgba(242,102,94,0.12)",
    falsoBorde: "rgba(242,102,94,0.32)",
    sinVerificar: "#9AA4B2",
    sinVerificarSuave: "rgba(154,164,178,0.12)",
    sinVerificarBorde: "rgba(154,164,178,0.3)",
  },
} as const;

/** Escala tipográfica (Geist): 8 tamaños, ninguno más. Titulares en 600. */
export const tipo = {
  dato: { size: 12, line: 16, uso: "Metadatos, horas, cifras pequeñas" },
  chico: { size: 13, line: 20, uso: "Controles, etiquetas, tablas" },
  cuerpo: { size: 15, line: 24, tracking: "-0.006em", uso: "Texto de interfaz" },
  lectura: { size: 17, line: 26, tracking: "-0.01em", uso: "Resúmenes para leer" },
  tarjeta: { size: 18, line: 24, tracking: "-0.014em", peso: 600, uso: "Titular de tarjeta" },
  secundario: { size: 24, line: 30, tracking: "-0.02em", peso: 600, uso: "Título de sección" },
  hero: { size: 32, line: 38, tracking: "-0.024em", peso: 600, uso: "Título de página" },
  portada: { size: 40, line: 46, tracking: "-0.028em", peso: 600, uso: "Noticia principal" },
} as const;

export const espacio = [4, 8, 12, 16, 24, 32, 48, 64, 96] as const;

/** Tres radios con jerarquía (+ píldora solo para chips de filtro). */
export const radio = {
  editorial: 6, // badges, etiquetas, celdas
  control: 8, // botones, inputs, chips de fuente
  panel: 12, // tarjetas, paneles, menús, drawer
  pildora: 9999, // chips de filtro
} as const;

/** Elevación en 3 niveles. Sombras en capas, frías y difusas. */
export const sombra = {
  e1: { uso: "Tarjetas en reposo", claro: "0 1px 2px rgba(15,23,42,.04), 0 1px 3px rgba(15,23,42,.04)" },
  e2: { uso: "Hover y barra superior con scroll", claro: "0 1px 2px rgba(15,23,42,.04), 0 4px 12px -2px rgba(15,23,42,.08)" },
  e3: { uso: "Lo que flota: menús, drawer, paleta, toasts", claro: "0 2px 6px rgba(15,23,42,.05), 0 16px 32px -8px rgba(15,23,42,.14)" },
} as const;

export const movimiento = {
  base: { duracion: 0.16, curva: [0.25, 0.46, 0.45, 0.94] as const }, // Linear
  panel: { duracion: 0.2, curva: [0.4, 0, 0.2, 1] as const }, // Resend
  cascada: { stagger: 0.03, y: 8 },
  pulso: { duracion: 2.4 },
} as const;

export const contenido = { ancho: 1416, columnas: 12 } as const;
