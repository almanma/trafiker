# Autochequeo de Trafiker

Generado 2026-11-26 23:53 contra http://localhost:3000. 48 combinaciones (ruta × vista × tema).

**Hallazgos de severidad alta sin justificar: 0.**

## Puntaje por pantalla

| Ruta | Escritorio oscuro | Escritorio claro | Móvil oscuro | Móvil claro |
|---|---|---|---|---|
| `/login` | 100 | 100 | 100 | 100 |
| `/login/2fa` | 100 | 100 | 100 | 100 |
| `/onboarding` | 99 | 99 | 98 | 98 |
| `/hoy` | 98 | 98 | 97 | 97 |
| `/matriz` | 98 | 98 | 97 | 97 |
| `/noticia/cupo-endeudamiento-bogota` | 99 | 99 | 98 | 98 |
| `/tendencias` | 98 | 98 | 98 | 98 |
| `/verificacion` | 97 | 97 | 96 | 96 |
| `/ideas` | 98 | 98 | 97 | 97 |
| `/fuentes` | 98 | 98 | 98 | 98 |
| `/guia` | 97 | 97 | 97 | 97 |
| `/showcase` | 99 | 99 | 99 | 99 |

## Señales que quedan a propósito

- **Tarjetas idénticas**: El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada.
- **Vidrio**: Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida.
- **Separador ·**: En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa.
- **Flecha al final**: ↗ marca enlaces que abren la fuente original en otra pestaña; → solo en «Ver en la matriz».
- **Colores fuera del sistema** en `/guia`: La guía muestra muestras de color y la escala en ambos temas; son tokens.

## Detalle

