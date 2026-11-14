// Einstiegspunkt: mountMachtkarte(container, daten, { layout }) baut die Karte auf.
// Zuständig für DOM, Auswahl und Detailfeld. Anordnung: layouts/. Aussehen: CSS.
import { zeichneKanten } from './kanten.js';
import layouts from './layouts/index.js';
import { B, H } from './layouts/gemeinsam.js';
import { el, svgEl, abschnitt, punktwert, uebersicht, escSetztZurueck } from './ansicht.js';

/** Wirft einen Fehler mit allen Unstimmigkeiten in den Daten (auch in den Tests genutzt). */
export function pruefe(d) {
  const fehler = [];
  const ebenen = new Set(d.ebenen.map((e) => e.id));
  const knoten = new Set(d.knoten.map((k) => k.id));
  d.knoten.forEach((k) => {
    if (!ebenen.has(k.ebene)) fehler.push(`Knoten ${k.id}: unbekannte Ebene "${k.ebene}"`);
    if (!d.typen[k.typ]) fehler.push(`Knoten ${k.id}: unbekannter Typ "${k.typ}"`);
    if (k.machtgrad !== undefined && !(k.machtgrad >= 0 && k.machtgrad <= 5)) fehler.push(`Knoten ${k.id}: Machtgrad muss 0–5 sein`);
  });
  d.beziehungen.forEach((b) => {
    if (!knoten.has(b.von) || !knoten.has(b.nach)) fehler.push(`Beziehung ${b.von}→${b.nach}: unbekannter Knoten`);
    if (!d.arten[b.art]) fehler.push(`Beziehung ${b.von}→${b.nach}: unbekannte Art "${b.art}"`);
  });
  if (fehler.length) throw new Error('Machtkarte-Daten fehlerhaft:\n' + fehler.join('\n'));
}

