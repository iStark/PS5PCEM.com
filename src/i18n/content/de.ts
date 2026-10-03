import type { Content } from "./en";

const de: Content = {
  games: {
    "little-nightmares-enhanced-edition": {
      "status": "Im Spiel · Darstellung unvollständig",
      "headline": "Speichern und Laden funktionieren; 3,73–4,46 FPS im ersten Raum.",
      "summary": "3. Oktober, PPSA10737 v01.004.000: Asynchrone Schreibvorgänge speichern den Fortschritt; ein neuer Prozess lädt den ersten Raum über Fortsetzen. HTILE, gebündelte sofortige GPU-Rücklesevorgänge und vier Kopier-Threads senken die Renderkosten. 5 FPS werden noch nicht erreicht.",
      "strengths": [
        "Neues Spiel, Bewegung, Kameraführung und Feuerzeug sind geprüft.",
        "Nichtleere Spielstände werden nach einem Neustart des Emulators geladen."
      ],
      "limits": [
        "Dunkle Beleuchtung, fehlerhafte reflektierende Materialien und fehlende FLAT-/Strahlenschnitt-Shader bleiben.",
        "Sporadische Speicherverwaltungsfehler können den Start abbrechen; Durchspielen und Langzeitstabilität sind ungeprüft."
      ],
      "performance": "Aktualisierter Standard-Build: 4,46 FPS am Koffer, 3,73 FPS nach Bewegung nach rechts, jeweils 30 Sekunden ohne Pause. RTX 3070 Ti, 1080p-Ausgabe, Speed-Preset, im Spiel Performance; interne Auflösung vom Spiel bestimmt. Der frühere Wert von 2,16 FPS stammt aus einer anderen Position. 5 FPS bleiben unerreicht.",
      "imageAlt": "Six am Koffer im ersten Raum; dunkle Beleuchtung und fehlerhafte reflektierende Materialien bleiben"
    },
    "gta-iii-definitive-edition": {
      "status": "Im Spiel · Bewegung bestätigt",
      "headline": "Farben und Reflexionen im GTA-III-Spielgeschehen korrigiert.",
      "summary": "Entwicklungsstand vom 3. Oktober, PPSA03527 v1.007: Give Me Liberty zeigt Spielfigur, Fahrzeug, Brücke, HUD und Minikarte. Ursachen des grünen Überstrahlens und unvollständiger Reflexions-Mips sind korrigiert. Gemeinsame Ressourcenanalyse und GPU-residente Texturen reduzieren wiederholte CPU-Arbeit und Transfers.",
      "strengths": [
        "Ein neues Spiel gelangt durch das Intro zur ersten Mission.",
        "Tastaturbewegung und Richtungswechsel wurden geprüft."
      ],
      "limits": [
        "Darstellungsfehler und Diagnosen zu nicht aufgelösten Ressourcen bleiben.",
        "Zuverlässiger Start, Spielstände, korrekter Ton und vollständiges Durchspielen sind ungeprüft."
      ],
      "performance": "8.10–8.97 FPS an der Startposition (zweimal 30 Sekunden; zusammen 8,53 FPS). Im Auto: 7,20 FPS; weiter Stadtblick nach kurzer Fahrt: 3,57 FPS. Performance-Modus, Bloom/Motion Blur aus, Classic Lighting an. Ausgabe 1080p; interne Auflösung vom Spiel bestimmt. Kein durchgehendes Minimum von 8 FPS.",
      "imageAlt": "GTA-III-Spielfigur und Fahrzeug auf der Callahan Bridge nach den Farb- und Reflexionskorrekturen"
    },
    "subnautica-below-zero": {
      "status": "Spielbar · Abschließbar",
      "headline": "Ein neues Spiel erreicht das Startgebiet; Kamerabewegung und Laufen wurden geprüft.",
      "summary": "Wiederholung vom 3. Oktober, PPSA02457 v1.022.125: Der installierte Runner lädt den Survival-Spielstand und zeigt die verschneite Absturzstelle samt HUD. Gemessen wird der aktuelle Build nach den gemeinsamen GTA-III-Rendereränderungen; dieser Durchlauf enthält keine neuen Emulatorfixes.",
      "strengths": [
        "Neues Spiel, Einleitung, Weltanzeige, Kamera und Laufen geprüft."
      ],
      "limits": [
        "Dunkle Beleuchtung, Grafikfehler und lange Pausen bleiben bestehen.",
        "Vollständiges Durchspielen, korrekter Ton und Langzeitstabilität bleiben ungeprüft."
      ],
      "performance": "Neuer Prozess, gleiche Programmdatei und gleicher Survival-Spielstand: Menü 15,50 FPS; zwei unpausierte Messungen mit ruhender Kamera über je 30 Sekunden ergeben 12,70 und 8,50 FPS, zusammen 10,60 FPS. Ausgabe 1080p, Speed, warme Caches. Kein Zehn-Sekunden-Stillstand in diesen Intervallen, aber kürzere Verzögerungen bleiben. Der vorherige Lauf ergab 9,52 FPS im Mittel. Das zeigt Schwankungen zwischen Läufen, keine neue Optimierung; 30 FPS bleiben unerreicht.",
      "imageAlt": "Verschneite Absturzstelle und Survival-HUD in Subnautica: Below Zero bei der Messung am 3. Oktober"
    },

    "terminator-2d-no-fate": {
      status: "Spielbar · Durchspielbar",
      headline: "Bis zum Ende gespielt, ohne gemeldete Fehler.",
      summary:
        "Der Entwickler hat diesen Titel beendet. Hintergründe, Figuren, HUD, Texturen und Farben kommen wie vorgesehen heraus, und seit der Bestätigung am 8. September ist er der stabilste Referenztitel des Projekts.",
      strengths: [
        "Ein vollständiger Durchlauf ohne gemeldete Mängel.",
        "Korrekte Textur-Alpha, Kanalvertauschung und sRGB-Abtastung bewahren die beabsichtigte Farbbalance.",
        "HUD und Figurengrafik werden durchgehend saubergezeichnet.",
      ],
      limits: [
        "Die Bildzeiten schwanken weiter mit der Szene, statt auf einem Wert zu bleiben.",
      ],
      performance:
        "Nach dem Aufwärmen liegen Startbilder zwischen 22 und 65 ms auf dem Referenzrechner.",
      imageAlt:
        "Terminator 2D: No Fate — Spielgeschehen mit Spielfigur, HUD und Wüstenszene, gezeichnet von PS5PCEM",
    },

    "asterix-obelix-slap-them-all": {
      status: "Spielbar · Durchspielbar",
      headline: "Komplett beendet, Intro und Oberfläche beide korrekt.",
      summary:
        "Ein bestätigter Durchlauf. Spielgeschehen und Oberfläche werden richtig herum gezeichnet, und die Introwiedergabe funktioniert. Die abschließende Vollbildkomposition bleibt auf der GPU, und die Bildausgabe behält die Ausrichtung des Gast-Viewports, ohne ein Bild durch den Hostspeicher zu kopieren.",
      strengths: [
        "Vollständiger Durchlauf vom Entwickler bestätigt.",
        "Das Introvideo läuft, Spielgeschehen und Oberfläche sind korrekt ausgerichtet.",
        "Ein Entwicklungslauf über 3.000 Bildwechsel endete ohne eine einzige abgewiesene Einreichung.",
      ],
      limits: [
        "Die Bildkosten hängen von der Szenendichte ab und sind nicht festgeschrieben.",
      ],
      performance: "Das Spielgeschehen liegt typischerweise bei 28–31 ms pro Bild.",
      imageAlt:
        "Asterix & Obelix: Slap Them All! — Spielgeschehen in einem Wald mit HUD und GO-Schild, gezeichnet von PS5PCEM",
    },

    "cat-quest-iii": {
      status: "Spielbar · Durchspielbar",
      headline:
        "Beendet, mit korrekt gezeichneten Menüs, Dialogen und Inselgelände.",
      summary:
        "Ein bestätigter Durchlauf. Menüs, Abenteuerkarten, Dialoge, Inselgelände und Farben stimmen in den aufgenommenen Szenen. Dafür waren Korrekturen an der Weltausrichtung, an Stencil-only-Durchläufen, an der AGC-Interpolantenzuordnung und an der Kanalreihenfolge der Bildausgabe nötig.",
      strengths: [
        "Vollständiger Durchlauf vom Entwickler bestätigt.",
        "Die Sprachliste behält ihren Text und beschneidet ihn innerhalb ihres Felds, statt übermalt zu werden.",
        "Die Abenteuerauswahl zeigt Slot-Artwork, Beschriftungen, Hinzufügen-Schaltflächen und Scrollpfeile.",
      ],
      limits: [
        "Die verbleibende Grenze ist die Bildrate auf der Startinsel, nicht die Korrektheit.",
      ],
      performance:
        "Proben von der Startinsel haben einen Median von 124 ms, etwa 8 FPS, verbessert von rund 148 ms vor der Optimierungsarbeit.",
      imageAlt:
        "Cat Quest III — Inselspiel mit HUD, Bergen und blauem Meer, gezeichnet von PS5PCEM",
    },

    "dreaming-sarah": {
      status: "Spielbar · Durchspielbar",
      headline: "Beendet, und der Anfang läuft an der 60-FPS-Grenze.",
      summary:
        "Am 15. September 2026 als spielbar bestätigt. Menüs, der animierte Titel, Weltszenen, Figuren und NPCs werden alle korrekt gezeichnet, und die erste Szene hält die Bildratengrenze auf dem Referenzrechner.",
      strengths: [
        "Vollständiger Durchlauf vom Entwickler bestätigt.",
        "Titelmenü und erste Szene halten die 60-FPS-Grenze — 5.280 Bildwechsel in 90 Sekunden.",
        "Animierter Titel, Weltszenen und NPCs werden alle korrekt gezeichnet.",
      ],
      limits: [
        "Der Entwickler berichtet von einer fallenden Bildrate in der zweiten Spielszene, die nicht gemessen wurde.",
        "Zum Laden mussten eboot.bin und sce_module/libc.prx aus den Sicherungen wiederhergestellt werden, die der eigene eboot-Patcher der Kopie hinterlassen hatte, nachdem er beide abgeschnitten hatte.",
      ],
      performance:
        "Titelmenü und erste Szene halten 60 FPS, gemessen als 5.280 Bildwechsel über 90 Sekunden.",
      imageAlt:
        "Dreaming Sarah — Waldszene mit einem NPC, gezeichnet von PS5PCEM",
    },

    "jurassic-park-classic-games-collection": {
      status: "Spielbar · Durchspielbar",
      headline:
        "Beendet, samt Intro, animiertem Titel und Sammlungsmenü.",
      summary:
        "Ein bestätigter Durchlauf. Intro, animierter Titel und Sammlungsauswahl funktionieren, mit Cover-Artwork, Navigationspfeilen und einer animierten Vorschau. Die Leistung hängt davon ab, welches Spiel der Sammlung läuft.",
      strengths: [
        "Vollständiger Durchlauf vom Entwickler bestätigt.",
        "Die Sammlungsauswahl zeigt Cover-Artwork, Navigationspfeile und eine animierte Vorschau.",
        "Startdarstellung, Titellogo und Bestätigungsabfrage sind korrekt.",
      ],
      limits: [
        "Wiederholtes Durchblättern der Vorschauvideos kann einen AvPlayer-Handle-Pool erschöpfen, danach bleiben spätere Vorschauen stehen.",
        "Die Bildkosten schwanken je nach Sammlungsspiel und Hardware.",
      ],
      performance:
        "Frühere Titel- und Auswahlbilder wurden mit etwa 27 und 33 ms gemessen.",
      imageAlt:
        "Jurassic Park Classic Games Collection — Spielauswahl mit Cover-Artwork, gezeichnet von PS5PCEM",
    },

    "jets-n-guns-2": {
      status: "Spielbar · Durchspielbar",
      headline:
        "Beendet, mit korrekten Levels, HUD, Punktestand und Parallaxe.",
      summary:
        "Am 15. September 2026 als spielbar bestätigt. Levels, HUD, Punktestand, Gegner und der Parallaxe-Hintergrund werden im aufgenommenen Spielgeschehen korrekt gezeichnet. Die Bildkosten werden von GPU-Wartezeiten und davon bestimmt, dass pro Bild sehr viele Gastpuffer bereitgestellt werden.",
      strengths: [
        "Vollständiger Durchlauf vom Entwickler bestätigt.",
        "Levels, HUD, Punktestand, Gegner und Parallaxe-Ebenen werden alle korrekt gezeichnet.",
        "Der Ton reißt nicht mehr ab: Version 0.3.2 beendete den Streit zweier Ausgabeports um das Hostgerät.",
      ],
      limits: [
        "Die Bildkosten werden weiter von synchronen GPU-Wartezeiten und der Pufferbereitstellung bestimmt.",
      ],
      performance:
        "Bilder messen 70–92 ms, etwa 11–14 FPS. In einem 70-ms-Bild warten 18 ms über 33 Einreichungen auf die GPU, 11 ms bereiten Ressourcen-Prüfpunkte vor und 13 ms stellen 894 verschiedene Gastpuffer mit insgesamt 15 MiB bereit.",
      imageAlt:
        "Jets 'n' Guns 2 — Spielgeschehen mit Spielerschiff, HUD und Punktestand, gezeichnet von PS5PCEM",
    },

    "the-precinct": {
      status: "Titelmenü, Introfilme und ein erstes Bild aus der Engine",
      headline:
        "Spielt beide Introfilme, zeichnet das Titelmenü und beginnt das kalte Laden der Welt.",
      summary:
        "Der vollständige Gastgraph aus sechs Bildern wird gebunden, Unity-Plug-ins starten, und beide beobachteten Introfilme laufen als synchrones 4K-Video mit 48-kHz-Stereoton. Das Titel-Artwork und eine lesbare NEW-GAME-Bestätigung werden gezeichnet, und Halten von Dreieck beginnt das Laden der Welt. Ein früherer abgesicherter Lauf lieferte das erste bestätigte Bild aus der Engine.",
      strengths: [
        "Beide Introfilme laufen als synchrones Video in 3840×2160 mit 48-kHz-Stereoton.",
        "Das volle Titel-Artwork in 1920×1080 und eine lesbare NEW-GAME-Bestätigung werden gezeichnet.",
        "Die Ausnahmezustellung an einen Zielthread vollendet Unitys Stop-the-World-Handschlag.",
      ],
      limits: [
        "Der erste Weltübergang dauert weiter Minuten: Shaderübersetzung bei Erstnutzung, Pipelinekompilierung im Treiber, synchrone Einreichung und Bereitstellung sind alle teuer.",
        "Eine titelspezifische Compiler-Umgehung wurde zugunsten des allgemeinen Shaderpfads entfernt, daher braucht der Übergang eine frische Prüfung von Anfang bis Ende, bevor irgendetwas über Spielgeschehen behauptet wird.",
      ],
      performance:
        "Das Weltlade-Bild messe nun 2,1 s statt 5,1 s, nachdem die Deskriptorwiederherstellung aufhörte, den Prolog jedes Kernels für jede von ihm genannte Ressource erneut abzuspielen.",
      imageAlt:
        "The Precinct — Titelmenü mit NEW-GAME-Bestätigung, gezeichnet von PS5PCEM",
    },

    "ghost-of-yotei": {
      status:
        "Introwiedergabe · Bonushinweise · Helligkeitskalibrierung · erreicht Spielszenen · nicht spielbar",
      headline:
        "Menüs und Baum werden dargestellt, mit sichtbaren Fehlern und sehr niedriger Bildrate.",
      summary:
        "Das ist der schwierigste Testfall des Projekts und der am besten dokumentierte. Introfilme laufen mit Ton, die Bonushinweise und die Helligkeitskalibrierung erscheinen, und spätere 3D-Szenen einschließlich der Baumszene erreichen den Schirm. Spielbar ist davon nichts: Szenenbilder kommen deutlich unter 1 FPS an, und ein Durchspielen wird nicht behauptet.",
      strengths: [
        "Introfilme laufen etwa mit ihren nativen 30 FPS, der Ton beginnt im Takt der Tonspur.",
        "Ladeanzeige, Bonushinweise und der Helligkeitskalibrierungsschirm mit Wolfsbild, Schieber und Eingabeaufforderung werden alle gezeichnet.",
        "Spätere 3D-Szenen einschließlich der Baumszene erreichen den Schirm, Menümusik ist hörbar.",
      ],
      limits: [
        "Spielgeschehen — eine Figur durch eine geladene Welt bewegen — bleibt unbestätigt.",
        "Die Szenenvorbereitung ist äußerst langsam; ein Übergangsbild wurde mit 167,2 s gemessen, davon 164,8 s für das Erzeugen von 206 Compute-Pipelines.",
        "Zwei jüngste Prüfungen blieben vor der Baumszene im Warten auf GPU-Abschluss stehen und wurden nach der Diagnose absichtlich beendet.",
        "Ungültige indirekte Zeichenaufrufe, ein Fehler mit beschädigter Zählung, Streifen und übermäßige Helligkeit sind alle offen.",
      ],
      performance:
        "Basismessungen am Baum vom 3. Oktober vor der Änderung dynamischer Zustände: 0,83–0,97 FPS, jeweils über 30 Sekunden anhand präsentierter Bilder. Die früheren 0,73 FPS sind ein historischer Wert. Gemessen wurden Baum und Einrichtung, nicht das Spiel nach der Zwischensequenz. Unterschiedliche Cache-Verläufe verhindern einen kontrollierten Vorher-nachher-Vergleich.",
      imageAlt:
        "Ghost of Yōtei — Digital-Deluxe-Bonus-Hinweis, gezeichnet von PS5PCEM",
    },

    "quake-ii-2023": {
      status: "Spielbar · Durchspielbar",
      headline: "Beendet, mit wiederhergestellter Beleuchtung, Modellen und Waffen.",
      summary:
        "Am 16. September 2026 als spielbar bestätigt und am 25. September als PPSA09477 v1.003 nachgeprüft. Levelbeleuchtung, Texturen, Waffen und NPCs sind sichtbar: die dunkle Welt und die fehlenden Modelle früherer Builds sind im beobachteten Spielgeschehen behoben. Menüs, HUD und Controllereingabe funktionieren alle.",
      strengths: [
        "Vollständiger Durchlauf vom Entwickler bestätigt, die Darstellung später nachgeprüft.",
        "Beleuchtung, Texturen, Waffen und NPC-Modelle erscheinen; die früheren Mängel mit dunkler Welt und fehlender Geometrie sind weg.",
        "Menüs, HUD und Controllereingabe verhalten sich korrekt.",
      ],
      limits: [
        "Dichte Kampfszenen laufen weiter deutlich unter den Spitzen, die hohen Werte sind also keine Untergrenze.",
        "Die Leistungsarbeit geht weiter.",
      ],
      performance:
        "Der Entwickler berichtet Spitzen von 60–70 FPS in leichteren Szenen, während dichte Kämpfe merklich langsamer bleiben. Pufferwiederverwendung und GPU-Clears senkten den Übertragungsaufwand.",
      imageAlt:
        "Quake II — Spielgeschehen mit beleuchtetem Level, sichtbaren Gegnern und der Waffe des Spielers, gezeichnet von PS5PCEM",
    },

    reanimal: {
      status: "Animiertes 4K-Titelmenü, mit unvollständigen Beschriftungen",
      headline:
        "Spielt die Logosequenz und hält den Renderpfad des animierten Titelmenüs.",
      summary:
        "Die beobachteten nativen und Firmware-Module werden aufgelöst, die Firmenlogo-Sequenz läuft, und das animierte Titelmenü in 3840×2160 zeichnet weiter. Der Bojen-Hintergrund, das Titellogo, die Wasserreflexe und die SELECT-Aufforderung sind sichtbar — die Beschriftungen der Menüpunkte selbst nicht.",
      strengths: [
        "Die Firmenlogo-Sequenz läuft und das animierte 4K-Titelmenü hält durch.",
        "Schmale Unity-UI-Zwischenbilder ersetzen nicht mehr die ganze Bildausgabe.",
        "Dynamische R8-Schriftatlanten verwerfen veraltete abgetastete Bilder korrekt.",
      ],
      limits: [
        "Die mittleren Menübeschriftungen sind auf kleine rote Markierungen reduziert, daher sind Navigation und der Übergang ins Spielgeschehen unbestätigt.",
        "Leistung und Stabilität über längere Läufe sind unvermessen, Spielgeschehen wird nicht behauptet.",
      ],
      imageAlt:
        "REANIMAL — animiertes Titelmenü mit unvollständigen Beschriftungen, gezeichnet von PS5PCEM",
    },

    "ritas-rewind": {
      status: "Spielbar · Durchspielbar",
      headline:
        "Beendet, von der Publisher-Sequenz bis zum Spielgeschehen im Command Center.",
      summary:
        "Am 24. September 2026 als spielbar bestätigt. Publisher-Sequenz, Titelmenü und Spielgeschehen werden gezeichnet und reagieren auf Controllereingaben; die Aufnahme zeigt den Red Ranger in der Trainingsstufe des Command Center mit HUD, Lebensanzeige, Zielen und Tastenhinweisen.",
      strengths: [
        "Vollständiger Durchlauf vom Entwickler bestätigt.",
        "Native kooperative Fibers halten angehaltene Gast-Stacks intakt.",
        "Exaktes Umsetzen von V_SAD_U32, V_MUL_HI_I32 und V_CVT_FLR_I32_F32 entfernte den diagnostischen Shader-Ersatz.",
      ],
      limits: [
        "Die exakte Gast-CRT-Komposition erzeugt auf dem Referenzrechner weiter Rauschen, daher skaliert ein eng zugeschnittener Ersatzpfad die Szene vor der Nachbearbeitung 4× in RGBA8.",
      ],
      performance:
        "Das Intro hält etwa 13–20 ms pro Bild. Dichte Bilder nach dem Menü mit rund 255 Zeichenaufrufen kosten etwa 470 ms, vor allem wegen wiederholter Gastpuffer-Bereitstellung.",
      imageAlt:
        "Mighty Morphin Power Rangers: Rita's Rewind — Spielgeschehen mit dem Red Ranger im Command Center, gezeichnet von PS5PCEM",
    },

    "big-helmet-heroes": {
      status: "Hauptmenü und Tutorial werden gezeichnet · Spielbarkeit unbestätigt",
      headline:
        "Erreicht ein korrektes Hauptmenü und eine Tutorial-Szene, bei einstelliger Bildrate.",
      summary:
        "Der Titel kommt vom Intro zu einem korrekt gezeichneten Hauptmenü mit Figurenmodellen, Texturen, Beleuchtung und Farben und weiter in eine Tutorial-Szene. Korrigiert wurden die Gen5-Texturadressierung mit einfacher Abtastung, geschichtete Renderziele und die Kanalreihenfolge der Bildausgabe. Das Spielgeschehen selbst ist unbestätigt.",
      strengths: [
        "Ein korrektes Hauptmenü mit Modellen, Texturen, Beleuchtung und Farben.",
        "Die Tutorial-Szene wird gezeichnet, nachdem Start- und Ladeblockaden behoben wurden.",
        "Die Ausgabe ist ein klares 1080p, auch wenn interne Ziele größer sein können.",
      ],
      limits: [
        "Spielgeschehen, Wiederherstellung von Spielständen und Stabilität über lange Sitzungen sind alle unbestätigt.",
        "Darstellungsfehler bleiben, und Kopien, Ressourcenvorbereitung und GPU-Wartezeiten bleiben teuer.",
        "30 FPS wurden nicht erreicht.",
      ],
      performance:
        "Vergleichbare Menüproben messen 157 ms, etwa 6,37 FPS; Tutorial-Proben 270 ms, etwa 3,70 FPS. Die neueste Buchhaltungsänderung zeigte keinen belegbaren Gewinn an Bildrate im Spiel.",
      imageAlt: "Big Helmet Heroes — Tutorial-Szene, gezeichnet von PS5PCEM",
    },

    "tetris-effect-connected": {
      status:
        "Entwicklerlogos · lesbarer Lizenzschirm · Auswahl des Journey-Modus · Spielgeschehen unbestätigt",
      headline:
        "Logos, Lizenzschirm und Journey-Auswahl werden gezeichnet, viel schneller als zuvor.",
      summary:
        "Am 24. September 2026 mit PPSA07923 v2.000.022 geprüft. Eine übersetzte Komposition ersetzte die früheren spekulativen 4K-Überschreibungen, und Lizenz- und Menüseiten werden nun ohne die doppelte Oberfläche und die senkrechte Naht früherer Builds gezeichnet. Beide Schirme wurden zudem deutlich günstiger.",
      strengths: [
        "Lizenzschirm und Menüs werden ohne doppelte Oberfläche und ohne senkrechte Szenengrenze gezeichnet.",
        "Das Veröffentlichen linearer Metadatenfüllungen mit DCC-Clears für R11G11B10 und RGB10A2 entfernte angesammelte UI-Kopien.",
        "Ein Profil mit 128 Zielen hält den Arbeitssatz von rund 100 Anhängen, statt einen kleineren Cache zu überlasten.",
      ],
      limits: [
        "Dunkle Oberflächenelemente und eine ungelöste Compute-Texturbindung sind weiter offen.",
        "Spätere Videowiedergabe bricht im Gast-H.264-Decoder ab.",
        "Stabilität über längere Läufe und Spielgeschehen sind nicht belegt.",
      ],
      performance:
        "Die mittleren Lizenzbilder fielen von 235 ms auf 159 ms, etwa von 4,3 auf 6,3 FPS. Abgetastete Journey-Bilder fielen von 1127–1276 ms auf 318–396 ms.",
      imageAlt:
        "Ein frühes Tetris-Effect-Partikelbild, gezeichnet von PS5PCEM",
    },

    "propagation-paradise-hotel": {
      status:
        "Bindet sein Paket ein, öffnet das Shaderarchiv, reicht den ersten Befehlspuffer ein",
      headline: "Vollendet den Unreal-Start bis zur ersten Einreichung.",
      summary:
        "Das 8,8 GiB große Unreal-Paket wird eingebunden, ICU- und Konfigurationsstart vollenden sich, das vorkompilierte globale Shaderarchiv öffnet, AGC-Shader werden erzeugt und der erste Befehlspuffer wird eingereicht. Über ein dargestelltes Bild wird nichts behauptet.",
      strengths: [
        "Das 8,8 GiB große Unreal-Paket wird eingebunden und der Engine-Start vollendet sich.",
        "Das vorkompilierte globale Shaderarchiv öffnet und AGC-Shader werden erzeugt.",
        "Der erste Befehlspuffer erreicht die Einreichung.",
      ],
      limits: [
        "Die Etappe liegt vor den heutigen Synchronisationspaket-Konstruktoren und braucht einen frischen Lauf.",
        "Die VR-Ausgabe hat keine Brücke zu einem Headset am Host, es gibt also nichts, worauf ausgegeben werden könnte.",
      ],
    },

    "pistol-whip": {
      status: "Bindet seine VR-Module ein, lädt dann Unity-Archive",
      headline: "Kommt bis zum Laden der Unity-Datenarchive.",
      summary:
        "Das native PS-VR2-Plug-in und das Burst-Modul werden beide eingebunden, und der Titel beginnt seine Unity-Datenarchive zu laden. Alles darüber hinaus hängt an VR-Unterstützung, die das Projekt bewusst zurückgestellt hat.",
      strengths: [
        "Das native PS-VR2-Plug-in und das Burst-Modul werden erfolgreich eingebunden.",
        "Das Laden der Unity-Datenarchive beginnt.",
      ],
      limits: [
        "Headset-, Tracking-, Controller- und Host-OpenXR-Unterstützung sind bewusst zurückgestellt.",
      ],
    },
  },

  history: {
    "yotei-candidate-visual-check": {
      "title": "Prüfung des Kandidaten: Baum bleibt verschmiert",
      "summary": "Der dritte Lauf misst 1,30 FPS am Baum mit anderen Cache-Budgets, zeigt aber stärkeres Verschmieren. Das Wiederherstellen des Render-Target-Limits behebt dies nicht sichtbar. Der Nutzer beendet den Lauf während der Szenenvorbereitung; Spielgeschehen nach der Zwischensequenz ist nicht bestätigt. Kein verifizierter FPS-Gewinn; der installierte Runner bleibt bis zu einem sauberen Bildvergleich unverändert.",
      "imageAlt": "Prüfung des Kandidaten: Baum bleibt verschmiert"
    },
    "yotei-post-tree-dynamic-state": {
      "title": "Messungen am Baum und Wiederverwendung von Grafik-Pipelines",
      "summary": "Vor der Änderung ergeben Messintervalle am Baum 0,83–0,97 FPS. Zwei Versuche, weiterzukommen, werden nahe dem Windows-Commit-Limit gezielt beendet. Dynamischer Tiefenversatz und Stencil-Referenzwerte entfernen 61 redundante Varianten aus einer Aufnahme von 1.007 Pipelines; GPU-Prüfungen bestehen. Ein FPS-Gewinn im Gameplay ist damit nicht gemessen; die hellen Streifen bleiben.",
      "imageAlt": "Baum bei der Schwierigkeitsauswahl mit weiterhin sichtbaren hellen vertikalen Streifen"
    },
    "little-nightmares-saves-performance": {
      "title": "Speichern und Laden geprüft; 3,73–4,46 FPS im Spiel",
      "summary": "Schreibvorgänge und Dateigrößenänderungen speichern nun echte Daten; Fortsetzen lädt nach einem Neustart den ersten Raum. HTILE, gebündelte GPU-Rücklesevorgänge und vier Kopier-Threads ergeben 4,46 FPS am Koffer und 3,73 FPS nach Bewegung in zwei Messungen von je 30 Sekunden. Die installierte Datei entspricht dem gemessenen Build. 5 FPS, korrekte Materialien und ein zuverlässiger Start bleiben offen; Shader-Lücken und sporadische Speicherfehler sind dokumentiert.",
      "imageAlt": "Six am Koffer im ersten Raum; dunkle Beleuchtung und fehlerhafte reflektierende Materialien bleiben"
    },
    "little-nightmares-gameplay": {
      "title": "Spielszene erreicht: 2,16 FPS gemessen",
      "summary": "Native Compute-Ringe beheben den reproduzierbaren Stopp nach 510 Bildern. Verzögerte Rückschreibung führt danach beim Spielstart zu einem MallocBinned3-Fehler; ein neuer Lauf mit sofortiger Rückschreibung erreicht steuerbares Gameplay und 3.540 Bilder vor dem manuellen Testende. Zwei 30-Sekunden-Messungen liefern je 65 Bilder: zusammen 2,16 FPS. Das Spielprofil wählt sofortige Rückschreibung automatisch. Grafikfehler und leere Speicherdateien bleiben.",
      "imageAlt": "Six mit Feuerzeug im ersten Raum; Materialien und Beleuchtung sind noch fehlerhaft"
    },
    "little-nightmares-startup": {
      "title": "Titelbildschirm nach Start- und Deskriptorkorrekturen wieder sichtbar",
      "summary": "Trinity- und IPMI-Importe, native Grafikereignisse und die Prüfung von Dispatch-Größen wurden ergänzt. Die BITSET-Korrektur stellt Titelbildschirm und Ersteinrichtung wieder her. Zwei Starts erreichen den Titel; Gameplay und Langzeitstabilität sind nicht geprüft. Ein Wiederholungslauf endet nach 120 Sekunden Warten auf den Render-Thread während der Ersteinrichtung; Stabilität ist nicht bestätigt.",
      "imageAlt": "Little Nightmares Enhanced Edition mit Titel und Press-X-Aufforderung in PS5PCEM"
    },
    "subnautica-performance-repeat-2": {
      "title": "Zweite Leistungsmessung nach einem Neustart",
      "summary": "Neuer Prozess, gleiche Programmdatei und gleicher Survival-Spielstand: Menü 15,50 FPS; zwei unpausierte Messungen mit ruhender Kamera über je 30 Sekunden ergeben 12,70 und 8,50 FPS, zusammen 10,60 FPS. Ausgabe 1080p, Speed, warme Caches. Kein Zehn-Sekunden-Stillstand in diesen Intervallen, aber kürzere Verzögerungen bleiben. Der vorherige Lauf ergab 9,52 FPS im Mittel. Das zeigt Schwankungen zwischen Läufen, keine neue Optimierung; 30 FPS bleiben unerreicht.",
      "imageAlt": "Verschneite Absturzstelle und Survival-HUD in Subnautica: Below Zero bei der Messung am 3. Oktober"
    },
    "subnautica-performance-repeat": {
      "title": "Erneute Leistungsmessung mit dem aktuellen Runner",
      "summary": "Wiederholung vom 3. Oktober, PPSA02457 v1.022.125: Der installierte Runner lädt den Survival-Spielstand und zeigt die verschneite Absturzstelle samt HUD. Gemessen wird der aktuelle Build nach den gemeinsamen GTA-III-Rendereränderungen; dieser Durchlauf enthält keine neuen Emulatorfixes. Hauptmenü: 14,67 FPS. Zwei unpausierte Messungen mit ruhender Kamera über je 30 Sekunden: 7,27 und 11,77 FPS; zusammen 9,52 FPS. Die erste enthält einen Stillstand von 9,998 Sekunden. Ausgabe 1080p, Speed-Preset, warme Caches. Der frühere gültige Wert war 7,93 FPS, jedoch ist dies kein kontrollierter Beschleunigungsvergleich. 30 FPS bleiben unerreicht.",
      "imageAlt": "Verschneite Absturzstelle und Survival-HUD in Subnautica: Below Zero bei der Messung am 3. Oktober"
    },
    "gta3-renderer-performance": {
      "title": "Farben, Reflexionen und Ressourcenvorbereitung korrigiert",
      "summary": "Der aktualisierte installierte Runner erreicht Give Me Liberty mit steuerbarer Spielfigur. Messungen der Startposition ergeben 8.10–8.97 FPS im Performance-Modus, mit Bloom und Motion Blur aus und Classic Lighting an. Gemeinsame Skalaranalysen, GPU-interne Texturkopien und geringerer Verwaltungsaufwand ergänzen die Grafikfixes. Der Bericht nennt Einstellungen, langsamere Messungen und Prüfgrenzen; vollständige Spielbarkeit ist nicht belegt.",
      "imageAlt": "GTA-III-Spielfigur und Fahrzeug auf der Callahan Bridge nach den Farb- und Reflexionskorrekturen"
    },
    "gta3-ngg-gameplay": {
      "title": "NGG-Exporte korrigiert; erste Mission und Bewegung bestätigt",
      "summary": "Der installierte Runner erreicht Give Me Liberty mit sichtbarer Welt, Spielfigur, Fahrzeug, HUD und Minikarte. W bewegt die Figur, D ändert ihre Richtung. Die allgemeine NGG-Korrektur stellt alle 32 Farbkorrekturebenen wieder her. Gemessen wurden 0,97 FPS; grüne Überbelichtung, fehlende Ressourcen sowie sporadische Abstürze und Zeitüberschreitungen bleiben.",
      "imageAlt": "GTA-III-Spielfigur läuft auf der Callahan Bridge zu einem Auto; HUD und starke grüne Überbelichtung sind sichtbar"
    },
    "gta3-ampr-startup": {
      "title": "AMPR-Importe aufgelöst; Richtlinienbildschirm erreicht",
      "summary": "Entwicklungsstand vom 2. Oktober, PPSA03527 v1.007: 13 fehlende AMPR-Importe sind aufgelöst. Zwei neue Prozesse erreichen den lesbaren Richtlinienbildschirm, nachdem Cross den zunächst leeren Bildschirm weitergeschaltet hat. Der Richtlinienbildschirm zeigt etwa 30 FPS. Die Gameplay-Leistung wurde nicht gemessen. Gameplay, Speicherstände und Audiokorrektheit sind ungeprüft. Shader-Diagnosen und unvollständige Warte-/Zähleremulation bleiben.",
      "imageAlt": "GTA III mit dem von PS5PCEM gerenderten Rockstar-Richtlinienbildschirm"
    },
    "gta3-pkg-extraction": {
      "title": "NAPS-Ausrichtung korrigiert; Paket vollständig extrahiert",
      "summary": "Alle 48 Dateien werden extrahiert, darunter eboot.bin, sechs Module und zwei PAK-Archive. Beide PAK-Indexprüfsummen stimmen überein; alle 21 Pakettests bestehen. Der Start wurde separat geprüft."
    },
    "subnautica-startup": {
      title: "Startabsturz auf einen falsch gelesenen Shader-Header zurückgeführt",
      summary:
        "Frühe Läufe blieben an derselben Gastadresse stehen. Unitys Shader-Leser hatte vier Byte Mesh-Daten als vorzeichenbehaftete Stringlänge genommen und einen Terminator in nicht zugeordneten Speicher geschrieben. Die Korrektur des dahinterliegenden Dateideskriptor-Verhaltens brachte den Titel über den Start hinaus.",
    },
    "subnautica-menu-missing": {
      title: "Das Menü fehlte, weil die Audio-Initialisierung hängen blieb",
      summary:
        "Der animierte Hintergrund lief schon, doch kein Menü erschien: die Plattform-Initialisierungs-Koroutine war in FMOD stehen geblieben, sodass die Dienste, auf die der Startschirm wartet, für immer leer blieben. Dies waren die letzten Messungen aus der 4K-Zeit vor dem Wechsel auf natives 1080p.",
      imageAlt:
        "Titelschirm von Subnautica: Below Zero ohne Menü, gezeichnet von PS5PCEM",
    },
    "subnautica-native-1080p": {
      title: "Native 1080p-Ausgabe und günstigere Ressourcenvorbereitung",
      summary:
        "Die Ausgabe wechselte auf natives 1920×1080, und der gemeinsame Grafikpfad hörte auf, bei Ressourcenvorbereitung und skalarer Interpretation Strukturen dekodierter Befehle herumzukopieren. Play, Options und Credits sind lesbar; Wasser- und Beleuchtungsfehler bleiben.",
      imageAlt:
        "Menü von Subnautica: Below Zero in nativem 1080p, gezeichnet von PS5PCEM",
    },
    "subnautica-menu-performance": {
      title: "Eine Reihe CPU-seitiger Einsparungen im gemeinsamen Zeichenpfad",
      summary:
        "Indexbereitstellung, Pipelinesuche, skalare Registerschnappschüsse, Warteschlangenabfragen und die Initialisierung des Arbeitsspeichers wurden jeweils günstiger, alles ohne titelspezifische Bedingung. Das Menü landete bei rund 17 FPS — weiter weit entfernt vom Ziel von 30 FPS.",
      imageAlt:
        "Menü von Subnautica: Below Zero aus dem gemessenen Entwicklungsbuild, gezeichnet von PS5PCEM",
    },
    "subnautica-new-game": {
      "title": "Neues Spiel erreicht das Startgebiet",
      "summary": "Entwicklungsbuild vom 1. Oktober, PPSA02457 v1.022.125: Der Überlebensmodus lädt die Welt, spielt die Einleitung ab und zeigt die verschneite Absturzstelle mit HUD. Die Korrekturen verhindern veraltete GPU-Rückschreibungen in CPU-Speicher, wiederholte Zugriffe auf freigegebene Puffer und das Löschen der Farbe durch Tiefenpässe. Dieser Test umfasste keinen vollständigen Durchlauf, keine Wiederherstellung von Spielständen und keine Prüfung der Audiokorrektheit.",
      "imageAlt": "Verschneites Startgebiet von Subnautica: Below Zero mit Überlebens-HUD, aufgenommen in PS5PCEM"
    },
    "subnautica-lighting-baseline": {
      "title": "Beleuchtungsprüfung: Laden bleibt instabil",
      "summary": "Drei weitere Läufe des vorherigen Builds scheiterten beim Laden oder beim Übergang in die Spielwelt, nachdem zwei frühere Läufe das Gameplay erreicht hatten. Ein Arbeitsthread kann stoppen, während Audio weiterläuft und das Fenster schwarz bleibt. Das alte Protokoll bestätigt außerdem, dass ein 1×1-Mip die 512×512-Basistex­tur fälschlich aktualisierte. Diese Fehler stehen getrennt vom erfolgreichen Lauf; stabiles Laden ist noch nicht bestätigt."
    },
    "subnautica-colour-mips": {
      "title": "Farb-Mip-Abtastung auf der GPU korrigiert",
      "summary": "Die Suche nach residenten Texturen unterscheidet jetzt Mip-Stufen und Array-Schichten. Vollständige Farbpyramiden lassen sich auf der GPU zusammensetzen. Ein RG32F-Test mit sechs Stufen prüft die Werte, eine Änderung im selben Frame und die Abtastung ohne zusätzliche Rücklesungen oder Textur-Uploads; 128 gezielte Tests bestehen. Das Spiel scheitert weiterhin beim Laden, auch synchron und mit 8192 Cache-Einträgen. Mehr FPS in der Spielwelt und das endgültige Beleuchtungsergebnis sind noch nicht bestätigt."
    },
    "subnautica-windows-stack": {
      "title": "Windows-Stackgrenzen beheben den Startabbruch bei Diagnoseausgaben",
      "summary": "Ein Minimalbeispiel endete mit 0x40010006 bei Windows-Diagnoseausgaben auf dem Firmware-Stack. Der Wechsel aktualisiert nun Windows-Stackgrenzen; Gastausstiege stellen den umgebenden HLE-Zustand wieder her. ANSI/Unicode-Ausgaben, 8 Stack- und 9 Bridge-Tests bestehen. Der installierte Build startet ohne Debugger oder TEMP-Umleitung und lädt den Spielstand. Ohne Pause wurden 7.93 FPS über 30.02 Sekunden gemessen. Kein kontrollierter Leistungsvergleich; 30 FPS, vollständige Grafiktreue und Langzeitstabilität bleiben unbestätigt.",
      "imageAlt": "Subnautica: Below Zero — Windows stack-boundary fix, 2026-10-02"
    },
    "subnautica-resource-scratch": {
      "title": "Weniger Ressourcenaufwand; Stencil-Warnung zugeordnet",
      "summary": "Große indirekte Texturtabellen belegen nicht mehr den Stack gewöhnlicher Draw-/Dispatch-Aufrufe. Die Zeigerauflösung teilt einen unveränderlichen Registerzustand und initialisiert nur den benötigten Bitmap-Bereich. 72 Tests und gezielte Vulkan-Prüfungen bestehen. Ein neuer Prozess lädt den Spielstand: 11.96 FPS über 30.01 Sekunden ohne Pause. Wetter und Aufwärmzustand verhindern einen kontrollierten Vergleich; 30 FPS sind nicht erreicht. Die verbleibende Ressourcenwarnung gehört zu einem Stencil-Durchlauf ohne Farbschreibzugriff. Vollständige Grafik- und Langzeitstabilität bleiben unbestätigt. Eine gesonderte Analyse zeigt wiederholte 4-MiB-Abbildungen unter der Speichersperre. Wiederverwendete Seitenzusagen und weniger native Abfragen senken den Median im Abbildungs-Mikrotest um 18%; ein Spielgewinn ist nicht belegt.",
      "imageAlt": "Subnautica: Below Zero — resource preparation build, 2026-10-02"
    },
    "subnautica-descriptor-unmap": {
      "title": "Wiederverwendbarer Deskriptorspeicher und sicherere Unmap-Fehler",
      "summary": "Texturdeskriptoren verwenden temporäre Arrays erneut: Der Stack sinkt von 753.720 auf 56 Byte bei unverändertem Vulkan-Batch. Ein separater Test behebt Unmap-Fehler, nach denen entfernte native Seiten noch als lesbar galten. 154 Renderer-/Indextests, 29 Speichertests und 60 Übermittlungstests bestehen, ebenso Vulkan-Prüfungen mit 4352 Texturansichten. Der erste frische Lauf lädt den Spielstand; eine unbewegte Szene erreicht ohne Pause 12,03 FPS über 30,01 Sekunden. Wetter und Aufwärmzustand erlauben keinen kontrollierten Geschwindigkeitsvergleich. Eine skalare Ressource bleibt ungeklärt. 30 FPS, zuverlässiges Laden und ein vollständiger Durchlauf sind nicht bestätigt.",
      "imageAlt": "Subnautica: Below Zero — unpaused 12.03 FPS sample, 2026-10-02"
    },
    "subnautica-read-lease": {
      "title": "Kleinerer Draw-Stack und geschützte Speicherzugriffe",
      "summary": "Wiederverwendbarer Skalarspeicher verkleinert den Stack der Zeichenfunktion von 447.424 auf 32.640 Byte. Ein weiterer Absturz beim Hashen zeigte eine Lücke zwischen Prüfung und Lesen: GPU-Kopien und Hashes halten die Speicherzuordnung jetzt bis zum Abschluss. Der Test mit paralleler Freigabe, 34 Speicher-/Puffer-/Indextests und 60 Übermittlungstests bestehen. Der erste Folgelauf lädt die gespeicherte Welt mit 8,63 FPS über 30,01 Sekunden ohne Pause. Wetter und Aufwärmzustand verhindern einen direkten Vergleich mit früheren 10,00 FPS. Eine Shader-Ressource bleibt ungeklärt; 30 FPS und Langzeitstabilität sind nicht bestätigt. Ein frischer Wiederholungslauf mit derselben Programmdatei stürzt beim Laden erneut in hash + 0xf0 ab. Der Test für geschütztes Lesen besteht, dieser beobachtete Absturz ist jedoch nicht behoben; die aufrufende Stelle wird untersucht.",
      "imageAlt": "Subnautica: Below Zero — guest read lease build, 2026-10-02"
    },
    "subnautica-overlap-world": {
      "title": "Zweite Wiederherstellung und Messung der Pufferüberschneidungen",
      "summary": "Ein neuer Prozess lädt denselben Spielstand nach der Korrektur der Pufferzuordnung erneut. Begrenzte Indexabfragen ersetzen vollständige Durchläufe; Schreibreihenfolge und das Limit von 4096 Puffern bleiben erhalten. Ein pausierter ABBA-Vergleich ergibt 11,93–12,23 FPS linear und 12,30–12,43 mit Index, keinen belegten allgemeinen Gewinn. Eine separate Messung ohne Pause bei fester Kamera ergibt 300 Bilder in 30,01 Sekunden: 10,00 FPS bei wechselndem Wetter und Kälteeffekt. 154 Backend-/Indextests und fünf Vulkan-Prüfungen bestehen. 30 FPS, Langzeitstabilität und vollständig korrekte Grafik bleiben offen.",
      "imageAlt": "Subnautica: Below Zero — unpaused world, 2026-10-02"
    },
    "subnautica-save-recovery": {
      "title": "Gespeicherte Welt lädt nach Korrektur der Pufferzuordnung",
      "summary": "Eine protokollierte GPU-Rückkopie von 6 MiB überlappte beim Laden ein beschädigtes Spielobjekt. Der Puffercache verfolgt nun die Lebensdauer der Zuordnung und verwirft alte Ergebnisse bei neuer Belegung derselben Adresse. Der erste Folgelauf stellt die gespeicherte Schneewelt wieder her und reagiert auf Bewegung. Das belegt noch keine Langzeitstabilität. 29 Speicher-/Lebensdauertests, 60 Übermittlungstests und vier Vulkan-Prüfungen bestehen. Ein größerer Cache ergab 9,93 → 9,10 FPS in derselben pausierten Szene; der Standard bleibt unverändert. 30 FPS sind nicht erreicht.",
      "imageAlt": "Subnautica: Below Zero — recovered world, 2026-10-02"
    },
    "subnautica-save-metadata": {
      "title": "Speicherdaten und Metadaten korrigiert; Laden der Welt schlägt noch fehl",
      "summary": "Normales Speichern schreibt ein Archiv mit 213.388 Bytes, bestätigt es und kehrt ins Spiel zurück. Ein neuer Prozess erkennt den Spielstand mit korrektem Datum und Spielzeit, ohne Beschädigungswarnung. Allgemeine Korrekturen betreffen POSIX-Dateischreibzugriffe und die vollständige Parameterstruktur; 52 Speicher- und Dateisystemtests bestehen. Beim Wiederherstellen der Welt tritt weiterhin Speicherkorruption auf. Eine separate Prüfung freigegebener Befehlspuffer besteht 60 Tests; ihr Zusammenhang mit dem Ladefehler ist nicht belegt."
    },
    "subnautica-vector-walk": {
      "title": "Weniger CPU-Arbeit beim Shader-Durchlauf; Spielwelt bei 7 FPS",
      "summary": "Die CPU-Ressourcenanalyse überspringt reine Vektorinterpretation, behält aber Abhängigkeitsprüfungen und GPU-Befehle bei. Eine separate Korrektur verwirft beide Wörter geschriebener Vektormasken. 71 Skalartests und neun GPU-Prüfungen bestehen. Isolierte Durchläufe benötigen 15–36% weniger Zeit; die letzte 30-Sekunden-Weltmessung ergibt 7,00 FPS, ohne kontrollierten Leistungsnachweis. Kopieren, Ressourcenaufbereitung und Befehlsübermittlung bleiben teuer. Tastatureingaben beachten jetzt den Fensterfokus. Ladefehler, eine ungeklärte Bindung und das 30-FPS-Ziel bleiben offen.",
      "imageAlt": "Subnautica: Below Zero — 1920×1080 gameplay, 2026-10-02"
    },
    "subnautica-srgb-spans": {
      "title": "sRGB-Farbausgabe korrigiert; Mip-Prüfungen nutzen gespeicherte Bereiche",
      "summary": "Der erfasste G-Buffer und die finale Ausgabe verlangten sRGB, verwendeten aber UNORM-Anhänge. Das anschließende Lesen als sRGB verdunkelte die Farben. Der Renderer kodiert nun die Farbausgabe und erhält die kodierten Bytes bei der Anzeigeübertragung. Ein GPU-Test prüft Sampling, Alpha und Scanout mit Vulkan-Validierung; 129 gezielte Tests bestehen. Mip-Prüfungen verwenden berechnete Speicherbereiche erneut. Spieltests und verbleibende Grenzen stehen im Bericht. Der neue Lauf erreicht die verschneite Spielwelt mit sichtbar helleren Materialien und misst 9,49 FPS über 30,05 Sekunden (Basislauf: 9,13 FPS). Unterschiedliche Wetter- und Partikeleffekte erlauben keinen kontrollierten Leistungsnachweis; 30 FPS, eine ungeklärte Skalarbindung und sporadische Ladefehler bleiben offen.",
      "imageAlt": "Verschneite Absturzstelle und Überlebensanzeige in Subnautica Below Zero nach der Korrektur der sRGB-Farbausgabe"
    },
    "subnautica-mip-coherence": {
      "title": "Mip-Speicher: wiederholte Transfers beseitigt",
      "summary": "Die Spielaufzeichnung zeigte zehn RG32F-Mip-Rücklesevorgänge pro Frame (2730 KiB) und erneute Uploads. Die Speicherprüfung unterscheidet nun bestätigte GPU-Schreibvorgänge von CPU-Ersetzungen. Vier Vulkan-Fälle mit linearen/gepackten Mips und Speicherüberwachung sowie 129 gezielte Tests bestehen. Im neuen Lauf entfallen im Menü die Uploads und Rücklesevorgänge für Farbziele; die zehnstufige Pyramide bleibt auf der GPU. Dunkle Beleuchtung, sporadische Ladefehler und das Ziel von 30 FPS bleiben offen. Der Kandidat erreicht die Schneeszene: 260 Frames in 30,01 Sekunden ohne Bewegung ergeben 8,66 FPS. Eine Steigerung der Gesamtbildrate ist nicht belegt.",
      "imageAlt": "Verschneite Absturzstelle und HUD in Subnautica: Below Zero nach der Mip-Korrektur; dunkle Beleuchtung bleibt"
    },

    "yotei-intro-video": {
      title: "Das Introvideo wird dekodiert und abgespielt",
      summary:
        "H.264-Zugriffseinheiten, die der Titel an die Gast-Videobibliothek übergibt, werden nun auf dem Host dekodiert, aus NV12 mit BT.709-Koeffizienten umgewandelt und mit etwa einem Bild pro Anzeigeintervall ausgegeben, damit ein Titel, der Bilder so schnell nachschiebt, wie sie angenommen werden, nicht mehr einen ganzen Film in Sekunden verbraucht. Das Engine-Bild hinter dem Video war noch schwarz, dies war also nur eine Wiedergabe-Etappe.",
      imageAlt:
        "Ein Introbild von Ghost of Yōtei, dekodiert und dargestellt von PS5PCEM",
    },
    "yotei-bonus-notices": {
      title: "Durch das Intro zu den Bonushinweisen und zur Helligkeitskalibrierung",
      summary:
        "Die Introwiedergabe wurde durchgehend bei etwa den nativen 30 FPS des Streams, und der Lauf kam über das Streamen der Menüressourcen zur Ladeanzeige, zu den Hinweisen Digital Deluxe Bonus, Gift of the Northern Star und Pre-order Bonus und zur Helligkeitskalibrierung — Wolfsbild, Anweisungen, Schieber und Bestätigungszeichen alle lesbar.",
      imageAlt:
        "Helligkeitskalibrierungsschirm von Ghost of Yōtei mit dem Wolfsbild, gezeichnet von PS5PCEM",
    },
    "yotei-difficulty": {
      title: "Die Schwierigkeitswahl wird über einer geladenen 3D-Szene gezeichnet",
      summary:
        "Die Menükomposition erreichte die Schwierigkeitswahl, gezeichnet über echter 3D-Geometrie, mit sichtbaren Bäumen und Teilen des Hintergrunds und spielender Menümusik. Dorthin brauchte es mehrere Minuten Intro und Szenenladen, und die Bilder kamen mit 0,6 FPS an.",
      imageAlt:
        "Schwierigkeitswahl von Ghost of Yōtei über einer geladenen 3D-Szene, gezeichnet von PS5PCEM",
    },
    "yotei-tree-scene": {
      title: "Filmton funktioniert und spätere 3D-Szenen erscheinen",
      summary:
        "Introfilme bekamen Ton, der im Takt der Tonspur beginnt statt stumm zu bleiben, nachdem mehrkanaliges ATRAC9 als verschachtelte Monoströme über Layouts von 2 bis 36 Kanälen dekodiert wurde. Der Lauf erreichte spätere 3D-Szenen einschließlich der Baumszene, mit 0,73 FPS, und die folgende Ladesequenz verlor das Vulkan-Gerät.",
      imageAlt: "Baumszene von Ghost of Yōtei, gezeichnet von PS5PCEM",
    },
    "yotei-command-writes": {
      title: "Befehlsprozessor-Schreibzugriffe überleben verzögertes Zurücklesen",
      summary:
        "Ein ausdrücklicher Befehlsprozessor-Schreibzugriff in einem zwischengespeicherten Speicherpuffer konnte verloren gehen, wenn ein älteres GPU-Ergebnis darüber veröffentlicht wurde, weil der Flush-Pfad nur die Basisadresse eines Puffers abglich. Das Indexieren überlappender Puffer und das Veröffentlichen nur bewiesener Schreibbereiche behob die daraus entstandene Header-Beschädigung.",
      imageAlt:
        "Baumszene von Ghost of Yōtei nach den Befehlsschreib-Korrekturen, gezeichnet von PS5PCEM",
    },
    "yotei-null-images": {
      title:
        "Vollständig leere Texturen gelten als ungebunden, und schnellere Deskriptorwiederherstellung",
      summary:
        "Texturen, die beweisbar ganz aus Nullen bestehen, nutzen nun Semantik ungebundener Bilder, statt den Shader abzulehnen, und die skalare Deskriptorwiederherstellung verwendet Zwischenwerte innerhalb eines Aufrufs erneut — ein verschachtelter Testfall fiel von 504 Leseoperationen auf 18 und lief isoliert etwa 4,6× schneller. Zwei Prüfungen des installierten Runners blieben dennoch vor der Baumszene im Warten auf GPU-Abschluss stehen und wurden nach der Diagnose absichtlich beendet.",
      imageAlt:
        "Digital-Deluxe-Bonus-Hinweis von Ghost of Yōtei vor der GPU-Wartezeit am 1. Oktober, gezeichnet von PS5PCEM",
    },

    "bhh-startup": {
      title: "Ein endloses Warten während des Ladens, behoben",
      summary:
        "Der Titel konnte beim ersten schwarzen Bild oder mitten im Laden der Ressourcen stehen bleiben, während sein Prozess und seine Audiothreads weiterliefen: der Ladethread wartete endlos, nachdem ein Dateilesevorgang einen E/A-Fehler zurückgab. Das korrekte Behandeln GPU-beobachteter Dateilesevorgänge löste die Blockade.",
      imageAlt:
        "Hauptmenü von Big Helmet Heroes nach der Startkorrektur, gezeichnet von PS5PCEM",
    },
    "bhh-menu": {
      title: "Ein korrektes Hauptmenü, und wohin die Zeit geht",
      summary:
        "Mit korrigierter Gen5-Texturadressierung bei einfacher Abtastung, geschichteten Renderzielen und Kanalreihenfolge der Bildausgabe wird das Menü richtig gezeichnet, samt Figurenmodellen, Texturen und Beleuchtung. Die Profilierung verortete die Kosten im Grafik-Backend des Hosts — Ressourcenvorbereitung, Kopien von Gastspeicher nach Vulkan und Synchronisation — und nicht in der Pipelinekompilierung.",
      imageAlt:
        "Hauptmenü von Big Helmet Heroes mit Figurenmodellen und Beleuchtung, gezeichnet von PS5PCEM",
    },
    "bhh-copies": {
      title: "Breitere Kachelkopien, günstigere Verdrängung und gruppierte Seitenwächter",
      summary:
        "Der Layoutwandler kopiert nun einen vollen waagerechten 16-Byte-Lauf, wann immer seine Adressgleichung beweist, dass diese Bytes zusammenhängen, statt Pixel für Pixel zu bewegen. Die Verdrängung aus dem Puffercache hörte auf, alle 4.096 Einträge zu durchsuchen, benachbarte Gastseiten werden in Gruppen beobachtet, und abgeschlossene Vulkan-Puffer werden wiederverwendet.",
      imageAlt:
        "Tutorial-Szene von Big Helmet Heroes nach den Kopieroptimierungen, gezeichnet von PS5PCEM",
    },
    "bhh-scalar-history": {
      title: "Skalare Buchhaltung gekürzt, ohne Gewinn an Bildrate",
      summary:
        "Ressourcen-Prüfpunkte trugen keine unbenutzte Historie skalarer Ladevorgänge mehr, und die vollständige skalare Analyse vermeidet überflüssige Durchläufe bei Vorwärtsbesuchen. Isolierte Testfälle wurden 9–45 % günstiger, doch vergleichbare Spielproben blieben praktisch unverändert — 157 ms im Menü gegen 154,5 ms in der Kontrolle — und der Bericht sagt das unverblümt.",
      imageAlt:
        "Tutorial von Big Helmet Heroes nach der Änderung der skalaren Ladebuchhaltung, gezeichnet von PS5PCEM",
    },

    "quake-playable": {
      title: "Spielbar und durchspielbar",
      summary:
        "Der Entwickler bestätigte einen vollständigen Durchlauf. Die Arbeit dahinter betraf Startimporte und Verzeichnislisten, verzögerte G-Buffer-Schreibzugriffe, Sampler für Tiefenvergleiche und die typisierten Pufferlesezugriffe, von denen Modellvertices und Beleuchtungsdaten abhängen. Fehlende NPC-Geometrie kam zurück.",
      imageAlt: "Titelschirm von Quake II, gezeichnet von PS5PCEM",
    },
    "quake-rendering": {
      title: "Darstellung nachgeprüft, mit Spitzen von 60–70 FPS",
      summary:
        "Eine Nachprüfung als PPSA09477 v1.003 fand Levelbeleuchtung, Texturen, Waffen und NPCs alle sichtbar, womit die früheren Meldungen über dunkle Welt und fehlende Modelle erledigt sind. Pufferwiederverwendung und GPU-Clears senkten den Übertragungsaufwand; leichtere Szenen erreichen Spitzen von 60–70 FPS, während dichte Kämpfe langsamer bleiben.",
      imageAlt:
        "Quake II — Spielgeschehen mit beleuchtetem Level, sichtbaren Gegnern und der Waffe des Spielers, gezeichnet von PS5PCEM",
    },

    "tetris-first-render": {
      title: "Das erste erkennbare Bild aus dem Startgraphen",
      summary:
        "595 Gast-Zeichenaufrufe und 63 Compute-Dispatches liefen ohne abgewiesenen Zeichenaufruf durch und erzeugten das erste erkennbare Partikelbild. Weil das angemeldete 4K-Ausgabeziel noch schwarz war, fiel die Darstellung auf das Umwandeln eines 1920×1080-Zwischenbilds zurück — eine frühe Rendering-Etappe, kein Menü.",
      imageAlt:
        "Das erste erkennbare Tetris-Effect-Partikelbild, gezeichnet von PS5PCEM",
    },
    "tetris-license-journey": {
      title: "Lizenzschirm und Journey-Auswahl, mehrfach schneller",
      summary:
        "Eine übersetzte Komposition ersetzte die spekulativen 4K-Überschreibungen, und das Veröffentlichen linearer Metadatenfüllungen entfernte die doppelte Oberfläche und die senkrechte Naht. Die mittleren Lizenzbilder fielen von 235 ms auf 159 ms und abgetastete Journey-Bilder von 1127–1276 ms auf 318–396 ms. Dunkle UI-Elemente und ein Gast-Decoder-Fehler bleiben.",
    },

    "rita-intro-menu": {
      title: "Publisher-Intro, Titelmenü und die Szene dahinter",
      summary:
        "Der Titel fand in eine stabile Grafik- und Audioschleife in 1920×1080 und zeichnete seine animierte Publisher-Sequenz, das Titelmenü und die Szene nach dem Menü. Die Szene kommt aus einem echten 480×270-Gastziel und wird durch die CRT- und Nachbearbeitungskette geführt, was das frühere Vollbildrauschen ersetzte.",
      imageAlt:
        "Publisher-Intro von Mighty Morphin Power Rangers: Rita's Rewind, gezeichnet von PS5PCEM",
    },
    "rita-playable": {
      title: "Spielbar und durchspielbar",
      summary:
        "Der Entwickler bestätigte am 24. September einen vollständigen Durchlauf. Die Aufnahme zeigt den Red Ranger in der Trainingsstufe des Command Center mit HUD, Lebensanzeige, Zielen und Tastenhinweisen, alle reagieren auf Controllereingaben. Der eng zugeschnittene CRT-Skalierungsersatz ist auf dem Referenzrechner weiter nötig.",
      imageAlt:
        "Rita's Rewind — Spielgeschehen mit dem Red Ranger im Command Center, gezeichnet von PS5PCEM",
    },

    "jets-tutorial": {
      title: "START GAME erreicht das Tutorial in 4K",
      summary:
        "Die Titelinhalte wurden aufgelöst, die AGC-Ressourcenanmeldung vollendet und die vollständige Grafik-, Compute- und Ausgabeschleife gehalten. START GAME kam über den Ladeschirm in erkennbares Tutorial-Spielgeschehen in 3840×2160, und ein unbeaufsichtigter Lauf blieb über Bildwechsel 300 hinaus lebendig.",
      imageAlt: "Tutorial-Spielgeschehen von Jets 'n' Guns 2, gezeichnet von PS5PCEM",
    },
    "jets-playable": {
      title: "Spielbar und durchspielbar",
      summary:
        "Der Entwickler bestätigte einen vollständigen Durchlauf. Levels, HUD, Punktestand, Gegner und die Parallaxe-Szene werden alle korrekt gezeichnet. Die Profilierung eines 70-ms-Bilds fand 18 ms Warten auf die GPU über 33 Einreichungen, 11 ms für Ressourcen-Prüfpunkte und 13 ms für die Bereitstellung von 894 Gastpuffern.",
      imageAlt:
        "Jets 'n' Guns 2 — Spielgeschehen mit Spielerschiff, HUD und Punktestand, gezeichnet von PS5PCEM",
    },
    "jets-audio": {
      title: "Der Ton reißt sich nicht mehr selbst ab",
      summary:
        "Zwei aktive Ausgabeports hatten um das Audiogerät des Hosts gestritten, den Mix abgebaut und das Gerät mehrmals pro Bild neu geöffnet. Version 0.3.2 behob die Weiterleitung; der bestehende Status spielbar und durchspielbar blieb davon unberührt.",
    },

    "cat-quest-render-fixes": {
      title:
        "Eine kopfstehende Welt, verfälschter Text und vertauschte Farben, alle behoben",
      summary:
        "Die Welt wurde kopfstehend gezeichnet, die Oberfläche nicht; Fragmentabdeckung und Stencil-only-Durchläufe verfälschten Menütext; die ursprüngliche AGC-Schnittstelle für Interpolantenzuordnung fehlte, sodass Abenteuer-Artwork und Kulissen die falschen Vertex-zu-Fragment-Exporte nutzten; und angemeldete Ausgabeformate wurden ignoriert, was Rot und Blau vertauschte. Alle vier wurden korrigiert.",
      imageAlt:
        "Sprachliste von Cat Quest III mit lesbarem, innerhalb des Felds beschnittenem Text, gezeichnet von PS5PCEM",
    },
    "cat-quest-playable": {
      title: "Spielbar und durchspielbar",
      summary:
        "Der Entwickler bestätigte einen vollständigen Durchlauf. Begleitend fiel die Shaderübersetzungsarbeit pro abgetastetem Bild von etwa 40 ms auf 7 ms und die Pufferübertragung von rund 125 MiB auf 65–75 MiB, was die Startinsel von etwa 148 ms auf einen Median von 124 ms brachte.",
      imageAlt:
        "Cat Quest III — Inselspiel mit HUD, Bergen und blauem Meer, gezeichnet von PS5PCEM",
    },

    "precinct-title-menu": {
      title: "Beide Introfilme, das Titelmenü und ein erstes Spielbild",
      summary:
        "Der Gastgraph aus sechs Bildern wurde gebunden, Unity-Plug-ins starteten, und beide Introfilme liefen als synchrones 4K-Video mit Stereoton, bevor das Titel-Artwork und eine lesbare NEW-GAME-Bestätigung erschienen. Ein früherer abgesicherter Lauf erreichte die Kreuz-Aufforderung und erzeugte das erste bestätigte Bild aus der Engine.",
      imageAlt:
        "The Precinct — Titelmenü mit NEW-GAME-Bestätigung, gezeichnet von PS5PCEM",
    },
    "sarah-playable": {
      title: "Spielbar und durchspielbar an der Bildratengrenze",
      summary:
        "Ein bestätigter Durchlauf, bei dem Titelmenü und erste Szene die 60-FPS-Grenze halten — 5.280 Bildwechsel in 90 Sekunden. Zum Laden mussten zuerst eboot.bin und sce_module/libc.prx aus Sicherungen wiederhergestellt werden, die der eigene eboot-Patcher der Kopie hinterlassen hatte, nachdem er beide abgeschnitten hatte.",
      imageAlt: "Dreaming Sarah — Waldszene mit einem NPC, gezeichnet von PS5PCEM",
    },
    "terminator-playable": {
      title: "Spielbar und durchspielbar",
      summary:
        "Beendet, ohne gemeldete Fehler. Hintergründe, Figuren, HUD, Texturen und Farben sind alle korrekt, und aufgewärmte Startbilder messen 22–65 ms. Textur-Alpha, Kanalvertauschung und sRGB-Abtastung bewahren die beabsichtigte Farbbalance.",
      imageAlt:
        "Terminator 2D — Spielgeschehen mit Spielfigur, HUD und Wüstenszene, gezeichnet von PS5PCEM",
    },
    "asterix-playable": {
      title: "Spielbar und durchspielbar",
      summary:
        "Ein bestätigter Durchlauf bei 28–31 ms pro Bild, mit einem Entwicklungslauf über 3.000 Bildwechsel ohne abgewiesene Einreichungen. Die Vollbildkomposition bleibt GPU-resident, und die Bildausgabe behält die Ausrichtung des Gast-Viewports ohne Umweg über den Hostspeicher.",
      imageAlt:
        "Asterix & Obelix: Slap Them All! — Spielgeschehen mit HUD und GO-Schild, gezeichnet von PS5PCEM",
    },
    "jurassic-playable": {
      title: "Spielbar und durchspielbar",
      summary:
        "Ein bestätigter Durchlauf. Die Startdarstellung wurde wiederhergestellt, samt Titellogo, Bestätigungsabfrage, Cover-Artwork der Sammlung und animierter Vorschau. Wiederholtes Durchblättern der Vorschauen kann weiter einen Medien-Handle-Pool erschöpfen, danach bleiben spätere Vorschauen stehen.",
      imageAlt:
        "Auswahlschirm der Jurassic Park Classic Games Collection mit Cover-Artwork, gezeichnet von PS5PCEM",
    },
    "reanimal-title-menu": {
      title: "Ein animiertes 4K-Titelmenü ohne seine Beschriftungen",
      summary:
        "Native und Firmware-Module wurden aufgelöst, die Firmenlogo-Sequenz lief, und das animierte Titelmenü in 3840×2160 hielt durch, mit sichtbarem Bojen-Hintergrund, Titellogo, Wasserreflexen und SELECT-Aufforderung. Die mittleren Menübeschriftungen sind weiter nur kleine rote Markierungen, daher wurde die Navigation nie bestätigt.",
      imageAlt:
        "REANIMAL — animiertes Titelmenü mit unvollständigen Beschriftungen, gezeichnet von PS5PCEM",
    },
    "propagation-bootstrap": {
      title: "Unreal-Start bis zur ersten Einreichung",
      summary:
        "Das 8,8 GiB große Paket wurde eingebunden, ICU- und Konfigurationsstart vollendeten sich, das vorkompilierte globale Shaderarchiv öffnete, AGC-Shader wurden erzeugt, und der erste Befehlspuffer wurde eingereicht. Der Lauf liegt vor den heutigen Synchronisationspaket-Konstruktoren und muss wiederholt werden.",
    },
    "pistol-whip-modules": {
      title: "VR-Module werden eingebunden, Unity-Archive beginnen zu laden",
      summary:
        "Das native PS-VR2-Plug-in und das Burst-Modul wurden beide eingebunden, und der Titel begann seine Unity-Datenarchive zu laden. Weiteres Vorankommen wartet auf Headset-, Tracking- und Host-OpenXR-Unterstützung, die das Projekt bewusst zurückgestellt hat.",
    },
  },
};

export default de;
