import type { TechCopy } from "./en";

const tech: TechCopy = {
  hle: {
    title: "HLE, emulação de firmware em alto nível",
    summary:
      "HLE é como o PS5PCEM responde às chamadas de firmware que um título importa. Cada NID numérico vira uma função Zig numa pilha do anfitrião, com a convenção de chamada System V do convidado preservada no Windows.",
    sections: [
      {
        heading: "Por que o firmware não está no jogo",
        paragraphs: [
          "Um título de PlayStation 5 não traz o sistema operacional que chama. Suas importações são identificadores de 11 caracteres. O PS5PCEM calcula cada identificador a partir do nome exportado: SHA-1 do nome mais um sal fixo e, em seguida, os oito primeiros bytes do resumo numa variante de base64. Uma implementação se registra pelo nome legível e pode exigir o identificador que esse nome deve produzir, de modo que uma exportação com erro de grafia falha quando o módulo é compilado.",
          "O ligador dinâmico procura o identificador junto com a biblioteca, o módulo e as versões deles. O mesmo identificador pode existir em mais de uma biblioteca. Existe uma busca só pelo identificador para importações que não trazem metadados utilizáveis, e essa alternativa é tratada como último recurso porque é ambígua.",
        ],
      },
      {
        heading: "A chamada roda numa pilha do anfitrião",
        paragraphs: [
          "O convidado chama o firmware diretamente, então a chamada começa na pilha da thread convidada, muitas vezes de um megabyte porque foi isso que o título pediu. Trabalho do anfitrião, como abrir um arquivo, precisa de um quadro de pilha bem maior. O compilador reserva esse quadro na entrada, antes de qualquer retorno antecipado. Um corpo de firmware pode, portanto, sair da pilha convidada antes de chegar à linha que precisava do espaço, e a falha cai fora de todo mapeamento convidado.",
          "Toda chamada HLE troca para uma pilha do anfitrião por thread enquanto dura o trabalho do anfitrião. Os argumentos viajam pela memória, então um único stub em assembly serve a qualquer assinatura, inclusive retornos em ponto flutuante e de agregados. Chamadas de firmware aninhadas permanecem na pilha que a chamada externa já estabeleceu. No Windows o convidado usa a convenção System V AMD64 enquanto o anfitrião usa Microsoft x64, então toda função chamável pelo convidado é declarada com a convenção do convidado. Omitir essa declaração ainda compila, e então os argumentos são lidos dos registradores errados.",
        ],
      },
      {
        heading: "O que a superfície HLE cobre",
        paragraphs: [
          "Por cima dessa maquinaria, as bibliotecas de firmware fornecem memória direta e flexível, handles de módulo, pthreads, sincronização, arquivos, savedata, fibras, fontes, PNG, o relógio, controles, AudioOut, AJM, NGS2, ACM, AvPlayer, APR e AMPR. Rede, SSL e a NP Web API mantêm o contexto e o tempo de vida das requisições e devolvem erros offline determinísticos. Diálogos que precisam de um shell do sistema terminam imediatamente com um resultado coerente e sem interface.",
          "A execução de validação de 10 de outubro passou a suíte HLE completa em ReleaseSafe, 606 de 606 testes. Essa contagem é a da suíte de firmware. Ela não registra, por si só, uma nova taxa de quadros nem uma nova partida terminada.",
        ],
      },
    ],
    works: [
      "Cálculo de NID, um registro de símbolos com versão e uma troca para a pilha do anfitrião em toda chamada de firmware.",
      "Chamadas System V do convidado no Windows, onde a convenção do anfitrião é Microsoft x64.",
      "Memória, arquivos, threads, savedata, mídia, codecs de áudio e o caminho de comandos APR/AMPR.",
      "Diálogos sem interface e um perfil de rede offline que não abre soquetes do anfitrião.",
    ],
    gaps: [
      "Bibliotecas que o título importa e que o PS5PCEM ainda não implementou continuam fazendo a importação falhar.",
      "O carregamento realmente sob demanda de um módulo que não estava no grafo publicado devolve um erro.",
      "Serviços de plataforma que precisam de um shell, de uma conta ou de um par de rede reais permanecem indisponíveis.",
    ],
  },

  ampr: {
    title: "Contadores AMPR",
    summary:
      "O AMPR no PS5PCEM é um modelo em software, local ao processo, dos comandos de contador e de conclusão do console. Cento e vinte e oito contadores aceitam armazenamentos, atualizações atômicas de campo, leituras em par e esperas mascaradas, na ordem de envio.",
    sections: [
      {
        heading: "Para que um título usa o AMPR",
        paragraphs: [
          "No console, o AMPR é o motor assíncrono que move dados de arquivo e atualiza contadores nos quais a CPU e a GPU podem esperar. Os jogos o usam para saber que uma leitura chegou, ou que uma passagem posterior pode começar, sem ficar em espera ativa numa variável compartilhada. O PS5PCEM não emula o bloco de hardware AMPR. Ele executa o fluxo de comandos que o título montou, dentro do processo, e informa a conclusão pela fila de eventos AMPR que o título registrou.",
          "O banco de contadores guarda 128 palavras de 32 bits. Um par é um contador de índice par mais a palavra seguinte, lido e escrito como um único valor de 64 bits. Um único lock cobre as duas metades e toda leitura-modificação-escrita, então um leitor não consegue observar um par rasgado. O acesso pode nomear o par inteiro, a palavra de 32 bits, qualquer uma das metades de 16 bits ou um dos quatro bytes.",
        ],
      },
      {
        heading: "Armazenamentos, esperas e marcas de tempo",
        paragraphs: [
          "Uma escrita é um armazenamento, um OR bit a bit, um AND com o complemento, um XOR ou uma adição modular, aplicada ao campo selecionado. Uma espera compara esse campo com uma referência sob uma máscara. As comparações são igual, maior, menor, diferente, um valor de sequência atingido e as formas com sinal de maior e menor. As comparações de sequência deslocam o bit de sinal do campo para o bit 63, de modo que a mesma regra vale em 8, 16, 32 e 64 bits.",
          "Uma espera que já está satisfeita conclui no lugar. Uma espera que não está satisfeita guarda o instantâneo do envio e retoma antes de escritas e eventos posteriores nesse fluxo, inclusive quando um envio posterior na mesma thread convidada fornece o valor. A API comum e a API _04_00 têm listas de argumentos separadas. As marcas de tempo são registradas com os comandos de contador. As consultas de tamanho de conclusão que os títulos importavam estão registradas, então essas chamadas resolvem.",
        ],
      },
      {
        heading: "O que esse caminho foi observado fazer",
        paragraphs: [
          "Vinte e dois testes focados de AMPR passam em ReleaseSafe, inclusive chamadas pela superfície real de exportação. A inicialização de Grand Theft Auto III realiza mais de 10,000 envios de leitura de arquivo APR e escreve mais de 350 eventos de conclusão AMPR, sem erro AMPR correspondente nesse caminho. Essa inicialização não chama, por si, a API de contadores. O trabalho dos contadores é coberto pelos testes e por títulos que de fato esperam os valores.",
          "Isto é cobertura de API para os comandos que o emulador executa. Não é um modelo em nível de ciclo do controlador de memória do console, e não afirma a temporização do hardware.",
        ],
      },
    ],
    works: [
      "Cento e vinte e oito contadores, com pares de 64 bits coerentes e campos de byte, de meia palavra e de palavra.",
      "Armazenamento, OR, AND com complemento, XOR e adição modular, além de esperas mascaradas e com sinal.",
      "Esperas bloqueadas que guardam o lugar no fluxo de comandos e retomam quando o valor chega.",
      "Conclusão ordenada entregue pela fila de eventos AMPR registrada.",
    ],
    gaps: [
      "WaitOnAddress continua sendo um espaço reservado.",
      "A temporização de hardware do bloco AMPR real não é reproduzida.",
      "Um comando de contador que o decodificador não reconhece não é tratado em silêncio como sucesso.",
    ],
  },

  apr: {
    title: "Identificadores e leituras de arquivo APR",
    summary:
      "O APR resolve um arquivo do título uma vez e depois carrega um identificador local ao processo nos buffers de comando seguintes. Leituras AMPR adiadas reabrem esse mesmo arquivo /app0 somente leitura sem manter um descritor do anfitrião para sempre.",
    sections: [
      {
        heading: "Identificadores em vez de caminhos",
        paragraphs: [
          "A API do acelerador não quer um caminho em todo comando. O título resolve um caminho, recebe um identificador compacto de arquivo e coloca esse identificador nos comandos de leitura que envia depois. O PS5PCEM guarda o caminho e o tamanho do arquivo junto ao identificador. A tabela é local ao processo. Caminhos do anfitrião não são devolvidos ao convidado.",
          "Os arquivos vêm da montagem /app0 somente leitura do título. Uma entrada resolvida pode ser reaberta quando uma leitura adiada executa, então o emulador não precisa segurar todo descritor durante a vida inteira do processo. A tabela em cache guarda até 64 arquivos.",
        ],
      },
      {
        heading: "Buffers de comando",
        paragraphs: [
          "Um envio é um buffer de comandos do convidado, não uma única chamada de leitura. O PS5PCEM aceita até 32 buffers de comando vivos. Cada buffer é limitado: 32 leituras, 32 escritas, 32 mapas, 32 registros de conclusão e 128 operações. Até 64 envios podem estar em curso, e um pool automático guarda oito buffers. Uma leitura nomeia o identificador do arquivo, um destino convidado, um tamanho e um deslocamento no arquivo, e pode nomear um endereço que recebe a contagem de bytes.",
          "O leitor rejeita um identificador desconhecido, um arquivo ausente, um buffer de comando curto ou desalinhado e um pedido que sairia do arquivo ou do destino. Uma única leitura é limitada a 4 GiB, que é o limite da interface, não uma promessa de que um título emita leituras desse tamanho. Comandos de mapa usam o tamanho de página AMM de 16 KiB que o convidado espera.",
        ],
      },
      {
        heading: "Como o APR encontra o AMPR",
        paragraphs: [
          "O APR é dono da tabela de arquivos e do tempo de vida do buffer de comandos. O AMPR é dono dos contadores, das esperas e dos eventos de conclusão que dizem ao título que o trabalho terminou. Um título pode enfileirar muitas leituras de arquivo e depois esperar um contador que o comando de conclusão atualiza. A primeira inicialização de Grand Theft Auto III é o grande caso observado: as leituras passam por esse caminho, e os eventos de conclusão voltam pela fila AMPR.",
          "A E/S assíncrona do kernel, a outra API de arquivo, é uma página à parte. O APR é o fluxo de comandos do acelerador. A API de lote do kernel é a lista de pedidos no estilo POSIX.",
        ],
      },
    ],
    works: [
      "Identificadores de arquivo locais ao processo para caminhos /app0 somente leitura, com o tamanho retido para leituras posteriores.",
      "Buffers de comando limitados para leituras, escritas, mapas e registros de conclusão.",
      "Leituras adiadas que reabrem o mesmo arquivo do título.",
      "Rejeição verificada de arquivos desconhecidos, estouro e buffers malformados.",
    ],
    gaps: [
      "O caminho é uma execução em software do buffer de comandos, não o motor de DMA do console.",
      "Arquivos graváveis de pacote ficam fora de /app0. Os saves passam pela montagem de savedata.",
      "Um arquivo que o resolvedor não viu não pode ser inventado a partir de um identificador nu.",
    ],
  },

  memory: {
    title: "Memória direta, memória flexível e pools",
    summary:
      "Endereços convidados são endereços reais do anfitrião. A memória direta é um pool físico compartilhado e esparso mapeado nesse espaço, e o MemoryPool acrescenta reserva, commit e operações em lote sobre o mesmo suporte.",
    sections: [
      {
        heading: "O endereço convidado é o endereço do anfitrião",
        paragraphs: [
          "O código x86-64 convidado roda nativamente e contém endereços absolutos, então o PS5PCEM não pode realocar o processo para uma alocação arbitrária. O módulo de memória reserva o layout do console antes de qualquer módulo ser carregado. A janela gerenciada pelo sistema começa em 0x40000 e vai até pouco menos de 32 GiB. Em seguida vêm as janelas reservadas pelo sistema e as de dispositivo. A janela de usuário no Windows e no Linux vai de 0x10_0000_0000 a 0xFC_0000_0000, 944 GiB de espaço de endereçamento. O macOS começa essa janela mais alto e obtém 560 GiB.",
          "Esses intervalos são reservas, não RAM com commit. As páginas recebem commit em unidades de 16 KiB quando um mapeamento é criado, e desmapear faz decommit delas enquanto a reserva externa permanece. Outra alocação do anfitrião não pode tomar o endereço convidado entre os usos.",
        ],
      },
      {
        heading: "Memória direta e flexível",
        paragraphs: [
          "Memória direta é o nome que o convidado dá à memória física de vídeo. O título reserva um intervalo físico e depois o mapeia. Os dois passos são separados. O mapeamento verifica que o intervalo físico inteiro foi reservado, traduz a proteção de CPU e de GPU e ou faz commit do endereço fixo exato ou procura uma lacuna alinhada. O mesmo deslocamento físico pode ser mapeado em vários endereços virtuais, e esses aliases são coerentes porque compartilham um único objeto de suporte esparso.",
          "Um mapa fixo num intervalo que o título já reservou faz commit dentro da reserva. Liberar a reserva antes derrubaria a reivindicação do título sobre as partes que ele ainda não mapeou. A memória física é liberada no formato que o título pede, que pode ser um buraco no meio ou um trecho de várias reservas. A memória flexível usa a mesma tabela de espaço de endereçamento, com um orçamento padrão da plataforma de 4 GiB, e busca a janela gerenciada pelo sistema a partir de 0x02_0000_0000 antes de recorrer à janela de usuário.",
        ],
      },
      {
        heading: "MemoryPool e o commit no Windows",
        paragraphs: [
          "As seis exportações MemoryPool da libkernel reservam uma arena virtual, expandem a capacidade física, fazem commit e decommit do suporte compartilhado, executam lotes ordenados e informam estatísticas de bloco. Blocos doados não podem ser mapeados como memória direta comum nem liberados enquanto têm commit. Commit, decommit, proteção e mudanças de tipo em lote funcionam. O MOVE em lote continua sem suporte e devolve um erro em vez de fingir que os blocos se moveram.",
          "No Windows, visões alinhadas de memória direta compartilham visões de seção de 64 KiB. Envios temporários, readbacks e páginas convidadas de 16 KiB, portanto, não se tornam, cada um, uma carga de commit própria e sempre crescente. Consultas de uma reserva usam o registro de consulta virtual de 72 bytes do convidado e informam intervalos semiabertos com os bits de proteção originais.",
        ],
      },
    ],
    works: [
      "Janelas de endereço convidado fixas, com commit em páginas de 16 KiB e liberadas sem abrir mão da reserva.",
      "Aliases coerentes de um mesmo deslocamento físico de memória direta.",
      "Memória flexível com o orçamento padrão de 4 GiB e desmapeamentos fixos, sem sobrescrita e parciais.",
      "Reserva, expansão, commit, decommit, estatísticas e lotes ordenados do MemoryPool, exceto MOVE.",
    ],
    gaps: [
      "O MOVE em lote do MemoryPool não tem suporte, de forma explícita.",
      "Liberar um intervalo que o título não possui continua sendo um erro.",
      "As reservas são virtuais. Só as páginas que o título mapeia consomem commit do anfitrião.",
    ],
  },

  savedata: {
    title: "Savedata",
    summary:
      "Um slot de save montado vira um /savedata0 gravável. O título usa a API de arquivo comum, e a execução seguinte encontra os mesmos arquivos sob o código de produto que o título publica.",
    sections: [
      {
        heading: "Onde um save vive",
        paragraphs: [
          "A instalação do jogo é somente leitura, pode ficar em mídia removível e é substituída por inteiro quando recebe patch. Um save precisa sobreviver aos três casos. O PS5PCEM guarda os slots em savedata/<titleId>/<slot>/ sob o diretório inicial do emulador, indexados pelo código de produto que o título informa. Dois dumps do mesmo jogo compartilham saves. Dois jogos diferentes não.",
          "O nome do slot vem do convidado e é saneado antes de virar um diretório. Separadores, os dois-pontos da unidade e vínculos de diretório pai viram sublinhados. Descartar esses caracteres faria dois nomes diferentes caírem no mesmo diretório. Um nome que não pode ser diretório de forma alguma recua para um nome fixo, porque perder o save é pior do que colocá-lo num lugar previsível.",
        ],
      },
      {
        heading: "Montagem e verificações de existência",
        paragraphs: [
          "Uma montagem resolve o slot e aponta /savedata0 para ele. Criar um slot ausente só acontece quando o título pediu um. Uma sondagem de um save que o título nunca escreveu recebe um resultado de ausência, que é o que o título espera. Tudo o que acompanha o título permanece somente leitura. A montagem do save é o lugar gravável.",
          "A existência é respondida a partir do caminho de metadados, não pela abertura do arquivo. Uma montagem que só tinha sucesso na hora de abrir fazia toda verificação de existência falhar, e Jets 'n' Guns 2 reescrevia o perfil a cada execução por causa disso. Listar os slots que um título escreveu também tem resposta. A montagem ainda informa se abriu um save existente ou criou um novo. A API de save em formato de bloco usa um blob separado por título sob sce_sdmemory, carregado quando o título o reserva e escrito quando o título pede uma sincronização.",
        ],
      },
      {
        heading: "Slots incompletos",
        paragraphs: [
          "A descoberta na inicialização esconde slots interrompidos que contêm só metadados de firmware ou arquivos vazios de preparação. Cat Quest III tinha um slot de configuração reproduzido apenas com path.txt. O título então falhava num Data.dat ausente e esperava para sempre depois do quadro de inicialização. A busca agora ignora esse slot incompleto e continua.",
          "O lançador agrupa todo slot local por ID de título na página Saves, inclusive saves escritos por outro cartão da biblioteca. Uma compilação de desenvolvimento sob zig-out resolve o diretório inicial do emulador para a raiz do repositório. Uma compilação empacotada usa o próprio diretório. Execuções pela linha de comando e pelo lançador do mesmo pacote portanto compartilham uma única raiz de saves.",
        ],
      },
    ],
    works: [
      "Montagens /savedata0 graváveis indexadas por ID de título, com nomes de slot saneados.",
      "Verificações de existência, listagem de slots e um informe de se a montagem criou o save.",
      "Um blob sce_sdmemory por título para a API de save em formato de bloco.",
      "Ocultação de slots interrompidos que não contêm carga real de save.",
    ],
    gaps: [
      "Os saves são diretórios do anfitrião. O diálogo de dados de save do console e a sincronização na nuvem não são apresentados.",
      "Um slot que o título não pediu para criar é informado como ausente.",
      "Troféus, atividades e outros registros apoiados em conta ficam fora desta montagem.",
    ],
  },

  fonts: {
    title: "Renderização de fontes",
    summary:
      "A libSceFont rasteriza faces TrueType e OpenType fornecidas pelo título com FreeType. Pedidos de fonte do sistema usam o substituto Noto Sans incluído para latim, grego e cirílico.",
    sections: [
      {
        heading: "Faces, escala e tempo de vida",
        paragraphs: [
          "Um título abre uma biblioteca de fontes, cria uma face a partir de bytes que ele fornece ou de um pedido de fonte do sistema, e então pede métricas e cobertura de glifos. Cada face guarda a própria escala, a escala de renderização, a inclinação e o tempo de vida. Fechar a biblioteca libera as faces dela, e o encerramento do processo limpa o estado das fontes. Os bytes da fonte são copiados na abertura, então um desmapeamento posterior do buffer de origem do título não pode invalidar o rasterizador.",
          "Noto Sans é um substituto, não uma cópia idêntica byte a byte de toda fonte de firmware. Cobre latim, grego e cirílico. Uma face que o título fornece pode conter outros glifos, inclusive CJK, e esses contornos são usados. O próprio pedido de fonte do sistema não substitui uma face CJK.",
        ],
      },
      {
        heading: "Glifos, kerning e atlas",
        paragraphs: [
          "O caminho de glifos devolve métricas reais, layout horizontal, kerning básico de pares, cobertura com antisserrilhamento, recorte e descritores de resultado de renderização. Um cache limitado de glifos evita rasterizar o mesmo caractere de novo, e um cache separado de pares reutiliza o kerning entre tamanhos. As escritas verificam permissões de CPU e invalidam as vigias de página da GPU antes de tocar um atlas de textura.",
          "Um escalar Unicode válido que a face não contém usa o contorno .notdef da face, inclusive códigos de controle encontrados enquanto um título monta um intervalo completo de atlas. Esse caminho de glifo ausente é o que permite a Jurassic Park Classic Games Collection terminar de montar o atlas de fontes. Escalares Unicode inválidos e identificadores explícitos de glifo fora do intervalo ainda devolvem um erro. A cobertura é escrita em pixels de um a quatro bytes.",
        ],
      },
      {
        heading: "O que o layout de texto deixa com o título",
        paragraphs: [
          "Muitos títulos nunca chamam a libSceFont. Eles desenham texto com a fonte do próprio motor, e esta implementação não muda esses pixels. O caminho HLE é para títulos que pedem ao firmware para rasterizar.",
          "A modelagem de texto, o layout bidirecional, o peso sintético, a substituição de fonte de sistema CJK, a seleção de face em coleção e as APIs de mais alto nível FontWriting e String não estão implementados. As verificações focadas ficam atrás de zig build test-hle com o filtro de fontes.",
        ],
      },
    ],
    works: [
      "Rasterização com FreeType de faces TrueType e OpenType fornecidas pelo título.",
      "Substituto Noto Sans para pedidos de fonte do sistema em latim, grego e cirílico.",
      "Métricas, layout horizontal, kerning de pares, inclinação, recorte e um cache de glifos.",
      "Reserva .notdef para escalares Unicode ausentes, o que desbloqueia o atlas de Jurassic Park.",
    ],
    gaps: [
      "A modelagem de texto, o layout bidirecional e as APIs FontWriting estão ausentes.",
      "Pedidos de fonte do sistema não substituem uma face CJK.",
      "Títulos que desenham texto inteiramente no próprio motor não usam este caminho.",
    ],
  },

  png: {
    title: "Codificação e decodificação de PNG",
    summary:
      "O codificador de PNG escreve arquivos RGB ou RGBA de 8 bits a partir de pixels RGBA ou BGRA com pitch. O decodificador lê imagens não entrelaçadas em escala de cinza, paleta, RGB e RGBA para um buffer convidado verificado.",
    sections: [
      {
        heading: "Codificação",
        paragraphs: [
          "Os títulos entregam ao codificador um retângulo de pixels que pode ter um pitch de linha maior que a largura. O PS5PCEM aceita RGBA e BGRA com pitch e escreve um PNG padrão RGB ou RGBA de 8 bits. Quem chama seleciona os filtros de linha de varredura e um nível de compressão de 0 a 9. As escritas de saída são limitadas pelo buffer que o título forneceu.",
          "O codificador é uma implementação em software do formato de arquivo. Ele não chama uma biblioteca de imagem do sistema e não afirma uma velocidade específica diante do codificador de hardware do console.",
        ],
      },
      {
        heading: "Decodificação",
        paragraphs: [
          "A libScePngDec analisa os metadados PNG e decodifica imagens não entrelaçadas em escala de cinza, paleta, RGB e RGBA para buffers RGBA ou BGRA convidados e verificados. Os filtros de linha de varredura são aplicados, e a transparência de paleta é respeitada. O destino é verificado antes de os pixels serem escritos.",
          "Entrada entrelaçada Adam7 é reconhecida e recusada, em vez de ser decodificada numa imagem errada. Ícones e capturas entrelaçados, portanto, não se transformam em silêncio num buffer embaralhado.",
        ],
      },
      {
        heading: "Onde isso se encaixa",
        paragraphs: [
          "PNG é um dos pequenos serviços de firmware que um título encontra durante a inicialização: ícones, atlas e miniaturas de save. É independente do caminho de filme do AvPlayer, que usa FFmpeg para H.264, e independente do rasterizador de fontes.",
          "O relatório de firmware de 9 de outubro agrupa o codificador com o relógio e as consultas de tamanho de conclusão do AMPR. Esses três fecharam lacunas de importação. Eles não mudam, por si sós, um tempo de quadro medido.",
        ],
      },
    ],
    works: [
      "Entrada RGBA e BGRA com pitch para PNG RGB ou RGBA de 8 bits nos níveis de compressão 0–9.",
      "Decodificação de escala de cinza, paleta, RGB e RGBA não entrelaçados, inclusive filtros e alfa de paleta.",
      "Buffers de destino verificados e saída limitada do codificador.",
    ],
    gaps: [
      "PNG entrelaçado Adam7 é reconhecido e não é decodificado.",
      "16 bits e chunks auxiliares exóticos ficam fora do subconjunto implementado.",
      "Não há bloco de PNG em hardware. Os dois lados rodam na CPU.",
    ],
  },

  rtc: {
    title: "Relógio de tempo real",
    summary:
      "O RTC verifica campos de calendário, converte FILETIME do Windows e faz aritmética verificada de ticks. O convidado vê um relógio coerente sem a conversão de horário de verão do anfitrião.",
    sections: [
      {
        heading: "O que as chamadas fazem",
        paragraphs: [
          "Os títulos pedem ao firmware a hora atual, uma conversão entre contagens de ticks e campos de calendário, e uma aritmética que não pode dar a volta numa data sem sentido. O PS5PCEM valida os campos de calendário, converte de e para FILETIME e verifica a aritmética de ticks para que um estouro seja um erro em vez de um valor truncado.",
          "Consultas UTC e locais devolvem valores coerentes a partir do relógio do anfitrião. A conversão que aplicaria as regras de horário de verão do anfitrião a uma hora local do convidado não está implementada. Um título que só precisa de um carimbo monotônico ou UTC ainda recebe uma resposta utilizável.",
        ],
      },
      {
        heading: "Por que ele é separado do tempo de áudio",
        paragraphs: [
          "O ritmo do áudio usa o dispositivo de áudio do anfitrião e o relógio de buffer dele. O AvPlayer usa o próprio relógio de mídia. O RTC é o relógio de parede que o título lê para saves, temporizadores e a interface de calendário. Misturar esses relógios é o modo pelo qual um título parece travar ou carimbar um save com a hora zero.",
          "O relatório de 9 de outubro acrescentou a validação, a conversão de FILETIME e a aritmética verificada junto com o codificador de PNG e três exportações de tamanho de conclusão do AMPR. A hora de rede e um ajuste de relógio visível ao usuário não fazem parte desta superfície.",
        ],
      },
    ],
    works: [
      "Validação de campos de calendário e aritmética verificada de ticks.",
      "Conversão de FILETIME.",
      "Consultas UTC e locais coerentes a partir do relógio do anfitrião.",
    ],
    gaps: [
      "A conversão do horário de verão do anfitrião sobre a hora local do convidado está ausente.",
      "Não há interface emulada de ajustes do sistema para o relógio.",
      "A sincronização de hora pela rede não é feita.",
    ],
  },

  fibers: {
    title: "Fibras e threads de nível de usuário",
    summary:
      "No Windows, cada fibra da libSceFiber é uma fibra real do Windows, então uma troca preserva os registradores convidados e a pilha convidada. Threads de nível de usuário começam pelo mesmo caminho de pthread.",
    sections: [
      {
        heading: "Por que uma fibra não pode ser uma operação vazia",
        paragraphs: [
          "O código convidado roda como código de máquina nativo. Uma troca de fibra tem de retomar os registradores exatos e a pilha exata, com quadros de pilha do anfitrião e do convidado misturados nessa pilha. Devolver sucesso de sceFiberSwitch sem trocar deixaria o título continuar na pilha errada e corromper os dois lados.",
          "O PS5PCEM apoia cada fibra convidada inicializada com uma fibra do Windows. sceFiberRun, sceFiberSwitch e sceFiberReturnToThread usam esse mecanismo. A thread que chamou sceFiberRun é a fibra raiz. O registro público SceFiber de 128 bytes guarda as assinaturas de ABI, o estado, o argumento de entrada, o nome e o intervalo de contexto fornecido por quem chamou.",
        ],
      },
      {
        heading: "De quem é a pilha",
        paragraphs: [
          "O título fornece um buffer de contexto, e esse buffer fica registrado no objeto de ABI. O Windows é dono da pilha real. Usar o buffer do título como pilha nativa do Windows pularia a página de guarda e a contabilidade de unwind que o sistema operacional exige. O contexto mínimo que o registro de firmware espera ainda é verificado, junto com o alinhamento e as assinaturas de início e de fim.",
          "sceFiberGetSelf, a finalização, as verificações de posse entre threads e o reinício em tempo de execução estão implementados. O backend existe no alvo de execução nativa Windows x86-64. Outros anfitriões podem compilar o resto do emulador, e este caminho de troca não está disponível neles.",
        ],
      },
      {
        heading: "Threads de nível de usuário",
        paragraphs: [
          "A inicialização e a finalização da libSceUlt têm sucesso para que o sistema de tarefas de um título possa começar. Tempos de execução, filas de espera, pools de dados de fila, mutexes, semáforos e filas guardam estado no lado do anfitrião, indexado pelos objetos que o título alocou. Os próprios itens de trabalho começam pelo caminho de pthread já existente. Consultas de tamanho da área de trabalho devolvem os tamanhos alinhados que essas criações esperam.",
          "Filas de eventos de borda de usuário do kernel compartilham a mesma espera consciente de sequência da sincronização pthread. O filtro -13 do VideoOut e o filtro -14 de gráficos seguem essa fila e preservam o identificador e os dados de usuário de cada registro. ULT é cola de escalonamento. Não acrescenta um segundo emulador de CPU.",
        ],
      },
    ],
    works: [
      "Fibras do Windows para sceFiberRun, sceFiberSwitch e sceFiberReturnToThread.",
      "Assinaturas de ABI, verificações de posse e uma pilha pertencente ao anfitrião, com página de guarda.",
      "Inicialização do ULT, filas, mutexes, semáforos e itens de trabalho apoiados em pthread.",
      "Filas de eventos de borda de usuário compartilhadas com a conclusão do VideoOut e dos gráficos.",
    ],
    gaps: [
      "A troca de fibra existe no Windows x86-64. Outros sistemas operacionais anfitriões não executam código convidado nativamente.",
      "Uma fibra não é uma thread de hardware escalonada de forma preemptiva.",
      "O ULT não implementa um interpretador separado para os corpos dos workers.",
    ],
  },

  aio: {
    title: "Leituras assíncronas de arquivo do kernel",
    summary:
      "A API de AIO do kernel aceita um lote de leituras e devolve um identificador. O PS5PCEM executa o lote no momento do envio, o que a interface permite, e o título recolhe um resultado já terminado.",
    sections: [
      {
        heading: "A interface",
        paragraphs: [
          "Motores que transmitem recursos enviam uma lista de leituras e depois perguntam se o lote terminou. Um título feito assim não consegue carregar um arquivo sem a API. O PS5PCEM aceita o lote, executa as leituras quando ele é enviado e guarda os resultados sob o identificador. Uma consulta posterior observa um lote que já foi concluído.",
          "Concluir imediatamente é um desfecho legal da interface. Quem chama é obrigado a tratar um pedido que terminou antes da consulta. O emulador não dorme para imitar a latência do dispositivo e não informa o lote como falho para parecer mais assíncrono.",
        ],
      },
      {
        heading: "Como isso difere do APR",
        paragraphs: [
          "O AIO do kernel é o lote no estilo POSIX sobre descritores de arquivo que o título já abriu. O APR é o caminho do acelerador: caminhos viram identificadores, e os comandos vivem num buffer de comandos AMPR com contadores e eventos de conclusão. Um título pode usar qualquer um dos dois, ou ambos.",
          "Os dois caminhos leem a instalação do título como dados que o emulador não produziu. Os limites são verificados. Um buffer curto ou um descritor inválido é um retorno de erro, não uma escrita parcial apresentada como sucesso.",
        ],
      },
    ],
    works: [
      "Envio em lote, um identificador e uma conclusão que o título pode recolher.",
      "Leituras feitas contra os arquivos que o título abriu.",
      "Conclusão imediata, que a API convidada permite.",
    ],
    gaps: [
      "Não há uma thread de E/S separada imitando a latência do disco.",
      "O escalonador de prioridade e de banda do console não é modelado.",
      "Buffers de comando APR são uma API diferente e não são reescritos como AIO do kernel.",
    ],
  },

  agc: {
    title: "AGC e o fluxo de comandos PM4",
    summary:
      "Um título de PS5 monta pacotes de GPU na própria memória e envia o buffer. O PS5PCEM decodifica esse fluxo PM4, mantém o estado dos registradores e executa desenhos e dispatches em ordem.",
    sections: [
      {
        heading: "O fluxo é a API de gráficos",
        paragraphs: [
          "O título não precisa chamar uma função de desenho de alto nível para cada triângulo. Ele escreve pacotes: atualizações de registrador, desenhos, dispatches, fences e flips. Seja qual for a camada que produziu o buffer, a GPU vê o mesmo fluxo. O decodificador nomeia os pacotes cujos opcodes têm um significado documentado e deixa os outros como números. Um nome inventado num rastreio seria pior do que um opcode.",
          "O comprimento do corpo do pacote é armazenado com viés de um, então um corpo vazio não pode ser codificado. Cada passo verifica os próprios limites. Um corpo que não cabe é informado. Ele não é cortado, porque um corpo cortado deslocaria todo pacote seguinte e o rastreio mentiria.",
        ],
      },
      {
        heading: "Estado, esperas e buffers indiretos",
        paragraphs: [
          "O estado dos registradores sobrevive entre envios, inclusive escritas de zero. O executor aplica listas diretas de registradores, listas indiretas nativas e legadas, acquire e release, esperas de 32 bits e de 64 bits, escritas, eventos e SetFlip. Uma espera que não foi atingida devolve bloqueio e a palavra exata de onde retomar. A memória convidada não é modificada para fabricar progresso.",
          "Buffers indiretos são seguidos de forma recursiva, tanto a forma comum de 4 dwords quanto a forma condicional de 14 dwords. Pacotes de encadeamento encerram o pai. O aninhamento para em dezesseis frames. Um filho bloqueado devolve um caminho fixo da raiz até a folha, então retomar não reproduz desenhos que já aconteceram. O escalonador copia cada buffer de comandos raiz e os buffers indiretos que consegue alcançar, então o título pode reciclar a arena enquanto uma espera ainda está bloqueada.",
        ],
      },
      {
        heading: "Dos registradores a um desenho",
        paragraphs: [
          "Num desenho ou num dispatch, o instantâneo dos registradores vira recursos tipados: descritores de buffer e de amostrador de 128 bits, descritores de imagem de 256 bits, oito alvos de cor, profundidade e stencil, viewports, scissor, cull, mistura e os campos de swizzle e de MSAA da PS5. Escritas ausentes de controle de cor e de controle de recorte herdam os padrões do AGC. Um desligamento explícito continua desligado. Dois workers de CPU preparam comandos de gráficos e de computação. Um dono Vulkan os envia para que a execução e a conclusão permaneçam ordenadas.",
          "Os metadados do shader fornecem as tabelas de recursos e os registradores de user data. A proveniência escalar percorre um prefixo limitado do shader, carrega só a memória convidada que o prefixo de fato toca e para num desvio desconhecido em vez de inventar um descritor. O resultado é o que o tradutor e o backend Vulkan consomem.",
        ],
      },
    ],
    works: [
      "Decodificação PM4 com comprimentos de corpo enviesados e limites rígidos em todo pacote.",
      "Bancos de registradores persistentes, esperas bloqueadas e buffers indiretos recursivos até dezesseis frames.",
      "Buffers tipados, imagens, alvos de cor, profundidade, viewport, mistura e estado de MSAA na hora do desenho.",
      "Dois workers de preparação e um dono ordenado do envio Vulkan.",
    ],
    gaps: [
      "Um opcode sem significado documentado permanece sem nome.",
      "Uma espera bloqueada nunca é liberada pela escrita de um valor falso de fence.",
      "Camadas, metadados e algumas operações de imagem ainda estão incompletos. Esses assuntos têm páginas próprias.",
    ],
  },

  rdna2: {
    title: "Shaders RDNA2 para SPIR-V",
    summary:
      "Os shaders de PlayStation 5 são código de máquina RDNA2. O PS5PCEM decodifica as famílias GFX10, monta um grafo de fluxo de controle e rebaixa as operações suportadas para SPIR-V 1.5 destinado ao Vulkan.",
    sections: [
      {
        heading: "Decodificação",
        paragraphs: [
          "O frontend reconhece as codificações escalares SOP1, SOP2, SOPK, SOPC, SOPP e SMEM, as codificações vetoriais VOP1, VOP2, VOP3, VOP3P, VOPC e VINTRP, e MUBUF, MTBUF, FLAT, DS, MIMG e EXP. Corpos arquiteturais de uma palavra e de duas palavras, literais opcionais e palavras de endereço NSA de MIMG são preservados, então um opcode sem suporte mais adiante não dessincroniza o fluxo.",
          "Um opcode não reconhecido dentro de uma família conhecida vira uma instrução sem suporte que ainda carrega a família, o opcode numérico, as palavras brutas e um motivo. Palavras de extensão SDWA e DPP guardam os seletores, os modificadores e as máscaras de lane. O decodificador não renomeia um opcode que não conhece.",
        ],
      },
      {
        heading: "Fluxo de controle e a IR tipada",
        paragraphs: [
          "Alvos de desvio direto dividem o programa em blocos. Fusões para a frente, regiões aninhadas e arestas para trás são registradas à parte. O tradutor em uso pode emitir a partir das instruções decodificadas. Definir PS5_GPU_SHADER_IR=1 seleciona a IR tipada legalizada. Definir PS5_GPU_SSA=1 acrescenta estado de phi e de def-use, dobramento de constantes e eliminação iterativa de código morto.",
          "Seleções acíclicas viram fusões estruturadas de SPIR-V com valores phi nas junções. Laços naturais viram fusões de laço. Fluxo de controle irredutível vira um despachante por índice de bloco que preserva os predicados VCC e EXEC, então uma lane que deveria ter pulado uma escrita ainda a pula. Máscaras EXEC são reutilizadas dentro de um bloco SPIR-V e descartadas em todo rótulo, porque um valor de um lado de um desvio não domina o outro lado.",
        ],
      },
      {
        heading: "O que a suíte de 9 de outubro mediu",
        paragraphs: [
          "O ponto de verificação das chamadas escalares de 9 de outubro passou 259 de 259 testes de análise de GPU e 232 de 232 testes Vulkan. A suíte RDNA2 passou 271 de 281, com as mesmas dez falhas já existentes e um vazamento informado. Essas sondas de instrução não estabelecem uma nova taxa de quadros para um jogo.",
          "Cargas de imagem de vários texels, gathers horizontais, shaders de fetch NGG e chamadas escalares limitadas estão implementados como caminhos próprios e descritos nas próprias páginas. Armazenamentos e combinações de descritor que não estavam no conjunto medido continuam sem suporte.",
        ],
      },
    ],
    works: [
      "Decodificação das famílias escalar, vetorial, de memória, de imagem e de exportação do GFX10, inclusive literais e palavras NSA.",
      "Seleções estruturadas, laços naturais e um despachante para fluxo irredutível que preserva máscaras de lane.",
      "IR tipada opcional e limpeza SSA, selecionadas com variáveis de ambiente.",
      "SPIR-V 1.5 para as operações suportadas de ALU, memória, imagem, interpolação e exportação.",
    ],
    gaps: [
      "Dez falhas já existentes da suíte RDNA2 permanecem, além de um vazamento informado.",
      "Um opcode sem suporte interrompe esse rebaixamento. Ele não é substituído por uma operação adivinhada.",
      "Os testes de instrução não são um resultado de taxa de quadros.",
    ],
  },

  ngg: {
    title: "Shaders de vértice NGG",
    summary:
      "Programas de vértice NGG fundidos, inclusive um shader de fetch que continua com S_SETPC_B64, são traduzidos como um único estágio de gráficos. O programa de exportação guarda a própria janela de user data.",
    sections: [
      {
        heading: "Fetch e exportação são programas diferentes",
        paragraphs: [
          "Um desenho de PlayStation 5 muitas vezes divide o trabalho de vértice num shader de fetch e num shader de exportação. O shader de fetch termina o prólogo de atributos saltando para o código de exportação com S_SETPC_B64. O PS5PCEM trata essa continuação como parte do mesmo programa de vértice e traduz o resultado fundido.",
          "O programa de exportação NGG não toma emprestado o banco de user data do shader de geometria. Os registradores escalares dele são inicializados a partir do próprio instantâneo de user data, em s8 para o programa de exportação. Supor que a tabela de recursos vive em s0:s1 é um erro que o tradutor evita de propósito. O ponteiro da tabela vem do par user-SGPR de ShaderResourceTable que os metadados declararam.",
        ],
      },
      {
        heading: "Atributos de vértice",
        paragraphs: [
          "O shader de fetch e os user data estendidos são resolvidos junto com as tabelas embutidas de buffer de vértices e de atributos de vértice. Até 32 semânticas de entrada guardam o índice semântico, o VGPR de hardware em que caem, o formato de atributo do AGC, o deslocamento em bytes, a taxa de instância e o descritor de buffer de 128 bits.",
          "A busca de atributo usa o byte semântico, não o byte de mapeamento de hardware. Um par de tabelas incompleto ou um índice fora do domínio suportado é rejeitado antes de qualquer leitura convidada. Exportações PARAM do estágio de vértice viram as entradas de interpolação do fragmento, que é como um shader de pixel posterior vê os varyings.",
        ],
      },
      {
        heading: "Chamadas para um shader de fetch",
        paragraphs: [
          "Um shader de fetch externo verificado também pode ser ligado a partir de S_SWAPPC_B64 ou de S_CALL_B64 quando o par de user data da chamada ainda guarda o endereço que o AGC registrou. O corpo do fetch é decodificado até o S_SETPC_B64 de retorno, e esse retorno precisa ler o par de ligação de quem chamou. O detalhe de quais chamadas são legais está na página de chamadas escalares.",
          "A tradução NGG fundida é o que permite que cenas tridimensionais passem de um prólogo de fetch que antes parava o decodificador. Ela não fornece, por si, um shader de pixel ausente nem um alvo de renderização ausente.",
        ],
      },
    ],
    works: [
      "Programas de vértice NGG fundidos, inclusive prólogos de fetch que terminam em S_SETPC_B64.",
      "Uma janela de user data separada para o programa de exportação.",
      "Até 32 semânticas de vértice, com formatos, deslocamentos, taxas de instância e descritores de buffer.",
      "Exportações PARAM ligadas às entradas de interpolação do fragmento.",
    ],
    gaps: [
      "Um shader de fetch cujo retorno não corresponde ao par de ligação de quem chamou não é ligado.",
      "Chamadas dinâmicas gerais continuam sem suporte. Veja as chamadas escalares.",
      "Geometria que depende de uma exportação ou de um interpolante sem suporte ainda falha nesse desenho.",
    ],
  },

  mimg: {
    title: "Cargas de imagem de vários texels",
    summary:
      "IMAGE_LOAD_BY2, BY4, PCK2 e PCK4, inclusive as formas com mip explícito, executam para os formatos 2D nativos medidos. Uma carga BY devolve texels consecutivos. Uma carga PCK empacota os bits brutos deles num registrador.",
    sections: [
      {
        heading: "BY e PCK",
        paragraphs: [
          "Uma carga BY escreve texels consecutivos em VGPRs separados, com os canais ordenados dentro de cada texel. Uma carga PCK empacota os bits brutos dos componentes num VGPR de 32 bits, com o primeiro texel nos bits menos significativos. Componentes com sinal são truncados à largura de armazenamento. Componentes UNORM são reconstruídos com conversão por arredondamento para par.",
          "O primeiro texel é alinhado para baixo a um grupo de dois ou de quatro em X. O teste de limites usa a coordenada original, sem alinhamento: o grupo inteiro precisa caber antes do alinhamento, Y precisa estar no intervalo e o mip pedido precisa existir. Um grupo inválido zera todo registrador de resultado e deixa destinos não relacionados intocados. Coordenadas inválidas são substituídas por operandos seguros de busca antes de o Vulkan as ver.",
        ],
      },
      {
        heading: "Quais formatos",
        paragraphs: [
          "BY2 com DMASK 0x3 cobre R8 e R16 em UNORM, SNORM, UINT, SINT e R16 FLOAT. BY2 com DMASK 0xF cobre RG8 UNORM, SNORM, UINT e SINT. BY4 com DMASK 0xF cobre R8 nesses quatro tipos numéricos. PCK2 com DMASK 0x1 cobre R8, R16 e RG8 UNORM, UINT e SINT. PCK4 com DMASK 0x1 cobre R8 UNORM, UINT e SINT. As variantes com mip explícito dessas cargas usam as mesmas listas de formato.",
          "O backend entrega à tradução o formato nativo exato. Bancos separados de imagem amostrada UINT e SINT mantêm os resultados inteiros com o tipo correto, ao lado dos bancos de ponto flutuante e de comparação. Coordenadas NSA, registradores de endereço e de destino sobrepostos e a máscara EXEC comum são preservados.",
        ],
      },
      {
        heading: "O que a mudança não é",
        paragraphs: [
          "O relatório de 9 de outubro é suporte compartilhado de shader e de backend. Ele não depende de um identificador de jogo nem de um hash de shader. Nenhum resultado de compatibilidade de jogo e nenhuma mudança de taxa de quadros são afirmados a partir destas cargas sozinhas.",
          "Armazenamentos, e combinações de formato ou de descritor que não estavam no conjunto medido, continuam sem suporte. Os gathers horizontais são a família de instruções vizinha e têm página própria.",
        ],
      },
    ],
    works: [
      "Cargas 2D medidas BY2, BY4, PCK2 e PCK4, com e sem mip explícito.",
      "Alinhamento de grupo, limites verificados e resultados zerados para um grupo inválido.",
      "Bancos separados de imagem amostrada inteira, para que UINT e SINT mantenham o tipo.",
      "Máscaras EXEC, coordenadas NSA e pares de registradores sobrepostos preservados.",
    ],
    gaps: [
      "Armazenamentos de imagem destas formas não estão implementados.",
      "Formatos e modos de descritor fora da tabela medida são rejeitados.",
      "Os testes não estabelecem um novo número de quadros por segundo para título algum.",
    ],
  },

  gather4h: {
    title: "Gathers horizontais",
    summary:
      "IMAGE_GATHER4H e IMAGE_GATHER4H_PCK reúnem um canal ao longo de um grupo horizontal de texels. O subconjunto direto 1D e 2D medido é coberto por 1,242 dispatches de GPU.",
    sections: [
      {
        heading: "O que a instrução devolve",
        paragraphs: [
          "Um gather vertical lê quatro texels em Y. A forma H os lê em X. GATHER4H escreve o canal selecionado desses texels. GATHER4H_PCK escreve o fluxo bruto empacotado de texels. A largura do destino segue DMASK, e os registradores que a instrução não possui permanecem inalterados.",
          "As bordas usam as regras de endereçamento do amostrador. Um texel que cai fora da imagem é tratado, em vez de ser lido de uma alocação vizinha. A sonda de 9 de outubro executou 1,242 dispatches de GPU sobre o subconjunto direto 1D e 2D medido.",
        ],
      },
      {
        heading: "O que fica de fora",
        paragraphs: [
          "A16, D16, R128, tabelas indiretas de recursos, visões de array, de cubo e de MSAA, e formatos comprimidos não fazem parte do subconjunto medido. Esses modos de descritor e de controle permanecem limitações explícitas.",
          "O trabalho de gather compartilha o tradutor e o caminho de imagem Vulkan com as cargas de vários texels. Ele não muda o endereçamento de detile e não afirma um resultado de taxa de quadros.",
        ],
      },
    ],
    works: [
      "IMAGE_GATHER4H e IMAGE_GATHER4H_PCK para os casos diretos 1D e 2D medidos.",
      "Larguras de destino segundo DMASK e preservação de registradores não relacionados.",
      "Tratamento de borda segundo o amostrador, verificado com 1,242 dispatches de GPU.",
    ],
    gaps: [
      "Array, cubo, MSAA, formatos comprimidos e vários modos de descritor não estão no subconjunto medido.",
      "A16, D16, R128 e tabelas indiretas permanecem limitações.",
      "Nenhuma taxa de quadros de um título é inferida da sonda.",
    ],
  },

  "scalar-calls": {
    title: "Chamadas escalares de shader",
    summary:
      "S_SWAPPC_B64 e S_CALL_B64 salvam um endereço de retorno completo e executam uma sub-rotina local limitada, inclusive um chamado que fica depois de ENDPGM. Um shader de fetch do AGC verificado pode ser ligado do mesmo modo.",
    sections: [
      {
        heading: "Chamada e retorno",
        paragraphs: [
          "O opcode SOP1 0x21 é S_SWAPPC_B64. O opcode SOPK 0x16 é S_CALL_B64, com o alvo em PC + 4 + sign_extend(SIMM16) * 4, o que inclui chamadas para trás. Os dois escrevem o endereço da instrução seguinte no par de SGPR de destino. Um S_SETPC_B64 correspondente retorna para lá. CALL deixa SCC e EXEC intocados.",
          "Um SWAPPC cujo destino é nulo continua sendo a continuação já existente de S_SETPC_B64. Alvos locais de SWAPPC podem ser resolvidos a partir de um GETPC mais uma soma ou uma subtração imediata de largura completa. O alvo é capturado mesmo se a instrução também escreve o registrador de ligação. Um chamado que vive depois de ENDPGM é decodificado até o retorno correspondente, dentro da alocação e dos limites de instrução. Uma continuação comum de hardware ainda para antes dos metadados finais.",
        ],
      },
      {
        heading: "Como a chamada é rebaixada",
        paragraphs: [
          "O grafo de fluxo de controle ganha arestas explícitas de chamada e de retorno. O chamado compartilha o estado de registradores de quem chamou e usa o despachante SPIR-V limitado. Uma chamada sem suporte não pode cair no caminho linear de fluxo de controle. A descoberta de recursos do anfitrião segue as chamadas e os retornos, então um descritor inicializado dentro do chamado continua visível.",
          "Cada chamada suportada possui um par de SGPR distinto e alinhado em par, de s0:s1 até s104:s105, com exatamente um retorno correspondente. Os chamados são aninhados ou sequenciais nos modos que o verificador permite. Alvos dinâmicos gerais, em que o destino é um valor arbitrário de tempo de execução, continuam sem suporte.",
        ],
      },
      {
        heading: "Shaders de fetch e a sonda",
        paragraphs: [
          "Um shader de fetch externo é ligado quando o par de user data inalterado da chamada corresponde ao endereço que o AGC registrou. O corpo do fetch é decodificado até o SETPC de retorno, e esse SETPC precisa ler o par de ligação de quem chamou. O cache de análise distingue um programa comum de um corpo de fetch, então uma inserção antiga de fetch não pode sobrescrever o retorno de uma sub-rotina local.",
          "Uma sonda de GPU de 42 dispatches verifica 21,504 palavras. O relatório de 9 de outubro não afirma um novo marco de jogo nem uma nova taxa de quadros a partir das chamadas sozinhas.",
        ],
      },
    ],
    works: [
      "S_SWAPPC_B64 e S_CALL_B64 com um endereço de retorno completo e um S_SETPC_B64 correspondente.",
      "Chamados aninhados e chamados colocados depois de ENDPGM, dentro dos limites já existentes.",
      "Ligação de um shader de fetch do AGC verificado cujo retorno lê a ligação de quem chamou.",
      "Uma sonda de 42 dispatches que cobre 21,504 palavras.",
    ],
    gaps: [
      "Alvos gerais de chamada dinâmica não têm suporte.",
      "Uma chamada precisa de um par de ligação alinhado em par e de um retorno correspondente.",
      "A sonda não é um resultado em quadros por segundo.",
    ],
  },

  vulkan: {
    title: "Renderizador Vulkan",
    summary:
      "O backend Vulkan carrega o driver em tempo de execução, exige Vulkan 1.2 e apresenta quadros convidados por uma swapchain. Alvos de renderização, imagens de armazenamento e pipelines permanecem residentes entre desenhos.",
    sections: [
      {
        heading: "Dispositivo e memória",
        paragraphs: [
          "O renderizador carrega ele mesmo o carregador Vulkan da plataforma, então a compilação não precisa dos cabeçalhos do Vulkan SDK. A inicialização pede Vulkan 1.2, a versão que aceita o SPIR-V 1.5 do tradutor, e prefere um dispositivo discreto com uma família de filas capaz de gráficos e de computação. Camadas de validação são pedidas em compilações de depuração quando estão instaladas.",
          "Um layout de descritores guarda 64 buffers de armazenamento, arrays separados de imagem amostrada 2D e 3D com 64 entradas, e imagens de armazenamento tipadas. Um anel de 512 conjuntos, uma arena de envio de 128 MiB e alvos de renderização convidados persistentes mantêm no dispositivo os recursos de um quadro. As traduções de gráficos usam um cache de 256 MiB e 1,024 entradas. Uma cena em fluxo tinha estourado o orçamento antigo de 64 MiB e traduzia os mesmos módulos de novo a cada quadro.",
        ],
      },
      {
        heading: "Pipelines e timelines",
        paragraphs: [
          "A compilação de pipelines usa dois workers por padrão. PS5_GPU_COMPILER_WORKERS pode definir de um a quatro. PS5_GPU_ASYNC_PIPELINES=0 volta à compilação síncrona e desliga o aquecimento de computação. O aquecimento reproduz, no cache do driver, módulos de computação já compilados na execução seguinte. Ele nunca faz dispatch deles e destrói os pipelines temporários. O cache do driver também é guardado em vulkan_pipeline_cache.bin, até 4 GiB. Um arquivo corrompido é descartado. Ele só pode afetar o tempo de inicialização.",
          "O perfil padrão de compatibilidade espera cada lote enviado. O escalonador de timeline, selecionado com PS5_GPU_TIMELINE_SCHEDULER=1, deixa vários lotes em curso e espera num readback real, num ponto de sincronização do convidado ou num anel de recursos esgotado. Um título, PPSA25872, ativa esse escalonador e a escrita de volta adiada de armazenamento pequeno por conta própria, depois de comparações medidas. O layout de imagem é rastreado por aspecto, mip e camada de array, e as barreiras vêm do uso anterior desse sub-recurso.",
        ],
      },
      {
        heading: "Formatos e residência",
        paragraphs: [
          "Cinquenta e seis formatos do anfitrião são alcançáveis, inclusive de BC1 a BC7, canais inteiros e normalizados, R16 e RG16, meia precisão e RGBA32_FLOAT. Alocações de imagem do convidado compartilham um registro de aliases entre os usos de cor, profundidade, armazenamento e amostragem. Uma passagem posterior pode amostrar um alvo de profundidade que uma passagem anterior escreveu, sem uma ida e volta pela memória convidada, quando as assinaturas coincidem. Reinterpretações e sobreposições parciais voltam pela memória convidada.",
          "O detile de computação na GPU cobre superfícies 2D e 3D padrão e PRT de 4, 8 e 16 bytes. O detile de RB+ e de MSAA ainda roda na CPU. Alvos UNORM 11/11/10 empacotados, de uma amostra, misturam por meio de uma cópia para buffer de armazenamento e de um desempacotar, misturar e reempacotar no fragmento. O VideoOut é a swapchain por cima dessas imagens.",
        ],
      },
    ],
    works: [
      "Seleção em tempo de execução de um dispositivo Vulkan 1.2, uma swapchain e alvos de renderização residentes.",
      "Cinquenta e seis formatos do anfitrião, rastreamento de layout por sub-recurso e um registro de aliases de imagem.",
      "Dois workers de compilação, um cache persistente do driver e aquecimento opcional de computação.",
      "Um escalonador de timeline de adesão explícita, com um título que o ativa por padrão.",
    ],
    gaps: [
      "O perfil padrão ainda espera cada lote. A submissão por timeline é de adesão explícita.",
      "O detile de RB+ e de MSAA usa a CPU.",
      "A iluminação dos jogos e todo caminho de metadados comprimidos não estão implícitos na lista de formatos.",
    ],
  },

  msaa: {
    title: "MSAA",
    summary:
      "Contagens coincidentes de 2×, 4× e 8× amostras de cor e de profundidade permanecem na imagem do anfitrião até um resolve posterior. Asterix usa esse caminho para profundidade e stencil com MSAA, o que removeu um grande readback acidental.",
    sections: [
      {
        heading: "Contagens de amostra na imagem do anfitrião",
        paragraphs: [
          "Um alvo de renderização de PlayStation 5 pode ser armazenado com duas, quatro ou oito amostras. O PS5PCEM mantém um alvo de cor e um alvo de profundidade na imagem Vulkan quando as contagens de amostra coincidem, e faz o resolve depois. A contagem de amostra do convidado faz parte do instantâneo do recurso, ao lado do modo de swizzle e dos ponteiros de metadados.",
          "As equações de endereço RB+ do Oberon, de 16 pipes e 8 empacotadores, incluem a fatia de array e os bits de amostra de 2×, 4× e 8× tanto para cor quanto para profundidade. O detile por computação na GPU ainda não consome essas equações. Superfícies RB+ e MSAA recaem no detile da CPU. As amostras continuam corretas. A reserva é um custo, e é por isso que o MSAA não é descrito como totalmente residente na GPU.",
        ],
      },
      {
        heading: "Profundidade e stencil em Asterix",
        paragraphs: [
          "Asterix & Obelix: Slap Them All! desenha a floresta de abertura com profundidade e stencil em MSAA. Uma passagem só de profundidade que ignorava a contagem de amostra lia o attachment de volta como diagnóstico. Attachments coincidentes de profundidade e stencil em MSAA permanecem no caminho persistente de profundidade, e a comparação e a atualização de stencil que o convidado pediu são aplicadas.",
          "Attachments de cor em MSAA já não pedem uso de imagem de armazenamento neste backend. Na RTX 3070 Ti, com saída em 1080p, uma amostra estacionária de 30 segundos do contador de interface dessa floresta de abertura subiu de uma mediana de 46.45 FPS para 162.20 FPS. O número é dessa vista. Não é um mínimo ao longo das fases posteriores. Movimento, salto e o primeiro encontro romano foram reverificados na compilação de desenvolvimento.",
        ],
      },
      {
        heading: "O que o resolve não inclui",
        paragraphs: [
          "Um resolve posterior de uma contagem de amostra coincidente está implementado. Uma superfície FMASK comprimida ligada a CMASK é outro mecanismo e fica fora deste caminho. Uma importação MSAA sem suporte mantém a limpeza segura de primeiro uso, em vez de amostrar dados comprimidos não inicializados.",
          "Todos os 233 testes Vulkan e as sondas nativas de profundidade e stencil em 2× e 4× passaram com a correção de Asterix. O runner da compilação assinada a inclui. A mudança é mais nova do que as notas da versão 0.3.4.",
        ],
      },
    ],
    works: [
      "Imagens do anfitrião para contagens coincidentes de 2×, 4× e 8× amostras de cor e de profundidade, com um resolve posterior.",
      "Attachments de profundidade e stencil em MSAA, inclusive comparação e atualização de stencil.",
      "Detile na CPU para o endereçamento de MSAA e de RB+, usando as equações de bits de amostra do Oberon.",
      "A correção da floresta de abertura de Asterix, medida numa mediana de 162.20 FPS nessa vista estacionária.",
    ],
    gaps: [
      "O detile por computação na GPU não cobre MSAA nem RB+. Esses envios usam a CPU.",
      "FMASK ligado a CMASK não é resolvido como metadados comprimidos.",
      "O número de Asterix é uma vista numa GPU, não uma promessa de taxa de quadros para o jogo.",
    ],
  },

  metadata: {
    title: "HTILE, DCC, CMASK e FMASK",
    summary:
      "HTILE, DCC, CMASK e FMASK são os metadados comprimidos de profundidade e de cor do console. O PS5PCEM rastreia os ponteiros, limpa o HTILE nos casos que entende e recusa um layout que, de outro modo, faria detile de forma incorreta.",
    sections: [
      {
        heading: "O que são os quatro nomes",
        paragraphs: [
          "HTILE é metadado de profundidade. No padrão GFX10 que o PS5PCEM implementa, um dword cobre uma região de 8×8 pixels, e esses dwords são empacotados num bloco de 32 KiB que cobre 1024 por 512 pixels. DCC é a compressão delta de cor para alvos de cor. CMASK é uma máscara de limpeza rápida e de expansão. FMASK diz a um resolve de múltiplas amostras qual amostra pertence a qual pixel.",
          "O instantâneo do recurso guarda os ponteiros de metadados e os seletores de layout, inclusive o bit de CMASK linear do GFX10. Esse bit importa porque aplicar uma equação de endereço em tiles a um CMASK linear embaralharia a máscara em silêncio. O backend rejeita o layout sem suporte, em vez disso.",
        ],
      },
      {
        heading: "Limpezas e profundidade",
        paragraphs: [
          "Limpezas corretas de HTILE e de DCC estão implementadas para os layouts que o renderizador entende. Limpezas repetidas de metadados são cobertas pela sonda htile-clears do vulkan-smoke. Uma extensão de profundidade reiniciada só é recuperada para uma superfície ativa apoiada em HTILE, o que mantém intacto o G-buffer de Ghost of Yōtei e ainda faz uma ligação antiga de profundidade de interface 1×1 falhar na verificação de tamanho do attachment.",
          "Profundidade e stencil do convidado, de uma amostra, podem ser importados e escritos de volta quando PS5_GPU_DEPTH_TRANSFER=1. Planos de stencil vinculados viram attachments empacotados de profundidade mais stencil, com as operações de comparação e de atualização do convidado. A profundidade de múltiplas amostras usa o caminho de MSAA. A faixa de Z comprimida e o Z hierárquico dentro do HTILE não são interpretados por completo.",
        ],
      },
      {
        heading: "O que ainda é explícito",
        paragraphs: [
          "O trabalho que resta, declarado nas notas de GPU, é o restante das visões de camada, os estados comprimidos que restam de DCC e de FMASK, a faixa de Z e o Hi-Z do HTILE, e os estados de CMASK acoplados a FMASK. Uma importação MSAA sem suporte mantém uma limpeza de primeiro uso. Amostrar a superfície comprimida como se fossem texels simples é a falha que esta recusa existe para evitar.",
          "O suporte a metadados é, portanto, parcial de propósito. Os ponteiros são decodificados. Os layouts que foram validados são respeitados. Os layouts que não foram validados são rejeitados ou limpos.",
        ],
      },
    ],
    works: [
      "Endereçamento pattern-21 do HTILE, um dword por 8×8, em blocos de 32 KiB.",
      "Limpezas de HTILE e de DCC para os layouts que o renderizador entende.",
      "Detecção de CMASK linear que recusa uma equação em tiles sobre uma máscara linear.",
      "Importação e escrita de volta, sob adesão explícita, de profundidade e stencil de uma amostra.",
    ],
    gaps: [
      "A interpretação completa da faixa de Z do HTILE e do Z hierárquico está incompleta.",
      "Estados comprimidos de DCC e de FMASK, e o CMASK acoplado a FMASK, permanecem fora do caminho rápido.",
      "Uma importação comprimida sem suporte é limpa, em vez de ser amostrada como texels brutos.",
    ],
  },

  detile: {
    title: "Detile de texturas",
    summary:
      "As texturas de PS5 ficam armazenadas em padrões de swizzle GFX10, não em linhas lineares. O PS5PCEM aplica as equações de endereço na CPU e, na GPU, para as superfícies grandes de 4, 8 e 16 bytes que se qualificam.",
    sections: [
      {
        heading: "As equações de endereço",
        paragraphs: [
          "Uma textura em tiles faz XOR da coordenada do pixel com bits de pipe, de banco e de amostra, para que pixels vizinhos caiam em canais de memória diferentes. O PS5PCEM implementa as equações GFX10 para layouts lineares, tiles Standard de 256 bytes, de 4 KiB e de 64 KiB, tiles de 64 KiB parcialmente residentes, profundidade Z_X e alvo de renderização R_X. O mesmo contrato cobre caudas de mip e blocos 3D espessos.",
          "Até dezesseis níveis de mip são colocados do menor para o maior. Os níveis pequenos compartilham as posições exatas da cauda de mip de 4 KiB e de 64 KiB. Recursos tridimensionais usam blocos espessos e fatias de bloco de profundidade. Todo sub-recurso expõe um deslocamento verificado de byte de origem. Os adaptadores de buffer, de imagem, de bloco comprimido, de alvo de cor e de alvo de profundidade não alocam nada e rejeitam um estouro ou um intervalo curto.",
        ],
      },
      {
        heading: "Detile na GPU e a reserva da CPU",
        paragraphs: [
          "Envios de primeiro uso de superfícies grandes padrão de 4 bytes, em tiles de 256 bytes, de 4 KiB e de 64 KiB, e de superfícies lineares grandes, fazem detile na GPU. O kernel de computação recebe uma chave sem ponteiro e um bloco de parâmetros de 84 bytes: tamanho do bloco, cauda, pitch, fatia, contagem de amostra e um deslocamento de buffer de 64 bits, num layout estável todo em 32 bits. Superfícies padrão e PRT, em 2D e em 3D, de oito e de dezesseis bytes, estão na mesma família da GPU.",
          "As outras famílias ficam na CPU, inclusive RB+ e MSAA. As equações do Oberon para elas incluem os bits de amostra, e o caminho da CPU os usa. Recair é um custo de banda. Não é um formato de pixel diferente. O diagnóstico num desenho ao vivo informa a família, as dimensões do bloco 3D, a contagem de amostra, o limite da cauda de mip e o tamanho da alocação convidada.",
        ],
      },
      {
        heading: "Por que o detile aparece no tempo de quadro",
        paragraphs: [
          "Uma textura reenviada a cada quadro paga o custo do detile a cada quadro. O rastreador de páginas, quando está ligado, deixa uma página inalterada permanecer residente, para que o detile seja pulado. Uma textura que a própria GPU reescreveu ainda tem de ser invalidada. O detile não substitui essa regra de coerência.",
          "Visões amostradas fazem detile do intervalo de mip que o descritor nomeia, inclusive um nível de base diferente de zero. Nesse caso, o mip 0 da imagem Vulkan é o nível de base da visão. Swizzles de componente que ainda faltam no caminho de visão são uma limitação separada da equação de endereço.",
        ],
      },
    ],
    works: [
      "Equações de endereço GFX10 para linear, Standard, PRT, profundidade e alvo de renderização, inclusive caudas de mip e blocos 3D.",
      "Detile por computação na GPU para superfícies grandes padrão e PRT, em 2D e em 3D, de 4, 8 e 16 bytes.",
      "Detile na CPU para as famílias restantes, inclusive os bits de amostra de MSAA e de RB+.",
      "Deslocamentos verificados de sub-recurso, que rejeitam intervalos curtos e estouros.",
    ],
    gaps: [
      "O detile de MSAA e de RB+ roda na CPU.",
      "Alguns swizzles de componente e algumas visões de camada ainda estão incompletos.",
      "Uma superfície que a CPU escreve depois do envio tem de ser invalidada antes de ser amostrada de novo.",
    ],
  },

  "page-tracker": {
    title: "Rastreador de páginas da GPU",
    summary:
      "O rastreador de páginas, de adesão explícita, vigia páginas convidadas de 16 KiB. O primeiro armazenamento nativo da CPU gera uma falha, avança uma geração e invalida a cópia da GPU, para que páginas inalteradas não sejam submetidas a hash e enviadas a cada quadro.",
    sections: [
      {
        heading: "O problema que ele trata",
        paragraphs: [
          "Um alvo de renderização ou um buffer de vértices que vive na memória convidada precisa chegar à GPU. Enviar a alocação inteira a cada quadro é correto e caro. Submeter a alocação inteira a hash para descobrir que ela não mudou também é caro. O rastreador de páginas, em vez disso, marca uma página gravável rastreada como somente leitura e deixa a CPU falhar no primeiro armazenamento.",
          "O tratador da falha registra a página, restaura a proteção real do convidado e avança a geração dessa página. Um desenho posterior compara gerações. Uma página inalterada permanece no dispositivo. Uma página cuja geração se moveu é enviada. PS5_GPU_PAGE_TRACKER=1 liga o mecanismo. Ele fica desligado, a menos que essa variável, ou o conjunto experimental, esteja definido.",
        ],
      },
      {
        heading: "O que a falha é",
        paragraphs: [
          "A falha é uma invalidação, não um erro do convidado. A página estava somente leitura só para que o anfitrião pudesse observar a escrita. O armazenamento do convidado então pode concluir sob a proteção que o título pediu. Páginas que não são rastreadas seguem o caminho comum de envio.",
          "Mapeamentos de memória direta recriados com o mesmo endereço, o mesmo tamanho, o mesmo deslocamento físico e as mesmas permissões de CPU mantêm as visões do anfitrião. Essa reutilização é o que torna uma geração significativa de um quadro para o outro. Uma mudança de suporte ou de permissões segue o caminho normal de substituição, e o rastreador observa o mapeamento novo.",
        ],
      },
      {
        heading: "O que ele não faz",
        paragraphs: [
          "O rastreador não reduz a resolução interna de um título e não compila shaders. Ele só remove transferências repetidas de páginas nas quais a CPU não armazenou. Um título que reescreve um buffer a cada quadro ainda paga por esse buffer.",
          "Escritas de atlas de fontes e outros armazenamentos do HLE invalidam as vigias antes de modificar a memória convidada, então uma escrita de firmware não fica invisível para a GPU. O rastreador faz parte do conjunto experimental de GPU descrito na visão geral da arquitetura.",
        ],
      },
    ],
    works: [
      "Gerações por página para páginas convidadas de 16 KiB quando PS5_GPU_PAGE_TRACKER=1.",
      "Uma falha no primeiro armazenamento, que restaura a proteção do convidado e invalida a cópia residente.",
      "Reutilização de visões idênticas de memória direta, para que as gerações sobrevivam de um quadro para o outro.",
      "Invalidação quando o próprio HLE escreve uma página vigiada.",
    ],
    gaps: [
      "O rastreador é de adesão explícita. O caminho padrão de compatibilidade não depende dele.",
      "Páginas que a CPU reescreve a cada quadro ainda são enviadas.",
      "Ele não cobre a coerência de GPU para GPU dentro de uma superfície de metadados comprimidos.",
    ],
  },

  videoout: {
    title: "VideoOut",
    summary:
      "O VideoOut registra os buffers de exibição do convidado e só conclui um flip depois que o callback de apresentação aceitou o quadro. A janela do anfitrião é uma swapchain Vulkan em 1080p SDR.",
    sections: [
      {
        heading: "Registro e flips",
        paragraphs: [
          "O VideoOut guarda até dezesseis alocações de exibição registradas e quatro grupos de atributos. Ele publica o registro contíguo de dezesseis rótulos que a ABI do driver usa. Registrar, alterar e cancelar o registro são operações validadas. Um flip em branco do buffer -1, que os títulos usam durante a inicialização, é aceito.",
          "Flips de CPU e flips de fim de pipe passam pelo backend vivo de buffer de comandos. Um flip normal só fica completo depois que o callback de apresentação aceita o quadro. A conclusão é entregue na fila de eventos do VideoOut com os dados de usuário de quem chamou. O filtro da fila é a mesma implementação de evento de borda de usuário que o kernel usa, e o identificador do registro é preservado.",
        ],
      },
      {
        heading: "O que o anfitrião apresenta",
        paragraphs: [
          "A janela do jogo é uma swapchain Vulkan. O VideoOut informa 1080p SDR. 120 Hz é informado como indisponível. A preferência padrão do jogo pede o modo de desempenho. A resolução interna permanece sob o controle do título: um jogo que renderiza em 4K ainda aloca alvos em 4K, e a swapchain apresenta o scanout que o título registrou.",
          "SetFlip resolve o slot do VideoOut e o índice do buffer, seleciona o alvo em cache com o endereço convidado correspondente e publica o quadro. A taxa de flips pode ser mostrada no título da janela. O lançador guarda essa preferência, e uma execução pela linha de comando pode definir PS5_SHOW_FPS=1.",
        ],
      },
      {
        heading: "Filmes e o scanout",
        paragraphs: [
          "Filmes de introdução não contornam o VideoOut. O AvPlayer decodifica para buffers que pertencem ao título, e os shaders do próprio título, ou um scanout registrado, os apresentam. Asterix mantém o viewport de altura negativa do convidado como orientação do scanout, então a composição não sai de cabeça para baixo.",
          "A ausência do carregador Vulkan, de um dispositivo de apresentação ou de uma janela é informada, e o título continua no caminho sem interface. O modo sem interface serve ao diagnóstico. Não é um segundo renderizador, mais rápido.",
        ],
      },
    ],
    works: [
      "Até dezesseis buffers de exibição, quatro grupos de atributos e a ABI de dezesseis rótulos.",
      "Flips que só se concluem depois que o callback de apresentação aceita o quadro.",
      "Uma swapchain Vulkan que informa 1080p SDR, com 120 Hz deixado indisponível.",
      "Preferência pelo modo de desempenho por padrão, e um título de janela opcional com a taxa de flips.",
    ],
    gaps: [
      "120 Hz e uma swapchain HDR do anfitrião não são oferecidos.",
      "A resolução interna é aquilo que o título aloca.",
      "Sem um dispositivo de apresentação, o processo permanece sem interface.",
    ],
  },

  audio: {
    title: "AudioOut",
    summary:
      "O AudioOut reproduz PCM do convidado num dispositivo Windows a 48 kHz. As portas legadas têm fluxos e filas próprios, então música e efeitos tocam juntos, e um underrun preserva a ordem das amostras.",
    sections: [
      {
        heading: "Portas e o dispositivo do anfitrião",
        paragraphs: [
          "Um título envia um buffer e espera que a chamada dure cerca do tempo em que o buffer soa. Essa espera vem do dispositivo do anfitrião abrindo espaço, não de uma suspensão que descarta as amostras. AudioOut, AudioIn e AudioOut2 expõem portas ritmadas, filas, metadados de alto-falante e o estado de primário conectado. Um lote valida toda porta e depois envia o quantum audível uma única vez, então uma porta auxiliar silenciosa não multiplica a duração.",
          "As portas legadas do AudioOut possuem fluxos do Windows e filas de PCM separados. Música e efeitos podem tocar ao mesmo tempo. A saída do lote envia cada porta ativa. Depois de um underrun, o anel ativo preserva a ordem das amostras, e um fade curto tira o estalo da retomada. O dispositivo WinMM faz a pré-rolagem de PCM real e usa um período de temporizador de um milissegundo.",
        ],
      },
      {
        heading: "Latência",
        paragraphs: [
          "A reserva comum começa em 42 ms e cresce em passos de quatro buffers, até cerca de 170 ms, só quando o título em execução de fato deixa o dispositivo sem dados. O perfil medido de PPSA25872 começa em 128 ms porque o mixer dele pode pausar por cerca de 100 a 120 ms durante a inicialização e o trabalho de cena. Essa reserva maior não é imposta aos outros títulos.",
          "Amostras não finitas são substituídas antes de chegar ao dispositivo. Esse saneador protege os alto-falantes. Ele não consegue reparar um filtro que já armazenou um NaN. A página do ACM descreve o erro de convolução que produzia esses valores em Subnautica.",
        ],
      },
      {
        heading: "Onde a saída existe",
        paragraphs: [
          "A falha ao abrir um dispositivo não é informada ao título. Uma placa de som ausente é um fato sobre o anfitrião. Quem chama recua para uma espera silenciosa e ritmada, para que o tempo do título ainda avance. O mesmo acontece se o dispositivo morre no meio da execução. A saída está implementada no Windows. As outras compilações mantêm as portas silenciosas e corretamente ritmadas.",
          "A mistura direta de reserva de clipes de prévia já decodificados fica desligada por padrão. Tocar uma prévia ao lado da mistura AudioOut do próprio título é ouvido como um eco. PS5_AUDIO_FALLBACK_MIX=1 liga essa mistura. O lançador pode silenciar o dispositivo pelo ajuste de som, que chega como PS5_AUDIO_DISABLED.",
        ],
      },
    ],
    works: [
      "Reprodução no anfitrião a 48 kHz, com portas ritmadas de AudioOut, AudioIn e AudioOut2.",
      "Fluxos separados do Windows para as portas legadas, para que música e efeitos simultâneos permaneçam ordenados.",
      "Uma reserva que começa em 42 ms e só cresce quando o dispositivo fica sem dados, até cerca de 170 ms.",
      "Substituição de amostras não finitas, e uma reserva silenciosa e ritmada quando nenhum dispositivo abre.",
    ],
    gaps: [
      "A saída no anfitrião existe só no Windows.",
      "A vibração do controle não é acionada a partir de uma faixa háptica de áudio.",
      "O saneador não reconstrói um histórico de filtro que já foi envenenado.",
    ],
  },

  acm: {
    title: "Convolução ACM",
    summary:
      "A convolução ACM executa na CPU a reverberação particionada do FMOD. Lotes de entrada compartilhada transformam um sinal seco, aplicam partições de impulso em float ou em meia precisão e fazem overlap-add do resultado úmido.",
    sections: [
      {
        heading: "O erro que ela fechou",
        paragraphs: [
          "Subnautica: Below Zero podia começar com estalos, cair em silêncio e se recuperar minutos depois. O PCM que chegava ao dispositivo do anfitrião continha floats não finitos. Um rastreio em memória dos callbacks de DSP do FMOD mostrou áudio finito entrando na reverberação por convolução e lixo saindo dela. As funções HLE sceAcm_ConvReverb_SharedInput, o envio do lote e sceAcmBatchWait devolviam sucesso sem escrever uma saída.",
          "O FMOD então misturava esse buffer úmido não escrito no grafo. Os NaNs se espalhavam pelos efeitos posteriores. O saneador do AudioOut os substituía por silêncio e não conseguia reparar o histórico envenenado do filtro. Um segundo erro fazia a espera no identificador inicial de lote -1 ter sucesso. O FMOD trata uma espera inicial que falhou como 'ainda não há buffer úmido anterior' e só mistura depois de um trabalho de fato concluído.",
        ],
      },
      {
        heading: "Convolução particionada",
        paragraphs: [
          "O layout do descritor corresponde ao observado no backend ACM do FMOD. As partições da resposta ao impulso são bins complexos intercalados. Um bloco de B bins pertence a uma transformada de comprimento 2B. Os buffers de entrada, de saída e de sobreposição são separados e planares. Só são aceitos os layouts de espectro float32 e float16 de deslocamento zero que foram observados.",
          "Um lote roda na CPU. O histórico de entrada é mantido entre grãos e através da volta do anel, e a sobreposição é carregada para o grão de saída seguinte. Várias saídas podem compartilhar uma transformada de entrada e um avanço de histórico. A entrada mono pode alimentar mais de um canal. A transformada inversa é normalizada. Uma inversa independente de uma partição de impulso real colocou a energia na primeira metade do bloco preenchido com zeros, o que confirma o sinal do espectro. O impulso empacotado que o jogo usa omite o bin de Nyquist.",
        ],
      },
      {
        heading: "Esperas, limites e o reteste",
        paragraphs: [
          "Os construtores capturam arrays de ponteiros e ganhos num registro de comando limitado. O próprio PCM é lido quando o lote começa. Uma espera só tem sucesso para um lote que este contexto de fato concluiu. Destruir o contexto libera o histórico. Limites inválidos, codificações de comando desconhecidas e layouts sem suporte devolvem erros.",
          "Operações isoladas de FFT, de IFFT e de panner do ACM não estão implementadas. Os canais têm teto de 8, as saídas de 32 e o bloco de 1024. O armazenamento do histórico é limitado. No runner da compilação assinada, 90 instantâneos de PCM, um por segundo, não continham amostras não finitas, com pico de 0.1255 e o primeiro áudio acima de 0.001 aos 11.03 segundos. O mantenedor confirmou o som. As amostras são uma sonda, não toda amostra que o jogo emitiu.",
        ],
      },
    ],
    works: [
      "Convolução FFT particionada para os lotes de reverberação de entrada compartilhada e de IR compartilhada do FMOD.",
      "Espectros complexos em float32 e float16, overlap-add e histórico entre grãos.",
      "Esperas que só têm sucesso para um lote concluído daquele contexto. O identificador inicial -1 falha.",
      "PCM finito no reteste de Subnautica, com os estalos e o silêncio posterior já ausentes.",
    ],
    gaps: [
      "Chamadas isoladas de FFT, de IFFT e de panner do ACM não estão implementadas.",
      "Deslocamentos de espectro diferentes de zero e layouts de roteamento não medidos são rejeitados.",
      "A convolução roda na CPU. Não há caminho de FFT na GPU.",
    ],
  },

  ajm: {
    title: "Codecs AJM",
    summary:
      "O AJM decodifica ATRAC9, MP3, AAC MPEG-4 e Opus. Cada instância de codec guarda o próprio estado, e um codec desconhecido é rejeitado em vez de ser informado como sucesso silencioso.",
    sections: [
      {
        heading: "Codecs e formatos de amostra",
        paragraphs: [
          "O codec 0 é MP3, por meio de minimp3. O codec 1 é ATRAC9. O codec 2 é AAC MPEG-4, por meio de FAAD2, para trabalhos ADTS, brutos e SAF. O codec 24 é Opus, por meio de libopus. A saída ATRAC9 pode ser de 16 bits com sinal, de 32 bits com sinal, float ou planar. São preservados a inicialização, a informação do codec, os metadados sem lacuna, as contagens de bytes do fluxo, as contagens de frames decodificados e as bandas laterais do total de amostras.",
          "Os trabalhos podem usar um buffer contíguo ou um buffer dividido. O estado da instância é por decodificador, então dois fluxos não compartilham um reservatório de bits. O caminho legado da libSceAudiodec usa o mesmo backend para ATRAC9, MP3 e AAC, depois das próprias chamadas de init, create, reset e delete.",
        ],
      },
      {
        heading: "Áudio de filme e prévias",
        paragraphs: [
          "O layout multicanal de ATRAC9 de PlayStation 5 que foi observado é decodificado como fluxos mono intercalados. O áudio de filme de Ghost of Yōtei começa no ponto certo por causa desse layout. Uma faixa háptica que o filme carrega é temporizada com silêncio. A vibração do controle não é sintetizada a partir dela.",
          "Prévias de reserva apoiadas em FSB são reamostradas para a mistura de 48 kHz, recebem um fade curto e são esvaziadas uma vez. Elas não entram na mistura do grafo AudioOut ao vivo, a menos que PS5_AUDIO_FALLBACK_MIX=1, porque uma segunda cópia do mesmo clipe é um eco.",
        ],
      },
      {
        heading: "Licenças",
        paragraphs: [
          "ATRAC9, FAAD2, minimp3 e Opus são decodificadores de terceiros. As licenças deles acompanham o diretório docs/licenses do repositório e a compilação portátil. O código do próprio emulador permanece GPL-3.0-or-later.",
          "Um número de codec fora dos quatro valores implementados é um erro. Devolver um buffer de zeros e um código de sucesso faria um título acreditar que o fluxo tinha sido decodificado.",
        ],
      },
    ],
    works: [
      "ATRAC9, MP3, AAC MPEG-4 e Opus, com estado de decodificador por instância.",
      "Saída ATRAC9 como PCM de 16 bits com sinal, de 32 bits com sinal, float ou planar.",
      "Metadados sem lacuna e de banda lateral, com buffers de entrada contíguos e divididos.",
      "O backend compartilhado por trás da libSceAudiodec.",
    ],
    gaps: [
      "Números desconhecidos de codec AJM são rejeitados.",
      "Faixas hápticas permanecem em silêncio. A vibração não é emulada a partir delas.",
      "A mistura das prévias de reserva fica desligada, a menos que PS5_AUDIO_FALLBACK_MIX=1.",
    ],
  },

  ngs2: {
    title: "NGS2",
    summary:
      "O NGS2 guarda handles de sistema, de rack e de voz, analisa dados RIFF/WAVE comuns e ritma um grão silencioso de 48 kHz para que um worker de DSP em software não entre em espera ativa. A síntese de voz, em si, está incompleta.",
    sections: [
      {
        heading: "Handles e parâmetros",
        paragraphs: [
          "Um título cria um sistema NGS2, racks e vozes, e depois percorre uma lista ligada de mudanças de parâmetro. O PS5PCEM emite handles estáveis, verifica que um filho ainda pertence a um pai vivo e percorre essas listas dentro de um limite. Play, pause, resume, stop e kill são aplicados quando a voz é renderizada. O estado é informado com as flags exatas de 32 bits que o convidado lê.",
          "A geometria RIFF/WAVE comum é analisada. Uma matriz de pan neutra é preservada, então uma voz que não recebeu pan não herda uma matriz antiga de outra voz. O grão é float32.",
        ],
      },
      {
        heading: "Por que o grão é ritmado",
        paragraphs: [
          "Cada grão silencioso de renderização é ritmado a 48 kHz. Sem essa espera, o worker de DSP em software de um título chama o renderizador num laço apertado e toma um núcleo inteiro do anfitrião. O ritmo acompanha o relógio do AudioOut, para que o worker durma cerca do comprimento do grão.",
          "As próprias amostras são silêncio. A síntese de voz e a mistura reais do NGS2 não estão implementadas. Um título cuja trilha é produzida inteiramente dentro do NGS2 não ouvirá essas vozes por este caminho. Títulos que decodificam com o AJM e enviam PCM ao AudioOut não precisam da síntese do NGS2.",
        ],
      },
    ],
    works: [
      "Handles estáveis de sistema, de rack e de voz, com verificação do tempo de vida do pai.",
      "Geometria RIFF/WAVE, listas de parâmetros limitadas e flags de estado exatas de 32 bits.",
      "Play, pause, resume, stop e kill aplicados na renderização, com uma matriz de pan neutra.",
      "Um grão float32 silencioso, ritmado a 48 kHz.",
    ],
    gaps: [
      "A síntese de voz e o mixer do NGS2 não estão implementados.",
      "O grão ritmado é silêncio, então uma trilha feita só no NGS2 permanece quieta.",
      "Plugins de DSP personalizados dentro de uma voz ficam fora deste modelo.",
    ],
  },

  avplayer: {
    title: "AvPlayer",
    summary:
      "O SceAvPlayer decodifica contêineres de filme com FFmpeg para quadros NV12 que pertencem ao título e para PCM estéreo de 48 kHz. A reprodução termina quando passa a duração da origem, mesmo que o título nunca leia um dos fluxos.",
    sections: [
      {
        heading: "Buffers que pertencem ao título",
        paragraphs: [
          "O reprodutor usa os callbacks de alocação do título e os callbacks de arquivo do título. O FFmpeg sonda o contêiner e decodifica o vídeo para NV12 na resolução da origem e o áudio para estéreo intercalado de 16 bits com sinal, a 48 kHz. Vídeo e áudio têm locks separados e processos de decodificador separados. As marcas de tempo compartilham um único relógio monotônico.",
          "Pausa, busca, loop e fim de fluxo são conservados. A ABI do decodificador em software informa o pitch alinhado, a altura da alocação e o recorte visível. Existem tanto a chamada estendida quanto a chamada legada de informação de fluxo. O tempo atual, o trick mode em velocidade normal, a desativação de fluxo e um relógio de mídia limitado cobrem o middleware Unity que o Asterix traz.",
        ],
      },
      {
        heading: "Encerrar um filme que o título só lê pela metade",
        paragraphs: [
          "Um título pode ficar com as imagens e misturar o próprio som, ou o contrário. Esperar até que todo fluxo tenha sido lido mantém esse reprodutor vivo pelo resto do processo. Jurassic Park Classic Games Collection ficava parado na introdução por este motivo: o relógio estava noventa segundos além de um clipe de três segundos porque o fluxo de áudio não lido nunca terminava.",
          "A duração vem da origem. Quando o relógio a ultrapassa, a reprodução termina mesmo que um fluxo tenha sido ignorado. Enquanto um fluxo ainda está entregando, a posição informada permanece dentro dos quadros de fato entregues, então uma máquina lenta não é cortada cedo. Quando o fluxo de fato terminou, o relógio pode correr até a duração. Origens em loop e origens de comprimento desconhecido são deixadas em paz.",
        ],
      },
      {
        heading: "Apresentação",
        paragraphs: [
          "Os filmes de introdução observados tocam perto da taxa de quadros nativa deles em compilações ReleaseFast. A última imagem válida é retida enquanto o Unity troca de clipe, em vez de apresentar uma superfície de decodificador limpa como uma cor sólida. Uma origem de 1920×1080 pode ser escalada para o alvo de scanout que o título registrou.",
          "A faixa háptica é temporizada e silenciosa. O AvPlayer não aciona um controle. Os pixels chegam à tela pelos shaders do título ou pelo VideoOut, não por um segundo compositor dentro do reprodutor.",
        ],
      },
    ],
    works: [
      "Decodificação com FFmpeg para vídeo NV12 e PCM estéreo de 48 kHz, em buffers que pertencem ao título.",
      "Informação de fluxo estendida e legada, pausa, busca, loop e um relógio de mídia compartilhado.",
      "Fim da reprodução na duração da origem quando o título deixa um fluxo sem leitura.",
      "Retenção do último quadro válido através de uma troca de clipe.",
    ],
    gaps: [
      "A háptica é silêncio. A vibração do controle não é emulada.",
      "Origens em loop e de comprimento desconhecido não são cortadas pela regra de duração.",
      "Um callback de arquivo ausente, ou um contêiner que o FFmpeg não consegue sondar, faz esse recurso falhar.",
    ],
  },

  cpu: {
    title: "Execução nativa do convidado",
    summary:
      "No Windows x86-64, o código de máquina do convidado roda diretamente. Um worker do anfitrião carrega cada pthread do convidado, e a base de FS é restaurada depois de toda chamada bloqueante porque o Windows não a conserva.",
    sections: [
      {
        heading: "Um worker por thread convidada",
        paragraphs: [
          "O despachante inicia um worker do anfitrião para cada pthread do convidado, instala o TLS dessa thread e entra no convidado no endereço pedido, com os registradores de argumento da System V. Join, detach, yield, sleep, callbacks aninhados e scePthreadExit voltam todos por este caminho. A thread HLE só é concluída depois que a execução do convidado deixou esse contexto.",
          "A ponte verifica que o ponto de entrada é executável e que a pilha e o TLS estão mapeados. Ela salva os registradores não voláteis do Windows, MXCSR e a palavra de controle do x87, troca para a pilha do convidado, instala a base de FS do convidado e chama a entrada. Um scePthreadExit síncrono sai por um escape nativo que descarta os quadros de pilha do convidado e restaura o FS do anfitrião antes de o despachante ver a interrupção.",
        ],
      },
      {
        heading: "O Windows derruba a base de FS",
        paragraphs: [
          "Instalar FS uma vez não basta. O Windows não preserva uma base de FS escrita pelo usuário através de uma troca de contexto. Depois de um sleep, rdfsbase lê zero de novo. O código do convidado guarda o armazenamento local da thread em FS, sob a convenção System V, então o acesso seguinte relativo a FS falharia perto do endereço zero. Nada no convidado está errado. O anfitrião derrubou um registrador no qual o convidado tem o direito de confiar.",
          "O despachante, portanto, restaura FS depois das chamadas bloqueantes. As esperas usam um futex consciente de sequência, para que um despertar que chegue entre um unlock e o estacionamento seja consumido uma vez, e para que um broadcast continue visível a todo esperador que observou a sequência mais antiga. Se o histórico fixo de despertares algum dia saturar, o despachante desperta a mais e deixa o HLE reverificar o objeto. As suspensões temporizadas usam um atraso privado e não alertável, para que um despertar sem relação não transforme um worker de áudio numa espera ativa.",
        ],
      },
      {
        heading: "Falhas e outros sistemas operacionais",
        paragraphs: [
          "Uma thread convidada em falha fica contida. O diagnóstico atribui o endereço a um módulo e a um símbolo quando consegue, e o processo não precisa morrer com uma exceção não tratada do anfitrião. PS5_CPU_WAIT_DIAGNOSTICS=1 liga de novo o rastreio verboso das esperas. Ele fica desligado durante o jogo normal porque vários workers estacionados, imprimindo ao mesmo tempo, podem eles mesmos atrasar um quadro.",
          "A execução nativa exige Windows x86-64 e o recurso de processador RDWRFSGSBASE. As compilações de Linux e de macOS ainda compilam o decodificador, o carregador e o HLE, e informam a ponte nativa como sem suporte. Os binários do convidado são código de máquina x86-64. Eles não são interpretados.",
        ],
      },
    ],
    works: [
      "Execução nativa x86-64 do convidado no Windows, com um worker do anfitrião por pthread do convidado.",
      "Chamadas System V, pilhas do convidado e FS restaurado depois das chamadas bloqueantes.",
      "Esperas conscientes de sequência, falhas contidas e saída de pthread que restaura o anfitrião.",
      "Inspeção, decodificação e HLE no Linux e no macOS, sem execução nativa.",
    ],
    gaps: [
      "Não há interpretador. Anfitriões que não sejam Windows x86-64 não executam o convidado.",
      "Uma CPU que não consegue escrever as bases de FS e de GS não pode entrar na ponte nativa.",
      "O diagnóstico verboso das esperas fica desligado por padrão, porque a impressão dele atrasa o jogo.",
    ],
  },

  loader: {
    title: "Carregamento de ELF e de SELF",
    summary:
      "O carregador mapeia módulos SELF de PS5 já descriptografados e módulos ELF64 simples, aplica as relocações e resolve as importações contra o registro do HLE. O título então recebe handles estáveis para os módulos que ele mesmo inicia.",
    sections: [
      {
        heading: "Imagens",
        paragraphs: [
          "Um executável de PlayStation 5 costuma ser um contêiner SELF em torno de uma imagem ELF64. O PS5PCEM lê tanto o contêiner quanto um ELF simples. O leitor coleta as importações, mapeia os segmentos no espaço de endereçamento reservado do convidado e aplica as relocações. As imagens de TLS são registradas nas threads que vão executá-las.",
          "As ferramentas podem inspecionar um módulo, despejar um grafo de dependências já relocado ou desmontar um shader sem iniciar o título. game-run é o caminho que carrega, inicializa o HLE e entra no convidado. Quando o eboot.bin descriptografado vive separado da instalação, --app0 aponta a montagem somente leitura para o diretório de conteúdo.",
        ],
      },
      {
        heading: "Módulos que o título inicia depois",
        paragraphs: [
          "O tempo de execução mapeia o grafo de dependências alcançável, mais tudo o que estiver nomeado em PS5_PRELOAD, antes de o código do convidado rodar. sceKernelLoadStartModule então devolve um handle estável para um módulo desse conjunto. Carregá-lo de novo não cria uma segunda cópia relocada. sceKernelDlsym calcula o hash do nome que o título passou e busca só no módulo que o handle selecionou, então dois plugins que exportam o mesmo callback não se tornam aliases.",
          "A correspondência de caminho ignora a direção da barra e a caixa. Um título observado pede Il2CppUserAssemblies.prx e traz Il2cppUserAssemblies.prx. Uma correspondência exata recusaria um arquivo que o título instalou. O caminho relativo é tentado antes do nome de arquivo nu, então dois módulos que compartilham um nome de arquivo permanecem distintos. Um módulo que não estava no conjunto publicado devolve ENOENT. Ele não é mapeado enquanto threads do convidado já estão em execução.",
        ],
      },
      {
        heading: "Plugins do Unity",
        paragraphs: [
          "Plugins do Unity podem ser mapeados com os construtores adiados. sceKernelLoadStartModule então os inicia uma vez, com o bloco real de argumentos do título, em vez de executar esses construtores durante a inicialização do grafo. Essa ordem é a diferença entre um plugin que vê os próprios argumentos e um plugin que começa cedo demais.",
          "O carregador não descriptografa um SELF de varejo. A entrada é uma imagem já descriptografada que o usuário tem direito de carregar. Pacotes criptografados são problema da ferramenta de PKG, e a criptografia de varejo também fica fora dessa ferramenta.",
        ],
      },
    ],
    works: [
      "Mapeamento de ELF64 e de SELF descriptografado, com relocação, importações e TLS.",
      "Um grafo de dependências pré-carregado e handles estáveis de sceKernelLoadStartModule.",
      "Dlsym limitado ao módulo selecionado, com correspondência de caminho sem distinção de caixa.",
      "Construtores adiados para plugins do Unity, para que eles iniciem com os argumentos reais.",
    ],
    gaps: [
      "Um módulo que só aparece depois da inicialização, e que não foi pré-carregado, devolve ENOENT.",
      "Imagens SELF de varejo criptografadas não são descriptografadas.",
      "Compilações de inspeção não executam a imagem carregada em anfitriões que não são Windows.",
    ],
  },

  input: {
    title: "Controles e teclado",
    summary:
      "DualSense, DualSense Edge e DualShock 4 são lidos por HID, em USB e em Bluetooth. Controles compatíveis com Xbox usam XInput. O teclado é mapeado para os analógicos por um perfil do lançador.",
    sections: [
      {
        heading: "Relatórios HID",
        paragraphs: [
          "O XInput enumera dispositivos compatíveis com Xbox. Um DualSense ligado ao PC fica invisível para ele, a menos que uma camada de tradução invente um controle Xbox virtual. O PS5PCEM abre o controle da Sony por HID e decodifica o report. Os campos são os mesmos em USB e em Bluetooth. Os deslocamentos mudam, porque o Bluetooth prefixa o payload e o DualSense coloca os gatilhos antes dos bytes dos botões.",
          "O direcional chega como uma de oito posições de bússola, não como quatro bits independentes. As leituras são sobrepostas e nunca bloqueiam. Uma consulta esvazia a fila do driver e fica com o report mais novo. Responder com o report mais antigo atrasaria os analógicos pelo quanto o quadro tivesse ficado para trás.",
        ],
      },
      {
        heading: "Saída, motores e a barra de luz",
        paragraphs: [
          "Os reports de saída carregam os dois motores e a barra de luz. No Bluetooth, o report é deslocado e termina com uma soma de verificação que o controle confere antes de agir, então um report feito para o cabo é ignorado pelo ar. A página de entrada do lançador nomeia o controle que encontrou e pode executar um teste de um segundo que gira os dois motores e varre a barra de luz. O dispositivo é aberto em modo compartilhado e, para escrita, onde o anfitrião permite.",
          "O controle tem precedência sobre o XInput. O XInput continua sendo o caminho para controles compatíveis com Xbox e para qualquer coisa que se apresente como um deles. O lançador guarda a escolha, o índice do controle e os mapeamentos de teclado, e os passa ao game-run como variáveis de ambiente.",
        ],
      },
      {
        heading: "Teclado e entrada por script",
        paragraphs: [
          "WASD é o analógico esquerdo. Alt mais as setas é o analógico direito. Os perfis podem ser de controle, de teclado ou dos dois. PS5_INPUT_MODE=scripted conserva os pulsos de botão da inicialização e ignora os dispositivos físicos, então uma tecla pressionada noutra janela não muda uma cena medida.",
          "Dentro do HLE, o controle primário pode ser aberto com scePadOpen ou obtido com scePadGetHandle. O segundo caminho importa para títulos que nunca abrem o controle do usuário conectado antes de o consultarem. Este é o lado do anfitrião desse handle.",
        ],
      },
    ],
    works: [
      "DualSense, DualSense Edge e DualShock 4 por HID, em USB e em Bluetooth.",
      "Consulta pelo report mais novo, motores, barra de luz e uma soma de verificação de Bluetooth.",
      "XInput para controles compatíveis com Xbox, e perfis de teclado que podem ser remapeados.",
      "Um modo de entrada scripted que ignora os dispositivos físicos durante as medições.",
    ],
    gaps: [
      "Touchpad, gatilhos adaptativos e sensores de movimento não formam o conjunto completo de recursos do DualSense.",
      "A háptica de uma faixa de filme não é encaminhada aos motores.",
      "O caminho HID é o caminho do anfitrião Windows usado pelo lançador e pelo game-run.",
    ],
  },

  pkg: {
    title: "Extrator de PKG",
    summary:
      "O pkgextractor desempacota os layouts FPKG de depuração observados no desenvolvimento: o pacote externo, o PFS interno, os mapas de nomes NAPS e os payloads comprimidos com Kraken. Pacotes de varejo criptografados estão fora do escopo.",
    sections: [
      {
        heading: "O que um pacote de depuração contém",
        paragraphs: [
          "Um pacote de PlayStation 5 envolve um sistema de arquivos. Os layouts de depuração que o PS5PCEM observou usam um pacote externo, uma imagem PFS interna, uma tabela NAPS que mapeia nomes do pacote para arquivos, e payloads comprimidos com Kraken. O extrator percorre essas camadas e escreve os arquivos. Ele acompanha o lançador como pkgextractor.exe, e o lançador tem um botão Extract PKG que o aciona.",
          "O extrator de desenvolvimento de 2 de outubro corrige InvalidPfs em Grand Theft Auto III: The Definitive Edition, PPSA03527 versão 1.007. Todos os 48 arquivos são extraídos, inclusive eboot.bin, seis módulos e os dois arquivos PAK, e as somas de verificação dos dois índices PAK coincidem. Vinte e um testes de pacote passam. Esse relatório não iniciou o jogo. Extração e execução são afirmações separadas.",
        ],
      },
      {
        heading: "Criptografia de varejo",
        paragraphs: [
          "Pacotes de varejo criptografados não são suportados. Nenhuma chave é incluída ou pressuposta. Um pacote que o analisador de depuração observado não reconhece falha na análise. Ele não é extraído em parte para um diretório que pareça completo.",
          "O limite legal acompanha o resto do projeto. A ferramenta existe para que uma pessoa que já tenha um dump a que tem direito possa alimentar o carregador. O site e o emulador não distribuem jogos, firmware nem chaves.",
        ],
      },
      {
        heading: "Depois da extração",
        paragraphs: [
          "O carregador lê o eboot.bin descriptografado e monta o diretório de conteúdo como /app0. Um layout típico mantém o eboot.bin na raiz do pacote ou num subdiretório descriptografado. O lançador procura nos dois lugares. O savedata não está dentro do pacote. Ele vive sob o diretório inicial do emulador, indexado pelo ID do título.",
          "Kraken, NAPS e PFS, aqui, são mecanismos de arquivo de pacote. Não são o swizzle da GPU, o motor AMPR nem os codecs de áudio, com os quais é fácil confundi-los, porque esses também comprimem ou remapeiam dados.",
        ],
      },
    ],
    works: [
      "Layouts FPKG de depuração observados, PFS interno, mapas de nomes NAPS e payloads Kraken.",
      "Um extrator de linha de comando e um botão do lançador.",
      "A extração de desenvolvimento de GTA III: 48 arquivos e somas de verificação coincidentes dos índices PAK.",
      "Vinte e um testes de pacote passando nesse extrator.",
    ],
    gaps: [
      "Pacotes de varejo criptografados não são suportados, e nenhuma chave acompanha a ferramenta.",
      "Um layout não reconhecido falha. Ele não é emitido como uma árvore parcial.",
      "Uma extração bem-sucedida não é uma afirmação de que o título em seguida roda.",
    ],
  },
};

export default tech;
