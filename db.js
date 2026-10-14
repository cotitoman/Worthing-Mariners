/* Capa de datos: Supabase (en línea) o localStorage (modo demo) */
(function () {
  'use strict';
  const cfg = window.SITE_CONFIG || {};
  const wantsRemote = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY);
  const REMOTE = wantsRemote && !!window.supabase;
  const sb = REMOTE ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY) : null;
  const uid = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now() + '-' + Math.random().toString(16).slice(2));

  /* ---------- Datos de ejemplo (solo modo demo) ---------- */
  const at = (days, h = 15, m = 0) => { const d = new Date(); d.setDate(d.getDate() + days); d.setHours(h, m, 0, 0); return d.toISOString(); };
  const SEED = {
    players: [
      { id: uid(), first_name: 'Oliver', last_name: 'Bennett', number: 5, position: 'DFC', nationality: 'Inglaterra', photo_url: null, created_at: at(-400) },
      { id: uid(), first_name: 'Harry', last_name: 'Whitfield', number: 9, position: 'DC', nationality: 'Inglaterra', photo_url: null, created_at: at(-399) }
    ],
    matches: [
      { id: uid(), match_date: at(-7), rival: 'Millbrook Town', rival_crest_url: null, competition: 'EFL League Two', is_home: true, venue: 'Harbour Lane', played: true, goals_for: 2, goals_against: 1, formation: '4-4-2',
        lineup_starters: '', lineup_subs: '', created_at: at(-8) },
      { id: uid(), match_date: at(6), rival: 'Ashford Rangers', rival_crest_url: null, competition: 'EFL League Two', is_home: true, venue: 'Harbour Lane', played: false, goals_for: null, goals_against: null, formation: '', lineup_starters: '', lineup_subs: '', created_at: at(-8) },
      { id: uid(), match_date: at(13), rival: 'Northgate United', rival_crest_url: null, competition: 'EFL League Two', is_home: false, venue: 'Northgate Park', played: false, goals_for: null, goals_against: null, formation: '', lineup_starters: '', lineup_subs: '', created_at: at(-8) }
    ],
    tickets: [
      { id: uid(), event_date: at(6), rival: 'Ashford Rangers', competition: 'EFL League Two', venue: 'Harbour Lane', price_adult: 18, price_junior: 6, price_senior: 12, available: 3900, away_allocation: 600, on_sale: true, created_at: at(-8) }
    ],
    sponsors: [
      { id: uid(), name: 'Umbro', role: 'Patrocinador técnico oficial', tier: 'principal', sort_order: 10, logo_url: null, website_url: null, created_at: at(-300),
        description: 'Marca deportiva que fabrica las camisetas local, visitante y alternativa, además de la ropa de entrenamiento y parte del equipamiento del club.' },
      { id: uid(), name: 'Shoreline Building Supplies', role: 'Patrocinador de la tribuna principal', tier: 'oficial', sort_order: 20, logo_url: null, website_url: null, created_at: at(-299),
        description: 'Empresa local de materiales de construcción. Su nombre aparece en la entrada de la tribuna y en la señalización interior.' },
      { id: uid(), name: 'South Coast Energy', role: 'Patrocinador del Michael Callahan Training Centre', tier: 'oficial', sort_order: 30, logo_url: null, website_url: null, created_at: at(-298),
        description: 'Empresa regional de instalaciones eléctricas y eficiencia energética. Ayuda a financiar el mantenimiento de los campos del primer equipo.' },
      { id: uid(), name: 'Worthing Family Dental', role: 'Patrocinador del New Gen Training Centre', tier: 'oficial', sort_order: 40, logo_url: null, website_url: null, created_at: at(-297),
        description: 'Clínica dental local que apoya el fútbol juvenil y las iniciativas comunitarias. Su marca aparece en la entrada de la academia.' },
      { id: uid(), name: 'Sussex Digital Systems', role: 'Patrocinador del marcador electrónico', tier: 'oficial', sort_order: 50, logo_url: null, website_url: null, created_at: at(-296),
        description: 'Pequeña compañía tecnológica que aporta apoyo económico y asistencia técnica para los sistemas digitales del estadio.' },
      { id: uid(), name: 'Sussex Coast Travel', role: 'Patrocinador de transporte y desplazamientos', tier: 'oficial', sort_order: 60, logo_url: null, website_url: null, created_at: at(-295),
        description: 'Empresa de transporte que apoya los viajes del equipo y obtiene visibilidad en el estadio.' },
      { id: uid(), name: 'Coastline Electrical Services', role: 'Patrocinador de los banquillos', tier: 'colaborador', sort_order: 70, logo_url: null, website_url: null, created_at: at(-294),
        description: 'Empresa eléctrica de la zona que financia la señalización de los banquillos y aparece en las publicaciones oficiales del club.' },
      { id: uid(), name: 'The Toad in the Hole', role: 'Socio oficial de hostelería y comunidad', tier: 'colaborador', sort_order: 80, logo_url: null, website_url: null, created_at: at(-293),
        description: 'El pub donde nació el club. Colabora en reuniones de socios, encuentros con jugadores y actividades para la hinchada.' },
      { id: uid(), name: 'Seafront Coffee Company', role: 'Patrocinador de hospitalidad y días de partido', tier: 'colaborador', sort_order: 90, logo_url: null, website_url: null, created_at: at(-292),
        description: 'Cafetería local que colabora en la oferta de bebidas y productos para los aficionados en las zonas de hospitalidad.' }
    ],
    news: [
      { id: uid(), title: 'El Worthing Mariners asciende a la EFL League Two', kind: 'noticia', author: 'Prensa del club',
        summary: 'Diez años después de nacer en The Toad in the Hole, el club alcanza el fútbol profesional.',
        body: 'El Worthing Mariners AFC confirmó su ascenso a la EFL League Two tras una campaña extraordinaria en la National League.\n\nDesde la décima categoría hasta el fútbol profesional, el club cierra su primera gran etapa fiel a su lema: Proud of where we come from.',
        image_url: 'estadio.jpg', video_url: null, created_at: at(-3) },
      { id: uid(), title: 'Nobody owns our club', kind: 'opinion', author: 'Richard Thompson, presidente',
        summary: 'Por qué el 51 % de las acciones seguirá en manos de los aficionados.',
        body: 'El éxito deportivo no puede costarnos la identidad. Por eso la propiedad de los aficionados no se negocia: el crecimiento será más lento, pero será nuestro.',
        image_url: null, video_url: null, created_at: at(-2) }
    ]
  };

  /* ---------- Almacenamiento local (demo) ---------- */
  const LS = {
    get(k, def) { try { const v = localStorage.getItem('wm_' + k); return v ? JSON.parse(v) : def; } catch (e) { return def; } },
    set(k, v) { try { localStorage.setItem('wm_' + k, JSON.stringify(v)); } catch (e) { throw new Error('La memoria local del navegador está llena. Usa imágenes más pequeñas o configura Supabase.'); } }
  };
  const localRows = (t) => { let r = LS.get(t, null); if (!r) { r = SEED[t] || []; LS.set(t, r); } return r; };

  /* ---------- Compresión de imágenes antes de subir ---------- */
  async function compress(file, max) {
    if (!file.type.startsWith('image/') || /gif|svg/.test(file.type)) return file;
    try {
      const bmp = await createImageBitmap(file);
      const s = Math.min(1, max / Math.max(bmp.width, bmp.height));
      const c = document.createElement('canvas');
      c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s);
      c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
      const type = file.type === 'image/png' ? 'image/webp' : 'image/jpeg'; // webp conserva transparencia (escudos)
      const blob = await new Promise(r => c.toBlob(r, type, 0.86));
      return blob || file;
    } catch (e) { return file; }
  }
  const toDataURL = (blob) => new Promise((res, rej) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.onerror = rej; fr.readAsDataURL(blob); });

  /* ---------- Autenticación ---------- */
  const listeners = [];
  const adminEmail = (cfg.ADMIN_EMAIL || '').trim().toLowerCase();

  const DB = {
    REMOTE, wantsRemote,

    async list(table, orderBy, asc = true) {
      if (REMOTE) {
        const { data, error } = await sb.from(table).select('*').order(orderBy, { ascending: asc });
        if (error) throw error; return data || [];
      }
      const rows = [...localRows(table)];
      rows.sort((a, b) => (a[orderBy] > b[orderBy] ? 1 : a[orderBy] < b[orderBy] ? -1 : 0) * (asc ? 1 : -1));
      return rows;
    },

    async save(table, row) {
      const clean = { ...row };
      if (REMOTE) {
        if (!clean.id) delete clean.id;
        const { data, error } = await sb.from(table).upsert(clean).select().single();
        if (error) throw error; return data;
      }
      const rows = localRows(table);
      if (clean.id) { const i = rows.findIndex(r => r.id === clean.id); rows[i] = { ...rows[i], ...clean }; }
      else { clean.id = uid(); clean.created_at = new Date().toISOString(); rows.push(clean); }
      LS.set(table, rows); return clean;
    },

    async remove(table, id) {
      if (REMOTE) { const { error } = await sb.from(table).delete().eq('id', id); if (error) throw error; return; }
      LS.set(table, localRows(table).filter(r => r.id !== id));
    },

    async getContent(key, def) {
      if (REMOTE) {
        const { data, error } = await sb.from('site_content').select('value').eq('key', key).maybeSingle();
        if (error) throw error; return data ? data.value : def;
      }
      return LS.get('content_' + key, def);
    },

    async setContent(key, value) {
      if (REMOTE) { const { error } = await sb.from('site_content').upsert({ key, value }); if (error) throw error; return; }
      LS.set('content_' + key, value);
    },

    async upload(file, folder = 'misc') {
      const f = await compress(file, REMOTE ? 1600 : 900);
      if (!REMOTE) return toDataURL(f);
      const ext = ((f.type || file.type || '').split('/')[1] || 'bin').replace('jpeg', 'jpg').replace(/[^a-z0-9]/gi, '');
      const path = `${folder}/${uid()}.${ext}`;
      const { error } = await sb.storage.from(cfg.BUCKET || 'media').upload(path, f, { contentType: f.type || file.type, cacheControl: '31536000' });
      if (error) throw error;
      return sb.storage.from(cfg.BUCKET || 'media').getPublicUrl(path).data.publicUrl;
    },

    async signIn(email, password) {
      if (REMOTE) {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw new Error('Correo o contraseña incorrectos.');
        if (!(await DB.isAdmin())) { await sb.auth.signOut(); throw new Error('Esta cuenta no tiene permisos de administrador.'); }
        return;
      }
      if (password !== 'admin') throw new Error('En modo demo la contraseña es "admin".');
      LS.set('admin', true); listeners.forEach(f => f());
    },

    async signOut() {
      if (REMOTE) { await sb.auth.signOut(); return; }
      LS.set('admin', false); listeners.forEach(f => f());
    },

    async isAdmin() {
      if (!REMOTE) return !!LS.get('admin', false);
      const { data } = await sb.auth.getSession();
      const mail = data && data.session && data.session.user && data.session.user.email;
      return !!mail && mail.toLowerCase() === adminEmail;
    },

    onAuth(cb) {
      listeners.push(cb);
      if (REMOTE) sb.auth.onAuthStateChange((ev) => { if (ev === 'SIGNED_IN' || ev === 'SIGNED_OUT') cb(); });
    }
  };

  window.DB = DB;
})();
