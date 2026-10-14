/* ============================================================
   CONFIGURACIÓN DEL SITIO
   Mientras SUPABASE_URL y SUPABASE_ANON_KEY estén vacíos, la web
   funciona en MODO DEMO (los cambios se guardan solo en tu navegador
   y la contraseña de administrador es "admin").

   Para tenerla en línea de verdad, sigue el README.md y rellena:
   ============================================================ */
window.SITE_CONFIG = {
  SUPABASE_URL: "",        // ej: "https://abcdxyz.supabase.co"
  SUPABASE_ANON_KEY: "",   // la clave "anon public" (es pública por diseño)
  ADMIN_EMAIL: "",         // el correo de la cuenta de administrador
  BUCKET: "media"          // bucket de Storage (no cambiar si usas setup.sql)
};
