/**
 * Autochequeo de Trafiker (Playwright). Replica los criterios de check_screen:
 * contraste por texto, desborde a 390 px, textos encimados, objetivos táctiles,
 * imágenes y fuentes, colores fuera de tokens (ΔE OKLab), tipografía y las 16
 * señales de página generada. Escribe capturas/autochequeo.md.
 *
 * Uso: npx tsx scripts/autochequeo.ts   (con `npm run dev` corriendo)
 */
import { chromium, type Page } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { color } from "../src/styles/tokens";
import { BASE, rutas, vistas } from "./rutas";

type Sev = "alta" | "media" | "baja";
interface Hallazgo {
  cat: string;
  sev: Sev;
  donde: string;
  que: string;
  cambio: string;
  justificado?: string;
}

/* Señales que quedan a propósito, con su porqué (se reportan, no penalizan como media/alta). */
const justificaciones: { cat: string; ruta?: string; razon: string }[] = [
  { cat: "Marcadores 01/02", ruta: "/onboarding", razon: "El wizard tiene una secuencia real de 4 pasos; la sección 10 permite 01/02 solo aquí." },
  { cat: "Tarjetas idénticas", ruta: "/showcase", razon: "Galería de miniaturas: la uniformidad es el contenido (comparar pantallas). La primera ocupa el ancho completo para romper la serie." },
  { cat: "Tarjetas idénticas", ruta: "/guia", razon: "Muestras de radio y paleta: piezas de catálogo que deben medirse igual para compararse." },
  { cat: "Colores fuera del sistema", ruta: "/guia", razon: "La guía muestra a la vez las muestras de ambos temas; son tokens del otro modo." },
];

const tokensHex: string[] = Array.from(new Set<string>(Object.values(color).flatMap((t) => Object.values(t) as string[]))).concat([
  "rgba(255,255,255,0.1)",
  "rgba(255,255,255,0.06)",
  "rgba(0,0,0,0)",
]);

