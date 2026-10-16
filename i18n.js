/* Idioma (ES / EN) y tema (claro / oscuro).
   El sitio está escrito en español; en inglés se traduce el texto ya dibujado en pantalla
   usando el diccionario de abajo. El contenido que escribe el administrador (noticias,
   descripciones…) no se traduce aquí. */
(function () {
  'use strict';
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } }
  };

  /* ---------- Diccionario ES → EN (texto exacto) ---------- */
  const EN = {
    /* navegación y pie */
    'Noticias': 'News', 'Partidos': 'Fixtures', 'Plantilla': 'Squad', 'Tickets': 'Tickets', 'Historia': 'History',
    'Patrocinadores': 'Sponsors', 'Socios': 'Members', 'Entrar': 'Log in', 'Mi cuenta': 'My account', 'Cerrar sesión': 'Log out',
    'Socio ★': 'Member ★', 'Contacto': 'Contact', 'Menú': 'Menu', 'Principal': 'Main', 'Inicio': 'Home', 'Cerrar': 'Close',
    'Cargando…': 'Loading…', 'Cancelar': 'Cancel', 'Escudo': 'Crest',
    'Escudo del Worthing Mariners': 'Worthing Mariners crest', 'Escudo del Worthing Mariners AFC': 'Worthing Mariners AFC crest',
    'Escudo Worthing Mariners': 'Worthing Mariners crest',
    'Harbour Lane · Worthing, West Sussex · Fundado en 2016 ·': 'Harbour Lane · Worthing, West Sussex · Founded in 2016 ·',
    'Born by the sea. Built by the people. — Club ficticio creado para un modo carrera de FC 27. Escudo y marca no oficiales.': 'Born by the sea. Built by the people. — Fictional club created for an FC 27 career mode. Unofficial crest and brand.',
    'Modo demo: los cambios se guardan solo en tu navegador. Configura Supabase (ver README) para publicarla de verdad.': 'Demo mode: changes are only saved in your browser. Set up Supabase (see README) to publish it for real.',
    'Cambiar tema': 'Switch theme', 'Cambiar idioma': 'Switch language',

    /* inicio */
    'EFL League Two · Temporada 2026/27': 'EFL League Two · 2026/27 season',
    'Proud of': 'Proud of', 'where we come from': 'where we come from',
    'Fundado en 2016 por los aficionados en The Toad in the Hole. De la décima categoría al fútbol profesional: un club construido por su gente.': 'Founded in 2016 by supporters at The Toad in the Hole. From the tenth tier to professional football: a club built by its people.',
    'Entradas': 'Tickets', 'Nuestra historia': 'Our history', 'Últimas noticias': 'Latest news', 'Ver todas': 'View all',
    'Próximos partidos': 'Upcoming fixtures', 'Resultados': 'Results', 'Patrocinadores oficiales': 'Official sponsors', 'Conócelos': 'Meet them',
    'Año de fundación': 'Founded', 'Aforo de Harbour Lane': 'Harbour Lane capacity', 'Del nivel 10 al nivel 4': 'From tier 10 to tier 4',
    'En manos de los aficionados': 'Fan-owned', 'Colabora con el club': 'Support the club', 'Quiero colaborar o patrocinar': 'I want to collaborate or sponsor',
    'Un club propiedad de su gente': 'A club owned by its people', 'Hablemos': "Let's talk",

    /* noticias */
    'Noticia': 'News', 'Opinión': 'Opinion', 'Vídeo': 'Video', 'Vídeos': 'Videos', 'Todas': 'All', 'Por': 'By', 'Prensa del club': 'Club press office',
    'Todo lo que pasa en el Worthing Mariners: crónicas, comunicados, opiniones y vídeos.': 'Everything happening at Worthing Mariners: match reports, statements, opinion pieces and videos.',
    'Todavía no hay noticias.': 'No news yet.', 'No hay publicaciones en esta categoría.': 'There are no posts in this category.',
    '← Noticias': '← News', 'Volver a noticias': 'Back to news', 'Esta publicación no existe.': 'This post does not exist.',
    'Compartir': 'Share', 'Copiar enlace': 'Copy link', 'Enlace copiado': 'Link copied',

    /* partidos */
    'Calendario, resultados y alineaciones del Mariners.': 'Fixtures, results and line-ups for the Mariners.',
    'No hay partidos programados.': 'No fixtures scheduled.', 'Todavía no se han jugado partidos.': 'No matches have been played yet.',
    'Aún no hay partidos publicados.': 'No fixtures published yet.',
    'Victoria': 'Win', 'Derrota': 'Defeat', 'Empate': 'Draw', 'FINAL': 'FT', 'VS': 'VS',
    'Local': 'Home', 'Visitante': 'Away', 'Titulares': 'Starting XI', 'Suplentes': 'Substitutes', 'Alineación': 'Line-up', 'Alineación titular': 'Starting line-up',
    '📅 Añadir al calendario': '📅 Add to calendar', '📅 Descargar todos los partidos': '📅 Download all fixtures',
    'Descargar para tu calendario': 'Download for your calendar', 'Archivo de calendario descargado': 'Calendar file downloaded',
    'Calendario descargado: ábrelo para añadirlo': 'Calendar downloaded: open it to add it',

    /* plantilla */
    'El primer equipo del Worthing Mariners AFC.': 'The Worthing Mariners AFC first team.',
    'Porteros': 'Goalkeepers', 'Defensas': 'Defenders', 'Centrocampistas': 'Midfielders', 'Delanteros': 'Forwards',
    'La plantilla aún no tiene jugadores.': 'The squad has no players yet.',
    'PT': 'GK', 'LD': 'RB', 'LI': 'LB', 'DFC': 'CB', 'MCD': 'CDM', 'MC': 'CM', 'MCO': 'CAM', 'MD': 'RM', 'MI': 'LM', 'ED': 'RW', 'EI': 'LW', 'SD': 'SS', 'DC': 'ST',
    'Inglaterra': 'England', 'Escocia': 'Scotland', 'Gales': 'Wales', 'Irlanda': 'Ireland', 'Francia': 'France', 'España': 'Spain', 'Alemania': 'Germany', 'Portugal': 'Portugal', 'Chile': 'Chile',

    /* tickets y mapa */
    'Entradas para los partidos en Harbour Lane.': 'Tickets for matches at Harbour Lane.',
    'Hazte socio': 'Become a member', 'y ahorra hasta un 30 % en todas tus entradas.': 'and save up to 30 % on all your tickets.',
    'Club ficticio:': 'Fictional club:', 'la venta es solo informativa, no se realizan cobros reales.': 'ticket sales are for information only; no real payments are taken.',
    'Club ficticio: la compra es simulada, no se pide tarjeta ni se cobra nada.': 'Fictional club: the purchase is simulated; no card is asked for and nothing is charged.',
    'Club ficticio: los mensajes se guardan solo para el administrador de esta web.': 'Fictional club: messages are only stored for this website’s administrator.',
    'Precios de socio activados:': 'Member prices on:',
    'Harbour Lane por zonas': 'Harbour Lane by zone', 'Plano de Harbour Lane': 'Harbour Lane plan', 'Plano de Harbour Lane por zonas de precio': 'Harbour Lane plan by price zone',
    'Leyenda de precios': 'Price key', 'Más barato': 'Cheaper', 'Más caro': 'More expensive',
    'Aforo de la zona': 'Zone capacity', 'espectadores': 'spectators', 'Adulto': 'Adult', 'Junior': 'Junior', 'Senior': 'Senior',
    'Asientos': 'Seated', 'De pie': 'Standing', 'Visitantes': 'Away fans', 'Zona de visitantes': 'Away section',
    'Precio de adulto por zona': 'Adult price per zone', 'Partido de categoría alta': 'High-demand match', 'Partido de categoría baja': 'Low-demand match',
    'A la venta': 'On sale', 'Agotado': 'Sold out', 'Finalizado': 'Finished', 'Entradas a la venta': 'Tickets on sale',
    'entradas locales disponibles': 'home tickets available', 'para aficionados visitantes': 'for away fans',
    'No hay entradas publicadas todavía.': 'No tickets published yet.',
    'La grada más ruidosa de Harbour Lane, en el extremo norte. Aquí se concentran los seguidores más apasionados del Mariners, con banderas azul marino y turquesa y cánticos durante todo el partido.': 'The loudest stand at Harbour Lane, at the north end. The Mariners’ most passionate supporters gather here, with navy and turquoise flags and chants all match long.',
    'La grada principal, junto a los vestuarios, la zona de prensa y los espacios de patrocinadores. Asientos cubiertos con la mejor vista del campo.': 'The main stand, next to the dressing rooms, the press area and the sponsor lounges. Covered seats with the best view of the pitch.',
    'La tribuna lateral frente a la principal, pensada para familias y aficionados jóvenes. Asientos cubiertos y un ambiente más tranquilo.': 'The side stand opposite the main stand, designed for families and young fans. Covered seats and a calmer atmosphere.',
    'El extremo sur, de pie, reservado a los aficionados visitantes.': 'The south end, standing only, reserved for away supporters.',

    /* socios y cuenta */
    'Hazte socio del Worthing Mariners: entradas más baratas, regalos y la satisfacción de ser parte del club.': 'Become a Worthing Mariners member: cheaper tickets, gifts and the pride of being part of the club.',
    '/ año': '/ year', 'El más popular': 'Most popular', 'Comprar ya': 'Buy now', 'Renovar plan': 'Renew plan',
    'en todas las entradas': 'on all tickets', 'Camiseta oficial de regalo': 'Free official shirt', 'Camiseta oficial firmada de regalo': 'Free signed official shirt',
    'Camiseta oficial de regalo:': 'Free official shirt:', 'Camiseta oficial firmada de regalo:': 'Free signed official shirt:',
    'Carnet digital de socio': 'Digital membership card', 'Noticias exclusivas para socios': 'Members-only news', 'Prioridad de compra de entradas': 'Priority ticket booking',
    'Grada Main Stand reservada': 'Reserved Main Stand seat', 'Visita al Michael Callahan Training Centre': 'Visit to the Michael Callahan Training Centre',
    'Todavía no hay planes publicados.': 'No plans published yet.',
    'Esta sección aún no está activada en la base de datos.': 'This section has not been enabled in the database yet.',
    'Primero crea una cuenta o entra para hacerte socio.': 'First create an account or log in to become a member.',
    'Tu perfil en el Worthing Mariners.': 'Your Worthing Mariners profile.', 'Entra para ver tu cuenta.': 'Log in to see your account.',
    'Necesitas una cuenta para ver esta página.': 'You need an account to see this page.',
    'Aficionado': 'Supporter', 'Socio': 'Member', 'Administrador': 'Administrator', 'Carnet de socio': 'Membership card',
    'Válido hasta': 'Valid until', 'Venció el': 'Expired on', 'dto. en entradas': 'off tickets', 'entregada ✓': 'delivered ✓', 'pendiente de entrega': 'awaiting delivery',
    'Todavía no eres socio del club. Con un plan tienes entradas más baratas y regalos.': 'You are not a club member yet. With a plan you get cheaper tickets and gifts.',
    'Tu membresía venció. Con un plan tienes entradas más baratas y regalos.': 'Your membership has expired. With a plan you get cheaper tickets and gifts.',
    'Ver planes de socio': 'See membership plans', 'Tienes control total del sitio.': 'You have full control of the site.',
    '¡Bienvenido al Mariners!': 'Welcome to the Mariners!', 'Sesión iniciada': 'Logged in', 'Sesión cerrada': 'Logged out',
    'Cuenta creada: revisa tu correo para confirmarla.': 'Account created: check your email to confirm it.',

    /* acceso */
    'Crear cuenta': 'Create account', 'Crear una cuenta': 'Create an account', 'Registrarme': 'Sign up', 'Nombre': 'Name',
    'Nombre *': 'Name *', 'Correo *': 'Email *', 'Correo': 'Email', 'Contraseña *': 'Password *', 'Contraseña': 'Password',
    'Contraseña (mínimo 6 caracteres) *': 'Password (at least 6 characters) *', 'Contraseña (mínimo 6 caracteres)': 'Password (at least 6 characters)',
    'Cómo quieres que te llamemos': 'What should we call you?', '¿Aún no tienes cuenta?': 'Don’t have an account yet?', '¿Ya tienes cuenta?': 'Already have an account?',
    'Demo: administrador =': 'Demo: administrator =', 'con contraseña': 'with password',
    'La contraseña debe tener al menos 6 caracteres.': 'The password must be at least 6 characters long.',
    'Correo o contraseña incorrectos.': 'Wrong email or password.', 'Ese correo ya tiene una cuenta.': 'That email already has an account.',
    'Debes confirmar tu correo antes de entrar (revisa tu bandeja).': 'You must confirm your email before logging in (check your inbox).',
    'La contraseña es muy débil (mínimo 6 caracteres).': 'The password is too weak (at least 6 characters).',

    /* historia */
    'Historia del club': 'Club history', 'Born by the sea.': 'Born by the sea.', 'Built by the people.': 'Built by the people.',

    /* patrocinadores */
    'Las empresas que apoyan al Worthing Mariners y a su comunidad. Gracias por creer en un club de su gente.': 'The companies that support Worthing Mariners and its community. Thank you for believing in a club of the people.',
    '¿Quieres patrocinarnos?': 'Want to sponsor us?', 'Patrocinador técnico oficial': 'Official technical sponsor', 'Colaboradores': 'Partners',
    'Todavía no hay patrocinadores publicados.': 'No sponsors published yet.', 'Visitar su web →': 'Visit website →',

    /* contacto */
    'Escríbenos para colaborar con el club.': 'Write to us to collaborate with the club.',
    '¿Quieres colaborar con el Worthing Mariners, proponernos una idea o simplemente escribirnos? Déjanos un mensaje y el club te responderá. Somos un club de su gente: tu voz cuenta.': 'Want to collaborate with Worthing Mariners, suggest an idea or simply get in touch? Leave us a message and the club will reply. We are a club of the people: your voice counts.',
    'Motivo': 'Subject', 'Colaborar con el club': 'Collaborate with the club', 'Patrocinio': 'Sponsorship', 'Prensa y medios': 'Press and media',
    'Consulta general': 'General enquiry', 'Otro motivo': 'Other', 'Mensaje *': 'Message *', 'Mensaje': 'Message', 'Enviar mensaje': 'Send message',
    'Máximo 2.000 caracteres.': 'Maximum 2,000 characters.', 'No rellenes este campo': 'Leave this field empty',
    'Escribe tu nombre.': 'Please enter your name.', 'Escribe un correo válido.': 'Please enter a valid email.', 'El mensaje es muy corto.': 'The message is too short.',
    'El mensaje supera los 2.000 caracteres.': 'The message is longer than 2,000 characters.',
    'Espera un minuto antes de enviar otro mensaje.': 'Please wait a minute before sending another message.',
    'No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.': 'The message could not be sent. Please try again later.',
    '¡Gracias!': 'Thank you!', 'Hemos recibido tu mensaje.': 'We have received your message.',
    'Hemos recibido tu mensaje y el club te responderá pronto.': 'We have received your message and the club will reply soon.',

    /* galería */
    'Galería': 'Gallery', 'Fotos del Worthing Mariners: partidos, entrenamientos, jugadores y mucho más.': 'Worthing Mariners photos: matches, training, players and much more.',
    'Entrenamientos': 'Training', 'Jugadores': 'Players', 'Estadio': 'Stadium', 'Aficionados': 'Fans', 'Otros': 'Other',
    'Todavía no hay fotos en esta categoría.': 'There are no photos in this category yet.', 'Ver foto': 'View photo',
    'Foto anterior': 'Previous photo', 'Foto siguiente': 'Next photo',
    'Esta sección aún no está activada en la base de datos.': 'This section has not been enabled in the database yet.',
    /* comentarios y reacciones */
    'Me gusta': 'Like', 'Golazo': 'Great goal', 'Orgullo': 'Pride', 'Sorpresa': 'Surprise',
    'Comentarios': 'Comments', 'Escribe un comentario': 'Write a comment', 'Comparte tu opinión con otros aficionados…': 'Share your opinion with other fans…',
    'Publicar comentario': 'Post comment', 'Borrar': 'Delete', 'Borrar comentario': 'Delete comment', 'Comentario publicado': 'Comment posted', 'Comentario borrado': 'Comment deleted',
    'Entra': 'Log in', 'crea una cuenta': 'create an account', 'para comentar y reaccionar.': 'to comment and react.', 'Entra o crea una cuenta para reaccionar.': 'Log in or create an account to react.',
    'Todavía no hay comentarios. ¡Sé el primero!': 'No comments yet. Be the first!', 'Escribe algo antes de publicar.': 'Write something before posting.',
    'Espera unos segundos antes de publicar otro comentario.': 'Wait a few seconds before posting another comment.', 'Aficionado': 'Supporter',
    'Demasiados comentarios seguidos. Inténtalo más tarde.': 'Too many comments in a row. Please try again later.',
    /* errores generales */
    'No se pudo cargar esta sección.': 'This section could not be loaded.', 'No se pudo cargar Supabase: revisa tu conexión.': 'Could not load Supabase: check your connection.',
    'Ups': 'Oops', 'No encontrada': 'Not found'
  };

  /* ---------- Reglas con números o partes variables ---------- */
  const RULES = [
    [/^(\d+(?:[.,]\d+)?) % de descuento$/, (m) => m[1] + ' % off'],
    [/^tienes un (\d+) % de descuento en todas las entradas\. Los precios tachados son los normales\.$/, (m) => 'you get ' + m[1] + ' % off all tickets. Crossed-out prices are the regular ones.'],
    [/^desde (.+)$/, (m) => 'from ' + m[1]],
    [/^adulto (.+)$/, (m) => 'adult ' + m[1]],
    [/^Precios de adulto por zona \(aforo total del plano: ([\d.,]+)\)\. Los partidos de categoría alta o baja ajustan estos precios\. Las zonas punteadas son para visitantes\.$/,
      (m) => 'Adult prices per zone (total capacity on the plan: ' + m[1] + '). High- and low-demand matches adjust these prices. Dashed zones are for away fans.'],
    [/^Harbour Lane tiene capacidad para ([\d.,]+) espectadores\.$/, (m) => 'Harbour Lane holds ' + m[1] + ' spectators.'],
    [/^¡Ya eres socio (.+)!$/, (m) => 'You are now a ' + m[1] + ' member!'],
    [/^¡Gracias, (.+)!$/, (m) => 'Thank you, ' + m[1] + '!'],
    [/^No se pudo guardar: (.+)$/, (m, tr) => 'Could not save: ' + tr(m[1])],
    [/^No se pudo publicar: (.+)$/, (m, tr) => 'Could not post: ' + tr(m[1])],
    [/^Falta rellenar: (.+)\.$/, (m, tr) => 'Missing: ' + tr(m[1]) + '.'],
    [/^(\d+) h$/, (m) => m[1] + ' h']
  ];

  const state = { lang: 'es' };
  const lookup = (s) => (Object.prototype.hasOwnProperty.call(EN, s) ? EN[s] : null);

  function tr(str) {
    if (state.lang !== 'en') return str;
    const lead = (str.match(/^\s*/) || [''])[0], trail = (str.match(/\s*$/) || [''])[0];
    let core = str.slice(lead.length, str.length - trail.length);
    if (!core) return str;
    const r = translateCore(core);
    return lead + r + trail;
  }
  function translateCore(core) {
    let hit = lookup(core); if (hit != null) return hit;
    for (const [re, fn] of RULES) { const m = core.match(re); if (m) return fn(m, translateCore); }
    if (/ \*$/.test(core)) { const base = translateCore(core.slice(0, -2)); if (base !== core.slice(0, -2)) return base + ' *'; }
    for (const sep of [' · ', ', ']) {
      if (core.includes(sep)) { const parts = core.split(sep), out = parts.map(translateCore); if (out.some((p, i) => p !== parts[i])) return out.join(sep); }
    }
    return core;
  }

  /* ---------- Traducción del DOM ---------- */
  const ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];
  const origText = new WeakMap(), doneText = new WeakMap(), origAttr = new WeakMap(), doneAttr = new WeakMap();
  const SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, CODE: 1 };

  function doText(node) {
    const p = node.parentElement; if (!p || SKIP[p.tagName] || p.closest('[data-notr]')) return;
    if (doneText.has(node) && doneText.get(node) !== node.nodeValue) origText.set(node, node.nodeValue); // lo cambió la app
    else if (!origText.has(node)) origText.set(node, node.nodeValue);
    const want = state.lang === 'en' ? tr(origText.get(node)) : origText.get(node);
    if (node.nodeValue !== want) node.nodeValue = want;
    doneText.set(node, node.nodeValue);
  }
  function doEl(el) {
    if (el.closest && el.closest('[data-notr]')) return;
    for (const a of ATTRS) {
      if (!el.hasAttribute(a)) continue;
      let o = origAttr.get(el); if (!o) { o = {}; origAttr.set(el, o); }
      let d = doneAttr.get(el); if (!d) { d = {}; doneAttr.set(el, d); }
      const cur = el.getAttribute(a);
      if (a in d && d[a] !== cur) o[a] = cur; else if (!(a in o)) o[a] = cur;
      const want = state.lang === 'en' ? tr(o[a]) : o[a];
      if (cur !== want) el.setAttribute(a, want);
      d[a] = want;
    }
  }
  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { doText(root); return; }
    if (root.nodeType !== 1) return;
    doEl(root);
    root.querySelectorAll('[placeholder],[aria-label],[title],[alt]').forEach(doEl);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
    while ((n = w.nextNode())) doText(n);
  }

  let queue = new Set(), scheduled = false;
  const collect = (muts) => {
    for (const m of muts) {
      if (m.type === 'childList') m.addedNodes.forEach(n => queue.add(n));
      else queue.add(m.target);
    }
  };
  const obs = new MutationObserver((muts) => {
    collect(muts);
    if (!scheduled) { scheduled = true; Promise.resolve().then(flush); }
  });
  function flush() {
    scheduled = false;
    collect(obs.takeRecords()); // disconnect() descarta los cambios pendientes: se recogen antes
    const items = [...queue]; queue = new Set();
    obs.disconnect();
    try { items.forEach(walk); } finally { start(); }
  }
  function start() { obs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS }); }

  /* ---------- Idioma y tema ---------- */
  const listeners = [];
  function paintButtons() {
    const lb = document.getElementById('langBtn'), tb = document.getElementById('themeBtn');
    if (lb) { lb.textContent = state.lang === 'en' ? 'ES' : 'EN'; lb.setAttribute('aria-label', state.lang === 'en' ? 'Cambiar a español' : 'Switch to English'); lb.setAttribute('data-notr', ''); }
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (tb) { tb.textContent = dark ? '☀' : '☾'; tb.setAttribute('aria-label', state.lang === 'en' ? (dark ? 'Switch to light mode' : 'Switch to dark mode') : (dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro')); tb.setAttribute('data-notr', ''); }
  }
  function setLang(l, silent) {
    state.lang = l === 'en' ? 'en' : 'es';
    document.documentElement.lang = state.lang;
    store.set('lang', state.lang);
    paintButtons();
    if (!silent) listeners.forEach(f => f(state.lang));
    obs.disconnect(); walk(document.body); start();
  }
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    store.set('theme', t);
    const m = document.querySelector('meta[name=theme-color]'); if (m) m.setAttribute('content', t === 'dark' ? '#06142e' : '#0a1f44');
    paintButtons();
  }

  const API = {
    lang: () => state.lang,
    locale: () => (state.lang === 'en' ? 'en-GB' : 'es-ES'),
    t: tr,
    onChange: (f) => listeners.push(f),
    toggleLang: () => setLang(state.lang === 'en' ? 'es' : 'en'),
    toggleTheme: () => setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'),
    refresh: () => { obs.disconnect(); walk(document.body); start(); }
  };
  window.I18N = API;

  /* Tema inicial: el guardado, o el del sistema */
  (function initTheme() {
    let t = store.get('theme');
    if (t !== 'dark' && t !== 'light') t = (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', t);
  })();

  /* Idioma inicial: el guardado, o el del navegador. Se fija ya, antes de que app.js dibuje. */
  (function initLang() {
    let l = store.get('lang');
    if (l !== 'en' && l !== 'es') l = ((navigator.language || 'es').toLowerCase().startsWith('es')) ? 'es' : 'en';
    state.lang = l;
    document.documentElement.lang = l;
  })();

  function init() {
    const l = state.lang;
    document.addEventListener('click', (e) => {
      if (e.target.closest('#themeBtn')) API.toggleTheme();
      else if (e.target.closest('#langBtn')) API.toggleLang();
    });
    paintButtons();
    start();
    setLang(l, true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
