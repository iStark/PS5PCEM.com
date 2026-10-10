import type { TechCopy } from "./en";

const tech: TechCopy = {
  hle: {
    title: "HLE, émulation de haut niveau du micrologiciel",
    summary:
      "HLE est la façon dont PS5PCEM répond aux appels de micrologiciel qu'un titre importe. Chaque NID numérique devient une fonction Zig sur une pile hôte, la convention d'appel System V de l'invité étant préservée sous Windows.",
    sections: [
      {
        heading: "Pourquoi le micrologiciel n'est pas dans le jeu",
        paragraphs: [
          "Un titre PlayStation 5 ne transporte pas le système d'exploitation qu'il appelle. Ses imports sont des identifiants de 11 caractères. PS5PCEM calcule chaque identifiant à partir du nom d'export : SHA-1 du nom plus un sel fixe, puis les huit premiers octets du condensat dans une variante de base64. Une implémentation s'enregistre sous le nom lisible et peut exiger l'identifiant que ce nom doit produire, de sorte qu'un export mal orthographié échoue à la construction du module.",
          "L'éditeur de liens dynamique recherche l'identifiant avec la bibliothèque, le module et leurs versions. Le même identifiant peut exister dans plus d'une bibliothèque. Une recherche par identifiant seul existe pour les imports qui ne portent aucune métadonnée utilisable, et ce repli est traité comme un dernier recours parce qu'il est ambigu.",
        ],
      },
      {
        heading: "L'appel s'exécute sur une pile hôte",
        paragraphs: [
          "L'invité appelle le micrologiciel directement, donc l'appel commence sur la pile du thread invité, souvent d'un mégaoctet parce que c'est ce que le titre a demandé. Le travail hôte, comme l'ouverture d'un fichier, a besoin d'un cadre bien plus grand. Le compilateur réserve ce cadre à l'entrée, avant tout retour anticipé. Un corps de micrologiciel peut donc sortir de la pile invitée avant d'atteindre la ligne qui avait besoin de l'espace, et la faute tombe en dehors de tout mappage invité.",
          "Chaque appel HLE bascule vers une pile hôte par thread pour la durée du travail hôte. Les arguments transitent par la mémoire, donc une seule souche d'assemblage sert toutes les signatures, y compris les retours en virgule flottante et les retours d'agrégats. Les appels de micrologiciel imbriqués restent sur la pile que l'appel extérieur a déjà établie. Sous Windows, l'invité utilise la convention System V AMD64 tandis que l'hôte utilise Microsoft x64, donc chaque fonction appelable par l'invité est déclarée avec la convention invitée. Omettre cette déclaration compile encore, puis lit les arguments dans les mauvais registres.",
        ],
      },
      {
        heading: "Ce que la surface HLE couvre",
        paragraphs: [
          "Au-dessus de ce mécanisme, les bibliothèques de micrologiciel fournissent la mémoire directe et flexible, les handles de modules, les pthreads, la synchronisation, les fichiers, le savedata, les fibres, les polices, le PNG, l'horloge, les manettes, AudioOut, AJM, NGS2, ACM, AvPlayer, APR et AMPR. Le réseau, SSL et l'API Web NP conservent leurs durées de vie de contexte et de requête et renvoient des erreurs hors ligne déterministes. Les boîtes de dialogue qui ont besoin d'un shell système se terminent immédiatement avec un résultat cohérent sans interface.",
          "La campagne de validation du 10 octobre a fait passer la suite HLE ReleaseSafe complète, 606 tests sur 606. Ce compte est celui de la suite du micrologiciel. Il n'enregistre pas, à lui seul, une nouvelle fréquence d'images ni une nouvelle partie menée jusqu'au bout.",
        ],
      },
    ],
    works: [
      "Calcul des NID, un registre de symboles versionné et un basculement de pile hôte pour chaque appel de micrologiciel.",
      "Appels System V de l'invité sous Windows, où la convention hôte est Microsoft x64.",
      "Mémoire, fichiers, threads, savedata, médias, codecs audio et le chemin de commandes APR/AMPR.",
      "Boîtes de dialogue sans interface et un profil réseau hors ligne qui n'ouvre pas de sockets hôtes.",
    ],
    gaps: [
      "Les bibliothèques que le titre importe et que PS5PCEM n'a pas implémentées font encore échouer l'import.",
      "Le chargement véritablement à la demande d'un module absent du graphe publié renvoie une erreur.",
      "Les services de plateforme qui exigent un vrai shell, un compte ou un pair réseau restent indisponibles.",
    ],
  },

  ampr: {
    title: "Compteurs AMPR",
    summary:
      "AMPR dans PS5PCEM est un modèle logiciel local au processus des commandes de compteurs et d'achèvement de la console. Cent vingt-huit compteurs acceptent des écritures, des mises à jour atomiques de champs, des lectures de paires et des attentes masquées, dans l'ordre de soumission.",
    sections: [
      {
        heading: "À quoi un titre utilise AMPR",
        paragraphs: [
          "Sur la console, AMPR est le moteur asynchrone qui déplace les données de fichiers et met à jour des compteurs sur lesquels le CPU et le GPU peuvent attendre. Les jeux s'en servent pour savoir qu'une lecture est arrivée, ou qu'une passe ultérieure peut commencer, sans tourner en boucle sur une variable partagée. PS5PCEM n'émule pas le bloc matériel AMPR. Il exécute le flux de commandes que le titre a construit, à l'intérieur du processus, et signale l'achèvement par la file d'événements AMPR que le titre a enregistrée.",
          "La banque de compteurs contient 128 mots de 32 bits. Une paire est un compteur d'indice pair plus le mot suivant, lus et écrits comme une seule valeur de 64 bits. Un unique verrou couvre les deux moitiés et chaque lecture-modification-écriture, de sorte qu'un lecteur ne peut pas observer une paire déchirée. L'accès peut nommer la paire entière, le mot de 32 bits, l'une ou l'autre moitié de 16 bits, ou l'un des quatre octets.",
        ],
      },
      {
        heading: "Écritures, attentes et horodatages",
        paragraphs: [
          "Une écriture est un store, un OU bit à bit, un ET avec le complément, un XOR, ou une addition avec rebouclage, appliquée au champ sélectionné. Une attente compare ce champ à une référence sous un masque. Les comparaisons sont l'égalité, le supérieur, l'inférieur, la différence, une valeur de séquence atteinte, et les formes signées du supérieur et de l'inférieur. Les comparaisons de séquence décalent le bit de signe du champ vers le bit 63, de sorte que la même règle fonctionne sur 8, 16, 32 et 64 bits.",
          "Une attente déjà satisfaite se termine sur place. Une attente non satisfaite conserve l'instantané de soumission et reprend avant les écritures et les événements ultérieurs de ce flux, y compris lorsqu'une soumission ultérieure sur le même thread invité fournit la valeur. L'API ordinaire et l'API _04_00 ont des listes d'arguments distinctes. Les horodatages sont enregistrés avec les commandes de compteurs. Les requêtes de taille d'achèvement que les titres importaient sont enregistrées, de sorte que ces appels se résolvent.",
        ],
      },
      {
        heading: "Ce que ce chemin a permis d'observer",
        paragraphs: [
          "Vingt-deux tests AMPR ciblés passent en ReleaseSafe, y compris des appels à travers la vraie surface d'export. Le démarrage de Grand Theft Auto III effectue plus de 10000 soumissions de lecture de fichiers APR et écrit plus de 350 événements d'achèvement AMPR, sans erreur AMPR correspondante sur ce chemin. Ce démarrage n'appelle pas lui-même l'API des compteurs. Le travail des compteurs est couvert par les tests et par les titres qui attendent effectivement ces valeurs.",
          "Il s'agit d'une couverture d'API pour les commandes que l'émulateur exécute. Ce n'est pas un modèle au cycle près du contrôleur mémoire de la console, et cela ne revendique pas la temporisation du matériel.",
        ],
      },
    ],
    works: [
      "Cent vingt-huit compteurs, avec des paires 64 bits cohérentes et des champs octet, demi-mot et mot.",
      "Store, OR, AND par complément, XOR et addition avec rebouclage, plus des attentes masquées et signées.",
      "Attentes bloquées qui gardent leur place dans le flux de commandes et reprennent quand la valeur arrive.",
      "Achèvement ordonné délivré par la file d'événements AMPR enregistrée.",
    ],
    gaps: [
      "WaitOnAddress reste un bouchon.",
      "La temporisation matérielle du vrai bloc AMPR n'est pas reproduite.",
      "Une commande de compteur que le décodeur ne reconnaît pas n'est pas traitée silencieusement comme un succès.",
    ],
  },

  apr: {
    title: "Identifiants de fichiers et lectures APR",
    summary:
      "APR résout un fichier de titre une fois, puis transporte un identifiant local au processus dans les tampons de commandes ultérieurs. Les lectures AMPR différées rouvrent ce même fichier /app0 en lecture seule sans conserver un descripteur hôte pour toujours.",
    sections: [
      {
        heading: "Des identifiants plutôt que des chemins",
        paragraphs: [
          "L'API de l'accélérateur ne veut pas un chemin dans chaque commande. Le titre résout un chemin, reçoit un identifiant de fichier compact, et place cet identifiant dans les commandes de lecture qu'il soumet ensuite. PS5PCEM conserve le chemin et la taille du fichier à côté de l'identifiant. La table est locale au processus. Les chemins hôtes ne sont pas rendus à l'invité.",
          "Les fichiers viennent du montage /app0 en lecture seule du titre. Une entrée résolue peut être rouverte quand une lecture différée s'exécute, de sorte que l'émulateur n'a pas à conserver chaque descripteur pendant toute la durée de vie du processus. La table mise en cache contient jusqu'à 64 fichiers.",
        ],
      },
      {
        heading: "Tampons de commandes",
        paragraphs: [
          "Une soumission est un tampon de commandes invité, pas un seul appel de lecture. PS5PCEM accepte jusqu'à 32 tampons de commandes vivants. Chaque tampon est borné : 32 lectures, 32 écritures, 32 mappages, 32 enregistrements d'achèvement et 128 opérations. Jusqu'à 64 soumissions peuvent être en vol, et un pool automatique contient huit tampons. Une lecture nomme l'identifiant de fichier, une destination invitée, une taille et un décalage dans le fichier, et elle peut nommer une adresse qui reçoit le nombre d'octets.",
          "Le lecteur rejette un identifiant inconnu, un fichier manquant, un tampon de commandes trop court ou mal aligné, et une requête qui sortirait du fichier ou de la destination. Une lecture unique est plafonnée à 4 GiB, ce qui est la limite de l'interface, pas une promesse qu'un titre émet des lectures de cette taille. Les commandes de mappage utilisent la taille de page AMM de 16 KiB que l'invité attend.",
        ],
      },
      {
        heading: "Comment APR rejoint AMPR",
        paragraphs: [
          "APR possède la table des fichiers et la durée de vie des tampons de commandes. AMPR possède les compteurs, les attentes et les événements d'achèvement qui disent au titre que le travail est fini. Un titre peut mettre en file de nombreuses lectures de fichiers, puis attendre un compteur que la commande d'achèvement met à jour. Le premier démarrage de Grand Theft Auto III est le grand cas observé : les lectures passent par ce chemin, et les événements d'achèvement reviennent par la file AMPR.",
          "Les E/S asynchrones du noyau, l'autre API de fichiers, font l'objet d'une page distincte. APR est le flux de commandes de l'accélérateur. L'API de lots du noyau est la liste de requêtes de style POSIX.",
        ],
      },
    ],
    works: [
      "Identifiants de fichiers locaux au processus pour les chemins /app0 en lecture seule, la taille étant conservée pour les lectures ultérieures.",
      "Tampons de commandes bornés pour les lectures, les écritures, les mappages et les enregistrements d'achèvement.",
      "Lectures différées qui rouvrent le même fichier de titre.",
      "Rejet contrôlé des fichiers inconnus, des dépassements et des tampons mal formés.",
    ],
    gaps: [
      "Le chemin est une exécution logicielle du tampon de commandes, pas le moteur DMA de la console.",
      "Les fichiers de paquet inscriptibles sont en dehors de /app0. Les sauvegardes passent par le montage savedata.",
      "Un fichier que le résolveur n'a pas vu ne peut pas être inventé à partir d'un identifiant nu.",
    ],
  },

  memory: {
    title: "Mémoire directe, mémoire flexible et pools",
    summary:
      "Les adresses invitées sont de vraies adresses hôtes. La mémoire directe est un pool physique partagé creux mappé dans cet espace, et MemoryPool ajoute la réserve, le commit et les opérations par lot au-dessus du même support.",
    sections: [
      {
        heading: "L'adresse invitée est l'adresse hôte",
        paragraphs: [
          "Le code x86-64 invité s'exécute nativement et contient des adresses absolues, donc PS5PCEM ne peut pas reloger le processus dans une allocation arbitraire. Le module mémoire réserve la disposition de la console avant le chargement de tout module. La fenêtre gérée par le système commence à 0x40000 et va jusqu'à un peu moins de 32 GiB. Les fenêtres réservées au système et aux périphériques suivent. La fenêtre utilisateur sous Windows et Linux va de 0x10_0000_0000 à 0xFC_0000_0000, soit 944 GiB d'espace d'adressage. macOS commence cette fenêtre plus haut et obtient 560 GiB.",
          "Ces plages sont des réservations, pas de la RAM déjà sous commit. Les pages font l'objet d'un commit par unités de 16 KiB lorsqu'un mappage est créé, et le démappage en fait le decommit tandis que la réservation extérieure demeure. Une autre allocation hôte ne peut pas voler l'adresse invitée entre deux usages.",
        ],
      },
      {
        heading: "Mémoire directe et flexible",
        paragraphs: [
          "La mémoire directe est le nom, côté invité, de la mémoire vidéo physique. Le titre réserve une plage physique, puis la mappe. Les deux étapes sont séparées. Le mappage vérifie que toute la plage physique a été réservée, traduit les protections CPU et GPU, et soit fait le commit à l'adresse fixe exacte, soit cherche un trou aligné. Le même décalage physique peut être mappé à plusieurs adresses virtuelles, et ces alias sont cohérents parce qu'ils partagent un seul objet de support creux.",
          "Un mappage fixe dans une plage que le titre a déjà réservée fait le commit à l'intérieur de la réservation. Relâcher d'abord la réservation abandonnerait la revendication du titre sur les morceaux qu'il n'a pas encore mappés. La mémoire physique est relâchée dans la forme que le titre demande, qui peut être un trou au milieu ou une étendue de plusieurs réservations. La mémoire flexible utilise la même table d'espace d'adressage, avec un budget par défaut de plateforme de 4 GiB, et cherche dans la fenêtre gérée par le système à partir de 0x02_0000_0000 avant de se replier sur la fenêtre utilisateur.",
        ],
      },
      {
        heading: "MemoryPool et le commit Windows",
        paragraphs: [
          "Les six exports MemoryPool de libkernel réservent une arène virtuelle, étendent la capacité physique, font le commit et le decommit du support partagé, exécutent des lots ordonnés et rapportent des statistiques de blocs. Les blocs donnés ne peuvent pas être mappés comme mémoire directe ordinaire, ni relâchés tant qu'ils restent sous commit. Le commit, le decommit, la protection et les changements de type par lot fonctionnent. Le MOVE par lot reste non pris en charge et renvoie une erreur plutôt que de prétendre que les blocs ont bougé.",
          "Sous Windows, les vues de mémoire directe alignées partagent des vues de section de 64 KiB. Les envois temporaires, les relectures et les pages invitées de 16 KiB ne deviennent donc pas, chacun, leur propre charge de commit sans cesse croissante. Les requêtes sur une réservation utilisent l'enregistrement de requête virtuelle de 72 octets de l'invité et rapportent des plages semi-ouvertes avec les bits de protection d'origine.",
        ],
      },
    ],
    works: [
      "Fenêtres d'adresses invitées fixes, sous commit par pages de 16 KiB et relâchées sans abandonner la réservation.",
      "Alias cohérents d'un même décalage physique de mémoire directe.",
      "Mémoire flexible avec le budget par défaut de 4 GiB, et démappages fixes, sans écrasement et partiels.",
      "Réserve, extension, commit, decommit, statistiques et lots ordonnés de MemoryPool, sauf MOVE.",
    ],
    gaps: [
      "Le MOVE par lot de MemoryPool est explicitement non pris en charge.",
      "Le relâchement d'une plage que le titre ne possède pas reste une erreur.",
      "Les réservations sont virtuelles. Seules les pages que le titre mappe consomment du commit hôte.",
    ],
  },

  savedata: {
    title: "Savedata",
    summary:
      "Un emplacement de sauvegarde monté devient un /savedata0 inscriptible. Le titre utilise l'API de fichiers ordinaire, et le lancement suivant retrouve les mêmes fichiers sous le code produit que le titre publie.",
    sections: [
      {
        heading: "Où vit une sauvegarde",
        paragraphs: [
          "L'installation du jeu est en lecture seule, peut se trouver sur un support amovible, et est remplacée en bloc lorsqu'elle est mise à jour. Une sauvegarde doit survivre aux trois. PS5PCEM stocke les emplacements dans savedata/<titleId>/<slot>/ sous le répertoire de l'émulateur, indexés par le code produit que le titre rapporte. Deux dumps du même jeu partagent les sauvegardes. Deux jeux différents ne les partagent pas.",
          "Le nom d'emplacement vient de l'invité et est assaini avant de devenir un répertoire. Les séparateurs, le deux-points du lecteur et les liens de répertoire parent deviennent des traits de soulignement. Retirer ces caractères laisserait deux noms différents s'écraser sur un seul répertoire. Un nom qui ne peut pas du tout être un répertoire se replie sur un nom fixe, parce que perdre la sauvegarde est pire que de la placer à un endroit prévisible.",
        ],
      },
      {
        heading: "Montage et vérifications d'existence",
        paragraphs: [
          "Un montage résout l'emplacement et fait pointer /savedata0 dessus. Créer un emplacement manquant n'a lieu que lorsque le titre en a demandé un. Une sonde pour une sauvegarde que le titre n'a jamais écrite obtient un résultat d'absence, ce que le titre attend. Tout ce qui est livré avec le titre reste en lecture seule. Le montage de sauvegarde est l'endroit inscriptible.",
          "L'existence est répondue à partir du chemin de métadonnées, pas en ouvrant le fichier. Un montage qui ne réussissait qu'au moment de l'ouverture faisait échouer chaque vérification d'existence, et Jets 'n' Guns 2 réécrivait son profil à chaque lancement à cause de cela. Le listage des emplacements qu'un titre a écrits est répondu lui aussi. Le montage indique aussi s'il a ouvert une sauvegarde existante ou s'il en a créé une nouvelle. L'API de sauvegarde en forme de blocs utilise un blob distinct par titre sous sce_sdmemory, chargé lorsque le titre le réserve et écrit lorsque le titre demande une synchronisation.",
        ],
      },
      {
        heading: "Emplacements incomplets",
        paragraphs: [
          "La découverte au démarrage masque les emplacements interrompus qui ne contiennent que des métadonnées de micrologiciel ou des fichiers de préparation vides. Cat Quest III avait un emplacement de réglages reproduit ne contenant que path.txt. Le titre échouait ensuite sur un Data.dat manquant et attendait indéfiniment après son image de démarrage. La recherche saute désormais cet emplacement incomplet et continue.",
          "Le lanceur regroupe chaque emplacement local par identifiant de titre sur la page Saves, y compris les sauvegardes écrites par une autre tuile de bibliothèque. Un build de développement sous zig-out résout le répertoire de l'émulateur vers la racine du dépôt. Un build empaqueté utilise son propre répertoire. Les démarrages en ligne de commande et par le lanceur du même paquet partagent donc une seule racine de sauvegardes.",
        ],
      },
    ],
    works: [
      "Montages /savedata0 inscriptibles indexés par identifiant de titre, avec des noms d'emplacement assainis.",
      "Vérifications d'existence, listage des emplacements, et indication de la création éventuelle de la sauvegarde par le montage.",
      "Un blob sce_sdmemory par titre pour l'API de sauvegarde en forme de blocs.",
      "Masquage des emplacements interrompus qui ne contiennent aucune charge utile réelle de sauvegarde.",
    ],
    gaps: [
      "Les sauvegardes sont des répertoires hôtes. La boîte de dialogue de sauvegarde de la console et la synchronisation cloud ne sont pas présentées.",
      "Un emplacement que le titre n'a pas demandé de créer est signalé comme absent.",
      "Les trophées, les activités et les autres enregistrements adossés à un compte sont en dehors de ce montage.",
    ],
  },

  fonts: {
    title: "Rendu des polices",
    summary:
      "libSceFont rastérise les faces TrueType et OpenType fournies par le titre avec FreeType. Les demandes de police système utilisent le substitut Noto Sans livré pour le latin, le grec et le cyrillique.",
    sections: [
      {
        heading: "Faces, échelle et durée de vie",
        paragraphs: [
          "Un titre ouvre une bibliothèque de polices, crée une face à partir d'octets qu'il fournit ou d'une demande de police système, puis demande les métriques et la couverture des glyphes. Chaque face conserve sa propre échelle, son échelle de rendu, son inclinaison et sa durée de vie. Fermer la bibliothèque relâche ses faces, et le démontage du processus efface l'état des polices. Les octets de la police sont copiés à l'ouverture, de sorte qu'un démappage ultérieur du tampon source du titre ne peut pas invalider le rastériseur.",
          "Noto Sans est un substitut, pas une copie identique octet pour octet de chaque police de micrologiciel. Il couvre le latin, le grec et le cyrillique. Une face fournie par le titre peut contenir d'autres glyphes, y compris le CJK, et ces contours sont utilisés. La demande de police système elle-même ne substitue pas une face CJK.",
        ],
      },
      {
        heading: "Glyphes, crénage et atlas",
        paragraphs: [
          "Le chemin des glyphes renvoie de vraies métriques, une mise en page horizontale, un crénage de paires élémentaire, une couverture anticrénelée, le découpage et des descripteurs de résultat de rendu. Un cache de glyphes borné évite de rastériser à nouveau le même caractère, et un cache de paires distinct réutilise le crénage d'une taille à l'autre. Les écritures vérifient les permissions CPU et invalident les surveillances de pages GPU avant de toucher un atlas de texture.",
          "Un scalaire Unicode valide que la face ne contient pas utilise le contour .notdef de la face, y compris les codes de contrôle rencontrés pendant qu'un titre construit une plage d'atlas complète. Ce chemin de glyphe manquant est ce qui permet à Jurassic Park Classic Games Collection de finir de construire son atlas de police. Les scalaires Unicode invalides et les identifiants de glyphes explicites hors plage renvoient encore une erreur. La couverture est écrite dans des pixels d'un à quatre octets.",
        ],
      },
      {
        heading: "Ce que la mise en page du texte laisse au titre",
        paragraphs: [
          "Beaucoup de titres n'appellent jamais libSceFont. Ils dessinent le texte avec la police de leur propre moteur, et cette implémentation ne change pas ces pixels. Le chemin HLE est destiné aux titres qui demandent au micrologiciel de rastériser.",
          "La mise en forme du texte, la mise en page bidirectionnelle, la graisse synthétique, la substitution de police système CJK, la sélection de face de collection et les API de plus haut niveau FontWriting et String ne sont pas implémentées. Les vérifications ciblées se trouvent derrière zig build test-hle avec le filtre font.",
        ],
      },
    ],
    works: [
      "Rastérisation FreeType des faces TrueType et OpenType fournies par le titre.",
      "Repli Noto Sans pour les demandes de police système en latin, grec et cyrillique.",
      "Métriques, mise en page horizontale, crénage de paires, inclinaison, découpage et cache de glyphes.",
      "Repli .notdef pour les scalaires Unicode manquants, ce qui débloque l'atlas de Jurassic Park.",
    ],
    gaps: [
      "La mise en forme, la mise en page bidirectionnelle et les API FontWriting sont absentes.",
      "Les demandes de police système ne substituent pas une face CJK.",
      "Les titres qui dessinent le texte entièrement dans leur propre moteur n'utilisent pas ce chemin.",
    ],
  },

  png: {
    title: "Encodage et décodage PNG",
    summary:
      "L'encodeur PNG écrit des fichiers RGB ou RGBA 8 bits à partir de pixels RGBA ou BGRA à pas de ligne. Le décodeur lit les images en niveaux de gris, en palette, RGB et RGBA non entrelacées dans un tampon invité vérifié.",
    sections: [
      {
        heading: "Encodage",
        paragraphs: [
          "Les titres remettent à l'encodeur un rectangle de pixels dont le pas de ligne peut dépasser la largeur. PS5PCEM accepte du RGBA et du BGRA à pas de ligne et écrit un PNG RGB ou RGBA 8 bits standard. L'appelant choisit les filtres de ligne de balayage et un niveau de compression de 0 à 9. Les écritures de sortie sont bornées par le tampon que le titre a fourni.",
          "L'encodeur est une implémentation logicielle du format de fichier. Il n'appelle pas une bibliothèque d'images du système, et il ne revendique pas une vitesse particulière par rapport à l'encodeur matériel de la console.",
        ],
      },
      {
        heading: "Décodage",
        paragraphs: [
          "libScePngDec analyse les métadonnées PNG et décode les images en niveaux de gris, palette, RGB et RGBA non entrelacées dans des tampons RGBA ou BGRA invités vérifiés. Les filtres de ligne de balayage sont appliqués, et la transparence de palette est respectée. La destination est vérifiée avant l'écriture des pixels.",
          "Une entrée entrelacée Adam7 est reconnue et refusée plutôt que décodée en une image erronée. Les icônes et les captures entrelacées ne deviennent donc pas silencieusement un tampon brouillé.",
        ],
      },
      {
        heading: "Où cela se place",
        paragraphs: [
          "PNG est l'un des petits services de micrologiciel qu'un titre rencontre au démarrage : icônes, atlas et vignettes de sauvegarde. Il est indépendant du chemin film d'AvPlayer, qui utilise FFmpeg pour le H.264, et indépendant du rastériseur de polices.",
          "Le rapport micrologiciel du 9 octobre groupe l'encodeur avec l'horloge et les requêtes de taille d'achèvement AMPR. Ces trois éléments ont fermé des manques d'import. Ils ne changent pas, à eux seuls, un temps d'image mesuré.",
        ],
      },
    ],
    works: [
      "Entrée RGBA et BGRA à pas de ligne vers un PNG RGB ou RGBA 8 bits, aux niveaux de compression 0–9.",
      "Décodage des niveaux de gris, de la palette, du RGB et du RGBA non entrelacés, filtres et alpha de palette compris.",
      "Tampons de destination vérifiés et sortie d'encodeur bornée.",
    ],
    gaps: [
      "Le PNG entrelacé Adam7 est reconnu et n'est pas décodé.",
      "Le 16 bits et les chunks auxiliaires exotiques sont en dehors du sous-ensemble implémenté.",
      "Il n'y a pas de bloc PNG matériel. Les deux côtés s'exécutent sur le CPU.",
    ],
  },

  rtc: {
    title: "Horloge temps réel",
    summary:
      "RTC vérifie les champs de calendrier, convertit le FILETIME de Windows et fait une arithmétique contrôlée sur les ticks. L'invité voit une horloge cohérente sans la conversion d'heure d'été de l'hôte.",
    sections: [
      {
        heading: "Ce que font les appels",
        paragraphs: [
          "Les titres demandent au micrologiciel l'heure courante, une conversion entre des comptes de ticks et des champs de calendrier, et une arithmétique qui ne doit pas reboucler vers une date absurde. PS5PCEM valide les champs de calendrier, convertit vers et depuis FILETIME, et contrôle l'arithmétique des ticks pour qu'un dépassement soit une erreur plutôt qu'une valeur tronquée.",
          "Les requêtes UTC et locales renvoient des valeurs cohérentes issues de l'horloge hôte. La conversion qui appliquerait les règles d'heure d'été de l'hôte à une heure locale invitée n'est pas implémentée. Un titre qui n'a besoin que d'un horodatage monotone ou UTC obtient tout de même une réponse utilisable.",
        ],
      },
      {
        heading: "Pourquoi c'est distinct du temps audio",
        paragraphs: [
          "Le rythme audio utilise le périphérique audio hôte et l'horloge de son tampon. AvPlayer utilise sa propre horloge média. RTC est l'horloge murale que le titre lit pour les sauvegardes, les minuteurs et l'interface de calendrier. Mélanger ces horloges, c'est ainsi qu'un titre semble se bloquer ou horodater une sauvegarde avec une heure nulle.",
          "Le rapport du 9 octobre a ajouté la validation, la conversion FILETIME et l'arithmétique contrôlée, en même temps que l'encodeur PNG et trois exports de taille d'achèvement AMPR. L'heure réseau et un réglage d'horloge visible par l'utilisateur ne font pas partie de cette surface.",
        ],
      },
    ],
    works: [
      "Validation des champs de calendrier et arithmétique contrôlée des ticks.",
      "Conversion FILETIME.",
      "Requêtes UTC et locales cohérentes à partir de l'horloge hôte.",
    ],
    gaps: [
      "La conversion, par l'hôte, de l'heure d'été de l'heure locale invitée est absente.",
      "Il n'y a pas d'interface émulée de réglages système pour l'horloge.",
      "La synchronisation de l'heure par le réseau n'est pas effectuée.",
    ],
  },

  fibers: {
    title: "Fibres et threads de niveau utilisateur",
    summary:
      "Sous Windows, chaque fibre libSceFiber est une vraie fibre Windows, de sorte qu'un basculement conserve les registres invités et la pile invitée. Les threads de niveau utilisateur démarrent par le même chemin pthread.",
    sections: [
      {
        heading: "Pourquoi une fibre ne peut pas être une opération vide",
        paragraphs: [
          "Le code invité s'exécute comme du code machine natif. Un basculement de fibre doit reprendre les registres exacts et la pile exacte, avec des cadres hôtes et des cadres invités mélangés sur cette pile. Renvoyer le succès depuis sceFiberSwitch sans basculer laisserait le titre continuer sur la mauvaise pile et corrompre les deux côtés.",
          "PS5PCEM adosse chaque fibre invitée initialisée à une fibre Windows. sceFiberRun, sceFiberSwitch et sceFiberReturnToThread utilisent ce mécanisme. Le thread qui a appelé sceFiberRun est la fibre racine. L'enregistrement public SceFiber de 128 octets conserve les signatures d'ABI, l'état, l'argument d'entrée, le nom et la plage de contexte fournie par l'appelant.",
        ],
      },
      {
        heading: "À qui appartient la pile",
        paragraphs: [
          "Le titre fournit un tampon de contexte, et ce tampon est enregistré dans l'objet d'ABI. Windows possède la pile réelle. Utiliser le tampon du titre comme pile Windows native sauterait la page de garde et la comptabilité de déroulement que le système d'exploitation exige. Le contexte minimal attendu par l'enregistrement de micrologiciel est tout de même vérifié, ainsi que l'alignement et les signatures de début et de fin.",
          "sceFiberGetSelf, la finalisation, les vérifications de propriété entre threads et la réinitialisation à l'exécution sont implémentés. Le backend existe sur la cible d'exécution native Windows x86-64. Les autres hôtes peuvent construire le reste de l'émulateur, et ce chemin de basculement n'y est pas disponible.",
        ],
      },
      {
        heading: "Threads de niveau utilisateur",
        paragraphs: [
          "L'initialisation et la finalisation de libSceUlt réussissent pour qu'un système de travaux du titre puisse démarrer. Les environnements d'exécution, les files d'attente, les pools de données de file, les mutex, les sémaphores et les files conservent un état côté hôte indexé par les objets que le titre a alloués. Les éléments de travail eux-mêmes démarrent par le chemin pthread existant. Les requêtes de taille de zone de travail renvoient les tailles alignées que ces créations attendent.",
          "Les files d'événements user-edge du noyau partagent la même attente sensible à la séquence que la synchronisation pthread. Le filtre VideoOut -13 et le filtre graphique -14 empruntent cette file et conservent l'identifiant et les données utilisateur de chaque enregistrement. ULT est de la colle d'ordonnancement. Il n'ajoute pas un second émulateur de CPU.",
        ],
      },
    ],
    works: [
      "Fibres Windows pour sceFiberRun, sceFiberSwitch et sceFiberReturnToThread.",
      "Signatures d'ABI, vérifications de propriété et pile possédée par l'hôte avec une page de garde.",
      "Initialisation ULT, files, mutex, sémaphores et éléments de travail adossés à pthread.",
      "Files d'événements user-edge partagées avec l'achèvement VideoOut et graphique.",
    ],
    gaps: [
      "Le basculement de fibre existe sous Windows x86-64. Les autres systèmes d'exploitation hôtes n'exécutent pas le code invité nativement.",
      "Une fibre n'est pas un thread matériel ordonnancé de façon préemptive.",
      "ULT n'implémente pas un interpréteur distinct pour les corps de travail.",
    ],
  },

  aio: {
    title: "Lectures de fichiers asynchrones du noyau",
    summary:
      "L'API AIO du noyau accepte un lot de lectures et renvoie un identifiant. PS5PCEM exécute le lot à la soumission, ce que l'interface permet, et le titre recueille un résultat terminé.",
    sections: [
      {
        heading: "L'interface",
        paragraphs: [
          "Les moteurs qui diffusent des ressources soumettent une liste de lectures et demandent plus tard si le lot est terminé. Un titre construit ainsi ne peut pas charger un fichier sans l'API. PS5PCEM accepte le lot, exécute les lectures au moment où il est soumis, et range les résultats sous l'identifiant. Un sondage ultérieur observe un lot déjà achevé.",
          "Terminer immédiatement est une issue légale de l'interface. Les appelants doivent gérer une requête qui s'est terminée avant le sondage. L'émulateur ne dort pas pour imiter la latence du périphérique, et il ne signale pas le lot comme échoué afin de paraître plus asynchrone.",
        ],
      },
      {
        heading: "En quoi cela diffère d'APR",
        paragraphs: [
          "L'AIO du noyau est le lot de style POSIX sur les descripteurs de fichiers que le titre a déjà ouverts. APR est le chemin de l'accélérateur : les chemins deviennent des identifiants, et les commandes vivent dans un tampon de commandes AMPR avec des compteurs et des événements d'achèvement. Un titre peut utiliser l'un, l'autre, ou les deux.",
          "Les deux chemins lisent l'installation du titre comme des données que l'émulateur n'a pas produites. Les bornes sont vérifiées. Un tampon trop court ou un mauvais descripteur est un retour d'erreur, pas une écriture partielle présentée comme un succès.",
        ],
      },
    ],
    works: [
      "Soumission par lot, un identifiant, et un achèvement que le titre peut recueillir.",
      "Lectures effectuées sur les fichiers que le titre a ouverts.",
      "Achèvement immédiat, que l'API invitée permet.",
    ],
    gaps: [
      "Il n'y a pas de thread d'E/S distinct qui imite la latence du disque.",
      "L'ordonnanceur de priorité et de bande passante de la console n'est pas modélisé.",
      "Les tampons de commandes APR sont une API différente et ne sont pas réécrits en AIO du noyau.",
    ],
  },

  agc: {
    title: "AGC et le flux de commandes PM4",
    summary:
      "Un titre PS5 construit des paquets GPU dans sa propre mémoire et soumet le tampon. PS5PCEM décode ce flux PM4, conserve l'état des registres, et exécute les draws et les dispatches dans l'ordre.",
    sections: [
      {
        heading: "Le flux est l'API graphique",
        paragraphs: [
          "Le titre n'a pas à appeler une fonction de tracé de haut niveau pour chaque triangle. Il écrit des paquets : mises à jour de registres, draws, dispatches, fences et flips. Quelle que soit la couche qui a produit le tampon, le GPU voit le même flux. Le décodeur nomme les paquets dont les opcodes ont une signification documentée et laisse les autres sous forme de nombres. Un nom inventé dans une trace serait pire qu'un opcode.",
          "La longueur du corps du paquet est stockée avec un biais de un, de sorte qu'un corps vide ne peut pas être encodé. Chaque pas vérifie ses bornes. Un corps qui ne tient pas est signalé. Il n'est pas rogné, parce qu'un corps rogné décalerait chaque paquet suivant et la trace mentirait.",
        ],
      },
      {
        heading: "État, attentes et tampons indirects",
        paragraphs: [
          "L'état des registres survit d'une soumission à l'autre, y compris les écritures de zéro. L'exécuteur applique les listes de registres directes, les listes indirectes natives et héritées, acquire et release, les attentes 32 bits et 64 bits, les écritures, les événements et SetFlip. Une attente non satisfaite renvoie l'état bloqué et le mot exact d'où reprendre. La mémoire invitée n'est pas modifiée pour fabriquer un progrès.",
          "Les tampons indirects sont suivis récursivement, à la fois la forme ordinaire de 4 dwords et la forme conditionnelle de 14 dwords. Les paquets de chaînage terminent le parent. L'imbrication s'arrête à seize cadres. Un enfant bloqué renvoie un chemin fixe de la racine jusqu'à la feuille, de sorte que la reprise ne rejoue pas des draws déjà effectués. L'ordonnanceur copie chaque tampon de commandes racine et les tampons indirects qu'il peut atteindre, pour que le titre puisse recycler l'arène pendant qu'une attente est encore bloquée.",
        ],
      },
      {
        heading: "Des registres à un draw",
        paragraphs: [
          "À un draw ou à un dispatch, l'instantané des registres devient des ressources typées : descripteurs de tampon et d'échantillonneur de 128 bits, descripteurs d'image de 256 bits, huit cibles couleur, profondeur et stencil, viewports, scissor, cull, blend, et les champs de swizzle et de MSAA de la PS5. Les écritures manquantes de contrôle de couleur et de contrôle de découpe héritent des valeurs par défaut d'AGC. Une désactivation explicite reste une désactivation. Deux workers CPU préparent les commandes graphiques et de calcul. Un seul propriétaire Vulkan les soumet, pour que l'exécution et l'achèvement restent ordonnés.",
          "Les métadonnées de shader fournissent les tables de ressources et les registres de données utilisateur. La provenance scalaire parcourt un préfixe borné du shader, ne charge que la mémoire invitée que ce préfixe touche réellement, et s'arrête sur une branche inconnue au lieu d'inventer un descripteur. Le résultat est ce que le traducteur et le backend Vulkan consomment.",
        ],
      },
    ],
    works: [
      "Décodage PM4 avec des longueurs de corps biaisées et des bornes strictes sur chaque paquet.",
      "Banques de registres persistantes, attentes bloquées, et tampons indirects récursifs jusqu'à seize cadres.",
      "Tampons typés, images, cibles couleur, profondeur, viewport, blend et état MSAA au moment du draw.",
      "Deux workers de préparation et un seul propriétaire de soumission Vulkan ordonnée.",
    ],
    gaps: [
      "Un opcode sans signification documentée reste sans nom.",
      "Une attente bloquée n'est jamais levée en écrivant une valeur de fence factice.",
      "Les couches, les métadonnées et quelques opérations d'image sont encore incomplètes. Elles ont leurs propres pages.",
    ],
  },

  rdna2: {
    title: "Shaders RDNA2 vers SPIR-V",
    summary:
      "Les shaders PlayStation 5 sont du code machine RDNA2. PS5PCEM décode les familles GFX10, construit un graphe de flot de contrôle, et abaisse les opérations prises en charge en SPIR-V 1.5 pour Vulkan.",
    sections: [
      {
        heading: "Décodage",
        paragraphs: [
          "Le frontal reconnaît les encodages scalaires SOP1, SOP2, SOPK, SOPC, SOPP et SMEM, les encodages vectoriels VOP1, VOP2, VOP3, VOP3P, VOPC et VINTRP, ainsi que MUBUF, MTBUF, FLAT, DS, MIMG et EXP. Les corps architecturaux d'un mot et de deux mots, les littéraux facultatifs et les mots d'adresse NSA de MIMG sont conservés, de sorte qu'un opcode non pris en charge plus loin ne désynchronise pas le flux.",
          "Un opcode non reconnu à l'intérieur d'une famille connue devient une instruction non prise en charge qui porte encore sa famille, son opcode numérique, les mots bruts et une raison. Les mots d'extension SDWA et DPP conservent leurs sélecteurs, leurs modificateurs et leurs masques de voies. Le décodeur ne renomme pas un opcode qu'il ne connaît pas.",
        ],
      },
      {
        heading: "Flot de contrôle et IR typée",
        paragraphs: [
          "Les cibles des branchements directs découpent le programme en blocs. Les fusions vers l'avant, les régions imbriquées et les arêtes vers l'arrière sont enregistrées séparément. Le traducteur en service peut émettre à partir des instructions décodées. Définir PS5_GPU_SHADER_IR=1 sélectionne l'IR typée légalisée. Définir PS5_GPU_SSA=1 ajoute l'état phi et def-use, le pliage de constantes et l'élimination itérative du code mort.",
          "Les sélections acycliques deviennent des fusions SPIR-V structurées, avec des valeurs phi aux jointures. Les boucles naturelles deviennent des fusions de boucle. Un flot de contrôle irréductible devient un répartiteur d'indice de bloc qui conserve les prédicats VCC et EXEC, de sorte qu'une voie qui devait sauter une écriture la saute encore. Les masques EXEC sont réutilisés à l'intérieur d'un bloc SPIR-V et abandonnés à chaque label, parce qu'une valeur d'un côté d'une branche ne domine pas l'autre côté.",
        ],
      },
      {
        heading: "Ce que la suite du 9 octobre a mesuré",
        paragraphs: [
          "Le point de contrôle des appels scalaires du 9 octobre a fait passer 259 tests d'analyse GPU sur 259 et 232 tests Vulkan sur 232. La suite RDNA2 a fait passer 271 tests sur 281, avec les mêmes dix échecs existants et une fuite signalée. Ces sondes d'instructions n'établissent pas une nouvelle fréquence d'images pour un jeu.",
          "Les chargements d'image multi-texels, les gathers horizontaux, les shaders de fetch NGG et les appels scalaires bornés sont implémentés comme des chemins propres et décrits sur leurs propres pages. Les stores et les combinaisons de descripteurs qui n'étaient pas dans l'ensemble mesuré restent non pris en charge.",
        ],
      },
    ],
    works: [
      "Décodage des familles scalaire, vectorielle, mémoire, image et export de GFX10, littéraux et mots NSA compris.",
      "Sélections structurées, boucles naturelles, et un répartiteur pour le flot irréductible qui préserve les masques de voies.",
      "IR typée et nettoyage SSA facultatifs, sélectionnés par des variables d'environnement.",
      "SPIR-V 1.5 pour les opérations d'ALU, de mémoire, d'image, d'interpolation et d'export prises en charge.",
    ],
    gaps: [
      "Dix échecs existants de la suite RDNA2 demeurent, plus une fuite signalée.",
      "Un opcode non pris en charge arrête cet abaissement. Il n'est pas remplacé par une opération devinée.",
      "Les tests d'instructions ne sont pas un résultat de fréquence d'images.",
    ],
  },

  ngg: {
    title: "Shaders de sommets NGG",
    summary:
      "Les programmes de sommets NGG fusionnés, y compris un shader de fetch qui continue par S_SETPC_B64, se traduisent comme un seul étage graphique. Le programme d'export conserve sa propre fenêtre de données utilisateur.",
    sections: [
      {
        heading: "Le fetch et l'export sont des programmes différents",
        paragraphs: [
          "Un draw PlayStation 5 sépare souvent le travail de sommets en un shader de fetch et un shader d'export. Le shader de fetch termine son prologue d'attributs en sautant vers le code d'export avec S_SETPC_B64. PS5PCEM traite cette continuation comme une partie du même programme de sommets et traduit le résultat fusionné.",
          "Le programme d'export NGG n'emprunte pas la banque de données utilisateur du geometry shader. Ses registres scalaires sont initialisés à partir de son propre instantané de données utilisateur, en s8 pour le programme d'export. Supposer que la table de ressources se trouve dans s0:s1 est un bug que le traducteur évite expressément. Le pointeur de table vient de la paire de user-SGPR ShaderResourceTable déclarée par les métadonnées.",
        ],
      },
      {
        heading: "Attributs de sommets",
        paragraphs: [
          "Le shader de fetch et les données utilisateur étendues sont résolus en même temps que les tables embarquées de tampons de sommets et d'attributs de sommets. Jusqu'à 32 sémantiques d'entrée conservent leur indice sémantique, le VGPR matériel où elles arrivent, le format d'attribut AGC, le décalage en octets, le taux d'instance et le descripteur de tampon de 128 bits.",
          "La recherche d'attribut utilise l'octet sémantique, pas l'octet de mappage matériel. Une paire de tables incomplète ou un indice hors du domaine pris en charge est rejeté avant toute lecture invitée. Les exports PARAM de l'étage de sommets deviennent les entrées d'interpolation du fragment, et c'est ainsi qu'un pixel shader ultérieur voit les varyings.",
        ],
      },
      {
        heading: "Appels vers un shader de fetch",
        paragraphs: [
          "Un shader de fetch externe vérifié peut aussi être lié depuis S_SWAPPC_B64 ou S_CALL_B64 lorsque la paire de données utilisateur de l'appel contient encore l'adresse enregistrée par AGC. Le corps de fetch est décodé jusqu'à son S_SETPC_B64 de retour, et ce retour doit lire la paire de lien de l'appelant. Le détail des appels légaux se trouve sur la page des appels scalaires.",
          "La traduction NGG fusionnée est ce qui permet aux scènes tridimensionnelles de dépasser un prologue de fetch qui arrêtait auparavant le décodeur. Elle ne fournit pas, à elle seule, un pixel shader manquant ni une cible de rendu manquante.",
        ],
      },
    ],
    works: [
      "Programmes de sommets NGG fusionnés, y compris les prologues de fetch qui se terminent par S_SETPC_B64.",
      "Une fenêtre de données utilisateur distincte pour le programme d'export.",
      "Jusqu'à 32 sémantiques de sommets, avec formats, décalages, taux d'instance et descripteurs de tampon.",
      "Exports PARAM reliés aux entrées d'interpolation du fragment.",
    ],
    gaps: [
      "Un shader de fetch dont le retour ne correspond pas à la paire de lien de l'appelant n'est pas lié.",
      "Les appels dynamiques généraux restent non pris en charge. Voir les appels scalaires.",
      "Une géométrie qui dépend d'un export ou d'un interpolant non pris en charge fait encore échouer ce draw.",
    ],
  },

  mimg: {
    title: "Chargements d'image multi-texels",
    summary:
      "IMAGE_LOAD_BY2, BY4, PCK2 et PCK4, y compris les formes à mip explicite, s'exécutent pour les formats 2D natifs mesurés. Un chargement BY renvoie des texels consécutifs. Un chargement PCK empaquette leurs bits bruts dans un seul registre.",
    sections: [
      {
        heading: "BY et PCK",
        paragraphs: [
          "Un chargement BY écrit des texels consécutifs dans des VGPR distincts, les canaux étant ordonnés à l'intérieur de chaque texel. Un chargement PCK empaquette les bits bruts des composantes dans un VGPR de 32 bits, le premier texel dans les bits de poids faible. Les composantes signées sont tronquées à leur largeur de stockage. Les composantes UNORM sont reconstruites par une conversion à l'arrondi au pair le plus proche.",
          "Le premier texel est aligné vers le bas sur un groupe de deux ou de quatre en X. Le test de bornes utilise la coordonnée d'origine, non alignée : le groupe entier doit tenir avant l'alignement, Y doit être dans l'intervalle, et le mip demandé doit exister. Un groupe invalide met à zéro chaque registre de résultat et laisse intactes les destinations qui ne le concernent pas. Les coordonnées invalides sont remplacées par des opérandes de fetch sûrs avant que Vulkan les voie.",
        ],
      },
      {
        heading: "Quels formats",
        paragraphs: [
          "BY2 avec DMASK 0x3 couvre R8 et R16 en UNORM, SNORM, UINT, SINT, et R16 FLOAT. BY2 avec DMASK 0xF couvre RG8 UNORM, SNORM, UINT et SINT. BY4 avec DMASK 0xF couvre R8 dans ces quatre types numériques. PCK2 avec DMASK 0x1 couvre R8, R16 et RG8 UNORM, UINT et SINT. PCK4 avec DMASK 0x1 couvre R8 UNORM, UINT et SINT. Les variantes à mip explicite de ces chargements utilisent les mêmes listes de formats.",
          "Le backend fournit à la traduction le format natif exact. Des banques distinctes d'images échantillonnées UINT et SINT gardent les résultats entiers correctement typés, à côté des banques flottantes et de comparaison. Les coordonnées NSA, les registres d'adresse et de destination qui se chevauchent, et le masque EXEC ordinaire sont préservés.",
        ],
      },
      {
        heading: "Ce que le changement n'est pas",
        paragraphs: [
          "Le rapport du 9 octobre est un support partagé du shader et du backend. Il ne dépend pas d'un identifiant de jeu ni d'un hash de shader. Aucun résultat de compatibilité de jeu et aucun changement de fréquence d'images ne sont revendiqués à partir de ces seuls chargements.",
          "Les stores, ainsi que les combinaisons de formats ou de descripteurs qui n'étaient pas dans l'ensemble mesuré, restent non pris en charge. Les gathers horizontaux sont la famille d'instructions voisine et ont leur propre page.",
        ],
      },
    ],
    works: [
      "Chargements 2D mesurés BY2, BY4, PCK2 et PCK4, avec et sans mip explicite.",
      "Alignement de groupe, bornes vérifiées, et résultats mis à zéro pour un groupe invalide.",
      "Banques distinctes d'images échantillonnées entières, pour que UINT et SINT restent typés.",
      "Masques EXEC, coordonnées NSA et paires de registres qui se chevauchent, préservés.",
    ],
    gaps: [
      "Les stores d'image de ces formes ne sont pas implémentés.",
      "Les formats et les modes de descripteur hors de la table mesurée sont rejetés.",
      "Les tests n'établissent pas un nouveau chiffre d'images par seconde pour aucun titre.",
    ],
  },

  gather4h: {
    title: "Gathers horizontaux",
    summary:
      "IMAGE_GATHER4H et IMAGE_GATHER4H_PCK rassemblent un canal sur un groupe horizontal de texels. Le sous-ensemble direct 1D et 2D mesuré est couvert par 1242 dispatches GPU.",
    sections: [
      {
        heading: "Ce que l'instruction renvoie",
        paragraphs: [
          "Un gather vertical lit quatre texels en Y. La forme H les lit en X. GATHER4H écrit le canal sélectionné de ces texels. GATHER4H_PCK écrit le flux de texels bruts empaqueté. La largeur de destination suit DMASK, et les registres que l'instruction ne possède pas restent inchangés.",
          "Les bords utilisent les règles d'adressage de l'échantillonneur. Un texel qui tombe hors de l'image est traité, plutôt que lu dans une allocation voisine. La sonde du 9 octobre a exécuté 1242 dispatches GPU sur le sous-ensemble direct 1D et 2D mesuré.",
        ],
      },
      {
        heading: "Ce qui reste en dehors",
        paragraphs: [
          "A16, D16, R128, les tables de ressources indirectes, les vues en tableau, en cube et MSAA, ainsi que les formats compressés, ne font pas partie du sous-ensemble mesuré. Ces modes de descripteur et de contrôle restent des limitations explicites.",
          "Le travail de gather partage le traducteur et le chemin d'image Vulkan avec les chargements multi-texels. Il ne change pas l'adressage du detile, et il ne revendique pas un résultat de fréquence d'images.",
        ],
      },
    ],
    works: [
      "IMAGE_GATHER4H et IMAGE_GATHER4H_PCK pour les cas directs 1D et 2D mesurés.",
      "Largeurs de destination selon DMASK, et préservation des registres non concernés.",
      "Traitement des bords selon l'échantillonneur, vérifié par 1242 dispatches GPU.",
    ],
    gaps: [
      "Les modes tableau, cube, MSAA, compressé et plusieurs modes de descripteur ne sont pas dans le sous-ensemble mesuré.",
      "A16, D16, R128 et les tables indirectes restent des limitations.",
      "Aucune fréquence d'images d'un titre n'est déduite de la sonde.",
    ],
  },

  "scalar-calls": {
    title: "Appels scalaires de shader",
    summary:
      "S_SWAPPC_B64 et S_CALL_B64 sauvegardent une adresse de retour complète et exécutent une sous-routine locale bornée, y compris un appelé placé après ENDPGM. Un shader de fetch AGC vérifié peut être lié de la même façon.",
    sections: [
      {
        heading: "Appel et retour",
        paragraphs: [
          "L'opcode SOP1 0x21 est S_SWAPPC_B64. L'opcode SOPK 0x16 est S_CALL_B64, avec la cible à PC + 4 + sign_extend(SIMM16) * 4, ce qui inclut les appels vers l'arrière. Les deux écrivent l'adresse de l'instruction suivante dans la paire de SGPR de destination. Un S_SETPC_B64 correspondant y revient. CALL laisse SCC et EXEC inchangés.",
          "Un SWAPPC dont la destination est nulle reste la continuation S_SETPC_B64 existante. Les cibles SWAPPC locales peuvent être résolues à partir d'un GETPC plus une addition ou une soustraction d'un immédiat pleine largeur. La cible est capturée même si l'instruction écrit aussi le registre de lien. Un appelé qui se trouve après ENDPGM est décodé jusqu'à son retour correspondant, à l'intérieur des bornes d'allocation et d'instructions. Une continuation matérielle ordinaire s'arrête encore avant les métadonnées finales.",
        ],
      },
      {
        heading: "Comment l'appel est abaissé",
        paragraphs: [
          "Le graphe de flot de contrôle gagne des arêtes d'appel et de retour explicites. L'appelé partage l'état des registres de l'appelant et utilise le répartiteur SPIR-V borné. Un appel non pris en charge ne peut pas retomber dans le chemin linéaire du flot de contrôle. La découverte des ressources côté hôte suit les appels et les retours, de sorte qu'un descripteur initialisé dans l'appelé reste visible.",
          "Chaque appel pris en charge possède une paire de SGPR distincte, alignée sur un indice pair, de s0:s1 jusqu'à s104:s105, avec exactement un retour correspondant. Les appelés sont imbriqués ou séquentiels selon ce que le vérificateur autorise. Les cibles dynamiques générales, dont la destination est une valeur d'exécution arbitraire, restent non prises en charge.",
        ],
      },
      {
        heading: "Shaders de fetch et la sonde",
        paragraphs: [
          "Un shader de fetch externe est lié lorsque la paire de données utilisateur inchangée de l'appel correspond à l'adresse enregistrée par AGC. Le corps de fetch est décodé jusqu'à son SETPC de retour, et ce SETPC doit lire la paire de lien de l'appelant. Le cache d'analyse distingue un programme ordinaire d'un corps de fetch, de sorte qu'une insertion de fetch plus ancienne ne peut pas écraser le retour d'une sous-routine locale.",
          "Une sonde GPU de 42 dispatches vérifie 21504 mots. Le rapport du 9 octobre ne revendique pas un nouveau jalon de jeu ni une nouvelle fréquence d'images à partir des seuls appels.",
        ],
      },
    ],
    works: [
      "S_SWAPPC_B64 et S_CALL_B64 avec une adresse de retour complète et un S_SETPC_B64 correspondant.",
      "Appelés imbriqués et appelés placés après ENDPGM, dans les bornes existantes.",
      "Liaison d'un shader de fetch AGC vérifié dont le retour lit le lien de l'appelant.",
      "Une sonde de 42 dispatches couvrant 21504 mots.",
    ],
    gaps: [
      "Les cibles d'appel dynamiques générales ne sont pas prises en charge.",
      "Un appel exige une paire de lien alignée sur un indice pair et un seul retour correspondant.",
      "La sonde n'est pas un résultat en images par seconde.",
    ],
  },

  vulkan: {
    title: "Moteur de rendu Vulkan",
    summary:
      "Le backend Vulkan charge le pilote à l'exécution, exige Vulkan 1.2, et présente les images invitées par une swapchain. Les cibles de rendu, les images de stockage et les pipelines restent résidents d'un draw à l'autre.",
    sections: [
      {
        heading: "Périphérique et mémoire",
        paragraphs: [
          "Le moteur de rendu charge lui-même le chargeur Vulkan de la plateforme, de sorte que la construction n'a pas besoin des en-têtes du SDK Vulkan. L'initialisation demande Vulkan 1.2, la version qui accepte le SPIR-V 1.5 du traducteur, et préfère un périphérique discret dont une famille de files peut faire à la fois le graphique et le calcul. Les couches de validation sont demandées dans les builds de débogage lorsqu'elles sont installées.",
          "Une disposition de descripteurs contient 64 tampons de stockage, des tableaux distincts de 64 images échantillonnées 2D et 3D, et des images de stockage typées. Un anneau de 512 ensembles, une arène d'envoi de 128 MiB et des cibles de rendu invitées persistantes gardent sur le périphérique les ressources d'une image. Les traductions graphiques utilisent un cache de 256 MiB et de 1024 entrées. Une scène en flux avait dépassé l'ancien budget de 64 MiB et retraduisait les mêmes modules à chaque image.",
        ],
      },
      {
        heading: "Pipelines et timelines",
        paragraphs: [
          "La compilation des pipelines utilise deux workers par défaut. PS5_GPU_COMPILER_WORKERS peut en fixer de un à quatre. PS5_GPU_ASYNC_PIPELINES=0 revient à la compilation synchrone et coupe le préchauffage du calcul. Le préchauffage rejoue, au lancement suivant, les modules de calcul déjà compilés dans le cache du pilote. Il n'en fait jamais le dispatch, et il détruit les pipelines temporaires. Le cache du pilote est aussi stocké dans vulkan_pipeline_cache.bin, jusqu'à 4 GiB. Un fichier corrompu est écarté. Il ne peut affecter que le temps de démarrage.",
          "Le profil de compatibilité par défaut attend chaque lot soumis. L'ordonnanceur à timeline, sélectionné avec PS5_GPU_TIMELINE_SCHEDULER=1, laisse plusieurs lots en vol et n'attend qu'à une vraie relecture, à un point de synchronisation invité, ou à un anneau de ressources épuisé. Un titre, PPSA25872, active de lui-même cet ordonnanceur et la réécriture différée des petits stockages, après des comparaisons mesurées. La disposition d'image est suivie par aspect, mip et couche de tableau, et les barrières viennent de l'usage précédent de cette sous-ressource.",
        ],
      },
      {
        heading: "Formats et résidence",
        paragraphs: [
          "Cinquante-six formats hôtes sont atteignables, dont BC1 à BC7, les canaux entiers et normalisés, R16 et RG16, le demi-flottant et RGBA32_FLOAT. Les allocations d'images invitées partagent un seul registre d'alias entre les usages couleur, profondeur, stockage et échantillonnage. Une passe ultérieure peut échantillonner une cible de profondeur qu'une passe antérieure a écrite, sans aller-retour par la mémoire invitée, lorsque les signatures correspondent. Les réinterprétations et les recouvrements partiels repassent par la mémoire invitée.",
          "Le detile de calcul sur le GPU couvre les surfaces 2D et 3D standard et PRT de 4, 8 et 16 octets. Le detile RB+ et MSAA s'exécute encore sur le CPU. Les cibles UNORM 11/11/10 empaquetées à un seul échantillon se mélangent par une copie vers un tampon de stockage, puis un dépaquetage, un mélange et un rempaquetage de fragment. VideoOut est la swapchain au-dessus de ces images.",
        ],
      },
    ],
    works: [
      "Sélection à l'exécution d'un périphérique Vulkan 1.2, une swapchain, et des cibles de rendu résidentes.",
      "Cinquante-six formats hôtes, un suivi de disposition par sous-ressource, et un registre d'alias d'images.",
      "Deux workers de compilation, un cache de pilote persistant, et un préchauffage de calcul facultatif.",
      "Un ordonnanceur à timeline sur option, un titre l'activant par défaut.",
    ],
    gaps: [
      "Le profil par défaut attend encore chaque lot. La soumission à timeline est sur option.",
      "Le detile RB+ et MSAA utilise le CPU.",
      "L'éclairage des jeux et chaque chemin de métadonnées compressées ne sont pas impliqués par la liste des formats.",
    ],
  },

  msaa: {
    title: "MSAA",
    summary:
      "Des comptes d'échantillons couleur et profondeur concordants en 2×, 4× et 8× restent sur l'image hôte jusqu'à un resolve ultérieur. Asterix utilise ce chemin pour la profondeur et le stencil MSAA, ce qui a retiré une grosse relecture accidentelle.",
    sections: [
      {
        heading: "Comptes d'échantillons sur l'image hôte",
        paragraphs: [
          "Une cible de rendu PlayStation 5 peut être stockée avec deux, quatre ou huit échantillons. PS5PCEM garde une cible couleur et une cible de profondeur sur l'image Vulkan lorsque leurs comptes d'échantillons concordent, et fait le resolve plus tard. Le compte d'échantillons invité fait partie de l'instantané de ressource, à côté du mode de swizzle et des pointeurs de métadonnées.",
          "Les équations d'adresse RB+ d'Oberon, à 16 pipes et 8 packers, incluent la tranche de tableau et les bits d'échantillon 2×, 4× et 8×, pour la couleur comme pour la profondeur. Le detile de calcul GPU ne consomme pas encore ces équations. Les surfaces RB+ et MSAA se replient sur le detile CPU. Les échantillons restent corrects. Le repli est un coût, et c'est pourquoi le MSAA n'est pas décrit comme entièrement résident sur le GPU.",
        ],
      },
      {
        heading: "Profondeur et stencil dans Asterix",
        paragraphs: [
          "Asterix & Obelix: Slap Them All! dessine la forêt d'ouverture avec une profondeur et un stencil MSAA. Une passe en profondeur seule qui ignorait le compte d'échantillons relisait l'attachement à titre de diagnostic. Les attachements de profondeur et de stencil MSAA concordants restent sur le chemin de profondeur persistant, et la comparaison ainsi que la mise à jour de stencil demandées par l'invité sont appliquées.",
          "Les attachements couleur MSAA ne demandent plus l'usage en image de stockage sur ce backend. Sur la RTX 3070 Ti en sortie 1080p, un échantillon stationnaire de 30 secondes du compteur d'interface de cette forêt d'ouverture est passé d'une médiane de 46.45 FPS à 162.20 FPS. Le chiffre concerne cette vue. Ce n'est pas un minimum sur les niveaux suivants. Le déplacement, le saut et la première rencontre romaine ont été revérifiés sur le build de développement.",
        ],
      },
      {
        heading: "Ce que le resolve n'inclut pas",
        paragraphs: [
          "Un resolve ultérieur d'un compte d'échantillons concordant est implémenté. Une surface FMASK compressée liée à CMASK est un autre mécanisme et reste en dehors de ce chemin. Un import MSAA non pris en charge conserve l'effacement sûr de premier usage, au lieu d'échantillonner des données compressées non initialisées.",
          "Les 233 tests Vulkan et les sondes natives de profondeur et de stencil en 2× et 4× ont réussi avec le correctif Asterix. Le runner signé l'inclut. Le changement est plus récent que les notes de version 0.3.4.",
        ],
      },
    ],
    works: [
      "Images hôtes pour des comptes d'échantillons couleur et profondeur concordants en 2×, 4× et 8×, avec un resolve ultérieur.",
      "Attachements de profondeur et de stencil MSAA, comparaison et mise à jour de stencil comprises.",
      "Detile CPU pour l'adressage MSAA et RB+, à l'aide des équations de bits d'échantillon d'Oberon.",
      "Le correctif de la forêt d'ouverture d'Asterix, mesuré à une médiane de 162.20 FPS dans cette vue stationnaire.",
    ],
    gaps: [
      "Le detile de calcul GPU ne couvre ni le MSAA ni RB+. Ces envois utilisent le CPU.",
      "FMASK lié à CMASK n'est pas résolu comme métadonnée compressée.",
      "Le chiffre d'Asterix est une vue sur un GPU, pas une promesse de fréquence d'images pour le jeu.",
    ],
  },

  metadata: {
    title: "HTILE, DCC, CMASK et FMASK",
    summary:
      "HTILE, DCC, CMASK et FMASK sont les métadonnées compressées de profondeur et de couleur de la console. PS5PCEM suit les pointeurs, efface HTILE dans les cas qu'il comprend, et refuse une disposition qu'il traiterait sinon par un detile incorrect.",
    sections: [
      {
        heading: "Ce que sont les quatre noms",
        paragraphs: [
          "HTILE est une métadonnée de profondeur. Sur le motif GFX10 que PS5PCEM implémente, un dword couvre une région de 8×8 pixels, et ces dwords sont empaquetés dans un bloc de 32 KiB qui couvre 1024 par 512 pixels. DCC est la compression de couleur par delta pour les cibles couleur. CMASK est un masque d'effacement rapide et d'expansion. FMASK indique à un resolve multiéchantillon quel échantillon appartient à quel pixel.",
          "L'instantané de ressource conserve les pointeurs de métadonnées et les sélecteurs de disposition, y compris le bit de CMASK linéaire GFX10. Ce bit compte, parce qu'appliquer une équation d'adresse tuilée à un CMASK linéaire brouillerait le masque en silence. Le backend rejette à la place la disposition non prise en charge.",
        ],
      },
      {
        heading: "Effacements et profondeur",
        paragraphs: [
          "Des effacements HTILE et DCC corrects sont implémentés pour les dispositions que le moteur de rendu comprend. Les effacements répétés de métadonnées sont couverts par la sonde vulkan-smoke htile-clears. Une étendue de profondeur réinitialisée n'est récupérée que pour une surface active adossée à HTILE, ce qui garde intact le G-buffer de Ghost of Yōtei et laisse tout de même une liaison de profondeur d'interface 1×1 périmée échouer au contrôle de taille d'attachement.",
          "La profondeur et le stencil invités à un seul échantillon peuvent être importés et réécrits lorsque PS5_GPU_DEPTH_TRANSFER=1. Les plans de stencil liés deviennent des attachements empaquetés profondeur plus stencil, avec les opérations de comparaison et de mise à jour de l'invité. La profondeur multiéchantillon utilise le chemin MSAA. La plage Z compressée et le Z hiérarchique à l'intérieur de HTILE ne sont pas entièrement interprétés.",
        ],
      },
      {
        heading: "Ce qui reste explicite",
        paragraphs: [
          "Le travail restant, énoncé dans les notes GPU, porte sur le reste des vues de couches, les états DCC et FMASK compressés qui restent, la plage Z et le Hi-Z de HTILE, et les états CMASK couplés à FMASK. Un import MSAA non pris en charge conserve un effacement de premier usage. Échantillonner la surface compressée comme s'il s'agissait de texels ordinaires est la défaillance que ce refus existe pour éviter.",
          "Le support des métadonnées est donc partiel à dessein. Les pointeurs sont décodés. Les dispositions qui ont été validées sont honorées. Les dispositions qui n'ont pas été validées sont rejetées ou effacées.",
        ],
      },
    ],
    works: [
      "Adressage HTILE pattern-21, un dword par 8×8, en blocs de 32 KiB.",
      "Effacements HTILE et DCC pour les dispositions que le moteur de rendu comprend.",
      "Détection du CMASK linéaire, qui refuse une équation tuilée sur un masque linéaire.",
      "Import et réécriture, sur option, de la profondeur et du stencil à un seul échantillon.",
    ],
    gaps: [
      "L'interprétation complète de la plage Z de HTILE et du Z hiérarchique est incomplète.",
      "Les états DCC et FMASK compressés, et le CMASK couplé à FMASK, restent en dehors du chemin rapide.",
      "Un import compressé non pris en charge est effacé plutôt qu'échantillonné comme des texels bruts.",
    ],
  },

  detile: {
    title: "Detile des textures",
    summary:
      "Les textures PS5 sont stockées selon des motifs de swizzle GFX10, et non en lignes linéaires. PS5PCEM applique les équations d'adresse sur le CPU, et sur le GPU pour les grandes surfaces de 4, 8 et 16 octets qui s'y qualifient.",
    sections: [
      {
        heading: "Les équations d'adresse",
        paragraphs: [
          "Une texture tuilée combine par XOR la coordonnée du pixel avec les bits de pipe, de banque et d'échantillon, pour que des pixels voisins tombent dans des canaux mémoire différents. PS5PCEM implémente les équations GFX10 pour les dispositions linéaires, les tuiles Standard de 256 octets, de 4 KiB et de 64 KiB, les tuiles de 64 KiB partiellement résidentes, la profondeur Z_X et la cible de rendu R_X. Le même contrat couvre les queues de mip et les blocs 3D épais.",
          "Jusqu'à seize niveaux de mip sont placés du plus petit au plus grand. Les petits niveaux partagent les positions exactes des queues de mip de 4 KiB et de 64 KiB. Les ressources tridimensionnelles utilisent des blocs épais et des tranches de bloc en profondeur. Chaque sous-ressource expose un décalage d'octet source vérifié. Les adaptateurs de tampon, d'image, de compression par blocs, de cible couleur et de cible de profondeur n'allouent rien et rejettent un dépassement ou une plage trop courte.",
        ],
      },
      {
        heading: "Detile GPU et repli CPU",
        paragraphs: [
          "Les envois de premier usage des grandes surfaces standard de 4 octets en tuiles de 256 octets, de 4 KiB et de 64 KiB, ainsi que des grandes surfaces linéaires, passent par un detile sur le GPU. Le noyau de calcul reçoit une clé sans pointeur et un bloc de paramètres de 84 octets : taille de bloc, queue, pas, tranche, compte d'échantillons et décalage de tampon de 64 bits, dans une disposition stable entièrement en 32 bits. Les surfaces 2D et 3D standard et PRT de huit et de seize octets appartiennent à la même famille GPU.",
          "Les autres familles restent sur le CPU, y compris RB+ et MSAA. Les équations Oberon de ces familles incluent les bits d'échantillon, et le chemin CPU les utilise. Le repli est un coût en bande passante. Ce n'est pas un autre format de pixel. Les diagnostics d'un draw en cours rapportent la famille, les dimensions du bloc 3D, le compte d'échantillons, la frontière de la queue de mip et la taille de l'allocation invitée.",
        ],
      },
      {
        heading: "Pourquoi le detile apparaît dans le temps d'image",
        paragraphs: [
          "Une texture renvoyée à chaque image paie le coût du detile à chaque image. Le suivi de pages, lorsqu'il est activé, laisse une page inchangée rester résidente, de sorte que le detile est sauté. Une texture que le GPU a lui-même réécrite doit tout de même être invalidée. Le detile ne remplace pas cette règle de cohérence.",
          "Les vues échantillonnées appliquent le detile à la plage de mip nommée par le descripteur, y compris un niveau de base non nul. Le mip 0 de l'image Vulkan est alors le niveau de base de la vue. Les swizzles de composantes qui manquent encore au chemin de vue sont une limitation distincte de l'équation d'adresse.",
        ],
      },
    ],
    works: [
      "Équations d'adresse GFX10 linéaire, Standard, PRT, profondeur et cible de rendu, queues de mip et blocs 3D compris.",
      "Detile de calcul GPU pour les grandes surfaces 2D et 3D standard et PRT de 4, 8 et 16 octets.",
      "Detile CPU pour les familles restantes, bits d'échantillon MSAA et RB+ compris.",
      "Décalages de sous-ressource vérifiés, qui rejettent les plages trop courtes et les dépassements.",
    ],
    gaps: [
      "Le detile MSAA et RB+ s'exécute sur le CPU.",
      "Certains swizzles de composantes et certaines vues de couches sont encore incomplets.",
      "Une surface que le CPU écrit après l'envoi doit être invalidée avant d'être de nouveau échantillonnée.",
    ],
  },

  "page-tracker": {
    title: "Suivi de pages GPU",
    summary:
      "Le suivi de pages sur option surveille les pages invitées de 16 KiB. Le premier store CPU natif provoque une faute, avance une génération et invalide la copie GPU, pour que les pages inchangées ne soient pas hachées ni envoyées à chaque image.",
    sections: [
      {
        heading: "Le problème qu'il traite",
        paragraphs: [
          "Une cible de rendu ou un tampon de sommets qui vit en mémoire invitée doit atteindre le GPU. Envoyer toute l'allocation à chaque image est correct et coûteux. Hacher toute l'allocation pour découvrir qu'elle n'a pas changé est coûteux aussi. Le suivi de pages marque plutôt en lecture seule une page inscriptible suivie, et laisse le CPU fauter au premier store.",
          "Le gestionnaire de faute enregistre la page, rétablit la vraie protection de l'invité et avance la génération de cette page. Un draw ultérieur compare les générations. Une page inchangée reste sur le périphérique. Une page dont la génération a bougé est envoyée. PS5_GPU_PAGE_TRACKER=1 active le mécanisme. Il est éteint, sauf si cette variable, ou l'ensemble expérimental, est définie.",
        ],
      },
      {
        heading: "Ce qu'est la faute",
        paragraphs: [
          "La faute est une invalidation, pas un bug de l'invité. La page n'était en lecture seule que pour permettre à l'hôte d'observer l'écriture. Le store invité est ensuite autorisé à se terminer sous la protection demandée par le titre. Les pages qui ne sont pas suivies conservent le chemin d'envoi ordinaire.",
          "Les mappages de mémoire directe recréés avec la même adresse, la même taille, le même décalage physique et les mêmes permissions CPU conservent leurs vues hôtes. Cette réutilisation est ce qui rend une génération significative d'une image à l'autre. Un changement de support ou de permissions prend le chemin de remplacement ordinaire, et le suivi observe le nouveau mappage.",
        ],
      },
      {
        heading: "Ce qu'il ne fait pas",
        paragraphs: [
          "Le suivi ne réduit pas la résolution interne d'un titre, et il ne compile pas de shaders. Il ne retire que les transferts répétés des pages vers lesquelles le CPU n'a pas fait de store. Un titre qui réécrit un tampon à chaque image paie encore ce tampon.",
          "Les écritures d'atlas de police et les autres stores HLE invalident les surveillances avant de modifier la mémoire invitée, de sorte qu'une écriture de micrologiciel n'est pas invisible pour le GPU. Le suivi fait partie de l'ensemble GPU expérimental décrit dans la vue d'ensemble de l'architecture.",
        ],
      },
    ],
    works: [
      "Générations par page pour les pages invitées de 16 KiB lorsque PS5_GPU_PAGE_TRACKER=1.",
      "Une faute au premier store, qui rétablit la protection invitée et invalide la copie résidente.",
      "Réutilisation des vues de mémoire directe identiques, pour que les générations survivent d'une image à l'autre.",
      "Invalidation lorsque HLE lui-même écrit une page surveillée.",
    ],
    gaps: [
      "Le suivi est sur option. Le chemin de compatibilité par défaut n'en dépend pas.",
      "Les pages que le CPU réécrit à chaque image sont encore envoyées.",
      "Il ne couvre pas la cohérence de GPU à GPU à l'intérieur d'une surface de métadonnées compressées.",
    ],
  },

  videoout: {
    title: "VideoOut",
    summary:
      "VideoOut enregistre les tampons d'affichage de l'invité et n'achève un flip qu'après l'acceptation de l'image par le rappel de présentation. La fenêtre hôte est une swapchain Vulkan en 1080p SDR.",
    sections: [
      {
        heading: "Enregistrement et flips",
        paragraphs: [
          "VideoOut conserve jusqu'à seize allocations d'affichage enregistrées et quatre groupes d'attributs. Il publie l'enregistrement contigu de seize labels qu'utilise l'ABI du pilote. L'enregistrement, le changement et le désenregistrement sont validés. Un flip vide du tampon -1, que les titres utilisent au démarrage, est accepté.",
          "Les flips CPU et les flips de fin de pipe passent par le backend vivant de tampon de commandes. Un flip normal ne devient achevé qu'après que le rappel de présentation a accepté l'image. L'achèvement est délivré sur la file d'événements VideoOut, avec les données utilisateur de l'appelant. Le filtre de file est la même implémentation d'événements user-edge que celle du noyau, et l'identifiant de l'enregistrement est préservé.",
        ],
      },
      {
        heading: "Ce que l'hôte présente",
        paragraphs: [
          "La fenêtre de jeu est une swapchain Vulkan. VideoOut annonce le 1080p SDR. Le 120 Hz est annoncé comme indisponible. La préférence de jeu par défaut demande le mode performance. La résolution interne reste sous le contrôle du titre : un jeu qui rend en 4K alloue encore des cibles 4K, et la swapchain présente le scanout que le titre a enregistré.",
          "SetFlip résout l'emplacement VideoOut et l'indice de tampon, sélectionne la cible en cache dont l'adresse invitée correspond, et publie l'image. Le rythme des flips peut être affiché dans le titre de la fenêtre. Le lanceur mémorise cette préférence, et une exécution en ligne de commande peut définir PS5_SHOW_FPS=1.",
        ],
      },
      {
        heading: "Films et scanout",
        paragraphs: [
          "Les films d'introduction ne contournent pas VideoOut. AvPlayer décode dans des tampons possédés par le titre, et les shaders propres du titre, ou un scanout enregistré, les présentent. Asterix conserve le viewport de hauteur négative de l'invité comme orientation de scanout, de sorte que le composite n'est pas retourné tête en bas à la sortie.",
          "Un chargeur Vulkan manquant, un périphérique de présentation manquant ou une fenêtre manquante est signalé, et le titre continue sur le chemin sans interface. Ce mode sert au diagnostic. Ce n'est pas un second moteur de rendu, plus rapide.",
        ],
      },
    ],
    works: [
      "Jusqu'à seize tampons d'affichage, quatre groupes d'attributs, et l'ABI à seize labels.",
      "Des flips qui ne s'achèvent qu'après l'acceptation de l'image par le rappel de présentation.",
      "Une swapchain Vulkan qui annonce le 1080p SDR, le 120 Hz restant indisponible.",
      "Préférence du mode performance par défaut, et un titre de fenêtre facultatif avec le rythme des flips.",
    ],
    gaps: [
      "Le 120 Hz et une swapchain HDR hôte ne sont pas proposés.",
      "La résolution interne est celle que le titre alloue.",
      "Sans périphérique de présentation, le processus reste sans interface.",
    ],
  },

  audio: {
    title: "AudioOut",
    summary:
      "AudioOut joue le PCM invité sur un périphérique Windows à 48 kHz. Les ports hérités ont leurs propres flux et leurs propres files, de sorte que la musique et les effets jouent ensemble, et un underrun conserve l'ordre des échantillons.",
    sections: [
      {
        heading: "Ports et périphérique hôte",
        paragraphs: [
          "Un titre soumet un tampon et s'attend à ce que l'appel dure à peu près aussi longtemps que le son du tampon. Cette attente vient de la place que fait le périphérique hôte, pas d'un sommeil qui jetterait les échantillons. AudioOut, AudioIn et AudioOut2 exposent des ports rythmés, des files, des métadonnées de haut-parleurs et l'état du primaire connecté. Un lot valide chaque port, puis soumet le quantum audible une seule fois, de sorte qu'un port auxiliaire silencieux ne multiplie pas la durée.",
          "Les ports AudioOut hérités possèdent des flux Windows distincts et des files PCM. La musique et les effets peuvent jouer en même temps. La sortie du lot soumet chaque port actif. Après un underrun, l'anneau actif conserve l'ordre de ses échantillons, et un court fondu retire le clic à la reprise. Le périphérique WinMM précharge du vrai PCM et utilise une période de minuteur d'une milliseconde.",
        ],
      },
      {
        heading: "Latence",
        paragraphs: [
          "La réserve ordinaire commence à 42 ms et croît par pas de quatre tampons, jusqu'à environ 170 ms, seulement lorsque le titre en cours affame réellement le périphérique. Le profil mesuré de PPSA25872 commence à 128 ms, parce que son mixeur peut faire une pause d'environ 100 à 120 ms pendant le démarrage et le travail de scène. Cette réserve plus grande n'est pas imposée aux autres titres.",
          "Les échantillons non finis sont remplacés avant d'atteindre le périphérique. Ce traitement protège les haut-parleurs. Il ne peut pas réparer un filtre qui a déjà stocké un NaN. La page ACM décrit le bug de convolution qui produisait ces valeurs dans Subnautica.",
        ],
      },
      {
        heading: "Où la sortie existe",
        paragraphs: [
          "L'échec de l'ouverture d'un périphérique n'est pas signalé au titre. Une carte son manquante est un fait qui concerne l'hôte. L'appelant se replie sur une attente silencieuse rythmée, pour que le timing du titre continue d'avancer. Il en va de même si le périphérique meurt en cours d'exécution. La sortie est implémentée sous Windows. Les autres builds gardent les ports silencieux et correctement rythmés.",
          "Le mixage de repli direct des extraits d'aperçu décodés est éteint par défaut. Jouer un aperçu à côté du propre mix AudioOut du titre s'entend comme un écho. PS5_AUDIO_FALLBACK_MIX=1 active ce mixage. Le lanceur peut couper le périphérique avec son réglage de son, qui arrive sous la forme PS5_AUDIO_DISABLED.",
        ],
      },
    ],
    works: [
      "Lecture hôte à 48 kHz, avec des ports AudioOut, AudioIn et AudioOut2 rythmés.",
      "Flux Windows distincts pour les ports hérités, de sorte que la musique et les effets simultanés restent ordonnés.",
      "Une réserve qui commence à 42 ms et ne croît que lorsque le périphérique est affamé, jusqu'à environ 170 ms.",
      "Remplacement des échantillons non finis, et un repli silencieux rythmé lorsqu'aucun périphérique ne s'ouvre.",
    ],
    gaps: [
      "La sortie hôte est limitée à Windows.",
      "La vibration de la manette n'est pas pilotée par une piste haptique audio.",
      "Le traitement ne reconstruit pas un historique de filtre déjà empoisonné.",
    ],
  },

  acm: {
    title: "Convolution ACM",
    summary:
      "La convolution ACM exécute sur le CPU la réverbération partitionnée de FMOD. Les lots à entrée partagée transforment un seul signal sec, appliquent des partitions d'impulsion en flottant ou en demi-flottant, et additionnent par recouvrement le résultat mouillé.",
    sections: [
      {
        heading: "Le bug qu'elle a clos",
        paragraphs: [
          "Subnautica: Below Zero pouvait démarrer par un grésillement, tomber dans le silence, puis revenir des minutes plus tard. Le PCM qui atteignait le périphérique hôte contenait des flottants non finis. Une trace en mémoire des rappels DSP de FMOD montrait de l'audio fini à l'entrée de la réverbération par convolution et des déchets à la sortie. Les fonctions HLE sceAcm_ConvReverb_SharedInput, la soumission de lot et sceAcmBatchWait renvoyaient le succès sans écrire de sortie.",
          "FMOD mélangeait ensuite dans le graphe ce tampon mouillé non écrit. Les NaN se répandaient dans les effets suivants. Le traitement d'AudioOut les remplaçait par du silence et ne pouvait pas réparer l'historique de filtre empoisonné. Une seconde erreur faisait réussir l'attente sur l'identifiant de lot initial -1. FMOD traite une attente initiale échouée comme « il n'y a pas encore de tampon mouillé précédent » et ne mélange qu'après un vrai travail achevé.",
        ],
      },
      {
        heading: "Convolution partitionnée",
        paragraphs: [
          "La disposition du descripteur correspond à celle observée dans le backend ACM de FMOD. Les partitions de réponse impulsionnelle sont des bins complexes entrelacés. Un bloc de B bins appartient à une transformée de longueur 2B. Les tampons d'entrée, de sortie et de recouvrement sont distincts et planaires. Seules les dispositions de spectre float32 et float16 à décalage nul qui ont été observées sont acceptées.",
          "Un lot s'exécute sur le CPU. L'historique d'entrée est conservé d'un grain à l'autre et à travers le rebouclage de l'anneau, et le recouvrement est reporté dans le grain de sortie suivant. Plusieurs sorties peuvent partager une transformée d'entrée et une seule avance d'historique. Une entrée mono peut alimenter plus d'un canal. La transformée inverse est normalisée. Une inverse indépendante d'une partition d'impulsion réelle plaçait son énergie dans la première moitié du bloc complété par des zéros, ce qui confirme le signe du spectre. L'impulsion empaquetée qu'utilise le jeu omet le bin de Nyquist.",
        ],
      },
      {
        heading: "Attentes, limites et nouvel essai",
        paragraphs: [
          "Les constructeurs capturent les tableaux de pointeurs et les gains dans un enregistrement de commande borné. Le PCM lui-même est lu au démarrage du lot. Une attente ne réussit que pour un lot que ce contexte a réellement achevé. Détruire le contexte relâche l'historique. Les bornes invalides, les encodages de commande inconnus et les dispositions non prises en charge renvoient des erreurs.",
          "Les opérations ACM autonomes de FFT, d'IFFT et de panoramique ne sont pas implémentées. Les canaux sont plafonnés à 8, les sorties à 32 et le bloc à 1024. Le stockage de l'historique est borné. Sur le runner signé, 90 instantanés PCM à raison d'un par seconde ne contenaient aucun échantillon non fini, avec un pic de 0.1255 et le premier audio au-dessus de 0.001 à 11.03 secondes. Le mainteneur a confirmé le son. Ces échantillons sont une sonde, pas chaque échantillon émis par le jeu.",
        ],
      },
    ],
    works: [
      "Convolution FFT partitionnée pour les lots de réverbération à entrée partagée et à IR partagée de FMOD.",
      "Spectres complexes float32 et float16, addition par recouvrement, et historique d'un grain à l'autre.",
      "Des attentes qui ne réussissent que pour un lot achevé de ce contexte. L'identifiant initial -1 échoue.",
      "Du PCM fini au nouvel essai de Subnautica, le grésillement et le silence ultérieur ayant disparu.",
    ],
    gaps: [
      "Les appels ACM autonomes de FFT, d'IFFT et de panoramique ne sont pas implémentés.",
      "Les décalages de spectre non nuls et les dispositions de routage non mesurées sont rejetés.",
      "La convolution s'exécute sur le CPU. Il n'y a pas de chemin FFT sur le GPU.",
    ],
  },

  ajm: {
    title: "Codecs AJM",
    summary:
      "AJM décode ATRAC9, MP3, MPEG-4 AAC et Opus. Chaque instance de codec conserve son propre état, et un codec inconnu est rejeté au lieu d'être annoncé comme un succès silencieux.",
    sections: [
      {
        heading: "Codecs et formats d'échantillons",
        paragraphs: [
          "Le codec 0 est MP3, par minimp3. Le codec 1 est ATRAC9. Le codec 2 est MPEG-4 AAC, par FAAD2, pour les travaux ADTS, bruts et SAF. Le codec 24 est Opus, par libopus. La sortie ATRAC9 peut être du 16 bits signé, du 32 bits signé, du flottant, ou du planaire. L'initialisation, les informations de codec, les métadonnées gapless, les comptes d'octets de flux, les comptes de trames décodées et les bandes latérales du total d'échantillons sont préservés.",
          "Les travaux peuvent utiliser un tampon contigu ou un tampon scindé. L'état d'instance est propre à chaque décodeur, de sorte que deux flux ne partagent pas un réservoir de bits. Le chemin hérité libSceAudiodec utilise le même backend pour ATRAC9, MP3 et AAC après ses propres appels d'init, de création, de réinitialisation et de suppression.",
        ],
      },
      {
        heading: "Audio des films et aperçus",
        paragraphs: [
          "La disposition ATRAC9 multicanal PlayStation 5 observée est décodée comme des flux mono entrelacés. L'audio du film de Ghost of Yōtei commence au bon endroit grâce à cette disposition. Une piste haptique portée par le film est cadencée en silence. La vibration de la manette n'est pas synthétisée à partir d'elle.",
          "Les aperçus de repli adossés à FSB sont rééchantillonnés vers le mix à 48 kHz, munis d'un court fondu, puis vidés une seule fois. Ils ne sont pas mélangés au graphe AudioOut en cours, sauf si PS5_AUDIO_FALLBACK_MIX=1, parce qu'une seconde copie du même extrait est un écho.",
        ],
      },
      {
        heading: "Licences",
        paragraphs: [
          "ATRAC9, FAAD2, minimp3 et Opus sont des décodeurs tiers. Leurs licences sont livrées dans le répertoire docs/licenses du dépôt et avec le build portable. Le code propre de l'émulateur reste GPL-3.0-or-later.",
          "Un numéro de codec en dehors des quatre valeurs implémentées est une erreur. Renvoyer un tampon de zéros et un code de succès ferait croire à un titre que le flux a été décodé.",
        ],
      },
    ],
    works: [
      "ATRAC9, MP3, MPEG-4 AAC et Opus, avec un état de décodeur par instance.",
      "Sortie ATRAC9 en PCM 16 bits signé, 32 bits signé, flottant ou planaire.",
      "Métadonnées gapless et de bandes latérales, tampons d'entrée contigus et scindés.",
      "Le backend partagé derrière libSceAudiodec.",
    ],
    gaps: [
      "Les numéros de codec AJM inconnus sont rejetés.",
      "Les pistes haptiques restent silencieuses. La vibration n'est pas émulée à partir d'elles.",
      "Le mixage des aperçus de repli est éteint, sauf si PS5_AUDIO_FALLBACK_MIX=1.",
    ],
  },

  ngs2: {
    title: "NGS2",
    summary:
      "NGS2 conserve les handles de système, de rack et de voix, analyse les données RIFF/WAVE ordinaires, et rythme un grain silencieux à 48 kHz pour qu'un worker DSP logiciel ne puisse pas tourner en boucle. La synthèse des voix elle-même est incomplète.",
    sections: [
      {
        heading: "Handles et paramètres",
        paragraphs: [
          "Un titre crée un système NGS2, des racks et des voix, puis parcourt une liste chaînée de changements de paramètres. PS5PCEM délivre des handles stables, vérifie qu'un enfant appartient encore à un parent vivant, et parcourt ces listes à l'intérieur d'une borne. Play, pause, reprise, stop et kill sont appliqués lorsque la voix est rendue. L'état est rapporté avec les indicateurs 32 bits exacts que lit l'invité.",
          "La géométrie RIFF/WAVE ordinaire est analysée. Une matrice de panoramique neutre est préservée, de sorte qu'une voix qui n'a pas été panoramiquée ne reprend pas une matrice périmée d'une autre voix. Le grain est en float32.",
        ],
      },
      {
        heading: "Pourquoi le grain est rythmé",
        paragraphs: [
          "Chaque grain de rendu silencieux est rythmé à 48 kHz. Sans cette attente, un worker DSP logiciel du titre appelle le moteur de rendu en boucle serrée et occupe un cœur hôte entier. Le rythme suit l'horloge AudioOut, pour que le worker dorme à peu près la durée du grain.",
          "Les échantillons eux-mêmes sont du silence. La synthèse réelle des voix NGS2 et le mixage ne sont pas implémentés. Un titre dont la bande son est produite entièrement dans NGS2 n'entendra pas ces voix par ce chemin. Les titres qui décodent avec AJM et soumettent du PCM à AudioOut n'ont pas besoin de la synthèse NGS2.",
        ],
      },
    ],
    works: [
      "Handles stables de système, de rack et de voix, avec contrôle de la durée de vie du parent.",
      "Géométrie RIFF/WAVE, listes de paramètres bornées, et indicateurs d'état 32 bits exacts.",
      "Play, pause, reprise, stop et kill appliqués au rendu, avec une matrice de panoramique neutre.",
      "Un grain float32 silencieux rythmé à 48 kHz.",
    ],
    gaps: [
      "La synthèse des voix et le mixeur NGS2 ne sont pas implémentés.",
      "Le grain rythmé est du silence, donc une partition uniquement NGS2 reste muette.",
      "Les greffons DSP personnalisés à l'intérieur d'une voix sont en dehors de ce modèle.",
    ],
  },
  avplayer: {
    title: "AvPlayer",
    summary:
      "SceAvPlayer décode les conteneurs de films avec FFmpeg vers des images NV12 possédées par le titre et du PCM stéréo à 48 kHz. La lecture se termine lorsque la durée de la source est dépassée, même si le titre ne lit jamais l'un des flux.",
    sections: [
      {
        heading: "Des tampons que le titre possède",
        paragraphs: [
          "Le lecteur utilise les rappels d'allocation du titre et les rappels de fichiers du titre. FFmpeg sonde le conteneur et décode la vidéo en NV12 à la résolution de la source, et l'audio en stéréo 16 bits signé entrelacé à 48 kHz. La vidéo et l'audio ont des verrous distincts et des processus de décodeur distincts. Les horodatages partagent une seule horloge monotone.",
          "La pause, la recherche, la boucle et la fin de flux sont conservées. L'ABI du décodeur logiciel rapporte le pas aligné, la hauteur d'allocation et le recadrage visible. Les appels d'information de flux étendu et hérité existent tous les deux. Le temps courant, le mode trick à vitesse normale, la désactivation de flux et une horloge média bornée couvrent le middleware Unity qu'embarque Asterix.",
        ],
      },
      {
        heading: "Terminer un film que le titre ne lit qu'à moitié",
        paragraphs: [
          "Un titre peut prendre les images et mixer son propre son, ou l'inverse. Attendre que chaque flux ait été lu maintient ce lecteur en vie pour le reste du processus. Jurassic Park Classic Games Collection restait sur son introduction pour cette raison : l'horloge était à quatre-vingt-dix secondes au-delà d'un extrait de trois secondes, parce que le flux audio non lu ne se terminait jamais.",
          "La durée vient de la source. Lorsque l'horloge la dépasse, la lecture se termine même si un flux a été ignoré. Tant qu'un flux délivre encore, la position rapportée reste dans les images réellement remises, de sorte qu'une machine lente n'est pas coupée trop tôt. Une fois que le flux s'est réellement terminé, l'horloge peut aller jusqu'à la durée. Les sources en boucle et les sources de longueur inconnue sont laissées de côté.",
        ],
      },
      {
        heading: "Présentation",
        paragraphs: [
          "Les films d'introduction observés se jouent à peu près à leur fréquence d'images native dans les builds ReleaseFast. La dernière image valide est conservée pendant que Unity change d'extrait, au lieu de présenter une surface de décodeur effacée comme une couleur unie. Une source 1920×1080 peut être mise à l'échelle dans la cible de scanout enregistrée par le titre.",
          "La piste haptique est cadencée et silencieuse. AvPlayer ne pilote pas de manette. Les pixels atteignent l'écran par les shaders du titre ou par VideoOut, et non par un second compositeur à l'intérieur du lecteur.",
        ],
      },
    ],
    works: [
      "Décodage FFmpeg vers de la vidéo NV12 et du PCM stéréo à 48 kHz, dans des tampons possédés par le titre.",
      "Informations de flux étendues et héritées, pause, recherche, boucle, et une horloge média partagée.",
      "Fin de la lecture à la durée de la source lorsque le titre laisse un flux non lu.",
      "Conservation de la dernière image valide à travers un changement d'extrait.",
    ],
    gaps: [
      "Les haptiques sont du silence. La vibration de la manette n'est pas émulée.",
      "Les sources en boucle et de longueur inconnue ne sont pas coupées par la règle de durée.",
      "Un rappel de fichier manquant, ou un conteneur que FFmpeg ne peut pas sonder, fait échouer cet actif.",
    ],
  },

  cpu: {
    title: "Exécution native de l'invité",
    summary:
      "Sous Windows x86-64, le code machine de l'invité s'exécute directement. Un worker hôte porte chaque pthread invité, et la base FS est restaurée après chaque appel bloquant, parce que Windows ne la conserve pas.",
    sections: [
      {
        heading: "Un worker par thread invité",
        paragraphs: [
          "Le répartiteur démarre un worker hôte pour chaque pthread invité, installe le TLS de ce thread, et entre dans l'invité à l'adresse demandée avec les registres d'arguments System V. Join, detach, yield, sleep, les rappels imbriqués et scePthreadExit reviennent tous par ce chemin. Le thread HLE n'est achevé qu'une fois que l'exécution invitée a quitté ce contexte.",
          "Le pont vérifie que le point d'entrée est exécutable et que la pile et le TLS sont mappés. Il sauvegarde les registres non volatils de Windows, MXCSR et le mot de contrôle x87, bascule vers la pile invitée, installe la base FS invitée, et appelle l'entrée. Un scePthreadExit synchrone sort par une échappée native qui abandonne les cadres invités et restaure le FS hôte avant que le répartiteur ne voie l'interruption.",
        ],
      },
      {
        heading: "Windows abandonne la base FS",
        paragraphs: [
          "Installer FS une seule fois ne suffit pas. Windows ne préserve pas une base FS écrite par l'utilisateur à travers un changement de contexte. Après un sommeil, rdfsbase relit zéro. Le code invité garde son stockage local de thread dans FS, selon la convention System V, de sorte que l'accès suivant relatif à FS provoquerait une faute près de l'adresse zéro. Rien n'est faux dans l'invité. L'hôte a abandonné un registre sur lequel l'invité est en droit de compter.",
          "Le répartiteur restaure donc FS après les appels bloquants. Les attentes utilisent un futex sensible à la séquence, pour qu'un réveil arrivé entre un déverrouillage et le stationnement soit consommé une seule fois, et pour qu'un broadcast reste visible de chaque attendeur qui a observé la séquence plus ancienne. Si l'historique fixe des réveils vient à saturer, le répartiteur réveille en excès et laisse HLE revérifier l'objet. Les sommeils temporisés utilisent un délai privé non alertable, pour qu'un réveil sans rapport ne transforme pas un worker audio en boucle active.",
        ],
      },
      {
        heading: "Fautes et autres systèmes d'exploitation",
        paragraphs: [
          "Un thread invité en faute est contenu. Les diagnostics attribuent l'adresse à un module et à un symbole lorsqu'ils le peuvent, et le processus n'a pas à mourir sur une exception hôte non gérée. PS5_CPU_WAIT_DIAGNOSTICS=1 réactive la trace d'attente verbeuse. Elle est éteinte pendant le jeu normal, parce que plusieurs workers stationnés qui impriment en même temps peuvent eux-mêmes bloquer une image.",
          "L'exécution native exige Windows x86-64 et la fonction processeur RDWRFSGSBASE. Les builds Linux et macOS compilent encore le décodeur, le chargeur et HLE, et ils signalent le pont natif comme non pris en charge. Les binaires invités sont du code machine x86-64. Ils ne sont pas interprétés.",
        ],
      },
    ],
    works: [
      "Exécution native x86-64 de l'invité sous Windows, un worker hôte par pthread invité.",
      "Appels System V, piles invitées, et FS restauré après les appels bloquants.",
      "Attentes sensibles à la séquence, fautes contenues, et sortie de pthread qui restaure l'hôte.",
      "Inspection, décodage et HLE sous Linux et macOS, sans exécution native.",
    ],
    gaps: [
      "Il n'y a pas d'interpréteur. Les hôtes autres que Windows x86-64 n'exécutent pas l'invité.",
      "Un CPU qui ne peut pas écrire les bases FS et GS ne peut pas entrer dans le pont natif.",
      "Les diagnostics d'attente verbeux sont éteints par défaut, parce que leur impression bloque le jeu.",
    ],
  },

  loader: {
    title: "Chargement ELF et SELF",
    summary:
      "Le chargeur mappe les modules SELF PS5 déchiffrés et les modules ELF64 nus, applique les relocations, et résout les imports contre le registre HLE. Le titre reçoit ensuite des handles stables pour les modules qu'il démarre lui-même.",
    sections: [
      {
        heading: "Images",
        paragraphs: [
          "Un exécutable PlayStation 5 est d'ordinaire un conteneur SELF autour d'une image ELF64. PS5PCEM lit le conteneur aussi bien qu'un ELF nu. Le lecteur collecte les imports, mappe les segments dans l'espace d'adressage invité réservé, et applique les relocations. Les images TLS sont enregistrées auprès des threads qui vont les exécuter.",
          "L'outillage peut inspecter un module, vider un graphe de dépendances relogé, ou désassembler un shader sans démarrer le titre. game-run est le chemin qui charge, initialise HLE et entre dans l'invité. Lorsque l'eboot.bin déchiffré se trouve à l'écart de l'installation, --app0 pointe le montage en lecture seule vers le répertoire de contenu.",
        ],
      },
      {
        heading: "Modules que le titre démarre plus tard",
        paragraphs: [
          "Le runtime mappe le graphe de dépendances atteignable, plus tout ce qui est nommé dans PS5_PRELOAD, avant l'exécution du code invité. sceKernelLoadStartModule renvoie ensuite un handle stable pour un module de cet ensemble. Le charger de nouveau ne crée pas une seconde copie relogée. sceKernelDlsym hache le nom passé par le titre et ne cherche que dans le module sélectionné par le handle, de sorte que deux greffons qui exportent le même rappel ne s'aliasent pas.",
          "La correspondance des chemins ignore le sens des barres obliques et la casse. Un titre observé demande Il2CppUserAssemblies.prx et livre Il2cppUserAssemblies.prx. Une correspondance exacte refuserait un fichier que le titre a installé. Le chemin relatif est essayé avant le nom de fichier nu, de sorte que deux modules qui partagent un nom de fichier restent distincts. Un module qui n'était pas dans l'ensemble publié renvoie ENOENT. Il n'est pas mappé pendant que des threads invités s'exécutent déjà.",
        ],
      },
      {
        heading: "Greffons Unity",
        paragraphs: [
          "Les greffons Unity peuvent être mappés avec leurs constructeurs différés. sceKernelLoadStartModule les démarre ensuite une seule fois, avec le vrai bloc d'arguments du titre, au lieu d'exécuter ces constructeurs pendant l'initialisation du graphe. Cet ordre fait la différence entre un greffon qui voit ses arguments et un greffon qui démarre trop tôt.",
          "Le chargeur ne déchiffre pas un SELF de vente au détail. L'entrée est une image déchiffrée que l'utilisateur a le droit de charger. Les paquets chiffrés sont l'affaire de l'outil PKG, et le chiffrement de vente au détail est également en dehors de cet outil.",
        ],
      },
    ],
    works: [
      "Mappage ELF64 et SELF déchiffré, relocations, imports et TLS.",
      "Un graphe de dépendances préchargé et des handles sceKernelLoadStartModule stables.",
      "Dlsym limité au module sélectionné, avec une correspondance de chemin insensible à la casse.",
      "Constructeurs différés pour les greffons Unity, afin qu'ils démarrent avec les vrais arguments.",
    ],
    gaps: [
      "Un module qui n'apparaît qu'après le démarrage, et qui n'a pas été préchargé, renvoie ENOENT.",
      "Les images SELF de vente au détail chiffrées ne sont pas déchiffrées.",
      "Les builds d'inspection n'exécutent pas l'image chargée sur les hôtes autres que Windows.",
    ],
  },

  input: {
    title: "Manettes et clavier",
    summary:
      "DualSense, DualSense Edge et DualShock 4 sont lus par HID, en USB et en Bluetooth. Les manettes compatibles Xbox utilisent XInput. Le clavier est mappé sur les sticks par un profil du lanceur.",
    sections: [
      {
        heading: "Rapports HID",
        paragraphs: [
          "XInput énumère les périphériques compatibles Xbox. Une DualSense branchée au PC lui est invisible, sauf si une couche de traduction invente une manette Xbox virtuelle. PS5PCEM ouvre la manette Sony par HID et décode le rapport. Les champs sont les mêmes en USB et en Bluetooth. Les décalages se déplacent, parce que Bluetooth préfixe la charge utile, et que la DualSense place ses gâchettes avant les octets des boutons.",
          "La croix directionnelle arrive comme l'une de huit positions de compas, et non comme quatre bits indépendants. Les lectures sont asynchrones et ne bloquent jamais. Un sondage vide la file du pilote et conserve le rapport le plus récent. Répondre avec le rapport le plus ancien retarderait les sticks d'autant que l'image avait pris de retard.",
        ],
      },
      {
        heading: "Sortie, moteurs et barre lumineuse",
        paragraphs: [
          "Les rapports de sortie portent les deux moteurs et la barre lumineuse. En Bluetooth, le rapport est décalé et se termine par une somme de contrôle que la manette vérifie avant d'agir, de sorte qu'un rapport construit pour le câble est ignoré par les airs. La page d'entrée du lanceur nomme la manette trouvée et peut lancer un test d'une seconde qui fait tourner les deux moteurs et balaie la barre lumineuse. Le périphérique est ouvert en partage, et en écriture là où l'hôte le permet.",
          "La manette a priorité sur XInput. XInput reste le chemin des manettes compatibles Xbox et de tout ce qui se présente comme tel. Le lanceur mémorise le choix, l'indice de manette et les affectations du clavier, et les passe à game-run comme variables d'environnement.",
        ],
      },
      {
        heading: "Clavier et entrée scénarisée",
        paragraphs: [
          "WASD est le stick gauche. Alt plus les touches fléchées est le stick droit. Les profils peuvent être manette, clavier, ou les deux. PS5_INPUT_MODE=scripted conserve les impulsions de boutons de la mise en route et ignore les périphériques physiques, de sorte qu'une frappe dans une autre fenêtre ne change pas une scène mesurée.",
          "Dans HLE, la manette principale peut être ouverte avec scePadOpen ou obtenue avec scePadGetHandle. Le second chemin compte pour les titres qui n'ouvrent jamais la manette de l'utilisateur connecté avant de la sonder. Ceci est le côté hôte de ce handle.",
        ],
      },
    ],
    works: [
      "DualSense, DualSense Edge et DualShock 4 par HID USB et Bluetooth.",
      "Sondage du rapport le plus récent, moteurs, barre lumineuse, et une somme de contrôle Bluetooth.",
      "XInput pour les manettes compatibles Xbox, et des profils clavier réaffectables.",
      "Un mode d'entrée scénarisé qui ignore les périphériques physiques pendant les mesures.",
    ],
    gaps: [
      "Le pavé tactile, les gâchettes adaptatives et les capteurs de mouvement ne constituent pas l'ensemble complet des fonctions DualSense.",
      "Les haptiques d'une piste de film ne sont pas routées vers les moteurs.",
      "Le chemin HID est le chemin hôte Windows utilisé par le lanceur et par game-run.",
    ],
  },

  pkg: {
    title: "Extracteur PKG",
    summary:
      "pkgextractor défait les dispositions FPKG de débogage observées en développement : le paquet externe, le PFS interne, les tables de noms NAPS et les charges utiles compressées par Kraken. Les paquets de vente au détail chiffrés sont hors sujet.",
    sections: [
      {
        heading: "Ce que contient un paquet de débogage",
        paragraphs: [
          "Un paquet PlayStation 5 enveloppe un système de fichiers. Les dispositions de débogage observées par PS5PCEM utilisent un paquet externe, une image PFS interne, une table NAPS qui associe les noms du paquet aux fichiers, et des charges utiles compressées avec Kraken. L'extracteur parcourt ces couches et écrit les fichiers. Il est livré à côté du lanceur sous le nom pkgextractor.exe, et le lanceur a un bouton Extract PKG qui le pilote.",
          "L'extracteur de développement du 2 octobre corrige InvalidPfs pour Grand Theft Auto III: The Definitive Edition, PPSA03527 version 1.007. Les 48 fichiers sont extraits, dont eboot.bin, six modules et les deux archives PAK, et les deux sommes de contrôle d'index PAK correspondent. Vingt et un tests de paquets réussissent. Ce rapport n'a pas lancé le jeu. L'extraction et l'exécution sont des affirmations distinctes.",
        ],
      },
      {
        heading: "Chiffrement de vente au détail",
        paragraphs: [
          "Les paquets de vente au détail chiffrés ne sont pas pris en charge. Aucune clé n'est incluse ni sous-entendue. Un paquet que l'analyseur de débogage observé ne reconnaît pas fait échouer l'analyse. Il n'est pas extrait en partie dans un répertoire qui aurait l'air complet.",
          "La limite juridique est la même que pour le reste du projet. L'outil existe pour qu'une personne qui possède déjà un dump qu'elle a le droit d'utiliser puisse alimenter le chargeur. Le site et l'émulateur ne distribuent ni jeux, ni micrologiciel, ni clés.",
        ],
      },
      {
        heading: "Après l'extraction",
        paragraphs: [
          "Le chargeur lit l'eboot.bin déchiffré et monte le répertoire de contenu comme /app0. Une disposition typique place eboot.bin à la racine du paquet ou dans un sous-répertoire déchiffré. Le lanceur cherche aux deux endroits. Le savedata n'est pas dans le paquet. Il se trouve sous le répertoire de l'émulateur, indexé par l'identifiant de titre.",
          "Kraken, NAPS et PFS sont ici des mécanismes de fichiers de paquet. Ce ne sont ni le swizzle du GPU, ni le moteur AMPR, ni les codecs audio, avec lesquels on les confond facilement parce que ceux-là compressent ou réassocient aussi des données.",
        ],
      },
    ],
    works: [
      "Dispositions FPKG de débogage observées, PFS interne, tables de noms NAPS et charges utiles Kraken.",
      "Un extracteur en ligne de commande et un bouton du lanceur.",
      "L'extraction de développement de GTA III : 48 fichiers et des sommes de contrôle d'index PAK correspondantes.",
      "Vingt et un tests de paquets qui réussissent sur cet extracteur.",
    ],
    gaps: [
      "Les paquets de vente au détail chiffrés ne sont pas pris en charge, et aucune clé n'est livrée avec l'outil.",
      "Une disposition non reconnue échoue. Elle n'est pas émise comme un arbre partiel.",
      "Une extraction réussie n'affirme pas que le titre s'exécute ensuite.",
    ],
  },
};

export default tech;