async function analizar(page: Page, movil: boolean) {
  return page.evaluate(
    ({ tokens, movil }) => {
      const H: { cat: string; sev: "alta" | "media" | "baja"; donde: string; que: string; cambio: string }[] = [];
      const push = (cat: string, sev: "alta" | "media" | "baja", el: Element | null, que: string, cambio: string) => H.push({ cat, sev, donde: el ? describir(el) : "documento", que, cambio });

      function describir(el: Element) {
        const partes: string[] = [];
        let e: Element | null = el;
        for (let i = 0; e && i < 3; i++, e = e.parentElement) {
          let s = e.tagName.toLowerCase();
          if (e.id) s += `#${e.id}`;
          const aria = e.getAttribute("aria-label");
          if (aria && i === 0) s += `[aria-label="${aria.slice(0, 30)}"]`;
          partes.unshift(s);
        }
        const t = (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40);
        return `${partes.join(" > ")}${t ? ` «${t}»` : ""}`;
      }

      /* ── color utils ── */
      const cv = document.createElement("canvas");
      cv.width = cv.height = 1;
      const cx = cv.getContext("2d", { willReadFrequently: true })!;
      function rgba(c: string): [number, number, number, number] | null {
        if (!c || c === "transparent") return [0, 0, 0, 0];
        const m = c.match(/^rgba?\(([^)]+)\)$/);
        if (m) {
          const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
          return [p[0], p[1], p[2], p[3] ?? 1];
        }
        cx.clearRect(0, 0, 1, 1);
        cx.fillStyle = "#000";
        cx.fillStyle = c;
        cx.fillRect(0, 0, 1, 1);
        const d = cx.getImageData(0, 0, 1, 1).data;
        return [d[0], d[1], d[2], d[3] / 255];
      }
      const lin = (v: number) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      };
      const lum = (c: number[]) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
      const ratio = (a: number[], b: number[]) => {
        const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
        return (x + 0.05) / (y + 0.05);
      };
      const mezclar = (top: number[], bot: number[]) => {
        const a = top[3];
        return [top[0] * a + bot[0] * (1 - a), top[1] * a + bot[1] * (1 - a), top[2] * a + bot[2] * (1 - a), 1];
      };
      function oklab(c: number[]) {
        const [r, g, b] = [lin(c[0]), lin(c[1]), lin(c[2])].map((v) => v);
        const l = Math.cbrt(0.4122214708 * r + 0.5363371558 * g + 0.0514459929 * b);
        const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
        const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
        return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
      }
      const tokRgba = tokens.map((t) => rgba(t)!);

      const fondoRaiz = rgba(getComputedStyle(document.documentElement).backgroundColor)!;
      function fondo(el: Element): number[] | null {
        const capas: number[][] = [];
        for (let e: Element | null = el; e; e = e.parentElement) {
          const cs = getComputedStyle(e);
          if (e !== document.body && e !== document.documentElement && cs.backgroundImage !== "none" && !cs.backgroundImage.startsWith("url(")) return null;
          const c = rgba(cs.backgroundColor)!;
          if (c[3] > 0) {
            capas.push(c);
            if (c[3] >= 1) break;
          }
        }
        let base = fondoRaiz[3] ? fondoRaiz : [11, 13, 18, 1];
        for (let i = capas.length - 1; i >= 0; i--) base = capas[i][3] >= 1 ? capas[i] : mezclar(capas[i], base);
        return base;
      }

      function visible(el: Element) {
        const r = el.getBoundingClientRect();
        if (r.width < 2 || r.height < 2) return false;
        for (let e: Element | null = el; e; e = e.parentElement) {
          const cs = getComputedStyle(e);
          if (cs.display === "none" || cs.visibility === "hidden" || Number(cs.opacity) === 0) return false;
          if (cs.clip === "rect(0px, 0px, 0px, 0px)" || cs.clipPath === "inset(50%)") return false;
        }
        return true;
      }
      const enSvg = (el: Element) => !!el.closest("svg");
      const conTextoDirecto = (el: Element) => Array.from(el.childNodes).some((n) => n.nodeType === 3 && (n.textContent || "").trim().length > 0);

      const todos = Array.from(document.body.querySelectorAll("*")).filter((e) => !enSvg(e) && e.tagName !== "SCRIPT" && e.tagName !== "STYLE");
      const textos = todos.filter((e) => conTextoDirecto(e) && visible(e));

      /* 1. Contraste */
      for (const el of textos) {
        if ((el as HTMLButtonElement).disabled || el.closest("[disabled],[aria-disabled=true]")) continue;
        const cs = getComputedStyle(el);
        const fg = rgba(cs.color)!;
        const bg = fondo(el);
        if (!bg) continue;
        const efectivo = fg[3] < 1 ? mezclar(fg, bg) : fg;
        const r = ratio(efectivo, bg);
        const size = parseFloat(cs.fontSize);
        const negrita = Number(cs.fontWeight) >= 700;
        const umbral = size >= 24 || (size >= 18.66 && negrita) ? 3 : 4.5;
        if (r < umbral) push("Contraste", "alta", el, `Contraste ${r.toFixed(2)}:1 (mínimo ${umbral}:1) a ${size}px`, "Usa text o muted sobre bg/surface; evita muted sobre surface-2 en tamaños chicos.");
      }

      /* 2. Desborde (390) */
      if (movil && document.documentElement.scrollWidth > innerWidth) {
        push("Desborde", "alta", null, `scrollWidth ${document.documentElement.scrollWidth} > ${innerWidth}`, "Revisa anchos fijos y min-w.");
        for (const el of todos) {
          const r = el.getBoundingClientRect();
          if (r.right > innerWidth + 1 && visible(el)) {
            let recortado = false;
            for (let p = el.parentElement; p; p = p.parentElement) {
              const o = getComputedStyle(p).overflowX;
              if (o === "auto" || o === "hidden" || o === "scroll" || o === "clip") {
                recortado = true;
                break;
              }
            }
            if (!recortado) push("Desborde", "alta", el, `Borde derecho en ${Math.round(r.right)}px`, "Limita el ancho o envuelve en overflow-x-auto.");
          }
        }
      }

      /* 3. Textos encimados (390) */
      if (movil) {
        const fijo = (e: Element) => {
          for (let p: Element | null = e; p; p = p.parentElement) {
            const pos = getComputedStyle(p).position;
            if (pos === "fixed" || pos === "sticky") return true;
          }
          return false;
        };
        // Un elemento en línea que se parte en varias líneas tiene una caja por línea: se mide cada una.
        const cajas = textos
          .filter((e) => !fijo(e))
          .flatMap((e) => (getComputedStyle(e).display === "inline" ? Array.from(e.getClientRects()) : [e.getBoundingClientRect()]).map((r) => ({ e, r })));
        for (let i = 0; i < cajas.length; i++)
          for (let j = i + 1; j < cajas.length; j++) {
            const a = cajas[i],
              b = cajas[j];
            if (a.e === b.e || a.e.contains(b.e) || b.e.contains(a.e)) continue;
            const w = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
            const h = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
            if (w <= 0 || h <= 0) continue;
            const menor = Math.min(a.r.width * a.r.height, b.r.width * b.r.height);
            if ((w * h) / menor > 0.1) push("Textos encimados", "media", a.e, `Se tapa con ${describir(b.e)} (${Math.round(((w * h) / menor) * 100)} %)`, "Revisa posiciones absolutas y alturas fijas.");
          }
      }

      /* 4. Objetivos táctiles (móvil) */
      if (movil) {
        for (const el of Array.from(document.querySelectorAll("a[href],button,input:not([type=hidden]),select,textarea,[role=button],[tabindex='0']"))) {
          if (!visible(el) || enSvg(el)) continue;
          const r = el.getBoundingClientRect();
          if (r.height >= 44) continue;
          const cs = getComputedStyle(el);
          const enLinea = cs.display === "inline" && el.parentElement && /^(P|LI|SPAN|DD|TD)$/.test(el.parentElement.tagName);
          const etiquetaCheck = el.tagName === "INPUT" && (el as HTMLInputElement).type === "checkbox" ? el.closest("label") : null;
          if (etiquetaCheck && etiquetaCheck.getBoundingClientRect().height >= 44) continue;
          push("Objetivo táctil", enLinea ? "baja" : "media", el, `Alto ${Math.round(r.height)}px${enLinea ? " (enlace en línea, excepción WCAG 2.5.8)" : ""}`, "min-h-11 en móvil.");
        }
      }

      /* 5. Imágenes y fuentes */
      for (const img of Array.from(document.images)) if (img.complete && img.naturalWidth === 0) push("Imagen rota", "alta", img, img.currentSrc || img.src, "Revisa la ruta del archivo.");
      const caras = Array.from(document.fonts);
      for (const f of caras) if (f.status === "error") push("Fuente", "alta", null, `No cargó ${f.family}`, "Revisa next/font.");
      const usada = (sel: string) => (document.querySelector(sel) ? getComputedStyle(document.querySelector(sel)!).fontFamily : "");
      for (const fam of ["Newsreader", "Inter"]) {
        const cargada = caras.some((f) => f.family.includes(fam) && f.status === "loaded");
        if (!cargada && caras.some((f) => f.family.includes(fam))) push("Fuente", "alta", null, `${fam} declarada pero no cargada`, "Revisa preload/subsets.");
      }

      /* 6. Colores fuera del sistema */
      const vistos = new Set<string>();
      for (const el of todos) {
        if (!visible(el)) continue;
        const cs = getComputedStyle(el);
        const muestras: [string, string][] = [];
        if (conTextoDirecto(el)) muestras.push(["texto", cs.color]);
        if (rgba(cs.backgroundColor)![3] > 0) muestras.push(["fondo", cs.backgroundColor]);
        if (parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== "none") muestras.push(["borde", cs.borderTopColor]);
        if (parseFloat(cs.borderLeftWidth) > 0 && cs.borderLeftStyle !== "none") muestras.push(["borde", cs.borderLeftColor]);
        for (const [tipo, c] of muestras) {
          const v = rgba(c)!;
          if (v[3] === 0) continue;
          const lv = oklab(v);
          let mejor = Infinity;
          for (const t of tokRgba) {
            if (Math.abs(t[3] - v[3]) > 0.03) continue;
            const lt = oklab(t);
            mejor = Math.min(mejor, Math.hypot(lv[0] - lt[0], lv[1] - lt[1], lv[2] - lt[2]));
          }
          const clave = `${tipo}:${c}`;
          if (mejor > 0.06 && !vistos.has(clave)) {
            vistos.add(clave);
            push("Colores fuera del sistema", "alta", el, `${tipo} ${c} (ΔE ${mejor === Infinity ? "sin token con ese alfa" : mejor.toFixed(3)})`, "Usa un token de tokens.ts.");
          }
        }
      }

      /* 7. Tipografía */
      for (const h of Array.from(document.querySelectorAll("h1,h2"))) {
        if (!visible(h)) continue;
        if (!/newsreader/i.test(getComputedStyle(h).fontFamily)) push("Tipografía", "alta", h, `Titular en ${getComputedStyle(h).fontFamily.split(",")[0]}`, "Los h1/h2 van en Newsreader.");
      }
      if (!/inter/i.test(getComputedStyle(document.body).fontFamily)) push("Tipografía", "alta", document.body, "El cuerpo no usa Inter", "body con font-sans.");
      const tamanos = new Set(textos.map((e) => getComputedStyle(e).fontSize));
      if (tamanos.size > 9) push("Tipografía", "alta", null, `${tamanos.size} tamaños: ${Array.from(tamanos).join(", ")}`, "Usa solo los 8 de la escala.");
      void usada;

      /* 8. Las 16 señales */
      for (const el of todos) {
        const bi = getComputedStyle(el).backgroundImage;
        if (/gradient\(/.test(bi) && visible(el)) push("Degradado", "alta", el, bi.slice(0, 60), "Color plano de los tokens.");
      }
      for (const h of Array.from(document.querySelectorAll("h1,h2,h3,h4"))) {
        const prev = h.previousElementSibling;
        if (prev && visible(prev)) {
          const cs = getComputedStyle(prev);
          const t = (prev.textContent || "").trim();
          if (parseFloat(cs.fontSize) <= 15 && t.length >= 3 && /[A-ZÁÉÍÓÚÑ]/.test(t) && (cs.textTransform === "uppercase" || t === t.toUpperCase()) && /[A-Za-zÁÉÍÓÚÑáéíóúñ]/.test(t))
            push("Eyebrow", "media", prev, `«${t.slice(0, 30)}» encima de ${h.tagName}`, "Quita la etiqueta en mayúsculas.");
        }
      }
      for (const h of Array.from(document.querySelectorAll("h1,h2"))) {
        const c = getComputedStyle(h).color;
        for (const s of Array.from(h.querySelectorAll("*"))) {
          if (!conTextoDirecto(s) || !visible(s)) continue;
          const cs = getComputedStyle(s);
          if (cs.color !== c || cs.fontStyle === "italic") push("Palabra destacada en titular", "media", s, `Color ${cs.color} o cursiva dentro de ${h.tagName}`, "Mismo color en todo el titular.");
        }
      }
      const controles = /^(A|BUTTON|INPUT|SELECT|TEXTAREA|LABEL|KBD)$/;
      for (const p of todos) {
        const hijos = Array.from(p.children).filter((c) => visible(c) && !controles.test(c.tagName) && !enSvg(c));
        const grupos = new Map<string, Element[]>();
        for (const c of hijos) {
          const cs = getComputedStyle(c);
          const radio = parseFloat(cs.borderTopLeftRadius);
          if (!(radio > 0) || radio > 100) continue;
          const caja = cs.boxShadow !== "none" || rgba(cs.backgroundColor)![3] > 0 || parseFloat(cs.borderTopWidth) > 0;
          if (!caja) continue;
          const k = `${cs.borderTopLeftRadius}|${cs.boxShadow}|${Math.round(c.getBoundingClientRect().width)}`;
          grupos.set(k, [...(grupos.get(k) ?? []), c]);
        }
        for (const [, g] of grupos) if (g.length >= 3 && (g[0].getBoundingClientRect().height > 40)) push("Tarjetas idénticas", "media", g[0], `${g.length} hermanos con igual radio, sombra y ancho`, "Varía la forma según el contenido (hero, lista, tabla, texto).");
      }
      const emoji = /\p{Extended_Pictographic}/u;
      for (const el of textos) if (emoji.test(Array.from(el.childNodes).map((n) => (n.nodeType === 3 ? n.textContent : "")).join(""))) push("Emoji", "alta", el, "Emoji en la UI", "Usa iconos Lucide o propios.");
      const flechas = Array.from(document.querySelectorAll("a,button")).filter((b) => visible(b) && /[→↗›»]\s*$/.test((b.textContent || "").trim()));
      if (flechas.length > 1) for (const b of flechas) push("Flecha al final", "media", b, "Botón o enlace que termina en flecha", "Máximo una por pantalla.");
      for (const el of textos) {
        const t = Array.from(el.childNodes).map((n) => (n.nodeType === 3 ? n.textContent : "")).join("").trim();
        if (/^0\d$/.test(t)) push("Marcadores 01/02", "media", el, `«${t}» suelto`, "Solo con secuencia real.");
        if (t.includes(" · ")) push("Separador ·", "media", el, "Metadatos unidos con « · »", "Etiqueta y valor en spans separados.");
      }
      for (const el of todos) {
        const bf = getComputedStyle(el).backdropFilter;
        const r = el.getBoundingClientRect();
        if (bf && bf !== "none" && r.width * r.height > 20000 && visible(el)) push("Vidrio", "media", el, `backdrop-filter en ${Math.round(r.width * r.height)} px²`, "Solo en la paleta ⌘K.");
      }
      for (const p of Array.from(document.querySelectorAll("p"))) {
        if (!visible(p)) continue;
        const cs = getComputedStyle(p);
        const t = (p.textContent || "").trim();
        if (t.length < 90) continue;
        cx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        const medio = cx.measureText(t).width / t.length;
        const porLinea = p.getBoundingClientRect().width / medio;
        if (porLinea > 85) push("Líneas largas", "media", p, `~${Math.round(porLinea)} caracteres por línea`, "max-w-lectura (65ch).");
      }
      const bloques = textos.filter((e) => getComputedStyle(e).display === "block");
      const centrados = bloques.filter((e) => getComputedStyle(e).textAlign === "center").length;
      if (bloques.length && centrados / bloques.length > 0.75) push("Todo centrado", "media", null, `${Math.round((centrados / bloques.length) * 100)} % centrado`, "Alinea a la izquierda.");
      const animados = todos.filter((e) => getComputedStyle(e).animationName !== "none" && visible(e));
      if (animados.length >= 5) push("Animación en todo", "media", animados[0], `${animados.length} elementos con animation-name`, "Un solo momento orquestado.");

      return { hallazgos: H, tamanos: Array.from(tamanos) };
    },
    { tokens: tokensHex, movil },
  );
}

