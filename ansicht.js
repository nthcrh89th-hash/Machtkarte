// Gemeinsame Bausteine für Machtkarte und Zeitleiste: DOM-Hilfen, Gerüst der Ansicht und Teile des Detailfelds.
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

/** Stufenposition als Zahl 0 (oben) bis 1 (unten); Stile nutzen sie für Farbverläufe (--s). */
export const stufe = (i, n) => `--s:${n > 1 ? i / (n - 1) : 0}`;

/**
 * Gerüst beider Ansichten: Rahmen mit seitlich wischbarer Bühne (SVG), Wischhinweis, Bildunterschrift
 * (außerhalb des Scrollbereichs) und Detailfeld. Die Bühne hat die Proportion breite : hoehe.
 */
export function geruest(container, { titel, breite, hoehe }) {
  container.classList.add('mk');
  container.replaceChildren();
  const svg = svgEl('svg', { class: 'mk-svg', viewBox: `0 0 ${breite} ${hoehe}`, 'aria-hidden': 'true' });
  const buehne = el('div', 'mk-buehne');
  buehne.style.aspectRatio = `${breite} / ${hoehe}`;
  buehne.append(svg);
  const scroller = el('div', 'mk-scroller');
  scroller.append(buehne);
  const rahmen = el('div', 'mk-rahmen');
  rahmen.append(scroller, el('p', 'mk-wischhinweis', '← seitlich wischen →'), el('p', 'mk-bildunterschrift', titel));
  const detail = el('aside', 'mk-detail');
  detail.setAttribute('aria-live', 'polite');
  container.append(rahmen, detail);
  return { svg, buehne, scroller, detail };
}

/** Scrollt den Scroll-Container horizontal so, dass das Element in der Mitte des Sichtbereichs liegt. */
export function zeigeImBild(scroller, element) {
  const e = element.getBoundingClientRect(), s = scroller.getBoundingClientRect();
  scroller.scrollLeft += e.left + e.width / 2 - (s.left + s.width / 2);
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
