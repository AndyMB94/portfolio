# Roadmap

Formato de cada fase:

## Fase N — Título corto (planificado AAAA-MM-DD)

**Contexto:** por qué se hace esta fase, qué problema resuelve o qué habilita.

**Decisión 1 — nombre corto.** Qué se decidió y por qué, en 2-3 líneas. Alternativas descartadas si vale la pena mencionarlas.

**Decisión 2 — ...**

Checklist:
- [ ] N.1 Descripción corta y verificable del paso. Al cerrarlo, se anota acá mismo cualquier hallazgo real (bug encontrado, comportamiento inesperado), no solo "hecho".
- [ ] N.2 ...

---

## Fase 1 — Scaffolding inicial (cerrada 2026-10-19)

**Contexto:** Punto de partida del proyecto: generar la base de React + Vite + TypeScript sobre la que se va a construir el resto (Tailwind, shadcn/ui, secciones del sitio), siguiendo el stack definido en `DECISIONS.md`.

**Decisión 1 — scaffolding con `pnpm create vite@latest`.** Se usó el wizard oficial con la plantilla `react-ts`, eligiendo "Ignore files and continue" para no perder `CLAUDE.md`/`docs/` ya presentes, y ESLint como linter (en vez de Oxlint, más nuevo pero con menos plugins para React/a11y todavía).

Checklist:
- [x] 1.1 `git init` + commit inicial con la documentación (`CLAUDE.md`, `docs/`).
- [x] 1.2 Scaffold con `pnpm create vite@latest . --template react-ts` (React 19, TypeScript, ESLint). Generó también un `README.md` genérico de Vite en la raíz, a reemplazar más adelante por el real del proyecto.
- [x] 1.3 Commit del scaffold antes de instalar dependencias.
- [x] 1.4 `pnpm install` — 160 paquetes, sin errores.
- [x] 1.5 Verificado en navegador: `pnpm dev` levanta en `localhost:5173` y muestra la página default de Vite+React sin errores de consola.

---

## Fase 2 — Tailwind CSS y shadcn/ui (cerrada 2026-10-19)

**Contexto:** Con el scaffolding de Vite funcionando (Fase 1), el siguiente paso es instalar el sistema de estilos y la librería de componentes definidos en `DECISIONS.md`, como base para construir las secciones reales del sitio.

**Decisión 1 — Tailwind CSS v4 vía plugin de Vite.** Se instaló `tailwindcss` + `@tailwindcss/vite` (en vez del `tailwind.config.js` + PostCSS de versiones anteriores), que es la integración recomendada para Vite en Tailwind v4.

**Decisión 2 — shadcn/ui sobre Base UI.** Al inicializar, shadcn ahora permite elegir el motor de primitivos (Base UI, React Aria o Radix UI); se eligió **Base UI**, la opción recomendada por los mantenedores y la que reemplaza a Radix como estándar. Se usó un preset "Custom" (sin preset predefinido) armado en `ui.shadcn.com`, con fuente Inter (coincide con `DESIGN.md`) e iconos Lucide — los colores exactos del tema (fondo oscuro, acento morado) quedan pendientes de la Fase 3, se van a pisar los valores default.

Checklist:
- [x] 2.1 Instalar `tailwindcss` + `@tailwindcss/vite`, agregar el plugin a `vite.config.ts` y reemplazar `src/index.css` por el import de Tailwind.
- [x] 2.2 Verificado en navegador: `pnpm dev` compila sin errores con Tailwind activo.
- [x] 2.3 Configurar alias de import `@/*` → `src/*` en `tsconfig.json`, `tsconfig.app.json` y `vite.config.ts` (requisito de shadcn/ui).
- [x] 2.4 Inicializar shadcn/ui (`shadcn init --preset b0`): generó `components.json`, `src/lib/utils.ts` y los tokens de tema (claro/oscuro) en `src/index.css`.
- [x] 2.5 Verificado en navegador: la página sigue renderizando sin errores con los estilos base de shadcn aplicados (fondo blanco, Inter, bordes).

---

## Fase 3 — Tema oscuro y tipografía (cerrada 2026-10-19)

**Contexto:** Con shadcn/ui inicializado (Fase 2) con tokens por defecto, el siguiente paso es aplicar los colores y tipografías reales definidos en `DESIGN.md` antes de construir las secciones del sitio.

**Decisión 1 — modo oscuro forzado, sin switcher.** El sitio es oscuro siempre (`DESIGN.md` no pide alternar claro/oscuro), así que se fuerza la clase `dark` en `<html>` en vez de agregar un toggle. El bloque `:root` (claro) queda sin usar, intacto, por compatibilidad con `shadcn add` si se agregan componentes más adelante.

**Decisión 2 — interpretación del rango de fondo.** `DESIGN.md` da un rango `#0a0a0f` a `#111118` para el fondo; se usó `#0a0a0f` como fondo de página y `#111118` para `card`/`popover` (superficies elevadas), dando una leve diferencia de profundidad entre ambos.

**Decisión 3 — JetBrains Mono vía `@fontsource-variable`.** Mismo patrón que Inter (que ya había instalado shadcn), declarada como `--font-mono` para usarla puntualmente con la clase `font-mono` de Tailwind donde corresponda (tagline, badges de stack) — no en el body completo.

