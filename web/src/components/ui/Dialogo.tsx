"use client";

import * as D from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { transPanel } from "@/lib/movimiento";

/** Diálogo centrado (Radix Dialog, re-estilizado con tokens). */
export function Dialogo({
  abierto,
  onCambio,
  titulo,
  descripcion,
  children,
  className,
}: {
  abierto: boolean;
  onCambio: (v: boolean) => void;
  titulo: string;
  descripcion?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <D.Root open={abierto} onOpenChange={onCambio}>
      <AnimatePresence>
        {abierto && (
          <D.Portal forceMount>
            <D.Overlay asChild forceMount>
              <motion.div className="fixed inset-0 z-40 bg-bg" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} exit={{ opacity: 0 }} transition={transPanel} />
            </D.Overlay>
            <D.Content asChild forceMount>
              <motion.div
                className={cn(
                  "fixed left-1/2 top-[12vh] z-50 w-[calc(100vw-32px)] max-w-lg -translate-x-1/2 rounded-panel bg-surface-2 p-6 shadow-flota",
                  className,
                )}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={transPanel}
              >
                <D.Title className="text-tarjeta titular">{titulo}</D.Title>
                {descripcion ? (
                  <D.Description className="mt-1 text-chico text-muted">{descripcion}</D.Description>
                ) : (
                  <D.Description className="sr-only">{titulo}</D.Description>
                )}
                <div className="mt-5">{children}</div>
                <D.Close className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-control text-muted hover:bg-surface hover:text-text md:h-9 md:w-9" aria-label="Cerrar">
                  <X size={16} strokeWidth={1.5} />
                </D.Close>
              </motion.div>
            </D.Content>
          </D.Portal>
        )}
      </AnimatePresence>
    </D.Root>
  );
}

/** Drawer lateral derecho (en móvil, hoja inferior a pantalla casi completa). */
export function Drawer({
  abierto,
  onCambio,
  titulo,
  children,
}: {
  abierto: boolean;
  onCambio: (v: boolean) => void;
  titulo: string;
  children: ReactNode;
}) {
  return (
    <D.Root open={abierto} onOpenChange={onCambio}>
      <AnimatePresence>
        {abierto && (
          <D.Portal forceMount>
            <D.Overlay asChild forceMount>
              <motion.div className="fixed inset-0 z-40 bg-bg" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }} transition={transPanel} />
            </D.Overlay>
            <D.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                className="fixed inset-x-0 bottom-0 top-12 z-50 overflow-y-auto rounded-t-panel bg-surface shadow-flota md:inset-y-0 md:left-auto md:right-0 md:top-0 md:w-[min(720px,92vw)] md:rounded-none md:rounded-l-panel"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={transPanel}
              >
                <D.Title className="sr-only">{titulo}</D.Title>
                <D.Close className="sticky top-3 z-10 float-right mr-3 mt-3 grid h-11 w-11 place-items-center rounded-control bg-surface text-muted hover:bg-surface-2 hover:text-text md:h-9 md:w-9" aria-label="Cerrar detalle">
                  <X size={16} strokeWidth={1.5} />
                </D.Close>
                {children}
              </motion.div>
            </D.Content>
          </D.Portal>
        )}
      </AnimatePresence>
    </D.Root>
  );
}
