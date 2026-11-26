"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { claseCampo } from "@/components/ui/Campo";
import { Boton } from "@/components/ui/Boton";

export function Acceso() {
  const router = useRouter();
  const entrar = (e: FormEvent) => {
    e.preventDefault();
    router.push("/login/2fa");
  };
  return (
    <>
      <h1 className="text-secundario titular md:text-hero">Buenos días.</h1>
      <p className="mt-3 text-cuerpo text-muted">Entra para ver el brief de hoy.</p>
      <form onSubmit={entrar} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-chico">
          Correo
          <input type="email" name="correo" autoComplete="username" required className={claseCampo} placeholder="tu@campaña.co" />
        </label>
        <label className="flex flex-col gap-1.5 text-chico">
          Contraseña
          <input type="password" name="clave" autoComplete="current-password" required className={claseCampo} />
        </label>
        <Boton variante="primario" type="submit" className="mt-2 h-[42px] w-full">
          Entrar
        </Boton>
      </form>
      <p className="mt-6 text-dato text-muted">Acceso solo visual: cualquier dato funciona en este prototipo.</p>
    </>
  );
}
