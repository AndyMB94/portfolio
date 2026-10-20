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
