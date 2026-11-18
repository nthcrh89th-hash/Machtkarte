// Prüft die Inhalte mit denselben Prüffunktionen, die auch die Seite nutzt.
// Ausführen im Ordner machtkarte/:  node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import daten from '../daten.js';
import chronologie from '../chronologie.js';
import { pruefe } from '../machtkarte.js';
import { pruefeChronologie } from '../zeitleiste.js';
import { berechnePyramide } from '../pyramide.js';

test('Machtkarte-Daten sind stimmig', () => assert.doesNotThrow(() => pruefe(daten)));

test('Kein Knoten hat einen Machtgrad; die Wächter-Ebene hat genau Franz und Willem', () => {
  assert.ok(daten.knoten.every((k) => !('machtgrad' in k)));
  assert.deepEqual(daten.knoten.filter((k) => k.ebene === 'waechter').map((k) => k.id), ['franz', 'willem']);
});

test('Chronologie verweist nur auf vorhandene Figuren', () => assert.doesNotThrow(() => pruefeChronologie(chronologie, daten)));

test('Unbekannte Figur in der Chronologie wird gemeldet', () => {
  const kaputt = { stationen: [{ id: 'x', spielraum: 1, figuren: ['gibtsnicht'] }] };
  assert.throws(() => pruefeChronologie(kaputt, daten), /unbekannte Figur "gibtsnicht"/);
});

test('Jede Station trennt Romanhandlung und Deutung', () => {
  chronologie.stationen.forEach((s) => {
    for (const feld of ['titel', 'kapitel', 'versuch', 'scheitern', 'deutung']) assert.ok(s[feld], `${s.id}: ${feld} fehlt`);
  });
});

test('Die Pyramide liefert eine Position für jeden Knoten', () => {
  // berechnePyramide baut SVG-Elemente; ohne Browser prüfen wir nur die Positionen
  globalThis.document = { createElementNS: () => ({ setAttribute() {}, append() {}, textContent: '' }) };
  const { pos } = berechnePyramide(daten);
  daten.knoten.forEach((k) => assert.ok(Number.isFinite(pos[k.id]?.x) && Number.isFinite(pos[k.id]?.y), k.id));
});
