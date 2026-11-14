import { B, H, proEbene, mitte, form, stufe, titel } from './gemeinsam.js';

const MIN_ZELLE = 110; // schmaler als das → Knoten der Stufe versetzt in zwei Reihen

export default {
  name: 'Pyramide',
  berechne(d) {
    const n = d.ebenen.length, oben = 30, unten = H - 30, h = (unten - oben) / n, halb = 470, kopf = 110;
    // Stumpfe Pyramide: oben „kopf“ breit (halbe Breite), damit auch obere Stufen Platz für Namen haben.
    const breite = (y) => 2 * (kopf + ((halb - kopf) * (y - oben)) / (unten - oben));
    const pos = {}, kulisse = [];
    kulisse.push(form('polygon', { class: 'mk-k-flaeche', points: `${B / 2 - kopf},${oben} ${B / 2 + kopf},${oben} ${B / 2 + halb},${unten} ${B / 2 - halb},${unten}` }));
    proEbene(d).forEach((ks, i) => {
      const y0 = oben + i * h, y1 = y0 + h, w0 = breite(y0) / 2, w1 = breite(y1) / 2;
      kulisse.push(form('polygon', { class: 'mk-k-ebene', 'data-alt': i % 2, style: stufe(i, n), points: `${B / 2 - w0},${y0} ${B / 2 + w0},${y0} ${B / 2 + w1},${y1} ${B / 2 - w1},${y1}` }));
      kulisse.push(form('line', { class: 'mk-k-linie', x1: B / 2 - w1, x2: B / 2 + w1, y1, y2: y1 }));
      kulisse.push(...titel(d, i, B / 2, y0 + h * 0.22, 'middle'));
      const y = y0 + h * 0.7, w = breite(y) * 0.92;
      const zelle = w / ks.length, versetzt = ks.length > 2 && zelle < MIN_ZELLE;
      ks.forEach((k, j) => {
        // Versetzt: abwechselnd höher/tiefer, dafür darf jeder Knoten doppelt so breit werden.
        const dy = versetzt ? (j % 2 ? 0.14 : -0.1) * h : 0;
        pos[k.id] = { x: mitte(j, ks.length, B / 2 - w / 2, B / 2 + w / 2), y: y + dy, breite: zelle * (versetzt ? 1.9 : 0.95) };
      });
    });
    return { pos, kulisse };
  },
};