Checklist:
- [x] 3.1 Forzar `class="dark"` en `index.html`.
- [x] 3.2 Sobreescribir los tokens de color del bloque `.dark` en `src/index.css` con los valores de `DESIGN.md` (fondo, card, acento morado `#c084fc`, texto, bordes).
- [x] 3.3 Verificado en navegador: fondo oscuro y acento morado aplicados correctamente, sin errores de consola.
- [x] 3.4 Corregido warning de Vite sobre `__dirname` → `import.meta.dirname` en `vite.config.ts`.
- [x] 3.5 Instalar y declarar JetBrains Mono (`@fontsource-variable/jetbrains-mono`) como `--font-mono`.
- [x] 3.6 Verificado: `pnpm dev` compila sin errores tras agregar la fuente.

---

## Fase 4 — Header / Nav (cerrada 2026-10-19)

**Contexto:** Primer componente de contenido real del sitio, según el orden de `DESIGN.md`. Define los anchors (`#sobre-mi`, `#proyectos`, `#contacto`) que el resto de las secciones van a usar, y el patrón de scroll suave con header sticky.

**Decisión 1 — íconos de GitHub/LinkedIn propios, sin librería nueva.** `lucide-react` (versión instalada, 1.x) dejó de incluir íconos de marcas — solo íconos genéricos. En vez de sumar una dependencia nueva (ej. `react-icons`) para apenas 2 íconos, se armaron como componentes SVG propios en `src/components/icons.tsx`, con los paths oficiales de cada logo.

**Decisión 2 — sin menú hamburguesa en mobile.** Por debajo de `md` se ocultan los links de texto del nav y se deja nombre + íconos sociales + botón CV. Para una sola página corta, agregar un menú hamburguesa es complejidad que no se justifica todavía.

**Decisión 3 — `Button` de Base UI con `render` en vez de `asChild`.** Base UI (el motor de shadcn elegido en Fase 2) usa la prop `render` para polimorfismo, no `asChild` como Radix. Al renderizar el botón "Descargar CV" como un `<a href download>` (para que funcione clic derecho / abrir en pestaña nueva), hace falta además `nativeButton={false}` — si no, Base UI tira un warning en consola porque por defecto espera un `<button>` nativo.

Checklist:
- [x] 4.1 Crear `src/components/Header.tsx`: sticky, nombre a la izquierda, nav a la derecha (Sobre mí/Proyectos/Contacto), íconos GitHub/LinkedIn, botón "Descargar CV" (placeholder `/cv.pdf` hasta tener el archivo real).
- [x] 4.2 Instalar el componente `Button` de shadcn/ui (`shadcn add button`).
- [x] 4.3 Crear `src/components/icons.tsx` con los SVG de GitHub y LinkedIn (hallazgo: `lucide-react` 1.x no trae íconos de marca).
- [x] 4.4 Agregar `scroll-behavior: smooth` global y `scroll-mt-20` en las secciones para que el header fijo no tape el título al hacer scroll a un ancla.
- [x] 4.5 Reemplazar el placeholder de `App.tsx` por el `Header` + 4 secciones vacías con los ids reales (`inicio`, `sobre-mi`, `proyectos`, `contacto`), solo para verificar el comportamiento.
- [x] 4.6 Corregido warning de Base UI sobre `nativeButton` en el botón de CV.
- [x] 4.7 Verificado en navegador: header sticky, scroll suave a cada ancla sin tapar el título, íconos abren en pestaña nueva, sin errores de consola.

---

## Fase 5 — Hero (cerrada 2026-10-20)

**Contexto:** Segunda sección del orden de `DESIGN.md`: nombre, tagline, intro y los dos CTAs principales ("Ver proyectos", "Descargar CV"). Reemplaza el placeholder de `#inicio`.

**Decisión 1 — tagline explícito sobre "integrar IA", no "programar con IA".** El ejemplo de `DESIGN.md` ("construyo productos con IA de punta a punta") se discutió y se ajustó a *"Desarrollador Full Stack — integro IA (voz, LLMs) en productos reales, de punta a punta"* — "integro"/"voz, LLMs" deja claro que se refiere a integraciones de servicios de IA dentro del producto (como Deepgram/DeepSeek/ElevenLabs en Vacantia), no a usar IA como asistente para programar, que es una lectura ambigua del texto original.

**Decisión 2 — el tagline no es un inventario de todos los trabajos.** Se aclaró que el tagline es una frase de posicionamiento centrada en lo más diferenciador (Vacantia), no una afirmación de que el 100% del trabajo profesional involucra IA — el trabajo en Fiberlux, por ejemplo, no tiene integraciones de IA y no contradice el tagline. Ese contexto más completo va a "Sobre mí" (Fase 6).

**Decisión 3 — jerarquía visual entre los dos CTA.** "Ver proyectos" como botón sólido (acción principal) y "Descargar CV" como `outline` (secundario), para que el ojo vaya primero a Proyectos — el argumento central del portafolio.

Checklist:
- [x] 5.1 Crear `src/components/Hero.tsx`: nombre y tagline en `font-mono` (tagline en color de acento), intro en texto normal, dos botones.
- [x] 5.2 Reemplazar el placeholder `#inicio` de `App.tsx` por `<Hero />`.
- [x] 5.3 Verificado en navegador: contenido se ve correcto, "Ver proyectos" hace scroll suave a `#proyectos`.

---
