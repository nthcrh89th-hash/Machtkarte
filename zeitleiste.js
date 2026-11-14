// Zeitleiste: mountZeitleiste(container, chronologie, daten, { beiFigur }) baut die Chronologie auf.
// Inhalte: chronologie.js (Stationen), daten.js (Figuren). Aussehen: zeitleiste.css + themes.css.
import { el, svgEl, geruest, zeigeImBild, stufe, abschnitt, punktwert, uebersicht, escSetztZurueck } from './ansicht.js';

const B = 1000, H = 600;               // Zeichenmaß der Bühne
const LINKS = 120, RECHTS = 920, OBEN = 40, UNTEN = 520;
const STUFEN = 5;                      // Spielraum 0–5 → 5 Bänder, passend zu den Ebenen der Machtkarte

const x = (i, n) => LINKS + (i * (RECHTS - LINKS)) / Math.max(1, n - 1);
const y = (spielraum) => UNTEN - (spielraum / STUFEN) * (UNTEN - OBEN);

/** Wirft einen Fehler mit allen Unstimmigkeiten (auch in den Tests genutzt). */
export function pruefeChronologie(c, daten) {
  const figuren = new Set(daten.knoten.map((k) => k.id));
  const ids = new Set();
  const fehler = [];
  c.stationen.forEach((s) => {
    if (ids.has(s.id)) fehler.push(`Station ${s.id}: doppelte id`);
    ids.add(s.id);
    if (!(s.spielraum >= 0 && s.spielraum <= STUFEN)) fehler.push(`Station ${s.id}: Spielraum muss 0–${STUFEN} sein`);
    s.figuren.forEach((f) => { if (!figuren.has(f)) fehler.push(`Station ${s.id}: unbekannte Figur "${f}"`); });
  });
  if (fehler.length) throw new Error('Chronologie fehlerhaft:\n' + fehler.join('\n'));
}

/** Hintergrund: Spielraum-Bänder, Achsenbeschriftung, Verlaufslinie. */
function kulisse(stationen) {
  const n = stationen.length, teile = [];
  for (let i = 0; i < STUFEN; i++) {
    // Band i von oben; --s wie bei den Pyramidenstufen
    teile.push(svgEl('rect', { class: 'mk-k-ebene', 'data-alt': i % 2, style: stufe(i, STUFEN),
      x: LINKS - 70, y: OBEN + (i * (UNTEN - OBEN)) / STUFEN, width: RECHTS - LINKS + 140, height: (UNTEN - OBEN) / STUFEN }));
  }
  teile.push(svgEl('text', { class: 'zl-achse', x: LINKS - 60, y: OBEN - 12 }, 'Spielraum groß'));
  teile.push(svgEl('text', { class: 'zl-achse', x: LINKS - 60, y: UNTEN + 26 }, 'ohnmächtig'));
  const punkte = stationen.map((s, i) => `${x(i, n)},${y(s.spielraum)}`);
  teile.push(svgEl('polygon', { class: 'zl-flaeche', points: `${x(0, n)},${UNTEN} ${punkte.join(' ')} ${x(n - 1, n)},${UNTEN}` }));
  teile.push(svgEl('polyline', { class: 'zl-linie', points: punkte.join(' ') }));
  return teile;
}

export function mountZeitleiste(container, chronologie, daten, { beiFigur } = {}) {
  pruefeChronologie(chronologie, daten);
  const figurVon = new Map(daten.knoten.map((k) => [k.id, k]));
  const n = chronologie.stationen.length;

  container.classList.add('zl');
  const { svg, buehne, scroller, detail } = geruest(container, { titel: chronologie.titel, breite: B, hoehe: H });
  svg.append(...kulisse(chronologie.stationen));

  const knoepfe = chronologie.stationen.map((s, i) => {
    const b = el('button', 'zl-station');
    b.type = 'button';
    b.dataset.lage = i % 2 ? 'unten' : 'oben'; // Beschriftung abwechselnd über/unter dem Punkt
    b.style.left = `${(x(i, n) / B) * 100}%`;
    b.style.top = `${(y(s.spielraum) / H) * 100}%`;
    b.append(el('span', 'zl-nummer', String(i + 1)), el('span', 'zl-titel', s.titel));
    b.addEventListener('click', () => waehle(state.auswahl === s.id ? null : s.id));
    buehne.append(b);
    return [s.id, b];
  });

  const state = { auswahl: null };

  function zeigeDetail() {
    detail.replaceChildren();
    const i = chronologie.stationen.findIndex((s) => s.id === state.auswahl);
    if (i < 0) return uebersicht(detail, chronologie);
    const s = chronologie.stationen[i];
    detail.append(
      el('p', 'mk-detail-meta', `Station ${i + 1} von ${n} · Kapitel „${s.kapitel}“`),
      el('h2', 'mk-detail-titel', s.titel),
      punktwert('Spielraum', s.spielraum),
      abschnitt('K.s Versuch', s.versuch, 'roman'),
      abschnitt('Scheitern', s.scheitern, 'roman'),
      abschnitt('Deutung', s.deutung, 'deutung'),
      el('h3', 'mk-abschnitt-titel', 'Beteiligte Figuren'),
    );
    const liste = el('div', 'zl-figuren');
    s.figuren.forEach((id) => {
      const b = el('button', 'zl-figur', figurVon.get(id).label);
      b.type = 'button';
      b.disabled = !beiFigur;
      b.addEventListener('click', () => beiFigur(id));
      liste.append(b);
    });
    detail.append(liste);
    // Vor/zurück durch die Stationen
    const nav = el('div', 'zl-blaettern');
    [[i - 1, '← zurück'], [i + 1, 'weiter →']].forEach(([j, text]) => {
      const b = el('button', 'zl-figur', text);
      b.type = 'button';
      b.disabled = j < 0 || j >= n;
      b.addEventListener('click', () => waehle(chronologie.stationen[j].id));
      nav.append(b);
    });
    detail.append(nav);
  }

  function waehle(id) {
    state.auswahl = id;
    container.classList.toggle('hat-auswahl', !!id);
    knoepfe.forEach(([sid, b]) => {
      b.classList.toggle('ist-aktiv', sid === id);
      b.setAttribute('aria-pressed', String(sid === id));
    });
    zeigeDetail();
    if (id) zeigeImBild(scroller, knoepfe.find(([sid]) => sid === id)[1]);
  }

  const escAbmelden = escSetztZurueck(() => waehle(null));
  waehle(null);

  return {
    waehle,
    /** Räumt Listener und DOM auf. */
    entfernen() {
      escAbmelden();
      container.replaceChildren();
      container.classList.remove('mk', 'zl', 'hat-auswahl');
    },
  };
}
