// Querschnitt eines Gebäudes: oben das Dach, jede Ebene ein Stockwerk, jede Figur ein Raum.
import { H, proEbene, mitte, form, stufe, titel } from './gemeinsam.js';

export default {
  name: 'Haus',
  berechne(d) {
    const n = d.ebenen.length, links = 100, rechts = 900, dachFuss = 140, boden = H - 22;
    const fh = (boden - dachFuss) / n;
    const pos = {}, kulisse = [];
    kulisse.push(form('rect', { class: 'mk-k-dach', x: 720, y: 52, width: 44, height: 90 })); // Schornstein
    kulisse.push(form('polygon', { class: 'mk-k-dach', points: `${links - 40},${dachFuss} 500,26 ${rechts + 40},${dachFuss}` }));
    kulisse.push(form('rect', { class: 'mk-k-flaeche', x: links, y: dachFuss, width: rechts - links, height: boden - dachFuss }));
    proEbene(d).forEach((ks, i) => {
      const y0 = dachFuss + i * fh;
      kulisse.push(form('rect', { class: 'mk-k-ebene', 'data-alt': i % 2, style: stufe(i, n), x: links, y: y0, width: rechts - links, height: fh }));
      kulisse.push(form('line', { class: 'mk-k-linie', x1: links, x2: rechts, y1: y0, y2: y0 }));
      for (let r = 1; r < ks.length; r++) {
        const x = links + ((rechts - links) * r) / ks.length;
        kulisse.push(form('line', { class: 'mk-k-linie', x1: x, x2: x, y1: y0, y2: y0 + fh }));
      }
      kulisse.push(...titel(d, i, links + 14, y0 + 24));
      ks.forEach((k, j) => { pos[k.id] = { x: mitte(j, ks.length, links, rechts), y: y0 + fh * 0.62 }; });
    });
    kulisse.push(form('line', { class: 'mk-k-linie', x1: 40, x2: 960, y1: boden, y2: boden }));
    return { pos, kulisse };
  },
};
