# Autochequeo de Trafiker

Generado 2026-11-25 00:36 contra http://localhost:3000. 48 combinaciones (ruta × vista × tema).

**Hallazgos de severidad alta sin justificar: 0.**

## Puntaje por pantalla

| Ruta | Escritorio oscuro | Escritorio claro | Móvil oscuro | Móvil claro |
|---|---|---|---|---|
| `/login` | 100 | 100 | 100 | 100 |
| `/login/2fa` | 100 | 100 | 100 | 100 |
| `/onboarding` | 99 | 99 | 99 | 99 |
| `/hoy` | 100 | 100 | 99 | 99 |
| `/matriz` | 100 | 100 | 100 | 100 |
| `/noticia/cupo-endeudamiento-bogota` | 100 | 100 | 99 | 99 |
| `/tendencias` | 100 | 100 | 100 | 100 |
| `/verificacion` | 100 | 100 | 100 | 100 |
| `/ideas` | 100 | 100 | 99 | 99 |
| `/fuentes` | 100 | 100 | 100 | 100 |
| `/guia` | 100 | 100 | 99 | 99 |
| `/showcase` | 100 | 100 | 100 | 100 |

## Señales que quedan a propósito

- **Marcadores 01/02** en `/onboarding`: El wizard tiene una secuencia real de 4 pasos; la sección 10 permite 01/02 solo aquí.
- **Tarjetas idénticas** en `/showcase`: Galería de miniaturas: la uniformidad es el contenido (comparar pantallas). La primera ocupa el ancho completo para romper la serie.
- **Tarjetas idénticas** en `/guia`: Muestras de radio y paleta: piezas de catálogo que deben medirse igual para compararse.
- **Colores fuera del sistema** en `/guia`: La guía muestra a la vez las muestras de ambos temas; son tokens del otro modo.

## Detalle

### `/onboarding` escritorio oscuro (puntaje 99)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Marcadores 01/02 | ol > li > span «01» | «01» suelto | El wizard tiene una secuencia real de 4 pasos; la sección 10 permite 01/02 solo aquí. |
| justificado | Marcadores 01/02 | ol > li > span «02» | «02» suelto | El wizard tiene una secuencia real de 4 pasos; la sección 10 permite 01/02 solo aquí. |
| justificado | Marcadores 01/02 | ol > li > span «03» | «03» suelto | El wizard tiene una secuencia real de 4 pasos; la sección 10 permite 01/02 solo aquí. |
| justificado | Marcadores 01/02 | ol > li > span «04» | «04» suelto | El wizard tiene una secuencia real de 4 pasos; la sección 10 permite 01/02 solo aquí. |

### `/onboarding` escritorio claro (puntaje 99)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Marcadores 01/02 | ol > li > span «01» | «01» suelto | El wizard tiene una secuencia real de 4 pasos; la sección 10 permite 01/02 solo aquí. |
| justificado | Marcadores 01/02 | ol > li > span «02» | «02» suelto | El wizard tiene una secuencia real de 4 pasos; la sección 10 permite 01/02 solo aquí. |
| justificado | Marcadores 01/02 | ol > li > span «03» | «03» suelto | El wizard tiene una secuencia real de 4 pasos; la sección 10 permite 01/02 solo aquí. |
| justificado | Marcadores 01/02 | ol > li > span «04» | «04» suelto | El wizard tiene una secuencia real de 4 pasos; la sección 10 permite 01/02 solo aquí. |

### `/onboarding` movil oscuro (puntaje 99)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Marcadores 01/02 | ol > li > span «01» | «01» suelto | El wizard tiene una secuencia real de 4 pasos; la sección 10 permite 01/02 solo aquí. |
| justificado | Marcadores 01/02 | ol > li > span «02» | «02» suelto | El wizard tiene una secuencia real de 4 pasos; la sección 10 permite 01/02 solo aquí. |
| justificado | Marcadores 01/02 | ol > li > span «03» | «03» suelto | El wizard tiene una secuencia real de 4 pasos; la sección 10 permite 01/02 solo aquí. |
| justificado | Marcadores 01/02 | ol > li > span «04» | «04» suelto | El wizard tiene una secuencia real de 4 pasos; la sección 10 permite 01/02 solo aquí. |

### `/hoy` movil oscuro (puntaje 99)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| baja | Objetivo táctil | span > span > a «DANE» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | span > span > a «Colombiacheck» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | span > span > a «Banco de la República» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |

### `/noticia/cupo-endeudamiento-bogota` movil oscuro (puntaje 99)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| baja | Objetivo táctil | ul > li > a «Fuente: El Tiempo» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > a «Fuente: Caracol» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > a «Fuente: La República» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |

### `/ideas` movil oscuro (puntaje 99)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| baja | Objetivo táctil | article > p > a «El Tiempo» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > p > a «El Tiempo» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | article > p > a «El Heraldo» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | article > p > a «El Tiempo» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > p > a «Registraduría» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | article > p > a «DANE» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > p > a «El Tiempo» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |

### `/guia` movil oscuro (puntaje 99)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| baja | Objetivo táctil | tr > td > a «linear.app/» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | tr > td > a «resend.com/» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | tr > td > a «www.ft.com/» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | tr > td > a «www.raycast.com/» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | tr > td > a «www.theverge.com/» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | tr > td > a «ground.news/» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |

### `/onboarding` movil claro (puntaje 99)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| justificado | Marcadores 01/02 | ol > li > span «01» | «01» suelto | El wizard tiene una secuencia real de 4 pasos; la sección 10 permite 01/02 solo aquí. |
| justificado | Marcadores 01/02 | ol > li > span «02» | «02» suelto | El wizard tiene una secuencia real de 4 pasos; la sección 10 permite 01/02 solo aquí. |
| justificado | Marcadores 01/02 | ol > li > span «03» | «03» suelto | El wizard tiene una secuencia real de 4 pasos; la sección 10 permite 01/02 solo aquí. |
| justificado | Marcadores 01/02 | ol > li > span «04» | «04» suelto | El wizard tiene una secuencia real de 4 pasos; la sección 10 permite 01/02 solo aquí. |

### `/hoy` movil claro (puntaje 99)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| baja | Objetivo táctil | span > span > a «DANE» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | span > span > a «Colombiacheck» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | span > span > a «Banco de la República» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |

### `/noticia/cupo-endeudamiento-bogota` movil claro (puntaje 99)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| baja | Objetivo táctil | ul > li > a «Fuente: El Tiempo» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > a «Fuente: Caracol» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | ul > li > a «Fuente: La República» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |

### `/ideas` movil claro (puntaje 99)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| baja | Objetivo táctil | article > p > a «El Tiempo» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > p > a «El Tiempo» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | article > p > a «El Heraldo» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | article > p > a «El Tiempo» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > p > a «Registraduría» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | article > p > a «DANE» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | div > p > a «El Tiempo» | Alto 15px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |

### `/guia` movil claro (puntaje 99)

| Severidad | Criterio | Dónde | Qué | Qué cambiar |
|---|---|---|---|---|
| baja | Objetivo táctil | tr > td > a «linear.app/» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | tr > td > a «resend.com/» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | tr > td > a «www.ft.com/» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | tr > td > a «www.raycast.com/» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | tr > td > a «www.theverge.com/» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |
| baja | Objetivo táctil | tr > td > a «ground.news/» | Alto 16px (enlace en línea, excepción WCAG 2.5.8) | min-h-11 en móvil. |

