# Worthing Mariners AFC — web del club

Web estática (HTML + CSS + JS) para publicar gratis en **GitHub Pages**, con un panel de administrador que solo funciona con tu cuenta.
Los datos y las imágenes se guardan en **Supabase** (plan gratuito), así no necesitas servidor propio.

```
index.html        → la página
css/style.css     → colores (azul marino, turquesa, blanco)
js/config.js      → AQUÍ pegas tus claves de Supabase
js/db.js, app.js  → lógica
assets/           → escudo y fotos del club
setup.sql         → crea las tablas y la seguridad en Supabase
```

## 0. Probarla en tu computador (modo demo)

Con `config.js` vacío la web funciona en **modo demo**: pulsa *Acceso club*, contraseña `admin`, y puedes probar todo el panel.
Los cambios se guardan solo en tu navegador. Para verla localmente abre una terminal en la carpeta y ejecuta `python3 -m http.server 8000`, luego entra a http://localhost:8000.

## 1. Crear el backend gratis (Supabase)

1. Entra a https://supabase.com → **Start your project** → crea una cuenta (con GitHub es lo más rápido).
2. **New project**: ponle nombre (ej. `mariners`), una contraseña de base de datos (guárdala) y la región más cercana. Espera ~2 minutos.
3. Abre `setup.sql`, **cambia `TU_CORREO@gmail.com`** por el correo que será tu cuenta de administrador y copia todo el contenido.
4. En Supabase: **SQL Editor → New query →** pega → **Run**. Debe decir *Success*.
5. **Authentication → Users → Add user → Create new user**: pon ese mismo correo y una contraseña segura, y marca **Auto Confirm User**.
6. **Authentication → Sign In / Providers** (o *Settings*): desactiva **Allow new users to sign up**. Así nadie más puede crear cuentas.
7. **Project Settings → API**: copia la **Project URL** y la clave **anon public**.

## 2. Conectar la web

Edita `js/config.js`:

```js
SUPABASE_URL: "https://xxxxx.supabase.co",
SUPABASE_ANON_KEY: "eyJhbGciOi...",
ADMIN_EMAIL: "tucorreo@gmail.com",
```

La clave `anon` es pública por diseño. La seguridad la dan las reglas del `setup.sql`: cualquiera puede **leer**, pero solo tu correo puede **escribir o subir archivos**. **Nunca** pegues la clave `service_role` en la web.

## 3. Publicar en GitHub Pages

1. En https://github.com crea un repositorio nuevo (público), por ejemplo `worthing-mariners`.
2. Sube todos los archivos de esta carpeta (botón **Add file → Upload files**, arrastra el contenido, incluyendo las carpetas `css`, `js` y `assets`) y haz **Commit**.
3. **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
4. En 1–2 minutos tu web estará en `https://TU_USUARIO.github.io/worthing-mariners/`.

## 4. Usar el panel de administrador

1. Entra a tu web → **Acceso club** → tu correo y contraseña de Supabase.
2. Aparece una barra turquesa y botones con borde punteado en cada sección:

| Sección | Qué puedes hacer |
|---|---|
| **Plantilla** | Añadir/borrar jugadores, foto, posición, nacionalidad, nombre, apellido y dorsal |
| **Tickets** | Fechas de partidos, precios (adulto/junior/senior), entradas disponibles, entradas para visitantes, activar/desactivar venta |
| **Historia** | Editar el texto (`## Título` crea un apartado) y subir/quitar imágenes |
| **Partidos** | Crear partidos con rival, escudo del rival, fecha, local/visitante, resultado y alineaciones |
| **Noticias** | Noticias, opiniones y vídeos, con foto, vídeo (enlace de YouTube o archivo) y **autor** |

3. **Cerrar sesión** en la barra o en el menú.

## Notas

- Las imágenes se reducen automáticamente antes de subirlas (el plan gratuito tiene 1 GB de almacenamiento).
- Para vídeos pesados es mejor subirlos a YouTube y pegar el enlace (el límite de subida directa es ~45 MB).
- Supabase gratuito pausa los proyectos tras 1 semana sin uso; se reactiva con un clic desde su panel.
- Es un club ficticio: las entradas son solo informativas, no hay cobros.