### `/onboarding` escritorio oscuro (puntaje 99)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Vidrio | body > div > header «TrafierDatos de ejemploSalir» | backdrop-filter en 84960 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |
| justificado | Vidrio | body > div > footer «AtrásPaso 1 de 4Siguiente» | backdrop-filter en 87840 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/hoy` escritorio oscuro (puntaje 98)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Separador · | li > div > p «Economía · Nacional» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | li > div > p «Elecciones · Nacional» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | li > div > p «Movilidad · Valle del Cauca» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | ul > li > p «Dicho en Semana · contraste DANE» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | ul > li > p «Dicho en Noticias Uno · contraste Colomb» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | ul > li > p «Dicho en La República · contraste Banco » | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 68400 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/matriz` escritorio oscuro (puntaje 98)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Separador · | div > div > span «Movilidad · 9 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Economía · 9 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Salud · 7 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Seguridad · 6 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Infraestructura · 4 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Congreso · 5 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Servicios públicos · 4 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Elecciones · 3 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Movilidad · 2 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Economía · 3 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 68400 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/noticia/cupo-endeudamiento-bogota` escritorio oscuro (puntaje 99)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 68400 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/tendencias` escritorio oscuro (puntaje 98)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Separador · | div > div > span «notas · cambio» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «notas · cambio» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 68400 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/verificacion` escritorio oscuro (puntaje 97)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Tarjetas idénticas | div > div > article «FalsoExpediente DESEMPLEO«El desempleo e» | 6 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Separador · | div > div > p «Evidencia · fuente oficial» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > p «Evidencia · fact-checker» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > p «Evidencia · fuente oficial» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > p «Evidencia · fuente oficial» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > p «Evidencia · fact-checker» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > p «Evidencia · fact-checker» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 68400 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/ideas` escritorio oscuro (puntaje 98)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Tarjetas idénticas | div > div > section «Sugerida3Video· 20 s72 %Las cuentas del » | 4 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 68400 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/fuentes` escritorio oscuro (puntaje 98)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Tarjetas idénticas | div > div > div «Responden11 de 12» | 3 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 68400 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/guia` escritorio oscuro (puntaje 97)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Tarjetas idénticas | div > ul > li «MarcaAcción principal, foco, lo nuevo#0F» | 3 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Tarjetas idénticas | div > ul > li «FondoLienzo de la app#F7F8FA» | 7 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Tarjetas idénticas | div > ul > li «Verificado#17703F5,51:1 sobre su tinte» | 4 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Tarjetas idénticas | div > ul > li «IzquierdaIzquierda#5B45C96,29:1» | 3 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Tarjetas idénticas | div > ul > li «LinearDensidad, filas de 1 px y foco vis» | 4 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Separador · | ul > li > span «Actualizado 04:52 · 9 medios · +64 %» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > p > span «11:11 · 04:52 · 1.248 · 99 %» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 68400 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/showcase` escritorio oscuro (puntaje 99)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 68400 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/onboarding` escritorio claro (puntaje 99)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Vidrio | body > div > header «TrafierDatos de ejemploSalir» | backdrop-filter en 84960 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |
| justificado | Vidrio | body > div > footer «AtrásPaso 1 de 4Siguiente» | backdrop-filter en 87840 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/hoy` escritorio claro (puntaje 98)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Separador · | li > div > p «Economía · Nacional» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | li > div > p «Elecciones · Nacional» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | li > div > p «Movilidad · Valle del Cauca» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | ul > li > p «Dicho en Semana · contraste DANE» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | ul > li > p «Dicho en Noticias Uno · contraste Colomb» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | ul > li > p «Dicho en La República · contraste Banco » | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 68400 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/matriz` escritorio claro (puntaje 98)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Separador · | div > div > span «Movilidad · 9 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Economía · 9 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Salud · 7 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Seguridad · 6 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Infraestructura · 4 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Congreso · 5 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Servicios públicos · 4 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Elecciones · 3 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Movilidad · 2 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Economía · 3 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 68400 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/noticia/cupo-endeudamiento-bogota` escritorio claro (puntaje 99)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 68400 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/tendencias` escritorio claro (puntaje 98)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Separador · | div > div > span «notas · cambio» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «notas · cambio» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 68400 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/verificacion` escritorio claro (puntaje 97)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Tarjetas idénticas | div > div > article «FalsoExpediente DESEMPLEO«El desempleo e» | 6 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Separador · | div > div > p «Evidencia · fuente oficial» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > p «Evidencia · fact-checker» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > p «Evidencia · fuente oficial» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > p «Evidencia · fuente oficial» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > p «Evidencia · fact-checker» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > p «Evidencia · fact-checker» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 68400 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/ideas` escritorio claro (puntaje 98)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Tarjetas idénticas | div > div > section «Sugerida3Video· 20 s72 %Las cuentas del » | 4 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 68400 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/fuentes` escritorio claro (puntaje 98)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Tarjetas idénticas | div > div > div «Responden11 de 12» | 3 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 68400 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/guia` escritorio claro (puntaje 97)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Tarjetas idénticas | div > ul > li «MarcaAcción principal, foco, lo nuevo#0F» | 3 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Tarjetas idénticas | div > ul > li «FondoLienzo de la app#F7F8FA» | 7 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Tarjetas idénticas | div > ul > li «Verificado#17703F5,51:1 sobre su tinte» | 4 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Tarjetas idénticas | div > ul > li «IzquierdaIzquierda#5B45C96,29:1» | 3 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Tarjetas idénticas | div > ul > li «LinearDensidad, filas de 1 px y foco vis» | 4 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Separador · | ul > li > span «Actualizado 04:52 · 9 medios · +64 %» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > p > span «11:11 · 04:52 · 1.248 · 99 %» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 68400 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/showcase` escritorio claro (puntaje 99)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 68400 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/onboarding` movil oscuro (puntaje 98)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| baja | Objetivo táctil | ul > li > button[aria-label="San Andrés"] «SAP» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="La Guajira"] «LAG» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Atlántico"] «ATL» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Magdalena"] «MAG» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Cesar"] «CES» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Córdoba"] «COR» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Sucre"] «SUC» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Bolívar"] «BOL» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Norte de Santander"] «NSA» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Chocó"] «CHO» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Antioquia"] «ANT» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Santander"] «SAN» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Boyacá"] «BOY» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Arauca"] «ARA» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Risaralda"] «RIS» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Caldas"] «CAL» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Cundinamarca"] «CUN» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Casanare"] «CAS» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Vichada"] «VIC» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Valle del Cauca"] «VAC» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Quindío"] «QUI» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Tolima"] «TOL» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Bogotá D. C."] «BOG» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Meta"] «MET» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Guainía"] «GUA» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Cauca"] «CAU» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Huila"] «HUI» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Caquetá"] «CAQ» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Guaviare"] «GVR» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Vaupés"] «VAU» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Nariño"] «NAR» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Putumayo"] «PUT» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Amazonas"] «AMA» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| justificado | Vidrio | body > div > header «TrafierDatos de ejemploSalir» | backdrop-filter en 21240 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |
| justificado | Vidrio | body > div > footer «AtrásPaso 1 de 4Siguiente» | backdrop-filter en 24840 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/hoy` movil oscuro (puntaje 97)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| baja | Objetivo táctil | li > p > a «DANE» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | li > p > a «Colombiacheck» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | li > p > a «Banco de la República» | Alto 32px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| justificado | Separador · | li > div > p «Economía · Nacional» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | li > div > p «Elecciones · Nacional» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | li > div > p «Movilidad · Valle del Cauca» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | ul > li > p «Dicho en Semana · contraste DANE» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | ul > li > p «Dicho en Noticias Uno · contraste Colomb» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | ul > li > p «Dicho en La República · contraste Banco » | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |
| justificado | Vidrio | body > div > nav[aria-label="Secciones"] «HoyMatrizTendenciasVerificarIdeasMenú» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/matriz` movil oscuro (puntaje 97)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| baja | Objetivo táctil | div > div > button «El Concejo de Bogotá aplaza otra vez el » | Alto 40px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > div > button «Hacienda anuncia un recorte al presupues» | Alto 40px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > div > button «La comisión del Senado vuelve a aplazar » | Alto 40px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > div > button «La Gobernación del Cauca pide refuerzo d» | Alto 40px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > div > button «Antioquia discute el aumento de peajes e» | Alto 40px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > div > button «Un senador de la oposición radica moción» | Alto 40px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > div > button «Usuarios de la Costa Caribe protestan po» | Alto 40px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > div > button «La Registraduría abre consulta pública s» | Alto 40px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > div > button «El Concejo de Cali cita a debate de cont» | Alto 40px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > div > button «Analistas esperan que el Banco de la Rep» | Alto 40px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| justificado | Separador · | div > div > span «Movilidad · 9 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Economía · 9 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Salud · 7 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Seguridad · 6 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Infraestructura · 4 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Congreso · 5 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Servicios públicos · 4 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Elecciones · 3 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Movilidad · 2 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Economía · 3 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |
| justificado | Vidrio | body > div > nav[aria-label="Secciones"] «HoyMatrizTendenciasVerificarIdeasMenú» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/noticia/cupo-endeudamiento-bogota` movil oscuro (puntaje 98)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| baja | Objetivo táctil | ul > li > a «Fuente: El Tiempo» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > a «Fuente: Caracol» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > a «Fuente: La República» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |
| justificado | Vidrio | body > div > nav[aria-label="Secciones"] «HoyMatrizTendenciasVerificarIdeasMenú» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/tendencias` movil oscuro (puntaje 98)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Separador · | div > div > span «notas · cambio» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «notas · cambio» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |
| justificado | Vidrio | body > div > nav[aria-label="Secciones"] «HoyMatrizTendenciasVerificarIdeasMenú» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/verificacion` movil oscuro (puntaje 96)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| baja | Objetivo táctil | div > p > a «SSemana» | Alto 28px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > p > a «N1Noticias Uno» | Alto 28px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > p > a «ETEl Tiempo» | Alto 28px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > p > a «LRLa República» | Alto 28px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > p > a «N1Noticias Uno» | Alto 28px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > p > a «ETEl Tiempo» | Alto 28px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| justificado | Tarjetas idénticas | div > div > article «FalsoExpediente DESEMPLEO«El desempleo e» | 6 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Separador · | div > div > p «Evidencia · fuente oficial» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > p «Evidencia · fact-checker» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > p «Evidencia · fuente oficial» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > p «Evidencia · fuente oficial» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > p «Evidencia · fact-checker» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > p «Evidencia · fact-checker» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |
| justificado | Vidrio | body > div > nav[aria-label="Secciones"] «HoyMatrizTendenciasVerificarIdeasMenú» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/ideas` movil oscuro (puntaje 97)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| baja | Objetivo táctil | article > p > a «El Tiempo» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | article > p > a «El Tiempo» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | article > p > a «El Heraldo» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | article > p > a «El Tiempo» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | article > p > a «Registraduría» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | article > p > a «DANE» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| justificado | Tarjetas idénticas | div > div > section «Sugerida3Video· 20 s72 %Las cuentas del » | 4 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |
| justificado | Vidrio | body > div > nav[aria-label="Secciones"] «HoyMatrizTendenciasVerificarIdeasMenú» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/fuentes` movil oscuro (puntaje 98)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Tarjetas idénticas | div > div > div «Responden11 de 12» | 3 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |
| justificado | Vidrio | body > div > nav[aria-label="Secciones"] «HoyMatrizTendenciasVerificarIdeasMenú» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/guia` movil oscuro (puntaje 97)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Tarjetas idénticas | div > ul > li «MarcaAcción principal, foco, lo nuevo#0F» | 3 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Tarjetas idénticas | div > ul > li «FondoLienzo de la app#F7F8FA» | 7 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Tarjetas idénticas | div > ul > li «Verificado#17703F5,51:1 sobre su tinte» | 4 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Tarjetas idénticas | div > ul > li «IzquierdaIzquierda#5B45C96,29:1» | 3 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Tarjetas idénticas | div > ul > li «LinearDensidad, filas de 1 px y foco vis» | 4 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Separador · | ul > li > span «Actualizado 04:52 · 9 medios · +64 %» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > p > span «11:11 · 04:52 · 1.248 · 99 %» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |
| justificado | Vidrio | body > div > nav[aria-label="Secciones"] «HoyMatrizTendenciasVerificarIdeasMenú» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/showcase` movil oscuro (puntaje 99)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |
| justificado | Vidrio | body > div > nav[aria-label="Secciones"] «HoyMatrizTendenciasVerificarIdeasMenú» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/onboarding` movil claro (puntaje 98)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| baja | Objetivo táctil | ul > li > button[aria-label="San Andrés"] «SAP» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="La Guajira"] «LAG» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Atlántico"] «ATL» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Magdalena"] «MAG» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Cesar"] «CES» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Córdoba"] «COR» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Sucre"] «SUC» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Bolívar"] «BOL» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Norte de Santander"] «NSA» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Chocó"] «CHO» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Antioquia"] «ANT» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Santander"] «SAN» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Boyacá"] «BOY» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Arauca"] «ARA» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Risaralda"] «RIS» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Caldas"] «CAL» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Cundinamarca"] «CUN» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Casanare"] «CAS» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Vichada"] «VIC» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Valle del Cauca"] «VAC» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Quindío"] «QUI» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Tolima"] «TOL» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Bogotá D. C."] «BOG» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Meta"] «MET» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Guainía"] «GUA» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Cauca"] «CAU» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Huila"] «HUI» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Caquetá"] «CAQ» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Guaviare"] «GVR» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Vaupés"] «VAU» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Nariño"] «NAR» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Putumayo"] «PUT» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > button[aria-label="Amazonas"] «AMA» | Alto 43px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| justificado | Vidrio | body > div > header «TrafierDatos de ejemploSalir» | backdrop-filter en 21240 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |
| justificado | Vidrio | body > div > footer «AtrásPaso 1 de 4Siguiente» | backdrop-filter en 24840 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/hoy` movil claro (puntaje 97)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| baja | Objetivo táctil | li > p > a «DANE» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | li > p > a «Colombiacheck» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | li > p > a «Banco de la República» | Alto 32px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| justificado | Separador · | li > div > p «Economía · Nacional» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | li > div > p «Elecciones · Nacional» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | li > div > p «Movilidad · Valle del Cauca» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | ul > li > p «Dicho en Semana · contraste DANE» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | ul > li > p «Dicho en Noticias Uno · contraste Colomb» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | ul > li > p «Dicho en La República · contraste Banco » | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |
| justificado | Vidrio | body > div > nav[aria-label="Secciones"] «HoyMatrizTendenciasVerificarIdeasMenú» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/matriz` movil claro (puntaje 97)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| baja | Objetivo táctil | div > div > button «El Concejo de Bogotá aplaza otra vez el » | Alto 40px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > div > button «Hacienda anuncia un recorte al presupues» | Alto 40px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > div > button «La comisión del Senado vuelve a aplazar » | Alto 40px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > div > button «La Gobernación del Cauca pide refuerzo d» | Alto 40px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > div > button «Antioquia discute el aumento de peajes e» | Alto 40px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > div > button «Un senador de la oposición radica moción» | Alto 40px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > div > button «Usuarios de la Costa Caribe protestan po» | Alto 40px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > div > button «La Registraduría abre consulta pública s» | Alto 40px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > div > button «El Concejo de Cali cita a debate de cont» | Alto 40px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > div > button «Analistas esperan que el Banco de la Rep» | Alto 40px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| justificado | Separador · | div > div > span «Movilidad · 9 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Economía · 9 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Salud · 7 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Seguridad · 6 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Infraestructura · 4 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Congreso · 5 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Servicios públicos · 4 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Elecciones · 3 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Movilidad · 2 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «Economía · 3 medios» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |
| justificado | Vidrio | body > div > nav[aria-label="Secciones"] «HoyMatrizTendenciasVerificarIdeasMenú» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/noticia/cupo-endeudamiento-bogota` movil claro (puntaje 98)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| baja | Objetivo táctil | ul > li > a «Fuente: El Tiempo» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > a «Fuente: Caracol» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > a «Fuente: La República» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |
| justificado | Vidrio | body > div > nav[aria-label="Secciones"] «HoyMatrizTendenciasVerificarIdeasMenú» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/tendencias` movil claro (puntaje 98)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Separador · | div > div > span «notas · cambio» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > span «notas · cambio» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |
| justificado | Vidrio | body > div > nav[aria-label="Secciones"] «HoyMatrizTendenciasVerificarIdeasMenú» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/verificacion` movil claro (puntaje 96)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| baja | Objetivo táctil | div > p > a «SSemana» | Alto 28px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > p > a «N1Noticias Uno» | Alto 28px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > p > a «ETEl Tiempo» | Alto 28px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > p > a «LRLa República» | Alto 28px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > p > a «N1Noticias Uno» | Alto 28px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > p > a «ETEl Tiempo» | Alto 28px (cumple AA 24 px; AAA pide 44) | min-h-11 en móvil. |
| justificado | Tarjetas idénticas | div > div > article «FalsoExpediente DESEMPLEO«El desempleo e» | 6 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Separador · | div > div > p «Evidencia · fuente oficial» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > p «Evidencia · fact-checker» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > p «Evidencia · fuente oficial» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > p «Evidencia · fuente oficial» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > p «Evidencia · fact-checker» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > div > p «Evidencia · fact-checker» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |
| justificado | Vidrio | body > div > nav[aria-label="Secciones"] «HoyMatrizTendenciasVerificarIdeasMenú» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/ideas` movil claro (puntaje 97)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| baja | Objetivo táctil | article > p > a «El Tiempo» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | article > p > a «El Tiempo» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | article > p > a «El Heraldo» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | article > p > a «El Tiempo» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | article > p > a «Registraduría» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | article > p > a «DANE» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| justificado | Tarjetas idénticas | div > div > section «Sugerida3Video· 20 s72 %Las cuentas del » | 4 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |
| justificado | Vidrio | body > div > nav[aria-label="Secciones"] «HoyMatrizTendenciasVerificarIdeasMenú» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/fuentes` movil claro (puntaje 98)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Tarjetas idénticas | div > div > div «Responden11 de 12» | 3 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |
| justificado | Vidrio | body > div > nav[aria-label="Secciones"] «HoyMatrizTendenciasVerificarIdeasMenú» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/guia` movil claro (puntaje 97)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Tarjetas idénticas | div > ul > li «MarcaAcción principal, foco, lo nuevo#0F» | 3 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Tarjetas idénticas | div > ul > li «FondoLienzo de la app#F7F8FA» | 7 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Tarjetas idénticas | div > ul > li «Verificado#17703F5,51:1 sobre su tinte» | 4 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Tarjetas idénticas | div > ul > li «IzquierdaIzquierda#5B45C96,29:1» | 3 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Tarjetas idénticas | div > ul > li «LinearDensidad, filas de 1 px y foco vis» | 4 hermanos con igual radio, sombra y ancho | El brief AAA pide tarjetas (noticias, ideas, expedientes, cifras). Cambian de contenido y la primera de Hoy es destacada. |
| justificado | Separador · | ul > li > span «Actualizado 04:52 · 9 medios · +64 %» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Separador · | div > p > span «11:11 · 04:52 · 1.248 · 99 %» | Metadatos unidos con « · » | En el sistema B el punto medio separa metadatos secundarios (patrón de Linear y Vercel); etiqueta y valor siguen en spans propios donde importa. |
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |
| justificado | Vidrio | body > div > nav[aria-label="Secciones"] «HoyMatrizTendenciasVerificarIdeasMenú» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

### `/showcase` movil claro (puntaje 99)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Vidrio | div > div > header «TrafierBogotá24/11/2026Datos de ejemploB» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |
| justificado | Vidrio | body > div > nav[aria-label="Secciones"] «HoyMatrizTendenciasVerificarIdeasMenú» | backdrop-filter en 20520 px² | Barras fijas (superior, inferior móvil, onboarding) al 85–95 % de opacidad con desenfoque: el texto siempre queda sobre superficie casi sólida. |

