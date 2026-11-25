---
name: trafiker-flujo-git
description: Úsala SIEMPRE al empezar una sesión en el repo de Trafiker y antes de cualquier cambio de código, commit, push, rebase, merge o Pull Request. Contiene el contexto del proyecto, la rutina para revisar los últimos cambios en origin y las reglas para no pisar el trabajo de la otra persona.
---

# Trafiker: flujo de trabajo con git

En el repo trabajan dos personas, **Majo** y **Alejandro**, cada una con su propio Claude Code. Esta skill sirve para que ninguna pise el trabajo de la otra y para que `main` siempre funcione.

Explica cada paso en español y en lenguaje simple. Majo está aprendiendo, así que cuando aparezca un concepto (rama, rebase, PR, skill, agente…) explícalo en una frase.

---

## 1. Contexto de Trafiker

**Qué es:** un radar diario de noticias y tendencias políticas en Colombia, con IA. Es un proyecto privado de uso interno.

**Flujo del radar** (según el `README.md`):
1. **Recolectar:** cada madrugada trae notas de medios colombianos (RSS, GDELT) → `data/AAAA-MM-DD.json`.
2. **Agrupar por hecho:** junta las notas que hablan del mismo suceso.
3. **Detectar tendencias:** marca los temas que están subiendo.
4. **Verificar:** marca los datos dudosos cruzándolos con fact-checkers, siempre con el enlace a la fuente.
5. **Reportar:** genera un resumen en Markdown → `reportes/AAAA-MM-DD.md`.
6. **Ideas de contenido:** el reporte incluye propuestas de contenido para el día.

> Pendiente: el plan habla de 7 pasos, pero el repo todavía no los tiene escritos. Cuando Majo los defina, hay que reemplazar esta lista.

**Estado actual** (noviembre de 2026):
- `main` tiene la estructura inicial (`config/`, `scripts/`, todavía vacíos), el `README.md`, el `CLAUDE.md` y el `CONTRIBUTING.md`.
- Hay un prototipo de interfaz web en Next.js (`web/`) con datos de ejemplo (`web/src/mocks/`), en la rama `feat/ui`.
- Todavía faltan los scripts `recolectar.py` y `reportar.py`. El hito siguiente es `v0.1.0`, el primer prototipo del reporte diario.

**Reglas del producto** (vienen de `CLAUDE.md`):
- *Privacidad:* nada se publica ni se envía a nadie. La única excepción es el código, que va al repo **privado** `trafiker` en GitHub. `data/` y `reportes/` nunca se suben.
- *Fuentes:* los RSS de El Tiempo y Google News son solo para uso personal no comercial, dentro de este piloto. Nada de scraping de X/Twitter: X queda para una fase posterior con su API oficial.
- *GDELT:* como máximo, 1 petición cada 5 segundos.
- *Veracidad:* no inventar datos, cifras ni citas. Cada hallazgo lleva el enlace de su fuente. No asignar línea editorial por cuenta propia: se deja `a validar` hasta que la usuaria la ponga.
- *Secretos:* nunca pedir ni pegar claves o tokens en el chat. Las claves van en `.env`, que git ignora. `.env.example` solo lleva los nombres de las variables, sin valores.
- *Forma de trabajo:* paso a paso, y pedir OK antes de instalar cosas, crear archivos grandes o hacer cambios en GitHub.

---

## 2. Rutina de inicio de sesión

Haz esto al empezar, antes de tocar cualquier archivo:

```bash
git status                                   # ¿en qué rama estoy? ¿hay cambios sin guardar?
git fetch --prune origin                     # trae lo nuevo de GitHub y olvida las ramas que ya se borraron allá
git log --format='%h %an (%ar): %s' main..origin/main   # commits nuevos en main que aún no tengo
git diff --stat main origin/main             # qué archivos cambiaron
gh pr list                                   # PRs abiertos y de quién son
```

Después **cuéntale a la usuaria en lenguaje simple** qué hay de nuevo. Por ejemplo: "Alejandro unió ayer un PR que agrega el recolector de RSS; cambió `scripts/recolectar.py` y `config/medios.yaml`". Si no hay nada nuevo, dilo también.

Luego actualiza `main`:

- **Si estás en `main` y no hay cambios sin guardar:** `git pull --rebase origin main`.
- **Si estás en tu rama sin cambios sin guardar:** `git fetch origin main:main` actualiza `main` sin cambiar de rama. Después ofrece `git rebase origin/main` para traer esos cambios a tu rama.
- **Si hay cambios sin guardar:** no cambies de rama ni hagas rebase. Pregunta antes si se commitean o se guardan con `git stash`.

