import type { Content } from "./en";

const es: Content = {
  games: {
    "little-nightmares-enhanced-edition": {
      "status": "En juego · renderizado incompleto",
      "headline": "Guardar y cargar funciona; 3,73–4,46 FPS en la primera habitación.",
      "summary": "3 de octubre, PPSA10737 v01.004.000: las escrituras asíncronas conservan el progreso y un nuevo proceso carga la primera habitación al continuar. HTILE, las lecturas inmediatas de GPU agrupadas y cuatro hilos de copia reducen el coste de renderizado. Aún no se alcanzan 5 FPS.",
      "strengths": [
        "Verificados Nueva partida, movimiento, seguimiento de cámara y encendedor.",
        "Se escriben partidas no vacías y se cargan tras reiniciar el emulador."
      ],
      "limits": [
        "Persisten la iluminación oscura, los materiales reflectantes incorrectos y shaders FLAT/de intersección de rayos sin soporte.",
        "Fallos intermitentes del gestor de memoria pueden interrumpir el arranque; completar el juego y la estabilidad prolongada no están verificados."
      ],
      "performance": "Compilación actual con valores predeterminados: 4,46 FPS junto a la maleta y 3,73 FPS tras avanzar a la derecha, 30 segundos sin pausa por muestra. RTX 3070 Ti, salida 1080p, preset Speed y modo Performance del juego; resolución interna controlada por el juego. Los 2,16 FPS anteriores no se midieron en la misma posición. No se alcanzan 5 FPS.",
      "imageAlt": "Six junto a la maleta en la primera habitación; persisten iluminación oscura y materiales reflectantes incorrectos"
    },
    "gta-iii-definitive-edition": {
      "status": "En juego · movimiento verificado",
      "headline": "Colores y reflejos corregidos en el gameplay de GTA III.",
      "summary": "Versión de desarrollo del 3 de octubre, PPSA03527 v1.007: Give Me Liberty muestra personaje, vehículo, puente, HUD y minimapa. Se corrigen causas de la sobreexposición verde y niveles de reflejos incompletos. El análisis compartido de recursos y las texturas residentes en GPU reducen trabajo repetido de CPU y transferencias.",
      "strengths": [
        "Una partida nueva supera la introducción y llega a la primera misión.",
        "Se verificaron el movimiento con teclado y el cambio de dirección."
      ],
      "limits": [
        "Persisten defectos visuales y diagnósticos de recursos sin resolver.",
        "No se han verificado el inicio fiable, los guardados, la precisión del audio ni una partida completa."
      ],
      "performance": "8.10–8.97 FPS en la posición inicial (dos muestras de 30 segundos; 8,53 FPS combinados). Dentro del coche: 7,20 FPS; vista amplia de la ciudad tras conducir: 3,57 FPS. Performance, Bloom/Motion Blur desactivados, Classic Lighting activado. Salida 1080p; resolución interna controlada por el juego. No es un mínimo de 8 FPS en todo el juego.",
      "imageAlt": "Personaje y coche de GTA III en Callahan Bridge tras corregir colores y reflejos"
    },
    "subnautica-below-zero": {
      "status": "Jugable · Se puede completar",
      "headline": "Una partida nueva llega a la zona inicial; se verificaron la cámara y el movimiento.",
      "summary": "Repetición del 3 de octubre, PPSA02457 v1.022.125: el ejecutable instalado restaura la partida Survival y muestra el lugar nevado del accidente y el HUD. Se mide la versión actual tras los cambios compartidos del renderizador para GTA III; esta prueba no añade correcciones nuevas.",
      "strengths": [
        "Verificados: partida nueva, introducción, mundo, cámara y desplazamiento."
      ],
      "limits": [
        "Persisten iluminación oscura, defectos gráficos y pausas largas.",
        "El recorrido completo, la corrección del audio y la estabilidad prolongada siguen sin verificarse."
      ],
      "performance": "Nuevo proceso, mismo ejecutable y partida Survival: menú a 15,50 FPS; dos mediciones de 30 segundos sin pausa y con cámara fija a 12,70 y 8,50 FPS, 10,60 FPS combinados. Salida 1080p, Speed, cachés calientes. No hubo una parada de diez segundos en estos intervalos, pero persisten retrasos más cortos. El inicio anterior dio 9,52 FPS de media. Es variación entre pruebas, no una nueva optimización; no se alcanzan los 30 FPS.",
      "imageAlt": "Lugar nevado del accidente y HUD de supervivencia de Subnautica: Below Zero en la medición del 3 de octubre"
    },

    "terminator-2d-no-fate": {
      status: "Jugable · Completable",
      headline: "Terminado sin ningún problema reportado.",
      summary:
        "El responsable del proyecto completó este juego. Fondos, personajes, HUD, texturas y colores salen como se pretendía, y desde la confirmación del 8 de septiembre es el título de referencia más estable del proyecto.",
      strengths: [
        "Una partida completa sin defectos reportados.",
        "El alfa de las texturas, el orden de canales y el muestreo sRGB conservan el balance de color previsto.",
        "HUD y arte de personajes se dibujan con limpieza de principio a fin.",
      ],
      limits: [
        "Los tiempos por fotograma siguen variando con la escena en vez de mantenerse fijos.",
      ],
      performance:
        "Ya en caliente, los fotogramas de arranque caen entre 22 y 65 ms en el equipo de referencia.",
      imageAlt:
        "Terminator 2D: No Fate, partida con el personaje, el HUD y una escena desértica, renderizada por PS5PCEM",
    },

    "asterix-obelix-slap-them-all": {
      status: "Jugable · Completable",
      headline: "Terminado de principio a fin, con intro e interfaz correctas.",
      summary:
        "Partida completa confirmada. El juego y la interfaz se dibujan del lado correcto, y la intro se reproduce. La composición final a pantalla completa se queda en la GPU, y la salida conserva la orientación de la ventana invitada sin copiar un fotograma a través de la memoria del anfitrión.",
      strengths: [
        "Partida completa confirmada por el responsable.",
        "El vídeo de intro se reproduce, y juego e interfaz están correctamente orientados.",
        "Una sesión de desarrollo de 3.000 presentaciones acabó sin un solo envío rechazado.",
      ],
      limits: [
        "El coste por fotograma depende de la densidad de la escena en vez de estar fijado.",
      ],
      performance: "El juego mide normalmente 28–31 ms por fotograma.",
      imageAlt:
        "Asterix & Obelix: Slap Them All!, partida en un bosque con el HUD y un cartel GO, renderizada por PS5PCEM",
    },

    "cat-quest-iii": {
      status: "Jugable · Completable",
      headline:
        "Terminado, con menús, diálogos y relieve de la isla bien dibujados.",
      summary:
        "Partida completa confirmada. Menús, cartas de aventura, diálogos, relieve de la isla y colores son correctos en las escenas capturadas. Hizo falta corregir la orientación del mundo, las pasadas de solo plantilla, la correspondencia de interpolantes AGC y el orden de canales en la salida.",
      strengths: [
        "Partida completa confirmada por el responsable.",
        "La lista de idiomas conserva su texto y lo recorta dentro de su panel en vez de quedar cubierta.",
        "La selección de aventura muestra el arte de las ranuras, las etiquetas, los botones de añadir y las flechas de desplazamiento.",
      ],
      limits: [
        "El límite que queda es la tasa de fotogramas en la isla inicial, no la corrección del render.",
      ],
      performance:
        "Las muestras de la isla inicial tienen una mediana de 124 ms, alrededor de 8 FPS, frente a unos 148 ms antes del trabajo de optimización.",
      imageAlt:
        "Cat Quest III, partida en la isla con el HUD, montañas y mar azul, renderizada por PS5PCEM",
    },

    "dreaming-sarah": {
      status: "Jugable · Completable",
      headline: "Terminado, y el inicio corre en el límite de 60 FPS.",
      summary:
        "Confirmado jugable el 15 de septiembre de 2026. Menús, título animado, escenas del mundo, personajes y PNJ se dibujan correctamente, y la primera escena mantiene el límite de fotogramas en el equipo de referencia.",
      strengths: [
        "Partida completa confirmada por el responsable.",
        "Menú de título y primera escena mantienen el límite de 60 FPS: 5.280 presentaciones en 90 segundos.",
        "Título animado, escenas del mundo y PNJ se dibujan todos correctamente.",
      ],
      limits: [
        "El responsable informa de una caída de fotogramas en la segunda escena de juego, que no se ha medido.",
        "La carga exigió restaurar eboot.bin y sce_module/libc.prx desde las copias que dejó el parcheador de eboot de la propia copia, que había truncado ambos.",
      ],
      performance:
        "Menú de título y primera escena mantienen 60 FPS, medido como 5.280 presentaciones en 90 segundos.",
      imageAlt:
        "Dreaming Sarah, escena de bosque con un PNJ, renderizada por PS5PCEM",
    },

    "jurassic-park-classic-games-collection": {
      status: "Jugable · Completable",
      headline:
        "Terminado, incluidos la intro, el título animado y el menú de la colección.",
      summary:
        "Partida completa confirmada. Intro, título animado y selección de la colección funcionan, con carátulas, flechas de navegación y una vista previa animada. El rendimiento depende de qué juego de la colección esté corriendo.",
      strengths: [
        "Partida completa confirmada por el responsable.",
        "La selección muestra carátulas, flechas de navegación y una vista previa animada.",
        "El render de arranque, el logotipo del título y la petición de confirmación son correctos.",
      ],
      limits: [
        "Recorrer las vistas previas de vídeo una y otra vez puede agotar un grupo de descriptores de AvPlayer, tras lo cual las vistas posteriores se congelan.",
        "El coste por fotograma varía según el juego de la colección y el hardware.",
      ],
      performance:
        "Fotogramas anteriores de título y selección se muestrearon en torno a 27 y 33 ms.",
      imageAlt:
        "Jurassic Park Classic Games Collection, pantalla de selección con carátulas, renderizada por PS5PCEM",
    },

    "jets-n-guns-2": {
      status: "Jugable · Completable",
      headline:
        "Terminado, con niveles, HUD, puntuación y parallax todos correctos.",
      summary:
        "Confirmado jugable el 15 de septiembre de 2026. Niveles, HUD, puntuación, enemigos y el fondo en parallax se dibujan correctamente en la partida capturada. El coste por fotograma lo dominan las esperas de GPU y la preparación de un gran número de búferes invitados en cada fotograma.",
      strengths: [
        "Partida completa confirmada por el responsable.",
        "Niveles, HUD, puntuación, enemigos y capas de parallax se dibujan todos correctamente.",
        "El audio ya no se corta: la versión 0.3.2 acabó con dos puertos de salida compitiendo por el dispositivo del anfitrión.",
      ],
      limits: [
        "El coste por fotograma lo siguen dominando las esperas sincrónicas de GPU y la preparación de búferes.",
      ],
      performance:
        "Los fotogramas miden 70–92 ms, unos 11–14 FPS. En un fotograma de 70 ms, 18 ms esperan a la GPU en 33 envíos, 11 ms preparan puntos de control de recursos y 13 ms preparan 894 búferes invitados distintos que suman 15 MiB.",
      imageAlt:
        "Jets 'n' Guns 2, partida con la nave del jugador, el HUD y la puntuación, renderizada por PS5PCEM",
    },

    "the-precinct": {
      status: "Menú de título, películas de intro y un primer fotograma en el motor",
      headline:
        "Reproduce las dos películas de intro, dibuja el menú de título y entra en la carga en frío del mundo.",
      summary:
        "El grafo invitado completo de seis imágenes se enlaza, los complementos de Unity arrancan, y las dos películas de intro observadas se reproducen como vídeo 4K sincronizado con sonido estéreo de 48 kHz. El arte del título y una confirmación NEW GAME legible se dibujan, y mantener Triángulo inicia la carga del mundo. Una sesión anterior protegida produjo el primer fotograma de juego verificado en el motor.",
      strengths: [
        "Las dos películas de intro se reproducen como vídeo 3840×2160 sincronizado con sonido estéreo de 48 kHz.",
        "El arte completo del título en 1920×1080 y una confirmación NEW GAME legible se dibujan.",
        "La entrega de excepciones a un hilo objetivo completa el apretón de manos de parada global de Unity.",
      ],
      limits: [
        "La primera transición al mundo sigue tardando minutos: traducción de shaders en el primer uso, compilación de pipelines por el controlador, envío sincrónico y preparación de recursos cuestan todos caro.",
        "Se retiró un apaño del compilador propio de este título a favor de la ruta general de shaders, así que la transición necesita una validación nueva de principio a fin antes de afirmar nada sobre jugabilidad.",
      ],
      performance:
        "El fotograma de carga del mundo mide ahora 2,1 s frente a 5,1 s, desde que la recuperación de descriptores dejó de repetir el prólogo de cada kernel por cada recurso que nombra.",
      imageAlt:
        "The Precinct, menú de título con la confirmación NEW GAME, renderizado por PS5PCEM",
    },

    "ghost-of-yotei": {
      status:
        "Reproducción de intro · avisos de bonus · calibración de brillo · llega a escenas de juego · no jugable",
      headline:
        "Los menús y el árbol se muestran, con defectos visibles y una tasa de imágenes muy baja.",
      summary:
        "Es el caso de prueba más duro del proyecto y el mejor documentado. Las películas de intro suenan, aparecen los avisos de bonus y la calibración de brillo, y escenas 3D tardías como la del árbol llegan a la pantalla. Nada de eso es jugable: los fotogramas de escena llegan muy por debajo de 1 FPS, y no se afirma ninguna partida completa.",
      strengths: [
        "Las películas de intro van a unos 30 FPS nativos, con el sonido empezando a la par que la pista.",
        "El indicador de carga, los avisos de bonus y la pantalla de calibración con la imagen del lobo, el deslizador y el aviso se dibujan todos.",
        "Escenas 3D tardías, incluida la del árbol, llegan a la pantalla con la música del menú audible.",
      ],
      limits: [
        "El juego en sí — mover un personaje por un mundo cargado — sigue sin verificarse.",
        "La preparación de escenas es extremadamente lenta, y un fotograma de transición se midió en 167,2 s, de los cuales 164,8 s crearon 206 pipelines de cómputo.",
        "Dos comprobaciones recientes se detuvieron esperando a que la GPU terminara, antes de la escena del árbol, y se cortaron a propósito tras el diagnóstico.",
        "Llamadas de dibujo indirectas no válidas, un fallo de contador corrupto, estelas y brillo excesivo siguen todos abiertos.",
      ],
      performance:
        "Mediciones base del árbol del 3 de octubre antes del cambio de estados dinámicos: 0,83–0,97 FPS contando imágenes presentadas durante 30 segundos. El anterior resultado de 0,73 FPS es histórico. Son mediciones del árbol y la configuración, no del juego tras la cinemática. Los distintos historiales de caché impiden una comparación controlada del antes y el después.",
      imageAlt:
        "Aviso Digital Deluxe Bonus de Ghost of Yōtei, renderizado por PS5PCEM",
    },

    "quake-ii-2023": {
      status: "Jugable · Completable",
      headline: "Terminado, con iluminación, modelos y armas restaurados.",
      summary:
        "Confirmado jugable el 16 de septiembre de 2026 y revisado el 25 de septiembre como PPSA09477 v1.003. La iluminación de los niveles, las texturas, las armas y los PNJ están visibles: el mundo oscuro y los modelos ausentes de compilaciones anteriores quedan resueltos en la partida observada. Menús, HUD y mando funcionan todos.",
      strengths: [
        "Partida completa confirmada por el responsable, con el render revisado después.",
        "Iluminación, texturas, armas y modelos de PNJ aparecen; los defectos anteriores de mundo oscuro y geometría ausente han desaparecido.",
        "Menús, HUD y entrada de mando se comportan correctamente.",
      ],
      limits: [
        "Los combates cargados siguen muy por debajo de los picos, así que las cifras altas no son un suelo.",
        "El trabajo de rendimiento continúa.",
      ],
      performance:
        "El responsable informa de picos de 60–70 FPS en escenas ligeras, mientras los combates cargados siguen notablemente más lentos. La reutilización de búferes y los borrados por GPU redujeron el coste de las transferencias.",
      imageAlt:
        "Quake II, partida con un nivel iluminado, enemigos visibles y el arma del jugador, renderizada por PS5PCEM",
    },

    reanimal: {
      status: "Menú de título animado en 4K, con etiquetas incompletas",
      headline:
        "Reproduce la secuencia del logotipo y sostiene el grafo de render del menú de título animado.",
      summary:
        "Los módulos nativos y de firmware observados se resuelven, la secuencia del logotipo de la compañía se reproduce, y el menú de título animado en 3840×2160 sigue dibujándose. El fondo con la boya, el logotipo, los reflejos del agua y el aviso SELECT están visibles; las etiquetas de las opciones del menú, no.",
      strengths: [
        "La secuencia del logotipo de la compañía se reproduce y el menú de título animado en 4K se sostiene.",
        "Los búferes intermedios estrechos de la interfaz de Unity ya no sustituyen a la salida completa.",
        "Los atlas de fuentes R8 dinámicos invalidan correctamente las imágenes muestreadas obsoletas.",
      ],
      limits: [
        "Las etiquetas centrales del menú quedan reducidas a pequeñas marcas rojas, así que la navegación y el paso al juego no están verificados.",
        "Rendimiento y estabilidad en sesiones largas no están medidos, y no se afirma jugabilidad.",
      ],
      imageAlt:
        "Menú de título animado de REANIMAL con etiquetas incompletas, renderizado por PS5PCEM",
    },

    "ritas-rewind": {
      status: "Jugable · Completable",
      headline:
        "Terminado, desde la secuencia de la distribuidora hasta el juego en el Command Center.",
      summary:
        "Confirmado jugable el 24 de septiembre de 2026. La secuencia de la distribuidora, el menú de título y el juego se dibujan y responden al mando; la captura muestra al Ranger rojo en la fase de entrenamiento del Command Center con HUD, barra de vida, objetivos e indicaciones de botones.",
      strengths: [
        "Partida completa confirmada por el responsable.",
        "Las fibras cooperativas nativas conservan intactas las pilas invitadas suspendidas.",
        "La implementación exacta de V_SAD_U32, V_MUL_HI_I32 y V_CVT_FLR_I32_F32 eliminó el shader de diagnóstico de reserva.",
      ],
      limits: [
        "La composición CRT invitada exacta sigue produciendo ruido en el equipo de referencia, así que una ruta de reserva muy ajustada por firma de shader escala la escena 4× en RGBA8 antes del posprocesado.",
      ],
      performance:
        "La intro mantiene unos 13–20 ms por fotograma. Los fotogramas densos tras el menú, de unas 255 llamadas de dibujo, cuestan cerca de 470 ms, sobre todo por la preparación repetida de búferes invitados.",
      imageAlt:
        "Mighty Morphin Power Rangers: Rita's Rewind, partida con el Ranger rojo en el Command Center, renderizada por PS5PCEM",
    },

    "big-helmet-heroes": {
      status: "El menú principal y el tutorial se dibujan · jugabilidad sin verificar",
      headline:
        "Llega a un menú principal correcto y a una escena de tutorial, con fotogramas de un solo dígito.",
      summary:
        "El título pasa de su intro a un menú principal bien dibujado con modelos de personajes, texturas, iluminación y colores, y de ahí a una escena de tutorial. Las correcciones cubrieron el direccionamiento de texturas Gen5 de una sola muestra, los destinos de render en capas y el orden de canales en la salida. El juego en sí no está verificado.",
      strengths: [
        "Un menú principal correcto con modelos, texturas, iluminación y colores.",
        "La escena de tutorial se dibuja tras corregir los bloqueos de arranque y de carga.",
        "La salida es un 1080p limpio, aunque los destinos internos pueden ser mayores.",
      ],
      limits: [
        "Jugabilidad, recuperación de partidas guardadas y estabilidad en sesiones largas están todas sin verificar.",
        "Quedan artefactos visuales, y las copias, la preparación de recursos y las esperas de GPU siguen siendo caras.",
        "No se han alcanzado los 30 FPS.",
      ],
      performance:
        "Muestras de menú comparables miden 157 ms, unos 6,37 FPS; las del tutorial, 270 ms, unos 3,70 FPS. El último cambio de contabilidad no mostró ninguna mejora demostrable de fotogramas en el juego.",
      imageAlt:
        "Escena de tutorial de Big Helmet Heroes, renderizada por PS5PCEM",
    },

    "tetris-effect-connected": {
      status:
        "Logotipos de desarrolladores · pantalla de licencia legible · selección del modo Journey · juego sin verificar",
      headline:
        "Logotipos, pantalla de licencia y selección de Journey se dibujan, mucho más rápido que antes.",
      summary:
        "Verificado el 24 de septiembre de 2026 con PPSA07923 v2.000.022. Una composición traducida sustituyó los antiguos reemplazos 4K especulativos, y las páginas de licencia y menú ya se dibujan sin la interfaz duplicada ni la costura vertical de compilaciones anteriores. Ambas pantallas además salieron bastante más baratas.",
      strengths: [
        "La pantalla de licencia y los menús se dibujan sin interfaz duplicada ni frontera vertical de escena.",
        "Publicar rellenos lineales de metadatos, con borrados DCC R11G11B10 y RGB10A2, eliminó las copias de interfaz acumuladas.",
        "Un perfil de 128 destinos conserva el conjunto de trabajo de unos 100 adjuntos en vez de saturar una caché menor.",
      ],
      limits: [
        "Elementos oscuros de la interfaz y un enlace de textura de cómputo sin resolver siguen abiertos.",
        "La reproducción de vídeo posterior falla en el decodificador H.264 invitado.",
        "La estabilidad en sesiones largas y la jugabilidad no están establecidas.",
      ],
      performance:
        "La mediana de los fotogramas de licencia bajó de 235 ms a 159 ms, de unos 4,3 a 6,3 FPS. Los fotogramas muestreados de Journey bajaron de 1127–1276 ms a 318–396 ms.",
      imageAlt:
        "Un fotograma temprano de partículas de Tetris Effect, renderizado por PS5PCEM",
    },

    "propagation-paradise-hotel": {
      status:
        "Monta su paquete, abre el archivo de shaders, envía el primer búfer de comandos",
      headline: "Completa el arranque de Unreal hasta su primer envío.",
      summary:
        "El paquete de Unreal de 8,8 GiB se monta, el arranque de ICU y de la configuración se completa, el archivo global de shaders precompilado se abre, se crean los shaders AGC y se envía el primer búfer de comandos. No se afirma nada sobre un fotograma presentado.",
      strengths: [
        "El paquete de Unreal de 8,8 GiB se monta y el arranque del motor se completa.",
        "El archivo global de shaders precompilado se abre y se crean los shaders AGC.",
        "El primer búfer de comandos llega al envío.",
      ],
      limits: [
        "La etapa es anterior a los constructores de paquetes de sincronización actuales y necesita una sesión nueva.",
        "La salida VR no tiene puente a unas gafas en el anfitrión, así que no hay nada a lo que presentar.",
      ],
    },

    "pistol-whip": {
      status: "Carga sus módulos VR y luego los archivos de Unity",
      headline: "Llega hasta la carga de los archivos de datos de Unity.",
      summary:
        "El complemento nativo de PS VR2 y el módulo Burst se cargan ambos, y el título empieza a cargar sus archivos de datos de Unity. Todo lo que viene después depende de un soporte de VR que el proyecto ha aplazado a propósito.",
      strengths: [
        "El complemento nativo de PS VR2 y el módulo Burst se cargan correctamente.",
        "Empieza la carga de los archivos de datos de Unity.",
      ],
      limits: [
        "El soporte de gafas, seguimiento, mandos y OpenXR en el anfitrión está aplazado a propósito.",
      ],
    },
  },

  history: {
    "yotei-color-content-generations": {
      "title": "Nuevo ensayo de color y ajustes de caché",
      "summary": "La variante UNORM mide 1,23 FPS en el árbol. Una escena posterior presenta un fotograma en 60 segundos durante una pausa larga; no es una tasa estable de juego. Persisten errores de iluminación, geometría y mezcla de colores. Los siguientes ajustes de caché y memoria superan siete grupos Vulkan y cinco pruebas del núcleo; su beneficio en el juego y el control del personaje no están confirmados.",
      "imageAlt": "Escena oscura después del árbol con defectos gráficos pendientes"
    },
    "yotei-color-transfer-memory": {
      "title": "Transferencias de color compartidas; árbol a 1,40 FPS",
      "summary": "Se eliminan los búferes de lectura individuales de los destinos de color. Brillo y árbol presentan 42 fotogramas en 30 segundos: unos 1,40 FPS frente a 1,26. El historial de caché difiere y no permite atribuir la mejora. Persisten las franjas; se alcanza la película ilustrada, sin confirmar el control del personaje.",
      "imageAlt": "Selección de dificultad junto al árbol; persisten las franjas"
    },
    "yotei-illustrated-movie-compilation": {
      "title": "Película ilustrada alcanzada; pausas de compilación",
      "summary": "El ejecutable actualizado supera el árbol y la cinemática oscura hasta la película ilustrada. El control del personaje sigue sin confirmarse. La repetición del árbol mantiene 1,26 FPS; la reutilización tras lecturas no aporta una mejora adicional de FPS demostrada. Un fotograma posterior tarda 239,4 segundos, incluidos 234,9 creando pipelines de cómputo. El aumento de la caché de texturas coincide con el cambio de escena y no demuestra una aceleración. Persisten los problemas de iluminación, franjas y un recurso de pixel shader ausente.",
      "imageAlt": "Película ilustrada tras el árbol y la cinemática oscura; control del personaje sin confirmar"
    },
    "yotei-post-tree-texture-reuse": {
      "title": "Escena tras el árbol: compilación y recarga de texturas",
      "summary": "La compilación combinada llega a una cinemática muy oscura tras la configuración. Un fotograma en frío tarda 59,3 segundos, incluidos 35,4 en crear pipelines gráficos. Reducir las cachés para limitar la memoria provoca varios GiB de cargas de texturas por fotograma. Una prueba Vulkan independiente confirma que las lecturas de storage images ya no invalidan las texturas muestreadas. Los FPS durante el juego y el control del personaje siguen sin confirmarse; persisten las franjas y un recurso de pixel shader sin resolver.",
      "imageAlt": "Cinemática muy oscura tras el árbol; control del personaje sin confirmar"
    },
    "yotei-array-layer-coherence": {
      "title": "Capas coherentes: vuelven los detalles del árbol",
      "summary": "El seguimiento de superficies de color se limita a las capas seleccionadas para evitar que las vecinas invaliden su contenido en la GPU. Los arrays compatibles actualizan las capas modificadas en la GPU. El árbol registra 1,23 FPS durante 30 segundos, frente a 1,03 del control, con distintas fases de animación e historial de caché. La corteza vuelve a verse, pero persisten las rayas brillantes. La carga posterior alcanza el límite de memoria; no se ha confirmado el control del personaje.",
      "imageAlt": "Corteza y ramas visibles con rayas verticales brillantes"
    },
    "yotei-candidate-visual-check": {
      "title": "Prueba del candidato: persisten las estelas del árbol",
      "summary": "La tercera prueba mide 1,30 FPS en el árbol con otros límites de caché, pero muestra más estelas. Restaurar el límite de destinos de renderizado no lo corrige visiblemente. El usuario cierra la prueba durante la preparación de la escena; no se confirma el juego tras la cinemática. No es una mejora de FPS verificada; el ejecutable instalado sigue siendo el de referencia hasta una comparación visual controlada.",
      "imageAlt": "Prueba del candidato: persisten las estelas del árbol"
    },
    "yotei-post-tree-dynamic-state": {
      "title": "Mediciones del árbol y reutilización de pipelines gráficos",
      "summary": "Antes del cambio, las mediciones del árbol dan 0,83–0,97 FPS. Dos intentos de continuar se detienen deliberadamente cerca del límite de memoria comprometida de Windows. El sesgo de profundidad y las referencias stencil dinámicos eliminan 61 variantes redundantes de una captura de 1.007 pipelines; las pruebas de GPU pasan. No demuestra una mejora de FPS durante el juego y las franjas luminosas persisten.",
      "imageAlt": "Árbol en la selección de dificultad con franjas verticales luminosas aún visibles"
    },
    "little-nightmares-saves-performance": {
      "title": "Guardado y carga verificados; 3,73–4,46 FPS en juego",
      "summary": "Las escrituras y el cambio de tamaño de archivos conservan datos reales; continuar tras reiniciar carga la primera habitación. Los cambios de HTILE, las lecturas de GPU agrupadas y cuatro hilos de copia dan 4,46 FPS junto a la maleta y 3,73 FPS tras moverse en muestras de 30 segundos. El ejecutable instalado coincide con el medido. Siguen pendientes los 5 FPS, los materiales correctos y un arranque fiable; el informe documenta shaders omitidos y fallos intermitentes de memoria.",
      "imageAlt": "Six junto a la maleta en la primera habitación; persisten iluminación oscura y materiales reflectantes incorrectos"
    },
    "little-nightmares-gameplay": {
      "title": "Se alcanza el juego: 2,16 FPS medidos",
      "summary": "Los anillos de cómputo nativos corrigen la detención repetible tras 510 fotogramas. La escritura diferida revela después un fallo MallocBinned3 al iniciar partida; una nueva prueba con escritura inmediata alcanza el control del personaje y 3540 fotogramas antes de detenerse voluntariamente. Dos muestras de 30 segundos dan 65 fotogramas cada una: 2,16 FPS combinados. El perfil activa la escritura inmediata. Persisten defectos gráficos y guardados vacíos.",
      "imageAlt": "Six con su mechero en la primera habitación; materiales e iluminación presentan defectos"
    },
    "little-nightmares-startup": {
      "title": "Título restaurado tras corregir el arranque y los descriptores",
      "summary": "Se corrigieron imports de Trinity e IPMI, eventos gráficos nativos y validación de dimensiones de dispatch. BITSET restaura el título y la configuración inicial. Dos arranques alcanzan el título; gameplay y estabilidad prolongada siguen sin verificarse. Una repetición finaliza tras esperar 120 segundos al hilo de renderizado durante la configuración inicial; la estabilidad no está confirmada.",
      "imageAlt": "Título de Little Nightmares Enhanced Edition e indicación Press X en PS5PCEM"
    },
    "subnautica-performance-repeat-2": {
      "title": "Segunda medición tras un nuevo inicio",
      "summary": "Nuevo proceso, mismo ejecutable y partida Survival: menú a 15,50 FPS; dos mediciones de 30 segundos sin pausa y con cámara fija a 12,70 y 8,50 FPS, 10,60 FPS combinados. Salida 1080p, Speed, cachés calientes. No hubo una parada de diez segundos en estos intervalos, pero persisten retrasos más cortos. El inicio anterior dio 9,52 FPS de media. Es variación entre pruebas, no una nueva optimización; no se alcanzan los 30 FPS.",
      "imageAlt": "Lugar nevado del accidente y HUD de supervivencia de Subnautica: Below Zero en la medición del 3 de octubre"
    },
    "subnautica-performance-repeat": {
      "title": "Nueva medición con el ejecutable actual",
      "summary": "Repetición del 3 de octubre, PPSA02457 v1.022.125: el ejecutable instalado restaura la partida Survival y muestra el lugar nevado del accidente y el HUD. Se mide la versión actual tras los cambios compartidos del renderizador para GTA III; esta prueba no añade correcciones nuevas. Menú principal: 14,67 FPS. Dos mediciones de 30 segundos, sin pausa y con cámara fija: 7,27 y 11,77 FPS; 9,52 FPS combinados. La primera incluye un bloqueo de 9,998 segundos. Salida 1080p, ajuste Speed, cachés calientes. La medición válida anterior fue de 7,93 FPS, pero no es una comparación controlada de mejora. No se alcanzan los 30 FPS.",
      "imageAlt": "Lugar nevado del accidente y HUD de supervivencia de Subnautica: Below Zero en la medición del 3 de octubre"
    },
    "gta3-renderer-performance": {
      "title": "Correcciones de colores, reflejos y preparación de recursos",
      "summary": "El ejecutable instalado actualizado llega a Give Me Liberty con control del personaje. Las muestras en la posición inicial dan 8.10–8.97 FPS en modo Performance, con Bloom y Motion Blur desactivados y Classic Lighting activado. Análisis escalares compartidos, copias de texturas dentro de la GPU y menores costes auxiliares acompañan las correcciones gráficas. El informe recoge ajustes, muestras más lentas y límites; no se ha demostrado jugabilidad completa.",
      "imageAlt": "Personaje y coche de GTA III en Callahan Bridge tras corregir colores y reflejos"
    },
    "gta3-ngg-gameplay": {
      "title": "Exportaciones NGG corregidas; primera misión y movimiento verificados",
      "summary": "El ejecutable instalado llega a Give Me Liberty con mundo, personaje, vehículo, HUD y minimapa visibles. W mueve al personaje y D cambia su dirección. La corrección general de NGG restaura las 32 capas de corrección de color. La muestra mide 0,97 FPS; persisten sobreexposición verde, recursos ausentes, cierres y bloqueos intermitentes.",
      "imageAlt": "Personaje de GTA III corriendo hacia un coche en Callahan Bridge, con HUD y fuerte sobreexposición verde"
    },
    "gta3-ampr-startup": {
      "title": "Importaciones AMPR resueltas; pantalla de condiciones alcanzada",
      "summary": "Versión de desarrollo del 2 de octubre, PPSA03527 v1.007: se resuelven 13 importaciones AMPR ausentes. Dos procesos nuevos llegan a la pantalla legible de condiciones tras pulsar Cross para avanzar desde una pantalla inicialmente vacía. La pantalla de condiciones muestra unos 30 FPS. No se ha medido el rendimiento durante el juego. No se han verificado la jugabilidad, las partidas guardadas ni el audio. Persisten diagnósticos de shaders y emulación incompleta de esperas y contadores.",
      "imageAlt": "Pantalla de condiciones de Rockstar en GTA III, renderizada por PS5PCEM"
    },
    "gta3-pkg-extraction": {
      "title": "Alineación NAPS corregida; paquete extraído por completo",
      "summary": "Se extraen los 48 archivos, incluidos eboot.bin, seis módulos y dos archivos PAK. Coinciden las sumas de los dos índices PAK y pasan las 21 pruebas. El arranque se comprobó por separado."
    },
    "subnautica-startup": {
      title: "Caída al arrancar por una cabecera de shader mal leída",
      summary:
        "Las primeras sesiones se detenían en seco en la misma dirección invitada. El lector de shaders de Unity había tomado cuatro bytes de datos de malla como una longitud de cadena con signo y escrito un terminador en memoria no mapeada. Corregir el comportamiento de los descriptores de archivo que había detrás llevó al título más allá del arranque.",
    },
    "subnautica-menu-missing": {
      title: "El menú faltaba porque la inicialización del audio se quedaba colgada",
      summary:
        "El fondo animado ya corría, pero no aparecía ningún menú: la corrutina de inicialización de la plataforma se había detenido dentro de FMOD, dejando para siempre vacíos los servicios que espera la pantalla de inicio. Fueron las últimas mediciones de la época 4K antes del paso a 1080p nativo.",
      imageAlt:
        "Pantalla de título de Subnautica: Below Zero sin su menú, renderizada por PS5PCEM",
    },
    "subnautica-native-1080p": {
      title: "Salida 1080p nativa y preparación de recursos más barata",
      summary:
        "La presentación pasó a 1920×1080 nativo, y la ruta gráfica compartida dejó de copiar estructuras de instrucciones decodificadas durante la preparación de recursos y la interpretación escalar. Play, Options y Credits son legibles; los artefactos de agua e iluminación siguen ahí.",
      imageAlt:
        "Menú de Subnautica: Below Zero en 1080p nativo, renderizado por PS5PCEM",
    },
    "subnautica-menu-performance": {
      title: "Una tanda de recortes de CPU en la ruta de dibujo compartida",
      summary:
        "Preparación de índices, búsqueda de pipelines, instantáneas de registros escalares, sondeo de colas e inicialización del espacio de trabajo se abarataron uno a uno, todo sin condición propia de ningún título. El menú se quedó en torno a 17 FPS, aún lejos del objetivo de 30 FPS.",
      imageAlt:
        "Menú de Subnautica: Below Zero desde la compilación de desarrollo medida, renderizado por PS5PCEM",
    },
    "subnautica-new-game": {
      "title": "Una partida nueva llega a la zona inicial",
      "summary": "Compilación de desarrollo del 1 de octubre, PPSA02457 v1.022.125: Supervivencia carga el mundo, reproduce la introducción y muestra la zona nevada del accidente con su HUD. Las correcciones evitan escrituras GPU obsoletas sobre memoria CPU, lecturas repetidas de búferes liberados y el borrado del color por pases de profundidad. Esta prueba no incluyó una partida completa, recuperación de guardados ni verificación del audio.",
      "imageAlt": "Zona inicial nevada de Subnautica: Below Zero con HUD de supervivencia, capturada en PS5PCEM"
    },
    "subnautica-lighting-baseline": {
      "title": "Prueba de iluminación: la carga sigue siendo inestable",
      "summary": "Tres pruebas adicionales de la compilación anterior fallaron durante la carga o la transición al mundo, después de dos pruebas que sí llegaron al juego. Un hilo puede detenerse mientras el audio continúa y la ventana queda negra. El registro anterior confirma además que un mip de 1×1 actualizaba erróneamente la textura base de 512×512. Estos fallos se registran por separado del ensayo exitoso; la carga estable aún no está confirmada."
    },
    "subnautica-colour-mips": {
      "title": "Mips de color corregidos en la GPU",
      "summary": "La búsqueda de texturas residentes distingue ahora los niveles mip y las capas. Las pirámides de color completas pueden ensamblarse en la GPU. Una prueba RG32F de seis niveles verifica los valores, una reescritura en el mismo fotograma y el muestreo sin lecturas adicionales hacia la CPU ni nuevas cargas de texturas; pasan 128 pruebas específicas. El juego sigue fallando al cargar, incluso en modo síncrono y con 8192 entradas de caché. La mejora de FPS en el mundo y el resultado final de iluminación siguen sin verificar."
    },
    "subnautica-windows-stack": {
      "title": "Límites de pila de Windows corrigen el cierre al iniciar",
      "summary": "Un ejemplo mínimo terminaba con 0x40010006 al emitir diagnósticos de Windows desde la pila HLE. El cambio de pila actualiza sus límites y las salidas del código invitado restauran el estado HLE. Pasan las salidas ANSI/Unicode, 8 pruebas de pila y 9 del puente nativo. La compilación instalada inicia sin depurador ni redirección de TEMP y restaura la partida. Sin pausa: 7.93 FPS durante 30.02 segundos. No es una comparación controlada; 30 FPS, gráficos completamente correctos y estabilidad prolongada siguen sin confirmarse.",
      "imageAlt": "Subnautica: Below Zero — Windows stack-boundary fix, 2026-10-02"
    },
    "subnautica-resource-scratch": {
      "title": "Menos coste de recursos; aviso stencil localizado",
      "summary": "Las grandes tablas de texturas indirectas ya no ocupan la pila de las llamadas normales. La recuperación de punteros comparte un estado de registros inmutable e inicializa solo el rango necesario del mapa de bits. Pasan 72 pruebas y las comprobaciones Vulkan específicas. Un proceso nuevo restaura la partida: 11.96 FPS durante 30.01 segundos sin pausa. El clima y el calentamiento impiden una comparación controlada; no se alcanzan 30 FPS. El aviso restante corresponde a una pasada stencil sin escritura de color. La corrección gráfica completa y la estabilidad prolongada siguen sin verificarse. Otra traza muestra mapeos repetidos de 4 MiB bajo el bloqueo de memoria. Reutilizar páginas físicas ya comprometidas y eliminar consultas nativas duplicadas reduce un 18 % la mediana de la microprueba de mapeo; no se demuestra una mejora en el juego.",
      "imageAlt": "Subnautica: Below Zero — resource preparation build, 2026-10-02"
    },
    "subnautica-descriptor-unmap": {
      "title": "Reutilización de descriptores y fallos unmap más seguros",
      "summary": "Se reutilizan los arrays de descriptores: la pila baja de 753.720 a 56 bytes sin cambiar el lote Vulkan. Otra prueba corrige fallos unmap que dejaban páginas nativas retiradas marcadas como legibles. Pasan 154 pruebas de renderizador/índice, 29 de memoria y 60 de envío, además de Vulkan con 4352 vistas de texturas. La primera carga nueva restaura la partida; una escena fija sin pausa registra 12,03 FPS durante 30,01 segundos. El clima y el calentamiento impiden una comparación controlada. Un recurso escalar sigue sin resolverse. No se han verificado 30 FPS, carga fiable ni una partida completa.",
      "imageAlt": "Subnautica: Below Zero — unpaused 12.03 FPS sample, 2026-10-02"
    },
    "subnautica-read-lease": {
      "title": "Menor pila de dibujo y lecturas de memoria protegidas",
      "summary": "El almacenamiento escalar reutilizable reduce la pila de dibujo de 447.424 a 32.640 bytes. Otro fallo al calcular hashes revela una carrera entre comprobar y leer: las copias y hashes de GPU ahora retienen el mapeo hasta terminar. Pasan la prueba de liberación concurrente, 34 pruebas de memoria/búferes/índice y 60 de envío. El primer intento restaura el mundo guardado con 8,63 FPS durante 30,01 segundos sin pausa. El clima y el calentamiento impiden compararlo directamente con los 10,00 FPS anteriores. Una fuente de datos de shader sigue sin resolverse; no se confirman 30 FPS ni estabilidad prolongada. Un nuevo intento con el mismo ejecutable vuelve a fallar al cargar en hash + 0xf0. La prueba de lectura protegida pasa, pero este fallo observado no está corregido; se investiga el código que lo llama.",
      "imageAlt": "Subnautica: Below Zero — guest read lease build, 2026-10-02"
    },
    "subnautica-overlap-world": {
      "title": "Segunda recuperación y medición del solapamiento de búferes",
      "summary": "Un proceso nuevo vuelve a restaurar el mismo mundo guardado tras corregir la propiedad de los búferes. Las consultas indexadas mantienen el orden de escritura y el límite de 4096 búferes. Una comparación ABBA en pausa obtiene 11,93–12,23 FPS con recorrido lineal y 12,30–12,43 con índice; la pequeña diferencia no demuestra una mejora general. Otra medición sin pausa y con cámara fija cuenta 300 imágenes en 30,01 segundos: 10,00 FPS con clima y escarcha variables. Pasan 154 pruebas de backend/índice y cinco verificaciones Vulkan. Siguen pendientes los 30 FPS, la estabilidad prolongada y la corrección completa de los gráficos.",
      "imageAlt": "Subnautica: Below Zero — unpaused world, 2026-10-02"
    },
    "subnautica-save-recovery": {
      "title": "El mundo guardado carga tras corregir la propiedad de los búferes",
      "summary": "Una copia de 6 MiB desde la GPU se superponía a un objeto corrupto durante la carga. El caché ahora sigue la vida de cada asignación y rechaza resultados antiguos cuando se reutiliza una dirección. La primera prueba restaura el mundo nevado y permite caminar; todavía no demuestra estabilidad prolongada. Pasan 29 pruebas de memoria, 60 de envío de comandos y cuatro pruebas Vulkan específicas. Ampliar solo el caché dio 9,93 → 9,10 FPS en la misma escena pausada; el límite predeterminado no cambia. Aún no se alcanzan 30 FPS.",
      "imageAlt": "Subnautica: Below Zero — recovered world, 2026-10-02"
    },
    "subnautica-save-metadata": {
      "title": "Escritura y metadatos de guardado corregidos; la carga aún falla",
      "summary": "Guardar normalmente escribe y confirma un archivo de 213.388 bytes y vuelve al juego. Un proceso nuevo reconoce la partida con fecha y duración correctas, sin aviso de daños. Las correcciones generales abarcan las escrituras POSIX y la estructura completa de parámetros; pasan 52 pruebas de guardado y archivos. Al restaurar el mundo todavía aparece corrupción de memoria. Una comprobación independiente de búferes de comandos liberados pasa 60 pruebas; su relación con el fallo de carga no está demostrada."
    },
    "subnautica-vector-walk": {
      "title": "Menos trabajo de análisis CPU; la escena sigue a 7 FPS",
      "summary": "El análisis CPU de recursos evita interpretar operaciones puramente vectoriales, manteniendo las comprobaciones de dependencias y las instrucciones GPU. Otra corrección invalida ambas palabras de las máscaras vectoriales escritas. Pasan 71 pruebas escalares y nueve pruebas GPU. Los recorridos aislados tardan un 15–36 % menos; la última muestra de 30 segundos registra 7,00 FPS, sin una mejora comparativa controlada. Las copias, la preparación de recursos y los envíos siguen siendo costosos. El teclado ahora respeta el foco. Siguen pendientes los fallos de carga, una vinculación sin resolver y los 30 FPS.",
      "imageAlt": "Subnautica: Below Zero — 1920×1080 gameplay, 2026-10-02"
    },
    "subnautica-srgb-spans": {
      "title": "Corregida la escritura sRGB; las comprobaciones mip reutilizan sus rangos",
      "summary": "El G-buffer y la salida final capturados solicitaban sRGB pero usaban adjuntos UNORM, lo que oscurecía los colores al leerlos como sRGB. El renderizador ahora codifica las escrituras de color y conserva los bytes codificados al presentar la imagen. Una prueba GPU verifica el muestreo, el alfa y la salida con validación Vulkan; pasan 129 pruebas específicas. Las comprobaciones mip reutilizan sus rangos de memoria calculados. El informe recoge las pruebas en el juego y las limitaciones pendientes. La nueva prueba llega a la zona nevada con materiales visiblemente más claros y registra 9,49 FPS durante 30,05 segundos (referencia: 9,13 FPS). Las diferencias de clima y efectos impiden confirmar una mejora; siguen pendientes los 30 FPS, una vinculación escalar sin resolver y los fallos intermitentes de carga.",
      "imageAlt": "Zona nevada e interfaz de supervivencia de Subnautica Below Zero tras corregir la escritura de color sRGB"
    },
    "subnautica-mip-coherence": {
      "title": "Memoria mip: eliminadas las transferencias repetidas",
      "summary": "La traza del juego mostró diez lecturas de niveles RG32F por fotograma (2730 KiB), seguidas de nuevas cargas. La validación distingue ahora una escritura GPU comprobada de una sustitución por la CPU. Pasan cuatro casos Vulkan con niveles lineales/empaquetados y seguimiento de memoria, junto con 129 pruebas específicas. En la nueva ejecución, las transferencias de los destinos de color del menú bajan a cero: los diez niveles permanecen en la GPU. Siguen pendientes la iluminación oscura, los fallos intermitentes de carga y los 30 FPS. La versión llega a la escena nevada: 260 fotogramas en 30,01 segundos sin moverse equivalen a 8,66 FPS. No se ha demostrado una mejora global de FPS.",
      "imageAlt": "Zona nevada del accidente y HUD de Subnautica: Below Zero tras corregir la coherencia mip; la iluminación sigue oscura"
    },

    "yotei-intro-video": {
      title: "El vídeo de intro se decodifica y se reproduce",
      summary:
        "Las unidades de acceso H.264 que el título entrega a la biblioteca de vídeo invitada se decodifican ahora en el anfitrión, se convierten desde NV12 con coeficientes BT.709 y se ritman a cerca de una imagen por intervalo de pantalla, para que un título que alimenta fotogramas tan rápido como se los acepten no se queme una película entera en segundos. El fotograma del motor detrás del vídeo seguía negro, así que fue solo una etapa de reproducción.",
      imageAlt:
        "Un fotograma de intro de Ghost of Yōtei, decodificado y presentado por PS5PCEM",
    },
    "yotei-bonus-notices": {
      title: "De la intro a los avisos de bonus y la calibración de brillo",
      summary:
        "La reproducción de la intro pasó a ser continua a unos 30 FPS nativos del flujo, y la sesión cruzó la carga por streaming de los recursos del menú hasta el indicador de carga, los avisos Digital Deluxe Bonus, Gift of the Northern Star y Pre-order Bonus, y la calibración de brillo: imagen del lobo, instrucciones, deslizador y glifo de confirmación todos legibles.",
      imageAlt:
        "Pantalla de calibración de brillo de Ghost of Yōtei con la imagen del lobo, renderizada por PS5PCEM",
    },
    "yotei-difficulty": {
      title: "La selección de dificultad se dibuja sobre una escena 3D cargada",
      summary:
        "La composición del menú llegó a la selección de dificultad dibujada sobre geometría 3D real, con árboles y partes del fondo visibles y la música del menú sonando. Hicieron falta varios minutos de intro y carga de escena, y los fotogramas llegaban a 0,6 FPS.",
      imageAlt:
        "Selección de dificultad de Ghost of Yōtei sobre una escena 3D cargada, renderizada por PS5PCEM",
    },
    "yotei-tree-scene": {
      title: "El audio de las películas funciona y aparecen escenas 3D tardías",
      summary:
        "Las películas de intro ganaron sonido, empezando a la par que la pista en vez de quedarse mudas, después de decodificar el ATRAC9 multicanal como flujos mono entrelazados en disposiciones de 2 a 36 canales. La sesión llegó a escenas 3D tardías, incluida la del árbol, a 0,73 FPS, y la secuencia de carga siguiente perdió el dispositivo Vulkan.",
      imageAlt: "Escena del árbol de Ghost of Yōtei, renderizada por PS5PCEM",
    },
    "yotei-command-writes": {
      title: "Las escrituras del procesador de comandos sobreviven a la relectura diferida",
      summary:
        "Una escritura explícita del procesador de comandos dentro de un búfer de almacenamiento en caché podía perderse cuando un resultado de GPU más antiguo se publicaba encima, porque la ruta de volcado solo comparaba la dirección base del búfer. Indexar los búferes que se solapan y publicar solo rangos de escritura probados corrigió la corrupción de cabecera resultante.",
      imageAlt:
        "Escena del árbol de Ghost of Yōtei tras las correcciones de escritura de comandos, renderizada por PS5PCEM",
    },
    "yotei-null-images": {
      title:
        "Texturas totalmente nulas tratadas como no enlazadas, y recuperación de descriptores más rápida",
      summary:
        "Las texturas que se demuestran enteramente a cero usan ahora semántica de imagen no enlazada en vez de hacer que se rechace el shader, y la recuperación escalar de descriptores reutiliza valores intermedios dentro de una llamada: un caso anidado bajó de 504 lecturas a 18 y corrió unas 4,6× más rápido en aislamiento. Aun así, dos comprobaciones del runner instalado se detuvieron esperando a la GPU antes de la escena del árbol y se cortaron a propósito tras el diagnóstico.",
      imageAlt:
        "Aviso Digital Deluxe Bonus de Ghost of Yōtei antes de la espera de GPU del 1 de octubre, renderizado por PS5PCEM",
    },

    "bhh-startup": {
      title: "Una espera infinita durante la carga, corregida",
      summary:
        "El título podía detenerse en su primer fotograma negro o a mitad de la carga de recursos mientras su proceso y sus hilos de audio seguían vivos: el hilo de carga esperaba indefinidamente después de que una lectura de archivo devolviera un error de entrada/salida. Tratar correctamente las lecturas de archivo vigiladas por la GPU levantó el bloqueo.",
      imageAlt:
        "Menú principal de Big Helmet Heroes tras la corrección del arranque, renderizado por PS5PCEM",
    },
    "bhh-menu": {
      title: "Un menú principal correcto, y a dónde se va el tiempo",
      summary:
        "Con el direccionamiento de texturas Gen5 de una muestra, los destinos de render en capas y el orden de canales de salida corregidos, el menú se dibuja bien con sus modelos de personajes, texturas e iluminación. El perfilado situó el coste en el backend gráfico del anfitrión — preparación de recursos, copias de memoria invitada a Vulkan y sincronización — y no en la compilación de pipelines.",
      imageAlt:
        "Menú principal de Big Helmet Heroes con modelos de personajes e iluminación, renderizado por PS5PCEM",
    },
    "bhh-copies": {
      title:
        "Copias de mosaico más anchas, desalojo más barato y vigilancia de páginas agrupada",
      summary:
        "El conversor de disposición copia ahora una tirada horizontal completa de 16 bytes siempre que su ecuación de dirección demuestra que esos bytes son contiguos, en vez de mover píxel a píxel. El desalojo de la caché de búferes dejó de recorrer las 4.096 entradas, las páginas invitadas vecinas se vigilan en grupos, y los búferes Vulkan terminados se reciclan.",
      imageAlt:
        "Escena de tutorial de Big Helmet Heroes tras las optimizaciones de copia, renderizada por PS5PCEM",
    },
    "bhh-scalar-history": {
      title: "Contabilidad escalar recortada, sin ganancia de fotogramas que mostrar",
      summary:
        "Los puntos de control de recursos dejaron de llevar historial de cargas escalares sin usar, y el análisis escalar completo evita recorridos redundantes en las visitas hacia delante. Los casos aislados se abarataron un 9–45%, pero las muestras de juego comparables quedaron prácticamente iguales — 157 ms en el menú frente a 154,5 ms en el control — y el informe lo dice sin rodeos.",
      imageAlt:
        "Tutorial de Big Helmet Heroes tras el cambio de contabilidad de cargas escalares, renderizado por PS5PCEM",
    },

    "quake-playable": {
      title: "Jugable y completable",
      summary:
        "El responsable confirmó una partida completa. El trabajo detrás abarcó importaciones de arranque y listados de directorios, escrituras diferidas al G-buffer, muestreadores de comparación de profundidad y las lecturas de búferes tipados de las que dependen los vértices de los modelos y los datos de iluminación. La geometría de PNJ ausente volvió.",
      imageAlt: "Pantalla de título de Quake II, renderizada por PS5PCEM",
    },
    "quake-rendering": {
      title: "Render revisado, con picos de 60–70 FPS",
      summary:
        "Una revisión como PPSA09477 v1.003 encontró la iluminación de los niveles, las texturas, las armas y los PNJ todos visibles, lo que cierra los informes anteriores de mundo oscuro y modelos ausentes. La reutilización de búferes y los borrados por GPU redujeron el coste de las transferencias; las escenas ligeras alcanzan picos de 60–70 FPS mientras los combates cargados siguen más lentos.",
      imageAlt:
        "Quake II, partida con un nivel iluminado, enemigos visibles y el arma del jugador, renderizada por PS5PCEM",
    },

    "tetris-first-render": {
      title: "El primer fotograma reconocible salido del grafo de arranque",
      summary:
        "595 llamadas de dibujo invitadas y 63 despachos de cómputo se completaron sin una sola llamada rechazada, produciendo el primer fotograma de partículas reconocible. Como el destino de salida 4K registrado seguía negro, la presentación recurrió a convertir un intermedio de 1920×1080: una etapa de render temprana, no un menú.",
      imageAlt:
        "El primer fotograma de partículas reconocible de Tetris Effect, renderizado por PS5PCEM",
    },
    "tetris-license-journey": {
      title: "Pantalla de licencia y selección de Journey, varias veces más rápidas",
      summary:
        "Una composición traducida sustituyó los reemplazos 4K especulativos, y publicar rellenos lineales de metadatos eliminó la interfaz duplicada y la costura vertical. La mediana de los fotogramas de licencia bajó de 235 ms a 159 ms, y los fotogramas muestreados de Journey de 1127–1276 ms a 318–396 ms. Elementos oscuros de la interfaz y un fallo del decodificador invitado siguen ahí.",
    },

    "rita-intro-menu": {
      title: "Intro de la distribuidora, menú de título y la escena de detrás",
      summary:
        "El título se asentó en un bucle estable de gráficos y audio a 1920×1080 y dibujó su secuencia animada de la distribuidora, el menú de título y la escena posterior al menú. Esa escena viene de un destino invitado real de 480×270 llevado por la cadena CRT y de posprocesado, lo que sustituyó el ruido a pantalla completa anterior.",
      imageAlt:
        "Intro de la distribuidora de Mighty Morphin Power Rangers: Rita's Rewind, renderizada por PS5PCEM",
    },
    "rita-playable": {
      title: "Jugable y completable",
      summary:
        "El responsable confirmó una partida completa el 24 de septiembre. La captura muestra al Ranger rojo en la fase de entrenamiento del Command Center con HUD, barra de vida, objetivos e indicaciones de botones, todos respondiendo al mando. La ruta de reserva de escalado CRT, muy ajustada, sigue siendo necesaria en el equipo de referencia.",
      imageAlt:
        "Rita's Rewind, partida con el Ranger rojo en el Command Center, renderizada por PS5PCEM",
    },

    "jets-tutorial": {
      title: "START GAME llega al tutorial en 4K",
      summary:
        "El contenido del título se resolvió, el registro de recursos AGC se completó, y el bucle completo de gráficos, cómputo y salida se sostuvo. START GAME pasó la pantalla de carga hasta un tutorial reconocible en 3840×2160, y una sesión sin supervisión siguió viva más allá de la presentación 300.",
      imageAlt:
        "Tutorial de Jets 'n' Guns 2, renderizado por PS5PCEM",
    },
    "jets-playable": {
      title: "Jugable y completable",
      summary:
        "El responsable confirmó una partida completa. Niveles, HUD, puntuación, enemigos y la escena en parallax se dibujan todos correctamente. El perfilado de un fotograma de 70 ms encontró 18 ms esperando a la GPU en 33 envíos, 11 ms en puntos de control de recursos y 13 ms preparando 894 búferes invitados.",
      imageAlt:
        "Jets 'n' Guns 2, partida con la nave del jugador, el HUD y la puntuación, renderizada por PS5PCEM",
    },
    "jets-audio": {
      title: "El audio deja de cortarse a sí mismo",
      summary:
        "Dos puertos de salida activos se disputaban el dispositivo de audio del anfitrión, desmontando la mezcla y reabriendo el dispositivo varias veces por fotograma. La versión 0.3.2 corrigió el enrutado; el estado previo de jugable y completable no se vio afectado.",
    },

    "cat-quest-render-fixes": {
      title:
        "Un mundo del revés, texto corrupto y colores cambiados, todos corregidos",
      summary:
        "El mundo se dibujaba del revés mientras la interfaz no; la cobertura de fragmentos y las pasadas de solo plantilla corrompían el texto de los menús; faltaba la interfaz AGC original para la correspondencia de interpolantes, así que el arte de aventura y los decorados usaban salidas de vértice a fragmento equivocadas; y los formatos de salida registrados se ignoraban, intercambiando rojo y azul. Los cuatro quedaron corregidos.",
      imageAlt:
        "Lista de idiomas de Cat Quest III con texto legible recortado dentro de su panel, renderizada por PS5PCEM",
    },
    "cat-quest-playable": {
      title: "Jugable y completable",
      summary:
        "El responsable confirmó una partida completa. En paralelo, el trabajo de traducción de shaders por fotograma muestreado bajó de unos 40 ms a 7 ms y las subidas de búferes de unos 125 MiB a 65–75 MiB, llevando la isla inicial de unos 148 ms a una mediana de 124 ms.",
      imageAlt:
        "Cat Quest III, partida en la isla con el HUD, montañas y mar azul, renderizada por PS5PCEM",
    },

    "precinct-title-menu": {
      title: "Las dos películas de intro, el menú de título y un primer fotograma de juego",
      summary:
        "El grafo invitado de seis imágenes se enlazó, los complementos de Unity arrancaron, y las dos películas de intro se reprodujeron en 4K sincronizado con sonido estéreo antes de que aparecieran el arte del título y una confirmación NEW GAME legible. Una sesión anterior protegida llegó al aviso de Cruz y produjo la primera imagen de juego verificada en el motor.",
      imageAlt:
        "The Precinct, menú de título con la confirmación NEW GAME, renderizado por PS5PCEM",
    },
    "sarah-playable": {
      title: "Jugable y completable en el límite de fotogramas",
      summary:
        "Partida completa confirmada, con el menú de título y la primera escena manteniendo el límite de 60 FPS: 5.280 presentaciones en 90 segundos. La carga exigió primero restaurar eboot.bin y sce_module/libc.prx desde las copias que dejó el parcheador de eboot de la propia copia tras truncar ambos.",
      imageAlt:
        "Dreaming Sarah, escena de bosque con un PNJ, renderizada por PS5PCEM",
    },
    "terminator-playable": {
      title: "Jugable y completable",
      summary:
        "Terminado sin problemas reportados. Fondos, personajes, HUD, texturas y colores son todos correctos, y los fotogramas de arranque en caliente miden 22–65 ms. El alfa de las texturas, el orden de canales y el muestreo sRGB conservan el balance de color previsto.",
      imageAlt:
        "Terminator 2D, partida con el personaje, el HUD y una escena desértica, renderizada por PS5PCEM",
    },
    "asterix-playable": {
      title: "Jugable y completable",
      summary:
        "Partida completa confirmada a 28–31 ms por fotograma, con una sesión de desarrollo de 3.000 presentaciones sin envíos rechazados. La composición a pantalla completa se queda residente en la GPU, y la salida conserva la orientación de la ventana invitada sin pasar por la memoria del anfitrión.",
      imageAlt:
        "Asterix & Obelix: Slap Them All!, partida con el HUD y un cartel GO, renderizada por PS5PCEM",
    },
    "jurassic-playable": {
      title: "Jugable y completable",
      summary:
        "Partida completa confirmada. El render de arranque quedó restaurado junto con el logotipo del título, la petición de confirmación, las carátulas de la colección y la vista previa animada. Recorrer las vistas previas puede seguir agotando un grupo de descriptores multimedia, tras lo cual las vistas posteriores se congelan.",
      imageAlt:
        "Pantalla de selección de Jurassic Park Classic Games Collection con carátulas, renderizada por PS5PCEM",
    },
    "reanimal-title-menu": {
      title: "Un menú de título animado en 4K, sin sus etiquetas",
      summary:
        "Los módulos nativos y de firmware se resolvieron, la secuencia del logotipo de la compañía se reprodujo, y el menú de título animado en 3840×2160 se sostuvo con su fondo de boya, logotipo, reflejos del agua y aviso SELECT visibles. Las etiquetas centrales siguen siendo solo pequeñas marcas rojas, así que la navegación nunca se verificó.",
      imageAlt:
        "Menú de título animado de REANIMAL con etiquetas incompletas, renderizado por PS5PCEM",
    },
    "propagation-bootstrap": {
      title: "Arranque de Unreal hasta el primer envío",
      summary:
        "El paquete de 8,8 GiB se montó, el arranque de ICU y de la configuración se completó, el archivo global de shaders precompilado se abrió, se crearon los shaders AGC, y el primer búfer de comandos se envió. La sesión es anterior a los constructores de paquetes de sincronización actuales y hay que repetirla.",
    },
    "pistol-whip-modules": {
      title: "Los módulos VR se cargan, los archivos de Unity empiezan a cargar",
      summary:
        "El complemento nativo de PS VR2 y el módulo Burst se cargaron ambos, y el título empezó a cargar sus archivos de datos de Unity. Avanzar más espera soporte de gafas, seguimiento y OpenXR en el anfitrión, que el proyecto ha aplazado a propósito.",
    },
  },
};

export default es;
