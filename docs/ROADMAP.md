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
