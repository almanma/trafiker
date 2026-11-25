import type { SVGProps } from "react";

/* Tres iconos propios, trazo 1,5 px como Lucide. */

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 20): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
});

/** Radar: dos anillos, un barrido y un punto detectado. */
export function IconoRadar({ size, ...p }: P) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <path d="M12 12 L18.4 5.6" />
      <circle cx="16" cy="9.2" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Balanza de sesgo: astil, brazo inclinado y dos platillos desiguales. */
export function IconoBalanza({ size, ...p }: P) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M12 4v16" />
      <path d="M8 20h8" />
      <path d="M4.5 8.5 L19.5 6" />
      <path d="M4.5 8.5 L2.5 13.5h4z" />
      <path d="M19.5 6 L17.5 11h4z" />
    </svg>
  );
}

/** Lupa de verificación: lente con una marca de chequeo dentro. */
export function IconoLupa({ size, ...p }: P) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 L20 20" />
      <path d="M7.8 10.6 l1.9 1.9 l3.4-3.6" />
    </svg>
  );
}
