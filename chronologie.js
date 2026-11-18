// Inhalte der Zeitleiste „Chronologie des Scheiterns“. Keine Logik, kein Aussehen.
// Grundlage: Zeitleiste „Machtverschiebungen“ im Analysebericht (Deutsch Q3), am Roman geprüft,
// korrigiert und um zwei Stationen ergänzt (Der Prügler, Kündigung des Advokaten).
//
// Regeln:
// - stationen in der Reihenfolge des Romans (Kapitelfolge der üblichen Ausgaben).
// - figuren verweist auf knoten.id aus daten.js – Figuren werden nur dort beschrieben.
// - versuch / scheitern = Romanhandlung; deutung = Interpretation (wird auf der Seite markiert).
// - spielraum 0–5 = Einschätzung von K.s Handlungsspielraum; keine Angabe aus dem Roman.
// - Keine Seitenzahlen; Zitate nur, wenn am Roman geprüft.

export default {
  titel: 'Chronologie des Scheiterns',
  untertitel: 'K.s Versuche, seine Lage zu verbessern – und warum sie scheitern. Eine Station anklicken.',

  einleitung: [
    'Von der Verhaftung bis zur Hinrichtung versucht Josef K. immer wieder, die Kontrolle zurückzugewinnen: mit Papieren, Reden, Anwälten, Helfern. Jeder Versuch zieht ihn tiefer in das Gericht hinein.',
    'Die Kurve zeigt, wie sein Handlungsspielraum sinkt. Die Stufen im Hintergrund entsprechen den Ebenen der Machtkarte.',
  ],

  legende: [
    'Spielraum 0–5 = Einschätzung von K.s Handlungsspielraum (Deutung, keine Angabe im Roman).',
    'Figuren in einer Station anklicken → sie werden in der Machtkarte gezeigt.',
  ],

  stationen: [
    {
      id: 'ausgangslage', titel: 'Ausgangslage', kapitel: 'Verhaftung (Rückblick)', spielraum: 4,
      figuren: ['k', 'bank'],
      versuch: 'Josef K. ist Prokurist einer großen Bank, hat ein eigenes Büro, Untergebene und Ansehen. Sein Leben ist geordnet.',
      scheitern: 'Noch kein Scheitern – aber diese Ordnung ist alles, worauf er sich später stützen will.',
      deutung: 'Die rationale Welt der Bank ist K.s Machtbasis. Der Roman zeigt, wie wenig sie gegen das Gericht wert ist.',
    },
    {
      id: 'verhaftung', titel: 'Verhaftung', kapitel: 'Verhaftung', spielraum: 3,
      figuren: ['gericht', 'franz', 'willem', 'grubach', 'buerstner'],
      versuch: 'Der Aufseher verhört ihn im Zimmer von Fräulein Bürstner, in der Pension von Frau Grubach. K. hält alles für einen Scherz, sucht seine Legitimationspapiere und will den Staatsanwalt Hasterer, einen Bekannten, anrufen.',
      scheitern: 'Die Wächter wischen die Papiere beiseite: „Was kümmern uns denn die?“ Er ist verhaftet, darf aber weiter in die Bank gehen.',
      deutung: 'Die Ordnung, auf die K. vertraut (Ausweis, Beziehungen, Rechtsstaat), gilt plötzlich nicht mehr. Das Gericht dringt in sein Schlafzimmer ein – in den privatesten Raum.',
    },
    {
      id: 'untersuchung', titel: 'Erste Untersuchung', kapitel: 'Erste Untersuchung', spielraum: 3,
      figuren: ['richter', 'gericht'],
      versuch: 'K. hält vor der Versammlung eine Rede und klagt an, hinter dem Gericht stehe „eine große Organisation“, die Unschuldige verhafte.',
      scheitern: 'Er bemerkt, dass alle Zuhörer Abzeichen tragen wie der Untersuchungsrichter – beide „Parteien“ gehören zum Gericht. Er geht im Zorn.',
      deutung: 'K.s Rede ist sein mutigster Angriff, verpufft aber. Wer das System anklagt, spricht nur zu dessen Mitgliedern.',
    },
    {
      id: 'kanzleien', titel: 'Kanzleien', kapitel: 'Im leeren Sitzungssaal – Der Student – Die Kanzleien', spielraum: 2,
      figuren: ['frau', 'student', 'diener'],
      versuch: 'K. kommt eine Woche später wieder, um den Prozess voranzutreiben, und lässt sich durch die Kanzleien auf dem Dachboden führen.',
      scheitern: 'Es gibt keine Sitzung. Der Student trägt die Frau des Gerichtsdieners fort. In den stickigen Kanzleien wird K. so schwach, dass man ihn hinausführen muss.',
      deutung: 'Hier wird Ohnmacht wörtlich: K. bricht körperlich zusammen. Das Gericht wirkt nicht durch Gewalt, sondern durch seine Räume.',
    },
    {
      id: 'pruegler', titel: 'Der Prügler', kapitel: 'Der Prügler', spielraum: 2,
      figuren: ['gericht', 'pruegler', 'franz', 'willem', 'bank'],
      versuch: 'K. hatte sich in der Untersuchung über die Wächter beschwert. In einer Rumpelkammer seiner Bank sieht er, wie sie dafür geprügelt werden, und will den Prügler bestechen.',
      scheitern: 'Der Prügler lässt sich nicht bestechen. Am nächsten Tag öffnet K. die Tür erneut – die Szene ist unverändert.',
      deutung: 'Die Gerichtswelt sitzt jetzt mitten in K.s Bank. Seine Anklage trifft nur die Untersten; er selbst wird zum Mitverursacher.',
    },
    {
      id: 'huld', titel: 'Huld & Leni', kapitel: 'Der Onkel – Leni', spielraum: 2,
      figuren: ['onkel', 'huld', 'leni'],
      versuch: 'Der Onkel bringt K. zum Advokaten Huld, bei dem gerade der Kanzleidirektor zu Besuch ist.',
      scheitern: 'K. verlässt das Gespräch und geht zu Leni. Der Onkel wirft ihm vor, seiner Sache geschadet zu haben.',
      deutung: 'K. gibt seine Verteidigung an andere ab. Statt selbst zu handeln, wird er abhängig – von Huld und von Leni.',
    },
    {
      id: 'titorelli', titel: 'Titorelli', kapitel: 'Advokat – Fabrikant – Maler', spielraum: 2,
      figuren: ['titorelli', 'bank'],
      versuch: 'Auf Rat eines Fabrikanten sucht K. den Gerichtsmaler Titorelli auf, der viele Richter kennt.',
      scheitern: 'Titorelli erklärt: wirklicher Freispruch, scheinbarer Freispruch oder Verschleppung. Einen wirklichen Freispruch habe er nie erlebt. Währenddessen übernimmt der Direktor-Stellvertreter K.s Kunden.',
      deutung: 'Es gibt keinen Ausweg, nur Arten, den Prozess auszuhalten. Auch K.s berufliche Macht zerfällt.',
    },
    {
      id: 'kuendigung', titel: 'Kündigung', kapitel: 'Kaufmann Block – Kündigung des Advokaten', spielraum: 2,
      figuren: ['huld', 'block', 'leni'],
      versuch: 'K. will den Prozess selbst führen und kündigt dem Advokaten.',
      scheitern: 'Huld führt ihm vor, wie unterwürfig der Kaufmann Block nach Jahren geworden ist. Die Kündigung ändert am Verfahren nichts.',
      deutung: 'K.s letzte deutliche Selbstbehauptung. Block zeigt ihm, wohin der Weg führt – in völlige Unterwerfung.',
    },
    {
      id: 'dom', titel: 'Im Dom', kapitel: 'Im Dom', spielraum: 1,
      figuren: ['bank', 'gericht'],
      versuch: 'K. soll einem italienischen Geschäftsfreund der Bank den Dom zeigen. Dort ruft ihn ein Geistlicher beim Namen; K. hofft auf Rat.',
      scheitern: 'Der Geistliche ist Gefängniskaplan, gehört also zum Gericht, und erzählt die Legende „Vor dem Gesetz“. Sein Schluss: „Das Gericht will nichts von dir.“',
      deutung: 'Selbst der Ort, an dem K. Hilfe sucht, gehört zum Gericht. Die Türhüter-Legende spiegelt K.s Lage: Der Zugang zum Gesetz bleibt verschlossen.',
    },
    {
      id: 'ende', titel: 'Ende', kapitel: 'Ende', spielraum: 0,
      figuren: ['gericht', 'buerstner', 'k'],
      versuch: 'Am Vorabend seines 31. Geburtstags holen ihn zwei Herren ab. Unterwegs taucht eine Frau auf, die Fräulein Bürstner sein könnte; danach gibt K. jeden Widerstand auf.',
      scheitern: 'In einem Steinbruch wird er erstochen. Seine letzten Worte: „Wie ein Hund!“',
      deutung: 'Endgültige Machtlosigkeit. K. stirbt, ohne Richter und Anklage je gesehen zu haben.',
    },
  ],
};
