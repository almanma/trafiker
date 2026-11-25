import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import { ProveedorApp } from "@/components/shell/Estado";
import "./globals.css";

const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin", "latin-ext"], axes: ["opsz"], style: ["normal"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Trafiker", template: "%s | Trafiker" },
  description: "La sala de control de la madrugada. Radar diario de noticias políticas en Colombia.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0D12" },
    { media: "(prefers-color-scheme: light)", color: "#F7F4EE" },
  ],
};

const scriptTema = `(function(){try{var q=new URLSearchParams(location.search).get("tema");var t=q||localStorage.getItem("trafiker-tema");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" data-theme="dark" suppressHydrationWarning className={`${newsreader.variable} ${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
      </head>
      <body>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-signal focus:px-3 focus:py-2 focus:text-sobre-senal">
          Saltar al contenido
        </a>
        <ProveedorApp>{children}</ProveedorApp>
      </body>
    </html>
  );
}
