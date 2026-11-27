import { Wordmark } from "./Wordmark";

/**
 * Splash de entrada (1,4 s en total): tres anillos de radar aparecen, un
 * barrido da la vuelta y el logo sube; luego todo se desvanece hacia la app.
 * Es CSS puro y va en el HTML del servidor, así que no parpadea ni espera a
 * JavaScript. Solo en la primera carga de la sesión (ver scriptInicio).
 */
export function Splash() {
  return (
    <div className="splash" aria-hidden>
      <div className="flex flex-col items-center gap-5">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          {[38, 26, 14].map((r, i) => (
            <circle key={r} className="splash-anillo stroke-border-strong" style={{ animationDelay: `${i * 80}ms` }} cx="40" cy="40" r={r} strokeWidth="1" />
          ))}
          <g className="splash-barrido">
            <path d="M40 40 L40 2 A38 38 0 0 1 72.9 21 Z" className="fill-signal" opacity="0.14" />
            <path d="M40 40 L72.9 21" className="stroke-signal" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          <circle cx="40" cy="40" r="3" className="fill-signal" />
        </svg>
        <div className="splash-marca">
          <Wordmark alto={28} />
        </div>
      </div>
    </div>
  );
}
