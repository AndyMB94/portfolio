# Infraestructura y despliegue

## DNS (Porkbun)

Agregar en el panel de DNS de Porkbun, sobre el dominio `andymallcco.dev` ya existente:

- Registro **A**, host vacío (raíz/apex), apuntando a `195.26.250.245` (la misma VPS de Contabo que ya usa Vacantia).
- Registro **A** (o `CNAME` hacia la raíz, según lo que Porkbun permita para `www`), host `www`, misma IP — para que `www.andymallcco.dev` también resuelva. Nginx se encarga de redirigir `www` → raíz (ver más abajo), no hace falta manejarlo en el DNS.

No hace falta ningún registro nuevo de correo (`MX`/`TXT`) — el correo transaccional ya usa el subdominio `mail.andymallcco.dev`, esto no lo toca.

## Carpeta en la VPS

Junto a `~/interviewer-ai` (la carpeta de Vacantia), clonar el repo nuevo:

```
cd ~
git clone <url-del-repo-portfolio> portfolio
cd portfolio
pnpm install
pnpm run build
```

Esto genera `portfolio/dist/`. Copiar ese contenido a una carpeta de estáticos separada del checkout de git (mismo criterio que ya usa Vacantia: `/srv/vacantia-static` para los estáticos de Django, Infra Fase 4):

```
sudo mkdir -p /srv/portfolio-static
sudo cp -r dist/* /srv/portfolio-static/
```

## Nginx (bloque nuevo, sin tocar la configuración de Vacantia)

Archivo nuevo, ej. `/etc/nginx/sites-available/andymallcco.dev` (symlink a `sites-enabled/`, mismo patrón que ya use el servidor para `vacantia.andymallcco.dev`):

```nginx
server {
    listen 80;
    server_name andymallcco.dev www.andymallcco.dev;

    root /srv/portfolio-static;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

`try_files ... /index.html` deja la puerta abierta a rutas del lado del cliente si más adelante se pasa a multi-página con React Router (ver `DESIGN.md`) — con una sola página no hace daño tenerlo desde ya.

Después de crear el archivo:

```
sudo nginx -t
sudo systemctl reload nginx
```

## HTTPS (Certbot)

Mismo Certbot que ya está instalado y usa Vacantia — solo se le agrega el dominio nuevo:

```
sudo certbot --nginx -d andymallcco.dev -d www.andymallcco.dev
```

Certbot edita el bloque de Nginx de arriba automáticamente (agrega el `listen 443 ssl` y el redirect de 80 a 443) y deja el renovado automático ya configurado, igual que con `vacantia.andymallcco.dev`.

## Redeploy (cuando haya cambios)

Sin CI/CD por ahora — mismo criterio manual que ya usa Vacantia (`git pull` + reconstruir por SSH), acá más simple porque no hay contenedores:

```
cd ~/portfolio
git pull
pnpm install
pnpm run build
sudo cp -r dist/* /srv/portfolio-static/
```

## Puertos — no aplica

A diferencia de Vacantia (que sí reserva puertos de host para cada contenedor, ver el README de esta misma carpeta), el portafolio no expone ningún puerto propio — Nginx lee directo de `/srv/portfolio-static`, no hay proceso escuchando en ningún puerto que reservar.
