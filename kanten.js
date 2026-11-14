// Geometrie der Verbindungslinien. Kennt weder Inhalte noch Auswahl noch Layout.
const NS = 'http://www.w3.org/2000/svg';

/** Punkt, an dem die Gerade von der Mitte c zum Ziel den Rand des Rechtecks (w × h) schneidet. */
function rand(c, ziel, [w, h], luft) {
  const dx = ziel.x - c.x, dy = ziel.y - c.y;
  const t = Math.min(dx ? (w / 2 + luft) / Math.abs(dx) : Infinity, dy ? (h / 2 + luft) / Math.abs(dy) : Infinity);
  return { x: c.x + dx * t, y: c.y + dy * t };
}

/** Zeichnet alle Linien neu in die Gruppe und gibt { beziehung, el } je Linie zurück. */
export function zeichneKanten(gruppe, pos, groesse, beziehungen) {
  const marker = document.createElementNS(NS, 'marker');
  marker.setAttribute('id', 'mk-pfeil');
  marker.setAttribute('viewBox', '0 0 10 10');
  marker.setAttribute('refX', '9'); marker.setAttribute('refY', '5');
  marker.setAttribute('markerWidth', '7'); marker.setAttribute('markerHeight', '7');
  marker.setAttribute('orient', 'auto');
  marker.innerHTML = '<path d="M0,0 L10,5 L0,10 z" class="mk-pfeilspitze"/>';
  gruppe.replaceChildren(marker);

  return beziehungen.map((b) => {
    const von = pos[b.von], nach = pos[b.nach];
    const a = rand(von, nach, groesse.get(b.von), 4), z = rand(nach, von, groesse.get(b.nach), 4);
    const laenge = Math.hypot(z.x - a.x, z.y - a.y) || 1;
    const bogen = laenge * 0.12; // leicht gekrümmt; Gegenrichtungen weichen sich so aus
    const sx = (a.x + z.x) / 2 - ((z.y - a.y) / laenge) * bogen;
    const sy = (a.y + z.y) / 2 + ((z.x - a.x) / laenge) * bogen;
    const el = document.createElementNS(NS, 'path');
    el.setAttribute('d', `M${a.x},${a.y} Q${sx},${sy} ${z.x},${z.y}`);
    el.setAttribute('class', 'mk-kante');
    el.setAttribute('data-art', b.art);
    el.setAttribute('marker-end', 'url(#mk-pfeil)');
    gruppe.append(el);
    return { beziehung: b, el };
  });
}
