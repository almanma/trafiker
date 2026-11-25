import { clsx, type ClassValue } from "clsx";

export function cn(...valores: ClassValue[]) {
  return clsx(valores);
}
