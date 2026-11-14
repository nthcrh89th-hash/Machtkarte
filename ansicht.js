// Gemeinsame Bausteine für Machtkarte und Zeitleiste: DOM-Hilfen und Teile des Detailfelds.
// Kennt keine Inhalte und keine Anordnung.
const NS = 'http://www.w3.org/2000/svg';

export function el(tag, klasse, text) {
  const e = document.createElement(tag);
  if (klasse) e.className = klasse;
  if (text !== undefined) e.textContent = text;
  return e;
}

export function svgEl(tag, attrs = {}, text) {
  const e = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  if (text !== undefined) e.textContent = text;
  return e;
}

/** Abschnitt im Detailfeld: Überschrift + Text; marke "deutung" setzt ihn sichtbar als Interpretation ab. */
export function abschnitt(titel, text, marke) {
  const s = el('section', 'mk-abschnitt');
  if (marke) s.dataset.marke = marke;
  s.append(el('h3', 'mk-abschnitt-titel', titel), el('p', 'mk-text', text));
  return s;
}

/** Wert 0–5 als Punktreihe mit Zahl (für Screenreader als Text). */
export function punktwert(label, wert) {
  const p = el('p', 'mk-machtgrad');
  p.append(el('span', 'mk-machtgrad-label', label));
  const punkte = el('span', 'mk-punkte');
  punkte.setAttribute('aria-hidden', 'true');
  for (let i = 1; i <= 5; i++) punkte.append(el('span', i <= wert ? 'mk-punkt ist-voll' : 'mk-punkt'));
  p.append(punkte, el('span', 'mk-machtgrad-zahl', `${wert} / 5`));
  return p;
}

/** Übersicht im Detailfeld, solange nichts ausgewählt ist. */
export function uebersicht(ziel, { titel, untertitel, einleitung = [], legende = [] }) {
  ziel.append(el('h2', 'mk-detail-titel', titel), el('p', 'mk-hinweis', untertitel));
  einleitung.forEach((t) => ziel.append(el('p', 'mk-text', t)));
  if (legende.length) {
    const l = el('ul', 'mk-legende');
    legende.forEach((t) => l.append(el('li', null, t)));
    ziel.append(l);
  }
}

/** Setzt die Auswahl per Esc zurück; gibt eine Funktion zum Abmelden zurück. */
export function escSetztZurueck(zuruecksetzen) {
  const beiTaste = (e) => { if (e.key === 'Escape') zuruecksetzen(); };
  document.addEventListener('keydown', beiTaste);
  return () => document.removeEventListener('keydown', beiTaste);
}
