// Anordnung der Machtkarte: stumpfe Pyramide, oberste Ebene oben.
// Berechnet NUR Positionen und Kulisse (SVG-Elemente); Zustand und DOM der Karte liegen in machtkarte.js.
import { svgEl, stufe } from './ansicht.js';

export const B = 1000; // Breite der Bühne in Zeichenmaß
export const H = 900;  // Höhe der Bühne in Zeichenmaß

const MIN_ZELLE = 110; // schmaler als das → Knoten der Stufe versetzt in zwei Reihen
const OBEN = 30, UNTEN = H - 30, HALB = 470, KOPF = 110;
// Stumpfe Pyramide: oben „kopf“ breit (halbe Breite), damit auch obere Stufen Platz für Namen haben.
const breite = (y) => 2 * (KOPF + ((HALB - KOPF) * (y - OBEN)) / (UNTEN - OBEN));

/** Mitte der i-ten von n gleich breiten Zellen zwischen von und bis. */
const mitte = (i, n, von, bis) => von + ((i + 0.5) / n) * (bis - von);

/**
 * Liefert { pos, kulisse, titel }: pos[id] = { x, y, breite } in Zeichenmaß,
 * kulisse = Stufen und Linien, titel = Ebenentitel (werden nach den Kanten gezeichnet).
 */
export function berechnePyramide(d) {
  const n = d.ebenen.length, h = (UNTEN - OBEN) / n;
  const pos = {}, kulisse = [], titel = [];
  kulisse.push(svgEl('polygon', { class: 'mk-k-flaeche', points: `${B / 2 - KOPF},${OBEN} ${B / 2 + KOPF},${OBEN} ${B / 2 + HALB},${UNTEN} ${B / 2 - HALB},${UNTEN}` }));
  d.ebenen.forEach((e, i) => {
    const ks = d.knoten.filter((k) => k.ebene === e.id);
    const y0 = OBEN + i * h, y1 = y0 + h, w0 = breite(y0) / 2, w1 = breite(y1) / 2;
    kulisse.push(svgEl('polygon', { class: 'mk-k-ebene', 'data-alt': i % 2, style: stufe(i, n), points: `${B / 2 - w0},${y0} ${B / 2 + w0},${y0} ${B / 2 + w1},${y1} ${B / 2 - w1},${y1}` }));
    kulisse.push(svgEl('line', { class: 'mk-k-linie', x1: B / 2 - w1, x2: B / 2 + w1, y1, y2: y1 }));
    const ty = y0 + h * 0.22, style = stufe(i, n);
    titel.push(svgEl('text', { class: 'mk-ebene-titel', x: B / 2, y: ty, 'text-anchor': 'middle', style }, e.label));
    if (e.untertitel) titel.push(svgEl('text', { class: 'mk-ebene-untertitel', x: B / 2, y: ty + 20, 'text-anchor': 'middle', style }, e.untertitel));
    const y = y0 + h * 0.7, w = breite(y) * 0.92;
    const zelle = w / ks.length, versetzt = ks.length > 2 && zelle < MIN_ZELLE;
    ks.forEach((k, j) => {
      // Versetzt: abwechselnd höher/tiefer, dafür darf jeder Knoten doppelt so breit werden.
      const dy = versetzt ? (j % 2 ? 0.17 : -0.13) * h : 0;
      pos[k.id] = { x: mitte(j, ks.length, B / 2 - w / 2, B / 2 + w / 2), y: y + dy, breite: zelle * (versetzt ? 1.9 : 0.95) };
    });
  });
  return { pos, kulisse, titel };
}
