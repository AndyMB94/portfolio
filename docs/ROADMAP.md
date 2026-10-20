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

## Fase 6 — Sobre mí (cerrada 2026-10-20)

**Contexto:** Tercera sección del orden de `DESIGN.md`: foto, bio (2-3 párrafos, no solo profesional) y badges del stack probado en producción con Vacantia. Reemplaza el placeholder de `#sobre-mi`.

**Decisión 1 — badges como pills de texto, sin logos por tecnología.** `DESIGN.md` pide los badges en `font-mono`. En vez de buscar/armar un ícono de marca por cada tecnología (11 en total: React, TypeScript, Django, PostgreSQL, Redis, Celery, Socket.io, Docker, Deepgram, DeepSeek, ElevenLabs — varias de ellas, como las de IA, ni siquiera tienen ícono en librerías como `simple-icons`), se usan pills de texto simples con borde — minimalista, consistente con la estética Vercel/Linear, y evita mantener una docena de SVGs a mano.

**Decisión 2 — lista de badges curada, no el stack completo.** De las 20+ piezas reales del stack de Vacantia, se eligieron las 11 más representativas de la historia técnica (pipeline de voz en tiempo real + infra de producción). El detalle de implementación (DRF, JWT, Django Groups, Resend, Express, Nginx, Certbot) queda para el texto de la card de Vacantia en Proyectos (Fase 7), no en los badges.

**Decisión 3 — bio sin detalle de ciclo universitario ni certificados adjuntos.** Se menciona que es egresado de Tecsup y cursa Ingeniería de Sistemas en la UPC, pero sin el detalle de "voy en los primeros ciclos por convalidaciones" (información de nivel CV/entrevista, no de portafolio) ni se suben los archivos de la constancia de egreso o el certificado Cambridge B2 — alcanza con mencionarlos como texto, los documentos de respaldo son para cuando se piden en el proceso de selección.

**Decisión 4 — intereses personales acotados.** De la lista de hobbies que dio (música, influencers de programación, conducir, cocinar, tecnología/IA), se usaron solo 1-2: el interés en tecnología/IA (conecta con el resto del sitio) y una mención breve a cocinar/música — una lista larga de hobbies le resta profesionalismo a un portafolio técnico.

Checklist:
- [x] 6.1 Copiar la foto de perfil a `src/assets/profile.jpg` (hallazgo: resolución baja, 240x288px — se ve bien en el tamaño actual de 160px, pero convendría una versión de mayor resolución si se usa más grande en el futuro).
- [x] 6.2 Crear `src/components/About.tsx`: foto circular, bio en 3 párrafos, badges de stack.
- [x] 6.3 Reemplazar el placeholder `#sobre-mi` de `App.tsx` por `<About />`.
- [x] 6.4 Encontrado y reubicado el CV real (estaba suelto en la raíz del repo) a `public/cv.pdf`, reemplazando el placeholder de los botones "Descargar CV" del Header y el Hero.
- [x] 6.5 Ajuste de legibilidad: `max-w-xl` en el bloque de texto de la bio, para no tener líneas demasiado largas.
- [x] 6.6 Verificado en navegador: foto, bio y badges se ven bien, "Descargar CV" baja el PDF real.

---

## Fase 7 — Proyectos: case study de Vacantia (cerrada 2026-10-20)

**Contexto:** Cuarta sección y argumento de venta central del portafolio, según `DESIGN.md`: una sola card grande para Vacantia, con el contenido técnico ya definido (qué es, por qué es interesante técnicamente, qué enlazar).

**Decisión 1 — sin componente `ProjectCard` reutilizable todavía.** Con un solo proyecto, armar una abstracción para "tarjetas de proyecto" sería anticipar una necesidad que no existe aún. `DESIGN.md` ya prevé reconsiderar la estructura (multi-página) cuando haya un segundo proyecto propio — ahí sí tendría sentido extraer el patrón.

**Decisión 2 — verificación de los links antes de usarlos.** Se confirmó que `vacantia.andymallcco.dev` carga la app completa (catálogo de vacantes) en el navegador real del usuario — un fetch automático sin JS solo veía el texto "Vacantia" suelto, por ser una SPA renderizada del lado del cliente — y que el repo `github.com/AndyMB94/interviewer-ai` responde 200 (es público), antes de linkearlos en el sitio.