function puntaje(h: Hallazgo[]) {
  const porCat = new Map<string, { sev: Sev; n: number }>();
  for (const x of h) {
    const sev: Sev = x.justificado ? "baja" : x.sev;
    const prev = porCat.get(x.cat);
    const peor = !prev || (sev === "alta" ? true : sev === "media" ? prev.sev !== "alta" : prev.sev === "baja") ? sev : prev.sev;
    porCat.set(x.cat, { sev: peor, n: (prev?.n ?? 0) + 1 });
  }
  let p = 100;
  for (const { sev, n } of porCat.values()) p -= sev === "alta" ? 12 + Math.min(n, 4) * 2 : sev === "media" ? 4 + Math.min(n, 4) : 1;
  return Math.max(0, p);
}

async function main() {
  mkdirSync("capturas", { recursive: true });
  const browser = await chromium.launch();
  const filas: { ruta: string; vista: string; tema: string; puntaje: number; h: Hallazgo[] }[] = [];
  for (const v of vistas) {
    for (const tema of ["dark", "light"]) {
      const ctx = await browser.newContext({ viewport: { width: v.width, height: v.height }, reducedMotion: "reduce" });
      // tsx (esbuild) inyecta __name en funciones; lo definimos en la página.
      await ctx.addInitScript("globalThis.__name = (f) => f;");
      const page = await ctx.newPage();
      for (const r of rutas) {
        await page.goto(`${BASE}${r.ruta}?tema=${tema}`, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(500);
        const { hallazgos } = await analizar(page, v.width < 500);
        for (const x of hallazgos) {
          const j = justificaciones.find((j) => j.cat === x.cat && (!j.ruta || j.ruta === r.ruta));
          if (j) (x as Hallazgo).justificado = j.razon;
        }
        const p = puntaje(hallazgos);
        filas.push({ ruta: r.ruta, vista: v.nombre, tema: tema === "dark" ? "oscuro" : "claro", puntaje: p, h: hallazgos });
        const altas = hallazgos.filter((x) => x.sev === "alta" && !(x as Hallazgo).justificado).length;
        console.log(`${String(p).padStart(3)}  ${r.ruta.padEnd(36)} ${v.nombre.padEnd(10)} ${tema.padEnd(5)} altas:${altas} total:${hallazgos.length}`);
      }
      await ctx.close();
    }
  }
  await browser.close();

  const fecha = new Date().toISOString().slice(0, 16).replace("T", " ");
  let md = `# Autochequeo de Trafiker\n\nGenerado ${fecha} contra ${BASE}. ${filas.length} combinaciones (ruta × vista × tema).\n\n`;
  const altas = filas.flatMap((f) => f.h).filter((x) => x.sev === "alta" && !x.justificado).length;
  md += `**Hallazgos de severidad alta sin justificar: ${altas}.**\n\n## Puntaje por pantalla\n\n| Ruta | Escritorio oscuro | Escritorio claro | Móvil oscuro | Móvil claro |\n|---|---|---|---|---|\n`;
  for (const r of rutas) {
    const c = (vista: string, tema: string) => filas.find((f) => f.ruta === r.ruta && f.vista === vista && f.tema === tema)!.puntaje;
    md += `| \`${r.ruta}\` | ${c("escritorio", "oscuro")} | ${c("escritorio", "claro")} | ${c("movil", "oscuro")} | ${c("movil", "claro")} |\n`;
  }
  md += `\n## Señales que quedan a propósito\n\n`;
  for (const j of justificaciones) md += `- **${j.cat}**${j.ruta ? ` en \`${j.ruta}\`` : ""}: ${j.razon}\n`;
  md += `\n## Detalle\n\n`;
  for (const f of filas) {
    if (!f.h.length) continue;
    md += `### \`${f.ruta}\` ${f.vista} ${f.tema} (puntaje ${f.puntaje})\n\n| Severidad | Criterio | Dónde | Qué | Qué cambiar |\n|---|---|---|---|---|\n`;
    for (const x of f.h.slice(0, 40)) md += `| ${x.justificado ? "justificado" : x.sev} | ${x.cat} | ${x.donde.replace(/\|/g, "/")} | ${x.que.replace(/\|/g, "/")} | ${x.justificado ?? x.cambio} |\n`;
    if (f.h.length > 40) md += `| … | | ${f.h.length - 40} más | | |\n`;
    md += `\n`;
  }
  writeFileSync("capturas/autochequeo.md", md);
  console.log(`\nAltas sin justificar: ${altas}. Reporte: capturas/autochequeo.md`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
