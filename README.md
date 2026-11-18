# Der Process – Macht, Ohnmacht, Scheitern

Interaktive Website zu Kafkas „Der Process“ (Deutsch-GK).

## Seiten
- `index.html` – Startseite mit Türen zu den Unterseiten (in sich geschlossen, kein Modul)
- `machtkarte.html` – Machtkarte (`#machtkarte`) und Chronologie der Macht (`#zeitleiste`)

Alte Links auf `…/#machtkarte` oder `…/#zeitleiste` leitet die Startseite auf `machtkarte.html` weiter.

## Ansehen
Die Module der Machtkarte brauchen einen Webserver (kein Doppelklick auf `machtkarte.html`):

    python3 -m http.server   # dann http://localhost:8000

## Inhalte ändern
- Unterseiten der Startseite: nur in `const UNTERSEITEN` ganz unten in `index.html` (Titel, Text, `href`; `href: null` = „in Vorbereitung“)
- `daten.js` – Ebenen, Figuren, Beziehungen der Machtkarte
- `chronologie.js` – Stationen der Zeitleiste (Figuren per id aus `daten.js`)
- Romanhandlung (`handeln`, `versuch`, `scheitern`) und Interpretation (`deutung`) bleiben getrennt.

## Prüfen
    node --test