**Decisión 3 — screenshots pendientes.** `DESIGN.md` los sugiere como opcionales; no se tienen capturas a mano todavía, se agregan en una fase posterior.

Checklist:
- [x] 7.1 Crear `src/components/Projects.tsx`: card de Vacantia con descripción, 4 puntos técnicos destacados (pipeline de voz, auth híbrida JWT, hardening de seguridad real, despliegue end-to-end) y botones a sitio en vivo + repo.
- [x] 7.2 Verificar que `vacantia.andymallcco.dev` y el repo de GitHub responden correctamente antes de linkearlos.
- [x] 7.3 Reemplazar el placeholder `#proyectos` de `App.tsx` por `<Projects />`.
- [x] 7.4 Verificado en navegador: card se ve bien, los dos links abren en pestaña nueva a las URLs correctas.

---

## Fase 8 — Contacto, Footer y ritmo visual (cerrada 2026-10-20)

**Contexto:** Últimas dos secciones del orden de `DESIGN.md` (Contacto y Footer), más un ajuste de diseño general sobre cómo se separan visualmente las secciones.

**Decisión 1 — email personal, no institucional.** Para el `mailto:` se usó `andy.94.m.b@gmail.com` (Gmail personal) en vez del correo de Tecsup — el institucional depende de seguir afiliado a la institución como egresado y podría desactivarse, mientras que el portafolio está pensado para durar y sumar más proyectos a futuro.

**Decisión 2 — WhatsApp en vez de número de teléfono en texto plano.** Se agregó un botón a `wa.me/51927939655` en lugar de mostrar el número como texto suelto en el HTML — reduce la exposición a scraping automático de teléfonos (mucho más agresivo que con emails), es el canal de contacto directo estándar en Perú, y el usuario ya lo tiene publicado en el CV descargable de todas formas.

**Decisión 3 — ubicación con ícono, sin emoji de bandera.** Se agregó "Lima, Perú" con el ícono genérico `MapPin` de lucide-react en vez de un emoji de bandera — consistente con la estética minimalista (Vercel/Linear) del resto del sitio, sin depender del renderizado de emojis entre sistemas operativos.

**Decisión 4 — fondo alternado entre secciones.** Todas las secciones usaban el mismo fondo (`--background`) separadas solo por un borde superior, lo que se sentía plano en un scroll largo. Se alternó el fondo entre `--background` y `--card` sección por sección (Hero y Proyectos en `--background`; Sobre mí y Contacto en `--card`) — dan ritmo visual sutil sin agregar colores nuevos ni romper el estilo minimalista.

Checklist:
- [x] 8.1 Crear `src/components/Contact.tsx`: título, texto de invitación, botones "Enviar email" (mailto) y "WhatsApp" (wa.me), íconos GitHub/LinkedIn repetidos, ubicación.
- [x] 8.2 Crear `src/components/Footer.tsx`: copyright con año dinámico, email y links de GitHub/LinkedIn repetidos.
- [x] 8.3 Reemplazar el último placeholder (`#contacto`) de `App.tsx` por `<Contact />`, agregar `<Footer />` al final.
- [x] 8.4 Alternar `bg-card` en `About` y `Contact` para dar ritmo visual entre secciones.
- [x] 8.5 Verificado en navegador: botones de email/WhatsApp funcionan, footer se ve bien, contraste entre secciones visible y sutil.

---

## Fase 9 — Metadata, mobile y build de producción (cerrada 2026-10-20)

**Contexto:** Con las 6 secciones de contenido completas, quedaban tres verificaciones antes de pensar en desplegar: metadata real del sitio (seguía con los valores default del scaffold de Vite), que el diseño responda bien en mobile (solo se había probado en desktop), y que el build de producción (no solo `pnpm dev`) funcione.

**Decisión 1 — favicon propio con iniciales, sin diseño elaborado.** Se reemplazó el rayo de Vite por un SVG simple con "AM" en el acento morado sobre el fondo oscuro del sitio — suficiente para no dejar branding ajeno, sin invertir tiempo en un logo elaborado que no se pidió.

