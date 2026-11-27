/* Capturas de cada ruta (1440 y 360, claro; Hoy y Matriz también en oscuro).
   Guarda en capturas/ y copia miniaturas a public/showcase/ para /showcase. */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { BASE, rutas, vistas } from "./rutas";

const solo = process.argv[2];

async function main() {
  mkdirSync("capturas", { recursive: true });
  mkdirSync("public/showcase", { recursive: true });
  const browser = await chromium.launch();
  for (const v of vistas) {
    const ctx = await browser.newContext({ viewport: { width: v.width, height: v.height }, deviceScaleFactor: 1, reducedMotion: "reduce" });
    // Sin splash: ya «se vio» en esta sesión.
    await ctx.addInitScript(() => {
      try {
        sessionStorage.setItem("trafiker-splash", "1");
      } catch {}
    });
    const page = await ctx.newPage();
    for (const r of rutas) {
      if (solo && r.nombre !== solo) continue;
      const temas = ["light", ...(r.nombre === "hoy" || r.nombre === "matriz" ? ["dark"] : [])];
      for (const t of temas) {
        await page.goto(`${BASE}${r.ruta}?tema=${t}`, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(400);
        const archivo = `capturas/${r.nombre}-${v.nombre}-${t === "dark" ? "oscuro" : "claro"}.png`;
        await page.screenshot({ path: archivo, fullPage: true });
        if (t === "light") {
          await page.screenshot({ path: `public/showcase/${r.nombre}-${v.nombre}.png`, fullPage: false });
        }
        console.log("✓", archivo);
      }
    }
    await ctx.close();
  }
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
