import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Splash } from "@/components/firma/Splash";
import { ProveedorApp } from "@/components/shell/Estado";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin", "latin-ext"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Trafiker", template: "%s | Trafiker" },
  description: "La sala de control de la madrugada. Radar diario de noticias políticas en Colombia.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F8FA" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0D10" },
  ],
};

/* Antes de pintar: tema guardado (o ?tema=) y si toca mostrar el splash.
   El splash se apaga si ya se vio en la sesión, si hay ?splash=0 o si la
   persona pidió reducir movimiento. */
const scriptInicio = `(function(){var d=document.documentElement;try{var q=new URLSearchParams(location.search);var t=q.get("tema")||localStorage.getItem("trafiker-tema-v2");if(t==="light"||t==="dark")d.setAttribute("data-theme",t)}catch(e){}try{var r=matchMedia("(prefers-reduced-motion: reduce)").matches;if(r||q.get("splash")==="0"||sessionStorage.getItem("trafiker-splash")){d.setAttribute("data-splash","no")}else{sessionStorage.setItem("trafiker-splash","1")}}catch(e){d.setAttribute("data-splash","no")}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" data-theme="light" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptInicio }} />
      </head>
      <body>
        <Splash />
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-signal focus:px-3 focus:py-2 focus:text-sobre-senal">
          Saltar al contenido
        </a>
        <ProveedorApp>{children}</ProveedorApp>
      </body>
    </html>
  );
}