**Decisión 2 — sin Open Graph todavía.** No se agregaron `og:image`/`og:description` porque requieren una imagen de preview social que no existe aún; queda pendiente para cuando se comparta el link activamente.

Checklist:
- [x] 9.1 `index.html`: `lang="es"` (estaba mal como `"en"` desde el scaffold), `<title>` y `<meta name="description">` reales, favicon propio con iniciales.
- [x] 9.2 Verificado en navegador: título de pestaña y favicon correctos.
- [x] 9.3 Revisión completa en mobile (375px, DevTools responsive): Header, Hero, Sobre mí, Proyectos, Contacto y Footer — todo se apila y hace wrap correctamente, sin overflow ni texto cortado.
- [x] 9.4 `pnpm run build` — **hallazgo**: fallaba con error de TypeScript, `baseUrl` está deprecado (se elimina en TS 7.0). Se sacó `baseUrl` de `tsconfig.json` y `tsconfig.app.json`; con `moduleResolution: "bundler"` no hace falta, `paths` se resuelve solo relativo al propio archivo.
- [x] 9.5 `pnpm run build` + `pnpm run preview` — build limpio, sitio funciona igual que en desarrollo sirviendo los archivos ya compilados.

---

## Fase 10 — Pulido visual: starfield, hover y scroll reveal (cerrada 2026-10-20)

**Contexto:** Con el sitio funcionalmente completo, se evaluó si valía la pena sumar detalles de interacción (animaciones, efectos hover) para que se sienta más vivo, sin comprometer el rendimiento ni la estética minimalista ya definida.

**Decisión 1 — starfield en CSS puro, sin librerías.** Se armó un fondo de estrellas animado con la técnica clásica de un solo `box-shadow` con cientos de posiciones aleatorias sobre un div de 1px, animado con una sola transformación `translateY` en loop — sin Canvas ni JS corriendo en cada frame, acelerado por GPU. Se generan las posiciones una sola vez por carga (`Math.random()` a nivel de módulo en `src/lib/stars.ts`), no en cada render.

**Decisión 2 — el starfield se extendió a las 4 secciones, no solo el Hero.** La precaución inicial (competir con el acento morado y la lectura) no se notó en la práctica al verlo en vivo — se probó primero solo en el Hero, se vio bien, y se decidió extenderlo a Sobre mí, Proyectos y Contacto también.

**Decisión 3 — fade-in al scroll con `IntersectionObserver` nativo, sin librería de animación.** Se armó un hook chico (`useInView`) y un componente `Reveal` reutilizable — cada sección aparece una sola vez (se usa `unobserve` tras la primera entrada en pantalla) para no repetir el efecto cada vez que el usuario sube y baja el scroll.

**Decisión 4 — toda animación respeta `prefers-reduced-motion`.** Tanto el starfield (vía `@media (prefers-reduced-motion: reduce)` en `index.css`) como el `Reveal` (vía la variante `motion-reduce:` de Tailwind) se desactivan para usuarios que piden menos movimiento en su sistema — se muestra el contenido directo, sin transición.

Checklist:
- [x] 10.1 Crear `src/lib/stars.ts` (genera el `box-shadow` de las estrellas una vez) y `src/components/Starfield.tsx`.
- [x] 10.2 Agregar la animación `star-drift` y el soporte de `prefers-reduced-motion` en `index.css`.
- [x] 10.3 Integrar `<Starfield />` en Hero, y luego también en Sobre mí, Proyectos y Contacto.
- [x] 10.4 Hover en los badges de stack (Sobre mí): borde y texto se tiñen de acento morado.
- [x] 10.5 Hover en la card de Vacantia: leve elevación + borde morado + resplandor sutil.
- [x] 10.6 Crear `src/hooks/useInView.ts` y `src/components/Reveal.tsx`, envolver el contenido de las 4 secciones.
- [x] 10.7 Verificado en navegador: estrellas sutiles en las 4 secciones, hovers funcionan, fade-in se dispara una sola vez por sección al hacer scroll hacia abajo.
- [x] 10.8 `pnpm run build` sigue limpio después de todos los cambios.

---
