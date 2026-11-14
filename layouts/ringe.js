// Zielscheibe: Ebene 1 im Zentrum, jede weitere Ebene ein Ring weiter außen.
import { B, H, proEbene, form, stufe } from './gemeinsam.js';

export default {
  name: 'Zielscheibe',
  berechne(d) {
    const n = d.ebenen.length, cx = B / 2, cy = H / 2, erster = 150, maxR = 310, streck = 1.38;
    const gruppen = proEbene(d);
    // Ring 1 = Zentrum; der erste echte Ring liegt bei „erster“, der letzte bei „maxR“.
    const radius = (i) => (i === 0 ? (gruppen[0].length > 1 ? 70 : 0) : n > 2 ? erster + ((i - 1) * (maxR - erster)) / (n - 2) : erster);
    const zone = (i) => (i === n - 1 ? radius(i) + 40 : (radius(i) + radius(i + 1)) / 2);
    const rand = (a, r) => ({ x: cx + Math.cos(a) * r * streck, y: cy + Math.sin(a) * r });
    const pos = {}, kulisse = [];

    kulisse.push(form('ellipse', { class: 'mk-k-flaeche', cx, cy, rx: zone(n - 1) * streck, ry: zone(n - 1) }));
    for (let i = n - 1; i >= 0; i--) {
      kulisse.push(form('ellipse', { class: 'mk-k-ebene', 'data-alt': i % 2, style: stufe(i, n), cx, cy, rx: zone(i) * streck, ry: zone(i) }));
    }
    for (let w = 0; w < 8; w++) { // Speichen
      const a = (w * Math.PI) / 4, p = rand(a, zone(n - 1));
      kulisse.push(form('line', { class: 'mk-k-linie', x1: cx, y1: cy, x2: p.x, y2: p.y }));
    }
    d.ebenen.forEach((e, i) => { // Legende links oben
      kulisse.push(form('ellipse', { class: 'mk-k-flaeche', cx: 20, cy: 26 + i * 26, rx: 7, ry: 7 }));
      kulisse.push(form('text', { class: 'mk-ebene-titel', x: 36, y: 31 + i * 26 }, e.label));
    });
    gruppen.forEach((ks, i) => ks.forEach((k, j) => {
      const a = -Math.PI / 2 + (2 * Math.PI * (j + 0.5)) / ks.length + (i * 60 * Math.PI) / 180;
      pos[k.id] = radius(i) === 0 ? { x: cx, y: cy } : rand(a, radius(i));
    }));
    return { pos, kulisse };
  },
};
