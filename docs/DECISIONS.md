# Decisiones técnicas

Formato de cada entrada (orden cronológico, más reciente al final):

## AAAA-MM-DD — Título corto de la decisión

**Contexto:** qué problema o disyuntiva llevó a esta decisión.

**Decisión:** qué se eligió.

**Por qué:** la razón concreta — qué alternativa se descartó y por qué esta gana (simplicidad, costo, lo que ya se conoce, una restricción real, etc.).

**Limitaciones conocidas / fuera de alcance (si aplica):** qué se dejó explícitamente sin resolver y por qué está bien dejarlo así por ahora.

---

## 2026-08-31 — Stack, alcance y despliegue del portafolio

**Contexto:** Antes de crear el repo se definió en otra conversación qué tecnología usar, qué alcance tendría el sitio y dónde se iba a desplegar, para no tener que decidirlo sobre la marcha al arrancar.

**Decisión:**
- Nombre del proyecto/repo: `portfolio` (en inglés, consistente con `interviewer-ai`).
- Stack: React + Vite + TypeScript + Tailwind + shadcn/ui (misma librería de componentes que ya usa el frontend de Vacantia), con `pnpm` como gestor de paquetes.
- Solo frontend, sin backend: es un sitio de presentación (sobre mí, proyectos, contacto), no necesita guardar ni procesar datos del lado del servidor.
- Sin Docker: sitio estático — `pnpm run build` genera `dist/`, que es lo único que termina en la VPS. Nginx lo sirve directo.
- Dominio: `andymallcco.dev` (raíz, no subdominio) — el portafolio es la puerta de entrada (el link para CV/LinkedIn); cada proyecto individual (como Vacantia) vive en su propio subdominio. DNS administrado en Porkbun.
- Hosting: mismo VPS de Contabo (`195.26.250.245`) que ya corre Vacantia. Nginx corre en el host (no en Docker) y es el único que escucha los puertos 80/443; cada dominio/subdominio tiene su propio bloque `server {}` con su propio certificado Certbot. El portafolio, al ser estático, no necesita puerto propio — Nginx sirve `/srv/portfolio-static` directo, sin Docker de por medio.

**Por qué:** Reusar el stack y los componentes ya probados en Vacantia (shadcn/ui, pnpm) evita decidir de cero una librería de UI. Sin backend ni Docker porque el sitio no tiene lógica de servidor ni estado que persistir — agregar esa complejidad sería injustificado para una página de presentación. El dominio raíz se reserva para el portafolio porque funciona como punto de entrada único desde el que se enlaza a cada proyecto en su propio subdominio, patrón que ya usa Vacantia (`vacantia.andymallcco.dev`) y que escala a futuros proyectos sin reconfigurar nada existente.

**Limitaciones conocidas / fuera de alcance:** El despliegue es manual (sin CI/CD), igual que Vacantia — ver detalle paso a paso en `docs/INFRA.md`.
