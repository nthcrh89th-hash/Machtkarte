# Der Process – Macht, Ohnmacht, Scheitern

Interaktive Website zu Kafkas „Der Process“ (Deutsch-GK).

## Seiten
- `index.html` – Startseite mit Türen zu den Unterseiten (in sich geschlossen, kein Modul)
- `machtkarte.html` – Machtkarte; `machtkarte.html#figur-<id>` (z. B. `#figur-franz`) öffnet sie mit dieser Figur ausgewählt
- `chronologie.html` – Chronologie des Scheiterns (Zeitleiste); ein Klick auf eine Figur führt zu `machtkarte.html#figur-<id>`
- `seite.css` – gemeinsame Kopfleiste und Seitenrahmen beider Unterseiten

Alte Links werden weitergeleitet: `index.html#machtkarte` → `machtkarte.html`, `index.html#zeitleiste` und `machtkarte.html#zeitleiste` → `chronologie.html`.

## Ansehen
Die Module brauchen einen Webserver (kein Doppelklick auf eine Unterseite):

    python3 -m http.server   # dann http://localhost:8000

## Inhalte ändern
- Unterseiten der Startseite: nur in `const UNTERSEITEN` ganz unten in `index.html` (Titel, Text, `href`; `href: null` = „in Vorbereitung“)
- `daten.js` – Ebenen, Figuren, Beziehungen der Machtkarte
- `chronologie.js` – Stationen der Zeitleiste (Figuren per id aus `daten.js`)
- Romanhandlung (`handeln`, `versuch`, `scheitern`) und Interpretation (`deutung`) bleiben getrennt.

## Prüfen
    node --test