Si `gh` no está instalado, avisa y pide OK antes de instalarlo (`brew install gh` y luego `gh auth login`). Mientras tanto, los PRs se ven en https://github.com/almanma/trafiker/pulls.

---

## 3. Flujo para cada cambio

1. **Una rama por cambio, con el prefijo de su autor:** `majo/<tipo>-<tema>` o `alejo/<tipo>-<tema>`. Los tipos son los de `CONTRIBUTING.md`: `feat`, `fix`, `docs`, `chore`, `refactor`. Ejemplos: `majo/feat-recolector-rss`, `alejo/fix-fechas-gdelt`.
   ```bash
   git switch main && git pull --rebase origin main
   git switch -c majo/feat-mi-cambio
   ```
2. **Antes de editar, revisa si algún PR abierto toca los mismos archivos:**
   ```bash
   gh pr list --json number,title,author,headRefName
   gh pr diff <número> --name-only          # archivos que toca ese PR
   ```
   Si coinciden, avisa a la usuaria antes de seguir. Lo mejor es coordinarse con la otra persona o esperar a que se una su PR.
3. **Commits con Conventional Commits:** `tipo: descripción corta en minúscula`, por ejemplo `feat: leer feeds de medios.yaml`. Un commit es un cambio con sentido propio. Agrega los archivos por nombre (`git add ruta/archivo`), nunca con `git add -A` a ciegas.
4. **Antes de cada push, haz rebase sobre `origin/main`:**
   ```bash
   git fetch origin
   git rebase origin/main
   ```
   Si hay conflictos, para y explícale a la usuaria qué choca con qué. No los resuelvas borrando el cambio de la otra persona.
5. **Sube solo tu propia rama:**
   ```bash
   git push -u origin majo/feat-mi-cambio
   ```
   Si la rama ya estaba en GitHub y le hiciste rebase, usa `git push --force-with-lease`, que es la versión segura del force push. Solo se puede en tu propia rama, nunca en `main` ni en ramas ajenas.
6. **Abre el PR con `gh`:**
   ```bash
   gh pr create --fill                      # usa --draft si está a medias
   ```
7. **Une el PR con squash merge** (`gh pr merge --squash --delete-branch`) solo si la otra persona lo revisó y aprobó, o si la usuaria da un OK explícito en ese momento. Nunca lo unas por iniciativa propia. Después: `git switch main && git pull --rebase origin main`.

---

## 4. Prohibido

- Hacer force push a `main`, o cualquier push directo a `main`.
- Usar `git reset --hard`, `git clean` o `git checkout -- .` sin un OK explícito de la usuaria, porque borran trabajo sin vuelta atrás.
- Borrar ramas ajenas, locales o remotas (`alejo/…` si eres Majo, `majo/…` si eres Alejandro).
- Commitear `.env`, claves, tokens o datos de `data/` y `reportes/`.
- Reescribir el historial de `main` (rebase, amend o reset sobre commits que ya están en `origin/main`).

Si alguna de estas acciones parece necesaria, detente, explica por qué y espera instrucciones.

---

## 5. Cierre de sesión

1. Haz commit de lo que esté listo y súbelo a tu rama (siguiendo el paso 4 del flujo).
2. Si el trabajo está a medias, abre o deja el PR **en borrador**: `gh pr create --draft --fill`. Así la otra persona ve en qué estás trabajando.
3. Deja un resumen de 3 líneas:
   - **Hecho:** qué cambió hoy.
   - **Pendiente:** qué falta y en qué rama o PR está.
   - **Ojo:** posibles choques con el trabajo de la otra persona, o decisiones por tomar.

---

## 6. Checklist antes de cada push

- [ ] Estoy en mi propia rama (`majo/…` o `alejo/…`), no en `main`.
- [ ] Hice `git fetch` y `git rebase origin/main` sin conflictos pendientes.
- [ ] Ningún PR abierto de la otra persona toca los mismos archivos, o ya lo hablamos.
- [ ] Los commits siguen Conventional Commits (`feat:`, `fix:`, `docs:`, …).
- [ ] `git diff --cached` no tiene `.env`, claves, tokens ni nada de `data/` o `reportes/`.
- [ ] No hay archivos ajenos al cambio (revisé `git status`).
- [ ] Lo que cambié funciona o está marcado como borrador.
- [ ] Si reescribí la rama, uso `--force-with-lease`, y nunca contra `main`.
