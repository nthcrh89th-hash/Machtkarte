// Kräfte-Netz: Verbundene Knoten ziehen sich an, alle stoßen sich ab, jede Ebene hält ihr Band.
// Rechnet deterministisch (kein Zufall) – gleiche Daten ergeben immer dasselbe Bild.
import { B, H, proEbene, mitte, form, stufe, titel } from './gemeinsam.js';

export default {
  name: 'Netz',
  berechne(d) {
    const n = d.ebenen.length, bh = H / n, links = 150, rechts = B - 90, K = 150;
    const band = new Map(d.ebenen.map((e, i) => [e.id, i]));
    const bandMitte = (i) => (i + 0.5) * bh;
    const gruppen = proEbene(d);
    const idx = new Map(d.knoten.map((k, i) => [k.id, i]));
    const p = d.knoten.map((k) => {
      const i = band.get(k.ebene), ks = gruppen[i];
      return { x: mitte(ks.indexOf(k), ks.length, links, rechts), y: bandMitte(i), i };
    });
    for (let t = 0; t < 300; t++) {
      const temp = 14 * (1 - t / 300) + 0.5, f = p.map(() => ({ x: 0, y: 0 }));
      for (let a = 0; a < p.length; a++) for (let b = a + 1; b < p.length; b++) {
        const dx = p[a].x - p[b].x, dy = p[a].y - p[b].y, dist = Math.hypot(dx, dy) || 0.01;
        const kraft = (K * K) / dist / dist;
        f[a].x += dx * kraft; f[a].y += dy * kraft; f[b].x -= dx * kraft; f[b].y -= dy * kraft;
      }
      d.beziehungen.forEach((b) => {
        const a = idx.get(b.von), z = idx.get(b.nach);
        const dx = p[a].x - p[z].x, dy = p[a].y - p[z].y, dist = Math.hypot(dx, dy) || 0.01;
        const kraft = dist / K;
        f[a].x -= dx * kraft; f[a].y -= dy * kraft; f[z].x += dx * kraft; f[z].y += dy * kraft;
      });
      p.forEach((q, i) => {
        const len = Math.hypot(f[i].x, f[i].y) || 1, s = Math.min(len, temp) / len;
        q.x = Math.min(rechts, Math.max(links, q.x + f[i].x * s));
        q.y += (bandMitte(q.i) - q.y) * 0.12 + f[i].y * s * 0.3;
        q.y = Math.min((q.i + 1) * bh - 34, Math.max(q.i * bh + 34, q.y));
      });
    }
    const kulisse = [];
    d.ebenen.forEach((e, i) => {
      kulisse.push(form('rect', { class: 'mk-k-ebene', 'data-alt': i % 2, style: stufe(i, n), x: 0, y: i * bh, width: B, height: bh }));
      kulisse.push(form('line', { class: 'mk-k-linie', x1: 0, x2: B, y1: i * bh, y2: i * bh }));
      kulisse.push(...titel(d, i, 14, i * bh + 24));
    });
    const pos = {};
    d.knoten.forEach((k, i) => { pos[k.id] = { x: p[i].x, y: p[i].y }; });
    return { pos, kulisse };
  },
};
