// Einzige Stelle für Inhalte der Machtkarte. Keine Logik, kein Aussehen.
// Quelle: Analysebericht „Machtstrukturen in Franz Kafkas Der Prozess“ (Deutsch Q3),
// am Roman geprüft und korrigiert. Romanhandlung („handeln“) und Interpretation
// („deutung“) stehen getrennt; „deutung“ wird auf der Seite als Deutung markiert.
//
// Regeln:
// - ebenen: von oben (mächtig) nach unten (ohnmächtig) sortiert; untertitel ist optional.
// - knoten.ebene verweist auf eine ebenen.id.
// - knoten (alle Textfelder optional): quellen = Machtquellen, handeln = was die Figur im Roman tut,
//   deutung = Interpretation, machtgrad = 0–5 (tatsächlicher Handlungsspielraum im Prozess).
// - beziehungen: "von" übt Macht/Einfluss auf "nach" aus (Pfeilrichtung).
// - Arten: formal = Amt/offizielle Rolle (Linie durchgezogen), informell = sozial/privat (gestrichelt).
//   Eine neue Art braucht eine Regel in machtkarte.css ([data-art="…"]).

export default {
  titel: 'Machtkarte – Der Process',
  untertitel: 'Wer mächtig wirkt, ist es oft nicht. Eine Figur anklicken für Details.',

  einleitung: [
    'Josef K., Prokurist einer Bank, wird an seinem 30. Geburtstag verhaftet, ohne zu erfahren, wofür. Das Gericht, dem er nun untersteht, hat keine erkennbare Spitze: Die Kanzleien liegen auf Dachböden, die hohen Richter bekommt niemand zu sehen.',
    'Die sichtbaren Amtsträger – Wächter, Untersuchungsrichter, Gerichtsdiener – zeigen Macht durch Rituale, sind aber selbst nur kleine Teile des Apparats. Als K. bei der Verhaftung seine Legitimationspapiere vorzeigt, heißt es nur: „Was kümmern uns denn die?“',
    'Deutung: Die eigentliche Macht liegt nicht bei einer Person, sondern in der Struktur selbst – in einem Netz von Abhängigkeiten, das niemand überblickt. Am Ende hat K. jeden Handlungsspielraum verloren.',
  ],

  legende: [
    'Pfeil = übt Macht oder Einfluss aus (von → nach).',
    'Durchgezogen = Amt/offizielle Rolle, gestrichelt = informell/privat.',
    'Machtgrad 0–5 = tatsächlicher Handlungsspielraum im Prozess (Einschätzung des Analyseberichts).',
    'Dunkle Felder = Instanz, helle Felder = Figur.',
  ],

  arten: {
    formal: 'formal',
    informell: 'informell',
  },

  typen: {
    figur: 'Figur',
    instanz: 'Instanz',
  },

  ebenen: [
    { id: 'spitze', label: 'Spitze', untertitel: 'unsichtbar' },
    { id: 'apparat', label: 'Gerichtsapparat', untertitel: 'sichtbare Amtsmacht' },
    { id: 'vermittler', label: 'Vermittler', untertitel: 'Wissen statt Amt' },
    { id: 'umfeld', label: 'Umfeld', untertitel: 'Macht im Alltag, nicht im Prozess' },
    { id: 'angeklagte', label: 'Die Angeklagten', untertitel: 'ohnmächtig' },
  ],

  knoten: [
    // --- Spitze ---
    {
      id: 'gericht', ebene: 'spitze', typ: 'instanz', label: 'Das Gericht', machtgrad: 5,
      quellen: 'Formal: Gesetz, Beamtenapparat, Amtsautorität. Symbolisch: Rituale (Verhaftung, Vorladung, Verhör) und eine eigene Gerichtssprache.',
      handeln: 'Lässt K. verhaften, lädt ihn zur Untersuchung vor und verurteilt ihn am Ende, ohne dass er je eine Anklage erfährt. Die Kanzleien liegen auf Dachböden von Mietshäusern; die hohen Richter bleiben unerreichbar.',
      deutung: 'Das Gericht erscheint allmächtig, entzieht sich aber jeder konkreten Verantwortung. Es ist eher ein System als eine Person: Niemand im Roman kann sagen, wer eigentlich entscheidet. Die Forschung spricht von einer Macht, die nicht juristisch festgelegt ist.',
    },

    // --- Gerichtsapparat ---
    {
      id: 'richter', ebene: 'apparat', typ: 'figur', label: 'Untersuchungs\u00adrichter', machtgrad: 4,
      quellen: 'Formal: Amt im Verfahren. Informell: Gunst, die er verteilt (z. B. an den Studenten).',
      handeln: 'Leitet K.s erste Untersuchung an einem Sonntag in einem Vorstadthaus. Hält K. für einen „Zimmermaler“ und blättert in einem abgegriffenen Heft. K. bemerkt, dass das ganze Publikum Abzeichen trägt wie der Richter.',
      deutung: 'Er verkörpert die sichtbare Macht des Gerichts, ist aber nur ein niedriger Beamter. Außerhalb des Systems hat er keine eigene Kontrolle.',
    },
    {
      id: 'student', ebene: 'apparat', typ: 'figur', label: 'Student Berthold', machtgrad: 3,
      quellen: 'Formal: kaum ein Amt, studiert Recht. Informell: Günstling des Untersuchungsrichters; ihm wird eine große Zukunft vorhergesagt.',
      handeln: 'Trägt die Frau des Gerichtsdieners vor K.s Augen zum Untersuchungsrichter fort. Der Gerichtsdiener muss das hinnehmen, weil er um seine Stelle fürchtet.',
      deutung: 'Er hat keine formale Stellung, aber durch seine Nähe zum Richter große, verdeckte Macht. Er zeigt, dass im Gericht Beziehungen mehr zählen als Ämter.',
    },
    {
      id: 'diener', ebene: 'apparat', typ: 'figur', label: 'Gerichts\u00addiener', machtgrad: 2,
      quellen: 'Formal: unteres Dienstamt. Informell: Ortskenntnis in den Kanzleien.',
      handeln: 'Führt K. durch die Kanzleien auf dem Dachboden. Klagt, dass der Student ihm die Frau wegnimmt – er kann sich nicht wehren, ohne seine Stelle zu verlieren.',
      deutung: 'Er gehört zum Apparat und ist doch selbst dessen Opfer. Sein Amt verschafft ihm Zugang, aber keinen Schutz.',
    },

    // --- Vermittler ---
    {
      id: 'huld', ebene: 'vermittler', typ: 'figur', label: 'Advokat Huld', machtgrad: 1,
      quellen: 'Formal: Titel als Advokat. Informell: Fachwissen, angebliche Beziehungen zu Beamten (z. B. zum Kanzleidirektor).',
      handeln: 'Empfängt K. krank im Bett, redet viel über seine Verbindungen, reicht aber keine erkennbare Eingabe ein. Demütigt den Kaufmann Block vor K. Schließlich kündigt K. ihm.',
      deutung: 'Seine Macht ist Schein. Er kann den Prozess weder stoppen noch beeinflussen, hält seine Klienten aber in Abhängigkeit – das ist seine einzige echte Macht.',
    },
    {
      id: 'leni', ebene: 'vermittler', typ: 'figur', label: 'Leni', machtgrad: 2,
      quellen: 'Informell: Nähe zu K. (Verführung), Wissen über das Gericht, Stellung im Haus des Advokaten.',
      handeln: 'Pflegerin im Haushalt des Advokaten. Lockt K. vom Gespräch mit dem Kanzleidirektor weg und rät ihm: „gegen dieses Gericht kann man sich ja nicht wehren, man muß das Geständnis machen.“',
      deutung: 'Sie hat Einfluss auf K.s Gefühle und Entscheidungen, aber nicht auf das Verfahren. Ihre Macht bleibt an Huld gebunden.',
    },
    {
      id: 'titorelli', ebene: 'vermittler', typ: 'figur', label: 'Maler Titorelli', machtgrad: 2,
      quellen: 'Informell: Insiderwissen; kennt als Gerichtsmaler viele Richter. Die Stelle hat er von seinem Vater geerbt.',
      handeln: 'Erklärt K. in seinem engen Atelier die drei Möglichkeiten: wirklicher Freispruch, scheinbarer Freispruch, Verschleppung. Einen wirklichen Freispruch habe er nie erlebt.',
      deutung: 'Er beschreibt Macht, besitzt aber keine. Seine Erklärungen sind eher Modelle des Systems als Hilfe – sie zeigen, dass es keinen echten Ausweg gibt.',
    },
    {
      id: 'frau', ebene: 'vermittler', typ: 'figur', label: 'Frau des Gerichts\u00addieners', machtgrad: 1,
      quellen: 'Informell: Beziehungen zu Beamten, Wissen über die Gerichtsvorgänge; wohnt im Gerichtssaal.',
      handeln: 'Bietet K. ihre Hilfe an, zeigt ihm die Bücher des Untersuchungsrichters und wird dann vom Studenten zum Richter getragen.',
      deutung: 'Sie wirkt wie eine Vermittlerin, ist aber selbst ein Spielball der Männer im Apparat.',
    },

    // --- Umfeld ---
    {
      id: 'onkel', ebene: 'umfeld', typ: 'figur', label: 'Onkel Karl', machtgrad: 1,
      quellen: 'Informell: familiäre Autorität (früher K.s Vormund), Bekanntschaft mit dem Advokaten Huld.',
      handeln: 'Kommt vom Land in die Stadt, bringt K. zu Huld und macht ihm Vorwürfe, als K. während des Besuchs des Kanzleidirektors mit Leni verschwindet.',
      deutung: 'Er glaubt, die Verteidigung zu organisieren, hat aber keine juristische Macht. Seine Stärke ist Druck innerhalb der Familie.',
    },
    {
      id: 'bank', ebene: 'umfeld', typ: 'figur', label: 'Bank\u00addirektion', machtgrad: 2,
      quellen: 'Formal: Hierarchie im Beruf. Informell: Rivalität – der Direktor-Stellvertreter will K. verdrängen.',
      handeln: 'Der Direktor-Stellvertreter nutzt K.s Ablenkung durch den Prozess und übernimmt seine Kunden. K. wird beauftragt, einem italienischen Geschäftsfreund den Dom zu zeigen.',
      deutung: 'Im Beruf sind sie K. überlegen, im Prozess spielen sie keine Rolle. Der Prozess frisst auch K.s berufliche Macht auf.',
    },
    {
      id: 'grubach', ebene: 'umfeld', typ: 'figur', label: 'Frau Grubach', machtgrad: 1,
      quellen: 'Informell: Stellung als Vermieterin, soziale Nähe zu K.',
      handeln: 'Spricht mit K. über die Verhaftung und deutet an, Fräulein Bürstner habe einen zweifelhaften Lebenswandel – K. reagiert gereizt.',
      deutung: 'Sie übt soziale Kontrolle im Alltag aus (Gerede, Moral), hat aber keinerlei Einfluss auf den Prozess.',
    },
    {
      id: 'buerstner', ebene: 'umfeld', typ: 'figur', label: 'Fräulein Bürstner', machtgrad: 1,
      quellen: 'Informell: Nähe, Anziehung; ihre einzige Macht ist, sich K. zu entziehen.',
      handeln: 'Schreibmaschinistin, Nachbarin in der Pension. K. erzählt ihr nachts von der Verhaftung und küsst sie gegen ihren Willen. Danach meidet sie ihn und zieht zu Fräulein Montag.',
      deutung: 'Sie steht für die bürgerliche Ordnung, aus der K. herausfällt. Hier ist K. selbst derjenige, der Macht ausübt.',
    },

    // --- Angeklagte ---
    {
      id: 'k', ebene: 'angeklagte', typ: 'figur', label: 'Josef K.', machtgrad: 1,
      quellen: 'Formal: Prokurist einer Bank (verliert an Bedeutung). Informell: Bildung, Selbstbewusstsein, Logik.',
      handeln: 'Protestiert bei der ersten Untersuchung gegen „eine große Organisation“ hinter dem Gericht, nimmt einen Anwalt, sucht Helfer, kündigt dem Advokaten. Am Vorabend seines 31. Geburtstags wird er von zwei Herren in einem Steinbruch hingerichtet: „Wie ein Hund!“',
      deutung: 'Er bleibt reaktiv und verliert Schritt für Schritt die Kontrolle. Ohne offiziellen Status im Gericht geht seine Macht gegen null.',
    },
    {
      id: 'block', ebene: 'angeklagte', typ: 'figur', label: 'Kaufmann Block',
      quellen: 'Kaum noch eigene: Er hat sein Geschäft fast ganz für den Prozess geopfert.',
      handeln: 'Seit über fünf Jahren angeklagt. Wohnt zeitweise bei Huld, kniet vor ihm nieder und wird von Leni in die Dienstmädchenkammer gesperrt.',
      deutung: 'Er zeigt K., wohin der Prozess führt: in völlige Unterwerfung. Im Analysebericht ist er nicht bewertet.',
    },
  ],

  beziehungen: [
    { von: 'gericht', nach: 'k', art: 'formal', text: 'verhaftet, klagt an, verurteilt' },
    { von: 'gericht', nach: 'richter', art: 'formal', text: 'setzt ihn ein – er ist nur ein niedriger Teil des Apparats' },
    { von: 'gericht', nach: 'titorelli', art: 'formal', text: 'Auftraggeber: er malt die Richter' },
    { von: 'richter', nach: 'diener', art: 'formal', text: 'Vorgesetzter' },
    { von: 'richter', nach: 'student', art: 'informell', text: 'Günstling' },
    { von: 'richter', nach: 'k', art: 'formal', text: 'verhört ihn' },
    { von: 'student', nach: 'frau', art: 'informell', text: 'trägt sie zum Untersuchungsrichter fort' },
    { von: 'student', nach: 'diener', art: 'informell', text: 'der Diener muss es hinnehmen' },
    { von: 'diener', nach: 'k', art: 'formal', text: 'führt ihn durch die Kanzleien' },
    { von: 'frau', nach: 'k', art: 'informell', text: 'bietet Hilfe und Wissen an' },
    { von: 'onkel', nach: 'huld', art: 'informell', text: 'alter Bekannter; vermittelt K. an ihn' },
    { von: 'onkel', nach: 'k', art: 'informell', text: 'familiärer Druck' },
    { von: 'huld', nach: 'k', art: 'formal', text: 'Verteidiger, hält ihn hin' },
    { von: 'huld', nach: 'block', art: 'formal', text: 'demütigt ihn, macht ihn abhängig' },
    { von: 'huld', nach: 'leni', art: 'informell', text: 'sie arbeitet für ihn' },
    { von: 'leni', nach: 'k', art: 'informell', text: 'verführt ihn, rät zum Geständnis' },
    { von: 'leni', nach: 'block', art: 'informell', text: 'sperrt ihn in die Kammer' },
    { von: 'titorelli', nach: 'k', art: 'informell', text: 'erklärt die Arten des Freispruchs' },
    { von: 'bank', nach: 'k', art: 'formal', text: 'Vorgesetzte; der Stellvertreter verdrängt ihn' },
    { von: 'grubach', nach: 'k', art: 'informell', text: 'Vermieterin, soziale Kontrolle' },
    { von: 'grubach', nach: 'buerstner', art: 'informell', text: 'verdächtigt ihren Lebenswandel' },
    { von: 'k', nach: 'buerstner', art: 'informell', text: 'bedrängt sie (Kuss gegen ihren Willen)' },
  ],
};
