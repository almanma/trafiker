"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import { Boton } from "@/components/ui/Boton";
import { cn } from "@/lib/cn";

/** QR decorativo determinista (no codifica nada real). */
function QrEjemplo() {
  const n = 25;
  const celdas: [number, number][] = [];
  let s = 7;
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      const esquina = (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
      if (!esquina && s % 100 < 48) celdas.push([x, y]);
    }
  const ojo = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" className="fill-text" />
      <rect x={x + 1} y={y + 1} width="5" height="5" className="fill-bg" />
      <rect x={x + 2} y={y + 2} width="3" height="3" className="fill-text" />
    </g>
  );
  return (
    <svg viewBox={`-2 -2 ${n + 4} ${n + 4}`} className="h-40 w-40 rounded-control bg-bg" role="img" aria-label="Código QR de ejemplo para Google Authenticator">
      {celdas.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" className="fill-text" />
      ))}
      {ojo(0, 0)}
      {ojo(n - 7, 0)}
      {ojo(0, n - 7)}
    </svg>
  );
}

export function Codigo() {
  const router = useRouter();
  const [digitos, setDigitos] = useState<string[]>(Array(6).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const poner = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    setDigitos((ds) => ds.map((x, j) => (j === i ? d : x)));
    if (d && i < 5) refs.current[i + 1]?.focus();
  };
  const pegar = (e: ClipboardEvent<HTMLInputElement>) => {
    const t = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!t) return;
    e.preventDefault();
    setDigitos(Array.from({ length: 6 }, (_, i) => t[i] ?? ""));
    refs.current[Math.min(t.length, 5)]?.focus();
  };
  const tecla = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digitos[i] && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < 5) refs.current[i + 1]?.focus();
  };
  const completo = digitos.every(Boolean);

  return (
    <>
      <h1 className="text-secundario serif-display md:text-hero">Segundo factor.</h1>
      <p className="mt-3 text-cuerpo text-muted">Escanea el código con Google Authenticator y escribe los seis dígitos que aparecen.</p>
      <div className="mt-8 flex items-start gap-5">
        <div className="rounded-control bg-surface-2 p-2 shadow-[inset_0_0_0_1px_var(--t-border)]">
          <QrEjemplo />
        </div>
        <p className="text-dato text-muted">
          ¿No puedes escanear? Usa esta clave:
          <span className="mt-1 block break-all font-mono text-text">TRFK 4F2Q 9XLM 7K3P</span>
        </p>
      </div>
      <form
        className="mt-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (completo) router.push("/hoy");
        }}
      >
        <fieldset>
          <legend className="text-chico">Código de 6 dígitos</legend>
          <div className="mt-2 flex gap-2">
            {digitos.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                value={d}
                onChange={(e) => poner(i, e.target.value)}
                onPaste={pegar}
                onKeyDown={(e) => tecla(i, e)}
                inputMode="numeric"
                autoComplete={i === 0 ? "one-time-code" : "off"}
                aria-label={`Dígito ${i + 1}`}
                maxLength={1}
                className={cn(
                  "h-11 md:h-[42px] w-full min-w-0 rounded-control bg-input text-center font-mono text-lectura tabular text-text shadow-[inset_0_0_0_1px_var(--t-border)]",
                  i === 2 && "mr-2",
                  d && "shadow-[inset_0_0_0_1px_var(--t-border-strong)]",
                )}
              />
            ))}
          </div>
        </fieldset>
        <Boton variante="primario" type="submit" disabled={!completo} className="mt-6 h-[42px] w-full">
          Verificar y entrar
        </Boton>
      </form>
      <p className="mt-6 text-dato text-muted">Prototipo: cualquier código de seis dígitos pasa. Puedes pegarlo completo.</p>
    </>
  );
}
