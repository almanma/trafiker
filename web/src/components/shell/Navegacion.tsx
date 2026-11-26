"use client";

import { BookOpen, LayoutGrid, Lightbulb, Rss, Settings, TrendingUp } from "lucide-react";
import { IconoBalanza, IconoLupa, IconoRadar } from "../firma/Iconos";

export const secciones = [
  { href: "/hoy", nombre: "Hoy", tecla: "H", Icono: IconoRadar, movil: true },
  { href: "/matriz", nombre: "Matriz", tecla: "M", Icono: IconoBalanza, movil: true },
  { href: "/tendencias", nombre: "Tendencias", tecla: "T", Icono: TrendingUp, movil: true },
  { href: "/verificacion", nombre: "Verificación", tecla: "V", Icono: IconoLupa, movil: true },
  { href: "/ideas", nombre: "Ideas", tecla: "I", Icono: Lightbulb, movil: true },
  { href: "/fuentes", nombre: "Fuentes", tecla: "F", Icono: Rss, movil: false },
] as const;

export const secundarias = [
  { href: "/onboarding", nombre: "Configurar campaña", Icono: Settings },
  { href: "/guia", nombre: "Guía de marca", Icono: BookOpen },
  { href: "/showcase", nombre: "Showcase", Icono: LayoutGrid },
] as const;

export const atajos: { teclas: string[]; que: string }[] = [
  { teclas: ["⌘", "K"], que: "Abrir la paleta de comandos" },
  { teclas: ["/"], que: "Buscar (abre la paleta)" },
  { teclas: ["J"], que: "Siguiente noticia" },
  { teclas: ["K"], que: "Noticia anterior" },
  { teclas: ["Enter"], que: "Abrir el detalle" },
  { teclas: ["E"], que: "Convertir en idea" },
  { teclas: ["V"], que: "Ver la verificación" },
  { teclas: ["G", "H"], que: "Ir a Hoy" },
  { teclas: ["G", "M"], que: "Ir a la Matriz" },
  { teclas: ["G", "T"], que: "Ir a Tendencias" },
  { teclas: ["G", "V"], que: "Ir a Verificación" },
  { teclas: ["G", "I"], que: "Ir a Ideas" },
  { teclas: ["G", "F"], que: "Ir a Fuentes" },
  { teclas: ["?"], que: "Ver esta ayuda" },
];
