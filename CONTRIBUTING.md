# Cómo trabajamos en Trafiker

## Ramas
- `main` está **siempre estable**: nunca se hace push directo a `main`.
- Cada cambio va en su propia rama, con un prefijo:
  - `feat/...` para funcionalidad nueva (ej. `feat/recolector-rss`)
  - `fix/...` para corregir errores (ej. `fix/fechas-gdelt`)
  - `docs/...` para documentación (ej. `docs/readme-instalacion`)

```bash
git switch main && git pull          # parte de main actualizado
git switch -c feat/mi-cambio         # crea la rama
```

## Commits (Conventional Commits)
Formato: `tipo: descripción corta en minúscula`

| Tipo | Cuándo | Ejemplo |
|---|---|---|
| `feat:` | algo nuevo | `feat: leer feeds de medios.yaml` |
| `fix:` | corrige un error | `fix: quitar duplicados por URL canónica` |
| `docs:` | solo documentación | `docs: explicar variables de .env` |
| `chore:` | mantenimiento | `chore: actualizar dependencias` |
| `refactor:` | reorganiza sin cambiar el resultado | `refactor: separar parser de GDELT` |

Un commit = un cambio con sentido propio.

## Pull Requests
```bash
git push -u origin feat/mi-cambio    # sube la rama
gh pr create --fill                  # abre el PR con el título/cuerpo del commit
gh pr view --web                     # revísalo en GitHub
gh pr merge --squash --delete-branch # al aprobarlo: une a main y borra la rama
git switch main && git pull          # trae main actualizado
```

Antes de pedir revisión: ningún `.env`, clave ni dato de `data/` o `reportes/` en el diff.

## Versiones (SemVer: `vMAYOR.MENOR.PARCHE`)
- **PARCHE** (`v0.1.1`): correcciones.
- **MENOR** (`v0.2.0`): funcionalidad nueva compatible.
- **MAYOR** (`v1.0.0`): cambios que rompen lo anterior. Mientras estemos en `0.x`, el proyecto es piloto.

Hitos previstos:
- `v0.1.0`: primer prototipo del reporte diario.

Publicar una versión (siempre desde `main` actualizado):
```bash
git switch main && git pull
git tag -a v0.1.0 -m "v0.1.0: primer prototipo del reporte diario"
git push origin v0.1.0
gh release create v0.1.0 --title "v0.1.0" --notes "Qué cambió: ..."
```
Las notas del release listan los cambios desde la versión anterior (`gh release create --generate-notes` las arma a partir de los PR).

## Protección de `main`
Regla: no hay push directo a `main`; todo entra por PR. Si el plan de GitHub lo permite, se refuerza en Settings > Branches.
