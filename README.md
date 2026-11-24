# Trafiker

Radar diario de noticias y tendencias políticas en Colombia, con IA. Proyecto privado de uso interno.

Cada madrugada recolecta notas de medios colombianos, las agrupa por hecho, detecta temas que suben, marca datos dudosos cruzando con fact-checkers (siempre con enlace a la fuente) y genera un resumen en Markdown con ideas de contenido para el día.

## Cómo correrlo

> En construcción: los scripts llegan en los próximos pasos.

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # y completa las claves en .env
python scripts/recolectar.py   # → data/AAAA-MM-DD.json
python scripts/reportar.py     # → reportes/AAAA-MM-DD.md
```

## Estructura

```
trafiker/
├── CLAUDE.md        reglas del proyecto (memoria para Claude)
├── config/          fuentes (medios.yaml), temas y verificación
├── scripts/         recolección y reporte
├── data/            notas crudas por día (ignorado en git)
└── reportes/        resúmenes diarios (ignorado en git)
```
