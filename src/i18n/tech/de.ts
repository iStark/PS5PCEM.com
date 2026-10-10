import type { TechCopy } from "./en";

const tech: TechCopy = {
  hle: {
    title: "HLE, High-Level-Emulation der Firmware",
    summary:
      "HLE ist die Art, wie PS5PCEM die Firmware-Aufrufe beantwortet, die ein Titel importiert. Jede numerische NID wird zu einer Zig-Funktion auf einem Host-Stack, wobei die System-V-Aufrufkonvention des Gastes unter Windows erhalten bleibt.",
    sections: [
      {
        heading: "Warum die Firmware nicht im Spiel liegt",
        paragraphs: [
          "Ein PlayStation-5-Titel trägt das Betriebssystem, das er aufruft, nicht bei sich. Seine Importe sind Kennungen aus 11 Zeichen. PS5PCEM berechnet jede Kennung aus dem Exportnamen: SHA-1 des Namens plus ein festes Salt, danach die ersten acht Digest-Bytes in einer Base64-Variante. Eine Implementierung registriert sich unter dem lesbaren Namen und kann die Kennung verlangen, die dieser Name erzeugen muss, sodass ein falsch geschriebener Export beim Bauen des Moduls scheitert.",
          "Der dynamische Linker sucht die Kennung zusammen mit der Bibliothek, dem Modul und ihren Versionen. Dieselbe Kennung kann in mehr als einer Bibliothek vorkommen. Eine Suche nur nach der Kennung gibt es für Importe, die keine brauchbaren Metadaten mitbringen, und dieser Rückfall gilt als letztes Mittel, weil er mehrdeutig ist.",
        ],
      },
      {
        heading: "Der Aufruf läuft auf einem Host-Stack",
        paragraphs: [
          "Der Gast ruft die Firmware direkt auf, daher beginnt der Aufruf auf dem Stack des Gast-Threads, oft ein Megabyte groß, weil der Titel genau das angefordert hat. Host-Arbeit wie das Öffnen einer Datei braucht einen viel größeren Stackframe. Der Compiler reserviert diesen Frame beim Eintritt, vor jedem frühen Rücksprung. Ein Firmware-Rumpf kann daher über den Gast-Stack hinauslaufen, bevor er die Zeile erreicht, die den Platz brauchte, und der Fehler landet außerhalb jeder Gast-Abbildung.",
          "Jeder HLE-Aufruf wechselt für die Dauer der Host-Arbeit auf einen eigenen Host-Stack je Thread. Die Argumente gehen durch den Speicher, daher bedient ein einziges Assembler-Stub jede Signatur, einschließlich Rückgaben von Gleitkommazahlen und Aggregaten. Verschachtelte Firmware-Aufrufe bleiben auf dem Stack, den der äußere Aufruf bereits eingerichtet hat. Unter Windows nutzt der Gast die System-V-AMD64-Konvention, der Host dagegen Microsoft x64, daher wird jede vom Gast aufrufbare Funktion mit der Gastkonvention deklariert. Fehlt diese Deklaration, kompiliert der Code trotzdem und liest die Argumente danach aus den falschen Registern.",
        ],
      },
      {
        heading: "Was die HLE-Oberfläche abdeckt",
        paragraphs: [
          "Auf dieser Maschinerie stellen die Firmware-Bibliotheken direkten und flexiblen Speicher, Modul-Handles, pthreads, Synchronisation, Dateien, Spielstände, Fibers, Schriften, PNG, die Uhr, Pads, AudioOut, AJM, NGS2, ACM, AvPlayer, APR und AMPR bereit. Netzwerk, SSL und die NP Web API behalten die Lebensdauer ihrer Kontexte und Anfragen und liefern deterministische Offline-Fehler. Dialoge, die eine System-Shell brauchen, enden sofort mit einem stimmigen Ergebnis ohne Oberfläche.",
          "Der Validierungslauf vom 10. Oktober bestand die vollständige ReleaseSafe-HLE-Suite, 606 von 606 Tests. Diese Zahl ist die Firmware-Suite. Sie verzeichnet für sich genommen weder eine neue Bildrate noch einen neuen abgeschlossenen Durchlauf.",
        ],
      },
    ],
    works: [
      "NID-Berechnung, eine versionierte Symbolregistrierung und ein Wechsel auf den Host-Stack für jeden Firmware-Aufruf.",
      "System-V-Aufrufe des Gastes unter Windows, wo die Host-Konvention Microsoft x64 ist.",
      "Speicher, Dateien, Threads, Spielstände, Medien, Audio-Codecs und der Befehlspfad von APR und AMPR.",
      "Dialoge ohne Oberfläche und ein Offline-Netzwerkprofil, das keine Host-Sockets öffnet.",
    ],
    gaps: [
      "Bibliotheken, die der Titel importiert und die PS5PCEM nicht implementiert hat, lassen den Import weiterhin fehlschlagen.",
      "Wirklich bedarfsgesteuertes Laden eines Moduls, das nicht im veröffentlichten Graphen stand, liefert einen Fehler.",
      "Plattformdienste, die eine echte Shell, ein Konto oder eine Netzwerkgegenstelle brauchen, bleiben nicht verfügbar.",
    ],
  },

  ampr: {
    title: "AMPR-Zähler",
    summary:
      "AMPR in PS5PCEM ist ein prozesslokales Softwaremodell der Zähler- und Abschlussbefehle der Konsole. 128 Zähler nehmen Stores, atomare Feldaktualisierungen, paarweise Lesezugriffe und maskierte Wartebedingungen entgegen, in der Reihenfolge der Einreichung.",
    sections: [
      {
        heading: "Wofür ein Titel AMPR nutzt",
        paragraphs: [
          "Auf der Konsole ist AMPR die asynchrone Engine, die Dateidaten bewegt und Zähler aktualisiert, auf die CPU und GPU warten können. Spiele nutzen das, um zu wissen, dass ein Lesevorgang angekommen ist oder dass ein späterer Pass beginnen darf, ohne in einer Schleife auf einer gemeinsamen Variablen zu warten. PS5PCEM emuliert den AMPR-Hardwareblock nicht. Es führt den Befehlsstrom aus, den der Titel gebaut hat, innerhalb des Prozesses, und meldet den Abschluss über die AMPR-Ereigniswarteschlange, die der Titel registriert hat.",
          "Die Zählerbank hält 128 Wörter zu 32 Bit. Ein Paar ist ein gerader Zähler plus das nächste Wort, gelesen und geschrieben als ein 64-Bit-Wert. Eine einzige Sperre deckt beide Hälften und jedes Read-Modify-Write ab, sodass ein Leser kein zerrissenes Paar beobachten kann. Der Zugriff kann das ganze Paar, das 32-Bit-Wort, eine der beiden 16-Bit-Hälften oder eines der vier Bytes benennen.",
        ],
      },
      {
        heading: "Stores, Wartebedingungen und Zeitstempel",
        paragraphs: [
          "Eine Schreiboperation ist ein Store, ein bitweises OR, ein AND mit dem Komplement, ein XOR oder eine umlaufende Addition, angewandt auf das gewählte Feld. Eine Wartebedingung vergleicht dieses Feld unter einer Maske mit einem Bezugswert. Die Vergleiche sind gleich, größer, kleiner, ungleich, ein erreichter Sequenzwert sowie die vorzeichenbehafteten Formen von größer und kleiner. Sequenzvergleiche schieben das Vorzeichenbit des Feldes auf Bit 63, sodass dieselbe Regel bei 8, 16, 32 und 64 Bit gilt.",
          "Eine Wartebedingung, die bereits erfüllt ist, schließt an Ort und Stelle ab. Eine nicht erfüllte Wartebedingung behält den Schnappschuss der Einreichung und setzt vor späteren Schreibvorgängen und Ereignissen auf diesem Strom fort, auch wenn eine spätere Einreichung auf demselben Gast-Thread den Wert liefert. Die gewöhnliche API und die API _04_00 haben getrennte Argumentlisten. Zeitstempel werden zusammen mit den Zählerbefehlen aufgezeichnet. Abfragen der Abschlussgröße, die Titel importierten, sind registriert, sodass diese Aufrufe aufgelöst werden.",
        ],
      },
      {
        heading: "Was auf diesem Pfad beobachtet wurde",
        paragraphs: [
          "22 gezielte AMPR-Tests bestehen in ReleaseSafe, einschließlich Aufrufen durch die echte Exportoberfläche. Der Start von Grand Theft Auto III führt mehr als 10,000 Einreichungen von APR-Dateilesungen aus und schreibt mehr als 350 AMPR-Abschlussereignisse, ohne einen diesem Pfad zugeordneten AMPR-Fehler. Dieser Start ruft die Zähler-API selbst nicht auf. Die Zählerarbeit decken die Tests ab und Titel, die auf die Werte warten.",
          "Das ist die API-Abdeckung für die Befehle, die der Emulator ausführt. Es ist kein zyklusgenaues Modell des Speichercontrollers der Konsole, und es beansprucht nicht das Zeitverhalten der Hardware.",
        ],
      },
    ],
    works: [
      "128 Zähler mit kohärenten 64-Bit-Paaren sowie Feldern für Byte, Halbwort und Wort.",
      "Store, OR, AND mit Komplement, XOR und umlaufende Addition, dazu maskierte und vorzeichenbehaftete Wartebedingungen.",
      "Blockierte Wartebedingungen, die ihren Platz im Befehlsstrom behalten und fortsetzen, wenn der Wert eintrifft.",
      "Geordneter Abschluss, zugestellt über die registrierte AMPR-Ereigniswarteschlange.",
    ],
    gaps: [
      "WaitOnAddress bleibt ein Platzhalter.",
      "Das Zeitverhalten der Hardware des echten AMPR-Blocks wird nicht nachgebildet.",
      "Ein Zählerbefehl, den der Decoder nicht erkennt, wird nicht stillschweigend als Erfolg behandelt.",
    ],
  },

  apr: {
    title: "APR-Dateikennungen und Lesevorgänge",
    summary:
      "APR löst eine Titeldatei einmal auf und trägt danach eine prozesslokale Kennung in späteren Befehlspuffern. Aufgeschobene AMPR-Lesevorgänge öffnen dieselbe nur lesbare Datei unter /app0 erneut, ohne einen Host-Deskriptor dauerhaft zu behalten.",
    sections: [
      {
        heading: "Kennungen statt Pfade",
        paragraphs: [
          "Die Beschleuniger-API will nicht in jedem Befehl einen Pfad. Der Titel löst einen Pfad auf, erhält eine kompakte Dateikennung und setzt diese Kennung in die Lesebefehle, die er später einreicht. PS5PCEM hält den Pfad und die Dateigröße neben der Kennung. Die Tabelle ist prozesslokal. Host-Pfade werden dem Gast nicht zurückgegeben.",
          "Die Dateien stammen aus dem nur lesbaren /app0-Mount des Titels. Ein aufgelöster Eintrag kann erneut geöffnet werden, wenn ein aufgeschobener Lesevorgang läuft, sodass der Emulator nicht jeden Deskriptor über die ganze Lebensdauer des Prozesses halten muss. Die zwischengespeicherte Tabelle fasst bis zu 64 Dateien.",
        ],
      },
      {
        heading: "Befehlspuffer",
        paragraphs: [
          "Eine Einreichung ist ein Befehlspuffer des Gastes, kein einzelner Leseaufruf. PS5PCEM akzeptiert bis zu 32 gleichzeitig vorhandene Befehlspuffer. Jeder Puffer ist begrenzt: 32 Lesevorgänge, 32 Schreibvorgänge, 32 Abbildungen, 32 Abschlussdatensätze und 128 Operationen. Bis zu 64 Einreichungen können gleichzeitig offen sein, und ein automatischer Pool hält acht Puffer. Ein Lesevorgang nennt die Dateikennung, ein Gastziel, eine Größe und einen Dateioffset und kann eine Adresse nennen, die die Bytezahl empfängt.",
          "Der Leser weist eine unbekannte Kennung, eine fehlende Datei, einen zu kurzen oder falsch ausgerichteten Befehlspuffer und eine Anfrage zurück, die über die Datei oder das Ziel hinauslaufen würde. Ein einzelner Lesevorgang ist auf 4 GiB begrenzt. Das ist die Grenze der Schnittstelle, kein Versprechen, dass ein Titel so große Lesevorgänge absetzt. Map-Befehle nutzen die AMM-Seitengröße von 16 KiB, die der Gast erwartet.",
        ],
      },
      {
        heading: "Wie APR und AMPR zusammentreffen",
        paragraphs: [
          "APR besitzt die Dateitabelle und die Lebensdauer der Befehlspuffer. AMPR besitzt die Zähler, die Wartebedingungen und die Abschlussereignisse, die dem Titel mitteilen, dass die Arbeit fertig ist. Ein Titel kann viele Dateilesungen einreihen und dann auf einen Zähler warten, den der Abschlussbefehl aktualisiert. Der erste Start von Grand Theft Auto III ist der große beobachtete Fall: Die Lesevorgänge laufen über diesen Pfad, und die Abschlussereignisse kommen über die AMPR-Warteschlange zurück.",
          "Asynchrone Ein- und Ausgabe des Kernels, die andere Datei-API, ist eine eigene Seite. APR ist der Befehlsstrom des Beschleunigers. Die Batch-API des Kernels ist die Anforderungsliste im POSIX-Stil.",
        ],
      },
    ],
    works: [
      "Prozesslokale Dateikennungen für nur lesbare Pfade unter /app0, mit einer Größe, die für spätere Lesevorgänge erhalten bleibt.",
      "Begrenzte Befehlspuffer für Lesevorgänge, Schreibvorgänge, Abbildungen und Abschlussdatensätze.",
      "Aufgeschobene Lesevorgänge, die dieselbe Titeldatei erneut öffnen.",
      "Geprüfte Ablehnung unbekannter Dateien, von Überläufen und fehlerhaften Puffern.",
    ],
    gaps: [
      "Der Pfad ist eine Softwareausführung des Befehlspuffers, nicht die DMA-Engine der Konsole.",
      "Beschreibbare Paketdateien liegen außerhalb von /app0. Spielstände laufen über den Spielstand-Mount.",
      "Eine Datei, die der Auflöser noch nicht gesehen hat, lässt sich nicht aus einer nackten Kennung erfinden.",
    ],
  },

  memory: {
    title: "Direkter Speicher, flexibler Speicher und Pools",
    summary:
      "Gastadressen sind echte Hostadressen. Direkter Speicher ist ein dünn belegter gemeinsamer physischer Pool, der in diesen Raum abgebildet wird, und MemoryPool setzt Reservierung, Commit und Batch-Operationen auf demselben Backing darauf.",
    sections: [
      {
        heading: "Die Gastadresse ist die Hostadresse",
        paragraphs: [
          "Gastcode für x86-64 läuft nativ und enthält absolute Adressen, daher kann PS5PCEM den Prozess nicht in eine beliebige Zuteilung verschieben. Das Speichermodul reserviert das Layout der Konsole, bevor irgendein Modul geladen wird. Das systemverwaltete Fenster beginnt bei 0x40000 und reicht bis knapp unter 32 GiB. Fenster für die Systemreservierung und für Geräte folgen. Das Benutzerfenster unter Windows und Linux reicht von 0x10_0000_0000 bis 0xFC_0000_0000, 944 GiB Adressraum. macOS beginnt dieses Fenster höher und erhält 560 GiB.",
          "Diese Bereiche sind Reservierungen, kein zugesicherter RAM. Seiten werden in Einheiten von 16 KiB zugesichert, wenn eine Abbildung entsteht, und das Aufheben der Abbildung gibt sie frei, während die äußere Reservierung bleibt. Eine andere Zuteilung des Hosts kann sich die Gastadresse zwischen zwei Nutzungen nicht aneignen.",
        ],
      },
      {
        heading: "Direkter und flexibler Speicher",
        paragraphs: [
          "Direkter Speicher ist der Name des Gastes für physischen Videospeicher. Der Titel reserviert einen physischen Bereich und bildet ihn danach ab. Die beiden Schritte sind getrennt. Das Abbilden prüft, dass der gesamte physische Bereich reserviert war, übersetzt den Schutz von CPU und GPU und sichert entweder genau die feste Adresse zu oder sucht eine ausgerichtete Lücke. Derselbe physische Offset kann an mehreren virtuellen Adressen abgebildet sein, und diese Aliasse sind kohärent, weil sie ein gemeinsames, dünn belegtes Backing-Objekt teilen.",
          "Eine feste Abbildung in einen Bereich, den der Titel bereits reserviert hat, sichert innerhalb der Reservierung zu. Die Reservierung zuerst freizugeben würde den Anspruch des Titels auf die Stücke aufgeben, die er noch nicht abgebildet hat. Physischer Speicher wird in der Form freigegeben, die der Titel verlangt; das kann ein Loch in der Mitte oder eine Spanne mehrerer Reservierungen sein. Flexibler Speicher nutzt dieselbe Adressraumtabelle, mit einem plattformüblichen Budget von 4 GiB, und durchsucht das systemverwaltete Fenster ab 0x02_0000_0000, bevor er auf das Benutzerfenster zurückfällt.",
        ],
      },
      {
        heading: "MemoryPool und der Windows-Commit",
        paragraphs: [
          "Die sechs MemoryPool-Exporte von libkernel reservieren eine virtuelle Arena, erweitern die physische Kapazität, sichern gemeinsames Backing zu und geben es frei, führen geordnete Batches aus und melden Blockstatistiken. Gespendete Blöcke lassen sich nicht als gewöhnlicher direkter Speicher abbilden und nicht freigeben, solange sie zugesichert sind. Commit, Decommit, Schutz- und Typänderung im Batch funktionieren. MOVE im Batch bleibt nicht unterstützt und liefert einen Fehler, statt so zu tun, als wären die Blöcke verschoben worden.",
          "Unter Windows teilen sich ausgerichtete Sichten auf direkten Speicher Section-Views von 64 KiB. Temporäre Uploads, Rücklesen und Gastseiten von 16 KiB werden dadurch nicht jeweils zu einer eigenen, ständig wachsenden Commit-Last. Abfragen einer Reservierung nutzen den Virtual-Query-Datensatz des Gastes von 72 Byte und melden halboffene Bereiche mit den ursprünglichen Schutzbits.",
        ],
      },
    ],
    works: [
      "Feste Gastadressfenster, zugesichert in Seiten von 16 KiB und freigegeben, ohne die Reservierung aufzugeben.",
      "Kohärente Aliasse eines physischen Offsets im direkten Speicher.",
      "Flexibler Speicher mit dem Standardbudget von 4 GiB sowie feste, nicht überschreibende und teilweise Aufhebungen der Abbildung.",
      "Reservierung, Erweiterung, Commit, Decommit, Statistiken und geordnete Batches von MemoryPool, außer MOVE.",
    ],
    gaps: [
      "MOVE im Batch von MemoryPool ist ausdrücklich nicht unterstützt.",
      "Das Freigeben eines Bereichs, den der Titel nicht besitzt, bleibt ein Fehler.",
      "Die Reservierungen sind virtuell. Nur Seiten, die der Titel abbildet, verbrauchen Commit des Hosts.",
    ],
  },

  savedata: {
    title: "Spielstände",
    summary:
      "Ein eingehängter Spielstand-Slot wird zu einem beschreibbaren /savedata0. Der Titel nutzt die gewöhnliche Datei-API, und der nächste Start findet dieselben Dateien unter dem Produktcode, den der Titel bekannt gibt.",
    sections: [
      {
        heading: "Wo ein Spielstand liegt",
        paragraphs: [
          "Die Installation des Spiels ist nur lesbar, kann auf Wechselmedien liegen und wird beim Patchen als Ganzes ersetzt. Ein Spielstand muss alle drei überdauern. PS5PCEM legt Slots unter savedata/<titleId>/<slot>/ im Home des Emulators ab, geschlüsselt nach dem Produktcode, den der Titel meldet. Zwei Dumps desselben Spiels teilen sich die Spielstände. Zwei verschiedene Spiele tun das nicht.",
          "Der Slotname kommt vom Gast und wird bereinigt, bevor er ein Verzeichnis wird. Trenner, der Doppelpunkt des Laufwerks und Verweise auf das Elternverzeichnis werden zu Unterstrichen. Diese Zeichen zu streichen würde zwei verschiedene Namen auf ein Verzeichnis zusammenfallen lassen. Ein Name, der überhaupt kein Verzeichnis sein kann, fällt auf einen festen Namen zurück, weil es schlimmer ist, den Spielstand zu verlieren, als ihn an einen vorhersehbaren Ort zu legen.",
        ],
      },
      {
        heading: "Einhängen und Existenzprüfungen",
        paragraphs: [
          "Ein Mount löst den Slot auf und richtet /savedata0 darauf. Ein fehlender Slot wird nur angelegt, wenn der Titel einen verlangt hat. Eine Anfrage nach einem Spielstand, den der Titel nie geschrieben hat, erhält ein Ergebnis für fehlend, und genau das erwartet der Titel. Alles, was mit dem Titel ausgeliefert wurde, bleibt nur lesbar. Der Mount für Spielstände ist der beschreibbare Ort.",
          "Die Existenz wird über den Metadatenpfad beantwortet, nicht durch Öffnen der Datei. Ein Mount, der erst beim Öffnen Erfolg hatte, ließ jede Existenzprüfung fehlschlagen, und Jets 'n' Guns 2 schrieb sein Profil deshalb bei jedem Start neu. Auch das Auflisten der Slots, die ein Titel geschrieben hat, wird beantwortet. Der Mount meldet außerdem, ob er einen vorhandenen Spielstand geöffnet oder einen neuen angelegt hat. Die blockförmige Spielstand-API nutzt einen getrennten Blob je Titel unter sce_sdmemory, geladen, wenn der Titel ihn reserviert, und geschrieben, wenn der Titel eine Synchronisation verlangt.",
        ],
      },
      {
        heading: "Unvollständige Slots",
        paragraphs: [
          "Die Suche beim Start verbirgt unterbrochene Slots, die nur Firmware-Metadaten oder leere Bereitstellungsdateien enthalten. Cat Quest III hatte einen nachgestellten Einstellungs-Slot, der nur path.txt enthielt. Der Titel scheiterte danach an einer fehlenden Data.dat und wartete nach seinem Startbild endlos. Die Suche überspringt diesen unvollständigen Slot jetzt und macht weiter.",
          "Der Launcher gruppiert auf der Seite Spielstände jeden lokalen Slot nach der Titel-ID, einschließlich Spielständen, die eine andere Kachel der Bibliothek geschrieben hat. Ein Entwicklungsbuild unter zig-out löst das Home des Emulators auf die Wurzel des Repositorys auf. Ein gepackter Build nutzt sein eigenes Verzeichnis. Starts desselben Pakets von der Kommandozeile und aus dem Launcher teilen sich daher eine Spielstand-Wurzel.",
        ],
      },
    ],
    works: [
      "Beschreibbare Mounts von /savedata0, geschlüsselt nach der Titel-ID, mit bereinigten Slotnamen.",
      "Existenzprüfungen, das Auflisten von Slots und eine Meldung, ob der Mount den Spielstand angelegt hat.",
      "Ein Blob je Titel unter sce_sdmemory für die blockförmige Spielstand-API.",
      "Verbergen unterbrochener Slots, die keine echte Spielstand-Nutzlast enthalten.",
    ],
    gaps: [
      "Spielstände sind Verzeichnisse des Hosts. Der Spielstand-Dialog der Konsole und die Cloud-Synchronisation werden nicht dargestellt.",
      "Ein Slot, den der Titel nicht anlegen lassen wollte, wird als fehlend gemeldet.",
      "Trophäen, Aktivitäten und andere an ein Konto gebundene Datensätze liegen außerhalb dieses Mounts.",
    ],
  },

  fonts: {
    title: "Schriftausgabe",
    summary:
      "libSceFont rastert vom Titel gelieferte TrueType- und OpenType-Schriftschnitte mit FreeType. Anforderungen einer Systemschrift nutzen den mitgelieferten Ersatz Noto Sans für Lateinisch, Griechisch und Kyrillisch.",
    sections: [
      {
        heading: "Schriftschnitte, Maßstab und Lebensdauer",
        paragraphs: [
          "Ein Titel öffnet eine Schriftbibliothek, erzeugt einen Schriftschnitt aus Bytes, die er liefert, oder aus einer Anforderung einer Systemschrift, und fragt dann Glyphenmetriken und Abdeckung ab. Jeder Schriftschnitt behält seinen eigenen Maßstab, Ausgabemaßstab, seine Schrägstellung und seine Lebensdauer. Das Schließen der Bibliothek gibt ihre Schriftschnitte frei, und das Abbauen des Prozesses löscht den Schriftzustand. Die Schriftbytes werden beim Öffnen kopiert, sodass ein späteres Aufheben der Abbildung des Quellpuffers des Titels den Rasterer nicht ungültig machen kann.",
          "Noto Sans ist ein Ersatz, keine bytegleiche Kopie jeder Firmwareschrift. Es deckt Lateinisch, Griechisch und Kyrillisch ab. Ein Schriftschnitt, den der Titel liefert, kann andere Glyphen enthalten, einschließlich CJK, und diese Umrisse werden verwendet. Die Anforderung einer Systemschrift selbst setzt keinen CJK-Schriftschnitt ein.",
        ],
      },
      {
        heading: "Glyphen, Kerning und Atlanten",
        paragraphs: [
          "Der Glyphenpfad liefert echte Metriken, waagerechtes Layout, grundlegendes Paar-Kerning, geglättete Abdeckung, Beschnitt und Deskriptoren des Ausgabeergebnisses. Ein begrenzter Glyphen-Cache vermeidet, dasselbe Zeichen erneut zu rastern, und ein getrennter Paar-Cache verwendet Kerning über Größen hinweg wieder. Schreibvorgänge prüfen die CPU-Rechte und machen GPU-Seitenüberwachungen ungültig, bevor sie einen Texturatlas berühren.",
          "Ein gültiger Unicode-Skalar, den der Schriftschnitt nicht enthält, nutzt den Umriss .notdef dieses Schnitts, einschließlich Steuercodes, die auftreten, während ein Titel einen vollständigen Atlasbereich aufbaut. Dieser Pfad für fehlende Glyphen lässt Jurassic Park Classic Games Collection seinen Schriftatlas fertig aufbauen. Ungültige Unicode-Skalare und ausdrückliche Glyphenkennungen außerhalb des Bereichs liefern weiterhin einen Fehler. Die Abdeckung wird in Pixel von einem bis vier Bytes geschrieben.",
        ],
      },
      {
        heading: "Welches Textlayout beim Titel bleibt",
        paragraphs: [
          "Viele Titel rufen libSceFont nie auf. Sie zeichnen Text mit der Schrift ihrer eigenen Engine, und diese Implementierung ändert diese Pixel nicht. Der HLE-Pfad gilt für Titel, die die Firmware um das Rastern bitten.",
          "Textgestaltung, bidirektionales Layout, synthetische Strichstärke, das Einsetzen einer CJK-Systemschrift, die Auswahl eines Sammlungsschnitts und die höherliegenden APIs FontWriting und String sind nicht implementiert. Gezielte Prüfungen liegen hinter zig build test-hle mit dem Schriftfilter.",
        ],
      },
    ],
    works: [
      "FreeType-Rasterung von TrueType- und OpenType-Schriftschnitten, die der Titel liefert.",
      "Rückfall auf Noto Sans für Anforderungen einer Systemschrift in Lateinisch, Griechisch und Kyrillisch.",
      "Metriken, waagerechtes Layout, Paar-Kerning, Schrägstellung, Beschnitt und ein Glyphen-Cache.",
      "Rückfall auf .notdef für fehlende Unicode-Skalare, wodurch der Atlas von Jurassic Park weiterkommt.",
    ],
    gaps: [
      "Gestaltung, bidirektionales Layout und die FontWriting-APIs fehlen.",
      "Anforderungen einer Systemschrift setzen keinen CJK-Schriftschnitt ein.",
      "Titel, die Text vollständig in ihrer eigenen Engine zeichnen, nutzen diesen Pfad nicht.",
    ],
  },

  png: {
    title: "PNG kodieren und dekodieren",
    summary:
      "Der PNG-Kodierer schreibt 8-Bit-RGB- oder RGBA-Dateien aus RGBA- oder BGRA-Pixeln mit Pitch. Der Dekodierer liest nicht verschachtelte Bilder in Graustufen, Palette, RGB und RGBA in einen geprüften Gastpuffer.",
    sections: [
      {
        heading: "Kodierung",
        paragraphs: [
          "Titel übergeben dem Kodierer ein Rechteck aus Pixeln, dessen Zeilenpitch größer als die Breite sein kann. PS5PCEM nimmt RGBA und BGRA mit Pitch an und schreibt ein übliches 8-Bit-PNG in RGB oder RGBA. Der Aufrufer wählt die Scanline-Filter und eine Kompressionsstufe von 0 bis 9. Ausgabeschreibvorgänge sind durch den Puffer begrenzt, den der Titel bereitgestellt hat.",
          "Der Kodierer ist eine Softwareumsetzung des Dateiformats. Er ruft keine Bildbibliothek des Systems auf und beansprucht keine bestimmte Geschwindigkeit gegenüber dem Hardware-Kodierer der Konsole.",
        ],
      },
      {
        heading: "Dekodierung",
        paragraphs: [
          "libScePngDec liest PNG-Metadaten und dekodiert nicht verschachtelte Bilder in Graustufen, Palette, RGB und RGBA in geprüfte RGBA- oder BGRA-Puffer des Gastes. Scanline-Filter werden angewandt, und die Transparenz der Palette wird beachtet. Das Ziel wird geprüft, bevor Pixel geschrieben werden.",
          "Verschachtelte Adam7-Eingabe wird erkannt und abgelehnt, statt in ein falsches Bild dekodiert zu werden. Verschachtelte Symbole und Bildschirmfotos werden dadurch nicht still zu einem verstümmelten Puffer.",
        ],
      },
      {
        heading: "Worin es steht",
        paragraphs: [
          "PNG ist einer der kleinen Firmware-Dienste, die ein Titel beim Start trifft: Symbole, Atlanten und Vorschaubilder von Spielständen. Es ist unabhängig vom Filmpfad von AvPlayer, der FFmpeg für H.264 nutzt, und unabhängig vom Schriftrasterer.",
          "Der Firmware-Bericht vom 9. Oktober stellt den Kodierer mit der Uhr und den Abfragen der AMPR-Abschlussgröße zusammen. Diese drei haben Importlücken geschlossen. Sie ändern für sich genommen keine gemessene Bildzeit.",
        ],
      },
    ],
    works: [
      "RGBA- und BGRA-Eingabe mit Pitch zu 8-Bit-PNG in RGB oder RGBA bei den Kompressionsstufen 0–9.",
      "Dekodierung nicht verschachtelter Graustufen, Paletten, RGB und RGBA, einschließlich Filtern und Palettenalpha.",
      "Geprüfte Zielpuffer und begrenzte Ausgabe des Kodierers.",
    ],
    gaps: [
      "Verschachteltes Adam7-PNG wird erkannt und nicht dekodiert.",
      "16 Bit und ungewöhnliche Zusatzchunks liegen außerhalb der implementierten Teilmenge.",
      "Es gibt keinen PNG-Hardwareblock. Beide Seiten laufen auf der CPU.",
    ],
  },

  rtc: {
    title: "Echtzeituhr",
    summary:
      "RTC prüft Kalenderfelder, wandelt Windows-FILETIME um und rechnet Ticks geprüft. Der Gast sieht eine zusammenhängende Uhr ohne die Sommerzeitumrechnung des Hosts.",
    sections: [
      {
        heading: "Was die Aufrufe tun",
        paragraphs: [
          "Titel fragen die Firmware nach der aktuellen Zeit, nach einer Umrechnung zwischen Tickzahlen und Kalenderfeldern und nach einer Arithmetik, die nicht in ein unsinniges Datum umbrechen darf. PS5PCEM prüft die Kalenderfelder, rechnet von und nach FILETIME um und prüft die Tick-Arithmetik, sodass ein Überlauf ein Fehler ist und kein abgeschnittener Wert.",
          "Abfragen von UTC und der lokalen Zeit liefern zusammenhängende Werte aus der Host-Uhr. Die Umrechnung, die die Sommerzeitregeln des Hosts auf eine lokale Gastzeit anwenden würde, ist nicht implementiert. Ein Titel, der nur einen monotonen oder einen UTC-Stempel braucht, erhält weiterhin eine brauchbare Antwort.",
        ],
      },
      {
        heading: "Warum die Uhr von der Audiozeit getrennt ist",
        paragraphs: [
          "Die Audiotaktung nutzt das Audiogerät des Hosts und dessen Pufferuhr. AvPlayer nutzt seine eigene Medienuhr. RTC ist die Wanduhr, die der Titel für Spielstände, Zeitgeber und die Kalenderoberfläche liest. Diese Uhren zu vermischen ist der Weg, auf dem ein Titel zu hängen scheint oder einen Spielstand mit der Zeit null stempelt.",
          "Der Bericht vom 9. Oktober hat die Prüfung, die FILETIME-Umrechnung und die geprüfte Arithmetik zusammen mit dem PNG-Kodierer und drei Exporten für die AMPR-Abschlussgröße ergänzt. Netzwerkzeit und eine für den Nutzer sichtbare Uhreinstellung gehören nicht zu dieser Oberfläche.",
        ],
      },
    ],
    works: [
      "Prüfung der Kalenderfelder und geprüfte Tick-Arithmetik.",
      "Umrechnung von FILETIME.",
      "Zusammenhängende Abfragen von UTC und der lokalen Zeit aus der Host-Uhr.",
    ],
    gaps: [
      "Die Sommerzeitumrechnung des Hosts für die lokale Gastzeit fehlt.",
      "Es gibt keine emulierte Systemeinstellung für die Uhr.",
      "Eine Synchronisation der Netzwerkzeit wird nicht ausgeführt.",
    ],
  },

  fibers: {
    title: "Fibers und User-Level-Threads",
    summary:
      "Unter Windows ist jeder Fiber von libSceFiber ein echter Windows-Fiber, sodass ein Wechsel die Gastregister und den Gast-Stack behält. User-Level-Threads starten über denselben pthread-Pfad.",
    sections: [
      {
        heading: "Warum ein Fiber keine Leeroperation sein darf",
        paragraphs: [
          "Gastcode läuft als nativer Maschinencode. Ein Fiber-Wechsel muss genau die Register und genau den Stack wieder aufnehmen, wobei Host-Frames und Gast-Frames auf diesem Stack gemischt sind. Erfolg von sceFiberSwitch zurückzugeben, ohne zu wechseln, ließe den Titel auf dem falschen Stack weiterlaufen und beide Seiten beschädigen.",
          "PS5PCEM hinterlegt jeden initialisierten Gast-Fiber mit einem Windows-Fiber. sceFiberRun, sceFiberSwitch und sceFiberReturnToThread nutzen diesen Mechanismus. Der Thread, der sceFiberRun aufgerufen hat, ist der Wurzel-Fiber. Der öffentliche SceFiber-Datensatz von 128 Byte behält die ABI-Signaturen, den Zustand, das Eintrittsargument, den Namen und den vom Aufrufer bereitgestellten Kontextbereich.",
        ],
      },
      {
        heading: "Wem der Stack gehört",
        paragraphs: [
          "Der Titel liefert einen Kontextpuffer, und dieser Puffer wird im ABI-Objekt festgehalten. Windows besitzt den tatsächlichen Stack. Den Puffer des Titels als nativen Windows-Stack zu nutzen würde die Schutzseite und die Unwind-Buchführung überspringen, die das Betriebssystem verlangt. Der Mindestkontext, den der Firmware-Datensatz erwartet, wird weiterhin geprüft, zusammen mit der Ausrichtung und den Signaturen von Anfang und Ende.",
          "sceFiberGetSelf, das Abschließen, threadübergreifende Besitzprüfungen und das Zurücksetzen zur Laufzeit sind implementiert. Das Backend gibt es auf dem Ziel für native Ausführung unter Windows x86-64. Andere Hosts können den Rest des Emulators bauen, und dieser Wechselpfad steht dort nicht zur Verfügung.",
        ],
      },
      {
        heading: "User-Level-Threads",
        paragraphs: [
          "Initialisieren und Abschließen von libSceUlt gelingen, damit das Job-System eines Titels starten kann. Laufzeiten, Wartewarteschlangen, Pools für Warteschlangendaten, Mutexe, Semaphoren und Warteschlangen halten Zustand auf der Host-Seite, geschlüsselt nach den Objekten, die der Titel zugeteilt hat. Die Arbeitseinträge selbst starten über den vorhandenen pthread-Pfad. Abfragen der Arbeitsbereichsgröße liefern die ausgerichteten Größen, die diese Erzeugungen erwarten.",
          "User-Edge-Ereigniswarteschlangen des Kernels teilen dasselbe sequenzbewusste Warten wie die pthread-Synchronisation. Der VideoOut-Filter -13 und der Grafikfilter -14 liegen auf dieser Warteschlange und behalten die Kennung und die Nutzerdaten jeder Registrierung. ULT ist der Leim der Ablaufplanung. Es fügt keinen zweiten CPU-Emulator hinzu.",
        ],
      },
    ],
    works: [
      "Windows-Fibers für sceFiberRun, sceFiberSwitch und sceFiberReturnToThread.",
      "ABI-Signaturen, Besitzprüfungen und ein Stack im Besitz des Hosts mit einer Schutzseite.",
      "Initialisieren von ULT, Warteschlangen, Mutexe, Semaphoren und über pthread hinterlegte Arbeitseinträge.",
      "User-Edge-Ereigniswarteschlangen, gemeinsam mit dem Abschluss von VideoOut und Grafik.",
    ],
    gaps: [
      "Den Fiber-Wechsel gibt es unter Windows x86-64. Andere Betriebssysteme des Hosts führen Gastcode nicht nativ aus.",
      "Ein Fiber ist kein präemptiv geplanter Hardware-Thread.",
      "ULT implementiert keinen eigenen Interpreter für die Rümpfe der Worker.",
    ],
  },

  aio: {
    title: "Asynchrone Dateilesungen des Kernels",
    summary:
      "Die AIO-API des Kernels nimmt einen Batch von Lesevorgängen an und gibt eine Kennung zurück. PS5PCEM führt den Batch bei der Einreichung aus, was die Schnittstelle erlaubt, und der Titel holt ein fertiges Ergebnis ab.",
    sections: [
      {
        heading: "Die Schnittstelle",
        paragraphs: [
          "Engines, die Assets streamen, reichen eine Liste von Lesevorgängen ein und fragen später, ob der Batch fertig ist. Ein so gebauter Titel kann eine Datei ohne die API nicht laden. PS5PCEM nimmt den Batch an, führt die Lesevorgänge aus, wenn er eingereicht wird, und legt die Ergebnisse unter der Kennung ab. Eine spätere Abfrage sieht einen Batch, der bereits abgeschlossen ist.",
          "Sofort abzuschließen ist ein zulässiges Ergebnis der Schnittstelle. Aufrufer müssen eine Anfrage behandeln, die vor der Abfrage fertig wurde. Der Emulator schläft nicht, um Geräteverzögerung nachzuahmen, und er meldet den Batch nicht als fehlgeschlagen, um asynchroner zu wirken.",
        ],
      },
      {
        heading: "Wie sich das von APR unterscheidet",
        paragraphs: [
          "Kernel-AIO ist der Batch im POSIX-Stil auf Dateideskriptoren, die der Titel bereits geöffnet hat. APR ist der Beschleunigerpfad: Aus Pfaden werden Kennungen, und die Befehle leben in einem AMPR-Befehlspuffer mit Zählern und Abschlussereignissen. Ein Titel kann das eine, das andere oder beides nutzen.",
          "Beide Pfade lesen die Installation des Titels als Daten, die der Emulator nicht erzeugt hat. Grenzen werden geprüft. Ein zu kurzer Puffer oder ein schlechter Deskriptor ist eine Fehlerrückgabe, kein teilweiser Schreibvorgang, der als Erfolg ausgegeben wird.",
        ],
      },
    ],
    works: [
      "Einreichen eines Batches, eine Kennung und ein Abschluss, den der Titel abholen kann.",
      "Lesevorgänge auf den Dateien, die der Titel geöffnet hat.",
      "Sofortiger Abschluss, den die Gast-API erlaubt.",
    ],
    gaps: [
      "Es gibt keinen eigenen E/A-Thread, der Plattenverzögerung nachahmt.",
      "Der Prioritäts- und Bandbreiten-Scheduler der Konsole wird nicht nachgebildet.",
      "APR-Befehlspuffer sind eine andere API und werden nicht in Kernel-AIO umgeschrieben.",
    ],
  },

  agc: {
    title: "AGC und der PM4-Befehlsstrom",
    summary:
      "Ein PS5-Titel baut GPU-Pakete in seinem eigenen Speicher und reicht den Puffer ein. PS5PCEM dekodiert diesen PM4-Strom, behält den Registerzustand und führt Zeichenaufrufe und Dispatches der Reihe nach aus.",
    sections: [
      {
        heading: "Der Strom ist die Grafik-API",
        paragraphs: [
          "Der Titel muss nicht für jedes Dreieck eine hochstufige Zeichenfunktion aufrufen. Er schreibt Pakete: Aktualisierungen von Registern, Zeichenaufrufe, Dispatches, Fences und Flips. Welche Schicht den Puffer auch erzeugt hat, die GPU sieht denselben Strom. Der Decoder benennt die Pakete, deren Opcodes eine dokumentierte Bedeutung haben, und lässt die übrigen als Zahlen stehen. Ein erfundener Name in einer Ablaufverfolgung wäre schlimmer als ein Opcode.",
          "Die Länge des Paketrumpfs wird um eins versetzt abgelegt, sodass sich ein leerer Rumpf nicht kodieren lässt. Jeder Schritt prüft seine Grenzen. Ein Rumpf, der nicht hineinpasst, wird gemeldet. Er wird nicht abgeschnitten, denn ein abgeschnittener Rumpf würde jedes folgende Paket verschieben, und die Ablaufverfolgung würde lügen.",
        ],
      },
      {
        heading: "Zustand, Wartebedingungen und indirekte Puffer",
        paragraphs: [
          "Der Registerzustand überdauert Einreichungen, einschließlich Schreibvorgängen von null. Der Ausführer wendet direkte Registerlisten, native und ältere indirekte Listen, Acquire und Release, Wartebedingungen von 32 Bit und 64 Bit, Schreibvorgänge, Ereignisse und SetFlip an. Eine nicht erfüllte Wartebedingung kehrt als blockiert zurück und nennt das genaue Wort, an dem fortzusetzen ist. Gastspeicher wird nicht verändert, um Fortschritt zu erzeugen.",
          "Indirekte Puffer werden rekursiv verfolgt, sowohl die gewöhnliche Form mit 4 Dwords als auch die bedingte Form mit 14 Dwords. Chain-Pakete beenden den Elternpuffer. Die Verschachtelung stoppt bei sechzehn Ebenen. Ein blockiertes Kind liefert einen festen Pfad von der Wurzel zum Blatt, sodass das Fortsetzen Zeichenaufrufe nicht erneut abspielt, die bereits geschehen sind. Der Scheduler kopiert jeden Wurzel-Befehlspuffer und die indirekten Puffer, die er erreichen kann, sodass der Titel die Arena wiederverwenden darf, während eine Wartebedingung noch blockiert ist.",
        ],
      },
      {
        heading: "Von den Registern zum Zeichenaufruf",
        paragraphs: [
          "Bei einem Zeichenaufruf oder einem Dispatch wird der Register-Schnappschuss zu typisierten Ressourcen: 128-Bit-Deskriptoren für Puffer und Sampler, 256-Bit-Bilddeskriptoren, acht Farbziele, Tiefe und Stencil, Viewports, Scissor, Cull, Blend sowie die Swizzle- und MSAA-Felder der PS5. Fehlende Schreibvorgänge für Farbsteuerung und Clip-Steuerung erben die AGC-Standardwerte. Ein ausdrückliches Abschalten bleibt ein Abschalten. Zwei CPU-Worker bereiten Grafik- und Compute-Befehle vor. Ein Vulkan-Eigentümer reicht sie ein, sodass Ausführung und Abschluss geordnet bleiben.",
          "Shader-Metadaten liefern die Ressourcentabellen und die User-Data-Register. Die skalare Herkunft geht ein begrenztes Präfix des Shaders ab, lädt nur den Gastspeicher, den das Präfix tatsächlich berührt, und stoppt bei einer unbekannten Verzweigung, statt einen Deskriptor zu erfinden. Das Ergebnis ist das, was der Übersetzer und das Vulkan-Backend verbrauchen.",
        ],
      },
    ],
    works: [
      "PM4-Dekodierung mit um eins versetzten Rumpflängen und harten Grenzen an jedem Paket.",
      "Bleibende Registerbänke, blockierte Wartebedingungen und rekursive indirekte Puffer bis zu sechzehn Ebenen.",
      "Typisierte Puffer, Bilder, Farbziele, Tiefe, Viewport, Blend und MSAA-Zustand zum Zeitpunkt des Zeichenaufrufs.",
      "Zwei Worker für die Vorbereitung und ein Eigentümer für die geordnete Vulkan-Einreichung.",
    ],
    gaps: [
      "Ein Opcode ohne dokumentierte Bedeutung bleibt unbenannt.",
      "Eine blockierte Wartebedingung wird nie gelöscht, indem ein gefälschter Fence-Wert geschrieben wird.",
      "Layer, Metadaten und einige Bildoperationen sind weiterhin unvollständig. Dafür gibt es eigene Seiten.",
    ],
  },

  rdna2: {
    title: "RDNA2-Shader nach SPIR-V",
    summary:
      "Shader der PlayStation 5 sind RDNA2-Maschinencode. PS5PCEM dekodiert die GFX10-Familien, baut einen Kontrollflussgraphen und senkt die unterstützten Operationen auf SPIR-V 1.5 für Vulkan ab.",
    sections: [
      {
        heading: "Dekodierung",
        paragraphs: [
          "Das Frontend erkennt die skalaren Kodierungen SOP1, SOP2, SOPK, SOPC, SOPP und SMEM, die Vektorkodierungen VOP1, VOP2, VOP3, VOP3P, VOPC und VINTRP sowie MUBUF, MTBUF, FLAT, DS, MIMG und EXP. Architekturelle Rümpfe aus einem und aus zwei Wörtern, optionale Literale und MIMG-NSA-Adresswörter bleiben erhalten, sodass ein späterer nicht unterstützter Opcode den Strom nicht desynchronisiert.",
          "Ein nicht erkannter Opcode innerhalb einer bekannten Familie wird zu einem nicht unterstützten Befehl, der weiterhin seine Familie, seinen numerischen Opcode, die Rohwörter und einen Grund trägt. Erweiterungswörter von SDWA und DPP behalten ihre Selektoren, Modifikatoren und Lane-Masken. Der Decoder benennt einen Opcode nicht um, den er nicht kennt.",
        ],
      },
      {
        heading: "Kontrollfluss und die typisierte IR",
        paragraphs: [
          "Direkte Sprungziele teilen das Programm in Blöcke. Vorwärtszusammenführungen, verschachtelte Bereiche und Rückwärtskanten werden getrennt aufgezeichnet. Der aktive Übersetzer kann aus den dekodierten Befehlen erzeugen. PS5_GPU_SHADER_IR=1 wählt die legalisierte typisierte IR. PS5_GPU_SSA=1 ergänzt Phi- und Def-Use-Zustand, Konstantenfaltung und iterative Entfernung toten Codes.",
          "Azyklische Auswahlen werden zu strukturierten SPIR-V-Merges mit Phi-Werten an den Zusammenführungen. Natürliche Schleifen werden zu Loop-Merges. Irreduzibler Kontrollfluss wird zu einem Dispatcher nach Blockindex, der die Prädikate VCC und EXEC behält, sodass eine Lane, die einen Schreibvorgang hätte überspringen müssen, ihn weiterhin überspringt. EXEC-Masken werden innerhalb eines SPIR-V-Blocks wiederverwendet und an jedem Label verworfen, weil ein Wert von einer Seite einer Verzweigung die andere Seite nicht dominiert.",
        ],
      },
      {
        heading: "Was die Suite vom 9. Oktober gemessen hat",
        paragraphs: [
          "Der Prüfpunkt für skalare Aufrufe vom 9. Oktober bestand 259 von 259 Tests der GPU-Analyse und 232 von 232 Vulkan-Tests. Die RDNA2-Suite bestand 271 von 281, mit denselben zehn bestehenden Fehlschlägen und einem gemeldeten Leck. Diese Befehlsprüfungen belegen keine neue Bildrate für ein Spiel.",
          "Bildladevorgänge über mehrere Texel, horizontale Gathers, NGG-Fetch-Shader und begrenzte skalare Aufrufe sind als eigene Pfade implementiert und auf eigenen Seiten beschrieben. Stores und Deskriptorkombinationen, die nicht in der gemessenen Menge lagen, bleiben nicht unterstützt.",
        ],
      },
    ],
    works: [
      "Dekodierung der GFX10-Familien für Skalar, Vektor, Speicher, Bild und Export, einschließlich Literalen und NSA-Wörtern.",
      "Strukturierte Auswahlen, natürliche Schleifen und ein Dispatcher für irreduziblen Fluss, der Lane-Masken erhält.",
      "Optionale typisierte IR und SSA-Bereinigung, gewählt über Umgebungsvariablen.",
      "SPIR-V 1.5 für die unterstützten Operationen von ALU, Speicher, Bild, Interpolation und Export.",
    ],
    gaps: [
      "Zehn bestehende Fehlschläge der RDNA2-Suite bleiben, dazu ein gemeldetes Leck.",
      "Ein nicht unterstützter Opcode stoppt diese Absenkung. Er wird nicht durch eine geratene Operation ersetzt.",
      "Die Befehlstests sind kein Bildraten-Ergebnis.",
    ],
  },

  ngg: {
    title: "NGG-Vertex-Shader",
    summary:
      "Zusammengeführte NGG-Vertexprogramme, einschließlich eines Fetch-Shaders, der mit S_SETPC_B64 fortsetzt, werden als eine Grafikstufe übersetzt. Das Exportprogramm behält sein eigenes User-Data-Fenster.",
    sections: [
      {
        heading: "Fetch und Export sind verschiedene Programme",
        paragraphs: [
          "Ein Zeichenaufruf der PlayStation 5 teilt Vertexarbeit oft in einen Fetch-Shader und einen Export-Shader. Der Fetch-Shader beendet seinen Attributprolog, indem er mit S_SETPC_B64 in den Exportcode springt. PS5PCEM behandelt diese Fortsetzung als Teil desselben Vertexprogramms und übersetzt das zusammengeführte Ergebnis.",
          "Das NGG-Exportprogramm leiht sich nicht die User-Data-Bank des Geometry-Shaders. Seine skalaren Register werden aus seinem eigenen User-Data-Schnappschuss initialisiert, bei s8 für das Exportprogramm. Anzunehmen, die Ressourcentabelle liege in s0:s1, ist ein Fehler, den der Übersetzer gezielt vermeidet. Der Tabellenzeiger kommt aus dem User-SGPR-Paar der ShaderResourceTable, das die Metadaten deklariert haben.",
        ],
      },
      {
        heading: "Vertexattribute",
        paragraphs: [
          "Der Fetch-Shader und die erweiterten User Data werden zusammen mit den eingebetteten Tabellen für Vertexpuffer und Vertexattribute aufgelöst. Bis zu 32 Eingabesemantiken behalten ihren semantischen Index, das Hardware-VGPR, in dem sie landen, das AGC-Attributformat, den Byteoffset, die Instanzrate und den 128-Bit-Pufferdeskriptor.",
          "Die Attributsuche nutzt das semantische Byte, nicht das Byte der Hardware-Zuordnung. Ein unvollständiges Tabellenpaar oder ein Index außerhalb des unterstützten Bereichs wird abgelehnt, bevor irgendein Gastlese erfolgt. PARAM-Exporte der Vertexstufe werden zu den Eingängen der Fragmentinterpolation, und so sieht ein späterer Pixel-Shader die Varyings.",
        ],
      },
      {
        heading: "Aufrufe in einen Fetch-Shader",
        paragraphs: [
          "Ein geprüfter externer Fetch-Shader kann auch von S_SWAPPC_B64 oder S_CALL_B64 aus verbunden werden, wenn das User-Data-Paar des Aufrufs noch die Adresse hält, die AGC registriert hat. Der Fetch-Rumpf wird bis zu seinem zurückkehrenden S_SETPC_B64 dekodiert, und diese Rückkehr muss das Link-Paar des Aufrufers lesen. Welche Aufrufe zulässig sind, steht auf der Seite der skalaren Aufrufe.",
          "Die zusammengeführte NGG-Übersetzung lässt dreidimensionale Szenen an einem Fetch-Prolog vorbeikommen, der den Decoder früher angehalten hat. Sie liefert für sich genommen weder einen fehlenden Pixel-Shader noch ein fehlendes Renderziel.",
        ],
      },
    ],
    works: [
      "Zusammengeführte NGG-Vertexprogramme, einschließlich Fetch-Prologen, die mit S_SETPC_B64 enden.",
      "Ein eigenes User-Data-Fenster für das Exportprogramm.",
      "Bis zu 32 Vertexsemantiken mit Formaten, Offsets, Instanzraten und Pufferdeskriptoren.",
      "PARAM-Exporte, verbunden mit den Eingängen der Fragmentinterpolation.",
    ],
    gaps: [
      "Ein Fetch-Shader, dessen Rückkehr nicht zum Link-Paar des Aufrufers passt, wird nicht verbunden.",
      "Allgemeine dynamische Aufrufe bleiben nicht unterstützt. Siehe skalare Aufrufe.",
      "Geometrie, die von einem nicht unterstützten Export oder Interpolanten abhängt, lässt diesen Zeichenaufruf weiterhin fehlschlagen.",
    ],
  },

  mimg: {
    title: "Bildladevorgänge über mehrere Texel",
    summary:
      "IMAGE_LOAD_BY2, BY4, PCK2 und PCK4, einschließlich der Formen mit explizitem Mip, werden für die gemessenen nativen 2D-Formate ausgeführt. Ein BY-Ladevorgang liefert aufeinanderfolgende Texel. Ein PCK-Ladevorgang packt ihre Rohbits in ein Register.",
    sections: [
      {
        heading: "BY und PCK",
        paragraphs: [
          "Ein BY-Ladevorgang schreibt aufeinanderfolgende Texel in getrennte VGPRs, die Kanäle innerhalb jedes Texels geordnet. Ein PCK-Ladevorgang packt die rohen Komponentenbits in ein 32-Bit-VGPR, mit dem ersten Texel in den niederwertigsten Bits. Vorzeichenbehaftete Komponenten werden auf ihre Speicherbreite gekürzt. UNORM-Komponenten werden mit Rundung auf gerade wiederhergestellt.",
          "Das erste Texel wird in X nach unten auf eine Gruppe von zwei oder vier ausgerichtet. Die Grenzprüfung nutzt die ursprüngliche, nicht ausgerichtete Koordinate: Die ganze Gruppe muss vor der Ausrichtung hineinpassen, Y muss im Bereich liegen, und das angeforderte Mip muss existieren. Eine ungültige Gruppe setzt jedes Ergebnisregister auf null und lässt unabhängige Ziele unangetastet. Ungültige Koordinaten werden durch sichere Fetch-Operanden ersetzt, bevor Vulkan sie sieht.",
        ],
      },
      {
        heading: "Welche Formate",
        paragraphs: [
          "BY2 mit DMASK 0x3 deckt R8 und R16 in UNORM, SNORM, UINT, SINT und R16 FLOAT ab. BY2 mit DMASK 0xF deckt RG8 in UNORM, SNORM, UINT und SINT ab. BY4 mit DMASK 0xF deckt R8 in diesen vier Zahlentypen ab. PCK2 mit DMASK 0x1 deckt R8, R16 und RG8 in UNORM, UINT und SINT ab. PCK4 mit DMASK 0x1 deckt R8 in UNORM, UINT und SINT ab. Varianten dieser Ladevorgänge mit explizitem Mip nutzen dieselben Formatlisten.",
          "Das Backend gibt der Übersetzung das genaue native Format. Getrennte Sampled-Image-Bänke für UINT und SINT halten Ganzzahlergebnisse neben den Bänken für Gleitkomma und Vergleich korrekt typisiert. NSA-Koordinaten, überlappende Adress- und Zielregister und die gewöhnliche EXEC-Maske bleiben erhalten.",
        ],
      },
      {
        heading: "Was die Änderung nicht ist",
        paragraphs: [
          "Der Bericht vom 9. Oktober ist gemeinsame Unterstützung von Shader und Backend. Er hängt nicht von einer Spielkennung oder einem Shader-Hash ab. Aus diesen Ladevorgängen allein wird kein Kompatibilitätsergebnis für ein Spiel und keine Änderung der Bildrate beansprucht.",
          "Stores sowie Format- oder Deskriptorkombinationen, die nicht in der gemessenen Menge lagen, bleiben nicht unterstützt. Horizontale Gathers sind die benachbarte Befehlsfamilie und haben eine eigene Seite.",
        ],
      },
    ],
    works: [
      "Gemessene 2D-Ladevorgänge BY2, BY4, PCK2 und PCK4, mit und ohne explizites Mip.",
      "Gruppenausrichtung, geprüfte Grenzen und auf null gesetzte Ergebnisse für eine ungültige Gruppe.",
      "Getrennte ganzzahlige Sampled-Image-Bänke, sodass UINT und SINT typisiert bleiben.",
      "EXEC-Masken, NSA-Koordinaten und überlappende Registerpaare bleiben erhalten.",
    ],
    gaps: [
      "Image-Stores dieser Formen sind nicht implementiert.",
      "Formate und Deskriptormodi außerhalb der gemessenen Tabelle werden abgelehnt.",
      "Die Tests belegen für keinen Titel eine neue Angabe in Bildern pro Sekunde.",
    ],
  },

  gather4h: {
    title: "Horizontale Gathers",
    summary:
      "IMAGE_GATHER4H und IMAGE_GATHER4H_PCK sammeln einen Kanal über eine waagerechte Gruppe von Texeln. Die gemessene direkte Teilmenge für 1D und 2D ist durch 1,242 GPU-Dispatches abgedeckt.",
    sections: [
      {
        heading: "Was der Befehl zurückgibt",
        paragraphs: [
          "Ein senkrechter Gather liest vier Texel in Y. Die H-Form liest sie in X. GATHER4H schreibt den gewählten Kanal dieser Texel. GATHER4H_PCK schreibt den gepackten rohen Texelstrom. Die Zielbreite folgt DMASK, und Register, die der Befehl nicht besitzt, bleiben unverändert.",
          "Ränder nutzen die Adressierungsregeln des Samplers. Ein Texel, das außerhalb des Bildes liegt, wird behandelt, statt aus einer benachbarten Zuteilung gelesen zu werden. Der Prüflauf vom 9. Oktober führte 1,242 GPU-Dispatches über die gemessene direkte Teilmenge für 1D und 2D aus.",
        ],
      },
      {
        heading: "Was außen vor bleibt",
        paragraphs: [
          "A16, D16, R128, indirekte Ressourcentabellen, Array-, Cube- und MSAA-Sichten sowie komprimierte Formate gehören nicht zur gemessenen Teilmenge. Diese Deskriptor- und Steuermodi bleiben ausdrückliche Grenzen.",
          "Die Gather-Arbeit teilt den Übersetzer und den Vulkan-Bildpfad mit den Ladevorgängen über mehrere Texel. Sie ändert die Detile-Adressierung nicht und beansprucht kein Bildraten-Ergebnis.",
        ],
      },
    ],
    works: [
      "IMAGE_GATHER4H und IMAGE_GATHER4H_PCK für die gemessenen direkten Fälle in 1D und 2D.",
      "Zielbreiten nach DMASK und Erhalt unabhängiger Register.",
      "Randbehandlung nach dem Sampler, geprüft mit 1,242 GPU-Dispatches.",
    ],
    gaps: [
      "Array, Cube, MSAA, komprimierte Formate und mehrere Deskriptormodi liegen nicht in der gemessenen Teilmenge.",
      "A16, D16, R128 und indirekte Tabellen bleiben Grenzen.",
      "Aus dem Prüflauf wird keine Bildrate eines Titels abgeleitet.",
    ],
  },

  "scalar-calls": {
    title: "Skalare Shader-Aufrufe",
    summary:
      "S_SWAPPC_B64 und S_CALL_B64 sichern eine volle Rückkehradresse und führen ein begrenztes lokales Unterprogramm aus, auch einen Callee, der hinter ENDPGM liegt. Ein geprüfter AGC-Fetch-Shader kann auf dieselbe Weise verbunden werden.",
    sections: [
      {
        heading: "Aufruf und Rückkehr",
        paragraphs: [
          "Der SOP1-Opcode 0x21 ist S_SWAPPC_B64. Der SOPK-Opcode 0x16 ist S_CALL_B64, mit dem Ziel bei PC + 4 + sign_extend(SIMM16) * 4, was Rückwärtsaufrufe einschließt. Beide schreiben die Adresse des nächsten Befehls in das Ziel-SGPR-Paar. Ein passendes S_SETPC_B64 kehrt dorthin zurück. CALL lässt SCC und EXEC unangetastet.",
          "Ein SWAPPC, dessen Ziel null ist, bleibt die bestehende S_SETPC_B64-Fortsetzung. Lokale SWAPPC-Ziele lassen sich aus einem GETPC plus einer Immediate-Addition oder -Subtraktion voller Breite auflösen. Das Ziel wird festgehalten, auch wenn der Befehl zusätzlich das Link-Register schreibt. Ein Callee, der hinter ENDPGM liegt, wird bis zu seiner passenden Rückkehr dekodiert, innerhalb der Grenzen von Zuteilung und Befehlen. Eine gewöhnliche Hardware-Fortsetzung stoppt weiterhin vor nachgestellten Metadaten.",
        ],
      },
      {
        heading: "Wie der Aufruf abgesenkt wird",
        paragraphs: [
          "Der Kontrollflussgraph erhält ausdrückliche Kanten für Aufruf und Rückkehr. Der Callee teilt den Registerzustand des Aufrufers und nutzt den begrenzten SPIR-V-Dispatcher. Ein nicht unterstützter Aufruf kann nicht in den linearen Kontrollflusspfad durchfallen. Die Ressourcenentdeckung des Hosts folgt den Aufrufen und den Rückkehren, sodass ein Deskriptor, der im Callee initialisiert wurde, weiterhin sichtbar ist.",
          "Jeder unterstützte Aufruf besitzt ein eigenes, geradzahlig ausgerichtetes SGPR-Paar von s0:s1 bis s104:s105, mit genau einer passenden Rückkehr. Callees sind verschachtelt oder aufeinanderfolgend, so wie es der Prüfer erlaubt. Allgemeine dynamische Ziele, bei denen das Ziel ein beliebiger Laufzeitwert ist, bleiben nicht unterstützt.",
        ],
      },
      {
        heading: "Fetch-Shader und der Prüflauf",
        paragraphs: [
          "Ein externer Fetch-Shader wird verbunden, wenn das unveränderte User-Data-Paar des Aufrufs zur Adresse passt, die AGC registriert hat. Der Fetch-Rumpf wird bis zu seinem zurückkehrenden SETPC dekodiert, und dieses SETPC muss das Link-Paar des Aufrufers lesen. Der Analyse-Cache unterscheidet ein gewöhnliches Programm von einem Fetch-Rumpf, sodass ein älteres Einfügen eines Fetch die Rückkehr eines lokalen Unterprogramms nicht überschreiben kann.",
          "Ein GPU-Prüflauf mit 42 Dispatches prüft 21,504 Wörter. Der Bericht vom 9. Oktober beansprucht aus den Aufrufen allein weder einen neuen Spielmeilenstein noch eine neue Bildrate.",
        ],
      },
    ],
    works: [
      "S_SWAPPC_B64 und S_CALL_B64 mit einer vollen Rückkehradresse und einem passenden S_SETPC_B64.",
      "Verschachtelte Callees und Callees hinter ENDPGM, innerhalb der bestehenden Grenzen.",
      "Verbinden eines geprüften AGC-Fetch-Shaders, dessen Rückkehr das Link des Aufrufers liest.",
      "Ein Prüflauf mit 42 Dispatches über 21,504 Wörter.",
    ],
    gaps: [
      "Allgemeine dynamische Aufrufziele sind nicht unterstützt.",
      "Ein Aufruf braucht ein geradzahlig ausgerichtetes Link-Paar und eine passende Rückkehr.",
      "Der Prüflauf ist kein Ergebnis in Bildern pro Sekunde.",
    ],
  },

  vulkan: {
    title: "Vulkan-Renderer",
    summary:
      "Das Vulkan-Backend lädt den Treiber zur Laufzeit, verlangt Vulkan 1.2 und gibt Gastbilder über eine Swapchain aus. Renderziele, Storage-Images und Pipelines bleiben über Zeichenaufrufe hinweg resident.",
    sections: [
      {
        heading: "Gerät und Speicher",
        paragraphs: [
          "Der Renderer lädt den Vulkan-Loader der Plattform selbst, sodass der Build die Header des Vulkan-SDK nicht braucht. Die Initialisierung verlangt Vulkan 1.2, die Version, die SPIR-V 1.5 des Übersetzers annimmt, und bevorzugt ein diskretes Gerät mit einer Queue-Familie, die sowohl Grafik als auch Compute kann. Validierungs-Layer werden in Debug-Builds angefordert, wenn sie installiert sind.",
          "Ein Deskriptor-Layout hält 64 Storage-Buffer, getrennte Sampled-Image-Arrays mit 64 Einträgen für 2D und 3D sowie typisierte Storage-Images. Ein Ring mit 512 Sets, eine Upload-Arena von 128 MiB und dauerhafte Gast-Renderziele halten die Ressourcen eines Bildes auf dem Gerät. Grafikübersetzungen nutzen einen Cache von 256 MiB mit 1,024 Einträgen. Eine Streaming-Szene hatte das alte Budget von 64 MiB überschritten und übersetzte dieselben Module in jedem Bild erneut.",
        ],
      },
      {
        heading: "Pipelines und Timelines",
        paragraphs: [
          "Die Pipeline-Kompilierung nutzt standardmäßig zwei Worker. PS5_GPU_COMPILER_WORKERS kann eins bis vier setzen. PS5_GPU_ASYNC_PIPELINES=0 kehrt zur synchronen Kompilierung zurück und schaltet das Compute-Warmup aus. Das Warmup spielt zuvor kompilierte Compute-Module beim nächsten Start in den Treiber-Cache ein. Es gibt sie nie als Dispatch aus und zerstört die temporären Pipelines. Der Treiber-Cache liegt außerdem in vulkan_pipeline_cache.bin, bis zu 4 GiB. Eine beschädigte Datei wird verworfen. Sie kann nur die Startzeit beeinflussen.",
          "Das Standard-Kompatibilitätsprofil wartet auf jedes eingereichte Batch. Der Timeline-Scheduler, gewählt mit PS5_GPU_TIMELINE_SCHEDULER=1, lässt mehrere Batches gleichzeitig offen und wartet bei einem echten Rücklesen, einem Synchronisationspunkt des Gastes oder einem erschöpften Ressourcenring. Ein Titel, PPSA25872, schaltet diesen Scheduler und das aufgeschobene Rückschreiben kleiner Storage-Daten nach gemessenen Vergleichen von selbst ein. Das Image-Layout wird je Aspect, Mip und Array-Schicht verfolgt, und Barrieren ergeben sich aus der vorherigen Nutzung dieser Subressource.",
        ],
      },
      {
        heading: "Formate und Residenz",
        paragraphs: [
          "56 Host-Formate sind erreichbar, darunter BC1 bis BC7, ganzzahlige und normalisierte Kanäle, R16 und RG16, Halbfloat und RGBA32_FLOAT. Gastbild-Zuteilungen teilen eine Alias-Registrierung über Nutzungen als Farbe, Tiefe, Storage und abgetastetes Bild. Ein späterer Pass kann ein Tiefenziel abtasten, das ein früherer Pass geschrieben hat, ohne Umweg durch den Gastspeicher, wenn die Signaturen übereinstimmen. Neuinterpretationen und teilweise Überlappungen gehen wieder durch den Gastspeicher.",
          "Compute-Detile auf der GPU deckt Standard- und PRT-Oberflächen in 2D und 3D mit 4, 8 und 16 Byte ab. Detile von RB+ und MSAA läuft weiterhin auf der CPU. Einfach abgetastete gepackte UNORM-Ziele im Format 11/11/10 werden über eine Kopie in einen Storage-Buffer und ein Unpack, Blend und Repack im Fragment gemischt. VideoOut ist die Swapchain über diesen Bildern.",
        ],
      },
    ],
    works: [
      "Auswahl eines Vulkan-1.2-Geräts zur Laufzeit, eine Swapchain und residente Renderziele.",
      "56 Host-Formate, Layoutverfolgung je Subressource und eine Registrierung für Bildaliase.",
      "Zwei Compiler-Worker, ein bleibender Treiber-Cache und ein optionales Compute-Warmup.",
      "Ein zuschaltbarer Timeline-Scheduler, den ein Titel standardmäßig einschaltet.",
    ],
    gaps: [
      "Das Standardprofil wartet weiterhin auf jedes Batch. Die Timeline-Einreichung ist zuschaltbar.",
      "Detile von RB+ und MSAA nutzt die CPU.",
      "Spielbeleuchtung und jeder komprimierte Metadatenpfad folgen nicht aus der Formatliste.",
    ],
  },

  msaa: {
    title: "MSAA",
    summary:
      "Passende Samplezahlen von 2×, 4× und 8× für Farbe und Tiefe bleiben bis zu einem späteren Resolve auf dem Host-Bild. Asterix nutzt diesen Pfad für MSAA-Tiefe und Stencil, wodurch ein großes versehentliches Rücklesen entfiel.",
    sections: [
      {
        heading: "Samplezahlen auf dem Host-Bild",
        paragraphs: [
          "Ein Renderziel der PlayStation 5 kann mit zwei, vier oder acht Samples gespeichert werden. PS5PCEM behält ein Farbziel und ein Tiefenziel auf dem Vulkan-Bild, wenn ihre Samplezahlen übereinstimmen, und führt den Resolve später aus. Die Samplezahl des Gastes ist Teil des Ressourcenschnappschusses, neben dem Swizzle-Modus und den Metadatenzeigern.",
          "Die RB+-Adressgleichungen von Oberon mit 16 Pipes und 8 Packern schließen die Array-Scheibe und die Sample-Bits für 2×, 4× und 8× sowohl für Farbe als auch für Tiefe ein. Compute-Detile auf der GPU verbraucht diese Gleichungen noch nicht. Oberflächen mit RB+ und MSAA fallen auf das CPU-Detile zurück. Die Samples bleiben richtig. Der Rückfall kostet, und deshalb wird MSAA nicht als vollständig auf der GPU resident beschrieben.",
        ],
      },
      {
        heading: "Tiefe und Stencil in Asterix",
        paragraphs: [
          "Asterix & Obelix: Slap Them All! zeichnet den Wald zu Beginn mit MSAA-Tiefe und Stencil. Ein reiner Tiefenpass, der die Samplezahl ignorierte, las das Attachment zu Diagnosezwecken zurück. Passende MSAA-Attachments für Tiefe und Stencil bleiben auf dem dauerhaften Tiefenpfad, und der vom Gast verlangte Stencil-Vergleich und die Aktualisierung werden angewandt.",
          "MSAA-Farb-Attachments fordern auf diesem Backend keine Nutzung als Storage-Image mehr an. Auf der RTX 3070 Ti bei Ausgabe in 1080p stieg eine stehende Probe des UI-Zählers über 30 Sekunden für diesen Anfangswald von einem Median von 46.45 FPS auf 162.20 FPS. Die Zahl gilt für diese Ansicht. Sie ist kein Minimum über spätere Level hinweg. Bewegung, Springen und die erste Begegnung mit Römern wurden auf dem Entwicklungsbuild erneut geprüft.",
        ],
      },
      {
        heading: "Was der Resolve nicht umfasst",
        paragraphs: [
          "Ein späterer Resolve bei passender Samplezahl ist implementiert. Eine komprimierte FMASK-Oberfläche, die an CMASK gebunden ist, ist ein anderer Mechanismus und bleibt außerhalb dieses Pfades. Ein nicht unterstützter MSAA-Import behält den sicheren Clear bei der ersten Nutzung, statt nicht initialisierte komprimierte Daten abzutasten.",
          "Alle 233 Vulkan-Tests und die nativen Prüfungen von Tiefe und Stencil für 2× und 4× bestanden mit der Asterix-Korrektur. Der signierte Runner enthält diese Korrektur. Die Änderung ist neuer als die Versionshinweise zu 0.3.4.",
        ],
      },
    ],
    works: [
      "Host-Bilder für passende Samplezahlen von 2×, 4× und 8× bei Farbe und Tiefe, mit einem späteren Resolve.",
      "MSAA-Attachments für Tiefe und Stencil, einschließlich Stencil-Vergleich und Aktualisierung.",
      "CPU-Detile für die Adressierung von MSAA und RB+, mit den Sample-Bit-Gleichungen von Oberon.",
      "Die Korrektur für den Anfangswald von Asterix, in dieser stehenden Ansicht mit einem Median von 162.20 FPS gemessen.",
    ],
    gaps: [
      "Compute-Detile auf der GPU deckt MSAA oder RB+ nicht ab. Diese Uploads nutzen die CPU.",
      "FMASK, das mit CMASK verknüpft ist, wird nicht als komprimierte Metadaten aufgelöst.",
      "Die Zahl zu Asterix ist eine Ansicht auf einer GPU, kein Bildratenversprechen für das Spiel.",
    ],
  },

  metadata: {
    title: "HTILE, DCC, CMASK und FMASK",
    summary:
      "HTILE, DCC, CMASK und FMASK sind die komprimierten Tiefen- und Farbmetadaten der Konsole. PS5PCEM verfolgt die Zeiger, löscht HTILE in den Fällen, die es versteht, und weist ein Layout zurück, das es sonst falsch entkacheln würde.",
    sections: [
      {
        heading: "Was die vier Namen sind",
        paragraphs: [
          "HTILE sind Tiefenmetadaten. In dem GFX10-Muster, das PS5PCEM implementiert, deckt ein Dword einen Bereich von 8×8 Pixeln ab, und diese Dwords werden in einen Block von 32 KiB gepackt, der 1024 mal 512 Pixel abdeckt. DCC ist die Delta-Farbkompression für Farbziele. CMASK ist eine Maske für Fast-Clear und Expand. FMASK sagt einem Multisample-Resolve, welches Sample in welches Pixel gehört.",
          "Der Ressourcenschnappschuss behält die Metadatenzeiger und die Layoutwähler, einschließlich des Linear-CMASK-Bits von GFX10. Dieses Bit zählt, weil eine gekachelte Adressgleichung auf einem linearen CMASK die Maske stillschweigend verstümmeln würde. Das Backend weist das nicht unterstützte Layout stattdessen zurück.",
        ],
      },
      {
        heading: "Clears und Tiefe",
        paragraphs: [
          "Richtige Clears von HTILE und DCC sind für die Layouts implementiert, die der Renderer versteht. Wiederholte Metadaten-Clears deckt der Prüflauf vulkan-smoke htile-clears ab. Eine zurückgesetzte Tiefenausdehnung wird nur für eine aktive, von HTILE gedeckte Oberfläche wiederhergestellt. Das hält den G-Buffer von Ghost of Yōtei intakt und lässt eine veraltete 1×1-UI-Tiefenbindung weiterhin an der Prüfung der Attachment-Größe scheitern.",
          "Einfach abgetastete Tiefe und einfach abgetastetes Stencil des Gastes können importiert und zurückgeschrieben werden, wenn PS5_GPU_DEPTH_TRANSFER=1. Gebundene Stencil-Ebenen werden zu gepackten Attachments aus Tiefe plus Stencil, mit den Vergleichs- und Aktualisierungsoperationen des Gastes. Mehrfach abgetastete Tiefe nutzt den MSAA-Pfad. Komprimierter Z-Bereich und hierarchisches Z innerhalb von HTILE werden nicht vollständig ausgewertet.",
        ],
      },
      {
        heading: "Was weiterhin ausdrücklich bleibt",
        paragraphs: [
          "Die verbleibende Arbeit, wie sie in den GPU-Notizen steht, sind der Rest der Layer-Sichten, die verbleibenden komprimierten Zustände von DCC und FMASK, der Z-Bereich von HTILE und Hi-Z sowie CMASK-Zustände, die an FMASK gekoppelt sind. Ein nicht unterstützter MSAA-Import behält einen Clear bei der ersten Nutzung. Die komprimierte Oberfläche abzutasten, als bestünde sie aus gewöhnlichen Texeln, ist der Fehler, den diese Ablehnung vermeiden soll.",
          "Die Unterstützung der Metadaten ist daher mit Absicht nur teilweise vorhanden. Die Zeiger werden dekodiert. Die Layouts, die geprüft wurden, werden eingehalten. Die Layouts, die nicht geprüft wurden, werden zurückgewiesen oder geleert.",
        ],
      },
    ],
    works: [
      "HTILE-Adressierung nach Muster 21, ein Dword je 8×8, in Blöcken von 32 KiB.",
      "Clears von HTILE und DCC für die Layouts, die der Renderer versteht.",
      "Erkennung von linearem CMASK, die eine gekachelte Gleichung auf einer linearen Maske zurückweist.",
      "Zuschaltbarer Import und Rückschreiben von einfach abgetasteter Tiefe und einfach abgetastetem Stencil.",
    ],
    gaps: [
      "Die vollständige Auswertung von Z-Bereich und hierarchischem Z in HTILE ist unvollständig.",
      "Komprimierte Zustände von DCC und FMASK sowie CMASK, das an FMASK gekoppelt ist, bleiben außerhalb des schnellen Pfades.",
      "Ein nicht unterstützter komprimierter Import wird geleert, statt als rohe Texel abgetastet zu werden.",
    ],
  },

  detile: {
    title: "Entkacheln von Texturen",
    summary:
      "PS5-Texturen liegen in GFX10-Swizzle-Mustern, nicht in linearen Zeilen. PS5PCEM wendet die Adressgleichungen auf der CPU an und auf der GPU für die großen Oberflächen mit 4, 8 und 16 Byte, die dafür infrage kommen.",
    sections: [
      {
        heading: "Die Adressgleichungen",
        paragraphs: [
          "Eine gekachelte Textur verknüpft die Pixelkoordinate per XOR mit Pipe-, Bank- und Sample-Bits, sodass benachbarte Pixel in verschiedenen Speicherkanälen landen. PS5PCEM implementiert die GFX10-Gleichungen für lineare Layouts, Standardkacheln von 256 Byte, 4 KiB und 64 KiB, teilweise residente Kacheln von 64 KiB, Tiefe Z_X und Renderziel R_X. Derselbe Vertrag deckt Mip-Tails und dicke 3D-Blöcke ab.",
          "Bis zu sechzehn Mip-Stufen werden mit der kleinsten zuerst gelegt. Kleine Stufen teilen die genauen Positionen der Mip-Tails von 4 KiB und 64 KiB. Dreidimensionale Ressourcen nutzen dicke Blöcke und Tiefen-Blockslices. Jede Subressource legt einen geprüften Quellbyte-Offset offen. Adapter für Puffer, Bild, blockkomprimierte Daten, Farbziel und Tiefenziel teilen nichts zu und weisen einen Überlauf oder einen zu kurzen Bereich zurück.",
        ],
      },
      {
        heading: "GPU-Detile und der CPU-Rückfall",
        paragraphs: [
          "Uploads bei der ersten Nutzung großer Standardoberflächen von 4 Byte mit Kacheln von 256 Byte, 4 KiB und 64 KiB sowie großer linearer Oberflächen werden auf der GPU entkachelt. Der Compute-Kernel erhält einen zeigerfreien Schlüssel und einen Parameterblock von 84 Byte: Blockgröße, Tail, Pitch, Slice, Samplezahl und einen Pufferoffset von 64 Bit, in einem stabilen Layout aus lauter 32-Bit-Feldern. Standard- und PRT-Oberflächen in 2D und 3D mit acht und mit sechzehn Byte gehören zur selben GPU-Familie.",
          "Andere Familien bleiben auf der CPU, einschließlich RB+ und MSAA. Die Oberon-Gleichungen dafür enthalten die Sample-Bits, und der CPU-Pfad nutzt sie. Der Rückfall kostet Bandbreite. Er ist kein anderes Pixelformat. Diagnosen bei einem laufenden Zeichenaufruf melden die Familie, die Maße des 3D-Blocks, die Samplezahl, die Grenze des Mip-Tails und die Größe der Gastzuteilung.",
        ],
      },
      {
        heading: "Warum Detile in der Bildzeit auftaucht",
        paragraphs: [
          "Eine Textur, die in jedem Bild erneut hochgeladen wird, zahlt die Detile-Kosten in jedem Bild. Der Seitenverfolger lässt, wenn er eingeschaltet ist, eine unveränderte Seite resident, sodass das Detile übersprungen wird. Eine Textur, die die GPU selbst umgeschrieben hat, muss weiterhin ungültig gemacht werden. Detile ersetzt diese Kohärenzregel nicht.",
          "Abgetastete Sichten entkacheln den Mip-Bereich, den der Deskriptor nennt, einschließlich einer Basisstufe ungleich null. Mip 0 des Vulkan-Bildes ist in diesem Fall die Basisstufe der Sicht. Komponenten-Swizzles, die auf dem Sichtpfad noch fehlen, sind eine andere Grenze als die Adressgleichung.",
        ],
      },
    ],
    works: [
      "GFX10-Adressgleichungen für linear, Standard, PRT, Tiefe und Renderziel, einschließlich Mip-Tails und 3D-Blöcken.",
      "Compute-Detile auf der GPU für große Standard- und PRT-Oberflächen in 2D und 3D mit 4, 8 und 16 Byte.",
      "CPU-Detile für die übrigen Familien, einschließlich der Sample-Bits von MSAA und RB+.",
      "Geprüfte Offsets von Subressourcen, die zu kurze Bereiche und Überläufe zurückweisen.",
    ],
    gaps: [
      "Detile von MSAA und RB+ läuft auf der CPU.",
      "Einige Komponenten-Swizzles und Layer-Sichten sind weiterhin unvollständig.",
      "Eine Oberfläche, die die CPU nach dem Upload schreibt, muss ungültig gemacht werden, bevor sie erneut abgetastet wird.",
    ],
  },

  "page-tracker": {
    title: "GPU-Seitenverfolger",
    summary:
      "Der zuschaltbare Seitenverfolger beobachtet Gastseiten von 16 KiB. Der erste native CPU-Store löst einen Fehler aus, erhöht eine Generation und macht die GPU-Kopie ungültig, sodass unveränderte Seiten nicht in jedem Bild gehasht und hochgeladen werden.",
    sections: [
      {
        heading: "Das Problem, das er angeht",
        paragraphs: [
          "Ein Renderziel oder ein Vertexpuffer, der im Gastspeicher liegt, muss die GPU erreichen. Die ganze Zuteilung in jedem Bild hochzuladen ist richtig und teuer. Die ganze Zuteilung zu hashen, um festzustellen, dass sie sich nicht geändert hat, ist ebenfalls teuer. Der Seitenverfolger markiert stattdessen eine verfolgte beschreibbare Seite als schreibgeschützt und lässt die CPU beim ersten Store einen Fehler auslösen.",
          "Die Behandlung zeichnet die Seite auf, stellt den echten Schutz des Gastes wieder her und erhöht die Generation dieser Seite. Ein späterer Zeichenaufruf vergleicht Generationen. Eine unveränderte Seite bleibt auf dem Gerät. Eine Seite, deren Generation sich bewegt hat, wird hochgeladen. PS5_GPU_PAGE_TRACKER=1 schaltet den Mechanismus ein. Er ist aus, solange diese Variable oder das experimentelle Bündel nicht gesetzt ist.",
        ],
      },
      {
        heading: "Was der Seitenfehler ist",
        paragraphs: [
          "Der Fehler ist eine Invalidierung, kein Fehler des Gastes. Die Seite war nur schreibgeschützt, damit der Host den Schreibvorgang beobachten konnte. Der Store des Gastes darf danach unter dem Schutz zu Ende laufen, den der Titel verlangt hat. Seiten, die nicht verfolgt werden, behalten den gewöhnlichen Upload-Pfad.",
          "Abbildungen des direkten Speichers, die mit derselben Adresse, Größe, demselben physischen Offset und denselben CPU-Rechten neu entstehen, behalten ihre Host-Sichten. Diese Wiederverwendung macht eine Generation über Bilder hinweg bedeutsam. Ein Wechsel des Backings oder der Rechte nimmt den normalen Ersetzungspfad, und der Verfolger beobachtet die neue Abbildung.",
        ],
      },
      {
        heading: "Was er nicht tut",
        paragraphs: [
          "Der Verfolger macht die interne Auflösung eines Titels nicht kleiner, und er kompiliert keine Shader. Er entfernt nur wiederholte Transfers von Seiten, auf die die CPU nicht geschrieben hat. Ein Titel, der einen Puffer in jedem Bild umschreibt, zahlt für diesen Puffer weiterhin.",
          "Schreibvorgänge in Schriftatlanten und andere HLE-Stores machen die Überwachungen ungültig, bevor sie Gastspeicher ändern, sodass ein Firmware-Schreibvorgang für die GPU nicht unsichtbar ist. Der Verfolger gehört zu der experimentellen GPU-Menge, die im Architekturüberblick beschrieben ist.",
        ],
      },
    ],
    works: [
      "Generationen je Seite für Gastseiten von 16 KiB, wenn PS5_GPU_PAGE_TRACKER=1.",
      "Ein Fehler beim ersten Store, der den Gastschutz wiederherstellt und die residente Kopie ungültig macht.",
      "Wiederverwendung identischer Sichten auf direkten Speicher, sodass Generationen über Bilder hinweg bleiben.",
      "Invalidierung, wenn HLE selbst eine beobachtete Seite schreibt.",
    ],
    gaps: [
      "Der Verfolger ist zuschaltbar. Der Standard-Kompatibilitätspfad hängt nicht von ihm ab.",
      "Seiten, die die CPU in jedem Bild umschreibt, werden weiterhin hochgeladen.",
      "Er deckt keine Kohärenz von GPU zu GPU innerhalb einer komprimierten Metadatenoberfläche ab.",
    ],
  },

  videoout: {
    title: "VideoOut",
    summary:
      "VideoOut registriert die Anzeigepuffer des Gastes und schließt einen Flip erst ab, nachdem der Darstellungsrückruf das Bild angenommen hat. Das Host-Fenster ist eine Vulkan-Swapchain in 1080p SDR.",
    sections: [
      {
        heading: "Registrierung und Flips",
        paragraphs: [
          "VideoOut hält bis zu sechzehn registrierte Anzeigezuteilungen und vier Attributgruppen. Es veröffentlicht den zusammenhängenden Datensatz aus sechzehn Labels, den die Treiber-ABI nutzt. Registrieren, Ändern und Abmelden werden geprüft. Ein leerer Flip von Puffer -1, den Titel beim Start nutzen, wird angenommen.",
          "CPU-Flips und End-of-Pipe-Flips laufen über das Backend der lebenden Befehlspuffer. Ein normaler Flip wird erst abgeschlossen, nachdem der Darstellungsrückruf das Bild angenommen hat. Der Abschluss wird auf der VideoOut-Ereigniswarteschlange mit den Nutzerdaten des Aufrufers zugestellt. Der Warteschlangenfilter ist dieselbe User-Edge-Ereignisumsetzung, die der Kernel nutzt, und die Kennung der Registrierung bleibt erhalten.",
        ],
      },
      {
        heading: "Was der Host ausgibt",
        paragraphs: [
          "Das Spielfenster ist eine Vulkan-Swapchain. VideoOut meldet 1080p SDR. 120 Hz wird als nicht verfügbar gemeldet. Die Standardvoreinstellung des Spiels verlangt den Leistungsmodus. Die interne Auflösung bleibt unter der Kontrolle des Titels: Ein Spiel, das in 4K zeichnet, teilt weiterhin 4K-Ziele zu, und die Swapchain gibt den Scanout aus, den der Titel registriert hat.",
          "SetFlip löst den VideoOut-Slot und den Pufferindex auf, wählt das zwischengespeicherte Ziel mit der passenden Gastadresse und veröffentlicht das Bild. Die Flip-Rate kann im Fenstertitel angezeigt werden. Der Launcher speichert diese Voreinstellung, und ein Lauf von der Kommandozeile kann PS5_SHOW_FPS=1 setzen.",
        ],
      },
      {
        heading: "Filme und der Scanout",
        paragraphs: [
          "Introfilme umgehen VideoOut nicht. AvPlayer dekodiert in Puffer, die dem Titel gehören, und die eigenen Shader des Titels oder ein registrierter Scanout geben sie aus. Asterix behält den Viewport des Gastes mit negativer Höhe als Ausrichtung des Scanouts, sodass die Komposition auf dem Weg nach draußen nicht auf den Kopf gestellt wird.",
          "Ein fehlender Vulkan-Loader, ein fehlendes Ausgabegerät oder ein fehlendes Fenster wird gemeldet, und der Titel läuft auf dem Pfad ohne Ausgabe weiter. Der Betrieb ohne Ausgabe dient der Diagnose. Er ist kein zweiter, schnellerer Renderer.",
        ],
      },
    ],
    works: [
      "Bis zu sechzehn Anzeigepuffer, vier Attributgruppen und die ABI mit sechzehn Labels.",
      "Flips, die erst abgeschlossen werden, nachdem der Darstellungsrückruf das Bild angenommen hat.",
      "Eine Vulkan-Swapchain, die 1080p SDR meldet, wobei 120 Hz nicht verfügbar bleibt.",
      "Standardmäßig die Voreinstellung Leistungsmodus und optional die Flip-Rate im Fenstertitel.",
    ],
    gaps: [
      "120 Hz und eine HDR-Swapchain des Hosts werden nicht angeboten.",
      "Die interne Auflösung ist das, was der Titel zuteilt.",
      "Ohne Ausgabegerät bleibt der Prozess ohne Ausgabe.",
    ],
  },

  audio: {
    title: "AudioOut",
    summary:
      "AudioOut gibt Gast-PCM auf einem Windows-Gerät mit 48 kHz wieder. Ältere Ports haben eigene Ströme und Warteschlangen, sodass Musik und Effekte zusammen laufen, und ein Underrun behält die Sample-Reihenfolge.",
    sections: [
      {
        heading: "Ports und das Host-Gerät",
        paragraphs: [
          "Ein Titel reicht einen Puffer ein und erwartet, dass der Aufruf etwa so lange dauert, wie der Puffer klingt. Diese Wartezeit kommt daher, dass das Host-Gerät Platz macht, nicht von einem Schlaf, der die Samples verwirft. AudioOut, AudioIn und AudioOut2 legen getaktete Ports, Warteschlangen, Lautsprechermetadaten und den Zustand der verbundenen primären Ausgabe offen. Ein Batch prüft jeden Port und reicht das hörbare Quantum danach einmal ein, sodass ein stiller Hilfsport die Dauer nicht vervielfacht.",
          "Ältere AudioOut-Ports besitzen getrennte Windows-Ströme und PCM-Warteschlangen. Musik und Effekte können gleichzeitig spielen. Die Batch-Ausgabe reicht jeden aktiven Port ein. Nach einem Underrun behält der aktive Ring seine Sample-Reihenfolge, und ein kurzes Fade nimmt das Klicken beim Fortsetzen weg. Das WinMM-Gerät rollt echtes PCM vor und nutzt eine Timerperiode von einer Millisekunde.",
        ],
      },
      {
        heading: "Latenz",
        paragraphs: [
          "Die gewöhnliche Reserve beginnt bei 42 ms und wächst in Schritten von vier Puffern, bis auf etwa 170 ms, nur wenn der laufende Titel das Gerät tatsächlich aushungert. Das gemessene Profil für PPSA25872 beginnt bei 128 ms, weil sein Mischer beim Start und bei Szenenarbeit etwa 100 bis 120 ms pausieren kann. Diese größere Reserve wird anderen Titeln nicht auferlegt.",
          "Nicht endliche Samples werden ersetzt, bevor sie das Gerät erreichen. Diese Bereinigung schützt die Lautsprecher. Sie kann ein Filter nicht reparieren, das bereits ein NaN gespeichert hat. Die Seite zu ACM beschreibt den Faltungsfehler, der diese Werte in Subnautica erzeugt hat.",
        ],
      },
      {
        heading: "Wo Ausgabe existiert",
        paragraphs: [
          "Das Scheitern beim Öffnen eines Geräts wird dem Titel nicht gemeldet. Eine fehlende Soundkarte ist eine Tatsache über den Host. Der Aufrufer fällt auf ein getaktetes stilles Warten zurück, sodass die Zeit des Titels weiterläuft. Dasselbe geschieht, wenn das Gerät mitten im Lauf ausfällt. Ausgabe ist unter Windows implementiert. Andere Builds halten die Ports still und korrekt getaktet.",
          "Direktes Fallback-Mischen dekodierter Vorschauclips ist standardmäßig aus. Eine Vorschau neben dem eigenen AudioOut-Mix des Titels zu spielen ist als Echo zu hören. PS5_AUDIO_FALLBACK_MIX=1 schaltet dieses Mischen ein. Der Launcher kann das Gerät über seine Toneinstellung stumm schalten, die als PS5_AUDIO_DISABLED ankommt.",
        ],
      },
    ],
    works: [
      "Host-Wiedergabe mit 48 kHz über getaktete Ports von AudioOut, AudioIn und AudioOut2.",
      "Getrennte Windows-Ströme für ältere Ports, sodass gleichzeitige Musik und Effekte geordnet bleiben.",
      "Eine Reserve, die bei 42 ms beginnt und nur wächst, wenn das Gerät ausgehungert wird, bis auf etwa 170 ms.",
      "Ersetzen nicht endlicher Samples und ein stiller getakteter Rückfall, wenn sich kein Gerät öffnet.",
    ],
    gaps: [
      "Ausgabe auf dem Host gibt es nur unter Windows.",
      "Controller-Vibration wird nicht aus einer Audio-Haptikspur angesteuert.",
      "Die Bereinigung rekonstruiert keine Filterhistorie, die bereits vergiftet war.",
    ],
  },

  acm: {
    title: "ACM-Faltung",
    summary:
      "Die ACM-Faltung führt den partitionierten Hall von FMOD auf der CPU aus. Batches mit gemeinsamem Eingang transformieren ein Dry-Signal, wenden Impulspartitionen in Float oder Halbfloat an und fügen das Wet-Ergebnis per Overlap-Add zusammen.",
    sections: [
      {
        heading: "Der Fehler, den sie geschlossen hat",
        paragraphs: [
          "Subnautica: Below Zero konnte mit einem Knacken starten, verstummen und Minuten später zurückkehren. Das PCM, das das Host-Gerät erreichte, enthielt nicht endliche Gleitkommazahlen. Eine Ablaufverfolgung der DSP-Rückrufe von FMOD im Speicher zeigte endliche Audiodaten, die in den Faltungshall eintraten, und unbrauchbare Daten, die ihn verließen. Die HLE-Funktionen sceAcm_ConvReverb_SharedInput, die Batch-Einreichung und sceAcmBatchWait gaben Erfolg zurück, ohne eine Ausgabe zu schreiben.",
          "FMOD mischte diesen unbeschriebenen Wet-Puffer danach in den Graphen. Die NaNs breiteten sich durch spätere Effekte aus. Die Bereinigung von AudioOut ersetzte sie durch Stille und konnte die vergiftete Filterhistorie nicht reparieren. Ein zweiter Fehler ließ das Warten auf die anfängliche Batch-Kennung -1 gelingen. FMOD behandelt ein fehlgeschlagenes erstes Warten als 'noch kein vorheriger Wet-Puffer' und mischt erst nach einem wirklich abgeschlossenen Auftrag.",
        ],
      },
      {
        heading: "Partitionierte Faltung",
        paragraphs: [
          "Das Deskriptor-Layout entspricht dem, das im ACM-Backend von FMOD beobachtet wurde. Partitionen der Impulsantwort sind verschachtelte komplexe Bins. Ein Block von B Bins gehört zu einer Transformation der Länge 2B. Puffer für Eingang, Ausgang und Überlappung sind getrennt und planar. Angenommen werden nur die beobachteten Spektren-Layouts float32 und float16 mit Offset null.",
          "Ein Batch läuft auf der CPU. Die Eingangshistorie bleibt über Grains und über den Umbruch des Rings erhalten, und die Überlappung wird in das nächste Ausgangs-Grain übernommen. Mehrere Ausgänge können eine Eingangstransformation und einen Fortschritt der Historie teilen. Mono-Eingang kann mehr als einen Kanal speisen. Die inverse Transformation ist normalisiert. Eine unabhängige Inverse einer reellen Impulspartition legte ihre Energie in die erste Hälfte des nullgepolsterten Blocks, was das Vorzeichen des Spektrums bestätigt. Der gepackte Impuls, den das Spiel nutzt, lässt den Nyquist-Bin weg.",
        ],
      },
      {
        heading: "Wartebedingungen, Grenzen und der erneute Test",
        paragraphs: [
          "Die Erzeuger nehmen Zeigerfelder und Verstärkungen in einen begrenzten Befehlsdatensatz auf. Das PCM selbst wird gelesen, wenn der Batch startet. Ein Warten gelingt nur für einen Batch, den dieser Kontext tatsächlich abgeschlossen hat. Das Zerstören des Kontexts gibt die Historie frei. Ungültige Grenzen, unbekannte Befehlskodierungen und nicht unterstützte Layouts liefern Fehler.",
          "Eigenständige ACM-Operationen für FFT, IFFT und Panner sind nicht implementiert. Kanäle sind auf 8 begrenzt, Ausgänge auf 32 und der Block auf 1024. Der Speicher für die Historie ist begrenzt. Auf dem signierten Runner enthielten 90 PCM-Schnappschüsse im Sekundentakt keine nicht endlichen Samples, mit einem Spitzenwert von 0.1255 und dem ersten Ton über 0.001 bei 11.03 Sekunden. Der Betreuer hat den Ton bestätigt. Die Samples sind eine Stichprobe, nicht jedes Sample, das das Spiel ausgegeben hat.",
        ],
      },
    ],
    works: [
      "Partitionierte FFT-Faltung für die Hall-Batches von FMOD mit gemeinsamem Eingang und gemeinsamer Impulsantwort.",
      "Komplexe Spektren in Float32 und float16, Overlap-Add und Historie über Grains hinweg.",
      "Wartebedingungen, die nur für einen abgeschlossenen Batch dieses Kontexts gelingen. Die anfängliche Kennung -1 schlägt fehl.",
      "Endliches PCM im erneuten Test von Subnautica, wobei das Knacken und die spätere Stille weg sind.",
    ],
    gaps: [
      "Eigenständige Aufrufe von ACM für FFT, IFFT und Panner sind nicht implementiert.",
      "Spektren-Offsets ungleich null und nicht gemessene Routing-Layouts werden abgelehnt.",
      "Die Faltung läuft auf der CPU. Es gibt keinen GPU-FFT-Pfad.",
    ],
  },

  ajm: {
    title: "AJM-Codecs",
    summary:
      "AJM dekodiert ATRAC9, MP3, MPEG-4 AAC und Opus. Jede Codec-Instanz behält ihren eigenen Zustand, und ein unbekannter Codec wird abgelehnt, statt als stiller Erfolg gemeldet zu werden.",
    sections: [
      {
        heading: "Codecs und Sampleformate",
        paragraphs: [
          "Codec 0 ist MP3, über minimp3. Codec 1 ist ATRAC9. Codec 2 ist MPEG-4 AAC, über FAAD2, für Aufträge in ADTS, roh und SAF. Codec 24 ist Opus, über libopus. Die Ausgabe von ATRAC9 kann vorzeichenbehaftete 16 Bit, vorzeichenbehaftete 32 Bit, Float oder planar sein. Initialisierung, Codec-Informationen, Gapless-Metadaten, Bytezahlen des Stroms, Zahlen dekodierter Frames und die gesamten Sample-Seitenbänder bleiben erhalten.",
          "Aufträge dürfen einen zusammenhängenden Puffer oder einen geteilten Puffer nutzen. Der Instanzzustand gilt je Decoder, sodass zwei Ströme sich kein Bit-Reservoir teilen. Der ältere Pfad libSceAudiodec nutzt dasselbe Backend für ATRAC9, MP3 und AAC nach seinen eigenen Aufrufen für Init, Erzeugen, Zurücksetzen und Löschen.",
        ],
      },
      {
        heading: "Filmaudio und Vorschauen",
        paragraphs: [
          "Das beobachtete mehrkanalige ATRAC9-Layout der PlayStation 5 wird als verschachtelte Mono-Ströme dekodiert. Das Filmaudio von Ghost of Yōtei setzt deshalb an der richtigen Stelle ein. Eine Haptikspur, die der Film mitführt, wird zeitlich mitgeführt und bleibt stumm. Controller-Vibration wird daraus nicht synthetisiert.",
          "FSB-gestützte Fallback-Vorschauen werden auf den Mix mit 48 kHz neu abgetastet, erhalten ein kurzes Fade und werden einmal geleert. Sie werden nicht in den lebenden AudioOut-Graphen gemischt, solange nicht PS5_AUDIO_FALLBACK_MIX=1 gesetzt ist, weil eine zweite Kopie desselben Clips ein Echo ist.",
        ],
      },
      {
        heading: "Lizenzen",
        paragraphs: [
          "ATRAC9, FAAD2, minimp3 und Opus sind Decoder von Drittanbietern. Ihre Lizenzen liegen im Verzeichnis docs/licenses des Repositorys und beim portablen Build. Der eigene Code des Emulators bleibt GPL-3.0-or-later.",
          "Eine Codec-Nummer außerhalb der vier implementierten Werte ist ein Fehler. Einen Puffer aus Nullen und einen Erfolgscode zurückzugeben ließe einen Titel glauben, der Strom sei dekodiert worden.",
        ],
      },
    ],
    works: [
      "ATRAC9, MP3, MPEG-4 AAC und Opus, mit Decoderzustand je Instanz.",
      "ATRAC9-Ausgabe als vorzeichenbehaftetes 16-Bit-, vorzeichenbehaftetes 32-Bit-, Float- oder planares PCM.",
      "Gapless- und Seitenband-Metadaten, zusammenhängende und geteilte Eingabepuffer.",
      "Das gemeinsame Backend hinter libSceAudiodec.",
    ],
    gaps: [
      "Unbekannte AJM-Codec-Nummern werden abgelehnt.",
      "Haptikspuren bleiben stumm. Vibration wird daraus nicht emuliert.",
      "Das Mischen der Fallback-Vorschau ist aus, solange nicht PS5_AUDIO_FALLBACK_MIX=1 gesetzt ist.",
    ],
  },

  ngs2: {
    title: "NGS2",
    summary:
      "NGS2 behält Handles für System, Rack und Voice, liest gewöhnliche RIFF/WAVE-Daten und taktet ein stilles Grain mit 48 kHz, damit ein Software-DSP-Worker nicht in einer Schleife drehen kann. Die Voice-Synthese selbst ist unvollständig.",
    sections: [
      {
        heading: "Handles und Parameter",
        paragraphs: [
          "Ein Titel erzeugt ein NGS2-System, Racks und Voices und geht danach eine verkettete Liste von Parameteränderungen ab. PS5PCEM vergibt stabile Handles, prüft, dass ein Kind noch zu einem lebenden Elternobjekt gehört, und geht diese Listen innerhalb einer Schranke ab. Play, Pause, Resume, Stop und Kill werden angewandt, wenn die Voice ausgegeben wird. Der Zustand wird mit den exakten 32-Bit-Flags gemeldet, die der Gast liest.",
          "Gewöhnlicher RIFF/WAVE-Aufbau wird gelesen. Eine neutrale Pan-Matrix bleibt erhalten, sodass eine Voice, die nicht geschwenkt wurde, keine veraltete Matrix einer anderen Voice übernimmt. Das Grain ist float32.",
        ],
      },
      {
        heading: "Warum das Grain getaktet wird",
        paragraphs: [
          "Jedes stille Ausgabe-Grain wird mit 48 kHz getaktet. Ohne diese Wartezeit ruft der Software-DSP-Worker eines Titels den Renderer in einer engen Schleife auf und belegt einen ganzen Host-Kern. Der Takt entspricht der Uhr von AudioOut, sodass der Worker etwa die Länge des Grains schläft.",
          "Die Samples selbst sind Stille. Die eigentliche Voice-Synthese und das Mischen von NGS2 sind nicht implementiert. Ein Titel, dessen Tonspur vollständig innerhalb von NGS2 entsteht, hört diese Voices über diesen Pfad nicht. Titel, die mit AJM dekodieren und PCM an AudioOut reichen, brauchen die NGS2-Synthese nicht.",
        ],
      },
    ],
    works: [
      "Stabile Handles für System, Rack und Voice mit Prüfungen der Lebensdauer des Elternobjekts.",
      "RIFF/WAVE-Aufbau, begrenzte Parameterlisten und exakte Zustandsflags von 32 Bit.",
      "Play, Pause, Resume, Stop und Kill, angewandt bei der Ausgabe, mit einer neutralen Pan-Matrix.",
      "Ein stilles float32-Grain, getaktet mit 48 kHz.",
    ],
    gaps: [
      "Voice-Synthese und der Mischer von NGS2 sind nicht implementiert.",
      "Das getaktete Grain ist Stille, daher bleibt eine nur über NGS2 erzeugte Musik still.",
      "Eigene DSP-Plug-ins innerhalb einer Voice liegen außerhalb dieses Modells.",
    ],
  },

  avplayer: {
    title: "AvPlayer",
    summary:
      "SceAvPlayer dekodiert Filmcontainer mit FFmpeg in NV12-Bilder, die dem Titel gehören, und in Stereo-PCM mit 48 kHz. Die Wiedergabe endet, wenn die Dauer der Quelle überschritten ist, auch wenn der Titel einen der Ströme nie liest.",
    sections: [
      {
        heading: "Puffer, die dem Titel gehören",
        paragraphs: [
          "Der Player nutzt die Zuteilungs-Rückrufe des Titels und die Datei-Rückrufe des Titels. FFmpeg untersucht den Container und dekodiert Video zu NV12 in der Auflösung der Quelle und Audio zu verschachteltem vorzeichenbehaftetem 16-Bit-Stereo mit 48 kHz. Video und Audio haben getrennte Sperren und getrennte Decoder-Prozesse. Zeitstempel teilen eine monotone Uhr.",
          "Pause, Suche, Schleife und Stromende bleiben erhalten. Die ABI des Software-Decoders meldet ausgerichteten Pitch, Zuteilungshöhe und den sichtbaren Ausschnitt. Sowohl die erweiterten als auch die älteren Aufrufe für Strominformationen gibt es. Aktuelle Zeit, Trickmodus bei normaler Geschwindigkeit, Abschalten eines Stroms und eine begrenzte Medienuhr decken die Unity-Middleware ab, die Asterix mitbringt.",
        ],
      },
      {
        heading: "Einen Film beenden, den der Titel nur halb liest",
        paragraphs: [
          "Ein Titel kann die Bilder nehmen und seinen eigenen Ton mischen, oder umgekehrt. Zu warten, bis jeder Strom gelesen wurde, hält diesen Player für den Rest des Prozesses am Leben. Jurassic Park Classic Games Collection blieb aus diesem Grund auf seinem Intro sitzen: Die Uhr lag neunzig Sekunden über einem drei Sekunden langen Clip, weil der ungelesene Audiostrom nie endete.",
          "Die Dauer kommt aus der Quelle. Wenn die Uhr sie überschreitet, endet die Wiedergabe, auch wenn ein Strom ignoriert wurde. Solange ein Strom noch liefert, bleibt die gemeldete Position innerhalb der Bilder, die tatsächlich übergeben wurden, sodass eine langsame Maschine nicht vorzeitig abgeschnitten wird. Sobald der Strom wirklich geendet hat, darf die Uhr bis zur Dauer laufen. Quellen mit Schleife und Quellen unbekannter Länge bleiben unangetastet.",
        ],
      },
      {
        heading: "Darstellung",
        paragraphs: [
          "Beobachtete Introfilme laufen in ReleaseFast-Builds etwa mit ihrer nativen Bildrate. Das letzte gültige Bild bleibt erhalten, während Unity die Clips wechselt, statt eine geleerte Decoder-Oberfläche als eine einheitliche Farbe auszugeben. Eine Quelle von 1920×1080 kann in das Scanout-Ziel skaliert werden, das der Titel registriert hat.",
          "Die Haptikspur wird zeitlich mitgeführt und ist stumm. AvPlayer steuert keinen Controller an. Die Pixel erreichen den Bildschirm über die Shader des Titels oder über VideoOut, nicht über einen zweiten Compositor innerhalb des Players.",
        ],
      },
    ],
    works: [
      "FFmpeg-Dekodierung zu NV12-Video und Stereo-PCM mit 48 kHz, in Puffern, die dem Titel gehören.",
      "Erweiterte und ältere Strominformationen, Pause, Suche, Schleife und eine gemeinsame Medienuhr.",
      "Ende der Wiedergabe bei der Dauer der Quelle, wenn der Titel einen Strom ungelesen lässt.",
      "Erhalt des letzten gültigen Bildes über einen Clipwechsel hinweg.",
    ],
    gaps: [
      "Haptik ist Stille. Controller-Vibration wird nicht emuliert.",
      "Quellen mit Schleife und Quellen unbekannter Länge werden von der Dauerregel nicht abgeschnitten.",
      "Ein fehlender Datei-Rückruf oder ein Container, den FFmpeg nicht untersuchen kann, lässt dieses Asset fehlschlagen.",
    ],
  },

  cpu: {
    title: "Native Gastausführung",
    summary:
      "Unter Windows x86-64 läuft der Maschinencode des Gastes direkt. Ein Host-Worker trägt jeden Gast-pthread, und die FS-Basis wird nach jedem blockierenden Aufruf wiederhergestellt, weil Windows sie nicht behält.",
    sections: [
      {
        heading: "Ein Worker je Gast-Thread",
        paragraphs: [
          "Der Verteiler startet einen Host-Worker für jeden Gast-pthread, richtet das TLS dieses Threads ein und betritt den Gast an der verlangten Adresse mit den Argumentregistern von System V. Join, Detach, Yield, Sleep, verschachtelte Rückrufe und scePthreadExit kommen alle über diesen Pfad zurück. Der HLE-Thread wird erst abgeschlossen, nachdem die Gastausführung diesen Kontext verlassen hat.",
          "Die Brücke prüft, dass der Eintrittspunkt ausführbar ist und dass Stack und TLS abgebildet sind. Sie sichert die nonvolatilen Register von Windows, MXCSR und das x87-Steuerwort, wechselt auf den Gast-Stack, setzt die FS-Basis des Gastes und ruft den Eintritt auf. Ein synchrones scePthreadExit verlässt über einen nativen Ausstieg, der die Gast-Stackframes verwirft und die FS des Hosts wiederherstellt, bevor der Verteiler die Unterbrechung sieht.",
        ],
      },
      {
        heading: "Windows verwirft die FS-Basis",
        paragraphs: [
          "FS einmal zu setzen reicht nicht. Windows erhält eine vom Nutzer geschriebene FS-Basis über einen Kontextwechsel hinweg nicht. Nach einem Sleep liest rdfsbase wieder null. Gastcode hält seinen threadlokalen Speicher in FS, nach der Konvention System V, sodass der nächste Zugriff relativ zu FS nahe Adresse null fehlschlagen würde. Am Gast ist nichts falsch. Der Host hat ein Register verworfen, auf das sich der Gast verlassen darf.",
          "Der Verteiler stellt FS deshalb nach blockierenden Aufrufen wieder her. Wartebedingungen nutzen einen sequenzbewussten Futex, sodass ein Aufwachen, das zwischen einem Freigeben und dem Parken eintrifft, genau einmal verbraucht wird, und ein Broadcast für jeden Wartenden sichtbar bleibt, der die ältere Sequenz beobachtet hat. Wenn die feste Wake-Historie jemals gesättigt ist, weckt der Verteiler mehr als nötig und lässt HLE das Objekt erneut prüfen. Zeitbegrenzte Schlafvorgänge nutzen eine private, nicht alarmierbare Verzögerung, damit ein unabhängiges Aufwachen einen Audio-Worker nicht in eine Dauerschleife versetzt.",
        ],
      },
      {
        heading: "Fehler und andere Betriebssysteme",
        paragraphs: [
          "Ein fehlerhafter Gast-Thread wird eingedämmt. Die Diagnose ordnet die Adresse einem Modul und einem Symbol zu, wenn sie es kann, und der Prozess muss nicht an einer unbehandelten Ausnahme des Hosts sterben. PS5_CPU_WAIT_DIAGNOSTICS=1 schaltet die ausführliche Warte-Ablaufverfolgung wieder ein. Sie ist beim gewöhnlichen Spiel aus, weil mehrere geparkte Worker, die gleichzeitig ausgeben, selbst ein Bild aufhalten können.",
          "Native Ausführung verlangt Windows x86-64 und das Prozessormerkmal RDWRFSGSBASE. Builds für Linux und macOS kompilieren weiterhin den Decoder, den Lader und HLE und melden die native Brücke als nicht unterstützt. Gastbinärdateien sind Maschinencode für x86-64. Sie werden nicht interpretiert.",
        ],
      },
    ],
    works: [
      "Native Gastausführung für x86-64 unter Windows, ein Host-Worker je Gast-pthread.",
      "Aufrufe nach System V, Gast-Stacks und FS, wiederhergestellt nach blockierenden Aufrufen.",
      "Sequenzbewusste Wartebedingungen, eingedämmte Fehler und ein pthread-Ausstieg, der den Host wiederherstellt.",
      "Untersuchung, Dekodierung und HLE unter Linux und macOS, ohne native Ausführung.",
    ],
    gaps: [
      "Es gibt keinen Interpreter. Andere Hosts als Windows x86-64 führen den Gast nicht aus.",
      "Eine CPU, die die Basen von FS und GS nicht schreiben kann, kann die native Brücke nicht betreten.",
      "Ausführliche Wartediagnose ist standardmäßig aus, weil ihre Ausgaben das Spiel aufhalten.",
    ],
  },

  loader: {
    title: "Laden von ELF und SELF",
    summary:
      "Der Lader bildet entschlüsselte PS5-SELF- und nackte ELF64-Module ab, wendet Relokationen an und löst Importe gegen die HLE-Registrierung auf. Der Titel erhält danach stabile Handles für Module, die er selbst startet.",
    sections: [
      {
        heading: "Abbilder",
        paragraphs: [
          "Eine ausführbare Datei der PlayStation 5 ist gewöhnlich ein SELF-Container um ein ELF64-Abbild. PS5PCEM liest sowohl den Container als auch ein nacktes ELF. Der Leser sammelt Importe, bildet Segmente in den reservierten Gastadressraum ab und wendet Relokationen an. TLS-Abbilder werden bei den Threads registriert, die sie ausführen werden.",
          "Die Werkzeuge können ein Modul untersuchen, einen relokierten Abhängigkeitsgraphen ausgeben oder einen Shader disassemblieren, ohne den Titel zu starten. game-run ist der Pfad, der lädt, HLE initialisiert und den Gast betritt. Wenn die entschlüsselte eboot.bin getrennt von der Installation liegt, richtet --app0 den nur lesbaren Mount auf das Inhaltsverzeichnis.",
        ],
      },
      {
        heading: "Module, die der Titel später startet",
        paragraphs: [
          "Die Laufzeit bildet den erreichbaren Abhängigkeitsgraphen ab, plus alles, was in PS5_PRELOAD genannt ist, bevor Gastcode läuft. sceKernelLoadStartModule gibt danach ein stabiles Handle für ein Modul in dieser Menge zurück. Es erneut zu laden erzeugt keine zweite relokierte Kopie. sceKernelDlsym hasht den Namen, den der Titel übergeben hat, und sucht nur in dem Modul, das das Handle gewählt hat, sodass zwei Plug-ins, die denselben Rückruf exportieren, nicht als Alias zusammenfallen.",
          "Der Pfadvergleich ignoriert die Richtung des Schrägstrichs und die Groß- und Kleinschreibung. Ein beobachteter Titel verlangt Il2CppUserAssemblies.prx und liefert Il2cppUserAssemblies.prx. Ein exakter Vergleich würde eine Datei ablehnen, die der Titel installiert hat. Der relative Pfad wird vor dem nackten Dateinamen versucht, sodass zwei Module, die sich einen Dateinamen teilen, unterscheidbar bleiben. Ein Modul, das nicht in der veröffentlichten Menge stand, liefert ENOENT. Es wird nicht abgebildet, während Gast-Threads bereits laufen.",
        ],
      },
      {
        heading: "Unity-Plug-ins",
        paragraphs: [
          "Unity-Plug-ins können mit aufgeschobenen Konstruktoren abgebildet werden. sceKernelLoadStartModule startet sie danach einmal, mit dem echten Argumentblock des Titels, statt diese Konstruktoren während der Initialisierung des Graphen auszuführen. Diese Reihenfolge ist der Unterschied zwischen einem Plug-in, das seine Argumente sieht, und einem Plug-in, das zu früh startet.",
          "Der Lader entschlüsselt kein Retail-SELF. Die Eingabe ist ein entschlüsseltes Abbild, das zu laden der Nutzer berechtigt ist. Verschlüsselte Pakete sind Sache des PKG-Werkzeugs, und die Retail-Verschlüsselung liegt auch außerhalb dieses Werkzeugs.",
        ],
      },
    ],
    works: [
      "Abbildung von ELF64 und entschlüsseltem SELF, Relokation, Importe und TLS.",
      "Ein vorgeladener Abhängigkeitsgraph und stabile Handles von sceKernelLoadStartModule.",
      "Dlsym begrenzt auf das gewählte Modul, mit Pfadvergleich ohne Beachtung der Groß- und Kleinschreibung.",
      "Aufgeschobene Konstruktoren für Unity-Plug-ins, damit sie mit den echten Argumenten starten.",
    ],
    gaps: [
      "Ein Modul, das erst nach dem Start erscheint und nicht vorgeladen wurde, liefert ENOENT.",
      "Verschlüsselte Retail-SELF-Abbilder werden nicht entschlüsselt.",
      "Inspektions-Builds führen das geladene Abbild auf Hosts, die nicht Windows sind, nicht aus.",
    ],
  },

  input: {
    title: "Controller und Tastatur",
    summary:
      "DualSense, DualSense Edge und DualShock 4 werden über HID gelesen, an USB und Bluetooth. Pads, die zu Xbox passen, nutzen XInput. Die Tastatur wird über ein Launcher-Profil auf die Sticks abgebildet.",
    sections: [
      {
        heading: "HID-Reports",
        paragraphs: [
          "XInput zählt Geräte auf, die zu Xbox passen. Ein DualSense, der am PC steckt, ist dafür unsichtbar, solange keine Übersetzungsschicht ein virtuelles Xbox-Pad erfindet. PS5PCEM öffnet das Sony-Pad über HID und dekodiert den Report. Die Felder sind an USB und Bluetooth dieselben. Die Offsets verschieben sich, weil Bluetooth der Nutzlast einen Vorspann gibt und der DualSense seine Trigger vor die Tastenbytes legt.",
          "Das Steuerkreuz kommt als eine von acht Kompasspositionen an, nicht als vier unabhängige Bits. Lesevorgänge sind überlappend und blockieren nie. Eine Abfrage leert die Warteschlange des Treibers und behält den neuesten Report. Mit dem ältesten Report zu antworten würde die Sticks um genau den Rückstand verzögern, den das Bild aufgelaufen hatte.",
        ],
      },
      {
        heading: "Ausgabe, Motoren und die Lichtleiste",
        paragraphs: [
          "Ausgabereports tragen beide Motoren und die Lichtleiste. Über Bluetooth ist der Report verschoben und endet mit einer Prüfsumme, die das Pad prüft, bevor es handelt, sodass ein für das Kabel gebauter Report über Funk ignoriert wird. Die Eingabeseite des Launchers nennt das Pad, das sie gefunden hat, und kann einen Test von einer Sekunde ausführen, der beide Motoren dreht und die Lichtleiste durchfährt. Das Gerät wird gemeinsam geöffnet, und zum Schreiben, wo der Host es erlaubt.",
          "Das Pad hat Vorrang vor XInput. XInput bleibt der Pfad für Controller, die zu Xbox passen, und für alles, was sich als ein solcher ausgibt. Der Launcher speichert die Wahl, den Controller-Index und die Tastaturbelegungen und gibt sie an game-run als Umgebungsvariablen weiter.",
        ],
      },
      {
        heading: "Tastatur und geskriptete Eingabe",
        paragraphs: [
          "WASD ist der linke Stick. Alt plus die Pfeiltasten ist der rechte Stick. Profile können Controller, Tastatur oder beides sein. PS5_INPUT_MODE=scripted behält die Tastenimpulse der Inbetriebnahme und ignoriert die physischen Geräte, sodass ein Tastendruck in einem anderen Fenster eine gemessene Szene nicht verändert.",
          "Innerhalb von HLE kann das primäre Pad mit scePadOpen geöffnet oder mit scePadGetHandle geholt werden. Der zweite Pfad zählt für Titel, die den Controller des angemeldeten Nutzers nie öffnen, bevor sie ihn abfragen. Das ist die Host-Seite dieses Handles.",
        ],
      },
    ],
    works: [
      "DualSense, DualSense Edge und DualShock 4 über HID an USB und Bluetooth.",
      "Abfrage des neuesten Reports, Motoren, Lichtleiste und eine Prüfsumme für Bluetooth.",
      "XInput für Pads, die zu Xbox passen, und umbelegbare Tastaturprofile.",
      "Ein geskripteter Eingabemodus, der physische Geräte während Messungen ignoriert.",
    ],
    gaps: [
      "Touchpad, adaptive Trigger und Bewegungssensoren sind kein vollständiger Funktionsumfang des DualSense.",
      "Haptik aus einer Filmspur wird nicht an die Motoren geleitet.",
      "Der HID-Pfad ist der Windows-Host-Pfad, den der Launcher und game-run nutzen.",
    ],
  },

  pkg: {
    title: "PKG-Extraktor",
    summary:
      "pkgextractor packt die in der Entwicklung beobachteten Debug-Layouts von FPKG aus: das äußere Paket, das innere PFS, NAPS-Namensabbildungen und mit Kraken komprimierte Nutzlasten. Verschlüsselte Retail-Pakete liegen außerhalb des Umfangs.",
    sections: [
      {
        heading: "Was ein Debug-Paket enthält",
        paragraphs: [
          "Ein Paket der PlayStation 5 umhüllt ein Dateisystem. Die Debug-Layouts, die PS5PCEM beobachtet hat, nutzen ein äußeres Paket, ein inneres PFS-Abbild, eine NAPS-Tabelle, die Paketnamen auf Dateien abbildet, und Nutzlasten, die mit Kraken komprimiert sind. Der Extraktor geht diese Schichten durch und schreibt die Dateien heraus. Er liegt neben dem Launcher als pkgextractor.exe, und der Launcher hat eine Schaltfläche Extract PKG, die ihn ansteuert.",
          "Der Entwicklungs-Extraktor vom 2. Oktober behebt InvalidPfs für Grand Theft Auto III: The Definitive Edition, PPSA03527 Version 1.007. Alle 48 Dateien werden extrahiert, einschließlich eboot.bin, sechs Modulen und beiden PAK-Archiven, und beide Prüfsummen der PAK-Indizes stimmen überein. 21 Pakettests bestehen. Dieser Bericht hat das Spiel nicht gestartet. Extraktion und Ausführung sind getrennte Aussagen.",
        ],
      },
      {
        heading: "Retail-Verschlüsselung",
        paragraphs: [
          "Verschlüsselte Retail-Pakete werden nicht unterstützt. Es sind keine Schlüssel enthalten oder angedeutet. Ein Paket, das der beobachtete Debug-Parser nicht erkennt, scheitert beim Lesen. Es wird nicht teilweise in ein Verzeichnis extrahiert, das vollständig aussieht.",
          "Die rechtliche Grenze entspricht dem übrigen Projekt. Das Werkzeug gibt es, damit eine Person, die bereits einen Dump besitzt, den sie nutzen darf, den Lader damit füttern kann. Die Site und der Emulator verteilen keine Spiele, keine Firmware und keine Schlüssel.",
        ],
      },
      {
        heading: "Nach der Extraktion",
        paragraphs: [
          "Der Lader liest die entschlüsselte eboot.bin und hängt das Inhaltsverzeichnis als /app0 ein. Ein übliches Layout hält eboot.bin in der Paketwurzel oder in einem entschlüsselten Unterverzeichnis. Der Launcher sucht an beiden Stellen. Spielstände liegen nicht im Paket. Sie liegen unter dem Home des Emulators, geschlüsselt nach der Titel-ID.",
          "Kraken, NAPS und PFS sind hier Mechanismen der Paketdatei. Sie sind nicht der GPU-Swizzle, die AMPR-Engine oder die Audio-Codecs, die sich leicht damit verwechseln lassen, weil auch jene Daten komprimieren oder umordnen.",
        ],
      },
    ],
    works: [
      "Beobachtete Debug-Layouts von FPKG, inneres PFS, NAPS-Namensabbildungen und Kraken-Nutzlasten.",
      "Ein Extraktor für die Kommandozeile und eine Schaltfläche im Launcher.",
      "Die Entwicklungs-Extraktion von GTA III: 48 Dateien und passende Prüfsummen der PAK-Indizes.",
      "21 Pakettests, die auf diesem Extraktor bestehen.",
    ],
    gaps: [
      "Verschlüsselte Retail-Pakete werden nicht unterstützt, und mit dem Werkzeug werden keine Schlüssel ausgeliefert.",
      "Ein nicht erkanntes Layout scheitert. Es wird nicht als unvollständiger Baum ausgegeben.",
      "Eine gelungene Extraktion ist keine Aussage darüber, dass der Titel danach läuft.",
    ],
  },
};

export default tech;
