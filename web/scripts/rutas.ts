export const BASE = process.env.BASE_URL ?? "http://localhost:3000";

export const rutas = [
  { ruta: "/login", nombre: "login" },
  { ruta: "/login/2fa", nombre: "login-2fa" },
  { ruta: "/onboarding", nombre: "onboarding" },
  { ruta: "/hoy", nombre: "hoy" },
  { ruta: "/matriz", nombre: "matriz" },
  { ruta: "/noticia/cupo-endeudamiento-bogota", nombre: "noticia" },
  { ruta: "/tendencias", nombre: "tendencias" },
  { ruta: "/verificacion", nombre: "verificacion" },
  { ruta: "/ideas", nombre: "ideas" },
  { ruta: "/fuentes", nombre: "fuentes" },
  { ruta: "/guia", nombre: "guia" },
  { ruta: "/showcase", nombre: "showcase" },
];

export const vistas = [
  { nombre: "escritorio", width: 1440, height: 900 },
  { nombre: "movil", width: 360, height: 780 },
];
