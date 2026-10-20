# Diseño del portafolio (`portfolio`)

Decidido en conversación el 2026-08-31, antes de crear el proyecto. Al arrancar el proyecto nuevo, esto se puede pasar a `docs/DECISIONS.md` de ese repo (Decisión 1) y usarse como referencia mientras se construye.

## Objetivo y audiencia

Sitio de presentación personal para compartir en CV/LinkedIn. Audiencia principal: reclutadores técnicos y otros desarrolladores evaluando el trabajo. Debe transmitir en los primeros segundos: quién es, qué sabe hacer, y dar acceso rápido a un proyecto real y completo (Vacantia) que lo demuestre.

## Estructura: una sola página con scroll

Todo vive en `andymallcco.dev/` (una sola ruta), con un nav fijo (sticky) que enlaza a anclas dentro de la misma página — no navega a URLs distintas, hace scroll suave a cada sección.

**Nota para el futuro:** si más adelante se suman más proyectos (2do, 3er proyecto propio), reconsiderar el paso a multi-página (React Router, una ruta por proyecto con su propio case study) — la sola-página deja de alcanzar bien cuando hay más de 2-3 proyectos con detalle real que mostrar. Por ahora, con Vacantia como proyecto único, una sola página es lo correcto.

Secciones, en orden:

1. **Header / Nav** — fijo arriba. Logo o nombre a la izquierda; a la derecha, links a las anclas (Sobre mí, Proyectos, Contacto) + botón/link "Descargar CV" + iconos de GitHub y LinkedIn.
2. **Hero (Inicio)** — nombre, un tagline corto (rol + qué hace, ej. "Desarrollador Full Stack — construyo productos con IA de punta a punta"), 1-2 líneas de intro, dos botones de acción: "Ver proyectos" (ancla a Proyectos) y "Descargar CV".
3. **Sobre mí** — foto, bio corta (2-3 párrafos), puede incluir una fila de badges/iconos con el stack que maneja (React, Django, Docker, PostgreSQL, etc. — reusar los que ya se probaron en producción con Vacantia).
4. **Proyectos** — por ahora, una sola card/case-study grande: **Vacantia**. Ver detalle de contenido más abajo.
5. **Contacto** — email directo (mailto, sin formulario ni backend), + los mismos links de GitHub/LinkedIn del header repetidos acá.
6. **Footer** — copyright corto, mismos links de contacto.

## Qué mostrar de Vacantia (la pieza central)

No es solo un link — es el argumento de venta del portafolio, así que merece espacio real:

- **Qué es:** plataforma de reclutamiento con IA — un candidato postula con su CV, un filtro con IA evalúa el fit contra el puesto, y si aprueba, hace una entrevista de voz real con un entrevistador de IA (voz a voz, no un chat de texto).
- **Por qué es interesante técnicamente** (esto es lo que un reclutador técnico va a valorar más que "hice un CRUD"):
  - Pipeline de voz completo y en tiempo real: React → Socket.io → Django → Celery → Deepgram (STT) → DeepSeek (LLM) → ElevenLabs (TTS) → de vuelta al navegador.
  - Autenticación híbrida JWT (access en memoria, refresh en cookie httpOnly) con roles reales vía Django Groups.
  - Trabajo de seguridad real y documentado: se encontró y cerró un hueco de costo en producción (el gateway aceptaba conexiones sin autenticar y gastaba dinero real en APIs de IA), rate limiting, permisos por defecto seguros — no es un ejercicio de tutorial, es hardening real sobre un sistema ya en producción.
  - Desplegado end-to-end en un VPS propio (Docker Compose, Nginx, Certbot), no solo corriendo en local.
- **Qué enlazar:** el sitio en vivo (`vacantia.andymallcco.dev`), el repo en GitHub, y opcionalmente 2-3 screenshots (catálogo público, panel de reclutador, la entrevista de voz en curso).

## Estilo visual: oscuro y técnico

- **Fondo:** oscuro (ej. `#0a0a0f` a `#111118`, no negro puro — más suave a la vista).
- **Acento de marca:** morado `#c084fc` (el mismo `--primary` que ya usa Vacantia en modo oscuro, `frontend/src/index.css`) — da coherencia visual entre el portafolio y el proyecto que enlaza.
- **Texto:** blanco roto / gris muy claro para el cuerpo (no blanco puro — cansa menos), el acento morado para links y elementos interactivos.
- **Tipografía:** una sans-serif moderna para todo el texto (ej. Inter), y una monoespaciada (ej. JetBrains Mono o Fira Code) para detalles técnicos puntuales — el tagline, los badges de stack, quizás el nombre en el hero — dando ese toque "developer" sin abusar de ella en párrafos largos.
- **Referencias de esta estética:** Vercel, Linear, GitHub en modo oscuro — minimalista, con espacio, un solo color de acento bien usado en vez de una paleta cargada.

## Contenido confirmado (más allá de Vacantia)

- **CV descargable:** un botón que descarga un PDF del currículum, además de poder verlo resumido en la sección "Sobre mí".
- **Sección "Sobre mí"** con foto y bio (no solo lo profesional — también intereses/motivación breve).
- **Links a redes:** GitHub y LinkedIn, visibles en el header y repetidos en el footer/contacto.

## Stack técnico (ya decidido, ver también el README de esta misma carpeta)

React + Vite + TypeScript + Tailwind + shadcn/ui + pnpm. Sin backend, sin Docker — build estático servido por Nginx en el mismo VPS de Vacantia, en el dominio raíz `andymallcco.dev`.
