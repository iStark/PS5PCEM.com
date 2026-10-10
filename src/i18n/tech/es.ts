import type { TechCopy } from "./en";

const tech: TechCopy = {
  hle: {
    title: "HLE, emulación de firmware de alto nivel",
    summary:
      "HLE es la forma en que PS5PCEM responde a las llamadas de firmware que importa un título. Cada NID numérico se convierte en una función de Zig sobre una pila del anfitrión, y en Windows se conserva la convención de llamada System V del invitado.",
    sections: [
      {
        heading: "Por qué el firmware no está en el juego",
        paragraphs: [
          "Un título de PlayStation 5 no lleva consigo el sistema operativo al que llama. Sus importaciones son identificadores de 11 caracteres. PS5PCEM calcula cada identificador a partir del nombre de la exportación: SHA-1 del nombre más una sal fija, y después los primeros ocho bytes del resumen en una variante de base64. Una implementación se registra con el nombre legible y puede exigir el identificador que ese nombre debe producir, de modo que una exportación mal escrita falla cuando se construye el módulo.",
          "El enlazador dinámico busca el identificador junto con la biblioteca, el módulo y sus versiones. El mismo identificador puede existir en más de una biblioteca. Existe una búsqueda solo por identificador para las importaciones que no traen metadatos útiles, y esa alternativa se trata como último recurso porque es ambigua.",
        ],
      },
      {
        heading: "La llamada se ejecuta en una pila del anfitrión",
        paragraphs: [
          "El invitado llama al firmware de forma directa, así que la llamada empieza en la pila del hilo invitado, a menudo de un megabyte porque eso es lo que pidió el título. El trabajo del anfitrión, como abrir un archivo, necesita un marco mucho mayor. El compilador reserva ese marco al entrar, antes de cualquier retorno anticipado. Un cuerpo de firmware puede, por tanto, salirse de la pila del invitado antes de llegar a la línea que necesitaba el espacio, y el fallo queda fuera de todo mapeo del invitado.",
          "Cada llamada HLE cambia a una pila del anfitrión por hilo mientras dura el trabajo del anfitrión. Los argumentos viajan por memoria, de modo que un único stub de ensamblador sirve para todas las firmas, incluidos los retornos en coma flotante y de agregados. Las llamadas de firmware anidadas permanecen en la pila que ya estableció la llamada exterior. En Windows el invitado usa la convención System V AMD64 y el anfitrión usa Microsoft x64, así que toda función invocable por el invitado se declara con la convención del invitado. Omitir esa declaración sigue compilando, y entonces lee los argumentos de los registros equivocados.",
        ],
      },
      {
        heading: "Qué cubre la superficie HLE",
        paragraphs: [
          "Encima de esa maquinaria, las bibliotecas de firmware ofrecen memoria directa y flexible, handles de módulo, pthreads, sincronización, archivos, savedata, fibras, fuentes, PNG, el reloj, los pads, AudioOut, AJM, NGS2, ACM, AvPlayer, APR y AMPR. La red, SSL y la NP Web API conservan el ciclo de vida de sus contextos y solicitudes, y devuelven errores deterministas sin conexión. Los diálogos que necesitan un shell del sistema terminan de inmediato con un resultado coherente sin interfaz.",
          "La ejecución de validación del 10 de octubre superó la suite HLE completa de ReleaseSafe, 606 de 606 pruebas. Ese recuento es la suite de firmware. Por sí solo no registra una tasa de fotogramas nueva ni una partida completada nueva.",
        ],
      },
    ],
    works: [
      "Cálculo de NID, un registro de símbolos con versión y un cambio a la pila del anfitrión en cada llamada de firmware.",
      "Llamadas System V del invitado en Windows, donde la convención del anfitrión es Microsoft x64.",
      "Memoria, archivos, hilos, savedata, medios, códecs de audio y la ruta de comandos de APR/AMPR.",
      "Diálogos sin interfaz y un perfil de red sin conexión que no abre sockets del anfitrión.",
    ],
    gaps: [
      "Las bibliotecas que el título importa y que PS5PCEM no ha implementado siguen haciendo fallar la importación.",
      "La carga realmente bajo demanda de un módulo que no estaba en el grafo publicado devuelve un error.",
      "Los servicios de plataforma que necesitan un shell, una cuenta o un par de red reales siguen sin estar disponibles.",
    ],
  },

  ampr: {
    title: "Contadores AMPR",
    summary:
      "AMPR en PS5PCEM es un modelo en software, local al proceso, de los comandos de contador y de finalización de la consola. Ciento veintiocho contadores aceptan stores, actualizaciones atómicas de campo, lecturas emparejadas y esperas enmascaradas, en el orden de envío.",
    sections: [
      {
        heading: "Para qué usa AMPR un título",
        paragraphs: [
          "En la consola, AMPR es el motor asíncrono que mueve datos de archivo y actualiza contadores en los que pueden esperar la CPU y la GPU. Los juegos lo usan para saber que una lectura ya llegó, o que puede empezar un pase posterior, sin espera activa sobre una variable compartida. PS5PCEM no emula el bloque de hardware de AMPR. Ejecuta el flujo de comandos que construyó el título, dentro del proceso, e informa de la finalización a través de la cola de eventos AMPR que registró el título.",
          "El banco de contadores contiene 128 palabras de 32 bits. Un par es un contador par más la palabra siguiente, leídos y escritos como un único valor de 64 bits. Un único bloqueo cubre ambas mitades y cada lectura-modificación-escritura, de modo que un lector no puede observar un par rasgado. El acceso puede nombrar el par completo, la palabra de 32 bits, cualquiera de las mitades de 16 bits o uno de los cuatro bytes.",
        ],
      },
      {
        heading: "Stores, esperas y marcas de tiempo",
        paragraphs: [
          "Una escritura es un store, un OR bit a bit, un AND con el complemento, un XOR o una suma con envoltura, aplicada al campo seleccionado. Una espera compara ese campo con una referencia bajo una máscara. Las comparaciones son igual, mayor, menor, distinto, un valor de secuencia alcanzado y las formas con signo de mayor y menor. Las comparaciones de secuencia desplazan el bit de signo del campo al bit 63, de modo que la misma regla funciona a 8, 16, 32 y 64 bits.",
          "Una espera que ya está satisfecha se completa en el sitio. Una espera que no lo está conserva la instantánea del envío y se reanuda antes de las escrituras y los eventos posteriores de ese flujo, incluso cuando un envío posterior en el mismo hilo invitado aporta el valor. La API ordinaria y la API _04_00 tienen listas de argumentos distintas. Las marcas de tiempo se registran con los comandos de contador. Las consultas de tamaño de finalización que los títulos importaban están registradas, así que esas llamadas se resuelven.",
        ],
      },
      {
        heading: "Qué se ha observado que hace esta ruta",
        paragraphs: [
          "Veintidós pruebas AMPR enfocadas pasan en ReleaseSafe, incluidas llamadas a través de la superficie de exportación real. El arranque de Grand Theft Auto III realiza más de 10,000 envíos de lectura de archivo de APR y escribe más de 350 eventos de finalización de AMPR, sin un error AMPR coincidente en esa ruta. Ese arranque no llama por sí mismo a la API de contadores. El trabajo de los contadores lo cubren las pruebas y los títulos que sí esperan los valores.",
          "Esto es cobertura de API para los comandos que ejecuta el emulador. No es un modelo a nivel de ciclo del controlador de memoria de la consola, y no afirma la temporización del hardware.",
        ],
      },
    ],
    works: [
      "Ciento veintiocho contadores, con pares coherentes de 64 bits y campos de byte, media palabra y palabra.",
      "Store, OR, AND con complemento, XOR y suma con envoltura, más esperas enmascaradas y con signo.",
      "Esperas bloqueadas que conservan su lugar en el flujo de comandos y se reanudan cuando llega el valor.",
      "Finalización ordenada entregada a través de la cola de eventos AMPR registrada.",
    ],
    gaps: [
      "WaitOnAddress sigue siendo un marcador de posición.",
      "La temporización de hardware del bloque AMPR real no se reproduce.",
      "Un comando de contador que el decodificador no reconoce no se trata en silencio como éxito.",
    ],
  },

  apr: {
    title: "Identificadores y lecturas de archivo de APR",
    summary:
      "APR resuelve un archivo del título una vez y después lleva un identificador local al proceso en los búferes de comandos posteriores. Las lecturas diferidas de AMPR reabren ese mismo archivo de solo lectura de /app0 sin conservar un descriptor del anfitrión para siempre.",
    sections: [
      {
        heading: "Identificadores en lugar de rutas",
        paragraphs: [
          "La API del acelerador no quiere una ruta en cada comando. El título resuelve una ruta, recibe un identificador de archivo compacto y pone ese identificador en los comandos de lectura que envía después. PS5PCEM guarda la ruta y el tamaño del archivo junto al identificador. La tabla es local al proceso. Las rutas del anfitrión no se devuelven al invitado.",
          "Los archivos provienen del montaje de solo lectura /app0 del título. Una entrada resuelta puede reabrirse cuando se ejecuta una lectura diferida, así que el emulador no tiene que retener cada descriptor durante toda la vida del proceso. La tabla en caché admite hasta 64 archivos.",
        ],
      },
      {
        heading: "Búferes de comandos",
        paragraphs: [
          "Un envío es un búfer de comandos del invitado, no una sola llamada de lectura. PS5PCEM acepta hasta 32 búferes de comandos vivos. Cada búfer está acotado: 32 lecturas, 32 escrituras, 32 mapas, 32 registros de finalización y 128 operaciones. Pueden estar en vuelo hasta 64 envíos, y un pool automático contiene ocho búferes. Una lectura nombra el identificador de archivo, un destino del invitado, un tamaño y un desplazamiento en el archivo, y puede nombrar una dirección que recibe el número de bytes.",
          "El lector rechaza un identificador desconocido, un archivo ausente, un búfer de comandos corto o no alineado, y una petición que se saldría del archivo o del destino. Una lectura individual tiene un tope de 4 GiB, que es el límite de la interfaz, no una promesa de que un título emita lecturas tan grandes. Los comandos de mapa usan el tamaño de página AMM de 16 KiB que espera el invitado.",
        ],
      },
      {
        heading: "Cómo se encuentran APR y AMPR",
        paragraphs: [
          "APR posee la tabla de archivos y el ciclo de vida del búfer de comandos. AMPR posee los contadores, las esperas y los eventos de finalización que dicen al título que el trabajo terminó. Un título puede encolar muchas lecturas de archivo y después esperar un contador que actualiza el comando de finalización. El primer arranque de Grand Theft Auto III es el caso grande observado: las lecturas pasan por esta ruta, y los eventos de finalización vuelven por la cola de AMPR.",
          "La E/S asíncrona del kernel, la otra API de archivos, es una página distinta. APR es el flujo de comandos del acelerador. La API de lotes del kernel es la lista de peticiones al estilo POSIX.",
        ],
      },
    ],
    works: [
      "Identificadores de archivo locales al proceso para rutas de solo lectura de /app0, con el tamaño conservado para lecturas posteriores.",
      "Búferes de comandos acotados para lecturas, escrituras, mapas y registros de finalización.",
      "Lecturas diferidas que reabren el mismo archivo del título.",
      "Rechazo comprobado de archivos desconocidos, desbordamientos y búferes mal formados.",
    ],
    gaps: [
      "La ruta es una ejecución en software del búfer de comandos, no el motor de DMA de la consola.",
      "Los archivos de paquete con escritura quedan fuera de /app0. Las partidas pasan por el montaje savedata.",
      "Un archivo que el resolutor no ha visto no puede inventarse a partir de un identificador desnudo.",
    ],
  },

  memory: {
    title: "Memoria directa, memoria flexible y pools",
    summary:
      "Las direcciones del invitado son direcciones reales del anfitrión. La memoria directa es un pool físico compartido y disperso mapeado en ese espacio, y MemoryPool añade reserva, confirmación y operaciones por lotes sobre el mismo respaldo.",
    sections: [
      {
        heading: "La dirección del invitado es la dirección del anfitrión",
        paragraphs: [
          "El código x86-64 del invitado se ejecuta de forma nativa y contiene direcciones absolutas, así que PS5PCEM no puede reubicar el proceso en una asignación arbitraria. El módulo de memoria reserva la disposición de la consola antes de cargar cualquier módulo. La ventana administrada por el sistema empieza en 0x40000 y llega hasta justo por debajo de 32 GiB. Después vienen las ventanas reservadas por el sistema y las de dispositivo. La ventana de usuario en Windows y Linux va de 0x10_0000_0000 a 0xFC_0000_0000, 944 GiB de espacio de direcciones. macOS empieza esa ventana más arriba y obtiene 560 GiB.",
          "Esos rangos son reservas, no RAM confirmada. Las páginas se confirman en unidades de 16 KiB cuando se crea un mapeo, y desmapear anula su confirmación mientras la reserva exterior permanece. Otra asignación del anfitrión no puede robar la dirección del invitado entre usos.",
        ],
      },
      {
        heading: "Memoria directa y flexible",
        paragraphs: [
          "La memoria directa es el nombre que da el invitado a la memoria de vídeo física. El título reserva un rango físico y después lo mapea. Los dos pasos están separados. El mapeo comprueba que todo el rango físico estaba reservado, traduce la protección de CPU y de GPU, y o bien confirma la dirección fija exacta o busca un hueco alineado. El mismo desplazamiento físico puede mapearse en varias direcciones virtuales, y esos alias son coherentes porque comparten un único objeto de respaldo disperso.",
          "Un mapa fijo sobre un rango que el título ya reservó se confirma dentro de la reserva. Liberar primero la reserva soltaría la reclamación del título sobre las piezas que todavía no ha mapeado. La memoria física se libera con la forma que pide el título, que puede ser un hueco en el medio o un tramo de varias reservas. La memoria flexible usa la misma tabla de espacio de direcciones, con un presupuesto predeterminado de la plataforma de 4 GiB, y busca en la ventana administrada por el sistema desde 0x02_0000_0000 antes de caer a la ventana de usuario.",
        ],
      },
      {
        heading: "MemoryPool y la confirmación en Windows",
        paragraphs: [
          "Las seis exportaciones MemoryPool de libkernel reservan una arena virtual, amplían la capacidad física, confirman y anulan la confirmación del respaldo compartido, ejecutan lotes ordenados e informan de estadísticas de bloque. Los bloques donados no pueden mapearse como memoria directa ordinaria ni liberarse mientras están confirmados. La confirmación, la anulación, la protección y los cambios de tipo por lotes funcionan. El MOVE por lotes sigue sin admitirse y devuelve un error en lugar de fingir que los bloques se movieron.",
          "En Windows, las vistas alineadas de memoria directa comparten vistas de sección de 64 KiB. Por eso las subidas temporales, las lecturas de vuelta y las páginas invitadas de 16 KiB no se convierten cada una en su propio cargo de confirmación que crece sin parar. Las consultas de una reserva usan el registro de consulta virtual de 72 bytes del invitado e informan de rangos semiabiertos con los bits de protección originales.",
        ],
      },
    ],
    works: [
      "Ventanas de direcciones fijas del invitado, confirmadas en páginas de 16 KiB y liberadas sin soltar la reserva.",
      "Alias coherentes de un mismo desplazamiento físico de memoria directa.",
      "Memoria flexible con el presupuesto predeterminado de 4 GiB y desmapeos fijos, sin sobrescritura y parciales.",
      "Reserva, ampliación, confirmación, anulación de confirmación, estadísticas y lotes ordenados de MemoryPool, excepto MOVE.",
    ],
    gaps: [
      "El MOVE por lotes de MemoryPool está explícitamente sin admitir.",
      "Liberar un rango que el título no posee sigue siendo un error.",
      "Las reservas son virtuales. Solo las páginas que mapea el título consumen confirmación del anfitrión.",
    ],
  },

  savedata: {
    title: "Partidas guardadas",
    summary:
      "Una ranura de partida montada se convierte en un /savedata0 con escritura. El título usa la API de archivos ordinaria, y el siguiente arranque encuentra los mismos archivos bajo el código de producto que publica el título.",
    sections: [
      {
        heading: "Dónde vive una partida",
        paragraphs: [
          "La instalación del juego es de solo lectura, puede estar en un medio extraíble y se sustituye por completo cuando se parchea. Una partida tiene que sobrevivir a las tres cosas. PS5PCEM guarda las ranuras en savedata/<titleId>/<slot>/ bajo el directorio de inicio del emulador, con clave según el código de producto que informa el título. Dos volcados del mismo juego comparten partidas. Dos juegos distintos, no.",
          "El nombre de la ranura viene del invitado y se sanea antes de convertirse en un directorio. Los separadores, los dos puntos de la unidad y los enlaces al directorio padre se vuelven guiones bajos. Eliminar esos caracteres permitiría que dos nombres distintos colapsaran en un solo directorio. Un nombre que no puede ser un directorio en absoluto cae a un nombre fijo, porque perder la partida es peor que colocarla en un sitio predecible.",
        ],
      },
      {
        heading: "Montaje y comprobaciones de existencia",
        paragraphs: [
          "Un montaje resuelve la ranura y apunta /savedata0 hacia ella. Crear una ranura ausente solo ocurre cuando el título pidió una. Una sonda de una partida que el título nunca escribió obtiene un resultado de ausencia, que es lo que el título espera. Todo lo que viene con el título sigue en solo lectura. El montaje de la partida es el lugar con escritura.",
          "La existencia se responde desde la ruta de metadatos, no abriendo el archivo. Un montaje que solo tenía éxito al abrir hacía fallar todas las comprobaciones de existencia, y Jets 'n' Guns 2 reescribía su perfil en cada arranque por eso. También se responde el listado de las ranuras que un título ha escrito. El montaje informa además de si abrió una partida existente o creó una nueva. La API de partidas en forma de bloque usa un blob distinto por título bajo sce_sdmemory, que se carga cuando el título lo reserva y se escribe cuando el título pide una sincronización.",
        ],
      },
      {
        heading: "Ranuras incompletas",
        paragraphs: [
          "El descubrimiento en el arranque oculta las ranuras interrumpidas que solo contienen metadatos de firmware o archivos de preparación vacíos. Cat Quest III tenía una ranura de ajustes reproducida que solo contenía path.txt. El título fallaba entonces por un Data.dat ausente y esperaba para siempre después de su fotograma de arranque. La búsqueda ahora se salta esa ranura incompleta y continúa.",
          "El lanzador agrupa cada ranura local por ID de título en la página de partidas, incluidas las partidas escritas por otro mosaico de la biblioteca. Una compilación de desarrollo bajo zig-out resuelve el directorio de inicio del emulador a la raíz del repositorio. Una compilación empaquetada usa su propio directorio. Por eso los arranques por línea de comandos y desde el lanzador del mismo paquete comparten una sola raíz de partidas.",
        ],
      },
    ],
    works: [
      "Montajes /savedata0 con escritura, con clave por ID de título y nombres de ranura saneados.",
      "Comprobaciones de existencia, listado de ranuras y un informe de si el montaje creó la partida.",
      "Un blob sce_sdmemory por título para la API de partidas en forma de bloque.",
      "Ocultación de las ranuras interrumpidas que no contienen una partida real.",
    ],
    gaps: [
      "Las partidas son directorios del anfitrión. El diálogo de datos de partida de la consola y la sincronización en la nube no se presentan.",
      "Una ranura que el título no pidió crear se informa como ausente.",
      "Los trofeos, las actividades y otros registros respaldados por la cuenta quedan fuera de este montaje.",
    ],
  },

  fonts: {
    title: "Renderizado de fuentes",
    summary:
      "libSceFont rasteriza caras TrueType y OpenType aportadas por el título con FreeType. Las peticiones de fuente del sistema usan el sustituto Noto Sans incluido para latino, griego y cirílico.",
    sections: [
      {
        heading: "Caras, escala y ciclo de vida",
        paragraphs: [
          "Un título abre una biblioteca de fuentes, crea una cara a partir de bytes que él aporta o de una petición de fuente del sistema, y después pide métricas de glifos y cobertura. Cada cara conserva su propia escala, escala de render, inclinación y ciclo de vida. Cerrar la biblioteca libera sus caras, y el cierre del proceso limpia el estado de las fuentes. Los bytes de la fuente se copian al abrir, de modo que un desmapeo posterior del búfer de origen del título no puede invalidar el rasterizador.",
          "Noto Sans es un sustituto, no una copia idéntica byte a byte de cada fuente del firmware. Cubre latino, griego y cirílico. Una cara que aporta el título puede contener otros glifos, incluido CJK, y esos contornos se usan. La petición de fuente del sistema en sí no sustituye una cara CJK.",
        ],
      },
      {
        heading: "Glifos, kerning y atlas",
        paragraphs: [
          "La ruta de glifos devuelve métricas reales, disposición horizontal, kerning básico de pares, cobertura con antialiasing, recorte y descriptores del resultado de render. Una caché de glifos acotada evita rasterizar otra vez el mismo carácter, y una caché de pares distinta reutiliza el kerning entre tamaños. Las escrituras comprueban los permisos de CPU e invalidan las vigilancias de página de la GPU antes de tocar un atlas de textura.",
          "Un escalar Unicode válido que la cara no contiene usa el contorno .notdef de la cara, incluidos los códigos de control que aparecen mientras un título construye un rango completo de atlas. Esa ruta de glifo ausente es lo que permite a Jurassic Park Classic Games Collection terminar de construir su atlas de fuentes. Los escalares Unicode no válidos y los identificadores de glifo explícitos fuera de rango siguen devolviendo un error. La cobertura se escribe en píxeles de uno a cuatro bytes.",
        ],
      },
      {
        heading: "Qué maquetación de texto queda en manos del título",
        paragraphs: [
          "Muchos títulos nunca llaman a libSceFont. Dibujan el texto con la fuente de su propio motor, y esta implementación no cambia esos píxeles. La ruta HLE es para los títulos que piden al firmware que rasterice.",
          "El shaping del texto, la disposición bidireccional, el peso sintético, la sustitución de fuente del sistema para CJK, la selección de caras de una colección y las API de nivel superior FontWriting y String no están implementados. Las comprobaciones enfocadas viven detrás de zig build test-hle con el filtro de fuentes.",
        ],
      },
    ],
    works: [
      "Rasterización con FreeType de caras TrueType y OpenType aportadas por el título.",
      "Sustituto Noto Sans para peticiones de fuente del sistema en latino, griego y cirílico.",
      "Métricas, disposición horizontal, kerning de pares, inclinación, recorte y una caché de glifos.",
      "Alternativa .notdef para escalares Unicode ausentes, que desbloquea el atlas de Jurassic Park.",
    ],
    gaps: [
      "El shaping, la disposición bidireccional y las API FontWriting están ausentes.",
      "Las peticiones de fuente del sistema no sustituyen una cara CJK.",
      "Los títulos que dibujan el texto por completo en su propio motor no usan esta ruta.",
    ],
  },

  png: {
    title: "Codificación y descodificación PNG",
    summary:
      "El codificador PNG escribe archivos RGB o RGBA de 8 bits a partir de píxeles RGBA o BGRA con pitch. El descodificador lee imágenes no entrelazadas en escala de grises, paleta, RGB y RGBA hacia un búfer del invitado comprobado.",
    sections: [
      {
        heading: "Codificación",
        paragraphs: [
          "Los títulos entregan al codificador un rectángulo de píxeles que puede tener un pitch de fila mayor que el ancho. PS5PCEM acepta RGBA y BGRA con pitch y escribe un PNG estándar RGB o RGBA de 8 bits. Quien llama elige los filtros de línea de barrido y un nivel de compresión de 0 a 9. Las escrituras de salida están acotadas por el búfer que proporcionó el título.",
          "El codificador es una implementación en software del formato de archivo. No llama a una biblioteca de imágenes del sistema, y no afirma una velocidad concreta frente al codificador de hardware de la consola.",
        ],
      },
      {
        heading: "Descodificación",
        paragraphs: [
          "libScePngDec analiza los metadatos PNG y descodifica imágenes no entrelazadas en escala de grises, paleta, RGB y RGBA hacia búferes RGBA o BGRA del invitado comprobados. Se aplican los filtros de línea de barrido y se respeta la transparencia de la paleta. El destino se comprueba antes de escribir píxeles.",
          "La entrada entrelazada Adam7 se reconoce y se rechaza en lugar de descodificarse en una imagen incorrecta. Por eso los iconos y las capturas entrelazados no se convierten en silencio en un búfer ilegible.",
        ],
      },
      {
        heading: "Dónde se sitúa",
        paragraphs: [
          "PNG es uno de los servicios pequeños de firmware que un título toca durante el arranque: iconos, atlas y miniaturas de partidas. Es independiente de la ruta de películas de AvPlayer, que usa FFmpeg para H.264, e independiente del rasterizador de fuentes.",
          "El informe de firmware del 9 de octubre agrupa el codificador con el reloj y las consultas de tamaño de finalización de AMPR. Esos tres cerraron huecos de importación. Por sí solos no cambian un tiempo de fotograma medido.",
        ],
      },
    ],
    works: [
      "Entrada RGBA y BGRA con pitch hacia PNG RGB o RGBA de 8 bits, en niveles de compresión 0–9.",
      "Descodificación de escala de grises, paleta, RGB y RGBA no entrelazados, incluidos filtros y alfa de paleta.",
      "Búferes de destino comprobados y salida del codificador acotada.",
    ],
    gaps: [
      "El PNG entrelazado Adam7 se reconoce y no se descodifica.",
      "Los de 16 bits y los chunks auxiliares exóticos quedan fuera del subconjunto implementado.",
      "No hay un bloque PNG de hardware. Ambos lados se ejecutan en la CPU.",
    ],
  },

  rtc: {
    title: "Reloj de tiempo real",
    summary:
      "RTC comprueba los campos de calendario, convierte FILETIME de Windows y hace aritmética comprobada sobre ticks. El invitado ve un reloj coherente sin la conversión de horario de verano del anfitrión.",
    sections: [
      {
        heading: "Qué hacen las llamadas",
        paragraphs: [
          "Los títulos piden al firmware la hora actual, una conversión entre recuentos de ticks y campos de calendario, y una aritmética que no debe dar la vuelta hasta una fecha sin sentido. PS5PCEM valida los campos de calendario, convierte hacia y desde FILETIME, y comprueba la aritmética de ticks para que un desbordamiento sea un error en lugar de un valor truncado.",
          "Las consultas UTC y locales devuelven valores coherentes del reloj del anfitrión. La conversión que aplicaría las reglas de horario de verano del anfitrión a una hora local del invitado no está implementada. Un título que solo necesita un sello monotónico o UTC sigue obteniendo una respuesta utilizable.",
        ],
      },
      {
        heading: "Por qué está separado del tiempo de audio",
        paragraphs: [
          "El ritmo del audio usa el dispositivo de audio del anfitrión y el reloj de su búfer. AvPlayer usa su propio reloj de medios. RTC es el reloj de pared que el título lee para partidas, temporizadores y la interfaz de calendario. Mezclar esos relojes es la forma en que un título parece colgarse o sellar una partida con una hora cero.",
          "El informe del 9 de octubre añadió la validación, la conversión FILETIME y la aritmética comprobada junto con el codificador PNG y tres exportaciones de tamaño de finalización de AMPR. La hora de red y un ajuste de reloj visible para el usuario no forman parte de esta superficie.",
        ],
      },
    ],
    works: [
      "Validación de campos de calendario y aritmética de ticks comprobada.",
      "Conversión FILETIME.",
      "Consultas UTC y locales coherentes a partir del reloj del anfitrión.",
    ],
    gaps: [
      "La conversión de horario de verano del anfitrión sobre la hora local del invitado está ausente.",
      "No hay una interfaz emulada de ajustes del sistema para el reloj.",
      "No se realiza sincronización de hora por red.",
    ],
  },

  fibers: {
    title: "Fibras e hilos de nivel de usuario",
    summary:
      "En Windows, cada fibra de libSceFiber es una fibra real de Windows, de modo que un cambio conserva los registros del invitado y la pila del invitado. Los hilos de nivel de usuario arrancan por la misma ruta pthread.",
    sections: [
      {
        heading: "Por qué una fibra no puede ser una operación nula",
        paragraphs: [
          "El código del invitado se ejecuta como código de máquina nativo. Un cambio de fibra tiene que reanudar los registros exactos y la pila exacta, con marcos del anfitrión y marcos del invitado mezclados en esa pila. Devolver éxito desde sceFiberSwitch sin cambiar dejaría que el título continuara en la pila equivocada y corrompería ambos lados.",
          "PS5PCEM respalda cada fibra invitada inicializada con una fibra de Windows. sceFiberRun, sceFiberSwitch y sceFiberReturnToThread usan ese mecanismo. El hilo que llamó a sceFiberRun es la fibra raíz. El registro público SceFiber de 128 bytes conserva las firmas de la ABI, el estado, el argumento de entrada, el nombre y el rango de contexto que aportó quien llama.",
        ],
      },
      {
        heading: "De quién es la pila",
        paragraphs: [
          "El título aporta un búfer de contexto, y ese búfer queda registrado en el objeto de la ABI. Windows posee la pila real. Usar el búfer del título como pila nativa de Windows se saltaría la página de guarda y la contabilidad de desenrollado que exige el sistema operativo. El contexto mínimo que espera el registro del firmware se sigue comprobando, junto con la alineación y las firmas de inicio y de fin.",
          "sceFiberGetSelf, la finalización, las comprobaciones de propiedad entre hilos y el reinicio en tiempo de ejecución están implementados. El backend existe en el objetivo de ejecución nativa Windows x86-64. Otros anfitriones pueden compilar el resto del emulador, y esta ruta de cambio no está disponible allí.",
        ],
      },
      {
        heading: "Hilos de nivel de usuario",
        paragraphs: [
          "La inicialización y la finalización de libSceUlt tienen éxito para que el sistema de trabajos de un título pueda arrancar. Los entornos de ejecución, las colas de espera, los pools de datos de cola, los mutex, los semáforos y las colas conservan estado del lado del anfitrión con clave según los objetos que asignó el título. Los propios elementos de trabajo arrancan por la ruta pthread existente. Las consultas de tamaño del área de trabajo devuelven los tamaños alineados que esperan esas creaciones.",
          "Las colas de eventos user-edge del kernel comparten la misma espera consciente de la secuencia que la sincronización pthread. El filtro -13 de VideoOut y el filtro -14 de gráficos viajan en esa cola y conservan el identificador y los datos de usuario de cada registro. ULT es código de unión para la planificación. No añade un segundo emulador de CPU.",
        ],
      },
    ],
    works: [
      "Fibras de Windows para sceFiberRun, sceFiberSwitch y sceFiberReturnToThread.",
      "Firmas de la ABI, comprobaciones de propiedad y una pila propiedad del anfitrión con página de guarda.",
      "Inicialización de ULT, colas, mutex, semáforos y elementos de trabajo respaldados por pthread.",
      "Colas de eventos user-edge compartidas con la finalización de VideoOut y de gráficos.",
    ],
    gaps: [
      "El cambio de fibra existe en Windows x86-64. Otros sistemas operativos anfitriones no ejecutan el código invitado de forma nativa.",
      "Una fibra no es un hilo de hardware con planificación preventiva.",
      "ULT no implementa un intérprete aparte para los cuerpos de los workers.",
    ],
  },

  aio: {
    title: "Lecturas de archivo asíncronas del kernel",
    summary:
      "La API AIO del kernel acepta un lote de lecturas y devuelve un identificador. PS5PCEM realiza el lote en el momento del envío, lo que la interfaz permite, y el título recoge un resultado ya terminado.",
    sections: [
      {
        heading: "La interfaz",
        paragraphs: [
          "Los motores que transmiten recursos envían una lista de lecturas y más tarde preguntan si el lote ha terminado. Un título construido así no puede cargar un archivo sin la API. PS5PCEM acepta el lote, ejecuta las lecturas cuando se envía y guarda los resultados bajo el identificador. Un sondeo posterior observa un lote que ya se ha completado.",
          "Completar de inmediato es un resultado permitido por la interfaz. Quienes llaman deben manejar una petición que terminó antes del sondeo. El emulador no duerme para imitar la latencia del dispositivo, y no informa del lote como fallido para parecer más asíncrono.",
        ],
      },
      {
        heading: "En qué se diferencia de APR",
        paragraphs: [
          "La AIO del kernel es el lote al estilo POSIX sobre descriptores de archivo que el título ya abrió. APR es la ruta del acelerador: las rutas se vuelven identificadores, y los comandos viven en un búfer de comandos de AMPR con contadores y eventos de finalización. Un título puede usar una, la otra o las dos.",
          "Ambas rutas leen la instalación del título como datos que el emulador no produjo. Los límites se comprueban. Un búfer corto o un descriptor incorrecto es un retorno de error, no una escritura parcial presentada como éxito.",
        ],
      },
    ],
    works: [
      "Envío por lotes, un identificador y una finalización que el título puede recoger.",
      "Lecturas realizadas contra los archivos que abrió el título.",
      "Finalización inmediata, que la API del invitado permite.",
    ],
    gaps: [
      "No hay un hilo de E/S aparte que imite la latencia del disco.",
      "El planificador de prioridad y de ancho de banda de la consola no está modelado.",
      "Los búferes de comandos de APR son otra API y no se reescriben como AIO del kernel.",
    ],
  },

  agc: {
    title: "AGC y el flujo de comandos PM4",
    summary:
      "Un título de PS5 construye paquetes de GPU en su propia memoria y envía el búfer. PS5PCEM descodifica ese flujo PM4, conserva el estado de los registros y ejecuta dibujos y despachos en orden.",
    sections: [
      {
        heading: "El flujo es la API de gráficos",
        paragraphs: [
          "El título no tiene que llamar a una función de dibujo de alto nivel por cada triángulo. Escribe paquetes: actualizaciones de registros, dibujos, despachos, fences y flips. Sea cual sea la capa que produjo el búfer, la GPU ve el mismo flujo. El decodificador nombra los paquetes cuyos opcodes tienen un significado documentado y deja los demás como números. Un nombre inventado en una traza sería peor que un opcode.",
          "La longitud del cuerpo del paquete se almacena con un sesgo de uno, de modo que un cuerpo vacío no puede codificarse. Cada paso comprueba sus límites. Un cuerpo que no cabe se informa. No se trunca, porque un cuerpo truncado desplazaría cada paquete siguiente y la traza mentiría.",
        ],
      },
      {
        heading: "Estado, esperas y búferes indirectos",
        paragraphs: [
          "El estado de los registros sobrevive entre envíos, incluidas las escrituras de cero. El ejecutor aplica listas directas de registros, listas indirectas nativas y heredadas, acquire y release, esperas de 32 y de 64 bits, escrituras, eventos y SetFlip. Una espera que no se cumple devuelve bloqueado y la palabra exacta desde la que reanudar. La memoria del invitado no se modifica para fabricar progreso.",
          "Los búferes indirectos se siguen de forma recursiva, tanto la forma ordinaria de 4 dwords como la forma condicional de 14 dwords. Los paquetes chain terminan al padre. El anidamiento se detiene en dieciséis marcos. Un hijo bloqueado devuelve una ruta fija desde la raíz hasta la hoja, de modo que reanudar no vuelve a ejecutar dibujos que ya ocurrieron. El planificador copia cada búfer de comandos raíz y los búferes indirectos a los que puede llegar, para que el título pueda reciclar la arena mientras una espera sigue bloqueada.",
        ],
      },
      {
        heading: "De los registros a un dibujo",
        paragraphs: [
          "En un dibujo o un despacho, la instantánea de registros se convierte en recursos tipados: descriptores de búfer y de sampler de 128 bits, descriptores de imagen de 256 bits, ocho destinos de color, profundidad y stencil, viewports, scissor, culling, mezcla, y los campos de swizzle y MSAA de PS5. Las escrituras ausentes de color-control y de clip-control heredan los valores predeterminados de AGC. Una desactivación explícita sigue siendo una desactivación. Dos workers de CPU preparan los comandos de gráficos y de cómputo. Un único propietario de Vulkan los envía para que la ejecución y la finalización sigan ordenadas.",
          "Los metadatos del shader aportan las tablas de recursos y los registros de user-data. La procedencia escalar recorre un prefijo acotado del shader, carga solo la memoria del invitado que el prefijo toca de verdad y se detiene ante una rama desconocida en lugar de inventar un descriptor. El resultado es lo que consumen el traductor y el backend de Vulkan.",
        ],
      },
    ],
    works: [
      "Descodificación PM4 con longitudes de cuerpo sesgadas y límites estrictos en cada paquete.",
      "Bancos de registros persistentes, esperas bloqueadas y búferes indirectos recursivos de hasta dieciséis marcos.",
      "Búferes tipados, imágenes, destinos de color, profundidad, viewport, mezcla y estado MSAA en el momento del dibujo.",
      "Dos workers de preparación y un propietario ordenado del envío a Vulkan.",
    ],
    gaps: [
      "Un opcode sin un significado documentado sigue sin nombre.",
      "Una espera bloqueada nunca se despeja escribiendo un valor de fence falso.",
      "Las capas, los metadatos y unas pocas operaciones de imagen siguen incompletos. Tienen sus propias páginas.",
    ],
  },

  rdna2: {
    title: "Shaders RDNA2 a SPIR-V",
    summary:
      "Los shaders de PlayStation 5 son código de máquina RDNA2. PS5PCEM descodifica las familias GFX10, construye un grafo de flujo de control y rebaja las operaciones admitidas a SPIR-V 1.5 para Vulkan.",
    sections: [
      {
        heading: "Descodificación",
        paragraphs: [
          "El frontend reconoce las codificaciones escalares SOP1, SOP2, SOPK, SOPC, SOPP y SMEM, las codificaciones vectoriales VOP1, VOP2, VOP3, VOP3P, VOPC y VINTRP, y MUBUF, MTBUF, FLAT, DS, MIMG y EXP. Se conservan los cuerpos arquitectónicos de una y de dos palabras, los literales opcionales y las palabras de dirección NSA de MIMG, de modo que un opcode posterior no admitido no desincroniza el flujo.",
          "Un opcode no reconocido dentro de una familia conocida se convierte en una instrucción no admitida que sigue llevando su familia, su opcode numérico, las palabras en crudo y un motivo. Las palabras de extensión SDWA y DPP conservan sus selectores, modificadores y máscaras de carril. El decodificador no renombra un opcode que no conoce.",
        ],
      },
      {
        heading: "Flujo de control y la IR tipada",
        paragraphs: [
          "Los destinos de salto directo parten el programa en bloques. Las fusiones hacia delante, las regiones anidadas y las aristas hacia atrás se registran por separado. El traductor activo puede emitir desde las instrucciones descodificadas. Asignar PS5_GPU_SHADER_IR=1 selecciona la IR tipada legalizada. Asignar PS5_GPU_SSA=1 añade estado phi y de def-use, plegado de constantes y eliminación iterativa de código muerto.",
          "Las selecciones acíclicas se convierten en fusiones estructuradas de SPIR-V con valores phi en las uniones. Los bucles naturales se convierten en fusiones de bucle. El flujo de control irreducible se convierte en un despachador por índice de bloque que conserva los predicados VCC y EXEC, de modo que un carril que debía saltarse una escritura sigue saltándosela. Las máscaras EXEC se reutilizan dentro de un bloque SPIR-V y se descartan en cada etiqueta, porque un valor de un lado de una rama no domina el otro lado.",
        ],
      },
      {
        heading: "Qué midió la suite del 9 de octubre",
        paragraphs: [
          "El punto de control de llamadas escalares del 9 de octubre superó 259 de 259 pruebas de análisis de GPU y 232 de 232 pruebas de Vulkan. La suite RDNA2 superó 271 de 281, con los mismos diez fallos ya existentes y una fuga informada. Esas sondas de instrucciones no establecen una tasa de fotogramas nueva para un juego.",
          "Las cargas de imagen de varios texels, los gathers horizontales, los fetch shaders de NGG y las llamadas escalares acotadas están implementados como rutas propias y se describen en sus propias páginas. Los stores y las combinaciones de descriptores que no estaban en el conjunto medido siguen sin admitirse.",
        ],
      },
    ],
    works: [
      "Descodificación de las familias escalar, vectorial, de memoria, de imagen y de exportación de GFX10, incluidos literales y palabras NSA.",
      "Selecciones estructuradas, bucles naturales y un despachador para el flujo irreducible que conserva las máscaras de carril.",
      "IR tipada y limpieza SSA opcionales, elegidas con variables de entorno.",
      "SPIR-V 1.5 para las operaciones admitidas de ALU, memoria, imagen, interpolación y exportación.",
    ],
    gaps: [
      "Siguen los diez fallos ya existentes de la suite RDNA2, más una fuga informada.",
      "Un opcode no admitido detiene esa rebaja. No se sustituye por una operación adivinada.",
      "Las pruebas de instrucciones no son un resultado de tasa de fotogramas.",
    ],
  },

  ngg: {
    title: "Shaders de vértice NGG",
    summary:
      "Los programas de vértice NGG fusionados, incluido un fetch shader que continúa con S_SETPC_B64, se traducen como una sola etapa de gráficos. El programa de exportación conserva su propia ventana de user-data.",
    sections: [
      {
        heading: "Fetch y export son programas distintos",
        paragraphs: [
          "Un dibujo de PlayStation 5 a menudo parte el trabajo de vértices en un fetch shader y un shader de exportación. El fetch shader termina su prólogo de atributos saltando al código de exportación con S_SETPC_B64. PS5PCEM trata esa continuación como parte del mismo programa de vértices y traduce el resultado fusionado.",
          "El programa de exportación NGG no toma prestado el banco de user-data del shader de geometría. Sus registros escalares se inicializan desde su propia instantánea de user-data, en s8 para el programa de exportación. Suponer que la tabla de recursos vive en s0:s1 es un fallo que el traductor evita a propósito. El puntero de la tabla viene del par user-SGPR de ShaderResourceTable que declararon los metadatos.",
        ],
      },
      {
        heading: "Atributos de vértice",
        paragraphs: [
          "El fetch shader y los user data extendidos se resuelven junto con las tablas incrustadas de búfer de vértices y de atributos de vértice. Hasta 32 semánticas de entrada conservan su índice semántico, el VGPR de hardware en el que aterrizan, el formato de atributo de AGC, el desplazamiento en bytes, la tasa de instancia y el descriptor de búfer de 128 bits.",
          "La búsqueda de atributos usa el byte semántico, no el byte de mapeo de hardware. Un par de tablas incompleto o un índice fuera del dominio admitido se rechaza antes de cualquier lectura del invitado. Las exportaciones PARAM de la etapa de vértices se convierten en las entradas de interpolación del fragmento, que es como un shader de píxeles posterior ve las variables interpoladas.",
        ],
      },
      {
        heading: "Llamadas a un fetch shader",
        paragraphs: [
          "Un fetch shader externo verificado también puede enlazarse desde S_SWAPPC_B64 o S_CALL_B64 cuando el par de user-data de la llamada sigue conteniendo la dirección que registró AGC. El cuerpo de fetch se descodifica a través de su S_SETPC_B64 de retorno, y ese retorno debe leer el par de enlace del llamador. Los detalles de qué llamadas son admisibles están en la página de llamadas escalares.",
          "La traducción NGG fusionada es lo que permite a las escenas tridimensionales superar un prólogo de fetch que antes detenía al decodificador. Por sí sola no aporta un shader de píxeles ausente ni un destino de render ausente.",
        ],
      },
    ],
    works: [
      "Programas de vértice NGG fusionados, incluidos prólogos de fetch que terminan en S_SETPC_B64.",
      "Una ventana de user-data distinta para el programa de exportación.",
      "Hasta 32 semánticas de vértice con formatos, desplazamientos, tasas de instancia y descriptores de búfer.",
      "Exportaciones PARAM conectadas a las entradas de interpolación del fragmento.",
    ],
    gaps: [
      "Un fetch shader cuyo retorno no coincide con el par de enlace del llamador no se enlaza.",
      "Las llamadas dinámicas generales siguen sin admitirse. Véanse las llamadas escalares.",
      "La geometría que depende de una exportación o un interpolante no admitidos sigue haciendo fallar ese dibujo.",
    ],
  },

  mimg: {
    title: "Cargas de imagen de varios texels",
    summary:
      "IMAGE_LOAD_BY2, BY4, PCK2 y PCK4, incluidas las formas con mip explícito, se ejecutan para los formatos 2D nativos medidos. Una carga BY devuelve texels consecutivos. Una carga PCK empaqueta sus bits en crudo en un registro.",
    sections: [
      {
        heading: "BY y PCK",
        paragraphs: [
          "Una carga BY escribe texels consecutivos en VGPR distintos, con los canales ordenados dentro de cada texel. Una carga PCK empaqueta los bits en crudo de los componentes en un VGPR de 32 bits, con el primer texel en los bits menos significativos. Los componentes con signo se truncan a su ancho de almacenamiento. Los componentes UNORM se reconstruyen con conversión de redondeo al par.",
          "El primer texel se alinea hacia abajo a un grupo de dos o cuatro en X. La prueba de límites usa la coordenada original, sin alinear: el grupo entero debe caber antes de la alineación, Y debe estar en rango y el mip pedido debe existir. Un grupo no válido pone a cero todos los registros de resultado y deja en paz los destinos que no le corresponden. Las coordenadas no válidas se sustituyen por operandos de fetch seguros antes de que Vulkan las vea.",
        ],
      },
      {
        heading: "Qué formatos",
        paragraphs: [
          "BY2 con DMASK 0x3 cubre R8 y R16 en UNORM, SNORM, UINT, SINT, y R16 FLOAT. BY2 con DMASK 0xF cubre RG8 UNORM, SNORM, UINT y SINT. BY4 con DMASK 0xF cubre R8 en esos cuatro tipos numéricos. PCK2 con DMASK 0x1 cubre R8, R16 y RG8 UNORM, UINT y SINT. PCK4 con DMASK 0x1 cubre R8 UNORM, UINT y SINT. Las variantes con mip explícito de esas cargas usan las mismas listas de formatos.",
          "El backend entrega a la traducción el formato nativo exacto. Bancos distintos de imagen muestreada UINT y SINT mantienen los resultados enteros bien tipados junto a los bancos de coma flotante y de comparación. Se conservan las coordenadas NSA, los registros solapados de dirección y de destino, y la máscara EXEC ordinaria.",
        ],
      },
      {
        heading: "Qué no es este cambio",
        paragraphs: [
          "El informe del 9 de octubre es soporte compartido de shader y de backend. No depende de un identificador de juego ni de un hash de shader. No se afirma ningún resultado de compatibilidad de un juego ni ningún cambio de tasa de fotogramas a partir de estas cargas solas.",
          "Los stores, y las combinaciones de formato o de descriptor que no estaban en el conjunto medido, siguen sin admitirse. Los gathers horizontales son la familia de instrucciones vecina y tienen su propia página.",
        ],
      },
    ],
    works: [
      "Cargas 2D medidas BY2, BY4, PCK2 y PCK4, con y sin un mip explícito.",
      "Alineación de grupo, límites comprobados y resultados a cero para un grupo no válido.",
      "Bancos distintos de imagen muestreada entera para que UINT y SINT sigan tipados.",
      "Máscaras EXEC, coordenadas NSA y pares de registros solapados conservados.",
    ],
    gaps: [
      "Los stores de imagen de estas formas no están implementados.",
      "Los formatos y los modos de descriptor fuera de la tabla medida se rechazan.",
      "Las pruebas no establecen una cifra nueva de fotogramas por segundo para ningún título.",
    ],
  },

  gather4h: {
    title: "Gathers horizontales",
    summary:
      "IMAGE_GATHER4H e IMAGE_GATHER4H_PCK reúnen un canal a lo largo de un grupo horizontal de texels. El subconjunto directo 1D y 2D medido está cubierto por 1,242 despachos de GPU.",
    sections: [
      {
        heading: "Qué devuelve la instrucción",
        paragraphs: [
          "Un gather vertical lee cuatro texels en Y. La forma H los lee en X. GATHER4H escribe el canal seleccionado de esos texels. GATHER4H_PCK escribe el flujo de texels en crudo empaquetado. El ancho del destino sigue a DMASK, y los registros que la instrucción no posee quedan sin cambios.",
          "Los bordes usan las reglas de direccionamiento del sampler. Un texel que cae fuera de la imagen se trata en lugar de leerse de una asignación vecina. La sonda del 9 de octubre ejecutó 1,242 despachos de GPU sobre el subconjunto directo 1D y 2D medido.",
        ],
      },
      {
        heading: "Qué queda fuera",
        paragraphs: [
          "A16, D16, R128, las tablas de recursos indirectas, las vistas de array, de cubo y MSAA, y los formatos comprimidos no forman parte del subconjunto medido. Esos modos de descriptor y de control siguen siendo limitaciones explícitas.",
          "El trabajo de gather comparte el traductor y la ruta de imagen de Vulkan con las cargas de varios texels. No cambia el direccionamiento del desentramado, y no afirma un resultado de tasa de fotogramas.",
        ],
      },
    ],
    works: [
      "IMAGE_GATHER4H e IMAGE_GATHER4H_PCK para los casos directos 1D y 2D medidos.",
      "Anchos de destino según DMASK y conservación de los registros que no corresponden.",
      "Tratamiento de los bordes según el sampler, comprobado con 1,242 despachos de GPU.",
    ],
    gaps: [
      "Array, cubo, MSAA, comprimidos y varios modos de descriptor no están en el subconjunto medido.",
      "A16, D16, R128 y las tablas indirectas siguen siendo limitaciones.",
      "No se infiere la tasa de fotogramas de ningún título a partir de la sonda.",
    ],
  },

  "scalar-calls": {
    title: "Llamadas escalares de shader",
    summary:
      "S_SWAPPC_B64 y S_CALL_B64 guardan una dirección de retorno completa y ejecutan una subrutina local acotada, incluido un llamado que queda después de ENDPGM. Un fetch shader de AGC verificado puede enlazarse del mismo modo.",
    sections: [
      {
        heading: "Llamada y retorno",
        paragraphs: [
          "El opcode SOP1 0x21 es S_SWAPPC_B64. El opcode SOPK 0x16 es S_CALL_B64, con el destino en PC + 4 + sign_extend(SIMM16) * 4, lo que incluye llamadas hacia atrás. Ambos escriben la dirección de la instrucción siguiente en el par SGPR de destino. Un S_SETPC_B64 coincidente vuelve allí. CALL deja SCC y EXEC intactos.",
          "Un SWAPPC cuyo destino es null sigue siendo la continuación S_SETPC_B64 ya existente. Los destinos SWAPPC locales pueden resolverse a partir de un GETPC más una suma o resta inmediata de ancho completo. El destino se captura aunque la instrucción también escriba el registro de enlace. Un llamado que vive después de ENDPGM se descodifica a través de su retorno coincidente, dentro de los límites de la asignación y de las instrucciones. Una continuación de hardware ordinaria sigue deteniéndose antes de los metadatos finales.",
        ],
      },
      {
        heading: "Cómo se rebaja la llamada",
        paragraphs: [
          "El grafo de flujo de control gana aristas explícitas de llamada y de retorno. El llamado comparte el estado de registros del llamador y usa el despachador SPIR-V acotado. Una llamada no admitida no puede caer en la ruta lineal de flujo de control. El descubrimiento de recursos del anfitrión sigue las llamadas y los retornos, de modo que un descriptor inicializado dentro del llamado sigue siendo visible.",
          "Cada llamada admitida posee un par SGPR distinto y alineado a par, desde s0:s1 hasta s104:s105, con exactamente un retorno coincidente. Los llamados son anidados o secuenciales en las formas que permite el comprobador. Los destinos dinámicos generales, en los que el destino es un valor arbitrario en tiempo de ejecución, siguen sin admitirse.",
        ],
      },
      {
        heading: "Fetch shaders y la sonda",
        paragraphs: [
          "Un fetch shader externo se enlaza cuando el par de user-data sin cambios de la llamada coincide con la dirección que registró AGC. El cuerpo de fetch se descodifica hasta su SETPC de retorno, y ese SETPC debe leer el par de enlace del llamador. La caché de análisis distingue un programa ordinario de un cuerpo de fetch, de modo que una inserción de fetch más antigua no puede sobrescribir el retorno de una subrutina local.",
          "Una sonda de GPU de 42 despachos comprueba 21,504 palabras. El informe del 9 de octubre no afirma un hito nuevo de un juego ni una tasa de fotogramas nueva a partir de las llamadas solas.",
        ],
      },
    ],
    works: [
      "S_SWAPPC_B64 y S_CALL_B64 con una dirección de retorno completa y un S_SETPC_B64 coincidente.",
      "Llamados anidados y llamados colocados después de ENDPGM, dentro de los límites ya existentes.",
      "Enlace de un fetch shader de AGC verificado cuyo retorno lee el enlace del llamador.",
      "Una sonda de 42 despachos que cubre 21,504 palabras.",
    ],
    gaps: [
      "Los destinos de llamada dinámicos generales no están admitidos.",
      "Una llamada necesita un par de enlace alineado a par y un retorno coincidente.",
      "La sonda no es un resultado de fotogramas por segundo.",
    ],
  },

  vulkan: {
    title: "Renderizador Vulkan",
    summary:
      "El backend de Vulkan carga el controlador en tiempo de ejecución, exige Vulkan 1.2 y presenta los fotogramas del invitado a través de un swapchain. Los destinos de render, las imágenes de almacenamiento y los pipelines permanecen residentes entre dibujos.",
    sections: [
      {
        heading: "Dispositivo y memoria",
        paragraphs: [
          "El renderizador carga él mismo el cargador Vulkan de la plataforma, así que la compilación no necesita las cabeceras del Vulkan SDK. La inicialización pide Vulkan 1.2, la versión que acepta el SPIR-V 1.5 del traductor, y prefiere un dispositivo discreto con una familia de colas que pueda hacer gráficos y cómputo. Las capas de validación se piden en las compilaciones de depuración cuando están instaladas.",
          "Un único layout de descriptores contiene 64 búferes de almacenamiento, arrays distintos de 64 entradas de imágenes muestreadas 2D y 3D, e imágenes de almacenamiento tipadas. Un anillo de 512 conjuntos, una arena de subida de 128 MiB y destinos de render persistentes del invitado mantienen en el dispositivo los recursos de un fotograma. Las traducciones de gráficos usan una caché de 256 MiB y 1,024 entradas. Una escena en streaming había superado el antiguo presupuesto de 64 MiB y volvía a traducir los mismos módulos en cada fotograma.",
        ],
      },
      {
        heading: "Pipelines y timelines",
        paragraphs: [
          "La compilación de pipelines usa dos workers de forma predeterminada. PS5_GPU_COMPILER_WORKERS puede fijar de uno a cuatro. PS5_GPU_ASYNC_PIPELINES=0 vuelve a la compilación síncrona y apaga el calentamiento de cómputo. El calentamiento reproduce en la caché del controlador, en el siguiente arranque, los módulos de cómputo ya compilados. Nunca los despacha, y destruye los pipelines temporales. La caché del controlador también se guarda en vulkan_pipeline_cache.bin, hasta 4 GiB. Un archivo corrupto se descarta. Solo puede afectar al tiempo de arranque.",
          "El perfil de compatibilidad predeterminado espera a cada lote enviado. El planificador timeline, elegido con PS5_GPU_TIMELINE_SCHEDULER=1, deja varios lotes en vuelo y espera en una lectura de vuelta real, un punto de sincronización del invitado o un anillo de recursos agotado. Un título, PPSA25872, activa por su cuenta ese planificador y la escritura de vuelta diferida de almacenamiento pequeño tras comparaciones medidas. El layout de imagen se sigue por aspecto, mip y capa de array, y las barreras salen del uso anterior de ese subrecurso.",
        ],
      },
      {
        heading: "Formatos y residencia",
        paragraphs: [
          "Se puede llegar a cincuenta y seis formatos del anfitrión, incluidos BC1 a BC7, canales enteros y normalizados, R16 y RG16, half-float y RGBA32_FLOAT. Las asignaciones de imagen del invitado comparten un registro de alias entre usos de color, profundidad, almacenamiento y muestreo. Un pase posterior puede muestrear un destino de profundidad que escribió un pase anterior, sin un viaje de ida y vuelta por la memoria del invitado, cuando las firmas coinciden. Las reinterpretaciones y los solapes parciales vuelven a pasar por la memoria del invitado.",
          "El desentramado de cómputo en la GPU cubre superficies Standard y PRT de 2D y 3D de 4, 8 y 16 bytes. El desentramado de RB+ y de MSAA sigue ejecutándose en la CPU. Los destinos UNORM empaquetados 11/11/10 de una sola muestra se mezclan mediante una copia a búfer de almacenamiento y un desempaquetado, una mezcla y un reempaquetado en el fragmento. VideoOut es el swapchain encima de estas imágenes.",
        ],
      },
    ],
    works: [
      "Selección en tiempo de ejecución de un dispositivo Vulkan 1.2, un swapchain y destinos de render residentes.",
      "Cincuenta y seis formatos del anfitrión, seguimiento de layout por subrecurso y un registro de alias de imagen.",
      "Dos workers de compilación, una caché persistente del controlador y un calentamiento de cómputo opcional.",
      "Un planificador timeline de activación explícita, con un título que lo activa de forma predeterminada.",
    ],
    gaps: [
      "El perfil predeterminado sigue esperando a cada lote. El envío timeline es de activación explícita.",
      "El desentramado de RB+ y de MSAA usa la CPU.",
      "La iluminación de los juegos y cada ruta de metadatos comprimidos no se deducen de la lista de formatos.",
    ],
  },

  msaa: {
    title: "MSAA",
    summary:
      "Los recuentos de muestras de color y de profundidad coincidentes de 2×, 4× y 8× permanecen en la imagen del anfitrión hasta una resolución posterior. Asterix usa esa ruta para la profundidad y el stencil MSAA, lo que eliminó una lectura de vuelta accidental y grande.",
    sections: [
      {
        heading: "Recuentos de muestras en la imagen del anfitrión",
        paragraphs: [
          "Un destino de render de PlayStation 5 puede almacenarse con dos, cuatro u ocho muestras. PS5PCEM mantiene un destino de color y un destino de profundidad en la imagen de Vulkan cuando sus recuentos de muestras coinciden, y resuelve más tarde. El recuento de muestras del invitado forma parte de la instantánea del recurso, junto al modo de swizzle y los punteros de metadatos.",
          "Las ecuaciones de dirección RB+ de Oberon, 16-pipe y 8-packer, incluyen la slice del array y los bits de muestra de 2×, 4× y 8× tanto para color como para profundidad. El desentramado de cómputo en la GPU todavía no consume esas ecuaciones. Las superficies RB+ y MSAA caen al desentramado en CPU. Las muestras siguen siendo correctas. Esa alternativa es un coste, y por eso MSAA no se describe como totalmente residente en la GPU.",
        ],
      },
      {
        heading: "Profundidad y stencil en Asterix",
        paragraphs: [
          "Asterix & Obelix: Slap Them All! dibuja el bosque inicial con profundidad y stencil MSAA. Un pase solo de profundidad que ignoraba el recuento de muestras leía el attachment de vuelta como diagnóstico. Los attachments coincidentes de profundidad y stencil MSAA permanecen en la ruta de profundidad persistente, y se aplican la comparación y la actualización de stencil que pidió el invitado.",
          "Los attachments de color MSAA ya no piden uso de imagen de almacenamiento en este backend. En la RTX 3070 Ti con salida 1080p, una muestra inmóvil de 30 segundos del contador de interfaz de ese bosque inicial subió de una mediana de 46.45 FPS a 162.20 FPS. La cifra es esa vista. No es un mínimo a lo largo de niveles posteriores. El movimiento, el salto y el primer encuentro con los romanos se volvieron a comprobar en la compilación de desarrollo.",
        ],
      },
      {
        heading: "Qué no incluye la resolución",
        paragraphs: [
          "Está implementada una resolución posterior de un recuento de muestras coincidente. Una superficie FMASK comprimida ligada a CMASK es otro mecanismo y queda fuera de esta ruta. Una importación MSAA no admitida conserva la limpieza segura de primer uso en lugar de muestrear datos comprimidos sin inicializar.",
          "Las 233 pruebas de Vulkan y las sondas nativas de profundidad y stencil de 2× y 4× pasaron con la corrección de Asterix. El runner firmado la incluye. El cambio es más reciente que las notas de la versión 0.3.4.",
        ],
      },
    ],
    works: [
      "Imágenes del anfitrión para recuentos de muestras de color y de profundidad coincidentes de 2×, 4× y 8×, con una resolución posterior.",
      "Attachments de profundidad y stencil MSAA, incluida la comparación y la actualización de stencil.",
      "Desentramado en CPU para el direccionamiento MSAA y RB+, usando las ecuaciones de bits de muestra de Oberon.",
      "La corrección del bosque inicial de Asterix, medida en una mediana de 162.20 FPS en esa vista inmóvil.",
    ],
    gaps: [
      "El desentramado de cómputo en la GPU no cubre MSAA ni RB+. Esas subidas usan la CPU.",
      "FMASK ligado a CMASK no se resuelve como metadatos comprimidos.",
      "La cifra de Asterix es una vista en una GPU, no una promesa de tasa de fotogramas para el juego.",
    ],
  },

  metadata: {
    title: "HTILE, DCC, CMASK y FMASK",
    summary:
      "HTILE, DCC, CMASK y FMASK son los metadatos comprimidos de profundidad y de color de la consola. PS5PCEM sigue los punteros, limpia HTILE en los casos que entiende y rechaza un layout que, de otro modo, desentramaría de forma incorrecta.",
    sections: [
      {
        heading: "Qué son los cuatro nombres",
        paragraphs: [
          "HTILE son metadatos de profundidad. En el patrón GFX10 que implementa PS5PCEM, un dword cubre una región de 8×8 píxeles, y esos dwords se empaquetan en un bloque de 32 KiB que cubre 1024 por 512 píxeles. DCC es la compresión delta de color para destinos de color. CMASK es una máscara de limpieza rápida y de expansión. FMASK dice a una resolución multimuestra qué muestra pertenece a qué píxel.",
          "La instantánea del recurso conserva los punteros de metadatos y los selectores de layout, incluido el bit linear-CMASK de GFX10. Ese bit importa porque aplicar una ecuación de dirección entramada a un CMASK lineal revolvería la máscara en silencio. El backend rechaza el layout no admitido en su lugar.",
        ],
      },
      {
        heading: "Limpiezas y profundidad",
        paragraphs: [
          "Las limpiezas correctas de HTILE y de DCC están implementadas para los layouts que entiende el renderizador. Las limpiezas repetidas de metadatos las cubre la sonda vulkan-smoke htile-clears. Una extensión de profundidad reiniciada solo se recupera para una superficie activa respaldada por HTILE, lo que mantiene intacto el G-buffer de Ghost of Yōtei y aun así deja que un enlace de profundidad de interfaz 1×1 obsoleto falle la comprobación de tamaño del attachment.",
          "La profundidad y el stencil del invitado de una sola muestra pueden importarse y escribirse de vuelta cuando PS5_GPU_DEPTH_TRANSFER=1. Los planos de stencil enlazados se convierten en attachments empaquetados de profundidad más stencil con las operaciones de comparación y de actualización del invitado. La profundidad multimuestra usa la ruta MSAA. El Z-range comprimido y la Z jerárquica dentro de HTILE no se interpretan por completo.",
        ],
      },
      {
        heading: "Qué sigue siendo explícito",
        paragraphs: [
          "El trabajo que queda, dicho en las notas de la GPU, es el resto de las vistas de capa, los estados comprimidos de DCC y de FMASK que faltan, el Z-range y el Hi-Z de HTILE, y los estados de CMASK acoplados a FMASK. Una importación MSAA no admitida conserva una limpieza de primer uso. Muestrear la superficie comprimida como si fueran texels lisos es el fallo que este rechazo existe para evitar.",
          "El soporte de metadatos es, por tanto, parcial a propósito. Los punteros se descodifican. Los layouts que se han validado se respetan. Los layouts que no se han validado se rechazan o se limpian.",
        ],
      },
    ],
    works: [
      "Direccionamiento HTILE pattern-21, un dword por 8×8, en bloques de 32 KiB.",
      "Limpiezas de HTILE y de DCC para los layouts que entiende el renderizador.",
      "Detección de linear-CMASK que rechaza una ecuación entramada sobre una máscara lineal.",
      "Importación y escritura de vuelta de profundidad y stencil de una sola muestra, de activación explícita.",
    ],
    gaps: [
      "La interpretación completa del Z-range de HTILE y de la Z jerárquica está incompleta.",
      "Los estados comprimidos de DCC y de FMASK, y el CMASK acoplado a FMASK, siguen fuera de la ruta rápida.",
      "Una importación comprimida no admitida se limpia en lugar de muestrearse como texels en crudo.",
    ],
  },

  detile: {
    title: "Desentramado de texturas",
    summary:
      "Las texturas de PS5 se almacenan en patrones de swizzle GFX10, no en filas lineales. PS5PCEM aplica las ecuaciones de dirección en la CPU, y en la GPU para las superficies grandes de 4, 8 y 16 bytes que cumplen las condiciones.",
    sections: [
      {
        heading: "Las ecuaciones de dirección",
        paragraphs: [
          "Una textura entramada hace XOR de la coordenada del píxel con los bits de pipe, de banco y de muestra para que los píxeles vecinos caigan en canales de memoria distintos. PS5PCEM implementa las ecuaciones GFX10 para layouts lineales, baldosas Standard de 256 bytes, de 4 KiB y de 64 KiB, baldosas de 64 KiB parcialmente residentes, profundidad Z_X y destino de render R_X. El mismo contrato cubre las colas de mip y los bloques 3D gruesos.",
          "Hasta dieciséis niveles de mip se colocan primero el más pequeño. Los niveles pequeños comparten las posiciones exactas de cola de mip de 4 KiB y de 64 KiB. Los recursos tridimensionales usan bloques gruesos y rebanadas de bloque de profundidad. Cada subrecurso expone un desplazamiento de byte de origen comprobado. Los adaptadores de búfer, imagen, compresión por bloques, destino de color y destino de profundidad no asignan nada y rechazan un desbordamiento o un rango corto.",
        ],
      },
      {
        heading: "Desentramado en GPU y la alternativa en CPU",
        paragraphs: [
          "Las subidas de primer uso de superficies grandes Standard de 4 bytes en baldosas de 256 bytes, 4 KiB y 64 KiB, y de superficies lineales grandes, se desentraman en la GPU. El kernel de cómputo recibe una clave sin punteros y un bloque de parámetros de 84 bytes: tamaño de bloque, cola, pitch, slice, número de muestras y un desplazamiento de búfer de 64 bits, en un layout estable todo de 32 bits. Las superficies Standard y PRT de 2D y 3D de ocho y de dieciséis bytes están en la misma familia de GPU.",
          "Las demás familias se quedan en la CPU, incluidas RB+ y MSAA. Las ecuaciones de Oberon para esas incluyen los bits de muestra, y la ruta de CPU los usa. Caer a esa alternativa es un coste de ancho de banda. No es otro formato de píxel. El diagnóstico de un dibujo en vivo informa de la familia, las dimensiones del bloque 3D, el número de muestras, el límite de la cola de mip y el tamaño de la asignación del invitado.",
        ],
      },
      {
        heading: "Por qué el desentramado aparece en el tiempo de fotograma",
        paragraphs: [
          "Una textura que se vuelve a subir en cada fotograma paga el coste del desentramado en cada fotograma. El rastreador de páginas, cuando está activado, deja que una página sin cambios permanezca residente para que el desentramado se omita. Una textura que la propia GPU reescribió tiene que invalidarse de todos modos. El desentramado no sustituye esa regla de coherencia.",
          "Las vistas muestreadas desentraman el rango de mip que nombra el descriptor, incluido un nivel base distinto de cero. El mip 0 de la imagen de Vulkan es, en ese caso, el nivel base de la vista. Los swizzles de componente que todavía faltan en la ruta de vistas son una limitación distinta de la ecuación de dirección.",
        ],
      },
    ],
    works: [
      "Ecuaciones de dirección GFX10 lineales, Standard, PRT, de profundidad y de destino de render, incluidas colas de mip y bloques 3D.",
      "Desentramado de cómputo en GPU para superficies Standard y PRT grandes de 2D y 3D de 4, 8 y 16 bytes.",
      "Desentramado en CPU para las familias restantes, incluidos los bits de muestra de MSAA y de RB+.",
      "Desplazamientos de subrecurso comprobados que rechazan rangos cortos y desbordamientos.",
    ],
    gaps: [
      "El desentramado de MSAA y de RB+ se ejecuta en la CPU.",
      "Algunos swizzles de componente y vistas de capa siguen incompletos.",
      "Una superficie que la CPU escribe después de la subida tiene que invalidarse antes de volver a muestrearse.",
    ],
  },

  "page-tracker": {
    title: "Rastreador de páginas de la GPU",
    summary:
      "El rastreador de páginas, de activación explícita, vigila páginas invitadas de 16 KiB. La primera escritura nativa de la CPU provoca un fallo, avanza una generación e invalida la copia de la GPU para que las páginas sin cambios no se hasheen ni se suban en cada fotograma.",
    sections: [
      {
        heading: "El problema que aborda",
        paragraphs: [
          "Un destino de render o un búfer de vértices que vive en la memoria del invitado tiene que llegar a la GPU. Subir toda la asignación en cada fotograma es correcto y caro. Hashear toda la asignación para descubrir que no cambió también es caro. El rastreador de páginas, en cambio, marca como solo lectura una página con escritura vigilada y deja que la CPU falle en la primera escritura.",
          "El manejador del fallo registra la página, restaura la protección real del invitado y avanza la generación de esa página. Un dibujo posterior compara generaciones. Una página sin cambios permanece en el dispositivo. Una página cuya generación se movió se sube. PS5_GPU_PAGE_TRACKER=1 activa el mecanismo. Está apagado salvo que se fije esa variable, o el conjunto experimental.",
        ],
      },
      {
        heading: "Qué es el fallo",
        paragraphs: [
          "El fallo es una invalidación, no un defecto del invitado. La página era de solo lectura solo para que el anfitrión pudiera observar la escritura. La escritura del invitado puede entonces completarse bajo la protección que pidió el título. Las páginas que no se vigilan siguen la ruta de subida ordinaria.",
          "Los mapeos de memoria directa que se recrean con la misma dirección, tamaño, desplazamiento físico y permisos de CPU conservan sus vistas del anfitrión. Esa reutilización es lo que hace que una generación signifique algo entre fotogramas. Un cambio de respaldo o de permisos toma la ruta normal de sustitución y el rastreador observa el mapeo nuevo.",
        ],
      },
      {
        heading: "Qué no hace",
        paragraphs: [
          "El rastreador no reduce la resolución interna de un título, y no compila shaders. Solo elimina las transferencias repetidas de páginas en las que la CPU no escribió. Un título que reescribe un búfer en cada fotograma sigue pagando por ese búfer.",
          "Las escrituras de atlas de fuentes y otras escrituras HLE invalidan las vigilancias antes de modificar la memoria del invitado, de modo que una escritura del firmware no es invisible para la GPU. El rastreador forma parte del conjunto experimental de GPU descrito en la visión general de la arquitectura.",
        ],
      },
    ],
    works: [
      "Generaciones por página para páginas invitadas de 16 KiB cuando PS5_GPU_PAGE_TRACKER=1.",
      "Un fallo en la primera escritura que restaura la protección del invitado e invalida la copia residente.",
      "Reutilización de vistas idénticas de memoria directa para que las generaciones sobrevivan entre fotogramas.",
      "Invalidación cuando la propia HLE escribe una página vigilada.",
    ],
    gaps: [
      "El rastreador es de activación explícita. La ruta de compatibilidad predeterminada no depende de él.",
      "Las páginas que la CPU reescribe en cada fotograma se siguen subiendo.",
      "No cubre la coherencia de GPU a GPU dentro de una superficie de metadatos comprimidos.",
    ],
  },

  videoout: {
    title: "VideoOut",
    summary:
      "VideoOut registra los búferes de presentación del invitado y completa un flip solo después de que el callback de presentación ha aceptado el fotograma. La ventana del anfitrión es un swapchain de Vulkan a 1080p SDR.",
    sections: [
      {
        heading: "Registro y flips",
        paragraphs: [
          "VideoOut conserva hasta dieciséis asignaciones de presentación registradas y cuatro grupos de atributos. Publica el registro contiguo de dieciséis etiquetas que usa la ABI del controlador. El registro, el cambio y la baja se validan. Se acepta un flip en blanco del búfer -1, que los títulos usan durante el arranque.",
          "Los flips de CPU y los flips end-of-pipe pasan por el backend vivo de búfer de comandos. Un flip normal queda completo solo después de que el callback de presentación acepta el fotograma. La finalización se entrega en la cola de eventos de VideoOut con los datos de usuario de quien llama. El filtro de la cola es la misma implementación de eventos user-edge que usa el kernel, y se conserva el identificador del registro.",
        ],
      },
      {
        heading: "Qué presenta el anfitrión",
        paragraphs: [
          "La ventana del juego es un swapchain de Vulkan. VideoOut informa de 1080p SDR. Se informa de que 120 Hz no está disponible. La preferencia de juego predeterminada pide el modo de rendimiento. La resolución interna sigue bajo el control del título: un juego que renderiza a 4K sigue asignando destinos 4K, y el swapchain presenta el scanout que registró el título.",
          "SetFlip resuelve la ranura de VideoOut y el índice del búfer, elige el destino en caché con la dirección de invitado coincidente y publica el fotograma. La tasa de flips puede mostrarse en el título de la ventana. El lanzador guarda esa preferencia, y una ejecución por línea de comandos puede fijar PS5_SHOW_FPS=1.",
        ],
      },
      {
        heading: "Películas y el scanout",
        paragraphs: [
          "Las películas de intro no se saltan VideoOut. AvPlayer descodifica hacia búferes que posee el título, y los shaders propios del título o un scanout registrado los presentan. Asterix conserva el viewport de altura negativa del invitado como orientación del scanout, de modo que la composición no sale boca abajo.",
          "Un cargador Vulkan ausente, un dispositivo de presentación ausente o una ventana ausente se informa, y el título continúa por la ruta sin interfaz. El modo sin interfaz es para diagnóstico. No es un segundo renderizador, más rápido.",
        ],
      },
    ],
    works: [
      "Hasta dieciséis búferes de presentación, cuatro grupos de atributos y la ABI de dieciséis etiquetas.",
      "Flips que se completan solo después de que el callback de presentación acepta el fotograma.",
      "Un swapchain de Vulkan que informa de 1080p SDR, con 120 Hz dejado como no disponible.",
      "Preferencia de modo de rendimiento de forma predeterminada, y un título de ventana opcional con la tasa de flips.",
    ],
    gaps: [
      "No se ofrecen 120 Hz ni un swapchain HDR del anfitrión.",
      "La resolución interna es la que asigne el título.",
      "Sin un dispositivo de presentación, el proceso permanece sin interfaz.",
    ],
  },

  audio: {
    title: "AudioOut",
    summary:
      "AudioOut reproduce PCM del invitado en un dispositivo de Windows a 48 kHz. Los puertos heredados tienen sus propios flujos y colas, de modo que la música y los efectos suenan juntos, y un underrun conserva el orden de las muestras.",
    sections: [
      {
        heading: "Puertos y el dispositivo del anfitrión",
        paragraphs: [
          "Un título envía un búfer y espera que la llamada dure aproximadamente lo que suena el búfer. Esa espera viene de que el dispositivo del anfitrión hace sitio, no de un sueño que tira las muestras. AudioOut, AudioIn y AudioOut2 exponen puertos ritmados, colas, metadatos de altavoces y el estado de primario conectado. Un lote valida cada puerto y después envía el cuanto audible una sola vez, de modo que un puerto auxiliar silencioso no multiplica la duración.",
          "Los puertos heredados de AudioOut poseen flujos de Windows y colas de PCM distintos. La música y los efectos pueden sonar a la vez. La salida del lote envía cada puerto activo. Tras un underrun, el anillo activo conserva el orden de las muestras, y un fundido corto quita el chasquido al reanudar. El dispositivo WinMM hace un pre-roll del PCM real y usa un periodo de temporizador de un milisegundo.",
        ],
      },
      {
        heading: "Latencia",
        paragraphs: [
          "La reserva ordinaria empieza en 42 ms y crece en pasos de cuatro búferes, hasta unos 170 ms, solo cuando el título en ejecución deja de verdad al dispositivo sin muestras. El perfil medido de PPSA25872 empieza en 128 ms porque su mezclador puede pausar unos 100 a 120 ms durante el arranque y el trabajo de escena. Esa reserva mayor no se impone a otros títulos.",
          "Las muestras no finitas se sustituyen antes de llegar al dispositivo. Ese saneador protege los altavoces. No puede reparar un filtro que ya almacenó un NaN. La página de ACM describe el fallo de convolución que producía esos valores en Subnautica.",
        ],
      },
      {
        heading: "Dónde existe la salida",
        paragraphs: [
          "No abrir un dispositivo no se informa al título. Una tarjeta de sonido ausente es un hecho del anfitrión. Quien llama cae a una espera silenciosa ritmada para que el tiempo del título siga avanzando. Ocurre lo mismo si el dispositivo muere a mitad de la ejecución. La salida está implementada en Windows. Las demás compilaciones mantienen los puertos en silencio y con el ritmo correcto.",
          "La mezcla directa de respaldo de los clips de vista previa descodificados está apagada de forma predeterminada. Reproducir una vista previa junto a la mezcla AudioOut propia del título se oye como un eco. PS5_AUDIO_FALLBACK_MIX=1 enciende esa mezcla. El lanzador puede silenciar el dispositivo con su ajuste de sonido, que llega como PS5_AUDIO_DISABLED.",
        ],
      },
    ],
    works: [
      "Reproducción del anfitrión a 48 kHz con puertos ritmados de AudioOut, AudioIn y AudioOut2.",
      "Flujos de Windows distintos para los puertos heredados, de modo que la música y los efectos simultáneos conservan el orden.",
      "Una reserva que empieza en 42 ms y solo crece cuando el dispositivo se queda sin muestras, hasta unos 170 ms.",
      "Sustitución de muestras no finitas, y una alternativa silenciosa y ritmada cuando no se abre ningún dispositivo.",
    ],
    gaps: [
      "La salida del anfitrión es solo para Windows.",
      "La vibración del mando no se gobierna desde una pista háptica de audio.",
      "El saneador no reconstruye un historial de filtro que ya estaba envenenado.",
    ],
  },

  acm: {
    title: "Convolución ACM",
    summary:
      "La convolución ACM ejecuta en la CPU la reverberación particionada de FMOD. Los lotes de entrada compartida transforman una señal seca, aplican particiones de impulso en float o half-float y hacen overlap-add del resultado húmedo.",
    sections: [
      {
        heading: "El fallo que cerró",
        paragraphs: [
          "Subnautica: Below Zero podía arrancar con un crepitar, quedarse en silencio y recuperarse minutos después. El PCM que llegaba al dispositivo del anfitrión contenía flotantes no finitos. Una traza en memoria de los callbacks de DSP de FMOD mostraba audio finito entrando en la reverberación por convolución y basura saliendo. Las funciones HLE sceAcm_ConvReverb_SharedInput, el envío del lote y sceAcmBatchWait devolvían éxito sin escribir una salida.",
          "FMOD mezclaba después ese búfer húmedo sin escribir en el grafo. Los NaN se propagaban por los efectos posteriores. El saneador de AudioOut los sustituía por silencio y no podía reparar el historial de filtro envenenado. Un segundo error hacía que la espera sobre el identificador de lote inicial -1 tuviera éxito. FMOD trata una espera inicial fallida como que todavía no hay un búfer húmedo anterior, y solo mezcla después de un trabajo realmente completado.",
        ],
      },
      {
        heading: "Convolución particionada",
        paragraphs: [
          "La disposición del descriptor coincide con la observada en el backend ACM de FMOD. Las particiones de la respuesta al impulso son bins complejos intercalados. Un bloque de B bins pertenece a una transformada de longitud 2B. Los búferes de entrada, de salida y de solape son distintos y planares. Solo se aceptan las disposiciones de espectro float32 y float16 con desplazamiento cero que se observaron.",
          "Un lote se ejecuta en la CPU. El historial de entrada se conserva entre granos y a través de la vuelta del anillo, y el solape se arrastra al grano de salida siguiente. Varias salidas pueden compartir una transformada de entrada y un avance del historial. Una entrada mono puede alimentar más de un canal. La transformada inversa está normalizada. Una inversa independiente de una partición de impulso real colocó su energía en la primera mitad del bloque con relleno de ceros, lo que confirma el signo del espectro. El impulso empaquetado que usa el juego omite el bin de Nyquist.",
        ],
      },
      {
        heading: "Esperas, límites y la repetición",
        paragraphs: [
          "Los constructores capturan arrays de punteros y ganancias en un registro de comandos acotado. El PCM en sí se lee cuando empieza el lote. Una espera tiene éxito solo para un lote que ese contexto completó de verdad. Destruir el contexto libera el historial. Los límites no válidos, las codificaciones de comando desconocidas y los layouts no admitidos devuelven errores.",
          "Las operaciones autónomas de FFT, IFFT y de panoramizador de ACM no están implementadas. Los canales tienen un tope de 8, las salidas de 32 y el bloque de 1024. El almacenamiento del historial está acotado. En el runner firmado, 90 instantáneas de PCM de una por segundo no contenían muestras no finitas, con un pico de 0.1255 y el primer audio por encima de 0.001 a los 11.03 segundos. El responsable confirmó el sonido. Las muestras son una sonda, no cada muestra que emitió el juego.",
        ],
      },
    ],
    works: [
      "Convolución FFT particionada para los lotes de reverberación de entrada compartida y de IR compartida de FMOD.",
      "Espectros complejos float32 y float16, overlap-add e historial entre granos.",
      "Esperas que tienen éxito solo para un lote completado de ese contexto. El identificador inicial -1 falla.",
      "PCM finito en la repetición de Subnautica, sin el crepitar ni el silencio posterior.",
    ],
    gaps: [
      "Las llamadas autónomas de FFT, IFFT y de panoramizador de ACM no están implementadas.",
      "Los desplazamientos de espectro distintos de cero y los layouts de enrutado no medidos se rechazan.",
      "La convolución se ejecuta en la CPU. No hay una ruta de FFT en la GPU.",
    ],
  },

  ajm: {
    title: "Códecs AJM",
    summary:
      "AJM descodifica ATRAC9, MP3, AAC de MPEG-4 y Opus. Cada instancia de códec conserva su propio estado, y un códec desconocido se rechaza en lugar de informarse como un éxito silencioso.",
    sections: [
      {
        heading: "Códecs y formatos de muestra",
        paragraphs: [
          "El códec 0 es MP3, mediante minimp3. El códec 1 es ATRAC9. El códec 2 es AAC de MPEG-4, mediante FAAD2, para trabajos ADTS, raw y SAF. El códec 24 es Opus, mediante libopus. La salida de ATRAC9 puede ser 16 bits con signo, 32 bits con signo, float o planar. Se conservan la inicialización, la información del códec, los metadatos gapless, los recuentos de bytes del flujo, los recuentos de fotogramas descodificados y las bandas laterales del total de muestras.",
          "Los trabajos pueden usar un búfer contiguo o un búfer dividido. El estado de la instancia es por descodificador, de modo que dos flujos no comparten una reserva de bits. La ruta heredada de libSceAudiodec usa el mismo backend para ATRAC9, MP3 y AAC después de sus propias llamadas de inicialización, creación, reinicio y borrado.",
        ],
      },
      {
        heading: "Audio de películas y vistas previas",
        paragraphs: [
          "La disposición ATRAC9 multicanal de PlayStation 5 observada se descodifica como flujos mono intercalados. El audio de las películas de Ghost of Yōtei empieza en el punto correcto gracias a esa disposición. Una pista háptica que lleva la película se temporiza con silencio. La vibración del mando no se sintetiza a partir de ella.",
          "Las vistas previas de respaldo con base FSB se remuestrean a la mezcla de 48 kHz, reciben un fundido corto y se drenan una sola vez. No se mezclan en el grafo AudioOut en vivo salvo que PS5_AUDIO_FALLBACK_MIX=1, porque una segunda copia del mismo clip es un eco.",
        ],
      },
      {
        heading: "Licencias",
        paragraphs: [
          "ATRAC9, FAAD2, minimp3 y Opus son descodificadores de terceros. Sus licencias viajan en el directorio docs/licenses del repositorio y con la compilación portátil. El código propio del emulador sigue siendo GPL-3.0-or-later.",
          "Un número de códec fuera de los cuatro valores implementados es un error. Devolver un búfer de ceros y un código de éxito dejaría que un título creyera que el flujo se había descodificado.",
        ],
      },
    ],
    works: [
      "ATRAC9, MP3, AAC de MPEG-4 y Opus, con estado de descodificador por instancia.",
      "Salida de ATRAC9 como PCM de 16 bits con signo, de 32 bits con signo, float o planar.",
      "Metadatos gapless y de bandas laterales, y búferes de entrada contiguos y divididos.",
      "El backend compartido detrás de libSceAudiodec.",
    ],
    gaps: [
      "Los números de códec AJM desconocidos se rechazan.",
      "Las pistas hápticas permanecen en silencio. La vibración no se emula a partir de ellas.",
      "La mezcla de las vistas previas de respaldo está apagada salvo que PS5_AUDIO_FALLBACK_MIX=1.",
    ],
  },

  ngs2: {
    title: "NGS2",
    summary:
      "NGS2 conserva handles de sistema, de rack y de voz, analiza datos RIFF/WAVE ordinarios y marca el ritmo de un grano silencioso de 48 kHz para que un worker de DSP en software no pueda girar. La síntesis de voz en sí está incompleta.",
    sections: [
      {
        heading: "Handles y parámetros",
        paragraphs: [
          "Un título crea un sistema NGS2, racks y voces, y después recorre una lista enlazada de cambios de parámetros. PS5PCEM emite handles estables, comprueba que un hijo sigue perteneciendo a un padre vivo y recorre esas listas dentro de un límite. Reproducir, pausar, reanudar, detener y matar se aplican cuando se renderiza la voz. El estado se informa con las banderas exactas de 32 bits que lee el invitado.",
          "Se analiza la geometría RIFF/WAVE ordinaria. Se conserva una matriz de panorama neutra, de modo que una voz que no se ha panoramizado no recoge una matriz obsoleta de otra voz. El grano es float32.",
        ],
      },
      {
        heading: "Por qué el grano va a ritmo",
        paragraphs: [
          "Cada grano de render silencioso va a ritmo de 48 kHz. Sin esa espera, un worker de DSP en software del título llama al renderizador en un bucle cerrado y se queda con un núcleo entero del anfitrión. El ritmo coincide con el reloj de AudioOut, de modo que el worker duerme aproximadamente la duración del grano.",
          "Las muestras en sí son silencio. La síntesis y la mezcla reales de voces NGS2 no están implementadas. Un título cuya banda sonora se produce por completo dentro de NGS2 no oirá esas voces por esta ruta. Los títulos que descodifican con AJM y envían PCM a AudioOut no necesitan la síntesis de NGS2.",
        ],
      },
    ],
    works: [
      "Handles estables de sistema, de rack y de voz, con comprobaciones del ciclo de vida del padre.",
      "Geometría RIFF/WAVE, listas de parámetros acotadas y banderas de estado exactas de 32 bits.",
      "Reproducir, pausar, reanudar, detener y matar aplicados al renderizar, con una matriz de panorama neutra.",
      "Un grano float32 silencioso a ritmo de 48 kHz.",
    ],
    gaps: [
      "La síntesis de voz y el mezclador de NGS2 no están implementados.",
      "El grano a ritmo es silencio, así que una banda sonora que solo existe en NGS2 permanece en silencio.",
      "Los complementos de DSP propios dentro de una voz quedan fuera de este modelo.",
    ],
  },

  avplayer: {
    title: "AvPlayer",
    summary:
      "SceAvPlayer descodifica contenedores de película con FFmpeg hacia fotogramas NV12 que posee el título y PCM estéreo de 48 kHz. La reproducción termina cuando pasa la duración de la fuente, aunque el título nunca lea uno de los flujos.",
    sections: [
      {
        heading: "Búferes que posee el título",
        paragraphs: [
          "El reproductor usa los callbacks de asignación del título y los callbacks de archivo del título. FFmpeg sondea el contenedor y descodifica el vídeo a NV12 a la resolución de la fuente y el audio a estéreo intercalado de 16 bits con signo a 48 kHz. El vídeo y el audio tienen bloqueos distintos y procesos de descodificador distintos. Las marcas de tiempo comparten un reloj monotónico.",
          "Se conservan la pausa, la búsqueda, el bucle y el fin de flujo. La ABI del descodificador de software informa del pitch alineado, la altura de asignación y el recorte visible. Existen tanto la llamada de información de flujo extendida como la heredada. La hora actual, el modo trick a velocidad normal, la desactivación de flujo y un reloj de medios acotado cubren el middleware de Unity que trae Asterix.",
        ],
      },
      {
        heading: "Terminar una película que el título solo lee a medias",
        paragraphs: [
          "Un título puede quedarse con las imágenes y mezclar su propio sonido, o al revés. Esperar hasta que se haya leído cada flujo mantiene ese reproductor vivo durante el resto del proceso. Jurassic Park Classic Games Collection se quedó en su intro por esta razón: el reloj iba noventa segundos más allá de un clip de tres segundos porque el flujo de audio no leído nunca terminaba.",
          "La duración viene de la fuente. Cuando el reloj la supera, la reproducción termina aunque un flujo se hubiera ignorado. Mientras un flujo todavía entrega, la posición informada se mantiene dentro de los fotogramas realmente entregados, de modo que una máquina lenta no se corta antes de tiempo. Una vez que el flujo ha terminado de verdad, el reloj puede avanzar hasta la duración. Las fuentes en bucle y las de longitud desconocida no se tocan.",
        ],
      },
      {
        heading: "Presentación",
        paragraphs: [
          "Las películas de intro observadas se reproducen aproximadamente a su tasa de fotogramas nativa en compilaciones ReleaseFast. La última imagen válida se conserva mientras Unity cambia de clip, en lugar de presentar una superficie de descodificador limpiada como un color sólido. Una fuente de 1920×1080 puede escalarse al destino de scanout que registró el título.",
          "La pista háptica se temporiza y permanece en silencio. AvPlayer no acciona un mando. Los píxeles llegan a la pantalla a través de los shaders del título o de VideoOut, no a través de un segundo compositor dentro del reproductor.",
        ],
      },
    ],
    works: [
      "Descodificación con FFmpeg a vídeo NV12 y PCM estéreo de 48 kHz, en búferes que posee el título.",
      "Información de flujo extendida y heredada, pausa, búsqueda, bucle y un reloj de medios compartido.",
      "Fin de la reproducción al llegar a la duración de la fuente cuando el título deja un flujo sin leer.",
      "Conservación del último fotograma válido a través de un cambio de clip.",
    ],
    gaps: [
      "La háptica es silencio. La vibración del mando no se emula.",
      "Las fuentes en bucle y las de longitud desconocida no las corta la regla de duración.",
      "Un callback de archivo ausente, o un contenedor que FFmpeg no puede sondear, hace fallar ese recurso.",
    ],
  },

  cpu: {
    title: "Ejecución nativa del invitado",
    summary:
      "En Windows x86-64 el código de máquina del invitado se ejecuta de forma directa. Un worker del anfitrión lleva cada pthread invitado, y la base de FS se restaura después de cada llamada bloqueante porque Windows no la conserva.",
    sections: [
      {
        heading: "Un worker por hilo invitado",
        paragraphs: [
          "El despachador arranca un worker del anfitrión por cada pthread invitado, instala el TLS de ese hilo y entra en el invitado en la dirección pedida con los registros de argumentos de System V. Join, detach, yield, sleep, los callbacks anidados y scePthreadExit vuelven todos por esta ruta. El hilo HLE se completa solo después de que la ejecución del invitado ha salido de ese contexto.",
          "El puente comprueba que el punto de entrada es ejecutable y que la pila y el TLS están mapeados. Guarda los registros no volátiles de Windows, MXCSR y la palabra de control de x87, cambia a la pila del invitado, instala la base de FS del invitado y llama a la entrada. Un scePthreadExit síncrono sale por un escape nativo que descarta los marcos del invitado y restaura el FS del anfitrión antes de que el despachador vea la interrupción.",
        ],
      },
      {
        heading: "Windows suelta la base de FS",
        paragraphs: [
          "Instalar FS una vez no basta. Windows no conserva una base de FS escrita por el usuario a través de un cambio de contexto. Después de un sueño, rdfsbase vuelve a leer cero. El código del invitado guarda su almacenamiento local de hilo en FS, bajo la convención System V, así que el siguiente acceso relativo a FS fallaría cerca de la dirección cero. Nada en el invitado está mal. El anfitrión soltó un registro en el que el invitado tiene derecho a confiar.",
          "Por eso el despachador restaura FS después de las llamadas bloqueantes. Las esperas usan un futex consciente de la secuencia para que un despertar que llega entre un desbloqueo y el aparcamiento se consuma una vez, y una difusión siga siendo visible para cada espera que observó la secuencia anterior. Si el historial fijo de despertares llega a saturarse, el despachador despierta de más y deja que HLE vuelva a comprobar el objeto. Los sueños con tiempo usan una espera privada no alertable para que un despertar ajeno no convierta a un worker de audio en un bucle activo.",
        ],
      },
      {
        heading: "Fallos y otros sistemas operativos",
        paragraphs: [
          "Un hilo invitado que falla queda contenido. El diagnóstico atribuye la dirección a un módulo y a un símbolo cuando puede, y el proceso no tiene que morir con una excepción del anfitrión no controlada. PS5_CPU_WAIT_DIAGNOSTICS=1 vuelve a encender la traza verbosa de esperas. Está apagada durante el juego normal porque varios workers aparcados que imprimen a la vez pueden, por sí solos, atascar un fotograma.",
          "La ejecución nativa exige Windows x86-64 y la característica de procesador RDWRFSGSBASE. Las compilaciones de Linux y de macOS siguen compilando el decodificador, el cargador y HLE, e informan del puente nativo como no admitido. Los binarios del invitado son código de máquina x86-64. No se interpretan.",
        ],
      },
    ],
    works: [
      "Ejecución nativa del invitado x86-64 en Windows, un worker del anfitrión por cada pthread invitado.",
      "Llamadas System V, pilas del invitado y FS restaurado después de las llamadas bloqueantes.",
      "Esperas conscientes de la secuencia, fallos contenidos y una salida de pthread que restaura al anfitrión.",
      "Inspección, descodificación y HLE en Linux y macOS, sin ejecución nativa.",
    ],
    gaps: [
      "No hay intérprete. Los anfitriones que no son Windows x86-64 no ejecutan al invitado.",
      "Una CPU que no puede escribir las bases de FS y de GS no puede entrar en el puente nativo.",
      "El diagnóstico verboso de esperas está apagado de forma predeterminada porque su impresión atasca el juego.",
    ],
  },

  loader: {
    title: "Carga de ELF y SELF",
    summary:
      "El cargador mapea módulos SELF de PS5 descifrados y ELF64 desnudos, aplica reubicaciones y resuelve las importaciones contra el registro HLE. El título recibe después handles estables para los módulos que él mismo arranca.",
    sections: [
      {
        heading: "Imágenes",
        paragraphs: [
          "Un ejecutable de PlayStation 5 suele ser un contenedor SELF alrededor de una imagen ELF64. PS5PCEM lee tanto el contenedor como un ELF desnudo. El lector recoge las importaciones, mapea los segmentos en el espacio de direcciones reservado del invitado y aplica las reubicaciones. Las imágenes TLS se registran en los hilos que van a ejecutarlas.",
          "Las herramientas pueden inspeccionar un módulo, volcar un grafo de dependencias reubicado o desensamblar un shader sin arrancar el título. game-run es la ruta que carga, inicializa HLE y entra en el invitado. Cuando el eboot.bin descifrado vive aparte de la instalación, --app0 apunta el montaje de solo lectura al directorio de contenido.",
        ],
      },
      {
        heading: "Módulos que el título arranca más tarde",
        paragraphs: [
          "El entorno de ejecución mapea el grafo de dependencias alcanzable, más todo lo nombrado en PS5_PRELOAD, antes de que corra el código invitado. sceKernelLoadStartModule devuelve entonces un handle estable para un módulo de ese conjunto. Cargarlo otra vez no crea una segunda copia reubicada. sceKernelDlsym hashea el nombre que pasó el título y busca solo en el módulo que seleccionó el handle, de modo que dos complementos que exportan el mismo callback no quedan en alias.",
          "La coincidencia de rutas ignora la dirección de las barras y las mayúsculas. Un título observado pide Il2CppUserAssemblies.prx y distribuye Il2cppUserAssemblies.prx. Una coincidencia exacta rechazaría un archivo que el título instaló. La ruta relativa se prueba antes del nombre de archivo desnudo, de modo que dos módulos que comparten nombre de archivo siguen siendo distintos. Un módulo que no estaba en el conjunto publicado devuelve ENOENT. No se mapea mientras los hilos invitados ya están en ejecución.",
        ],
      },
      {
        heading: "Complementos de Unity",
        paragraphs: [
          "Los complementos de Unity pueden mapearse con sus constructores diferidos. sceKernelLoadStartModule los arranca entonces una sola vez, con el bloque de argumentos real del título, en lugar de ejecutar esos constructores durante la inicialización del grafo. Ese orden es la diferencia entre un complemento que ve sus argumentos y un complemento que arranca demasiado pronto.",
          "El cargador no descifra un SELF comercial. La entrada es una imagen descifrada que el usuario tiene derecho a cargar. Los paquetes cifrados son asunto de la herramienta de PKG, y el cifrado comercial también queda fuera de esa herramienta.",
        ],
      },
    ],
    works: [
      "Mapeo, reubicación, importaciones y TLS de ELF64 y de SELF descifrado.",
      "Un grafo de dependencias precargado y handles estables de sceKernelLoadStartModule.",
      "Dlsym limitado al módulo seleccionado, con coincidencia de rutas sin distinguir mayúsculas.",
      "Constructores diferidos para los complementos de Unity, de modo que arrancan con los argumentos reales.",
    ],
    gaps: [
      "Un módulo que aparece solo después del arranque, y que no se precargó, devuelve ENOENT.",
      "Las imágenes SELF comerciales cifradas no se descifran.",
      "Las compilaciones de inspección no ejecutan la imagen cargada en anfitriones que no son Windows.",
    ],
  },

  input: {
    title: "Mandos y teclado",
    summary:
      "DualSense, DualSense Edge y DualShock 4 se leen por HID, en USB y Bluetooth. Los mandos compatibles con Xbox usan XInput. El teclado se asigna a los sticks mediante un perfil del lanzador.",
    sections: [
      {
        heading: "Informes HID",
        paragraphs: [
          "XInput enumera los dispositivos compatibles con Xbox. Un DualSense enchufado al PC es invisible para él, salvo que una capa de traducción invente un mando virtual de Xbox. PS5PCEM abre el mando de Sony por HID y descodifica el informe. Los campos son los mismos en USB y en Bluetooth. Los desplazamientos cambian, porque Bluetooth antepone un prefijo a la carga útil, y el DualSense coloca los gatillos antes de los bytes de botones.",
          "La cruceta llega como una de ocho posiciones de brújula, no como cuatro bits independientes. Las lecturas se solapan y nunca bloquean. Un sondeo vacía la cola del controlador y se queda con el informe más reciente. Responder con el informe más antiguo retrasaría los sticks tanto como se hubiera atrasado el fotograma.",
        ],
      },
      {
        heading: "Salida, motores y la barra de luz",
        paragraphs: [
          "Los informes de salida llevan ambos motores y la barra de luz. En Bluetooth el informe va desplazado y termina con una suma de comprobación que el mando verifica antes de actuar, así que un informe armado para el cable se ignora por el aire. La página de entrada del lanzador nombra el mando que encontró y puede ejecutar una prueba de un segundo que hace girar ambos motores y barre la barra de luz. El dispositivo se abre en modo compartido, y para escritura donde el anfitrión lo permite.",
          "El mando tiene prioridad sobre XInput. XInput sigue siendo la ruta para los mandos compatibles con Xbox y para cualquier cosa que se presente como tal. El lanzador guarda la elección, el índice del mando y las asignaciones del teclado, y las pasa a game-run como variables de entorno.",
        ],
      },
      {
        heading: "Teclado y entrada guionizada",
        paragraphs: [
          "WASD es el stick izquierdo. Alt más las teclas de flecha es el stick derecho. Los perfiles pueden ser mando, teclado o ambos. PS5_INPUT_MODE=scripted conserva los pulsos de botón de puesta en marcha e ignora los dispositivos físicos, de modo que una pulsación en otra ventana no altera una escena medida.",
          "Dentro de HLE, el mando primario puede abrirse con scePadOpen u obtenerse con scePadGetHandle. La segunda ruta importa para los títulos que nunca abren el mando del usuario con sesión iniciada antes de sondearlo. Este es el lado del anfitrión de ese handle.",
        ],
      },
    ],
    works: [
      "DualSense, DualSense Edge y DualShock 4 por HID de USB y de Bluetooth.",
      "Sondeo del informe más reciente, motores, barra de luz y una suma de comprobación de Bluetooth.",
      "XInput para mandos compatibles con Xbox, y perfiles de teclado reasignables.",
      "Un modo de entrada guionizado que ignora los dispositivos físicos durante las mediciones.",
    ],
    gaps: [
      "El touchpad, los gatillos adaptativos y los sensores de movimiento no constituyen el conjunto completo de funciones del DualSense.",
      "La háptica de una pista de película no se encamina a los motores.",
      "La ruta HID es la ruta del anfitrión Windows que usan el lanzador y game-run.",
    ],
  },

  pkg: {
    title: "Extractor de PKG",
    summary:
      "pkgextractor desempaqueta los diseños FPKG de depuración observados en el desarrollo: el paquete exterior, el PFS interno, los mapas de nombres NAPS y las cargas útiles comprimidas con Kraken. Los paquetes comerciales cifrados quedan fuera de alcance.",
    sections: [
      {
        heading: "Qué contiene un paquete de depuración",
        paragraphs: [
          "Un paquete de PlayStation 5 envuelve un sistema de archivos. Los diseños de depuración que ha observado PS5PCEM usan un paquete exterior, una imagen PFS interna, una tabla NAPS que asigna nombres del paquete a archivos y cargas útiles comprimidas con Kraken. El extractor recorre esas capas y escribe los archivos. Se distribuye junto al lanzador como pkgextractor.exe, y el lanzador tiene un botón Extract PKG que lo ejecuta.",
          "El extractor de desarrollo del 2 de octubre corrige InvalidPfs para Grand Theft Auto III: The Definitive Edition, PPSA03527 versión 1.007. Se extraen los 48 archivos, incluidos eboot.bin, seis módulos y ambos archivos PAK, y coinciden las sumas de comprobación de los dos índices PAK. Pasan veintiuna pruebas de paquetes. Ese informe no inició el juego. La extracción y la ejecución son afirmaciones distintas.",
        ],
      },
      {
        heading: "Cifrado comercial",
        paragraphs: [
          "Los paquetes comerciales cifrados no están admitidos. No se incluye ni se da por supuesta ninguna clave. Un paquete que el analizador de depuración observado no reconoce falla el análisis. No se extrae de forma parcial a un directorio que parezca completo.",
          "El límite legal coincide con el del resto del proyecto. La herramienta existe para que una persona que ya tiene un volcado que tiene derecho a usar pueda alimentar al cargador. El sitio y el emulador no distribuyen juegos, firmware ni claves.",
        ],
      },
      {
        heading: "Después de la extracción",
        paragraphs: [
          "El cargador lee el eboot.bin descifrado y monta el directorio de contenido como /app0. Un diseño típico deja eboot.bin en la raíz del paquete o en un subdirectorio descifrado. El lanzador busca en los dos. Savedata no está dentro del paquete. Vive bajo el directorio de inicio del emulador, con clave según el ID de título.",
          "Kraken, NAPS y PFS aquí son mecanismos de archivo de paquete. No son el swizzle de la GPU, el motor AMPR ni los códecs de audio, con los que es fácil confundirlos porque esos también comprimen o reasignan datos.",
        ],
      },
    ],
    works: [
      "Diseños FPKG de depuración observados, PFS interno, mapas de nombres NAPS y cargas útiles Kraken.",
      "Un extractor de línea de comandos y un botón del lanzador.",
      "La extracción de desarrollo de GTA III: 48 archivos y sumas de comprobación coincidentes de los índices PAK.",
      "Veintiuna pruebas de paquetes que pasan en ese extractor.",
    ],
    gaps: [
      "Los paquetes comerciales cifrados no están admitidos, y con la herramienta no viaja ninguna clave.",
      "Un diseño no reconocido falla. No se emite como un árbol parcial.",
      "Una extracción correcta no afirma que el título después se ejecute.",
    ],
  },
};

export default tech;
