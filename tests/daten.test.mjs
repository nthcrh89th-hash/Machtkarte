// Prüft die Inhalte mit denselben Prüffunktionen, die auch die Seite nutzt.
// Ausführen im Ordner machtkarte/:  node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import daten from '../daten.js';
import chronologie from '../chronologie.js';
import { pruefe } from '../machtkarte.js';
import { pruefeChronologie } from '../zeitleiste.js';
import layouts from '../layouts/index.js';

test('Machtkarte-Daten sind stimmig', () => assert.doesNotThrow(() => pruefe(daten)));

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

test('Jedes Layout liefert eine Position für jeden Knoten', () => {
  Object.entries(layouts).forEach(([name, l]) => {
    const { pos } = l.berechne(daten);
    daten.knoten.forEach((k) => assert.ok(Number.isFinite(pos[k.id]?.x) && Number.isFinite(pos[k.id]?.y), `${name}: ${k.id}`));
  });
});
