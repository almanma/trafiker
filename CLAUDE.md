# Trafiker — reglas del proyecto

Radar diario de noticias y tendencias políticas en Colombia. La usuaria está aprendiendo: explicar en español y en pocas palabras cada decisión y cada concepto (agente, skill, memoria, MCP) cuando aparezca.

## Privacidad
- El proyecto es privado: nada se publica ni se envía a nadie.
- Única excepción autorizada: el código va al repo **privado** de GitHub `trafiker`. Los reportes y datos (`data/`, `reportes/`) no se suben.
- Los RSS de El Tiempo y de Google News son solo para uso personal no comercial: únicamente en este piloto interno.
- Nada de scraping de X/Twitter. X queda para una fase posterior con su API oficial.

## Veracidad
- No inventar datos, cifras ni citas.
- Todo hallazgo lleva el enlace de su fuente.
- No asignar línea editorial por cuenta propia: dejar `a validar` hasta que la usuaria la ponga.

## Secretos
- Nunca pedir ni pegar claves o tokens en el chat.
- Las claves van en `.env` (ignorado en git). `.env.example` solo lleva nombres de variables, sin valores.

## Forma de trabajo
- Paso a paso. Pedir OK antes de instalar cosas, crear archivos grandes o hacer cambios en GitHub.
- Ramas `feat/`, `fix/`, `docs/`; commits con Conventional Commits; `main` siempre estable (ver `CONTRIBUTING.md`).
- GDELT: máximo 1 petición cada 5 s.