export function mountMachtkarte(container, daten, { layout = 'pyramide' } = {}) {
  pruefe(daten);
  const knotenVon = new Map(daten.knoten.map((k) => [k.id, k]));
  const ebeneIndex = new Map(daten.ebenen.map((e, i) => [e.id, i]));

  // --- Aufbau ---
  container.classList.add('mk');
  container.replaceChildren();
  const rahmen = el('div', 'mk-rahmen');
  const buehne = el('div', 'mk-buehne');
  const svg = svgEl('svg', { class: 'mk-svg', viewBox: `0 0 ${B} ${H}`, 'aria-hidden': 'true' });
  const gKulisse = svgEl('g'), gKanten = svgEl('g');
  svg.append(gKulisse, gKanten);
  buehne.append(svg);

  // „Macht“ eines Knotens = Anteil seiner ausgehenden Beziehungen (0–1); Layouts/CSS dürfen es nutzen.
  const aus = new Map();
  daten.beziehungen.forEach((b) => aus.set(b.von, (aus.get(b.von) || 0) + 1));
  const maxAus = Math.max(1, ...aus.values());

  const knotenEls = new Map();
  daten.knoten.forEach((k) => {
    const b = el('button', 'mk-knoten', k.label);
    b.type = 'button';
    b.dataset.typ = k.typ;
    b.style.setProperty('--macht', (aus.get(k.id) || 0) / maxAus);
    b.addEventListener('click', () => waehle(state.auswahl === k.id ? null : k.id));
    knotenEls.set(k.id, b);
    buehne.append(b);
  });

  const detail = el('aside', 'mk-detail');
  detail.setAttribute('aria-live', 'polite');
  rahmen.append(buehne, el('p', 'mk-bildunterschrift', daten.titel));
  container.append(rahmen, detail);

  // --- Zustand ---
  const state = { auswahl: null, layout: null, pos: {}, kanten: [] };

  function zeichneLinien() {
    if (!buehne.offsetWidth) return; // ausgeblendet: ResizeObserver zeichnet beim Einblenden
    const f = B / buehne.offsetWidth; // Pixel → Zeichenmaß
    const groesse = new Map([...knotenEls].map(([id, e]) => [id, [e.offsetWidth * f, e.offsetHeight * f]]));
    state.kanten = zeichneKanten(gKanten, state.pos, groesse, daten.beziehungen);
    aktualisiere();
  }

  function setzeLayout(name) {
    if (!layouts[name]) throw new Error(`Unbekanntes Layout "${name}"`);
    state.layout = name;
    container.dataset.layout = name;
    const { pos, kulisse } = layouts[name].berechne(daten);
    state.pos = pos;
    gKulisse.replaceChildren(...kulisse.map((f) => svgEl(f.tag, f.attrs, f.text)));
    knotenEls.forEach((e, id) => {
      e.style.left = `${(pos[id].x / B) * 100}%`;
      e.style.top = `${(pos[id].y / H) * 100}%`;
      // Optional: Layout begrenzt die Knotenbreite (in Zeichenmaß), z. B. in engen Pyramidenstufen.
      e.style.maxWidth = pos[id].breite ? `min(20cqw, ${(pos[id].breite / B) * 100}cqw)` : '';
    });
    zeichneLinien();
  }

  function verbunden(id) {
    const ids = new Set([id]);
    daten.beziehungen.forEach((b) => {
      if (b.von === id) ids.add(b.nach);
      if (b.nach === id) ids.add(b.von);
    });
    return ids;
  }

  function aktualisiere() {
    const id = state.auswahl;
    const nahe = id ? verbunden(id) : null;
    container.classList.toggle('hat-auswahl', !!id);
    knotenEls.forEach((e, kid) => {
      e.classList.toggle('ist-aktiv', kid === id);
      e.classList.toggle('ist-nah', !!nahe && nahe.has(kid) && kid !== id);
      e.setAttribute('aria-pressed', String(kid === id));
    });
    state.kanten.forEach(({ beziehung: b, el: e }) => {
      e.classList.toggle('ist-aktiv', !!id && (b.von === id || b.nach === id));
    });
    zeigeDetail();
  }

  function zeigeDetail() {
    detail.replaceChildren();
    const k = state.auswahl && knotenVon.get(state.auswahl);
    if (!k) return uebersicht(detail, daten);

    detail.append(
      el('p', 'mk-detail-meta', `${daten.typen[k.typ]} · ${daten.ebenen[ebeneIndex.get(k.ebene)].label}`),
      el('h2', 'mk-detail-titel', k.label),
    );
    if (k.machtgrad !== undefined) detail.append(punktwert('Machtgrad', k.machtgrad));
    if (k.quellen) detail.append(abschnitt('Machtquellen', k.quellen));
    if (k.handeln) detail.append(abschnitt('Im Roman', k.handeln, 'roman'));
    if (k.deutung) detail.append(abschnitt('Deutung', k.deutung, 'deutung'));
    if (k.text) detail.append(el('p', 'mk-text', k.text));
    if (!k.quellen && !k.handeln && !k.deutung && !k.text) detail.append(el('p', 'mk-hinweis', 'Noch kein Text.'));

    const liste = el('ul', 'mk-beziehungen');
    daten.beziehungen.forEach((b) => {
      if (b.von !== k.id && b.nach !== k.id) return;
      const ausgehend = b.von === k.id;
      const andere = knotenVon.get(ausgehend ? b.nach : b.von).label;
      const li = el('li', null, `${ausgehend ? '→' : '←'} ${andere} (${daten.arten[b.art]})`);
      if (b.text) li.append(el('span', 'mk-text', ' – ' + b.text));
      liste.append(li);
    });
    if (liste.children.length) detail.append(el('h3', 'mk-abschnitt-titel', 'Beziehungen'), liste);
  }

  function waehle(id) {
    state.auswahl = id;
    aktualisiere();
  }

  // Esc hebt die Auswahl auf; Größenänderung zeichnet nur die Linien neu.
  const escAbmelden = escSetztZurueck(() => waehle(null));
  const beobachter = new ResizeObserver(() => { if (state.layout) zeichneLinien(); });
  beobachter.observe(buehne);
  setzeLayout(layout);
  // Auf schmalen Bildschirmen ist die Karte seitlich wischbar: mittig starten.
  rahmen.scrollLeft = (rahmen.scrollWidth - rahmen.clientWidth) / 2;

  return {
    waehle,
    setzeLayout,
    /** Räumt Listener und DOM auf (z. B. beim Seitenwechsel). */
    entfernen() {
      escAbmelden();
      beobachter.disconnect();
      container.replaceChildren();
      container.classList.remove('mk', 'hat-auswahl');
      delete container.dataset.layout;
    },
  };
}
