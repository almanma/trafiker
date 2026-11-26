import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EstadoServidor } from "@/components/firma/EstadoServidor";
import { DetalleNoticia } from "@/components/firma/DetalleNoticia";
import { SkeletonDetalle } from "@/components/firma/Skeletons";
import { noticiaPorId, noticias } from "@/mocks/noticias";

export function generateStaticParams() {
  return noticias.map((n) => ({ id: n.id }));
}

export async function generateMetadata({ params }: PageProps<"/noticia/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: noticiaPorId[id]?.titular ?? "Noticia" };
}

export default async function PaginaNoticia({ params, searchParams }: PageProps<"/noticia/[id]">) {
  const { id } = await params;
  const n = noticiaPorId[id];
  if (!n) notFound();
  return (
    <div className="-mx-4 md:-mx-8">
      <nav aria-label="Migas" className="px-4 pb-4 text-chico text-muted md:px-8">
        <Link href="/hoy" className="inline-flex min-h-11 items-center md:min-h-0 underline decoration-border-strong underline-offset-4 hover:text-text">
          Hoy
        </Link>
        <span aria-hidden className="px-2">/</span>
        <span>{n.tema}</span>
      </nav>
      <Suspense fallback={<SkeletonDetalle />}>
        <EstadoServidor busqueda={searchParams} esqueleto={<SkeletonDetalle />}>
          <DetalleNoticia noticia={n} />
        </EstadoServidor>
      </Suspense>
    </div>
  );
}
