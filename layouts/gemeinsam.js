// Hilfen, die alle Layouts teilen. Ein Layout berechnet NUR Positionen und Kulisse.
export const B = 1000; // Breite der Bühne in Zeichenmaß
export const H = 720;  // Höhe der Bühne in Zeichenmaß

/** Knoten gruppiert nach Ebene, in der Reihenfolge von daten.ebenen. */
export const proEbene = (d) => d.ebenen.map((e) => d.knoten.filter((k) => k.ebene === e.id));

/** Mitte der i-ten von n gleich breiten Zellen zwischen von und bis. */
export const mitte = (i, n, von, bis) => von + ((i + 0.5) / n) * (bis - von);

/** Beschreibt ein SVG-Element der Kulisse; gezeichnet wird in machtkarte.js. */
export const form = (tag, attrs, text) => ({ tag, attrs, text });

/** Position einer Ebene als Zahl 0 (oben) bis 1 (unten); Stile nutzen sie für Farbverläufe (--s). */
export const stufe = (i, n) => `--s:${n > 1 ? i / (n - 1) : 0}`;

/** Ebenentitel (+ optionaler Untertitel) als Kulissen-Elemente. */
export function titel(d, i, x, y, anker = 'start') {
  const e = d.ebenen[i], style = stufe(i, d.ebenen.length);
  const f = [form('text', { class: 'mk-ebene-titel', x, y, 'text-anchor': anker, style }, e.label)];
  if (e.untertitel) f.push(form('text', { class: 'mk-ebene-untertitel', x, y: y + 20, 'text-anchor': anker, style }, e.untertitel));
  return f;
}
