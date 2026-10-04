import type { Content } from "./en";

const fr: Content = {
  games: {
    "little-nightmares-enhanced-edition": {
      "status": "En jeu · rendu incomplet",
      "headline": "Sauvegarde et chargement fonctionnent ; 3,73–4,46 FPS dans la première pièce.",
      "summary": "3 octobre, PPSA10737 v01.004.000 : les écritures asynchrones conservent la progression et un nouveau processus recharge la première pièce via Continuer. HTILE, les lectures GPU immédiates groupées et quatre threads de copie réduisent le coût du rendu. Les 5 FPS ne sont pas encore atteints.",
      "strengths": [
        "Nouvelle partie, déplacement, suivi de caméra et briquet vérifiés.",
        "Des sauvegardes non vides sont écrites puis chargées après redémarrage."
      ],
      "limits": [
        "Éclairage sombre, matériaux réfléchissants incorrects et shaders FLAT/intersection de rayons non pris en charge subsistent.",
        "Des erreurs intermittentes de gestion mémoire peuvent interrompre le démarrage ; fin du jeu et stabilité prolongée non vérifiées."
      ],
      "performance": "Version actuelle avec réglages par défaut : 4,46 FPS près de la valise, 3,73 FPS après déplacement à droite, chaque mesure durant 30 secondes sans pause. RTX 3070 Ti, sortie 1080p, préréglage Speed, mode Performance du jeu ; résolution interne contrôlée par le jeu. Les anciens 2,16 FPS ne correspondent pas à une position identique. Objectif de 5 FPS non atteint.",
      "imageAlt": "Six près de la valise dans la première pièce ; éclairage sombre et matériaux réfléchissants incorrects"
    },
    "gta-iii-definitive-edition": {
      "status": "En jeu · déplacement vérifié",
      "headline": "Couleurs et reflets corrigés dans le gameplay de GTA III.",
      "summary": "Version de développement du 3 octobre, PPSA03527 v1.007 : Give Me Liberty affiche personnage, véhicule, pont, HUD et minicarte. Les causes de la surexposition verte et des niveaux de reflets incomplets sont corrigées. Une analyse partagée des ressources et des textures résidentes sur GPU réduisent les traitements CPU répétés et les transferts.",
      "strengths": [
        "Une nouvelle partie passe l’introduction et atteint la première mission.",
        "Le déplacement au clavier et le changement de direction sont vérifiés."
      ],
      "limits": [
        "Des défauts visuels et des diagnostics de ressources non résolues subsistent.",
        "Fiabilité du démarrage, sauvegardes, exactitude audio et partie complète restent non vérifiées."
      ],
      "performance": "8.10–8.97 FPS à la position initiale (deux mesures de 30 secondes ; moyenne combinée de 8,53 FPS). Dans la voiture : 7,20 FPS ; vue élargie vers la ville après un court trajet : 3,57 FPS. Performance, Bloom/Motion Blur désactivés, Classic Lighting activé. Sortie 1080p ; résolution interne contrôlée par le jeu. Pas de minimum de 8 FPS sur tout le parcours.",
      "imageAlt": "Personnage et voiture de GTA III sur Callahan Bridge après correction des couleurs et des reflets"
    },
    "subnautica-below-zero": {
      "status": "Jouable · Terminable",
      "headline": "Une nouvelle partie atteint la zone de départ ; caméra et déplacement ont été vérifiés.",
      "summary": "Vérification du 3 octobre, PPSA02457 v1.022.125 : le binaire installé restaure la sauvegarde Survival et affiche le site enneigé du crash et le HUD. Cette mesure porte sur la version actuelle après les changements communs du rendu pour GTA III ; aucun nouveau correctif n’est ajouté.",
      "strengths": [
        "Nouvelle partie, introduction, monde, caméra et déplacement vérifiés."
      ],
      "limits": [
        "Éclairage sombre, défauts graphiques et longues pauses persistent.",
        "La fin du jeu, la fidélité audio et la stabilité prolongée restent non vérifiées."
      ],
      "performance": "Nouveau processus, même exécutable et sauvegarde Survival : menu à 15,50 FPS ; deux mesures de 30 secondes sans pause et caméra fixe à 12,70 et 8,50 FPS, soit 10,60 FPS combinés. Sortie 1080p, Speed, caches chauds. Aucun arrêt de dix secondes dans ces intervalles, mais des retards plus courts persistent. Le lancement précédent donnait 9,52 FPS en moyenne. Cette variation ne correspond pas à une nouvelle optimisation ; les 30 FPS restent hors d’atteinte.",
      "imageAlt": "Site enneigé du crash et HUD de survie de Subnautica: Below Zero lors de la mesure du 3 octobre"
    },

    "terminator-2d-no-fate": {
      status: "Jouable · Terminable",
      headline: "Terminé sans aucun défaut signalé.",
      summary:
        "Le mainteneur a fini ce jeu. Décors, personnages, ATH, textures et couleurs sortent comme prévu, et depuis la confirmation du 8 septembre c'est le titre de référence le plus stable du projet.",
      strengths: [
        "Une partie complète sans défaut signalé.",
        "L'alpha des textures, l'ordre des canaux et l'échantillonnage sRGB préservent l'équilibre des couleurs voulu.",
        "ATH et graphismes des personnages s'affichent proprement du début à la fin.",
      ],
      limits: [
        "Les temps par image varient encore selon la scène au lieu de se stabiliser.",
      ],
      performance:
        "Une fois chaud, les images de démarrage tiennent entre 22 et 65 ms sur la machine de référence.",
      imageAlt:
        "Terminator 2D: No Fate, partie en cours avec le personnage, l'ATH et une scène désertique, rendu par PS5PCEM",
    },

    "asterix-obelix-slap-them-all": {
      status: "Jouable · Terminable",
      headline: "Terminé de bout en bout, intro et interface correctes.",
      summary:
        "Partie complète confirmée. Le jeu et l'interface s'affichent dans le bon sens, et l'intro se lance. La composition plein écran finale reste sur le GPU, et l'affichage conserve l'orientation de la fenêtre invitée sans recopier une image par la mémoire de l'hôte.",
      strengths: [
        "Partie complète confirmée par le mainteneur.",
        "La vidéo d'intro se lit, et le jeu comme l'interface sont correctement orientés.",
        "Une session de développement de 3 000 présentations s'est terminée sans une seule soumission rejetée.",
      ],
      limits: [
        "Le coût par image dépend de la densité de la scène plutôt que d'être fixé.",
      ],
      performance: "Le jeu mesure généralement 28–31 ms par image.",
      imageAlt:
        "Asterix & Obelix: Slap Them All!, partie en forêt avec l'ATH et un panneau GO, rendu par PS5PCEM",
    },

    "cat-quest-iii": {
      status: "Jouable · Terminable",
      headline:
        "Terminé, avec menus, dialogues et relief de l'île correctement dessinés.",
      summary:
        "Partie complète confirmée. Menus, cartes d'aventure, dialogues, relief de l'île et couleurs sont justes dans les scènes capturées. Il a fallu corriger l'orientation du monde, les passes de pochoir seul, la correspondance des interpolants AGC et l'ordre des canaux à l'affichage.",
      strengths: [
        "Partie complète confirmée par le mainteneur.",
        "La liste des langues conserve son texte et le rogne dans son panneau au lieu d'être recouverte.",
        "La sélection d'aventure affiche les illustrations des emplacements, les libellés, les boutons d'ajout et les flèches de défilement.",
      ],
      limits: [
        "La limite restante est la fluidité sur l'île de départ, pas la justesse du rendu.",
      ],
      performance:
        "Les échantillons de l'île de départ ont une médiane de 124 ms, environ 8 FPS, contre quelque 148 ms avant le travail d'optimisation.",
      imageAlt:
        "Cat Quest III, partie sur l'île avec l'ATH, les montagnes et la mer bleue, rendu par PS5PCEM",
    },

    "dreaming-sarah": {
      status: "Jouable · Terminable",
      headline: "Terminé, et le début tourne à la limite de 60 FPS.",
      summary:
        "Confirmé jouable le 15 septembre 2026. Menus, titre animé, scènes du monde, personnages et PNJ s'affichent correctement, et la première scène tient la limite de fréquence sur la machine de référence.",
      strengths: [
        "Partie complète confirmée par le mainteneur.",
        "Menu-titre et première scène tiennent la limite de 60 FPS — 5 280 présentations en 90 secondes.",
        "Titre animé, scènes du monde et PNJ s'affichent tous correctement.",
      ],
      limits: [
        "Le mainteneur signale une baisse de fluidité dans la deuxième scène de jeu, qui n'a pas été mesurée.",
        "Le chargement a exigé de restaurer eboot.bin et sce_module/libc.prx depuis les sauvegardes laissées par le patcheur d'eboot de la copie, qui avait tronqué les deux.",
      ],
      performance:
        "Menu-titre et première scène tiennent 60 FPS, mesuré comme 5 280 présentations sur 90 secondes.",
      imageAlt:
        "Dreaming Sarah, scène forestière avec un PNJ, rendu par PS5PCEM",
    },

    "jurassic-park-classic-games-collection": {
      status: "Jouable · Terminable",
      headline:
        "Terminé, y compris l'intro, le titre animé et le menu de la collection.",
      summary:
        "Partie complète confirmée. Intro, titre animé et sélection dans la collection fonctionnent, avec jaquettes, flèches de navigation et aperçu animé. Les performances dépendent du jeu de la collection lancé.",
      strengths: [
        "Partie complète confirmée par le mainteneur.",
        "La sélection affiche les jaquettes, les flèches de navigation et un aperçu animé.",
        "Le rendu au démarrage, le logo du titre et la demande de confirmation sont corrects.",
      ],
      limits: [
        "Enchaîner les aperçus vidéo peut épuiser un pool de descripteurs AvPlayer, après quoi les aperçus suivants se figent.",
        "Le coût par image varie selon le jeu de la collection et le matériel.",
      ],
      performance:
        "Les anciennes images de titre et de sélection s'échantillonnaient à environ 27 et 33 ms.",
      imageAlt:
        "Jurassic Park Classic Games Collection, écran de sélection avec jaquettes, rendu par PS5PCEM",
    },

    "jets-n-guns-2": {
      status: "Jouable · Terminable",
      headline:
        "Terminé, avec niveaux, ATH, score et parallaxe tous corrects.",
      summary:
        "Confirmé jouable le 15 septembre 2026. Niveaux, ATH, score, ennemis et fond en parallaxe s'affichent correctement dans la partie capturée. Le coût par image est dominé par les attentes GPU et par la préparation d'un grand nombre de tampons invités à chaque image.",
      strengths: [
        "Partie complète confirmée par le mainteneur.",
        "Niveaux, ATH, score, ennemis et couches de parallaxe s'affichent tous correctement.",
        "Le son ne se déchire plus : la version 0.3.2 a mis fin à la concurrence de deux ports de sortie pour le périphérique de l'hôte.",
      ],
      limits: [
        "Le coût par image reste dominé par les attentes GPU synchrones et la préparation des tampons.",
      ],
      performance:
        "Les images mesurent 70–92 ms, environ 11–14 FPS. Dans une image de 70 ms, 18 ms attendent le GPU sur 33 soumissions, 11 ms préparent des points de contrôle de ressources et 13 ms préparent 894 tampons invités distincts totalisant 15 Mio.",
      imageAlt:
        "Jets 'n' Guns 2, partie en cours avec le vaisseau du joueur, l'ATH et le score, rendu par PS5PCEM",
    },

    "the-precinct": {
      status: "Menu-titre, films d'intro et une première image dans le moteur",
      headline:
        "Lit les deux films d'intro, dessine le menu-titre et entre dans le chargement à froid du monde.",
      summary:
        "Le graphe invité complet à six images se lie, les plug-ins Unity démarrent, et les deux films d'intro observés se lisent en vidéo 4K synchronisée avec un son stéréo 48 kHz. L'illustration du titre et une confirmation NEW GAME lisible s'affichent, et maintenir Triangle lance le chargement du monde. Une session antérieure sous garde a produit la première image de jeu vérifiée dans le moteur.",
      strengths: [
        "Les deux films d'intro se lisent en vidéo 3840×2160 synchronisée avec un son stéréo 48 kHz.",
        "L'illustration complète du titre en 1920×1080 et une confirmation NEW GAME lisible s'affichent.",
        "La livraison d'exception à un thread cible achève la poignée de main stop-the-world d'Unity.",
      ],
      limits: [
        "La première transition vers le monde prend encore des minutes : traduction de shaders à la première utilisation, compilation de pipelines par le pilote, soumission synchrone et préparation des ressources coûtent tous cher.",
        "Un contournement de compilateur propre à ce titre a été retiré au profit du chemin de shaders général, la transition exige donc une nouvelle validation de bout en bout avant toute affirmation sur le jeu.",
      ],
      performance:
        "L'image de chargement du monde mesure désormais 2,1 s contre 5,1 s, depuis que la récupération des descripteurs a cessé de rejouer le prologue de chaque noyau pour chaque ressource qu'il nomme.",
      imageAlt:
        "The Precinct, menu-titre avec la confirmation NEW GAME, rendu par PS5PCEM",
    },

    "ghost-of-yotei": {
      status:
        "Lecture de l'intro · avis de bonus · calibrage de la luminosité · atteint des scènes de jeu · non jouable",
      headline:
        "Les menus et l’arbre s’affichent, avec des défauts visibles et une cadence très faible.",
      summary:
        "C'est le cas de test le plus dur du projet et le plus documenté. Les films d'intro se lisent avec le son, les avis de bonus et le calibrage de la luminosité apparaissent, et des scènes 3D tardives dont celle de l'arbre atteignent l'écran. Rien de tout cela n'est jouable : les images de scène arrivent bien en dessous de 1 FPS, et aucune partie complète n'est revendiquée.",
      strengths: [
        "Les films d'intro se lisent à environ leurs 30 FPS natifs, le son démarrant en phase avec la piste.",
        "L'indicateur de chargement, les avis de bonus et l'écran de calibrage avec l'image du loup, le curseur et l'invite s'affichent tous.",
        "Des scènes 3D tardives, dont celle de l'arbre, atteignent l'écran avec la musique du menu audible.",
      ],
      limits: [
        "Le jeu lui-même — déplacer un personnage dans un monde chargé — reste non vérifié.",
        "La préparation des scènes est extrêmement lente, et une image de transition a été mesurée à 167,2 s, dont 164,8 s à créer 206 pipelines de calcul.",
        "Deux vérifications récentes se sont arrêtées en attente d'achèvement GPU avant la scène de l'arbre et ont été interrompues volontairement après diagnostic.",
        "Appels de dessin indirects invalides, échec de compteur corrompu, traînées et luminosité excessive restent tous ouverts.",
      ],
      performance:
        "Mesures de référence de l’arbre le 3 octobre avant la modification des états dynamiques : 0,83–0,97 FPS, comptés sur des intervalles de présentation de 30 secondes. Le résultat précédent de 0,73 FPS est historique. Il s’agit de l’arbre et de la configuration, pas du jeu après la cinématique. Les historiques de cache différents empêchent une comparaison contrôlée avant/après.",
      imageAlt:
        "Avis Digital Deluxe Bonus de Ghost of Yōtei, rendu par PS5PCEM",
    },

    "quake-ii-2023": {
      status: "Jouable · Terminable",
      headline: "Terminé, éclairage, modèles et armes rétablis.",
      summary:
        "Confirmé jouable le 16 septembre 2026 et revérifié le 25 septembre en PPSA09477 v1.003. L'éclairage des niveaux, les textures, les armes et les PNJ sont visibles : le monde sombre et les modèles manquants des builds antérieurs sont résolus dans la partie observée. Menus, ATH et manette fonctionnent tous.",
      strengths: [
        "Partie complète confirmée par le mainteneur, rendu revérifié ensuite.",
        "Éclairage, textures, armes et modèles de PNJ apparaissent ; les anciens défauts de monde sombre et de géométrie manquante ont disparu.",
        "Menus, ATH et entrée manette se comportent correctement.",
      ],
      limits: [
        "Les combats chargés restent bien en dessous des pointes : les valeurs hautes ne sont donc pas un plancher.",
        "Le travail sur les performances continue.",
      ],
      performance:
        "Le mainteneur signale des pointes de 60–70 FPS dans les scènes légères, les combats chargés restant nettement plus lents. La réutilisation des tampons et les effacements GPU ont réduit le coût des transferts.",
      imageAlt:
        "Quake II, partie avec un niveau éclairé, des ennemis visibles et l'arme du joueur, rendu par PS5PCEM",
    },

    reanimal: {
      status: "Menu-titre animé en 4K, libellés d'options incomplets",
      headline:
        "Lit la séquence de logo et maintient le graphe de rendu du menu-titre animé.",
      summary:
        "Les modules natifs et de micrologiciel observés se résolvent, la séquence du logo de l'éditeur se lit, et le menu-titre animé en 3840×2160 continue de s'afficher. Le fond à la bouée, le logo, les reflets sur l'eau et l'invite SELECT sont visibles — mais pas les libellés des options du menu.",
      strengths: [
        "La séquence du logo de l'éditeur se lit et le menu-titre animé en 4K se maintient.",
        "Les tampons intermédiaires étroits de l'interface Unity ne remplacent plus l'image de sortie complète.",
        "Les atlas de police R8 dynamiques invalident correctement les images échantillonnées périmées.",
      ],
      limits: [
        "Les libellés centraux du menu sont réduits à de petites marques rouges, la navigation et le passage au jeu ne sont donc pas vérifiés.",
        "Performances et stabilité sur la durée ne sont pas mesurées, et aucun jeu n'est revendiqué.",
      ],
      imageAlt:
        "Menu-titre animé de REANIMAL avec des libellés incomplets, rendu par PS5PCEM",
    },

    "ritas-rewind": {
      status: "Jouable · Terminable",
      headline:
        "Terminé, de la séquence de l'éditeur au jeu dans le Command Center.",
      summary:
        "Confirmé jouable le 24 septembre 2026. Séquence de l'éditeur, menu-titre et jeu s'affichent et répondent à la manette ; la capture montre le Ranger rouge dans l'étape d'entraînement du Command Center avec ATH, barre de vie, objectifs et indications de boutons.",
      strengths: [
        "Partie complète confirmée par le mainteneur.",
        "Les fibres coopératives natives préservent les piles invitées suspendues.",
        "L'implémentation exacte de V_SAD_U32, V_MUL_HI_I32 et V_CVT_FLR_I32_F32 a supprimé le shader de diagnostic de repli.",
      ],
      limits: [
        "La composition CRT invitée exacte produit encore du bruit sur la machine de référence, aussi un repli étroitement ciblé par signature de shader agrandit la scène 4× en RGBA8 avant le post-traitement.",
      ],
      performance:
        "L'intro tient environ 13–20 ms par image. Les images denses après le menu, environ 255 appels de dessin, coûtent près de 470 ms, surtout à cause de la préparation répétée des tampons invités.",
      imageAlt:
        "Mighty Morphin Power Rangers: Rita's Rewind, partie avec le Ranger rouge dans le Command Center, rendu par PS5PCEM",
    },

    "big-helmet-heroes": {
      status: "Menu principal et tutoriel s'affichent · jouabilité non vérifiée",
      headline:
        "Atteint un menu principal correct et une scène de tutoriel, à une fréquence d'images à un chiffre.",
      summary:
        "Le titre passe de son intro à un menu principal correctement dessiné, avec modèles de personnages, textures, éclairage et couleurs, puis à une scène de tutoriel. Les corrections ont porté sur l'adressage de textures Gen5 à échantillon unique, les cibles de rendu en couches et l'ordre des canaux à l'affichage. Le jeu lui-même n'est pas vérifié.",
      strengths: [
        "Un menu principal correct avec modèles, textures, éclairage et couleurs.",
        "La scène de tutoriel s'affiche après correction des blocages au démarrage et au chargement.",
        "La sortie est un 1080p propre, même si les cibles internes peuvent être plus grandes.",
      ],
      limits: [
        "Jeu, récupération des sauvegardes et stabilité sur de longues sessions ne sont pas vérifiés.",
        "Des artefacts visuels subsistent, et copies, préparation des ressources et attentes GPU restent coûteuses.",
        "Les 30 FPS n'ont pas été atteints.",
      ],
      performance:
        "Des échantillons de menu comparables mesurent 157 ms, environ 6,37 FPS ; les échantillons de tutoriel 270 ms, environ 3,70 FPS. Le dernier changement de comptabilité n'a montré aucun gain démontrable de fluidité en jeu.",
      imageAlt: "Scène de tutoriel de Big Helmet Heroes, rendue par PS5PCEM",
    },

    "tetris-effect-connected": {
      status:
        "Logos des développeurs · écran de licence lisible · sélection du mode Journey · jeu non vérifié",
      headline:
        "Logos, écran de licence et sélection Journey s'affichent, bien plus vite qu'avant.",
      summary:
        "Vérifié le 24 septembre 2026 avec PPSA07923 v2.000.022. Une composition traduite a remplacé les anciens remplacements 4K spéculatifs, et les pages de licence et de menu s'affichent maintenant sans l'interface dupliquée ni la couture verticale des builds antérieurs. Les deux écrans sont aussi devenus bien moins coûteux.",
      strengths: [
        "L'écran de licence et les menus s'affichent sans interface dupliquée ni frontière verticale de scène.",
        "La publication de remplissages linéaires de métadonnées, avec effacements DCC R11G11B10 et RGB10A2, a supprimé les copies d'interface accumulées.",
        "Un profil à 128 cibles conserve l'ensemble de travail d'une centaine d'attachements au lieu de saturer un cache plus petit.",
      ],
      limits: [
        "Des éléments d'interface sombres et une liaison de texture de calcul non résolue restent ouverts.",
        "La lecture vidéo tardive plante dans le décodeur H.264 invité.",
        "La stabilité sur la durée et le jeu ne sont pas établis.",
      ],
      performance:
        "Les images médianes de licence sont passées de 235 ms à 159 ms, environ de 4,3 à 6,3 FPS. Les images Journey échantillonnées de 1127–1276 ms à 318–396 ms.",
      imageAlt:
        "Une première image de particules de Tetris Effect, rendue par PS5PCEM",
    },

    "propagation-paradise-hotel": {
      status:
        "Monte son paquet, ouvre l'archive de shaders, soumet le premier tampon de commandes",
      headline: "Achève l'amorçage d'Unreal jusqu'à sa première soumission.",
      summary:
        "Le paquet Unreal de 8,8 Gio se monte, l'amorçage d'ICU et de la configuration s'achève, l'archive globale de shaders précompilée s'ouvre, les shaders AGC sont créés, et le premier tampon de commandes est soumis. Rien n'est affirmé sur une image affichée.",
      strengths: [
        "Le paquet Unreal de 8,8 Gio se monte et l'amorçage du moteur s'achève.",
        "L'archive globale de shaders précompilée s'ouvre et les shaders AGC sont créés.",
        "Le premier tampon de commandes atteint la soumission.",
      ],
      limits: [
        "L'étape précède les constructeurs de paquets de synchronisation actuels et exige une nouvelle session.",
        "L'affichage VR n'a aucun pont vers un casque sur l'hôte : il n'y a donc rien sur quoi afficher.",
      ],
    },

    "pistol-whip": {
      status: "Charge ses modules VR, puis les archives Unity",
      headline: "Va jusqu'au chargement des archives de données Unity.",
      summary:
        "Le plug-in PS VR2 natif et le module Burst se chargent tous les deux, et le titre commence à charger ses archives de données Unity. Tout ce qui suit dépend d'un support VR que le projet a volontairement reporté.",
      strengths: [
        "Le plug-in PS VR2 natif et le module Burst se chargent correctement.",
        "Le chargement des archives de données Unity commence.",
      ],
      limits: [
        "Casque, suivi, manettes et OpenXR côté hôte sont volontairement reportés.",
      ],
    },
  },

  history: {
    "yotei-sparse-material-regions": {
      "title": "Indices de matériaux précis et shaders plus petits",
      "summary": "Le précédent essai près de l’arbre mesure 1,26 FPS ; les longues compilations initiales et la scène sombre suivante persistent. La recherche de textures conserve les indices possibles après masquage, sans parcourir tous les enregistrements intermédiaires. Les pages capturées contiguës partagent une région vérifiée. Un shader de fragment de test avec une grande table diminue de 22,8 % à résultat identique ; 12 tests mémoire et 26 tests de sampler passent la validation Vulkan. Le nouvel essai du jeu continue. Le gain de FPS et le contrôle du personnage restent à confirmer.",
      "imageAlt": ""
    },
    "yotei-integer-material-flat-reads": {
      "title": "Indices entiers des matériaux et lectures mémoire vérifiées",
      "summary": "La table capturée fournit désormais 84 textures 2D valides au lieu de 229 candidats comprenant de fausses images en tableau. Le jeu franchit cet accès puis révèle une lecture FLAT non prise en charge. Le nouveau chemin avec contrôle des adresses passe dix cas Vulkan ; 26 cas de samplers passent aussi. Le précédent essai près de l’arbre mesure 1,16 FPS, sans accélération démontrée. La compilation initiale et la pression mémoire causent encore de longues pauses. Les défauts d’éclairage persistent et le contrôle du personnage reste non confirmé.",
      "imageAlt": ""
    },
    "yotei-checked-material-samplers": {
      "title": "Sampler retrouvé ; fortes pauses persistantes après l’arbre",
      "summary": "L’essai combiné sampler/cache mesure 1,23 FPS à l’arbre et cinq images en 60 secondes après (0,083 FPS). Ce passage différent ne prouve pas une accélération. Le rejet initial du matériau est dépassé ; un accès ultérieur à une texture reste non pris en charge. Les tests des indices signés et 26 cas Vulkan passent. Rayures, éclairage incomplet et mélange des couleurs compactées restent à corriger. Le contrôle du personnage n’est pas atteint. Le candidat reste séparé ; le runner installé ne change pas.",
      "imageAlt": "Surfaces incomplètes des personnages après l’arbre"
    },

    "yotei-material-pointer-checks": {
      "title": "Arbre à 1,30 FPS ; pointeurs de matériaux",
      "summary": "Le nouvel essai présente 39 images en 30 secondes près de l’arbre et seulement quatre en 60 secondes dans la cinématique sombre. L’éclairage et les personnages restent incomplets ; le contrôle n’est pas confirmé. La relecture des données du shader identifie désormais 60 descripteurs de textures. Dix tests Vulkan vérifient les tables de matériaux et signalent tout enregistrement non pris en charge réellement sélectionné. La validation du correctif dans le jeu reste en cours.",
      "imageAlt": "Personnages incomplets dans la scène sombre après l’arbre"
    },
    "yotei-color-content-generations": {
      "title": "Nouveau test des couleurs et corrections du cache",
      "summary": "La variante UNORM mesure 1,23 FPS près de l’arbre. Une scène bloquée présente ensuite une image en 60 secondes, pas une cadence stable en jeu. Éclairage, géométrie et une passe de mélange restent défectueux. Les corrections suivantes du cache et de la mémoire passent sept groupes Vulkan et cinq tests du noyau ; leur gain en jeu et le contrôle du personnage restent à confirmer.",
      "imageAlt": "Scène sombre après l’arbre avec défauts graphiques non résolus"
    },
    "yotei-color-transfer-memory": {
      "title": "Transferts couleur partagés ; arbre à 1,40 FPS",
      "summary": "Les tampons de lecture individuels des cibles couleur sont supprimés. Luminosité et arbre présentent chacun 42 images en 30 secondes : environ 1,40 FPS contre 1,26. Les historiques de cache diffèrent, empêchant une attribution précise. Les bandes persistent ; le film illustré est atteint, sans contrôle du personnage confirmé.",
      "imageAlt": "Choix de difficulté devant l’arbre ; bandes lumineuses persistantes"
    },
    "yotei-illustrated-movie-compilation": {
      "title": "Film illustré atteint ; longues compilations de calcul",
      "summary": "La version mise à jour dépasse l’arbre et la cinématique sombre pour atteindre le film illustré. Le contrôle du personnage reste non confirmé. Le nouveau test de l’arbre reste à 1,26 FPS ; la réutilisation après lecture seule ne démontre aucun gain supplémentaire en jeu. Une image ultérieure prend 239,4 secondes, dont 234,9 pour créer les pipelines de calcul. L’augmentation du cache de textures coïncide avec le changement de scène et ne prouve aucune accélération. Éclairage, bandes et ressource de pixel shader manquante restent à corriger.",
      "imageAlt": "Film illustré après l’arbre et la cinématique sombre ; contrôle du personnage non confirmé"
    },
    "yotei-post-tree-texture-reuse": {
      "title": "Cinématique après l’arbre : compilation et rechargements de textures",
      "summary": "La version combinée atteint une cinématique très sombre après la configuration. Une image à froid prend 59,3 secondes, dont 35,4 pour créer les pipelines graphiques. Réduire les caches pour limiter la mémoire provoque plusieurs Gio de chargements de textures par image. Un test Vulkan distinct confirme que les lectures de storage images n’invalident plus les textures échantillonnées. Les FPS en jeu et le contrôle du personnage restent non confirmés ; des bandes et une ressource de pixel shader non résolue subsistent.",
      "imageAlt": "Cinématique très sombre après l’arbre ; contrôle du personnage non confirmé"
    },
    "yotei-array-layer-coherence": {
      "title": "Cohérence des couches : les détails de l’arbre réapparaissent",
      "summary": "Le suivi des surfaces couleur est limité aux couches sélectionnées : les couches voisines n’invalident plus leur contenu GPU. Les tableaux de textures compatibles actualisent les couches modifiées sur le GPU. Sur 30 secondes, l’arbre affiche 1,23 FPS contre 1,03 pour le témoin, avec une animation et un historique de cache différents. L’écorce est visible, mais les bandes lumineuses persistent. Le chargement suivant atteint encore la limite de mémoire ; le contrôle du personnage n’est pas confirmé.",
      "imageAlt": "Écorce et branches visibles, avec des bandes verticales lumineuses"
    },
    "yotei-candidate-visual-check": {
      "title": "Vérification du candidat : l’arbre reste étiré",
      "summary": "Le troisième essai mesure 1,30 FPS à l’arbre avec d’autres budgets de cache, mais l’image présente davantage de traînées. Rétablir la limite des cibles de rendu ne corrige pas visiblement le défaut. L’utilisateur ferme l’essai pendant la préparation de la scène ; le jeu après la cinématique reste non confirmé. Aucun gain de FPS vérifié ; l’exécutable installé reste la référence avant une comparaison visuelle contrôlée.",
      "imageAlt": "Vérification du candidat : l’arbre reste étiré"
    },
    "yotei-post-tree-dynamic-state": {
      "title": "Mesures devant l’arbre et réutilisation des pipelines graphiques",
      "summary": "Avant la modification, les mesures devant l’arbre donnent 0,83–0,97 FPS. Deux tentatives de poursuivre sont arrêtées volontairement près de la limite de mémoire engagée de Windows. Le biais de profondeur et les références stencil dynamiques éliminent 61 variantes redondantes sur 1 007 pipelines observés ; les tests GPU réussissent. Aucun gain de FPS en jeu n’est établi et les stries lumineuses persistent.",
      "imageAlt": "Arbre à l’écran de difficulté, avec des stries verticales lumineuses encore visibles"
    },
    "little-nightmares-saves-performance": {
      "title": "Sauvegarde et chargement vérifiés ; 3,73–4,46 FPS en jeu",
      "summary": "Les écritures et changements de taille des fichiers conservent les données ; Continuer recharge la première pièce après redémarrage. HTILE, les lectures GPU groupées et quatre threads de copie donnent 4,46 FPS près de la valise et 3,73 FPS après déplacement, sur deux mesures de 30 secondes. Le programme installé correspond à la version mesurée. Les 5 FPS, les matériaux corrects et un démarrage fiable restent à résoudre ; shaders omis et erreurs mémoire intermittentes sont documentés.",
      "imageAlt": "Six près de la valise dans la première pièce ; éclairage sombre et matériaux réfléchissants incorrects"
    },
    "little-nightmares-gameplay": {
      "title": "Première scène jouable atteinte : 2,16 FPS mesurés",
      "summary": "Les anneaux de calcul natifs corrigent l’arrêt reproductible après 510 images. L’écriture différée expose ensuite une erreur MallocBinned3 au lancement d’une partie ; un nouvel essai en écriture immédiate atteint le contrôle du personnage et 3 540 images avant l’arrêt volontaire. Deux mesures de 30 secondes donnent 65 images chacune, soit 2,16 FPS au total. Le profil active l’écriture immédiate. Les défauts graphiques et les sauvegardes vides subsistent.",
      "imageAlt": "Six et son briquet dans la première pièce, avec des défauts de matériaux et d’éclairage"
    },
    "little-nightmares-startup": {
      "title": "Écran titre rétabli après correction du démarrage et des descripteurs",
      "summary": "Correction des imports Trinity et IPMI, des événements graphiques natifs et de la validation des dimensions de dispatch. BITSET rétablit l’écran titre et la configuration initiale. Deux lancements atteignent le titre ; gameplay et stabilité prolongée restent non vérifiés. Un nouvel essai se termine après 120 secondes d’attente du thread de rendu pendant la configuration initiale ; la stabilité n’est pas établie.",
      "imageAlt": "Titre de Little Nightmares Enhanced Edition et invite Press X dans PS5PCEM"
    },
    "subnautica-performance-repeat-2": {
      "title": "Deuxième mesure après un nouveau lancement",
      "summary": "Nouveau processus, même exécutable et sauvegarde Survival : menu à 15,50 FPS ; deux mesures de 30 secondes sans pause et caméra fixe à 12,70 et 8,50 FPS, soit 10,60 FPS combinés. Sortie 1080p, Speed, caches chauds. Aucun arrêt de dix secondes dans ces intervalles, mais des retards plus courts persistent. Le lancement précédent donnait 9,52 FPS en moyenne. Cette variation ne correspond pas à une nouvelle optimisation ; les 30 FPS restent hors d’atteinte.",
      "imageAlt": "Site enneigé du crash et HUD de survie de Subnautica: Below Zero lors de la mesure du 3 octobre"
    },
    "subnautica-performance-repeat": {
      "title": "Nouvelle mesure avec le binaire actuel",
      "summary": "Vérification du 3 octobre, PPSA02457 v1.022.125 : le binaire installé restaure la sauvegarde Survival et affiche le site enneigé du crash et le HUD. Cette mesure porte sur la version actuelle après les changements communs du rendu pour GTA III ; aucun nouveau correctif n’est ajouté. Menu principal : 14,67 FPS. Deux mesures de 30 secondes, caméra immobile et jeu non suspendu : 7,27 et 11,77 FPS ; 9,52 FPS au total. La première inclut un blocage de 9,998 secondes. Sortie 1080p, préréglage Speed, caches chauds. La mesure valide précédente était de 7,93 FPS, mais ce n’est pas une comparaison contrôlée du gain. Les 30 FPS ne sont pas atteints.",
      "imageAlt": "Site enneigé du crash et HUD de survie de Subnautica: Below Zero lors de la mesure du 3 octobre"
    },
    "gta3-renderer-performance": {
      "title": "Couleurs, reflets et préparation des ressources corrigés",
      "summary": "Le programme installé mis à jour atteint Give Me Liberty avec contrôle du personnage. Les mesures à la position initiale donnent 8.10–8.97 FPS en mode Performance, Bloom et Motion Blur désactivés et Classic Lighting activé. Analyses scalaires partagées, copies de textures sur GPU et réduction des traitements auxiliaires complètent les corrections graphiques. Le rapport détaille réglages, mesures plus lentes et limites ; la jouabilité complète n’est pas établie.",
      "imageAlt": "Personnage et voiture de GTA III sur Callahan Bridge après correction des couleurs et des reflets"
    },
    "gta3-ngg-gameplay": {
      "title": "Exports NGG corrigés ; première mission et déplacement vérifiés",
      "summary": "Le programme installé atteint Give Me Liberty avec monde, personnage, véhicule, HUD et minicarte visibles. W déplace le personnage et D change sa direction. La correction générale NGG restaure les 32 couches de correction colorimétrique. La mesure donne 0,97 FPS ; surexposition verte, ressources manquantes, plantages et blocages intermittents persistent.",
      "imageAlt": "Personnage de GTA III courant vers une voiture sur Callahan Bridge, avec HUD et forte surexposition verte"
    },
    "gta3-ampr-startup": {
      "title": "Imports AMPR résolus ; écran des conditions atteint",
      "summary": "Version de développement du 2 octobre, PPSA03527 v1.007 : les 13 imports AMPR manquants sont résolus. Deux nouveaux processus atteignent l’écran lisible des conditions après un appui sur Cross pour dépasser un écran initialement vide. L’écran des conditions affiche environ 30 FPS. Les performances en jeu n’ont pas été mesurées. Le gameplay, les sauvegardes et la fidélité audio ne sont pas vérifiés. Des diagnostics de shaders et une émulation incomplète des attentes et compteurs subsistent.",
      "imageAlt": "Écran des conditions Rockstar de GTA III, rendu par PS5PCEM"
    },
    "gta3-pkg-extraction": {
      "title": "Alignement NAPS corrigé ; paquet entièrement extrait",
      "summary": "Les 48 fichiers sont extraits, dont eboot.bin, six modules et deux archives PAK. Les sommes de contrôle des deux index PAK correspondent et les 21 tests réussissent. Le démarrage fait l’objet d’un contrôle distinct."
    },
    "subnautica-startup": {
      title: "Plantage au démarrage dû à un en-tête de shader mal lu",
      summary:
        "Les premières sessions s'arrêtaient net à la même adresse invitée. Le lecteur de shaders d'Unity avait pris quatre octets de données de maillage pour une longueur de chaîne signée et écrit un terminateur en mémoire non mappée. Corriger le comportement des descripteurs de fichiers derrière cela a fait passer le titre au-delà du démarrage.",
    },
    "subnautica-menu-missing": {
      title: "Le menu manquait parce que l'initialisation audio restait bloquée",
      summary:
        "Le fond animé tournait déjà, mais aucun menu n'apparaissait : la coroutine d'initialisation de la plateforme s'était arrêtée dans FMOD, laissant à jamais vides les services que l'écran de démarrage attend. Ce furent les dernières mesures de l'ère 4K avant le passage au 1080p natif.",
      imageAlt:
        "Écran-titre de Subnautica: Below Zero sans son menu, rendu par PS5PCEM",
    },
    "subnautica-native-1080p": {
      title: "Sortie 1080p native et préparation des ressources moins coûteuse",
      summary:
        "L'affichage est passé au 1920×1080 natif, et le chemin graphique commun a cessé de recopier des structures d'instructions décodées pendant la préparation des ressources et l'interprétation scalaire. Play, Options et Credits sont lisibles ; les artefacts d'eau et d'éclairage subsistent.",
      imageAlt:
        "Menu de Subnautica: Below Zero en 1080p natif, rendu par PS5PCEM",
    },
    "subnautica-menu-performance": {
      title: "Une série de réductions côté CPU dans le chemin de dessin commun",
      summary:
        "Préparation des index, recherche de pipelines, instantanés de registres scalaires, sondage des files et initialisation de la mémoire de travail sont devenus moins coûteux un à un, tout cela sans condition propre à un titre. Le menu s'est fixé autour de 17 FPS — toujours loin de l'objectif de 30 FPS.",
      imageAlt:
        "Menu de Subnautica: Below Zero depuis le build de développement mesuré, rendu par PS5PCEM",
    },
    "subnautica-new-game": {
      "title": "Une nouvelle partie atteint la zone de départ",
      "summary": "Version de développement du 1er octobre, PPSA02457 v1.022.125 : le mode Survie charge le monde, joue l’introduction et affiche le site enneigé du crash avec son interface. Les corrections empêchent les écritures GPU périmées dans la mémoire CPU, les lectures répétées de tampons libérés et l’effacement des couleurs par les passes de profondeur. Ce test ne couvre pas une partie complète, la récupération des sauvegardes ni la fidélité audio.",
      "imageAlt": "Zone de départ enneigée de Subnautica: Below Zero avec son interface de survie, capturée dans PS5PCEM"
    },
    "subnautica-lighting-baseline": {
      "title": "Éclairage : chargement encore instable",
      "summary": "Trois essais supplémentaires de la version précédente ont échoué pendant le chargement ou la transition vers le monde, après deux essais ayant atteint le jeu. Un thread peut s’arrêter tandis que le son continue et que la fenêtre reste noire. L’ancien journal confirme aussi qu’un mip 1×1 remplaçait à tort la texture de base 512×512. Ces échecs sont consignés séparément de l’essai réussi ; la stabilité du chargement reste à établir."
    },
    "subnautica-colour-mips": {
      "title": "Échantillonnage des mips couleur corrigé sur le GPU",
      "summary": "La recherche de textures résidentes distingue désormais les niveaux mip et les couches. Les pyramides couleur complètes peuvent être assemblées sur le GPU. Un test RG32F à six niveaux vérifie les valeurs, une réécriture dans la même image et l’échantillonnage sans lecture supplémentaire vers le CPU ni nouvel envoi de texture ; 128 tests ciblés réussissent. Le jeu échoue encore au chargement, même en mode synchrone et avec 8192 entrées de cache. Le gain de FPS dans le monde et le résultat visuel final restent à vérifier."
    },
    "subnautica-windows-stack": {
      "title": "Les limites de pile Windows corrigent l’arrêt au démarrage",
      "summary": "Un exemple minimal quittait avec 0x40010006 lors d’une sortie de diagnostic Windows sur la pile HLE. Le changement de pile actualise désormais ses limites Windows et la sortie du code invité restaure l’état HLE. Les sorties ANSI/Unicode, 8 tests de pile et 9 tests du pont natif passent. Le binaire installé démarre sans débogueur ni redirection de TEMP et restaure la sauvegarde. Mesure sans pause : 7.93 FPS sur 30.02 secondes. Aucune comparaison contrôlée ; 30 FPS, fidélité graphique complète et stabilité prolongée restent non confirmés.",
      "imageAlt": "Subnautica: Below Zero — Windows stack-boundary fix, 2026-10-02"
    },
    "subnautica-resource-scratch": {
      "title": "Moins de travail sur les ressources ; avertissement stencil localisé",
      "summary": "Les grandes tables de textures indirectes quittent la pile des appels ordinaires. La résolution des pointeurs partage un état de registres immuable et initialise seulement la portion utile du bitmap. Les 72 tests et les vérifications Vulkan ciblées passent. Un nouveau processus charge la sauvegarde : 11.96 FPS sur 30.01 secondes sans pause. La météo et le préchauffage empêchent une comparaison contrôlée ; les 30 FPS ne sont pas atteints. L’avertissement restant concerne une passe stencil sans écriture de couleur. La correction graphique complète et la stabilité prolongée restent à vérifier. Une trace distincte révèle des mappages répétés de 4 Mio sous verrou mémoire. La réutilisation de l’engagement des pages et la suppression de requêtes natives doubles réduisent de 18 % la médiane du microtest de mappage ; le gain en jeu reste non démontré.",
      "imageAlt": "Subnautica: Below Zero — resource preparation build, 2026-10-02"
    },
    "subnautica-descriptor-unmap": {
      "title": "Réutilisation des tableaux de descripteurs et échecs unmap sécurisés",
      "summary": "Les tableaux de descripteurs sont réutilisés : leur pile passe de 753 720 à 56 octets sans changer le lot Vulkan. Un test distinct corrige les échecs unmap laissant des pages natives supprimées déclarées lisibles. Les 154 tests moteur/index, 29 tests mémoire et 60 tests de soumission passent, ainsi que les contrôles Vulkan incluant 4352 vues de textures. Le premier nouveau lancement restaure la sauvegarde ; une scène fixe non suspendue atteint 12,03 FPS sur 30,01 secondes. Météo et préchauffage empêchent une comparaison contrôlée. Une ressource scalaire reste non résolue. Les 30 FPS, la fiabilité du chargement et une partie complète ne sont pas vérifiés.",
      "imageAlt": "Subnautica: Below Zero — unpaused 12.03 FPS sample, 2026-10-02"
    },
    "subnautica-read-lease": {
      "title": "Pile de dessin réduite et lectures mémoire protégées",
      "summary": "Le stockage scalaire réutilisable réduit la pile de la fonction de dessin de 447 424 à 32 640 octets. Un autre plantage lors du hachage révèle une course entre vérification et lecture : les copies et hachages GPU conservent désormais le mappage jusqu’à leur fin. Le test de libération concurrente, 34 tests mémoire/tampons/index et 60 tests de soumission réussissent. Le premier essai restaure le monde sauvegardé avec 8,63 FPS sur 30,01 secondes sans pause. La météo et le préchauffage empêchent une comparaison directe avec les 10,00 FPS précédents. Une ressource de shader reste non résolue ; les 30 FPS et la stabilité prolongée ne sont pas confirmés. Une nouvelle tentative avec le même exécutable plante encore au chargement dans hash + 0xf0. Le test de lecture protégée réussit, mais ce plantage reste non corrigé ; le code appelant est en cours d’analyse.",
      "imageAlt": "Subnautica: Below Zero — guest read lease build, 2026-10-02"
    },
    "subnautica-overlap-world": {
      "title": "Deuxième restauration et mesure des chevauchements de tampons",
      "summary": "Un nouveau processus restaure à nouveau le même monde sauvegardé après la correction de la propriété des tampons. Les requêtes indexées conservent l’ordre des écritures et la limite de 4096 tampons. Une comparaison ABBA en pause donne 11,93–12,23 FPS en parcours linéaire et 12,30–12,43 avec l’index ; cet écart ne prouve pas un gain général. Une mesure distincte sans pause, caméra fixe, compte 300 images en 30,01 secondes : 10,00 FPS avec météo et givre variables. Les 154 tests backend/index et cinq vérifications Vulkan ciblées réussissent. Les 30 FPS, la stabilité prolongée et la correction complète du rendu restent à établir.",
      "imageAlt": "Subnautica: Below Zero — unpaused world, 2026-10-02"
    },
    "subnautica-save-recovery": {
      "title": "Le monde sauvegardé charge après correction de la propriété des tampons",
      "summary": "Une copie GPU vers la mémoire de 6 Mio recouvrait un objet corrompu lors du chargement. Le cache suit désormais la durée de vie des allocations et rejette les anciens résultats lorsque la même adresse est réutilisée. Le premier essai restaure le monde enneigé et permet de marcher, sans prouver une stabilité prolongée. Les 29 tests mémoire, 60 tests de soumission et quatre tests Vulkan ciblés réussissent. Agrandir le cache seul donne 9,93 → 9,10 FPS dans la même scène en pause ; la valeur par défaut reste inchangée. Les 30 FPS ne sont pas atteints.",
      "imageAlt": "Subnautica: Below Zero — recovered world, 2026-10-02"
    },
    "subnautica-save-metadata": {
      "title": "Écriture et métadonnées des sauvegardes corrigées ; chargement encore en échec",
      "summary": "La sauvegarde normale écrit et valide une archive de 213 388 octets, puis revient au jeu. Un nouveau processus reconnaît la sauvegarde avec la bonne date et durée, sans avertissement de corruption. Les corrections générales concernent les écritures POSIX et la structure complète des paramètres ; 52 tests de sauvegarde et de fichiers réussissent. La restauration du monde rencontre encore une corruption mémoire. Un contrôle distinct des tampons de commandes libérés passe 60 tests ; son lien avec cet échec reste indémontré."
    },
    "subnautica-vector-walk": {
      "title": "Analyse CPU des shaders allégée ; la scène reste à 7 FPS",
      "summary": "L’analyse CPU des ressources évite l’interprétation purement vectorielle tout en conservant les contrôles de dépendance et les instructions GPU. Une correction distincte invalide les deux mots des masques vectoriels écrits. Les 71 tests scalaires et neuf tests GPU réussissent. Les parcours isolés prennent 15–36 % de temps en moins ; la dernière mesure de 30 secondes atteint 7,00 FPS, sans gain comparatif contrôlé. Copies, préparation des ressources et soumissions restent coûteuses. Le clavier suit désormais le focus. Les échecs de chargement, une liaison non résolue et les 30 FPS restent à traiter.",
      "imageAlt": "Subnautica: Below Zero — 1920×1080 gameplay, 2026-10-02"
    },
    "subnautica-srgb-spans": {
      "title": "Écriture sRGB corrigée et plages mémoire des mipmaps conservées",
      "summary": "Le G-buffer et la sortie finale capturés demandaient du sRGB, mais utilisaient des attachments UNORM, ce qui assombrissait les couleurs à la lecture sRGB. Le moteur encode désormais les écritures couleur et préserve les octets encodés lors de l’affichage. Un test GPU vérifie l’échantillonnage, l’alpha et la sortie avec la validation Vulkan ; 129 tests ciblés réussissent. Les contrôles des mipmaps réutilisent leurs plages mémoire calculées. Le rapport décrit les essais en jeu et les limites restantes. Le nouvel essai atteint la zone enneigée avec des matériaux visiblement plus clairs et mesure 9,49 FPS sur 30,05 secondes (référence : 9,13 FPS). La météo et les effets diffèrent, ce qui empêche de confirmer un gain ; les 30 FPS, une liaison scalaire non résolue et les échecs intermittents de chargement restent à traiter.",
      "imageAlt": "Zone enneigée et interface de survie de Subnautica Below Zero après correction des écritures de couleur sRGB"
    },
    "subnautica-mip-coherence": {
      "title": "Mémoire des mipmaps : transferts répétés supprimés",
      "summary": "La trace du jeu révélait dix lectures de mipmaps RG32F par image (2730 Kio), suivies de nouveaux transferts vers le GPU. La validation distingue désormais une écriture GPU vérifiée d’un remplacement par le CPU. Les quatre cas Vulkan avec niveaux linéaires/compactés et suivi mémoire passent, ainsi que 129 tests ciblés. Dans le nouveau lancement, les transferts des cibles couleur du menu tombent à zéro : les dix niveaux restent sur le GPU. L’éclairage sombre, les chargements intermittents et l’objectif de 30 FPS restent à résoudre. La version atteint la scène enneigée : 260 images en 30,01 secondes sans déplacement donnent 8,66 FPS. Un gain global de fréquence d’images n’est pas établi.",
      "imageAlt": "Site enneigé du crash et interface de Subnautica: Below Zero après la correction des mipmaps ; éclairage encore sombre"
    },

    "yotei-intro-video": {
      title: "La vidéo d'intro se décode et se lit",
      summary:
        "Les unités d'accès H.264 que le titre confie à la bibliothèque vidéo invitée sont maintenant décodées sur l'hôte, converties depuis NV12 avec les coefficients BT.709, et cadencées à environ une image par intervalle d'affichage, pour qu'un titre qui fournit des images aussi vite qu'on les accepte ne brûle plus tout un film en quelques secondes. L'image du moteur derrière la vidéo restait noire : ce n'était donc qu'une étape de lecture.",
      imageAlt:
        "Une image d'intro de Ghost of Yōtei, décodée et affichée par PS5PCEM",
    },
    "yotei-bonus-notices": {
      title: "De l'intro aux avis de bonus et au calibrage de la luminosité",
      summary:
        "La lecture de l'intro est devenue continue à environ les 30 FPS natifs du flux, et la session a franchi le chargement en flux des ressources de menu jusqu'à l'indicateur de chargement, aux avis Digital Deluxe Bonus, Gift of the Northern Star et Pre-order Bonus, puis au calibrage de la luminosité — image du loup, instructions, curseur et glyphe de confirmation tous lisibles.",
      imageAlt:
        "Écran de calibrage de la luminosité de Ghost of Yōtei avec l'image du loup, rendu par PS5PCEM",
    },
    "yotei-difficulty": {
      title: "Le choix de difficulté s'affiche sur une scène 3D chargée",
      summary:
        "La composition du menu a atteint le choix de difficulté dessiné par-dessus une véritable géométrie 3D, avec des arbres et des parties du décor visibles et la musique du menu audible. Il a fallu plusieurs minutes d'intro et de chargement de scène, et les images arrivaient à 0,6 FPS.",
      imageAlt:
        "Choix de difficulté de Ghost of Yōtei sur une scène 3D chargée, rendu par PS5PCEM",
    },
    "yotei-tree-scene": {
      title: "Le son des films fonctionne et des scènes 3D tardives apparaissent",
      summary:
        "Les films d'intro ont gagné le son, démarrant en phase avec la piste au lieu de rester muets, après que l'ATRAC9 multicanal a été décodé en flux mono entrelacés sur des configurations de 2 à 36 canaux. La session a atteint des scènes 3D tardives dont celle de l'arbre, à 0,73 FPS, et la séquence de chargement suivante a perdu le périphérique Vulkan.",
      imageAlt: "Scène de l'arbre de Ghost of Yōtei, rendue par PS5PCEM",
    },
    "yotei-command-writes": {
      title: "Les écritures du processeur de commandes survivent à la relecture différée",
      summary:
        "Une écriture explicite du processeur de commandes dans un tampon de stockage en cache pouvait être perdue quand un résultat GPU plus ancien était publié par-dessus, car le chemin de vidage ne comparait que l'adresse de base du tampon. Indexer les tampons qui se chevauchent et ne publier que des plages d'écriture prouvées a corrigé la corruption d'en-tête qui en résultait.",
      imageAlt:
        "Scène de l'arbre de Ghost of Yōtei après les corrections d'écriture de commandes, rendue par PS5PCEM",
    },
    "yotei-null-images": {
      title:
        "Les textures entièrement nulles traitées comme non liées, et récupération de descripteurs plus rapide",
      summary:
        "Les textures dont on prouve qu'elles sont entièrement nulles utilisent désormais la sémantique d'image non liée au lieu de faire rejeter le shader, et la récupération scalaire de descripteurs réutilise les valeurs intermédiaires au sein d'un appel — un cas de test imbriqué est passé de 504 lectures à 18 et a tourné environ 4,6× plus vite en isolation. Deux vérifications du runner installé se sont tout de même arrêtées en attente d'achèvement GPU avant la scène de l'arbre et ont été interrompues volontairement après diagnostic.",
      imageAlt:
        "Avis Digital Deluxe Bonus de Ghost of Yōtei avant l'attente GPU du 1er octobre, rendu par PS5PCEM",
    },

    "bhh-startup": {
      title: "Une attente sans fin pendant le chargement, corrigée",
      summary:
        "Le titre pouvait s'arrêter sur sa première image noire ou en pleine phase de chargement des ressources alors que son processus et ses threads audio restaient vivants : le thread de chargement attendait indéfiniment après qu'une lecture de fichier a renvoyé une erreur d'entrée-sortie. Traiter correctement les lectures de fichiers surveillées par le GPU a levé le blocage.",
      imageAlt:
        "Menu principal de Big Helmet Heroes après la correction du démarrage, rendu par PS5PCEM",
    },
    "bhh-menu": {
      title: "Un menu principal correct, et où part le temps",
      summary:
        "Avec l'adressage de textures Gen5 à échantillon unique, les cibles de rendu en couches et l'ordre des canaux à l'affichage corrigés, le menu s'affiche correctement avec ses modèles de personnages, textures et éclairage. Le profilage a situé le coût dans le backend graphique de l'hôte — préparation des ressources, copies de la mémoire invitée vers Vulkan et synchronisation — plutôt que dans la compilation de pipelines.",
      imageAlt:
        "Menu principal de Big Helmet Heroes avec modèles de personnages et éclairage, rendu par PS5PCEM",
    },
    "bhh-copies": {
      title:
        "Copies de tuiles plus larges, éviction moins coûteuse et surveillance de pages groupée",
      summary:
        "Le convertisseur de disposition copie désormais une séquence horizontale complète de 16 octets dès que son équation d'adresse prouve que ces octets sont contigus, au lieu de déplacer un pixel à la fois. L'éviction du cache de tampons a cessé de parcourir les 4 096 entrées, les pages invitées voisines sont surveillées par groupes, et les tampons Vulkan terminés sont recyclés.",
      imageAlt:
        "Scène de tutoriel de Big Helmet Heroes après les optimisations de copie, rendue par PS5PCEM",
    },
    "bhh-scalar-history": {
      title: "Comptabilité scalaire allégée, sans gain de fluidité à montrer",
      summary:
        "Les points de contrôle de ressources ne portent plus d'historique de chargements scalaires inutilisé, et l'analyse scalaire complète évite les parcours redondants lors des visites en avant. Les cas de test isolés sont devenus 9–45 % moins coûteux, mais les échantillons de jeu comparables n'ont pratiquement pas bougé — 157 ms dans le menu contre 154,5 ms dans le témoin — et le rapport le dit sans détour.",
      imageAlt:
        "Tutoriel de Big Helmet Heroes après le changement de comptabilité des chargements scalaires, rendu par PS5PCEM",
    },

    "quake-playable": {
      title: "Jouable et terminable",
      summary:
        "Le mainteneur a confirmé une partie complète. Le travail derrière cela a couvert les imports au démarrage et les listes de répertoires, les écritures de G-buffer différées, les échantillonneurs de comparaison de profondeur et les lectures de tampons typés dont dépendent les sommets de modèles et les données d'éclairage. La géométrie de PNJ manquante est revenue.",
      imageAlt: "Écran-titre de Quake II, rendu par PS5PCEM",
    },
    "quake-rendering": {
      title: "Rendu revérifié, avec des pointes de 60–70 FPS",
      summary:
        "Une revérification en PPSA09477 v1.003 a trouvé l'éclairage des niveaux, les textures, les armes et les PNJ tous visibles, ce qui clôt les anciens signalements de monde sombre et de modèles manquants. La réutilisation des tampons et les effacements GPU ont réduit le coût des transferts ; les scènes légères culminent à 60–70 FPS tandis que les combats chargés restent plus lents.",
      imageAlt:
        "Quake II, partie avec un niveau éclairé, des ennemis visibles et l'arme du joueur, rendu par PS5PCEM",
    },

    "tetris-first-render": {
      title: "La première image reconnaissable issue du graphe de démarrage",
      summary:
        "595 appels de dessin invités et 63 dispatches de calcul se sont achevés sans un seul appel rejeté, produisant la première image de particules reconnaissable. Comme la cible de sortie 4K déclarée restait noire, l'affichage s'est replié sur la conversion d'une image intermédiaire en 1920×1080 — une étape de rendu précoce, pas un menu.",
      imageAlt:
        "La première image de particules reconnaissable de Tetris Effect, rendue par PS5PCEM",
    },
    "tetris-license-journey": {
      title: "Écran de licence et sélection Journey, plusieurs fois plus rapides",
      summary:
        "Une composition traduite a remplacé les remplacements 4K spéculatifs, et la publication de remplissages linéaires de métadonnées a supprimé l'interface dupliquée et la couture verticale. Les images médianes de licence sont passées de 235 ms à 159 ms, et les images Journey échantillonnées de 1127–1276 ms à 318–396 ms. Des éléments d'interface sombres et un plantage du décodeur invité subsistent.",
    },

    "rita-intro-menu": {
      title: "Intro de l'éditeur, menu-titre et la scène derrière",
      summary:
        "Le titre s'est installé dans une boucle graphique et audio stable en 1920×1080 et a dessiné sa séquence d'éditeur animée, son menu-titre et la scène d'après-menu. Cette scène provient d'une véritable cible invitée en 480×270 portée à travers la chaîne CRT et de post-traitement, ce qui a remplacé l'ancien bruit plein écran.",
      imageAlt:
        "Intro de l'éditeur de Mighty Morphin Power Rangers: Rita's Rewind, rendue par PS5PCEM",
    },
    "rita-playable": {
      title: "Jouable et terminable",
      summary:
        "Le mainteneur a confirmé une partie complète le 24 septembre. La capture montre le Ranger rouge dans l'étape d'entraînement du Command Center avec ATH, barre de vie, objectifs et indications de boutons, tous réagissant à la manette. Le repli étroitement ciblé de mise à l'échelle CRT reste nécessaire sur la machine de référence.",
      imageAlt:
        "Rita's Rewind, partie avec le Ranger rouge dans le Command Center, rendu par PS5PCEM",
    },

    "jets-tutorial": {
      title: "START GAME atteint le tutoriel en 4K",
      summary:
        "Le contenu du titre s'est résolu, l'enregistrement des ressources AGC s'est achevé, et la boucle complète graphique, calcul et affichage s'est maintenue. START GAME a franchi l'écran de chargement jusqu'à un tutoriel reconnaissable en 3840×2160, et une session sans surveillance est restée vivante au-delà de la présentation 300.",
      imageAlt:
        "Tutoriel de Jets 'n' Guns 2, rendu par PS5PCEM",
    },
    "jets-playable": {
      title: "Jouable et terminable",
      summary:
        "Le mainteneur a confirmé une partie complète. Niveaux, ATH, score, ennemis et scène en parallaxe s'affichent tous correctement. Le profilage d'une image de 70 ms a trouvé 18 ms d'attente GPU sur 33 soumissions, 11 ms de points de contrôle de ressources et 13 ms de préparation de 894 tampons invités.",
      imageAlt:
        "Jets 'n' Guns 2, partie avec le vaisseau du joueur, l'ATH et le score, rendu par PS5PCEM",
    },
    "jets-audio": {
      title: "Le son cesse de se couper lui-même",
      summary:
        "Deux ports de sortie actifs se disputaient le périphérique audio de l'hôte, démontant le mixage et réouvrant le périphérique plusieurs fois par image. La version 0.3.2 a corrigé le routage ; le statut jouable et terminable existant n'en a pas été affecté.",
    },

    "cat-quest-render-fixes": {
      title:
        "Un monde à l'envers, du texte corrompu et des couleurs inversées, tous corrigés",
      summary:
        "Le monde s'affichait à l'envers alors que l'interface non ; la couverture des fragments et les passes de pochoir seul corrompaient le texte des menus ; l'interface AGC d'origine pour la correspondance des interpolants manquait, si bien que les illustrations d'aventure et les décors utilisaient de mauvaises sorties sommet-vers-fragment ; et les formats d'affichage déclarés étaient ignorés, inversant le rouge et le bleu. Les quatre ont été corrigés.",
      imageAlt:
        "Liste des langues de Cat Quest III avec un texte lisible rogné dans son panneau, rendue par PS5PCEM",
    },
    "cat-quest-playable": {
      title: "Jouable et terminable",
      summary:
        "Le mainteneur a confirmé une partie complète. En parallèle, le travail de traduction de shaders par image échantillonnée est passé d'environ 40 ms à 7 ms et les envois de tampons d'environ 125 Mio à 65–75 Mio, faisant passer l'île de départ de quelque 148 ms à une médiane de 124 ms.",
      imageAlt:
        "Cat Quest III, partie sur l'île avec l'ATH, les montagnes et la mer bleue, rendu par PS5PCEM",
    },

    "precinct-title-menu": {
      title: "Les deux films d'intro, le menu-titre et une première image de jeu",
      summary:
        "Le graphe invité à six images s'est lié, les plug-ins Unity ont démarré, et les deux films d'intro se sont lus en 4K synchronisée avec son stéréo avant l'apparition de l'illustration du titre et d'une confirmation NEW GAME lisible. Une session antérieure sous garde a atteint l'invite Croix et produit la première image de jeu vérifiée dans le moteur.",
      imageAlt:
        "The Precinct, menu-titre avec la confirmation NEW GAME, rendu par PS5PCEM",
    },
    "sarah-playable": {
      title: "Jouable et terminable à la limite de fréquence",
      summary:
        "Partie complète confirmée, avec menu-titre et première scène tenant la limite de 60 FPS — 5 280 présentations en 90 secondes. Le chargement a d'abord exigé de restaurer eboot.bin et sce_module/libc.prx depuis les sauvegardes laissées par le patcheur d'eboot de la copie après avoir tronqué les deux.",
      imageAlt: "Dreaming Sarah, scène forestière avec un PNJ, rendue par PS5PCEM",
    },
    "terminator-playable": {
      title: "Jouable et terminable",
      summary:
        "Terminé sans défaut signalé. Décors, personnages, ATH, textures et couleurs sont tous corrects, et les images de démarrage à chaud mesurent 22–65 ms. L'alpha des textures, l'ordre des canaux et l'échantillonnage sRGB préservent l'équilibre des couleurs voulu.",
      imageAlt:
        "Terminator 2D, partie avec le personnage, l'ATH et une scène désertique, rendu par PS5PCEM",
    },
    "asterix-playable": {
      title: "Jouable et terminable",
      summary:
        "Partie complète confirmée à 28–31 ms par image, avec une session de développement de 3 000 présentations sans soumission rejetée. La composition plein écran reste résidente sur le GPU, et l'affichage conserve l'orientation de la fenêtre invitée sans détour par la mémoire de l'hôte.",
      imageAlt:
        "Asterix & Obelix: Slap Them All!, partie avec l'ATH et un panneau GO, rendu par PS5PCEM",
    },
    "jurassic-playable": {
      title: "Jouable et terminable",
      summary:
        "Partie complète confirmée. Le rendu au démarrage a été rétabli, avec le logo du titre, la demande de confirmation, les jaquettes de la collection et l'aperçu animé. Enchaîner les aperçus peut encore épuiser un pool de descripteurs multimédias, après quoi les aperçus suivants se figent.",
      imageAlt:
        "Écran de sélection de Jurassic Park Classic Games Collection avec jaquettes, rendu par PS5PCEM",
    },
    "reanimal-title-menu": {
      title: "Un menu-titre animé en 4K, sans ses libellés",
      summary:
        "Les modules natifs et de micrologiciel se sont résolus, la séquence du logo de l'éditeur s'est lue, et le menu-titre animé en 3840×2160 s'est maintenu avec son fond à la bouée, son logo, les reflets sur l'eau et l'invite SELECT visibles. Les libellés centraux ne sont toujours que de petites marques rouges : la navigation n'a jamais été vérifiée.",
      imageAlt:
        "Menu-titre animé de REANIMAL avec des libellés incomplets, rendu par PS5PCEM",
    },
    "propagation-bootstrap": {
      title: "Amorçage d'Unreal jusqu'à la première soumission",
      summary:
        "Le paquet de 8,8 Gio s'est monté, l'amorçage d'ICU et de la configuration s'est achevé, l'archive globale de shaders précompilée s'est ouverte, les shaders AGC ont été créés, et le premier tampon de commandes a été soumis. La session précède les constructeurs de paquets de synchronisation actuels et doit être refaite.",
    },
    "pistol-whip-modules": {
      title: "Les modules VR se chargent, les archives Unity commencent à charger",
      summary:
        "Le plug-in PS VR2 natif et le module Burst se sont tous deux chargés, et le titre a commencé à charger ses archives de données Unity. Aller plus loin attend le support du casque, du suivi et d'OpenXR côté hôte, que le projet a volontairement reporté.",
    },
  },
};

export default fr;
