// Einstiegspunkt: mountMachtkarte(container, daten) baut die Karte auf.
// Zuständig für Knoten, Auswahl und Detailfeld. Anordnung: pyramide.js. Aussehen: CSS.
import { zeichneKanten } from './kanten.js';
import { berechnePyramide, B, H } from './pyramide.js';
import { el, svgEl, geruest, zeigeImBild, abschnitt, punktwert, uebersicht, escSetztZurueck } from './ansicht.js';

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

export function mountMachtkarte(container, daten) {
  pruefe(daten);
  const knotenVon = new Map(daten.knoten.map((k) => [k.id, k]));
  const ebeneIndex = new Map(daten.ebenen.map((e, i) => [e.id, i]));

  // --- Aufbau ---
  const { svg, buehne, scroller, detail } = geruest(container, { titel: daten.titel, breite: B, hoehe: H });
  const { pos, kulisse, titel } = berechnePyramide(daten);
  // Reihenfolge im SVG: Kulisse, Linien, Ebenentitel (Titel liegen über den Linien)
  const gKulisse = svgEl('g'), gKanten = svgEl('g'), gTitel = svgEl('g');
  gKulisse.append(...kulisse);
  gTitel.append(...titel);
  svg.append(gKulisse, gKanten, gTitel);

  const knotenEls = new Map();
  daten.knoten.forEach((k) => {
    const b = el('button', 'mk-knoten', k.label);
    b.type = 'button';
    b.dataset.typ = k.typ;
    b.style.left = `${(pos[k.id].x / B) * 100}%`;
    b.style.top = `${(pos[k.id].y / H) * 100}%`;
    b.style.maxWidth = `${(pos[k.id].breite / B) * 100}cqw`; // enge Pyramidenstufen begrenzen die Knotenbreite
    b.addEventListener('click', () => waehle(state.auswahl === k.id ? null : k.id));
    knotenEls.set(k.id, b);
    buehne.append(b);
  });

  // --- Zustand ---
  const state = { auswahl: null, kanten: [], gezeigt: false };

  function zeichneLinien() {
    if (!buehne.offsetWidth) return; // ausgeblendet: ResizeObserver zeichnet beim Einblenden
    const f = B / buehne.offsetWidth; // Pixel → Zeichenmaß
    const groesse = new Map([...knotenEls].map(([id, e]) => [id, [e.offsetWidth * f, e.offsetHeight * f]]));
    state.kanten = zeichneKanten(gKanten, pos, groesse, daten.beziehungen);
    aktualisiere();
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
    if (id) zeigeImBild(scroller, knotenEls.get(id));
  }

  // Esc hebt die Auswahl auf; Größenänderung zeichnet nur die Linien neu.
  const escAbmelden = escSetztZurueck(() => waehle(null));
  const beobachter = new ResizeObserver(() => {
    zeichneLinien();
    // Beim ersten Einblenden auf schmalen Bildschirmen mittig starten (außer eine Figur wurde schon gewählt).
    if (!state.gezeigt && buehne.offsetWidth) {
      state.gezeigt = true;
      if (!state.auswahl) scroller.scrollLeft = (scroller.scrollWidth - scroller.clientWidth) / 2;
    }
  });
  beobachter.observe(buehne);
  aktualisiere();

  return {
    waehle,
    /** Räumt Listener und DOM auf (z. B. beim Seitenwechsel). */
    entfernen() {
      escAbmelden();
      beobachter.disconnect();
      container.replaceChildren();
      container.classList.remove('mk', 'hat-auswahl');
    },
  };
}
