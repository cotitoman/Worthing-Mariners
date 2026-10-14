/* Worthing Mariners AFC — web del club (SPA con rutas por #hash) */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const app = $('#app');
  let isAdmin = false;
  let newsFilter = 'todas';
  let renderToken = 0;

  /* ---------- utilidades ---------- */
  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const MONTHS = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  const fmtLong = (iso) => new Date(iso).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const fmtShort = (iso) => new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  const fmtTime = (iso) => new Date(iso).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const money = (n) => (n == null || n === '') ? '—' : '£' + Number(n).toLocaleString('es-ES', { minimumFractionDigits: Number(n) % 1 ? 2 : 0 });
  const toLocalInput = (iso) => { if (!iso) return ''; const d = new Date(iso); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 16); };
  const initials = (n) => String(n || '?').split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const paragraphs = (t) => String(t || '').split(/\n{2,}/).map(p => `<p>${esc(p.trim()).replace(/\n/g, '<br>')}</p>`).join('');
  const toast = (msg, err) => { const t = $('#toast'); t.textContent = msg; t.className = 'show' + (err ? ' error' : ''); clearTimeout(toast._t); toast._t = setTimeout(() => t.className = '', 3800); };
  const adm = (html) => isAdmin ? `<span class="adm">${html}</span>` : '';
  const crestImg = (url, name, cls = '') => url ? `<img class="crest ${cls}" src="${esc(url)}" alt="Escudo ${esc(name)}" loading="lazy">` : `<span class="crest ph ${cls}" aria-hidden="true">${esc(initials(name))}</span>`;
  const safeUrl = (u) => /^https?:\/\//i.test(String(u || '')) ? u : '';
  const MARINERS_CREST = `<img class="crest" src="escudo.png" alt="Escudo Worthing Mariners">`;

  const POSITIONS = ['PT', 'LD', 'LI', 'DFC', 'MCD', 'MC', 'MCO', 'MD', 'MI', 'ED', 'EI', 'SD', 'DC'];
  const POS_GROUPS = [
    ['Porteros', ['PT']],
    ['Defensas', ['LD', 'LI', 'DFC']],
    ['Centrocampistas', ['MCD', 'MC', 'MCO', 'MD', 'MI']],
    ['Delanteros', ['ED', 'EI', 'SD', 'DC']]
  ];

  /* ---------- contenido por defecto de "Historia" (basado en el PDF del club) ---------- */
  const DEFAULT_HISTORY = {
    text: `## La ruptura con el Worthing FC
Durante décadas, el Worthing FC fue el principal representante futbolístico de la ciudad. Todo cambió cuando un grupo de inversores árabes adquirió el 51 % de las acciones del club. Los nuevos propietarios llegaron con grandes ambiciones: modernizar la institución, convertirla en una marca reconocida y llevarla hacia el fútbol profesional.

Se modificaron el nombre y el escudo, se construyó un nuevo estadio y varios jugadores de la antigua plantilla fueron vendidos o abandonaron el equipo. Para la directiva era una nueva era; para muchos aficionados, el Worthing FC estaba perdiendo su identidad. Finalmente, en 2016, un grupo de seguidores decidió fundar el Worthing Mariners AFC, un club independiente que representaría los valores del antiguo Worthing.

## The Toad in the Hole: donde comenzó todo
Las reuniones decisivas tuvieron lugar en The Toad in the Hole, un pub de Worthing que se convirtió en el punto de encuentro de los aficionados descontentos: antiguos abonados, familias, trabajadores y pequeños empresarios que llevaban décadas acompañando al Worthing FC.

La idea de crear otro club parecía una locura. El Mariners tendría que comenzar en la décima categoría del fútbol inglés, con recursos limitados y sin garantías de éxito. Aun así, los fundadores prefirieron empezar desde abajo antes que seguir apoyando una institución que ya no sentían como propia. El nombre Mariners fue elegido por la relación histórica de Worthing con el mar.

## Un club propiedad de su gente
Una de las primeras decisiones fue establecer que los aficionados debían controlar, como mínimo, el 51 % de las acciones. El resto quedó disponible para pequeños inversores, empresarios locales y patrocinadores, pero ningún inversor individual podría adquirir el control mayoritario. Esto ha hecho que el crecimiento sea más lento, pero evita depender de un propietario que pueda cambiar la identidad de la institución.

## Los primeros años: empezar desde la décima categoría
En 2016 el Mariners comenzó a competir en la décima categoría del sistema inglés, en instalaciones modestas y con una plantilla de aficionados, jugadores locales y algunos antiguos integrantes del Worthing FC. Muchos futbolistas trabajaban durante la semana mientras los fundadores y voluntarios organizaban los partidos. El club dependía más del compromiso de su comunidad que de sus recursos.

## La década del ascenso (2016–2026)
En diez años el Mariners pasó de las categorías regionales más bajas a la National League: campeón de la 10.ª división (83 pts), de la 9.ª (90 pts), de la 8.ª (87 pts), de la 7.ª (95 pts) y de la 6.ª (100 pts). En la 5.ª división terminó 4.º y ganó el playoff en la final por 3–2 al Boreham Wood, asegurando el ascenso a la EFL League Two.

## La llegada al fútbol profesional
El ascenso a la EFL League Two en 2026 marca el comienzo de una etapa completamente nueva. El objetivo inicial es consolidarse en la categoría y demostrar que el modelo de propiedad de los aficionados también puede funcionar en el fútbol profesional, sin poner en peligro la estabilidad económica del club.

## La identidad de los Mariners
Los colores son el azul marino, el turquesa y el blanco. El escudo muestra un balón sobre una gran ola, símbolo de la relación de Worthing con el mar, y la cinta con el lema «Pugna Vincere» («Luchar para vencer»). El lema del club es «Proud of where we come from».

## Harbour Lane
Inaugurado en 2018, Harbour Lane («The Harbour») es el hogar del club: 4.850 espectadores, césped natural y The Dock, la grada más ruidosa, donde se concentran los seguidores más apasionados. «A home built by the people, for the people.»`,
    gallery: [
      { url: 'estadio.jpg', caption: 'Harbour Lane, el hogar del Mariners' },
      { url: 'centro-callahan.jpg', caption: 'Centro de Entrenamiento Michael Callahan' },
      { url: 'new-gen.jpg', caption: 'New Gen Training Centre, la academia' }
    ]
  };

  /* ---------- formularios modales ---------- */
  function openForm({ title, fields, values = {}, submitLabel = 'Guardar', onSubmit }) {
    const dlg = document.createElement('dialog');
    dlg.className = 'modal';
    const fieldHtml = fields.map(f => {
      const v = values[f.name] != null ? values[f.name] : (f.default != null ? f.default : '');
      const id = 'f_' + f.name;
      let input = '';
      switch (f.type) {
        case 'textarea': input = `<textarea id="${id}" name="${f.name}" rows="${f.rows || 5}" placeholder="${esc(f.placeholder || '')}">${esc(v)}</textarea>`; break;
        case 'select': input = `<select id="${id}" name="${f.name}">${f.options.map(o => { const [val, lab] = Array.isArray(o) ? o : [o, o]; return `<option value="${esc(val)}" ${String(val) === String(v) ? 'selected' : ''}>${esc(lab)}</option>`; }).join('')}</select>`; break;
        case 'checkbox': return `<div class="field"><label class="chk"><input type="checkbox" id="${id}" name="${f.name}" ${v === true || v === 'true' ? 'checked' : ''}> ${esc(f.label)}</label>${f.hint ? `<small>${esc(f.hint)}</small>` : ''}</div>`;
        case 'image': input = `${v ? `<div class="cur"><img src="${esc(v)}" alt=""><label class="chk"><input type="checkbox" name="${f.name}__remove"> Quitar imagen actual</label></div>` : ''}<input type="file" id="${id}" name="${f.name}" accept="image/*">`; break;
        case 'video': input = `<input type="file" id="${id}" name="${f.name}" accept="video/*" ${DB.REMOTE ? '' : 'disabled'}>`; break;
        case 'datetime': input = `<input type="datetime-local" id="${id}" name="${f.name}" value="${esc(toLocalInput(v))}">`; break;
        case 'number': input = `<input type="number" id="${id}" name="${f.name}" value="${esc(v)}" min="${f.min != null ? f.min : ''}" max="${f.max != null ? f.max : ''}" step="${f.step || 1}">`; break;
        default: input = `<input type="${f.type || 'text'}" id="${id}" name="${f.name}" value="${esc(v)}" placeholder="${esc(f.placeholder || '')}" ${f.list ? `list="${id}_l"` : ''} autocomplete="off">${f.list ? `<datalist id="${id}_l">${f.list.map(o => `<option value="${esc(o)}">`).join('')}</datalist>` : ''}`;
      }
      return `<div class="field"><label for="${id}">${esc(f.label)}${f.required ? ' *' : ''}</label>${input}${f.hint ? `<small>${f.hint}</small>` : ''}</div>`;
    }).join('');
    dlg.innerHTML = `<form class="form" novalidate>
      <header><h2>${esc(title)}</h2><button type="button" class="x" data-close aria-label="Cerrar">×</button></header>
      <div class="fields">${fieldHtml}</div>
      <p class="form-err" role="alert"></p>
      <footer><button type="button" class="btn ghost sm" data-close>Cancelar</button><button type="submit" class="btn sm">${esc(submitLabel)}</button></footer>
    </form>`;
    document.body.appendChild(dlg);
    const form = $('form', dlg), err = $('.form-err', dlg), btn = $('button[type=submit]', dlg);
    dlg.addEventListener('click', e => { if (e.target.hasAttribute('data-close') || e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', () => dlg.remove());
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); err.textContent = '';
      const out = {};
      for (const f of fields) {
        const el = form.elements[f.name];
        if (f.type === 'checkbox') out[f.name] = el.checked;
        else if (f.type === 'image' || f.type === 'video') { out[f.name] = (el.files && el.files[0]) || null; if (f.type === 'image') out[f.name + '__remove'] = !!(form.elements[f.name + '__remove'] && form.elements[f.name + '__remove'].checked); }
        else if (f.type === 'number') out[f.name] = el.value === '' ? null : Number(el.value);
        else if (f.type === 'datetime') out[f.name] = el.value ? new Date(el.value).toISOString() : null;
        else out[f.name] = el.value.trim();
        if (f.required && (out[f.name] === '' || out[f.name] == null)) { err.textContent = `Falta rellenar: ${f.label}.`; el.focus(); return; }
      }
      btn.disabled = true; btn.textContent = 'Guardando…';
      try { await onSubmit(out); dlg.close(); }
      catch (ex) { console.error(ex); err.textContent = 'No se pudo guardar: ' + (ex.message || ex); btn.disabled = false; btn.textContent = submitLabel; }
    });
    dlg.showModal();
    const first = form.querySelector('input:not([type=checkbox]),textarea,select'); if (first) first.focus();
  }

  /* Convierte campo imagen en URL final (sube archivo, conserva o quita) */
  async function resolveImage(out, name, current, folder) {
    if (out[name]) return DB.upload(out[name], folder);
    if (out[name + '__remove']) return null;
    return current || null;
  }

  /* ---------- Login ---------- */
  function openLogin() {
    openForm({
      title: 'Acceso del club',
      submitLabel: 'Entrar',
      fields: [
        { name: 'email', label: 'Correo', type: 'email', required: DB.REMOTE, default: DB.REMOTE ? '' : 'demo@local' },
        { name: 'password', label: 'Contraseña', type: 'password', required: true, hint: DB.REMOTE ? '' : 'Modo demo: la contraseña es <b>admin</b>.' }
      ],
      onSubmit: async (v) => { await DB.signIn(v.email, v.password); toast('Sesión de administrador iniciada'); }
    });
  }

  /* ---------- cabecera / barra admin ---------- */
  function updateChrome() {
    const bar = $('#adminbar');
    let html = '';
    if (isAdmin) html = `<div class="ab"><div class="wrap"><span>🛠 <b>Modo administrador:</b> usa los botones punteados para editar el sitio.${DB.REMOTE ? '' : ' (Demo: se guarda solo en este navegador)'}</span><button data-act="logout">Cerrar sesión</button></div></div>`;
    else if (DB.wantsRemote && !DB.REMOTE) html = `<div class="ab"><div class="wrap"><span>⚠ No se pudo cargar Supabase (la librería no descargó). Desactiva bloqueadores de anuncios/scripts para este sitio y recarga con Ctrl+F5.</span></div></div>`;
    else if (!DB.REMOTE) html = `<div class="ab"><div class="wrap"><span>Modo demo: los cambios se guardan solo en tu navegador. Configura Supabase (ver README) para publicarla de verdad.</span></div></div>`;
    bar.className = !DB.REMOTE ? 'demo' : '';
    bar.innerHTML = html;
    const lb = $('#loginBtn');
    lb.textContent = isAdmin ? 'Cerrar sesión' : 'Acceso club';
    lb.dataset.act = isAdmin ? 'logout' : 'login';
  }

  /* ---------- tarjetas de partido ---------- */
  function resultTag(m) {
    if (!m.played) return '';
    const d = m.goals_for - m.goals_against;
    return d > 0 ? '<span class="tag win">Victoria</span>' : d < 0 ? '<span class="tag loss">Derrota</span>' : '<span class="tag draw">Empate</span>';
  }
  function lineupHtml(m) {
    const list = (t) => String(t || '').split('\n').map(s => s.trim()).filter(Boolean);
    const st = list(m.lineup_starters), su = list(m.lineup_subs);
    if (!st.length && !su.length) return '';
    return `<details class="lineup"><summary>Alineación${m.formation ? ' · ' + esc(m.formation) : ''}</summary><div class="lineup-grid">
      ${st.length ? `<div><h4>Titulares</h4><ul>${st.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}
      ${su.length ? `<div><h4>Suplentes</h4><ul>${su.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}
    </div></details>`;
  }
  function matchCard(m, dark) {
    const team = (crest, name, right) => `<div class="team ${right ? 'right' : ''}">${crest}<span>${esc(name)}</span></div>`;
    const us = [MARINERS_CREST, 'Worthing Mariners'];
    const rv = [crestImg(m.rival_crest_url, m.rival), m.rival];
    const [L, R] = m.is_home ? [us, rv] : [rv, us];
    const score = m.played
      ? (m.is_home ? `${m.goals_for} – ${m.goals_against}` : `${m.goals_against} – ${m.goals_for}`)
      : fmtTime(m.match_date);
    return `<article class="match ${dark ? 'dark' : ''}">
      <div class="match-meta"><b>${esc(m.competition || '')}</b><span>${esc(fmtLong(m.match_date))}</span></div>
      <div class="match-teams">${team(L[0], L[1], false)}<div class="vs">${score}<small>${m.played ? 'FINAL' : 'VS'}</small></div>${team(R[0], R[1], true)}</div>
      <div class="match-foot"><span>${m.is_home ? 'Local' : 'Visitante'} · ${esc(m.venue || '')}</span>${resultTag(m)}${adm(`<button data-act="edit-match" data-id="${m.id}">Editar</button><button class="del" data-act="del-match" data-id="${m.id}">Borrar</button>`)}</div>
      ${lineupHtml(m)}
    </article>`;
  }

  /* ---------- noticias: tarjetas ---------- */
  const KIND = { noticia: 'Noticia', opinion: 'Opinión', video: 'Vídeo' };
  function newsCard(n) {
    return `<article class="news-card">
      <a class="img" href="#/noticias/${n.id}" aria-label="${esc(n.title)}">${n.image_url ? `<img src="${esc(n.image_url)}" alt="" loading="lazy">` : `<img class="crest" src="escudo.png" alt="">`}</a>
      <div class="in"><div><span class="tag t">${KIND[n.kind] || 'Noticia'}</span></div>
        <h3><a href="#/noticias/${n.id}">${esc(n.title)}</a></h3>
        <p>${esc(n.summary || '')}</p>
        <div class="byline">${esc(n.author || 'Prensa del club')} · ${esc(fmtShort(n.created_at))}</div>
        ${adm(`<button data-act="edit-news" data-id="${n.id}">Editar</button><button class="del" data-act="del-news" data-id="${n.id}">Borrar</button>`)}
      </div></article>`;
  }

  function videoEmbed(url) {
    if (!url) return '';
    const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
    if (yt) return `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${yt[1]}" title="Vídeo" allowfullscreen loading="lazy"></iframe></div>`;
    const vm = url.match(/vimeo\.com\/(\d+)/);
    if (vm) return `<div class="video"><iframe src="https://player.vimeo.com/video/${vm[1]}" title="Vídeo" allowfullscreen loading="lazy"></iframe></div>`;
    return `<video controls preload="metadata" src="${esc(url)}"></video>`;
  }

  /* ---------- PÁGINAS ---------- */
  const pageHead = (title, sub, extra = '') => `<section class="page-head"><div class="wrap"><div><h1 class="display">${title}</h1>${sub ? `<p>${sub}</p>` : ''}</div>${extra}</div></section>`;

  const pages = {};

  pages.home = async () => {
    const [matches, news, sponsors] = await Promise.all([DB.list('matches', 'match_date', true), DB.list('news', 'created_at', false), DB.list('sponsors', 'sort_order', true).catch(() => [])]);
    const upcoming = matches.filter(m => !m.played && new Date(m.match_date) >= new Date(Date.now() - 3 * 3600e3));
    const played = matches.filter(m => m.played).slice(-1);
    const strip = [upcoming[0], played[0]].filter(Boolean);
    const feature = news.slice(0, 3);
    return `
    <section class="hero" style="--hero:url('estadio.jpg')"><div class="wrap hero-in">
      <div><p class="eyebrow">EFL League Two · Temporada 2026/27</p>
        <h1 class="display">Proud of <span>where we come from</span></h1>
        <p class="lead">Fundado en 2016 por los aficionados en The Toad in the Hole. De la décima categoría al fútbol profesional: un club construido por su gente.</p>
        <div class="btns"><a class="btn" href="#/tickets">Entradas</a><a class="btn ghost" href="#/historia">Nuestra historia</a></div></div>
      <img class="hero-crest" src="escudo.png" alt="Escudo del Worthing Mariners AFC">
    </div></section>
    <div class="wrap"><div class="strip">${strip.length ? strip.map((m, i) => matchCard(m, i === 0)).join('') : `<div class="empty" style="grid-column:1/-1">Aún no hay partidos publicados.</div>`}</div></div>
    <section class="section"><div class="wrap">
      <div class="sec-head"><h2 class="display">Últimas noticias</h2><a class="btn dark sm" href="#/noticias">Ver todas</a></div>
      ${feature.length ? `<div class="news-feature">${feature.map(newsCard).join('')}</div>` : `<div class="empty">Todavía no hay noticias.</div>`}
    </div></section>
    ${sponsors.length ? `<section class="section tight"><div class="wrap">
      <div class="sec-head"><h2 class="display">Patrocinadores</h2><a class="btn dark sm" href="#/patrocinadores">Conócelos</a></div>
      <div class="sponsor-strip">${sponsors.slice(0, 8).map(s => `<a class="sp-chip" href="#/patrocinadores" title="${esc(s.name)}">${s.logo_url ? `<img src="${esc(s.logo_url)}" alt="${esc(s.name)}" loading="lazy">` : `<span>${esc(s.name)}</span>`}</a>`).join('')}</div>
    </div></section>` : ''}
    <section class="facts"><div class="wrap">
      <div class="fact"><b>2016</b><span>Año de fundación</span></div>
      <div class="fact"><b>4.850</b><span>Aforo de Harbour Lane</span></div>
      <div class="fact"><b>51 %</b><span>En manos de los aficionados</span></div>
      <div class="fact"><b>10 → 4</b><span>Del nivel 10 al nivel 4</span></div>
    </div></section>
    <section class="banner"><div class="wrap"><h2 class="display">Born by the sea. <span>Built by the people.</span></h2><p>«You can change the name and badge, but you can't take Worthing from its people!»</p></div></section>`;
  };

  pages.noticias = async () => {
    const all = await DB.list('news', 'created_at', false);
    const list = newsFilter === 'todas' ? all : all.filter(n => n.kind === newsFilter);
    const chip = (k, l) => `<a href="javascript:void 0" class="${newsFilter === k ? 'on' : ''}" data-act="filter" data-id="${k}">${l}</a>`;
    return pageHead('Noticias', 'Todo lo que pasa en el Worthing Mariners: crónicas, comunicados, opiniones y vídeos.', isAdmin ? `<button class="adm-add" data-act="add-news">+ Nueva publicación</button>` : '') +
      `<section class="section tight"><div class="wrap"><div class="chips">${chip('todas', 'Todas')}${chip('noticia', 'Noticias')}${chip('opinion', 'Opinión')}${chip('video', 'Vídeos')}</div>
      ${list.length ? `<div class="news-grid">${list.map(newsCard).join('')}</div>` : `<div class="empty">No hay publicaciones en esta categoría.</div>`}</div></section>`;
  };

  pages.article = async (id) => {
    const all = await DB.list('news', 'created_at', false);
    const n = all.find(x => x.id === id);
    if (!n) return pageHead('No encontrada', '') + `<div class="wrap section"><div class="empty">Esta publicación no existe. <a href="#/noticias">Volver a noticias</a></div></div>`;
    return `<section class="page-head"><div class="wrap"><a href="#/noticias" class="eyebrow" style="text-decoration:none">← Noticias</a></div></section>
      <div class="wrap"><article class="article">
        <span class="tag t">${KIND[n.kind] || 'Noticia'}</span>
        <h1 class="display">${esc(n.title)}</h1>
        <div class="byline">Por <b>${esc(n.author || 'Prensa del club')}</b> · ${esc(fmtLong(n.created_at))}</div>
        ${n.summary ? `<p class="lede">${esc(n.summary)}</p>` : ''}
        ${n.image_url ? `<img class="hero-img" src="${esc(n.image_url)}" alt="">` : ''}
        ${videoEmbed(n.video_url)}
        ${paragraphs(n.body)}
        ${adm(`<button data-act="edit-news" data-id="${n.id}">Editar</button><button class="del" data-act="del-news" data-id="${n.id}">Borrar</button>`)}
      </article></div>`;
  };

  pages.partidos = async () => {
    const all = await DB.list('matches', 'match_date', true);
    const next = all.filter(m => !m.played), done = all.filter(m => m.played).reverse();
    return pageHead('Partidos', 'Calendario, resultados y alineaciones del Mariners.', isAdmin ? `<button class="adm-add" data-act="add-match">+ Añadir partido</button>` : '') +
      `<section class="section tight"><div class="wrap">
        <h2 class="group-title display">Próximos partidos</h2>
        ${next.length ? `<div class="match-list">${next.map(m => matchCard(m)).join('')}</div>` : `<div class="empty">No hay partidos programados.</div>`}
        <h2 class="group-title display">Resultados</h2>
        ${done.length ? `<div class="match-list">${done.map(m => matchCard(m)).join('')}</div>` : `<div class="empty">Todavía no se han jugado partidos.</div>`}
      </div></section>`;
  };

  pages.plantilla = async () => {
    const players = await DB.list('players', 'number', true);
    const groups = POS_GROUPS.map(([name, codes]) => [name, players.filter(p => codes.includes(p.position))]);
    const rest = players.filter(p => !POSITIONS.includes(p.position));
    if (rest.length) groups.push(['Otros', rest]);
    const card = (p) => `<article class="player">
      <div class="ph">${p.photo_url ? `<img class="photo" src="${esc(p.photo_url)}" alt="${esc(p.first_name + ' ' + p.last_name)}" loading="lazy">` : `<img class="sil" src="escudo.png" alt="">`}<span class="num">${esc(p.number)}</span></div>
      <div class="meta"><span class="fn">${esc(p.first_name)}</span><h3 class="display">${esc(p.last_name)}</h3>
        <div class="sub"><span class="tag t">${esc(p.position)}</span><span>${esc(p.nationality || '')}</span></div></div>
      ${adm(`<button data-act="edit-player" data-id="${p.id}">Editar</button><button class="del" data-act="del-player" data-id="${p.id}">Borrar</button>`)}
    </article>`;
    return pageHead('Plantilla', 'El primer equipo del Worthing Mariners AFC.', isAdmin ? `<button class="adm-add" data-act="add-player">+ Añadir jugador</button>` : '') +
      `<section class="section tight"><div class="wrap">${players.length ? groups.filter(g => g[1].length).map(([n, ps]) => `<h2 class="group-title display">${n}</h2><div class="squad">${ps.map(card).join('')}</div>`).join('') : `<div class="empty">La plantilla aún no tiene jugadores.</div>`}</div></section>`;
  };

  pages.tickets = async () => {
    const all = await DB.list('tickets', 'event_date', true);
    const now = Date.now() - 3 * 3600e3;
    const row = (t) => {
      const d = new Date(t.event_date), past = d.getTime() < now;
      const status = past ? '<span class="tag off">Finalizado</span>' : !t.on_sale ? '<span class="tag soon">Próximamente</span>' : t.available <= 0 ? '<span class="tag out">Agotado</span>' : '<span class="tag on">A la venta</span>';
      return `<article class="ticket ${past ? 'past' : ''}">
        <div class="date"><b>${d.getDate()}</b><span>${MONTHS[d.getMonth()]}</span></div>
        <div class="main"><h3 class="display">Worthing Mariners vs ${esc(t.rival)}</h3>
          <div class="sub">${esc(t.competition || '')} · ${esc(t.venue || 'Harbour Lane')} · ${esc(fmtTime(t.event_date))} h</div>
          <div class="prices"><div class="price"><small>Adulto</small><b>${money(t.price_adult)}</b></div><div class="price"><small>Junior</small><b>${money(t.price_junior)}</b></div><div class="price"><small>Senior</small><b>${money(t.price_senior)}</b></div></div></div>
        <div class="side">${status}
          <div><span class="big">${Number(t.available || 0).toLocaleString('es-ES')}</span><br>entradas locales disponibles</div>
          <div><b>${Number(t.away_allocation || 0).toLocaleString('es-ES')}</b> para aficionados visitantes</div>
          ${adm(`<button data-act="edit-ticket" data-id="${t.id}">Editar</button><button class="del" data-act="del-ticket" data-id="${t.id}">Borrar</button>`)}</div>
      </article>`;
    };
    return pageHead('Tickets', 'Entradas para los partidos en Harbour Lane.', isAdmin ? `<button class="adm-add" data-act="add-ticket">+ Añadir partido con entradas</button>` : '') +
      `<section class="section tight"><div class="wrap">
        <div class="notice"><b>Club ficticio:</b> la venta es solo informativa, no se realizan cobros reales. La grada <b>The Dock</b> reúne a los aficionados más fieles del Mariners.</div>
        ${all.length ? `<div class="tickets">${all.map(row).join('')}</div>` : `<div class="empty">No hay entradas publicadas todavía.</div>`}
      </div></section>`;
  };

  pages.patrocinadores = async () => {
    let all;
    try { all = await DB.list('sponsors', 'sort_order', true); }
    catch (e) {
      return pageHead('Patrocinadores', '') + `<div class="wrap section"><div class="empty">Esta sección aún no está activada en la base de datos.<br><small>Falta ejecutar <b>sponsors.sql</b> en Supabase (SQL Editor).</small></div></div>`;
    }
    const TIERS = [['principal', 'Patrocinador técnico oficial'], ['oficial', 'Patrocinadores oficiales'], ['colaborador', 'Colaboradores']];
    const card = (s) => {
      const url = safeUrl(s.website_url);
      return `<article class="sponsor">
        <div class="logo">${s.logo_url ? `<img src="${esc(s.logo_url)}" alt="Logo de ${esc(s.name)}" loading="lazy">` : `<span class="mono" aria-hidden="true">${esc(initials(s.name))}</span>`}</div>
        <div class="in">${s.role ? `<span class="role">${esc(s.role)}</span>` : ''}
          <h3 class="display">${esc(s.name)}</h3>
          <p>${esc(s.description || '')}</p>
          ${url ? `<a class="more" href="${esc(url)}" target="_blank" rel="noopener noreferrer">Visitar su web →</a>` : ''}
          ${adm(`<button data-act="edit-sponsor" data-id="${s.id}">Editar</button><button class="del" data-act="del-sponsor" data-id="${s.id}">Borrar</button>`)}
        </div></article>`;
    };
    const known = TIERS.map(t => t[0]);
    const groups = TIERS.map(([k, label]) => [label, all.filter(s => (known.includes(s.tier) ? s.tier : 'colaborador') === k)]);
    return pageHead('Patrocinadores', 'Las empresas que apoyan al Worthing Mariners y a su comunidad. Gracias por creer en un club de su gente.', isAdmin ? `<button class="adm-add" data-act="add-sponsor">+ Añadir patrocinador</button>` : '') +
      `<section class="section tight"><div class="wrap">${all.length ? groups.filter(g => g[1].length).map(([label, list]) => `<h2 class="group-title display">${label}</h2><div class="sponsors ${label === 'Patrocinador técnico oficial' ? 'solo' : ''}">${list.map(card).join('')}</div>`).join('') : `<div class="empty">Todavía no hay patrocinadores publicados.</div>`}</div></section>`;
  };

  pages.historia = async () => {
    const h = await DB.getContent('history', DEFAULT_HISTORY);
    const text = (h.text || '').split(/\n{2,}/).map(block => {
      const m = block.trim().match(/^##\s+(.+?)(?:\n([\s\S]*))?$/);
      return m ? `<h3 class="display">${esc(m[1])}</h3>${m[2] ? paragraphs(m[2]) : ''}` : paragraphs(block);
    }).join('');
    const gallery = (h.gallery || []).map((g, i) => `<figure><img src="${esc(g.url)}" alt="${esc(g.caption || '')}" loading="lazy"><figcaption><span>${esc(g.caption || '')}</span>${adm(`<button class="del" data-act="del-img" data-id="${i}">Quitar</button>`)}</figcaption></figure>`).join('');
    return pageHead('Historia del club', 'Born by the sea. Built by the people.', isAdmin ? `<span class="adm"><button class="adm-add" data-act="edit-history">✎ Editar historia</button><button class="adm-add" data-act="add-img">+ Subir imagen</button></span>` : '') +
      `<section class="section tight"><div class="wrap"><div class="story">
        <div class="prose">${text}</div>
        <aside><img src="escudo.png" alt="Escudo" style="width:70%;margin:0 auto 24px"><div class="gallery">${gallery}</div></aside>
      </div></div></section>`;
  };

  /* ---------- Router ---------- */
  async function render() {
    const token = ++renderToken;
    const hash = location.hash.replace(/^#\/?/, '');
    const [seg, arg] = hash.split('/');
    let html;
    app.setAttribute('aria-busy', 'true');
    try {
      if (!seg) html = await pages.home();
      else if (seg === 'noticias' && arg) html = await pages.article(arg);
      else if (pages[seg]) html = await pages[seg]();
      else html = await pages.home();
    } catch (e) {
      console.error(e);
      html = pageHead('Ups', '') + `<div class="wrap section"><div class="empty">No se pudo cargar esta sección.<br><small>${esc(e.message || e)}</small></div></div>`;
    }
    if (token !== renderToken) return;
    app.innerHTML = html;
    app.removeAttribute('aria-busy');
    document.querySelectorAll('nav [data-nav]').forEach(a => a.classList.toggle('on', a.dataset.nav === seg));
    $('#nav').classList.remove('open'); $('#burger').setAttribute('aria-expanded', 'false');
  }
  const go = () => { window.scrollTo(0, 0); render(); };

  /* ---------- Acciones de administrador ---------- */
  async function byId(table, order, id) { return (await DB.list(table, order)).find(r => r.id === id); }
  const confirmDel = (what) => confirm(`¿Seguro que quieres borrar ${what}? Esta acción no se puede deshacer.`);
  const wrapErr = (fn) => async (...a) => { try { await fn(...a); } catch (e) { console.error(e); toast(e.message || 'Error', true); } };

  const actions = {
    login: openLogin,
    logout: wrapErr(async () => { await DB.signOut(); isAdmin = false; updateChrome(); toast('Sesión cerrada'); render(); }),
    filter: (id) => { newsFilter = id; render(); },

    /* --- plantilla --- */
    'add-player': () => playerForm(),
    'edit-player': wrapErr(async (id) => playerForm(await byId('players', 'number', id))),
    'del-player': wrapErr(async (id) => { if (!confirmDel('este jugador')) return; await DB.remove('players', id); toast('Jugador borrado'); render(); }),

    /* --- partidos --- */
    'add-match': () => matchForm(),
    'edit-match': wrapErr(async (id) => matchForm(await byId('matches', 'match_date', id))),
    'del-match': wrapErr(async (id) => { if (!confirmDel('este partido')) return; await DB.remove('matches', id); toast('Partido borrado'); render(); }),

    /* --- tickets --- */
    'add-ticket': () => ticketForm(),
    'edit-ticket': wrapErr(async (id) => ticketForm(await byId('tickets', 'event_date', id))),
    'del-ticket': wrapErr(async (id) => { if (!confirmDel('estas entradas')) return; await DB.remove('tickets', id); toast('Entradas borradas'); render(); }),

    /* --- noticias --- */
    'add-news': () => newsForm(),
    'edit-news': wrapErr(async (id) => newsForm(await byId('news', 'created_at', id))),
    'del-news': wrapErr(async (id) => { if (!confirmDel('esta publicación')) return; await DB.remove('news', id); toast('Publicación borrada'); if (location.hash.includes('/noticias/')) location.hash = '#/noticias'; else render(); }),

    /* --- patrocinadores --- */
    'add-sponsor': () => sponsorForm(),
    'edit-sponsor': wrapErr(async (id) => sponsorForm(await byId('sponsors', 'sort_order', id))),
    'del-sponsor': wrapErr(async (id) => { if (!confirmDel('este patrocinador')) return; await DB.remove('sponsors', id); toast('Patrocinador borrado'); render(); }),

    /* --- historia --- */
    'edit-history': wrapErr(async () => {
      const h = await DB.getContent('history', DEFAULT_HISTORY);
      openForm({
        title: 'Editar historia del club',
        fields: [{ name: 'text', label: 'Texto', type: 'textarea', rows: 16, hint: 'Usa <code>## Título</code> en una línea para crear un apartado y deja una línea en blanco entre párrafos.' }],
        values: { text: h.text },
        onSubmit: async (v) => { await DB.setContent('history', { ...h, text: v.text }); toast('Historia actualizada'); render(); }
      });
    }),
    'add-img': wrapErr(async () => {
      const h = await DB.getContent('history', DEFAULT_HISTORY);
      openForm({
        title: 'Subir imagen a la historia',
        fields: [{ name: 'image', label: 'Imagen', type: 'image', required: true }, { name: 'caption', label: 'Pie de foto', type: 'text' }],
        onSubmit: async (v) => {
          const url = await DB.upload(v.image, 'historia');
          await DB.setContent('history', { ...h, gallery: [...(h.gallery || []), { url, caption: v.caption }] });
          toast('Imagen añadida'); render();
        }
      });
    }),
    'del-img': wrapErr(async (i) => {
      if (!confirmDel('esta imagen')) return;
      const h = await DB.getContent('history', DEFAULT_HISTORY);
      const g = [...(h.gallery || [])]; g.splice(Number(i), 1);
      await DB.setContent('history', { ...h, gallery: g }); toast('Imagen quitada'); render();
    })
  };

  function playerForm(p) {
    openForm({
      title: p ? 'Editar jugador' : 'Añadir jugador',
      values: p || {},
      fields: [
        { name: 'first_name', label: 'Nombre', required: true },
        { name: 'last_name', label: 'Apellido', required: true },
        { name: 'number', label: 'Dorsal', type: 'number', required: true, min: 1, max: 99 },
        { name: 'position', label: 'Posición', type: 'select', options: POSITIONS, default: 'MC' },
        { name: 'nationality', label: 'Nacionalidad', list: ['Inglaterra', 'Escocia', 'Gales', 'Irlanda', 'Chile', 'España', 'Francia', 'Brasil', 'Argentina', 'Jamaica', 'Nigeria'] },
        { name: 'photo_url', label: 'Foto', type: 'image' }
      ],
      onSubmit: async (v) => {
        const photo = await resolveImage(v, 'photo_url', p && p.photo_url, 'jugadores');
        await DB.save('players', { ...(p ? { id: p.id } : {}), first_name: v.first_name, last_name: v.last_name, number: v.number, position: v.position, nationality: v.nationality, photo_url: photo });
        toast(p ? 'Jugador actualizado' : 'Jugador añadido'); render();
      }
    });
  }

  async function matchForm(m) {
    const players = await DB.list('players', 'number', true).catch(() => []);
    const hint = players.length ? 'Plantilla: ' + players.map(p => `${p.number} ${p.last_name}`).join(', ') : '';
    openForm({
      title: m ? 'Editar partido' : 'Añadir partido',
      values: m || { is_home: true, venue: 'Harbour Lane', competition: 'EFL League Two' },
      fields: [
        { name: 'rival', label: 'Rival', required: true },
        { name: 'rival_crest_url', label: 'Escudo del rival', type: 'image' },
        { name: 'match_date', label: 'Fecha y hora', type: 'datetime', required: true },
        { name: 'competition', label: 'Competición' },
        { name: 'is_home', label: 'Jugamos como local', type: 'checkbox' },
        { name: 'venue', label: 'Estadio' },
        { name: 'played', label: 'Partido ya jugado (mostrar resultado)', type: 'checkbox' },
        { name: 'goals_for', label: 'Goles del Mariners', type: 'number', min: 0 },
        { name: 'goals_against', label: 'Goles del rival', type: 'number', min: 0 },
        { name: 'formation', label: 'Formación', placeholder: '4-4-2' },
        { name: 'lineup_starters', label: 'Alineación titular', type: 'textarea', rows: 6, hint: 'Un jugador por línea. ' + esc(hint) },
        { name: 'lineup_subs', label: 'Suplentes', type: 'textarea', rows: 3, hint: 'Un jugador por línea.' }
      ],
      onSubmit: async (v) => {
        const crest = await resolveImage(v, 'rival_crest_url', m && m.rival_crest_url, 'rivales');
        const played = !!v.played;
        await DB.save('matches', {
          ...(m ? { id: m.id } : {}), rival: v.rival, rival_crest_url: crest, match_date: v.match_date, competition: v.competition, is_home: v.is_home, venue: v.venue,
          played, goals_for: played ? (v.goals_for ?? 0) : null, goals_against: played ? (v.goals_against ?? 0) : null,
          formation: v.formation, lineup_starters: v.lineup_starters, lineup_subs: v.lineup_subs
        });
        toast(m ? 'Partido actualizado' : 'Partido añadido'); render();
      }
    });
  }

  function ticketForm(t) {
    openForm({
      title: t ? 'Editar entradas' : 'Añadir partido con entradas',
      values: t || { venue: 'Harbour Lane', competition: 'EFL League Two', on_sale: true, available: 4000, away_allocation: 500, price_adult: 18, price_junior: 6, price_senior: 12 },
      fields: [
        { name: 'rival', label: 'Rival', required: true },
        { name: 'event_date', label: 'Fecha y hora', type: 'datetime', required: true },
        { name: 'competition', label: 'Competición' },
        { name: 'venue', label: 'Estadio' },
        { name: 'price_adult', label: 'Precio adulto (£)', type: 'number', min: 0, step: 0.5 },
        { name: 'price_junior', label: 'Precio junior (£)', type: 'number', min: 0, step: 0.5 },
        { name: 'price_senior', label: 'Precio senior (£)', type: 'number', min: 0, step: 0.5 },
        { name: 'available', label: 'Entradas disponibles (aficionados locales)', type: 'number', min: 0 },
        { name: 'away_allocation', label: 'Entradas destinadas a visitantes', type: 'number', min: 0, hint: 'Harbour Lane tiene capacidad para 4.850 espectadores.' },
        { name: 'on_sale', label: 'Entradas a la venta', type: 'checkbox' }
      ],
      onSubmit: async (v) => {
        if ((v.available || 0) + (v.away_allocation || 0) > 4850) throw new Error('La suma de entradas locales y de visitantes supera el aforo de 4.850.');
        await DB.save('tickets', { ...(t ? { id: t.id } : {}), rival: v.rival, event_date: v.event_date, competition: v.competition, venue: v.venue, price_adult: v.price_adult, price_junior: v.price_junior, price_senior: v.price_senior, available: v.available ?? 0, away_allocation: v.away_allocation ?? 0, on_sale: v.on_sale });
        toast(t ? 'Entradas actualizadas' : 'Entradas añadidas'); render();
      }
    });
  }

  function sponsorForm(s) {
    openForm({
      title: s ? 'Editar patrocinador' : 'Añadir patrocinador',
      values: s || { tier: 'oficial', sort_order: 100 },
      fields: [
        { name: 'name', label: 'Nombre de la empresa', required: true },
        { name: 'role', label: 'Qué patrocina', placeholder: 'Ej: Patrocinador de la tribuna principal' },
        { name: 'tier', label: 'Categoría', type: 'select', options: [['principal', 'Patrocinador técnico / principal'], ['oficial', 'Patrocinador oficial'], ['colaborador', 'Colaborador']] },
        { name: 'description', label: 'Resumen: a qué se dedica', type: 'textarea', rows: 4 },
        { name: 'logo_url', label: 'Logo', type: 'image' },
        { name: 'website_url', label: 'Página web (opcional)', type: 'url', placeholder: 'https://…' },
        { name: 'sort_order', label: 'Orden', type: 'number', min: 0, hint: 'Los números más bajos aparecen primero dentro de su categoría.' }
      ],
      onSubmit: async (v) => {
        const logo = await resolveImage(v, 'logo_url', s && s.logo_url, 'patrocinadores');
        await DB.save('sponsors', { ...(s ? { id: s.id } : {}), name: v.name, role: v.role, tier: v.tier, description: v.description, logo_url: logo, website_url: v.website_url || null, sort_order: v.sort_order ?? 100 });
        toast(s ? 'Patrocinador actualizado' : 'Patrocinador añadido'); render();
      }
    });
  }

  function newsForm(n) {
    let lastAuthor = ''; try { lastAuthor = localStorage.getItem('wm_author') || ''; } catch (e) { /* sin almacenamiento */ }
    openForm({
      title: n ? 'Editar publicación' : 'Nueva publicación',
      values: n || { kind: 'noticia', author: lastAuthor },
      fields: [
        { name: 'title', label: 'Título', required: true },
        { name: 'kind', label: 'Tipo', type: 'select', options: [['noticia', 'Noticia'], ['opinion', 'Opinión'], ['video', 'Vídeo']] },
        { name: 'author', label: 'Autor', required: true, placeholder: 'Ej: Richard Thompson, presidente' },
        { name: 'summary', label: 'Resumen (entradilla)', type: 'textarea', rows: 2 },
        { name: 'body', label: 'Texto', type: 'textarea', rows: 9, hint: 'Deja una línea en blanco entre párrafos.' },
        { name: 'image_url', label: 'Foto principal', type: 'image' },
        { name: 'video_url', label: 'Vídeo: enlace de YouTube / Vimeo / archivo', type: 'url', placeholder: 'https://youtu.be/…' },
        { name: 'video_file', label: DB.REMOTE ? 'O sube un vídeo (máx. ~45 MB)' : 'O sube un vídeo (solo disponible con Supabase configurado)', type: 'video' }
      ],
      onSubmit: async (v) => {
        const img = await resolveImage(v, 'image_url', n && n.image_url, 'noticias');
        let video = v.video_url || null;
        if (v.video_file) {
          if (v.video_file.size > 45 * 1024 * 1024) throw new Error('El vídeo pesa más de 45 MB. Súbelo a YouTube y pega el enlace.');
          video = await DB.upload(v.video_file, 'videos');
        }
        try { localStorage.setItem('wm_author', v.author); } catch (e) { /* ok */ }
        await DB.save('news', { ...(n ? { id: n.id } : {}), title: v.title, kind: v.kind, author: v.author, summary: v.summary, body: v.body, image_url: img, video_url: video || null });
        toast(n ? 'Publicación actualizada' : 'Publicación creada'); render();
      }
    });
  }

  /* ---------- Eventos globales ---------- */
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-act]');
    if (el) {
      const fn = actions[el.dataset.act];
      if (fn) { e.preventDefault(); fn(el.dataset.id); }
      return;
    }
    if (e.target.closest('#burger')) { const nav = $('#nav'); const open = nav.classList.toggle('open'); $('#burger').setAttribute('aria-expanded', String(open)); }
  });
  window.addEventListener('hashchange', go);

  /* ---------- Arranque ---------- */
  (async function init() {
    if (DB.wantsRemote && !DB.REMOTE) toast('No se pudo cargar Supabase: revisa tu conexión.', true);
    try { isAdmin = await DB.isAdmin(); } catch (e) { isAdmin = false; }
    updateChrome();
    DB.onAuth(async () => { isAdmin = await DB.isAdmin(); updateChrome(); render(); });
    render();
  })();
})();
