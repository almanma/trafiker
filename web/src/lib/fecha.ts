/** Fechas en español de Colombia, sin depender de la zona horaria del servidor. */
const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

function partes(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return { y, m, d, dow };
}

/** "martes 24 de noviembre" */
export function fechaLarga(iso: string) {
  const { m, d, dow } = partes(iso);
  return `${dias[dow]} ${d} de ${meses[m - 1]}`;
}

/** "24/11/2026" */
export function fechaCorta(iso: string) {
  const { y, m, d } = partes(iso);
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
}

export const zonaHoraria = "Hora de Colombia (UTC−5)";
