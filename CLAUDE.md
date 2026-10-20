# Cómo trabajar en este proyecto

- **Pasos chicos.** Avanzar de a un paso a la vez, no encadenar varios cambios grandes sin confirmar. Explicar qué se va a hacer antes de escribir código, y esperar confirmación.
- **El usuario corre los comandos.** Claude da los comandos de terminal (git, docker, npm, etc.) con una explicación corta de qué hacen; el usuario los ejecuta él mismo y pega el resultado. Claude no ejecuta comandos de instalación/build/deploy por su cuenta salvo que se le pida explícitamente.
- **Comandos siempre en bloque de código markdown**, dentro del texto de la respuesta — nunca como texto plano suelto.
- **Confirmar antes de cualquier acción destructiva o irreversible**: borrar datos, `git push --force`, reescribir historial, borrar volúmenes/bases de datos, etc. Explicar qué se pierde antes de pedir la confirmación.
- **Cada funcionalidad nueva con lógica real (no solo maquetado) incluye su test en el mismo paso**, no se deja para el final.
- **Español neutro, de usted** (no voseo) en toda la comunicación.
- **Verificar, no asumir.** Antes de decir "listo"/"arreglado", confirmar en el navegador o la terminal real que funciona — no basta con que el código "se vea bien".
- **Roadmap y decisiones documentados a medida que se avanza**, no al final: cada fase con su Contexto, sus Decisiones (numeradas, con el porqué) y su checklist de pasos, marcados `[x]` según se cierran.
- No agregar abstracciones, configuración o manejo de errores para casos que no van a pasar. Preferir código simple y directo sobre "flexible por si acaso".

Ver `ROADMAP.md` y `DECISIONS.md` (plantillas vacías en esta misma carpeta) para el formato esperado de cada uno.
