/* ============================================================
   CONFIGURACIÓN DEL SITIO
   Mientras SUPABASE_URL y SUPABASE_ANON_KEY estén vacíos, la web
   funciona en MODO DEMO (los cambios se guardan solo en tu navegador
   y la contraseña de administrador es "admin").

   Para tenerla en línea de verdad, sigue el README.md y rellena:
   ============================================================ */
window.SITE_CONFIG = {
  SUPABASE_URL: "https://mgrlfnxazegghitqtyse.supabase.co",        // ej: "https://abcdxyz.supabase.co"
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ncmxmbnhhemVnZ2hpdHF0eXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5MzkxMDUsImV4cCI6MjEwNzUxNTEwNX0.FpCc50ThqnWCz3u67RKi44QYWNZMf5l_0Sq9ycMOLgQ
",   // la clave "anon public" (es pública por diseño)
  ADMIN_EMAIL: "cotitoyanezleon@gmail.com",         // el correo de la cuenta de administrador
  BUCKET: "media"          // bucket de Storage (no cambiar si usas setup.sql)
};
