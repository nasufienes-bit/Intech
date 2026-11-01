// Intech Sanitär: Menü, Erscheinen beim Scrollen, Animationen und Formular.
(function(){
  var $ = function(s, w){ return (w || document).querySelector(s); };
  var $$ = function(s, w){ return [].slice.call((w || document).querySelectorAll(s)); };
  var ruhig = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Navigation
  var nav = $('.nav');
  var rand = function(){ if (nav) nav.classList.toggle('unten', scrollY > 10); };
  addEventListener('scroll', rand, { passive: true }); rand();
  var burger = $('.nav-burger');
  if (burger) {
    burger.addEventListener('click', function(){
      var offen = document.body.classList.toggle('menu-offen');
      burger.setAttribute('aria-expanded', offen);
    });
    $$('.menu a').forEach(function(a){ a.addEventListener('click', function(){ document.body.classList.remove('menu-offen'); }); });
  }

  // Erscheinen beim Scrollen; Szenen starten, wenn sie in den Blick kommen
  var sichtbar = function(el, fn, schwelle){
    if (!('IntersectionObserver' in window)) return fn();
    var o = new IntersectionObserver(function(es){ if (es[0].isIntersecting) { o.disconnect(); fn(); } }, { threshold: schwelle || 0, rootMargin: '0px 0px -8% 0px' });
    o.observe(el);
  };
  $$('.zeig, .rahmen, .nb').forEach(function(el){ sichtbar(el, function(){ el.classList.add('da'); }, .15); });

  // Kesselsanierung: alter Ölkessel geht, Wärmepumpe kommt
  $$('.ks').forEach(function(s){
    var knopf = $('[data-ks]', s.closest('.szene'));
    var setze = function(n){ s.classList.toggle('nachher', n); if (knopf) knopf.textContent = n ? 'Nochmals ansehen' : 'Kessel ersetzen'; };
    sichtbar(s, function(){ setTimeout(function(){ setze(true); }, ruhig ? 0 : 1600); }, .4);
    if (knopf) knopf.addEventListener('click', function(){
      if (s.classList.contains('nachher')) { setze(false); setTimeout(function(){ setze(true); }, 1600); } else setze(true);
    });
  });

  // Vorher und Nachher: Schieber ziehen; beim ersten Sichtkontakt kurz zeigen, wie es geht
  $$('.vn').forEach(function(v){
    var r = $('input', v);
    var setze = function(p){ v.style.setProperty('--pos', p + '%'); r.value = p; };
    r.addEventListener('input', function(){ setze(r.value); });
    if (!ruhig) sichtbar(v, function(){
      var t0 = performance.now();
      (function tick(t){
        var p = Math.min(1, (t - t0) / 2200);
        setze(50 + Math.sin(p * Math.PI * 2) * 22 * (1 - p));
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }, .5);
  });

  // Zahlen zählen hoch
  $$('[data-zahl]').forEach(function(el){
    var ziel = +el.getAttribute('data-zahl'), nach = el.getAttribute('data-nach') || '';
    sichtbar(el, function(){
      if (ruhig) { el.textContent = ziel + nach; return; }
      var t0 = performance.now();
      (function tick(t){ var p = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(ziel * (1 - Math.pow(1 - p, 3))) + nach; if (p < 1) requestAnimationFrame(tick); })(t0);
    }, .6);
  });

  // Formular: prüfen und per E-Mail an Intech senden
  var ZIEL = 'https://formsubmit.co/ajax/info@intech-sanitaer.ch';
  // Zusätzlich in den Admin-Bereich: Besucher dürfen dort nur eintragen, nicht lesen
  var SB = window.INTECH_SB || {};
  var imAdmin = function(nr, d){
    if (!SB.url || /PLATZHALTER/.test(SB.url)) return Promise.resolve(false);
    return fetch(SB.url + '/rest/v1/anfragen', { method: 'POST', headers: { apikey: SB.schluessel, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({ art: 'Anfrage: ' + (d.Anliegen || 'Website'), nummer: nr, name: d.Name || '', email: d['E-Mail'] || '', telefon: d.Telefon || '', daten: d }) })
      .then(function(r){ return r.ok; }).catch(function(){ return false; });
  };
  var nummer = function(){ var x = new Date(), z = function(n){ return ('0' + n).slice(-2); }; return 'IN-' + String(x.getFullYear()).slice(2) + z(x.getMonth() + 1) + z(x.getDate()) + '-' + (100 + Math.floor(Math.random() * 900)); };
  $$('form[data-form]').forEach(function(form){
    var inhalt = $('[data-form-inhalt]', form);
    var gewaehlt = function(n){ var e = form.querySelector('[name="' + n + '"]:checked'); return e ? e.value : ''; };
    function angaben(){
      var d = {}, gesehen = {};
      [].forEach.call(form.elements, function(e){
        if (!e.name || e.name.charAt(0) === '_' || gesehen[e.name]) return;
        gesehen[e.name] = 1;
        var v = e.type === 'radio' ? gewaehlt(e.name) : String(e.value).trim();
        if (v) d[e.name] = v;
      });
      return d;
    }
    function pruefen(){
      var erstes = null;
      $$('[data-pflicht]', form).forEach(function(f){
        var inp = $('input,textarea', f), gut;
        if (f.tagName === 'FIELDSET') gut = !!$('input:checked', f);
        else if (f.hasAttribute('data-email')) gut = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim());
        else gut = inp.value.trim().length > 1;
        f.classList.toggle('fehlt', !gut);
        if (!gut && !erstes) erstes = f;
      });
      $('.meldung', form).textContent = erstes ? 'Bitte füllen Sie die rot markierten Angaben noch aus.' : '';
      if (erstes) erstes.scrollIntoView({ behavior: ruhig ? 'auto' : 'smooth', block: 'center' });
      return !erstes;
    }
    function ende(ok){
      inhalt.hidden = true;
      $(ok ? '[data-fertig]' : '[data-fehler]', form).hidden = false;
      form.scrollIntoView({ behavior: ruhig ? 'auto' : 'smooth', block: 'start' });
    }
    form.addEventListener('input', function(e){ var f = e.target.closest('.fehlt'); if (f) f.classList.remove('fehlt'); });
    form.addEventListener('change', function(e){ var f = e.target.closest('.fehlt'); if (f) f.classList.remove('fehlt'); });
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if (!pruefen()) return;
      var d = angaben();
      if (form.elements._honey && form.elements._honey.value) return ende(true);
      var text = Object.keys(d).map(function(k){ return k + ': ' + d[k]; }).join('\n');
      $('[data-mail]', form).href = 'mailto:info@intech-sanitaer.ch?subject=' + encodeURIComponent('Anfrage ' + (d.Anliegen || '')) + '&body=' + encodeURIComponent(text);
      var knopf = $('[type=submit]', form);
      knopf.classList.add('senden-laeuft');
      var nr = nummer();
      var last = Object.assign({ _subject: 'Anfrage ' + nr + ': ' + (d.Anliegen || '') + (d.Name ? ', ' + d.Name : ''), _template: 'table', _replyto: d['E-Mail'] || '', Nummer: nr }, d);
      var perMail = fetch(ZIEL, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(last) })
        .then(function(r){ return r.json(); })
        .then(function(a){ return String(a && a.success) === 'true'; })
        .catch(function(){ return false; });
      // Angekommen ist die Anfrage, wenn sie per E-Mail oder im Admin-Bereich gelandet ist
      Promise.all([perMail, imAdmin(nr, d)])
        .then(function(e){ ende(e[0] || e[1]); })
        .then(function(){ knopf.classList.remove('senden-laeuft'); });
    });
    // Vorwahl über die Adresse, zum Beispiel /kontakt/?anliegen=Umbau
    var vor = new URLSearchParams(location.search).get('anliegen');
    if (vor) { var r = form.querySelector('[name="Anliegen"][value="' + vor + '"]'); if (r) r.checked = true; }
  });
})();
