# Machtkarte – Der Process

Interaktive Website zu Kafkas „Der Process“ (Deutsch-GK): Machtkarte und Chronologie des Scheiterns.

## Ansehen
Die Module brauchen einen Webserver (kein Doppelklick auf `index.html`):

    python3 -m http.server   # dann http://localhost:8000

## Inhalte ändern
- `daten.js` – Ebenen, Figuren, Beziehungen der Machtkarte
- `chronologie.js` – Stationen der Zeitleiste (Figuren per id aus `daten.js`)
- Romanhandlung (`handeln`, `versuch`, `scheitern`) und Interpretation (`deutung`) bleiben getrennt.

## Prüfen
    node --test
