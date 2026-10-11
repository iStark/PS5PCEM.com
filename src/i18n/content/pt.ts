import type { Content } from "./en";

const pt: Content = {
  games: {
    "oxide-room-104": {
      "status": "Aviso inicial · depois tela preta",
      "headline": "O aviso de salvamento aparece; depois há falhas de shaders e da fila.",
      "summary": "PPSA07653 v01.000.000: Dois testes passam pela vinculação. Cruz automático leva à tela preta com erros FLAT, IMAGE_BVH_INTERSECT_RAY, InvalidScalarCall e DMA_DATA. A repetição apenas com teclado mostra o aviso de salvamento. Gameplay não verificado.",
      "strengths": [
        "Texto, ícone animado e Cruz/OK aparecem; nenhum erro de CPU convidada nos dois testes."
      ],
      "limits": [
        "Ambos têm vínculos storage não resolvidos. A repetição permanece no aviso; a tecla breve não aparece nos diagnósticos Pad. Menu principal e controles não verificados.",
        "Os controles manuais, a qualidade do áudio, os salvamentos, a conclusão e a estabilidade prolongada não foram verificados."
      ],
      "performance": "Aviso: mediana 18,45 FPS (17,5–19,1), 30 leituras em 29,829 s. Não é teste de gameplay. Os 18,8 FPS na tela preta são um valor antigo. Versão em desenvolvimento de 11 de outubro; RTX 3070 Ti, saída 1920×1080, perfil Speed. Caches preservados. Primeiro teste com Cruz automático; repetição medida apenas com teclado.",
      "imageAlt": "Aviso de salvamento de Oxide Room 104 com ícone branco e Cruz OK sobre fundo vermelho escuro"
    },
    "medieval-dynasty": {
      "status": "Menu principal · imagem invertida verticalmente",
      "headline": "O menu aparece, mas a imagem e o texto estão de cabeça para baixo.",
      "summary": "PPSA07933 v01.413.001: O executável chega ao menu principal. Fundo, logo e opções estão invertidos verticalmente. Cruz automático não abre uma fase durante o teste; gameplay não verificado.",
      "strengths": [
        "New Game, Load Game, Settings e Credits aparecem; nenhum guest fault registrado."
      ],
      "limits": [
        "38 dos 50 relatórios GPU contêm 72 vínculos storage não resolvidos. A relação com a inversão é desconhecida. Navegação manual não verificada.",
        "Os controles manuais, a qualidade do áudio, os salvamentos, a conclusão e a estabilidade prolongada não foram verificados."
      ],
      "performance": "Menu: mediana 32,3 FPS (28,8–33,2), 30 leituras em 29,763 s. Alvo interno máximo 1920×1080. Não é um teste de gameplay. Versão em desenvolvimento de 11 de outubro; RTX 3070 Ti, saída 1920×1080, perfil Speed. Caches preservados e comandos automáticos de Cruz ativados. O jogo controla a resolução interna.",
      "imageAlt": "Menu de Medieval Dynasty com aldeia nevada, logo e texto invertidos verticalmente"
    },
    "charons-staircase": {
      "status": "Primeira cena 3D · controles não verificados",
      "headline": "A introdução ilustrada chega à estrada na floresta.",
      "summary": "PPSA06603 v01.000.000: O executável alcança a primeira estrada em 3D. Um quadro de transição dura 32,342 s, sendo 26,810 s em falhas de cache dos pipelines gráficos. A cena aparece; controle e jogabilidade não foram verificados.",
      "strengths": [
        "Texto, árvores, iluminação e reflexos de lente aparecem; nenhum guest fault registrado."
      ],
      "limits": [
        "63 dos 64 relatórios GPU indicam vínculos storage não resolvidos, geralmente 72. O efeito visual e a correção da iluminação não foram determinados.",
        "Os controles manuais, a qualidade do áudio, os salvamentos, a conclusão e a estabilidade prolongada não foram verificados."
      ],
      "performance": "Floresta: mediana 9,1 FPS (8,0–9,3), 30 leituras em 29,852 s. Cruz automático ativo; alvo interno máximo 3456×1944. Não representa o jogo inteiro. Versão em desenvolvimento de 11 de outubro; RTX 3070 Ti, saída 1920×1080, perfil Speed. Caches preservados e comandos automáticos de Cruz ativados. O jogo controla a resolução interna.",
      "imageAlt": "Estrada inicial de Charon’s Staircase com árvores escuras, luz forte e reflexos de lente"
    },
    "pac-man-world-re-pac": {
      "status": "Introdução · título e termos",
      "headline": "Vídeo inicial e tela de título alcançados; as cores do vídeo estão incorretas.",
      "summary": "PPSA06399 v01.000.002: O executável inicializa o Unity e chega ao título e aos termos após o vídeo inicial. As cores do vídeo estão muito distorcidas. Cruz automático alterna as telas iniciais; o gameplay não foi verificado.",
      "strengths": [
        "Os 180 relatórios de falhas GPU têm contadores zerados; nenhum guest fault registrado."
      ],
      "limits": [
        "Contadores zerados não comprovam gráficos corretos. Nenhuma fase ou controle do personagem foi testado.",
        "Os controles manuais, a qualidade do áudio, os salvamentos, a conclusão e a estabilidade prolongada não foram verificados."
      ],
      "performance": "Transições iniciais: mediana de 9,55 FPS, 5,9–14,1 em 30 leituras durante 29,927 s. Atividade simultânea do launcher; não é um teste de cena fixa nem de gameplay. Versão em desenvolvimento de 11 de outubro; RTX 3070 Ti, saída 1920×1080, perfil Speed. Caches preservados e comandos automáticos de Cruz ativados. O jogo controla a resolução interna.",
      "imageAlt": "Logo de PAC-MAN WORLD Re-PAC e indicação de Cruz sobre uma ilha escura"
    },
    "keywe": {
      "status": "Inicialização · seleção de salvamento · gráficos incompletos",
      "headline": "Imports ausentes implementados; a seleção de salvamento está acessível.",
      "summary": "Versão em desenvolvimento de 11 de outubro, PPSA02210 v01.000.000: pthread_setcancelstate preserva agora o estado de cada thread convidada. Sete imports adicionais de Audio3d também foram implementados, com filas PCM próprias e mixagem estéreo. KeyWe passa pela vinculação e inicialização do Unity.",
      "strengths": [
        "As telas do desenvolvedor e da editora aparecem. Pressões automáticas de Cross chegam ao painel SAVE SLOT com as indicações Select e Delete.",
        "Todos os 635 testes HLE passam. A primeira execução registra 26 relatórios de lacunas GPU com contadores zerados e nenhuma falha do convidado."
      ],
      "limits": [
        "Os espaços capturados estão vazios sobre fundo preto; após a confirmação automática, a tela fica preta enquanto o envio de quadros continua. A jogabilidade não foi verificada. Uma repetição sem entradas automáticas também fica preta após os logotipos.",
        "Audio3d usa posicionamento estéreo aproximado, sem HRTF ou acústica de ambientes. Esta execução abre AudioOut comum; reprodução Audio3d, qualidade do áudio, controles manuais, salvamento e conclusão não foram verificados."
      ],
      "performance": "A captura da seleção mostra 8,1 FPS na RTX 3070 Ti, com saída 1920×1080 e o mesmo tamanho máximo de renderização interna informado no registro. É uma única leitura do contador da janela, não um teste contínuo nem de gameplay.",
      "imageAlt": "Painel SAVE SLOT de KeyWe com três espaços vazios e indicações Select/Delete sobre fundo preto"
    },
    "super-woden-gp": {
      "status": "Menu principal · problemas gráficos · jogabilidade não verificada",
      "headline": "Inicialização corrigida; o menu do mapa mundial está acessível.",
      "summary": "Compilação de desenvolvimento de 11 de outubro, PPSA07211 v01.000.003: duas importações de libkernel que faltavam em Il2CppUserAssemblies.prx do Unity agora têm rotinas reais de limpeza por thread. O jogo conclui a vinculação e a inicialização do Unity e chega à seleção de idioma e ao menu do mapa mundial.",
      "strengths": [
        "Três execuções passam pela inicialização. Entradas automáticas de Cross e Down permitem avançar pela seleção de idioma e abrir o menu principal do mapa.",
        "Os 164 relatórios periódicos de operações GPU omitidas do teste do menu têm contadores zerados; não houve falha do convidado nem erro na chamada das rotinas de limpeza."
      ],
      "limits": [
        "Vários textos e ícones do mapa estão invertidos verticalmente, e as bandeiras da seleção de idioma têm cores incorretas. Contadores zerados não comprovam a correção dos gráficos.",
        "Navegação manual, corridas, qualidade de áudio, salvamentos, conclusão e estabilidade em sessões longas continuam sem verificação."
      ],
      "performance": "A captura do menu mostra 71,8 FPS em uma RTX 3070 Ti, com saída de 1920×1080 e o maior alvo de renderização interno registrado do mesmo tamanho. É uma única leitura do contador da janela com entrada automática, não um teste contínuo, resultado de desempenho em corrida ou comparação antes/depois.",
      "imageAlt": "Menu do mapa mundial de Super Woden GP com textos e ícones invertidos; contador da janela em 71,8 FPS"
    },
    "arcade-spirits-the-new-challengers": {
      "status": "Menu principal · vídeo de introdução · jogabilidade não verificada",
      "headline": "Arranque corrigido; mediana de 252,9 FPS no menu principal.",
      "summary": "Compilação de desenvolvimento de 11 de outubro, PPSA06409 v01.000.000: cinco importações scePthreadSem em falta usam agora semáforos contadores reais e esperas do escalonador. O Python/Ren’Py é inicializado e o runner assinado apresenta o menu principal. Um novo arranque com Cross automático seleciona START e chega ao vídeo de introdução com legendas.",
      "strengths": [
        "START, LOAD, PREFS, PRIZES e ABOUT aparecem sobre a imagem do título; a repetição chega à introdução Fist of Discomfort 2 Pro Tour.",
        "Os 517 relatórios de omissões GPU do menu e os 278 da repetição registam zero, sem falhas do programa convidado nem rejeições de imagens amostradas."
      ],
      "limits": [
        "A navegação manual no menu e a jogabilidade continuam por verificar: as pressões breves da ferramenta de interface não apareceram no diagnóstico Pad.",
        "A qualidade do áudio, a recuperação de gravações, a conclusão do jogo e a estabilidade prolongada não foram testadas. Zero omissões reportadas não garante as cenas posteriores."
      ],
      "performance": "Menu: mediana de 252,9 FPS, intervalo de 221,1–272,3 FPS em 30 leituras do contador da janela, espaçadas por um segundo, durante 29,939 segundos, sem entrada automática. RTX 3070 Ti, saída pedida de 1920×1080, alvo interno de 3840×2160. A captura da introdução mostra 200,3 FPS, uma observação isolada. Não são medições da jogabilidade nem uma comparação antes/depois.",
      "imageAlt": "Menu principal de Arcade Spirits com START, LOAD, PREFS, PRIZES e ABOUT sobre a imagem do título"
    },
    "arkanoid-eternal-battle": {
      "status": "Ecrã de título · menu principal · jogabilidade não verificada",
      "headline": "Arranque e gráficos do menu restaurados; mediana de 45,6 FPS na seleção de modos.",
      "summary": "Compilação de desenvolvimento de 11 de outubro, PPSA06328 v01.002.000: foram implementadas quatro importações Fiber/POSIX em falta. Pilhas HLE independentes e a migração sincronizada de fibras entre threads corrigem as falhas de arranque seguintes. Um limite de transferência separado para grandes atlas BC7 restaura a imagem do título.",
      "strengths": [
        "Dois arranques chegam ao ecrã de título animado. As pressões automáticas de Cross abrem a seleção de modos com Options, Retro, Eternal Battle, Versus e Neo.",
        "Os registos finais não mostram falhas do programa convidado nem rejeições de imagens amostradas; os contadores de omissões GPU reportados mantêm-se a zero nos fotogramas verificados."
      ],
      "limits": [
        "O modo online Eternal Battle indica que não está acessível; o registo do convidado mostra falhas de ligação ao servidor.",
        "A seleção de um modo offline, o controlo da raquete e a jogabilidade continuam por verificar. A qualidade do áudio, a conclusão do jogo e a estabilidade prolongada não foram testadas."
      ],
      "performance": "Menu: mediana de 45,6 FPS, intervalo de 43,5–46,6 FPS em 30 leituras do contador da janela, espaçadas por um segundo, ao longo de 29,962 segundos. As pressões automáticas de Cross permaneceram ativas. Ecrã de título: 138–149 FPS observados, sem medição de duração fixa. RTX 3070 Ti, saída pedida de 1920×1080, alvo interno de 3840×2160. São valores do menu, não de jogabilidade nem de uma comparação antes/depois.",
      "imageAlt": "Menu de modos de Arkanoid com os cartões Retro, Eternal Battle e Versus; contador a 45,2 FPS"
    },
    "raiden-iv-mikado-remix": {
      "status": "Em jogo · primeiro nível visível · jogabilidade não verificada",
      "headline": "O arranque funciona e a correção da limpeza de profundidade restaura o primeiro nível.",
      "summary": "Compilação de desenvolvimento de 11 de outubro, PPSA08832 v01.000.000: o tratamento correto dos metadados SELF elimina o falso erro TruncatedSelf. A análise de ficheiros de áudio, as informações dos racks NGS2, a cache de fontes e as texturas compactadas de 16 bits permitem iniciar. A sincronização das limpezas do plano de profundidade restaura o nível antes negro.",
      "strengths": [
        "Os menus de título e modo levam ao primeiro nível, com porta-aviões, nave do jogador, terreno, inimigos, disparos e interface visíveis.",
        "Os comandos Cross automáticos disparam a arma; a captura mostra 4090 pontos. Não houve falhas do convidado nem contadores de erros de desenho diferentes de zero no trecho verificado."
      ],
      "limits": [
        "O controlo manual, uma partida completa e a estabilidade prolongada não foram testados.",
        "Os metadados ATRAC9 são analisados, mas falta a reprodução ATRAC9 pelo sampler NGS2. A correção do áudio não foi verificada; cancelar threads ativas continua a devolver ENOSYS."
      ],
      "performance": "A captura mostra 16,0 FPS; uma imagem anterior do porta-aviões mostrava 20,7 FPS. Vinte fotogramas amostrados do perfil têm mediana de 49 ms (29–110 ms). As cenas variáveis não constituem uma comparação controlada nem uma medição de FPS sustentados. RTX 3070 Ti, renderização padrão sem substituições de diagnóstico.",
      "imageAlt": "Primeiro nível de Raiden IV com a nave a disparar, inimigos, terreno e interface; pontuação 4090"
    },
    "dead-cells": {
      "status": "Menu principal · primeira fase visível · jogabilidade por verificar",
      "headline": "A primeira sala, a personagem e o HUD são visíveis; a música do menu já produz um sinal.",
      "summary": "Compilação de desenvolvimento de 11 de outubro, PPSA15552 v01.005.000: após adicionar oito importações NGS2, duas correções gerais restauram a imagem da fase e o processamento da música do menu. As cópias de ecrã inteiro respeitam agora a mistura e preservam a cena iluminada. As vozes do sampler NGS2 personalizado aceitam formato, blocos e altura do som em vez de misturarem silêncio.",
      "strengths": [
        "São visíveis a sala dos Aposentos dos Prisioneiros, a personagem, a arma, a dica do tutorial e o HUD.",
        "Os 101 relatórios periódicos registam zero falhas de draw/dispatch; a repetição não rejeita image_sample com InvalidStorageBinding."
      ],
      "limits": [
        "Pressões automáticas de Cross iniciaram a partida; combate, progressão, gravações e sessões longas não foram testados.",
        "O áudio do menu foi confirmado apenas pelos níveis da mistura, sem audição. As matrizes de áudio espacial e a distribuição pelos canais continuam incompletas."
      ],
      "performance": "Sete leituras do contador da janela na sala inicial: 59,2–68,1 FPS, incluindo 62,5 FPS na captura; não é uma mediana de um intervalo fixo. Leituras anteriores do menu: 71–72 FPS. RTX 3070 Ti, predefinição Speed e saída 1080p solicitada.",
      "imageAlt": "Dead Cells nos Aposentos dos Prisioneiros com a sala iluminada, personagem, tutorial e HUD"
    },
    "little-nightmares-enhanced-edition": {
      "status": "Em jogo · renderização incompleta",
      "headline": "Salvar e carregar funciona; 3,73–4,46 FPS no primeiro quarto.",
      "summary": "3 de outubro, PPSA10737 v01.004.000: gravações assíncronas preservam o progresso e um novo processo carrega o primeiro quarto ao continuar. HTILE, leituras imediatas da GPU agrupadas e quatro threads de cópia reduzem o custo de renderização. Os 5 FPS ainda não foram alcançados.",
      "strengths": [
        "Novo jogo, movimento, acompanhamento da câmera e isqueiro verificados.",
        "Saves não vazios são gravados e carregados após reiniciar o emulador."
      ],
      "limits": [
        "Persistem iluminação escura, materiais reflexivos incorretos e shaders FLAT/interseção de raios sem suporte.",
        "Falhas intermitentes do gerenciador de memória podem interromper a inicialização; conclusão e estabilidade prolongada não foram verificadas."
      ],
      "performance": "Build atual com padrões: 4,46 FPS junto à mala e 3,73 FPS após mover para a direita, em amostras de 30 segundos sem pausa. RTX 3070 Ti, saída 1080p, preset Speed e modo Performance do jogo; resolução interna controlada pelo jogo. Os 2,16 FPS anteriores não foram medidos na mesma posição. A meta de 5 FPS não foi atingida.",
      "imageAlt": "Six junto à mala no primeiro quarto; iluminação escura e materiais reflexivos incorretos persistem"
    },
    "gta-iii-definitive-edition": {
      "status": "Em jogo · movimento verificado",
      "headline": "Inicialização sem cache pelo launcher verificada; reflexos verdes corrigidos.",
      "summary": "Versão de desenvolvimento de 10 de outubro, PPSA03527 v1.007: o executável instalado e assinado chega automaticamente ao menu após os dois vídeos de abertura, sem os caches do emulador. Give Me Liberty mostra personagem, carro, ponte, HUD e minimapa. A ordem correta das gravações de buffers e imagens elimina o preenchimento verde observado nos reflexos; a análise compartilhada de shaders reduz o trabalho repetido da CPU.",
      "strengths": [
        "O launcher real chega ao menu sem cache e sem pular os vídeos; uma nova partida carrega a primeira missão.",
        "Movimento pelo teclado e mudança de direção verificados."
      ],
      "limits": [
        "A cena inicial não registra falhas de desenho ou de despacho de computação, nem vínculos de recursos de armazenamento não resolvidos; shaders posteriores e outros defeitos visuais não foram totalmente verificados.",
        "Em 11 de outubro foram relatadas sombras de carros e objetos que seguem o personagem e sombras duplicadas do personagem. A reprodução e a correção estão pendentes. Uma chamada rejeitada na inicialização com apenas um shader de vértices também está em investigação.",
        "Conclusão do jogo, estabilidade prolongada, recuperação de salvamentos e correção do áudio não foram verificadas."
      ],
      "performance": "Medições de 10–11 de outubro na posição inicial: 7,37 FPS no executável instalado após iniciar sem cache e 8,27 FPS após indexar a análise escalar de uniformes. Cada intervalo dura 30 segundos sem pausa. Uma amostra posterior de 7,10 FPS com movimento do usuário foi excluída da comparação com câmera fixa. Performance, Bloom/Motion Blur desativados, Classic Lighting ativado; saída 1080p, resolução interna controlada pelo jogo. Tráfego e horário variam. As mudanças posteriores no índice de buffers e nas chaves compactas de variantes aguardam uma medição sem intervenção; 10 FPS ainda não foram confirmados.",
      "imageAlt": "Personagem e carro de GTA III na Callahan Bridge após verificar a inicialização sem cache pelo launcher e corrigir os reflexos"
    },
    "subnautica-below-zero": {
      "status": "Jogável · Concluível",
      "headline": "Uma nova partida chega à área inicial; a câmera e a caminhada foram verificadas.",
      "summary": "Repetição de 3 de outubro, PPSA02457 v1.022.125: o executável instalado restaura a partida Survival e mostra o local nevado da queda e o HUD. A medição usa a versão atual após as alterações comuns do renderizador para GTA III; esta verificação não acrescenta novas correções.",
      "strengths": [
        "Verificados: nova partida, introdução, mundo, câmera e caminhada."
      ],
      "limits": [
        "Persistem iluminação escura, defeitos gráficos e pausas longas.",
        "Conclusão do jogo, correção do áudio e estabilidade prolongada continuam por verificar."
      ],
      "performance": "Novo processo, mesmo executável e partida Survival: menu a 15,50 FPS; duas medições de 30 segundos sem pausa e com câmara fixa a 12,70 e 8,50 FPS, 10,60 FPS combinados. Saída 1080p, Speed, caches aquecidas. Não houve paragem de dez segundos nestes intervalos, mas persistem atrasos mais curtos. O arranque anterior deu uma média de 9,52 FPS. É variação entre testes, não uma nova otimização; os 30 FPS continuam por atingir.",
      "imageAlt": "Local nevado da queda e HUD de sobrevivência de Subnautica: Below Zero na medição de 3 de outubro"
    },

    "terminator-2d-no-fate": {
      status: "Jogável · Finalizável",
      headline: "Terminado sem nenhum problema relatado.",
      summary:
        "O mantenedor terminou este jogo. Fundos, personagens, HUD, texturas e cores saem como pretendido e, desde a confirmação de 8 de setembro, é o título de referência mais estável do projeto.",
      strengths: [
        "Uma partida completa sem defeitos relatados.",
        "O alfa das texturas, a ordem dos canais e a amostragem sRGB preservam o equilíbrio de cores pretendido.",
        "HUD e arte dos personagens são desenhados com limpeza do começo ao fim.",
      ],
      limits: [
        "Os tempos por quadro ainda variam com a cena em vez de se manterem fixos.",
      ],
      performance:
        "Já aquecido, os quadros de inicialização ficam entre 22 e 65 ms na máquina de referência.",
      imageAlt:
        "Terminator 2D: No Fate, partida com o personagem, o HUD e uma cena no deserto, renderizada pelo PS5PCEM",
    },

    "asterix-obelix-slap-them-all": {
      status: "Jogável · Finalizável",
      headline: "Terminado de ponta a ponta, com introdução e interface corretas.",
      summary:
        "Partida completa confirmada. Jogo e interface são desenhados no sentido certo, e a introdução toca. A composição final em tela cheia permanece na GPU, e a saída preserva a orientação da janela convidada sem copiar um quadro pela memória do anfitrião.",
      strengths: [
        "Partida completa confirmada pelo mantenedor.",
        "O vídeo de introdução toca, e jogo e interface estão corretamente orientados.",
        "Uma sessão de desenvolvimento de 3.000 apresentações terminou sem um único envio rejeitado.",
      ],
      limits: [
        "O custo por quadro depende da densidade da cena em vez de ser fixo.",
      ],
      performance: "Teste de desenvolvimento de 9 de outubro: mediana de 46,45 → 162,20 FPS na cena inicial parada, amostras de 30 segundos do contador da janela, saída 1080p, RTX 3070 Ti. Fases posteriores não medidas.",
      imageAlt:
        "Asterix & Obelix: Slap Them All!, partida numa floresta com o HUD e uma placa GO, renderizada pelo PS5PCEM",
    },

    "cat-quest-iii": {
      status: "Jogável · Finalizável",
      headline:
        "Terminado, com menus, diálogos e relevo da ilha bem desenhados.",
      summary:
        "Partida completa confirmada. Menus, cartas de aventura, diálogos, relevo da ilha e cores estão corretos nas cenas capturadas. Foi preciso corrigir a orientação do mundo, as passagens só de estêncil, o mapeamento de interpolantes AGC e a ordem dos canais na saída.",
      strengths: [
        "Partida completa confirmada pelo mantenedor.",
        "A lista de idiomas mantém seu texto e o recorta dentro do painel em vez de ser coberta.",
        "A seleção de aventura mostra a arte dos slots, os rótulos, os botões de adicionar e as setas de rolagem.",
      ],
      limits: [
        "O limite que resta é a taxa de quadros na ilha inicial, não a correção da renderização.",
      ],
      performance:
        "As amostras da ilha inicial têm mediana de 124 ms, cerca de 8 FPS, contra uns 148 ms antes do trabalho de otimização.",
      imageAlt:
        "Cat Quest III, partida na ilha com o HUD, montanhas e mar azul, renderizada pelo PS5PCEM",
    },

    "dreaming-sarah": {
      status: "Jogável · Finalizável",
      headline: "A floresta inicial supera 100 FPS após otimizar o envio de vértices.",
      summary:
        "A compilação de desenvolvimento de 10 de outubro envia intervalos de vértices comprovados em vez de buffers de sprites excessivos. As transferências caem de cerca de 78 para 4,9 MiB por quadro inicial. Movimento, salto e a próxima tela de plataformas foram verificados; o relato anterior de conclusão permanece registrado.",
      strengths: [
        "Partida completa confirmada pelo mantenedor.",
        "Início, 60 segundos: mediana 198.25 FPS, faixa 187.8–203.2. Após acordar: 197.25 FPS; próxima tela: 144.35 FPS (30 segundos cada).",
        "Título animado, cenas do mundo e NPCs são todos desenhados corretamente.",
      ],
      limits: [
        "Amostras do contador da janela em RTX 3070 Ti, saída 1080p e áudio ligado; não estabelecem um mínimo para o jogo inteiro.",
        "O carregamento exigiu restaurar eboot.bin e sce_module/libc.prx a partir das cópias deixadas pelo patcher de eboot da própria cópia, que havia truncado os dois.",
      ],
      performance:
        "Início, 60 segundos: mediana 198.25 FPS, faixa 187.8–203.2. Após acordar: 197.25 FPS; próxima tela: 144.35 FPS (30 segundos cada).",
      imageAlt:
        "Floresta inicial de Dreaming Sarah após limitar o envio de vértices",
    },

    "jurassic-park-classic-games-collection": {
      status: "Jogável · Finalizável",
      headline:
        "Inicialização restaurada; primeira fase verificada novamente.",
      summary:
        "O jogo volta a iniciar com o commit de desenvolvimento a3d371e. O teste de 8 de outubro de 2026 concluiu duas inicializações, chegou à primeira fase e confirmou que o mapa responde ao teclado. O relato anterior do desenvolvedor confirmando uma campanha concluída permanece no histórico.",
      strengths: [
        "A versão de desenvolvimento de 8 de outubro cria o atlas de fontes e chega à primeira fase.",
        "Partida completa confirmada pelo mantenedor.",
        "A seleção mostra capas, setas de navegação e uma prévia animada.",
        "A renderização na inicialização, o logotipo do título e o pedido de confirmação estão corretos.",
      ],
      limits: [
        "Percorrer repetidamente as prévias em vídeo pode esgotar um conjunto de descritores do AvPlayer, após o que as prévias seguintes congelam.",
        "O custo por quadro varia conforme o jogo da coleção e o hardware.",
      ],
      performance:
        "As medições anteriores das telas de título e seleção ficaram em torno de 27 e 33 ms por quadro. O teste de 8 de outubro verificou a inicialização e a primeira fase; não foi realizado um novo benchmark de FPS.",
      imageAlt:
        "Primeira fase de Jurassic Park nos portões do parque após a correção da inicialização do atlas de fontes, renderizada pelo PS5PCEM",
    },

    "jets-n-guns-2": {
      "status": "Jogável · Finalizável",
      "headline": "Terminado, com fases, HUD, pontuação e parallax todos corretos.",
      "summary": "Música e efeitos agora usam fluxos de saída separados. A correção de desenvolvimento de 9 de outubro também preserva a ordem PCM após o esvaziamento da fila e é posterior à versão 0.3.4. O desenvolvedor confirmou uma partida completa em 15 de setembro.",
      "strengths": [
        "Partida completa confirmada pelo mantenedor.",
        "Fases, HUD, pontuação, inimigos e camadas de parallax são todos desenhados corretamente.",
        "Música e efeitos não disputam mais um único dispositivo de saída."
      ],
      "limits": [
        "A gravação final do menu de 30 segundos ainda contém um intervalo silencioso de 30 ms; a causa não foi determinada.",
        "Os testes curtos de áudio no menu e em combate passaram; latência total e estabilidade prolongada não foram medidas."
      ],
      "performance": "O contador em combate mostrou 35,7–45,8 FPS em 9 de outubro. Os antigos 11–14 FPS são de outra versão e cena; não é uma comparação controlada de desempenho.",
      "imageAlt": "Combate em Pirate Base durante o teste de áudio de 9 de outubro"
    },

    "the-precinct": {
      status: "Menu de título, filmes de introdução e um primeiro quadro no motor",
      headline:
        "Toca os dois filmes de introdução, desenha o menu de título e entra no carregamento frio do mundo.",
      summary:
        "O grafo convidado completo de seis imagens se liga, os plug-ins do Unity iniciam, e os dois filmes de introdução observados tocam como vídeo 4K sincronizado com som estéreo de 48 kHz. A arte do título e uma confirmação NEW GAME legível são desenhadas, e manter Triângulo inicia o carregamento do mundo. Uma sessão anterior protegida produziu o primeiro quadro de jogo verificado no motor.",
      strengths: [
        "Os dois filmes de introdução tocam como vídeo 3840×2160 sincronizado com som estéreo de 48 kHz.",
        "A arte completa do título em 1920×1080 e uma confirmação NEW GAME legível são desenhadas.",
        "A entrega de exceção a uma thread alvo conclui o aperto de mão de parada global do Unity.",
      ],
      limits: [
        "A primeira transição para o mundo ainda leva minutos: tradução de shaders no primeiro uso, compilação de pipelines pelo driver, envio sincrônico e preparação de recursos custam todos caro.",
        "Um contorno de compilador próprio deste título foi removido em favor do caminho geral de shaders, então a transição precisa de nova validação de ponta a ponta antes de qualquer afirmação sobre jogabilidade.",
      ],
      performance:
        "O quadro de carregamento do mundo agora mede 2,1 s contra 5,1 s, desde que a recuperação de descritores deixou de repetir o prólogo de cada kernel para cada recurso que ele nomeia.",
      imageAlt:
        "The Precinct, menu de título com a confirmação NEW GAME, renderizado pelo PS5PCEM",
    },

    "ghost-of-yotei": {
      status:
        "Reprodução da introdução · avisos de bônus · calibração de brilho · chega a cenas de jogo · não jogável",
      headline:
        "Os menus e a árvore aparecem, com defeitos visíveis e uma taxa de quadros muito baixa.",
      summary:
        "É o caso de teste mais difícil do projeto e o mais documentado. Os filmes de introdução têm som, os avisos de bônus e a calibração de brilho aparecem, e cenas 3D tardias, incluindo a da árvore, chegam à tela. Nada disso é jogável: os quadros de cena chegam bem abaixo de 1 FPS, e nenhuma partida completa é afirmada.",
      strengths: [
        "Os filmes de introdução rodam a cerca de seus 30 FPS nativos, com o som começando em sincronia com a trilha.",
        "O indicador de carregamento, os avisos de bônus e a tela de calibração com a imagem do lobo, o controle deslizante e o aviso são todos desenhados.",
        "Cenas 3D tardias, incluindo a da árvore, chegam à tela com a música do menu audível.",
      ],
      limits: [
        "O jogo em si — mover um personagem por um mundo carregado — continua não verificado.",
        "A preparação de cenas é extremamente lenta, e um quadro de transição foi medido em 167,2 s, dos quais 164,8 s criaram 206 pipelines de computação.",
        "Duas verificações recentes pararam esperando a conclusão da GPU antes da cena da árvore e foram encerradas de propósito depois do diagnóstico.",
        "Chamadas de desenho indiretas inválidas, uma falha de contador corrompido, rastros e brilho excessivo seguem todos em aberto.",
      ],
      performance:
        "Medições de referência da árvore em 3 de outubro antes da mudança de estados dinâmicos: 0,83–0,97 FPS contando quadros apresentados durante 30 segundos. O resultado anterior de 0,73 FPS é histórico. São medições da árvore e da configuração, não da jogabilidade após a cena. Históricos de cache diferentes impedem uma comparação controlada antes e depois.",
      imageAlt:
        "Aviso Digital Deluxe Bonus de Ghost of Yōtei, renderizado pelo PS5PCEM",
    },

    "quake-ii-2023": {
      status: "Jogável · Finalizável",
      headline: "Terminado, com iluminação, modelos e armas restaurados.",
      summary:
        "Confirmado jogável em 16 de setembro de 2026 e reverificado em 25 de setembro como PPSA09477 v1.003. A iluminação das fases, as texturas, as armas e os NPCs estão visíveis: o mundo escuro e os modelos ausentes de compilações anteriores estão resolvidos na partida observada. Menus, HUD e controle funcionam todos.",
      strengths: [
        "Partida completa confirmada pelo mantenedor, com a renderização reverificada depois.",
        "Iluminação, texturas, armas e modelos de NPC aparecem; os defeitos anteriores de mundo escuro e geometria ausente desapareceram.",
        "Menus, HUD e entrada de controle se comportam corretamente.",
      ],
      limits: [
        "Combates carregados continuam bem abaixo dos picos, então os números altos não são um piso.",
        "O trabalho de desempenho continua.",
      ],
      performance:
        "O mantenedor relata picos de 60–70 FPS em cenas mais leves, enquanto combates carregados seguem nitidamente mais lentos. A reutilização de buffers e as limpezas pela GPU reduziram o custo das transferências.",
      imageAlt:
        "Quake II, partida com uma fase iluminada, inimigos visíveis e a arma do jogador, renderizada pelo PS5PCEM",
    },

    reanimal: {
      status: "Menu de título animado em 4K, com rótulos incompletos",
      headline:
        "Toca a sequência do logotipo e sustenta o grafo de renderização do menu de título animado.",
      summary:
        "Os módulos nativos e de firmware observados são resolvidos, a sequência do logotipo da empresa toca, e o menu de título animado em 3840×2160 continua sendo desenhado. O fundo com a boia, o logotipo, os reflexos da água e o aviso SELECT estão visíveis — os rótulos das opções do menu, não.",
      strengths: [
        "A sequência do logotipo da empresa toca e o menu de título animado em 4K se sustenta.",
        "Os buffers intermediários estreitos da interface do Unity já não substituem a saída completa.",
        "Os atlas de fontes R8 dinâmicos invalidam corretamente imagens amostradas obsoletas.",
      ],
      limits: [
        "Os rótulos centrais do menu ficam reduzidos a pequenas marcas vermelhas, então a navegação e a passagem para o jogo não estão verificadas.",
        "Desempenho e estabilidade em sessões longas não estão medidos, e nenhuma jogabilidade é afirmada.",
      ],
      imageAlt:
        "Menu de título animado de REANIMAL com rótulos incompletos, renderizado pelo PS5PCEM",
    },

    "ritas-rewind": {
      status: "Jogável · Finalizável",
      headline:
        "Terminado, da sequência da publicadora até o jogo no Command Center.",
      summary:
        "Confirmado jogável em 24 de setembro de 2026. A sequência da publicadora, o menu de título e o jogo são desenhados e respondem ao controle; a captura mostra o Ranger vermelho na fase de treinamento do Command Center com HUD, barra de vida, objetivos e indicações de botões.",
      strengths: [
        "Partida completa confirmada pelo mantenedor.",
        "As fibras cooperativas nativas mantêm intactas as pilhas convidadas suspensas.",
        "A implementação exata de V_SAD_U32, V_MUL_HI_I32 e V_CVT_FLR_I32_F32 removeu o shader de diagnóstico de reserva.",
      ],
      limits: [
        "A composição CRT convidada exata ainda produz ruído na máquina de referência, então um caminho de reserva estreitamente casado por assinatura de shader amplia a cena 4× em RGBA8 antes do pós-processamento.",
      ],
      performance:
        "A introdução mantém cerca de 13–20 ms por quadro. Quadros densos depois do menu, de umas 255 chamadas de desenho, custam perto de 470 ms, sobretudo pela preparação repetida de buffers convidados.",
      imageAlt:
        "Mighty Morphin Power Rangers: Rita's Rewind, partida com o Ranger vermelho no Command Center, renderizada pelo PS5PCEM",
    },

    "big-helmet-heroes": {
      status: "Menu principal e tutorial são desenhados · jogabilidade não verificada",
      headline:
        "Chega a um menu principal correto e a uma cena de tutorial, com quadros de um só dígito.",
      summary:
        "O título passa da introdução para um menu principal bem desenhado, com modelos de personagens, texturas, iluminação e cores, e segue para uma cena de tutorial. As correções cobriram o endereçamento de texturas Gen5 de amostra única, os alvos de renderização em camadas e a ordem dos canais na saída. O jogo em si não está verificado.",
      strengths: [
        "Um menu principal correto com modelos, texturas, iluminação e cores.",
        "A cena de tutorial é desenhada depois de corrigidos os travamentos na inicialização e no carregamento.",
        "A saída é um 1080p limpo, embora os alvos internos possam ser maiores.",
      ],
      limits: [
        "Jogabilidade, recuperação de saves e estabilidade em sessões longas estão todas não verificadas.",
        "Restam artefatos visuais, e cópias, preparação de recursos e esperas de GPU seguem caras.",
        "Ainda não se atingem 15 FPS estáveis no menu.",
      ],
      performance: "Mediana do menu: 9,4 FPS (9,0–9,5), antes 4,9 FPS; 45 amostras do contador da janela a cada segundo após aquecimento. RTX 3070 Ti, saída 1080p, resolução interna controlada pelo jogo. Todas as amostras abaixo de 15 FPS. Tutorial não medido novamente.",
      imageAlt: "Menu de Big Helmet Heroes com personagens, texto legível e relva laranja densa",
    },

    "tetris-effect-connected": {
      status:
        "Logotipos dos desenvolvedores · tela de licença legível · seleção do modo Journey · jogabilidade não verificada",
      headline:
        "Logotipos, tela de licença e seleção de Journey são desenhados, muito mais rápido que antes.",
      summary:
        "Verificado em 24 de setembro de 2026 com PPSA07923 v2.000.022. Uma composição traduzida substituiu as antigas substituições 4K especulativas, e as páginas de licença e de menu agora são desenhadas sem a interface duplicada e a costura vertical vistas em compilações anteriores. As duas telas também ficaram bem mais baratas.",
      strengths: [
        "A tela de licença e os menus são desenhados sem interface duplicada nem fronteira vertical de cena.",
        "Publicar preenchimentos lineares de metadados, com limpezas DCC R11G11B10 e RGB10A2, removeu as cópias de interface acumuladas.",
        "Um perfil de 128 alvos retém o conjunto de trabalho de cerca de 100 anexos em vez de saturar um cache menor.",
      ],
      limits: [
        "Elementos escuros da interface e uma ligação de textura de computação não resolvida seguem em aberto.",
        "A reprodução de vídeo posterior falha no decodificador H.264 convidado.",
        "A estabilidade em sessões longas e a jogabilidade não estão estabelecidas.",
      ],
      performance:
        "A mediana dos quadros de licença caiu de 235 ms para 159 ms, de cerca de 4,3 para 6,3 FPS. Os quadros amostrados de Journey caíram de 1127–1276 ms para 318–396 ms.",
      imageAlt:
        "Um quadro inicial de partículas de Tetris Effect, renderizado pelo PS5PCEM",
    },

    "propagation-paradise-hotel": {
      status:
        "Monta seu pacote, abre o arquivo de shaders, envia o primeiro buffer de comandos",
      headline: "Conclui a inicialização do Unreal até seu primeiro envio.",
      summary:
        "O pacote Unreal de 8,8 GiB é montado, a inicialização de ICU e da configuração se completa, o arquivo global de shaders pré-compilado é aberto, os shaders AGC são criados e o primeiro buffer de comandos é enviado. Nada se afirma sobre um quadro apresentado.",
      strengths: [
        "O pacote Unreal de 8,8 GiB é montado e a inicialização do motor se completa.",
        "O arquivo global de shaders pré-compilado é aberto e os shaders AGC são criados.",
        "O primeiro buffer de comandos chega ao envio.",
      ],
      limits: [
        "A etapa é anterior aos construtores de pacotes de sincronização atuais e precisa de uma sessão nova.",
        "A saída de VR não tem ponte para um headset no anfitrião, então não há nada para onde apresentar.",
      ],
    },

    "pistol-whip": {
      status: "Carrega seus módulos de VR e depois os arquivos do Unity",
      headline: "Vai até o carregamento dos arquivos de dados do Unity.",
      summary:
        "O plug-in nativo de PS VR2 e o módulo Burst são ambos carregados, e o título começa a carregar seus arquivos de dados do Unity. Tudo a partir daí depende de um suporte de VR que o projeto adiou de propósito.",
      strengths: [
        "O plug-in nativo de PS VR2 e o módulo Burst são carregados com sucesso.",
        "O carregamento dos arquivos de dados do Unity começa.",
      ],
      limits: [
        "Suporte a headset, rastreamento, controles e OpenXR no anfitrião está adiado de propósito.",
      ],
    },
  },

  history: {
    "oxide-room-104-startup-20261011": {
      "title": "O aviso de salvamento aparece; depois há falhas de shaders e da fila.",
      "summary": "PPSA07653 v01.000.000: Dois testes passam pela vinculação. Cruz automático leva à tela preta com erros FLAT, IMAGE_BVH_INTERSECT_RAY, InvalidScalarCall e DMA_DATA. A repetição apenas com teclado mostra o aviso de salvamento. Gameplay não verificado.",
      "imageAlt": "Aviso de salvamento de Oxide Room 104 com ícone branco e Cruz OK sobre fundo vermelho escuro"
    },
    "medieval-dynasty-startup-20261011": {
      "title": "O menu aparece, mas a imagem e o texto estão de cabeça para baixo.",
      "summary": "PPSA07933 v01.413.001: O executável chega ao menu principal. Fundo, logo e opções estão invertidos verticalmente. Cruz automático não abre uma fase durante o teste; gameplay não verificado.",
      "imageAlt": "Menu de Medieval Dynasty com aldeia nevada, logo e texto invertidos verticalmente"
    },
    "charons-staircase-startup-20261011": {
      "title": "A introdução ilustrada chega à estrada na floresta.",
      "summary": "PPSA06603 v01.000.000: O executável alcança a primeira estrada em 3D. Um quadro de transição dura 32,342 s, sendo 26,810 s em falhas de cache dos pipelines gráficos. A cena aparece; controle e jogabilidade não foram verificados.",
      "imageAlt": "Estrada inicial de Charon’s Staircase com árvores escuras, luz forte e reflexos de lente"
    },
    "pac-man-world-re-pac-startup-20261011": {
      "title": "Vídeo inicial e tela de título alcançados; as cores do vídeo estão incorretas.",
      "summary": "PPSA06399 v01.000.002: O executável inicializa o Unity e chega ao título e aos termos após o vídeo inicial. As cores do vídeo estão muito distorcidas. Cruz automático alterna as telas iniciais; o gameplay não foi verificado.",
      "imageAlt": "Logo de PAC-MAN WORLD Re-PAC e indicação de Cruz sobre uma ilha escura"
    },
    "keywe-pthread-audio3d": {
      "title": "Estado de cancelamento de threads e Audio3d desbloqueiam a inicialização",
      "summary": "Foram implementados o estado de cancelamento por thread, o retorno do valor anterior e a validação de argumentos, além de sete APIs Audio3d com filas PCM próprias, posição/ganho e mixagem estéreo simultânea. Todos os 635 testes HLE passam. A seleção de salvamento é alcançada, mas a tela preta seguinte continua sem solução. Áudio espacial completo e gameplay não confirmados. Versão em desenvolvimento.",
      "imageAlt": "Painel SAVE SLOT de KeyWe com três espaços vazios e indicações Select/Delete sobre fundo preto"
    },
    "super-woden-gp-pthread-cleanup": {
      "title": "Rotinas de limpeza de threads desbloqueiam a inicialização do Unity",
      "summary": "Implementados __pthread_cleanup_push_imp e __pthread_cleanup_pop_imp com uma lista LIFO por thread convidada na memória fornecida por quem chama. Pop remove a entrada antes do callback; pthread_exit executa as rotinas restantes antes dos destrutores TLS. Todos os 627 testes HLE passam. Uma terceira execução chega ao menu do mapa com entradas Cross/Down automáticas. A captura mostra 71,8 FPS, mas textos invertidos e cores incorretas nas bandeiras persistem. Corridas não testadas. Compilação de desenvolvimento.",
      "imageAlt": "Menu principal do mapa de Super Woden GP após corrigir a inicialização, ainda com textos invertidos"
    },
    "arcade-spirits-pthread-semaphores": {
      "title": "Semáforos contadores pthread permitem o arranque e a introdução",
      "summary": "Implementados scePthreadSemInit, Wait, Trywait, Post e Destroy sobre o armazenamento comum de semáforos. As esperas suspendem a thread e consomem sinais; Post reserva um sinal antes de acordar o destinatário. A tentativa não bloqueante sem sinais, o excesso do contador, identificadores inválidos e a destruição com threads em espera devolvem erros. Passam os 625 testes HLE. O runner recompilado e assinado chega ao menu com uma mediana de 252,9 FPS em 30 leituras; uma repetição com Cross automático abre o vídeo inicial com legendas legíveis. Controlos manuais, jogabilidade e qualidade do áudio por verificar. Compilação de desenvolvimento.",
      "imageAlt": "Vídeo inicial de Fist of Discomfort 2 Pro Tour em Arcade Spirits com legendas legíveis; contador a 200,3 FPS"
    },
    "arkanoid-fiber-startup": {
      "title": "Arranque com fibras corrigido e grandes atlas do menu restaurados",
      "summary": "Implementados sceFiberGetInfo, sceFiberRename, pthread_mutexattr_setpshared privado do processo e fsync real, partilhado com sceKernelFsync. As pilhas HLE próprias de cada fibra evitam transbordos; a migração sincronizada permite retomar tarefas de carregamento noutra thread. Um limite separado de 512 MiB para transferir imagens amostradas aceita os atlas BC7 de 16K sem aumentar os limites dos framebuffers. Passam os 623 testes HLE e os 244 testes Vulkan; o runner recompilado e assinado chega ao título e ao menu de modos em arranques repetidos. Mediana do menu: 45,6 FPS em 30 leituras. Jogabilidade não verificada; compilação de desenvolvimento.",
      "imageAlt": "Imagem do título de Arkanoid: Eternal Battle restaurada com o pedido START; contador a 138,0 FPS"
    },
    "raiden-iv-startup-depth": {
      "title": "Arranque corrigido; limpezas de profundidade restauram o primeiro nível",
      "summary": "O carregador distingue os metadados de versão da biblioteca das tabelas dinâmicas, em vez de ler um segmento ausente de 39 bytes. As consultas de ficheiros e racks NGS2 e a cache de fontes estão implementadas; as texturas compactadas de 16 bits usam a ordem correta dos canais. A publicação em Vulkan das limpezas completas do plano de profundidade elimina o nível negro. O teste final com entrada automática chega ao primeiro nível com disparos e inimigos visíveis. Passam os 921 testes do carregador, HLE e Vulkan e duas verificações nativas de limpeza na GPU. É uma compilação de desenvolvimento; a reprodução ATRAC9 no sampler, o cancelamento de threads ativas e a jogabilidade completa continuam incompletos.",
      "imageAlt": "Primeiro nível de Raiden IV com a nave a disparar, inimigos, terreno e interface; pontuação 4090"
    },
    "dead-cells-level-menu-audio": {
      "title": "Composição da cena e áudio do sampler personalizado corrigidos",
      "summary": "Um atalho de cópia ignorava a mistura e substituía a cena iluminada por uma imagem emissiva preta. Limitá-lo à mistura por substituição restaura a fase e a personagem. O rack NGS2 personalizado (0x4001) aceita agora formato, blocos e altura do som; a mistura do menu passa do silêncio para um pico próximo de 0,12 da escala completa. A música ainda não foi confirmada por audição. Sete leituras na sala inicial vão de 59,2 a 68,1 FPS; combate, progressão e gravações não foram testados.",
      "imageAlt": "Dead Cells nos Aposentos dos Prisioneiros com a sala iluminada, personagem, tutorial e HUD"
    },
    "dead-cells-ngs2-link": {
      "title": "Funções de áudio NGS2 permitem ao Dead Cells fazer a ligação e chegar ao jogo",
      "summary": "A versão de desenvolvimento de 11 de outubro implementa oito funções de libSceNgs2 de que o Dead Cells precisa para fazer a ligação: a criação do sistema de áudio e dos racks num buffer do jogo e as funções de geometria de áudio 3D — base do ouvinte, atenuação por distância, cone, efeito Doppler e panorâmica entre altifalantes. Todas as chamadas observadas têm sucesso. O menu principal é desenhado corretamente, a 71–72 FPS segundo o contador da janela; no jogo aparecem o HUD e a dica do tutorial, mas a fase e a personagem estão escuras. O menu principal não tem som; o jogo tem.",
      "imageAlt": "Menu principal do Dead Cells com a arte da atualização Clean Cut"
    },
    "sarah-bounded-vertex-uploads": {
      "title": "Intervalos de vértices comprovados eliminam envios excessivos",
      "summary": "A compilação de desenvolvimento de 10 de outubro envia intervalos de vértices comprovados em vez de buffers de sprites excessivos. As transferências caem de cerca de 78 para 4,9 MiB por quadro inicial. Movimento, salto e a próxima tela de plataformas foram verificados; o relato anterior de conclusão permanece registrado. Início, 60 segundos: mediana 198.25 FPS, faixa 187.8–203.2. Após acordar: 197.25 FPS; próxima tela: 144.35 FPS (30 segundos cada). Amostras do contador da janela em RTX 3070 Ti, saída 1080p e áudio ligado; não estabelecem um mínimo para o jogo inteiro.",
      "imageAlt": "Floresta inicial de Dreaming Sarah após limitar o envio de vértices"
    },
    "subnautica-acm-convolution": {
      "title": "A reverberação ACM corrige o áudio atrasado e corrompido",
      "summary": "O ACM agora calcula a reverberação por convolução e rejeita a espera pelo primeiro lote inválido. Antes, o FMOD misturava um buffer não preenchido, causando estalos, NaN e silêncio prolongado. Duas novas inicializações produzem PCM válido em 11–13 segundos; o responsável confirmou som claro. A explicação anterior sobre Options foi retirada. Os 606 testes HLE passam. Cortes breves, defeitos gráficos e a meta de 30 FPS continuam pendentes.",
      "imageAlt": "Menu de Subnautica durante o teste de áudio ACM"
    },
    "asterix-msaa-depth-passes": {
      "title": "Correção de profundidade e estêncil MSAA acelera a floresta inicial",
      "summary": "A versão de desenvolvimento de 9 de outubro preserva a quantidade de amostras nas passagens de profundidade e estêncil, restaura máscaras e elimina quatro leituras acidentais de imagem completa por quadro. A mediana do contador de FPS na cena inicial parada sobe de 46,45 para 162,20 em amostras de 30 segundos, com RTX 3070 Ti e saída 1080p. Movimento e primeiro encontro com romanos foram verificados novamente. Passam os 233 testes Vulkan e as verificações nativas 2×/4×. É uma correção geral do renderizador após 0.3.4, não um mínimo em todas as fases nem uma nova partida completa.",
      "imageAlt": "Astérix na floresta inicial com indicadores verdes do HUD após a correção MSAA"
    },
    "quake2-raw-pcm-audio": {
      "title": "Blocos PCM restauram o áudio de Quake II",
      "summary": "A versão de desenvolvimento de 9 de outubro processa PCM estéreo, comandos compactos e blocos NGS2 de 256 amostras. Uma gravação de dez segundos da demonstração passa do silêncio total a ter áudio, sem blocos de 10 ms totalmente silenciosos. Roteamento e efeitos continuam incompletos. Não é uma nova partida completa nem um teste FPS; os 602 testes HLE passaram.",
      "imageAlt": "Demonstração de Quake II durante o teste de áudio PCM"
    },
    "subnautica-audio-clock": {
      "title": "Relógio de áudio corrigido; som e FPS do menu verificados",
      "summary": "Subnautica já emitia som após confirmar a tela inicial. A fila de um bloco agora preserva as frações de tempo. Medições separadas de 30 segundos mostram 14,4 FPS com som, 14,9 sem saída e 15,2 após a correção; os contadores não comprovam um ganho controlado. Gravações longas ainda contêm interrupções breves.",
      "imageAlt": "Menu de Subnautica durante o teste do relógio de áudio"
    },
    "asterix-watched-video-buffers": {
      "title": "A introdução reutiliza corretamente os buffers de vídeo",
      "summary": "A correção de 9 de outubro restaura a inicialização com o rastreamento de páginas GPU ativo. O FFmpeg escrevia diretamente em páginas de vídeo protegidas após o envio das texturas, travando no terceiro quadro. Vídeo e áudio agora usam o buffer existente do host antes de publicar escritas rastreadas. O novo teste passa pela introdução e chega à partida. Todos os 597 testes HLE passaram. A correção é posterior à versão 0.3.4; o estado de conclusão confirmado anteriormente é mantido.",
      "imageAlt": "Partida de Asterix após a correção dos buffers de vídeo rastreados"
    },
    "jets-independent-audio-streams": {
      "title": "Fluxos separados para música e efeitos; áudio testado novamente",
      "summary": "Numa captura de áudio de 20 segundos do menu, os blocos silenciosos de 10 ms caíram de 92,25% na versão 0.3.4 para zero com a correção. Dois intervalos de combate ativo de 13 segundos também não tiveram esses blocos. As gravações completas incluem silêncio nas transições e após a morte. Fluxos separados substituem a troca de dispositivo, e a recuperação preserva a ordem PCM na fila ativa. Todos os 596 testes HLE passaram. A correção é posterior à versão 0.3.4; não representa outra partida completa nem uma comparação controlada de FPS.",
      "imageAlt": "Combate em Pirate Base durante o teste de áudio de 9 de outubro"
    },
    "jurassic-font-atlas-startup": {
      "title": "Inicialização do atlas de fontes corrigida; primeira fase alcançada",
      "summary": "O commit de desenvolvimento a3d371e corrige a regressão de inicialização introduzida pelo Font HLE. A coleção solicitava U+007F ao criar seu atlas ImGui. Rejeitar esse caractere ausente acionava a asserção CalcGlyphInfo e encerrava CarbonMainThread, enquanto as outras threads continuavam esperando comandos AGC pendentes. Caracteres ausentes agora usam o glifo .notdef da fonte. Ambas as novas inicializações passaram pelo ponto de falha; a primeira fase foi renderizada e o mapa respondeu ao teclado. Todos os 569 testes HLE passaram, incluindo verificações de métricas e renderização de todo o intervalo Latin-1. Este registro documenta a nova verificação da inicialização e da primeira fase.",
      "imageAlt": "Primeira fase de Jurassic Park nos portões do parque após a correção da inicialização do atlas de fontes, renderizada pelo PS5PCEM"
    },
    "yotei-cache-memory": {
      "title": "Custos após a árvore e menos memória de cache",
      "summary": "A execução chega à cena 3D após a árvore, ainda com iluminação e superfícies dos personagens incompletas. A árvore mantém 1,231 FPS; um intervalo posterior apresenta dois quadros em 30 segundos (0,067 FPS). Um quadro de transição leva 198 segundos, sendo 177 para criar pipelines. Quadros posteriores recarregam 1,4–2,6 GiB de texturas. Variantes de shaders agora compartilham dados canônicos do programa; grandes snapshots do cache do driver no Windows usam um arquivo temporário mapeado. Um teste isolado de 256 MiB economiza cerca de 256 MiB de memória privada adicional com arquivos idênticos. Passam 21 testes de cache e três de Vulkan. Não há nova medição de ganho de FPS nem confirmação de controle do personagem.",
      "imageAlt": "Tela de pausa sobre a cena incompleta após a árvore"
    },
    "yotei-color-export-routing": {
      "title": "Máscaras de cor e destinos das saídas",
      "summary": "O renderizador respeita as máscaras de canais do shader e encaminha as saídas compactas para as superfícies corretas, inclusive com espaços entre os slots. Seis testes Vulkan passam: preservação de pixels, diferentes formatos compactados e reutilização do pipeline após mudar a máscara. A mistura em superfícies UNORM compactadas ativas continua sem suporte. Os testes do compilador não mostraram ganho útil e não foram ativados no jogo. A execução registra 1,231 FPS na árvore e chega à cena incompleta seguinte; o controle do personagem permanece sem confirmação.",
      "imageAlt": ""
    },
    "yotei-runtime-image-tables": {
      "title": "Tabelas de texturas em execução e cache em disco recuperado",
      "summary": "As pequenas tabelas indiretas guardam agora os endereços em dados de execução: mover texturas ou alterar colisões de hash não exige por si só outro pipeline. Um teste GPU verifica três passagens corretas com uma compilação; nove verificações Vulkan passam. O processo voltou a gravar o cache após a remoção de cópias redundantes dos testes. As falhas são comunicadas e a gravação é repetida, preservando o cache anterior. Não há novo ganho de FPS nem controle do personagem confirmado; faixas na árvore, iluminação e mistura de cores compactadas continuam pendentes. A repetição apresenta 37 quadros em 30,049 segundos na dificuldade Medium (1,231 FPS), como na medição anterior junto à árvore.",
      "imageAlt": "Menu de dificuldade Medium com tabelas de texturas em execução; as faixas brilhantes da árvore permanecem"
    },
    "yotei-selected-flat-reads": {
      "title": "Menos leituras e menor custo de compilação",
      "summary": "As leituras FLAT escolhem primeiro o buffer, preservando sobreposições, endereços desalinhados e relatórios de falhas. O teste controlado reduz a compilação de 46,55 para 39,36 segundos e o pico de memória privada de 3,96 para 3,37 GB. O ciclo mais lento foi descartado. Os testes Vulkan passam. Não são FPS do jogo; continuam as faixas e a renderização incompleta, sem controlo da personagem confirmado. O runner instalado apresenta 37 fotogramas em 30,046 segundos junto à árvore (1,231 FPS), sem ganho de FPS demonstrado.",
      "imageAlt": "Árvore na seleção de dificuldade; continuam as faixas verticais brilhantes"
    },
    "yotei-compiler-memory-audit": {
      "title": "Primeira compilação e pressão de memória",
      "summary": "A inspeção das threads ativas confirma a compilação pelo driver durante a pausa após a árvore. O módulo compute original leva 59,47 segundos e atinge 7,40 GB de memória privada em um teste isolado. Reutilizar sua entrada de cache leva 14 ms; o cache anterior foi preservado antes de repetir o jogo. A otimização offline de SPIR-V não melhora significativamente este caso. São medições do compilador, não FPS do jogo. As listras na árvore e as cenas posteriores incompletas persistem; o controle do personagem ainda não foi confirmado.",
      "imageAlt": ""
    },
    "yotei-compact-shader-analysis": {
      "title": "Menos memória de shaders; 1,26 FPS junto à árvore",
      "summary": "O IR de diagnóstico não utilizado é libertado durante a execução do fluxo descodificado. Junto à árvore, os arrays adicionais de 648 análises de shaders ocupam zero bytes; o código original e as instruções descodificadas são preservados. O teste apresenta 38 fotogramas em 30,044 segundos (1,26 FPS), dentro do intervalo anterior, sem comprovar um ganho repetível. Passam cinco testes específicos e os testes nativos Vulkan de imagens e materiais. As riscas na árvore persistem e o controlo da personagem não foi confirmado. Runner local e PDB atualizados com cópia de segurança.",
      "imageAlt": ""
    },
    "yotei-sparse-regions-repeat": {
      "title": "Novo teste junto à árvore: 1,23 FPS e limite de memória",
      "summary": "O executável local atualizado apresenta 37 quadros em 30,043 segundos junto à árvore (1,23 FPS), sem ganho demonstrado sobre os 1,26 FPS anteriores. Chega a uma cena 3D incompleta, com compilações iniciais demoradas e mistura de cores compactadas sem suporte. A proteção de diagnóstico encerra o teste após 1158 segundos, perto do limite de memória comprometida do sistema. O controle do personagem continua sem confirmação; a captura mostra falhas de materiais e iluminação.",
      "imageAlt": "Cena após a árvore com materiais e iluminação incompletos"
    },
    "yotei-sparse-material-regions": {
      "title": "Índices de materiais precisos e shaders menores",
      "summary": "A repetição anterior junto à árvore registra 1,26 FPS; persistem as compilações iniciais demoradas e a cena escura seguinte. A busca de texturas mantém agora os índices possíveis após a máscara, sem incluir todos os registros intermediários. Páginas capturadas adjacentes compartilham uma região verificada. Um shader de fragmento de teste com tabela ampla fica 22,8% menor com o mesmo resultado; 12 testes de memória e 26 de sampler passam na validação Vulkan. O novo teste do jogo continua. O ganho de FPS e o controle do personagem ainda não foram confirmados.",
      "imageAlt": ""
    },
    "yotei-integer-material-flat-reads": {
      "title": "Índices inteiros de materiais e leituras de memória verificadas",
      "summary": "A tabela capturada agora resolve 84 texturas 2D válidas em vez de 229 candidatos com falsas imagens em matriz. O jogo passa por esse acesso e revela depois uma leitura FLAT sem suporte. O novo caminho com verificação de endereços passa dez casos Vulkan; 26 casos de samplers também passam. A repetição anterior junto à árvore registra 1,16 FPS, sem aceleração comprovada. A compilação inicial e a pressão de memória ainda causam pausas longas. Persistem falhas de iluminação e o controle do personagem não está confirmado.",
      "imageAlt": ""
    },
    "yotei-checked-material-samplers": {
      "title": "Sampler recuperado; grandes pausas após a árvore persistem",
      "summary": "O teste combinado de sampler e cache registra 1,23 FPS na árvore e cinco quadros em 60 segundos depois (0,083 FPS). O trecho diferente da cena não comprova aceleração. A rejeição original do material foi superada; um acesso posterior à textura continua sem suporte. Passam os testes de índices com sinal e 26 casos Vulkan. Faixas, iluminação incompleta e mistura de cores compactadas seguem pendentes. O controle do personagem não foi alcançado. A compilação está isolada; o runner instalado não mudou.",
      "imageAlt": "Superfícies incompletas de personagens após a árvore"
    },

    "yotei-material-pointer-checks": {
      "title": "Árvore a 1,30 FPS; ponteiros de materiais",
      "summary": "A repetição apresenta 39 quadros em 30 segundos junto à árvore e apenas quatro em 60 segundos na cena escura. A iluminação e os personagens continuam incompletos; o controle não foi confirmado. A reprodução dos dados do shader agora identifica 60 descritores de texturas. Dez testes Vulkan verificam tabelas de materiais e apontam registros incompatíveis realmente selecionados. A validação da correção no jogo continua pendente.",
      "imageAlt": "Personagens incompletos na cena escura após a árvore"
    },
    "yotei-color-content-generations": {
      "title": "Novo teste de cor e correções de cache",
      "summary": "A versão UNORM mede 1,23 FPS na árvore. Uma cena posterior apresenta um quadro em 60 segundos durante uma longa pausa, não uma taxa estável de jogo. Persistem falhas de iluminação, geometria e mistura de cores. As próximas correções de cache e memória passam em sete grupos Vulkan e cinco testes do núcleo; o ganho no jogo e o controle do personagem não foram confirmados.",
      "imageAlt": "Cena escura após a árvore com defeitos gráficos pendentes"
    },
    "yotei-color-transfer-memory": {
      "title": "Transferências de cor compartilhadas; árvore a 1,40 FPS",
      "summary": "Foram removidos os buffers individuais de leitura dos alvos de cor. Brilho e árvore apresentam 42 quadros em 30 segundos: cerca de 1,40 FPS contra 1,26. O histórico do cache difere e não permite atribuir o ganho. As faixas persistem; o filme ilustrado é alcançado, sem confirmação do controle do personagem.",
      "imageAlt": "Seleção de dificuldade na árvore; faixas luminosas persistem"
    },
    "yotei-illustrated-movie-compilation": {
      "title": "Filme ilustrado alcançado; pausas de compilação",
      "summary": "O executável atualizado passa pela árvore e pela cinemática escura até chegar ao filme ilustrado. O controle do personagem ainda não foi confirmado. O novo teste da árvore mantém 1,26 FPS; a reutilização após leituras não demonstra ganho adicional de FPS. Um quadro posterior leva 239,4 segundos, incluindo 234,9 na criação de pipelines de computação. O aumento do cache de texturas coincide com a mudança de cena e não comprova aceleração. Iluminação, faixas e um recurso de pixel shader ausente continuam pendentes.",
      "imageAlt": "Filme ilustrado após a árvore e a cinemática escura; controle do personagem não confirmado"
    },
    "yotei-post-tree-texture-reuse": {
      "title": "Cena após a árvore: compilação e recargas de texturas",
      "summary": "A versão combinada chega a uma cinemática muito escura após a configuração. Um quadro a frio demora 59,3 segundos, incluindo 35,4 para criar pipelines gráficos. Reduzir os caches para limitar a memória provoca vários GiB de uploads de texturas por quadro. Um teste Vulkan separado confirma que leituras de storage images já não invalidam as texturas amostradas. O FPS no gameplay e o controle do personagem continuam sem confirmação; persistem as faixas e um recurso de pixel shader não resolvido.",
      "imageAlt": "Cinemática muito escura após a árvore; controle do personagem não confirmado"
    },
    "yotei-array-layer-coherence": {
      "title": "Coerência das camadas: os detalhes da árvore regressam",
      "summary": "O acompanhamento das superfícies de cor limita-se às camadas selecionadas, evitando que alterações nas vizinhas invalidem o conteúdo na GPU. Os arrays compatíveis atualizam as camadas modificadas na GPU. A árvore registou 1,23 FPS em 30 segundos, contra 1,03 no controlo, com fases de animação e histórico de cache diferentes. A casca voltou a aparecer, mas as riscas brilhantes persistem. O carregamento após a configuração ainda atinge o limite de memória; o controlo da personagem não está confirmado.",
      "imageAlt": "Casca e ramos visíveis com riscas verticais brilhantes"
    },
    "yotei-candidate-visual-check": {
      "title": "Verificação da nova versão: rastros na árvore persistem",
      "summary": "A terceira execução mede 1,30 FPS na árvore com outros limites de cache, mas a imagem apresenta mais rastros. Restaurar o limite de alvos de renderização não corrige o defeito visivelmente. O usuário fecha a execução durante a preparação da cena; a jogabilidade após a cena não é confirmada. Não há ganho de FPS verificado; o executável instalado permanece o de referência até uma comparação visual controlada.",
      "imageAlt": "Verificação da nova versão: rastros na árvore persistem"
    },
    "yotei-post-tree-dynamic-state": {
      "title": "Medições da árvore e reutilização de pipelines gráficos",
      "summary": "Antes da alteração, as medições da árvore ficam em 0,83–0,97 FPS. Duas tentativas de avançar são encerradas deliberadamente perto do limite de memória comprometida do Windows. O desvio de profundidade e as referências stencil dinâmicos eliminam 61 variantes redundantes de uma captura de 1.007 pipelines; os testes de GPU passam. Isso não comprova ganho de FPS durante o jogo, e as faixas luminosas permanecem.",
      "imageAlt": "Árvore na seleção de dificuldade com faixas verticais luminosas ainda visíveis"
    },
    "little-nightmares-saves-performance": {
      "title": "Salvar e carregar verificados; 3,73–4,46 FPS em jogo",
      "summary": "Gravação e redimensionamento de arquivos agora preservam dados reais; continuar após reiniciar carrega o primeiro quarto. HTILE, leituras da GPU agrupadas e quatro threads de cópia resultam em 4,46 FPS junto à mala e 3,73 FPS após movimento em amostras de 30 segundos. O executável instalado corresponde ao medido. Os 5 FPS, materiais corretos e inicialização confiável continuam pendentes; o relatório registra shaders omitidos e falhas intermitentes de memória.",
      "imageAlt": "Six junto à mala no primeiro quarto; iluminação escura e materiais reflexivos incorretos persistem"
    },
    "little-nightmares-gameplay": {
      "title": "Primeira sala alcançada: 2,16 FPS medidos",
      "summary": "Os anéis de computação nativos corrigem a paragem repetível após 510 fotogramas. A escrita adiada revela depois uma falha MallocBinned3 ao iniciar o jogo; um novo teste com escrita imediata permite controlar a personagem e apresenta 3540 fotogramas antes da paragem voluntária. Duas amostras de 30 segundos dão 65 fotogramas cada: 2,16 FPS combinados. O perfil ativa a escrita imediata. Persistem defeitos gráficos e gravações vazias.",
      "imageAlt": "Six com o isqueiro na primeira sala; materiais e iluminação apresentam defeitos"
    },
    "little-nightmares-startup": {
      "title": "Título restaurado após correções de arranque e descritores",
      "summary": "Foram corrigidas importações Trinity e IPMI, eventos gráficos nativos e validação das dimensões de dispatch. BITSET restaura o título e a configuração inicial. Dois arranques chegam ao título; gameplay e estabilidade prolongada não foram verificados. Uma repetição termina após esperar 120 segundos pela thread de renderização na configuração inicial; a estabilidade não foi confirmada.",
      "imageAlt": "Título de Little Nightmares Enhanced Edition e indicação Press X no PS5PCEM"
    },
    "subnautica-performance-repeat-2": {
      "title": "Segunda medição após um novo arranque",
      "summary": "Novo processo, mesmo executável e partida Survival: menu a 15,50 FPS; duas medições de 30 segundos sem pausa e com câmara fixa a 12,70 e 8,50 FPS, 10,60 FPS combinados. Saída 1080p, Speed, caches aquecidas. Não houve paragem de dez segundos nestes intervalos, mas persistem atrasos mais curtos. O arranque anterior deu uma média de 9,52 FPS. É variação entre testes, não uma nova otimização; os 30 FPS continuam por atingir.",
      "imageAlt": "Local nevado da queda e HUD de sobrevivência de Subnautica: Below Zero na medição de 3 de outubro"
    },
    "subnautica-performance-repeat": {
      "title": "Nova medição com o executável atual",
      "summary": "Repetição de 3 de outubro, PPSA02457 v1.022.125: o executável instalado restaura a partida Survival e mostra o local nevado da queda e o HUD. A medição usa a versão atual após as alterações comuns do renderizador para GTA III; esta verificação não acrescenta novas correções. Menu principal: 14,67 FPS. Duas medições de 30 segundos sem pausa e com câmara fixa: 7,27 e 11,77 FPS; 9,52 FPS combinados. A primeira inclui uma paragem de 9,998 segundos. Saída 1080p, predefinição Speed, caches aquecidas. A medição válida anterior foi 7,93 FPS, mas não é uma comparação controlada do ganho. Os 30 FPS continuam por atingir.",
      "imageAlt": "Local nevado da queda e HUD de sobrevivência de Subnautica: Below Zero na medição de 3 de outubro"
    },
    "gta3-startup-reflections": {
      "title": "Término dos vídeos e atualização dos reflexos verdes corrigidos",
      "summary": "O launcher real chega automaticamente ao menu em 139 segundos sem os dois caches ativos do emulador. As limpezas pendentes de buffers e imagens terminam antes das novas faces dos reflexos, eliminando o tom verde e os reflexos verde-neon observados. Condições uniformes com valores atuais e limites verificados removem referências inativas da preparação e do SPIR-V. A cena inicial testada não registra falhas de desenho/computação nem vínculos de armazenamento não resolvidos. Consultas indexadas de recursos e chaves compactas de variantes de shaders reduzem a preparação repetida. Uma amostra inicial com câmera fixa registra 8,27 FPS; 10 FPS seguem sem confirmação. As sombras móveis/duplicadas relatadas e uma chamada rejeitada com apenas um shader de vértices na inicialização continuam em investigação.",
      "imageAlt": "Gameplay inicial de GTA III no executável instalado atualizado após corrigir a inicialização e os reflexos"
    },
    "gta3-renderer-performance": {
      "title": "Correções de cores, reflexos e preparação de recursos",
      "summary": "O executável instalado atualizado chega a Give Me Liberty com controle do personagem. As amostras na posição inicial dão 8.10–8.97 FPS em modo Performance, com Bloom e Motion Blur desativados e Classic Lighting ativado. Análises escalares compartilhadas, cópias de texturas na GPU e menores custos auxiliares acompanham as correções gráficas. O relatório registra ajustes, amostras mais lentas e limites; a jogabilidade completa não foi comprovada.",
      "imageAlt": "Personagem e carro de GTA III na Callahan Bridge após as correções de cores e reflexos"
    },
    "gta3-ngg-gameplay": {
      "title": "Exportações NGG corrigidas; primeira missão e movimento verificados",
      "summary": "O executável instalado chega a Give Me Liberty com mundo, personagem, veículo, HUD e minimapa visíveis. W move o personagem e D muda sua direção. A correção geral de NGG restaura as 32 camadas de correção de cor. A amostra mede 0,97 FPS; persistem superexposição verde, recursos ausentes, falhas e travamentos intermitentes.",
      "imageAlt": "Personagem de GTA III correndo até um carro na Callahan Bridge, com HUD e forte superexposição verde"
    },
    "gta3-ampr-startup": {
      "title": "Importações AMPR resolvidas; ecrã de condições alcançado",
      "summary": "Versão de desenvolvimento de 2 de outubro, PPSA03527 v1.007: foram resolvidas 13 importações AMPR em falta. Dois novos processos chegam ao ecrã legível de condições após premir Cross para avançar do ecrã inicialmente vazio. O ecrã de condições mostra cerca de 30 FPS. O desempenho durante o jogo não foi medido. Jogabilidade, gravações e áudio não foram verificados. Persistem diagnósticos de shaders e emulação incompleta de esperas e contadores.",
      "imageAlt": "Ecrã de condições da Rockstar em GTA III, renderizado pelo PS5PCEM"
    },
    "gta3-pkg-extraction": {
      "title": "Alinhamento NAPS corrigido; pacote totalmente extraído",
      "summary": "São extraídos os 48 ficheiros, incluindo eboot.bin, seis módulos e dois arquivos PAK. As somas dos dois índices PAK coincidem e os 21 testes passam. O arranque foi verificado separadamente."
    },
    "subnautica-startup": {
      title: "Queda na inicialização rastreada até um cabeçalho de shader mal lido",
      summary:
        "As primeiras sessões paravam de vez no mesmo endereço convidado. O leitor de shaders do Unity tomara quatro bytes de dados de malha por um comprimento de string com sinal e escrevera um terminador em memória não mapeada. Corrigir o comportamento dos descritores de arquivo por trás disso levou o título além da inicialização.",
    },
    "subnautica-menu-missing": {
      title: "O menu faltava porque a inicialização do áudio travava",
      summary:
        "O fundo animado já rodava, mas nenhum menu aparecia: a corrotina de inicialização da plataforma havia parado dentro do FMOD, deixando para sempre vazios os serviços que a tela inicial espera. Foram as últimas medições da era 4K antes da mudança para 1080p nativo.",
      imageAlt:
        "Tela de título de Subnautica: Below Zero sem seu menu, renderizada pelo PS5PCEM",
    },
    "subnautica-native-1080p": {
      title: "Saída 1080p nativa e preparação de recursos mais barata",
      summary:
        "A apresentação passou para 1920×1080 nativo, e o caminho gráfico compartilhado deixou de copiar estruturas de instruções decodificadas durante a preparação de recursos e a interpretação escalar. Play, Options e Credits são legíveis; os artefatos de água e iluminação continuam.",
      imageAlt:
        "Menu de Subnautica: Below Zero em 1080p nativo, renderizado pelo PS5PCEM",
    },
    "subnautica-menu-performance": {
      title: "Uma série de reduções no lado da CPU no caminho de desenho compartilhado",
      summary:
        "Preparação de índices, busca de pipelines, snapshots de registradores escalares, sondagem de filas e inicialização da área de trabalho ficaram mais baratas uma a uma, tudo sem condição própria de nenhum título. O menu ficou em torno de 17 FPS — ainda longe da meta de 30 FPS.",
      imageAlt:
        "Menu de Subnautica: Below Zero na compilação de desenvolvimento medida, renderizado pelo PS5PCEM",
    },
    "subnautica-new-game": {
      "title": "Uma nova partida chega à área inicial",
      "summary": "Compilação de desenvolvimento de 1 de outubro, PPSA02457 v1.022.125: o modo Sobrevivência carrega o mundo, reproduz a introdução e mostra o local nevado do acidente com o HUD. As correções impedem escritas antigas da GPU sobre a memória da CPU, leituras repetidas de buffers liberados e o apagamento das cores por passes de profundidade. Este teste não incluiu uma partida completa, recuperação de saves ou verificação da correção do áudio.",
      "imageAlt": "Área inicial nevada de Subnautica: Below Zero com HUD de sobrevivência, capturada no PS5PCEM"
    },
    "subnautica-lighting-baseline": {
      "title": "Teste de iluminação: carregamento ainda instável",
      "summary": "Três testes adicionais da compilação anterior falharam durante o carregamento ou a transição para o mundo, após dois testes anteriores chegarem à jogabilidade. Uma thread pode parar enquanto o áudio continua e a janela fica preta. O registro anterior também confirma que um mip de 1×1 atualizava incorretamente a textura base de 512×512. Essas falhas ficam registradas separadamente do teste bem-sucedido; o carregamento estável ainda não foi confirmado."
    },
    "subnautica-colour-mips": {
      "title": "Amostragem de mips de cor corrigida na GPU",
      "summary": "A busca de texturas residentes agora distingue níveis mip e camadas. Pirâmides de cor completas podem ser montadas na GPU. Um teste RG32F com seis níveis verifica os valores, uma regravação no mesmo quadro e a amostragem sem leituras adicionais para a CPU nem novos uploads de texturas; 128 testes específicos passam. O jogo ainda falha ao carregar, inclusive no modo síncrono e com 8192 entradas de cache. O ganho de FPS no mundo e o resultado final da iluminação ainda não foram verificados."
    },
    "subnautica-windows-stack": {
      "title": "Limites da pilha Windows corrigem o encerramento ao iniciar",
      "summary": "Um exemplo mínimo terminava com 0x40010006 ao emitir diagnósticos Windows na pilha HLE. A troca de pilha atualiza os limites e as saídas do código convidado restauram o estado HLE. Passam as saídas ANSI/Unicode, 8 testes de pilha e 9 da ponte nativa. A versão instalada inicia sem depurador nem redirecionamento de TEMP e restaura a partida. Sem pausa: 7.93 FPS durante 30.02 segundos. Não é uma comparação controlada; 30 FPS, gráficos totalmente corretos e estabilidade prolongada continuam por confirmar.",
      "imageAlt": "Subnautica: Below Zero — Windows stack-boundary fix, 2026-10-02"
    },
    "subnautica-resource-scratch": {
      "title": "Menor custo dos recursos; aviso stencil localizado",
      "summary": "As grandes tabelas de texturas indiretas deixam a pilha das chamadas normais. A recuperação de ponteiros partilha um estado de registos imutável e inicializa apenas a parte necessária do bitmap. Passam 72 testes e verificações Vulkan específicas. Um novo processo restaura a partida: 11.96 FPS durante 30.01 segundos sem pausa. O clima e o aquecimento impedem uma comparação controlada; 30 FPS não foram atingidos. O aviso restante corresponde a uma passagem stencil sem escrita de cor. A correção gráfica completa e a estabilidade prolongada continuam por verificar. Uma análise separada mostra mapeamentos repetidos de 4 MiB sob o bloqueio de memória. Reutilizar páginas físicas já comprometidas e eliminar consultas nativas duplicadas reduz a mediana do microteste em 18%; o ganho no jogo não está comprovado.",
      "imageAlt": "Subnautica: Below Zero — resource preparation build, 2026-10-02"
    },
    "subnautica-descriptor-unmap": {
      "title": "Reutilização de descritores e falhas unmap mais seguras",
      "summary": "Os arrays de descritores são reutilizados: a pilha passa de 753 720 para 56 bytes sem alterar o lote Vulkan. Outro teste corrige falhas unmap que deixavam páginas nativas removidas marcadas como legíveis. Passam 154 testes de renderizador/índice, 29 de memória e 60 de envio, além de Vulkan com 4352 vistas de texturas. O primeiro novo carregamento restaura o mundo; uma cena fixa sem pausa regista 12,03 FPS durante 30,01 segundos. O clima e o aquecimento impedem uma comparação controlada. Um recurso escalar continua por resolver. Não foram verificados 30 FPS, carregamento fiável ou uma partida completa.",
      "imageAlt": "Subnautica: Below Zero — unpaused 12.03 FPS sample, 2026-10-02"
    },
    "subnautica-read-lease": {
      "title": "Pilha de desenho menor e leituras de memória protegidas",
      "summary": "O armazenamento escalar reutilizável reduz a pilha de desenho de 447 424 para 32 640 bytes. Outra falha durante o cálculo de hashes revela uma corrida entre verificar e ler: as cópias e hashes de GPU agora mantêm o mapeamento até terminarem. Passam o teste de libertação concorrente, 34 testes de memória/buffers/índice e 60 de envio. O primeiro teste restaura o mundo guardado com 8,63 FPS durante 30,01 segundos sem pausa. O clima e o aquecimento impedem a comparação direta com os 10,00 FPS anteriores. Um recurso de shader continua por resolver; os 30 FPS e a estabilidade prolongada não estão confirmados. Uma nova tentativa com o mesmo executável volta a falhar durante o carregamento em hash + 0xf0. O teste de leitura protegida passa, mas esta falha observada não está corrigida; o código chamador está a ser investigado.",
      "imageAlt": "Subnautica: Below Zero — guest read lease build, 2026-10-02"
    },
    "subnautica-overlap-world": {
      "title": "Segunda recuperação e medição das sobreposições de buffers",
      "summary": "Um novo processo volta a restaurar o mesmo mundo guardado após a correção da propriedade dos buffers. As consultas indexadas mantêm a ordem de escrita e o limite de 4096 buffers. Uma comparação ABBA em pausa dá 11,93–12,23 FPS no percurso linear e 12,30–12,43 com índice; a pequena diferença não comprova um ganho geral. Outra medição sem pausa, com câmara fixa, conta 300 imagens em 30,01 segundos: 10,00 FPS com clima e gelo variáveis. Passam 154 testes de backend/índice e cinco verificações Vulkan. Os 30 FPS, a estabilidade prolongada e a correção completa dos gráficos continuam por verificar.",
      "imageAlt": "Subnautica: Below Zero — unpaused world, 2026-10-02"
    },
    "subnautica-save-recovery": {
      "title": "O mundo guardado carrega após corrigir a propriedade dos buffers",
      "summary": "Uma cópia de 6 MiB da GPU sobrepunha-se a um objeto corrompido durante o carregamento. A cache acompanha agora a vida das alocações e rejeita resultados antigos quando um endereço é reutilizado. O primeiro teste restaura o mundo nevado e permite andar; ainda não comprova estabilidade prolongada. Passam 29 testes de memória, 60 de envio de comandos e quatro testes Vulkan específicos. Aumentar apenas a cache deu 9,93 → 9,10 FPS na mesma cena em pausa; o limite padrão não muda. Os 30 FPS continuam por atingir.",
      "imageAlt": "Subnautica: Below Zero — recovered world, 2026-10-02"
    },
    "subnautica-save-metadata": {
      "title": "Escrita e metadados corrigidos; carregar o mundo ainda falha",
      "summary": "Guardar normalmente escreve e confirma um arquivo de 213 388 bytes e regressa ao jogo. Um processo novo reconhece a gravação com data e duração corretas, sem aviso de danos. As correções gerais abrangem escritas POSIX e a estrutura completa de parâmetros; passam 52 testes de gravação e ficheiros. Restaurar o mundo ainda encontra corrupção de memória. Uma verificação independente de buffers de comandos libertados passa 60 testes; a sua relação com a falha de carregamento não está comprovada."
    },
    "subnautica-vector-walk": {
      "title": "Menos trabalho na análise CPU; o cenário continua a 7 FPS",
      "summary": "A análise CPU de recursos evita interpretar operações apenas vetoriais, preservando as verificações de dependências e as instruções GPU. Outra correção invalida ambas as palavras das máscaras vetoriais escritas. Passam 71 testes escalares e nove testes GPU. Os percursos isolados demoram 15–36% menos; a última amostra de 30 segundos regista 7,00 FPS, sem um ganho comparativo controlado. Cópias, preparação de recursos e envios continuam dispendiosos. O teclado respeita agora o foco da janela. Falhas de carregamento, uma associação não resolvida e os 30 FPS continuam pendentes.",
      "imageAlt": "Subnautica: Below Zero — 1920×1080 gameplay, 2026-10-02"
    },
    "subnautica-srgb-spans": {
      "title": "Escrita sRGB corrigida; verificações mip reutilizam intervalos",
      "summary": "O G-buffer e a saída final capturados pediam sRGB, mas usavam anexos UNORM, escurecendo as cores quando lidas como sRGB. O renderizador agora codifica as escritas de cor e preserva os bytes codificados na transferência para exibição. Um teste GPU verifica amostragem, alfa e saída com validação Vulkan; 129 testes específicos passam. As verificações mip reutilizam seus intervalos de memória calculados. O relatório registra as execuções do jogo e as limitações restantes. O novo teste chega à área nevada com materiais visivelmente mais claros e regista 9,49 FPS durante 30,05 segundos (referência: 9,13 FPS). As diferenças no clima e nos efeitos impedem confirmar um ganho; os 30 FPS, uma associação escalar não resolvida e as falhas intermitentes de carregamento continuam pendentes.",
      "imageAlt": "Área nevada e interface de sobrevivência de Subnautica Below Zero após corrigir a escrita de cor sRGB"
    },
    "subnautica-mip-coherence": {
      "title": "Memória mip: transferências repetidas removidas",
      "summary": "O registo do jogo revelou dez leituras de níveis RG32F por fotograma (2730 KiB), seguidas de novos envios. A validação distingue agora uma escrita GPU verificada de uma substituição pela CPU. Passam quatro casos Vulkan com níveis lineares/compactados e monitorização de memória, além de 129 testes específicos. Na nova execução, as transferências dos alvos de cor do menu descem a zero: os dez níveis permanecem na GPU. A iluminação escura, as falhas intermitentes de carregamento e a meta de 30 FPS continuam por resolver. A versão chega à cena nevada: 260 fotogramas em 30,01 segundos sem movimento dão 8,66 FPS. Não está demonstrado um ganho global de FPS.",
      "imageAlt": "Local nevado da queda e HUD de Subnautica: Below Zero após a correção mip; a iluminação continua escura"
    },

    "yotei-intro-video": {
      title: "O vídeo de introdução é decodificado e toca",
      summary:
        "As unidades de acesso H.264 que o título entrega à biblioteca de vídeo convidada agora são decodificadas no anfitrião, convertidas de NV12 com coeficientes BT.709 e ritmadas em cerca de uma imagem por intervalo de tela, para que um título que empurra quadros tão rápido quanto são aceitos não queime um filme inteiro em segundos. O quadro do motor atrás do vídeo seguia preto, então foi apenas uma etapa de reprodução.",
      imageAlt:
        "Um quadro de introdução de Ghost of Yōtei, decodificado e apresentado pelo PS5PCEM",
    },
    "yotei-bonus-notices": {
      title: "Da introdução aos avisos de bônus e à calibração de brilho",
      summary:
        "A reprodução da introdução passou a ser contínua a cerca dos 30 FPS nativos do fluxo, e a sessão atravessou o carregamento por streaming dos recursos de menu até o indicador de carregamento, os avisos Digital Deluxe Bonus, Gift of the Northern Star e Pre-order Bonus, e a calibração de brilho — imagem do lobo, instruções, controle deslizante e glifo de confirmação todos legíveis.",
      imageAlt:
        "Tela de calibração de brilho de Ghost of Yōtei com a imagem do lobo, renderizada pelo PS5PCEM",
    },
    "yotei-difficulty": {
      title: "A seleção de dificuldade é desenhada sobre uma cena 3D carregada",
      summary:
        "A composição do menu chegou à seleção de dificuldade desenhada sobre geometria 3D real, com árvores e partes do fundo visíveis e a música do menu audível. Foram necessários vários minutos de introdução e carregamento de cena, e os quadros chegavam a 0,6 FPS.",
      imageAlt:
        "Seleção de dificuldade de Ghost of Yōtei sobre uma cena 3D carregada, renderizada pelo PS5PCEM",
    },
    "yotei-tree-scene": {
      title: "O áudio dos filmes funciona e cenas 3D tardias aparecem",
      summary:
        "Os filmes de introdução ganharam som, começando em sincronia com a trilha em vez de ficarem mudos, depois que o ATRAC9 multicanal passou a ser decodificado como fluxos mono intercalados em disposições de 2 a 36 canais. A sessão chegou a cenas 3D tardias, incluindo a da árvore, a 0,73 FPS, e a sequência de carregamento seguinte perdeu o dispositivo Vulkan.",
      imageAlt: "Cena da árvore de Ghost of Yōtei, renderizada pelo PS5PCEM",
    },
    "yotei-command-writes": {
      title: "As escritas do processador de comandos sobrevivem à releitura diferida",
      summary:
        "Uma escrita explícita do processador de comandos dentro de um buffer de armazenamento em cache podia ser perdida quando um resultado de GPU mais antigo era publicado por cima, porque o caminho de descarga só comparava o endereço base do buffer. Indexar os buffers que se sobrepõem e publicar apenas faixas de escrita comprovadas corrigiu a corrupção de cabeçalho resultante.",
      imageAlt:
        "Cena da árvore de Ghost of Yōtei depois das correções de escrita de comandos, renderizada pelo PS5PCEM",
    },
    "yotei-null-images": {
      title:
        "Texturas totalmente nulas tratadas como não vinculadas, e recuperação de descritores mais rápida",
      summary:
        "Texturas comprovadamente todas zero agora usam semântica de imagem não vinculada em vez de fazer o shader ser rejeitado, e a recuperação escalar de descritores reaproveita valores intermediários dentro de uma chamada — um caso aninhado caiu de 504 leituras para 18 e rodou cerca de 4,6× mais rápido isoladamente. Ainda assim, duas verificações do runner instalado pararam esperando a GPU antes da cena da árvore e foram encerradas de propósito depois do diagnóstico.",
      imageAlt:
        "Aviso Digital Deluxe Bonus de Ghost of Yōtei antes da espera de GPU de 1 de outubro, renderizado pelo PS5PCEM",
    },

    "bhh-startup": {
      title: "Uma espera infinita durante o carregamento, corrigida",
      summary:
        "O título podia parar no primeiro quadro preto ou no meio do carregamento de recursos enquanto seu processo e suas threads de áudio seguiam vivos: a thread de carregamento esperava indefinidamente depois de uma leitura de arquivo retornar erro de entrada/saída. Tratar corretamente as leituras de arquivo vigiadas pela GPU levantou o travamento.",
      imageAlt:
        "Menu principal de Big Helmet Heroes depois da correção da inicialização, renderizado pelo PS5PCEM",
    },
    "bhh-menu": {
      title: "Um menu principal correto, e para onde vai o tempo",
      summary:
        "Com o endereçamento de texturas Gen5 de amostra única, os alvos de renderização em camadas e a ordem dos canais de saída corrigidos, o menu é desenhado direito com seus modelos de personagens, texturas e iluminação. A análise de desempenho situou o custo no backend gráfico do anfitrião — preparação de recursos, cópias da memória convidada para o Vulkan e sincronização — e não na compilação de pipelines.",
      imageAlt:
        "Menu principal de Big Helmet Heroes com modelos de personagens e iluminação, renderizado pelo PS5PCEM",
    },
    "bhh-copies": {
      title:
        "Cópias de blocos mais largas, remoção mais barata e vigilância de páginas agrupada",
      summary:
        "O conversor de layout agora copia uma sequência horizontal completa de 16 bytes sempre que sua equação de endereço prova que esses bytes são contíguos, em vez de mover um pixel por vez. A remoção do cache de buffers deixou de percorrer todas as 4.096 entradas, páginas convidadas vizinhas são vigiadas em grupos, e buffers Vulkan concluídos são reciclados.",
      imageAlt:
        "Cena de tutorial de Big Helmet Heroes depois das otimizações de cópia, renderizada pelo PS5PCEM",
    },
    "bhh-menu-performance-20261010": {
      title: "Menos transferências, com a relva preservada",
      summary: "Teste do menu em 10 de outubro: mediana de 9,4 FPS (9,0–9,5) durante 45 segundos, contra 4,9 antes. Coerência de recursos, leituras GPU limitadas, reutilização de texturas volumétricas e envios assíncronos reduzem trabalho repetido. Foi removida uma regressão intermédia do stencil; a relva densa voltou a aparecer. Os contadores de erros amostrados estão a zero; 15 FPS estáveis e gráficos sem defeitos não estão confirmados.",
      imageAlt: "Menu de Big Helmet Heroes com personagens, texto legível e relva laranja densa",
    },
    "bhh-scalar-history": {
      title: "Contabilidade escalar enxugada, sem ganho de quadros a mostrar",
      summary:
        "Os pontos de verificação de recursos deixaram de carregar histórico de cargas escalares não usado, e a análise escalar completa evita percursos redundantes em visitas para frente. Os casos isolados ficaram 9–45% mais baratos, mas as amostras de jogo comparáveis ficaram praticamente iguais — 157 ms no menu contra 154,5 ms no controle — e o relatório diz isso sem rodeios.",
      imageAlt:
        "Tutorial de Big Helmet Heroes depois da mudança de contabilidade de cargas escalares, renderizado pelo PS5PCEM",
    },

    "quake-playable": {
      title: "Jogável e finalizável",
      summary:
        "O mantenedor confirmou uma partida completa. O trabalho por trás cobriu importações de inicialização e listagens de diretórios, escritas diferidas no G-buffer, amostradores de comparação de profundidade e as leituras de buffers tipados de que dependem os vértices dos modelos e os dados de iluminação. A geometria de NPC ausente voltou.",
      imageAlt: "Tela de título de Quake II, renderizada pelo PS5PCEM",
    },
    "quake-rendering": {
      title: "Renderização reverificada, com picos de 60–70 FPS",
      summary:
        "Uma reverificação como PPSA09477 v1.003 encontrou a iluminação das fases, as texturas, as armas e os NPCs todos visíveis, o que encerra os relatos anteriores de mundo escuro e modelos ausentes. A reutilização de buffers e as limpezas pela GPU reduziram o custo das transferências; cenas mais leves atingem picos de 60–70 FPS enquanto combates carregados seguem mais lentos.",
      imageAlt:
        "Quake II, partida com uma fase iluminada, inimigos visíveis e a arma do jogador, renderizada pelo PS5PCEM",
    },

    "tetris-first-render": {
      title: "O primeiro quadro reconhecível saído do grafo de inicialização",
      summary:
        "595 chamadas de desenho convidadas e 63 despachos de computação se completaram sem uma única chamada rejeitada, produzindo o primeiro quadro de partículas reconhecível. Como o alvo de saída 4K registrado seguia preto, a apresentação recorreu a converter um intermediário de 1920×1080 — uma etapa de renderização inicial, não um menu.",
      imageAlt:
        "O primeiro quadro de partículas reconhecível de Tetris Effect, renderizado pelo PS5PCEM",
    },
    "tetris-license-journey": {
      title: "Tela de licença e seleção de Journey, várias vezes mais rápidas",
      summary:
        "Uma composição traduzida substituiu as substituições 4K especulativas, e publicar preenchimentos lineares de metadados removeu a interface duplicada e a costura vertical. A mediana dos quadros de licença caiu de 235 ms para 159 ms, e os quadros amostrados de Journey de 1127–1276 ms para 318–396 ms. Elementos escuros da interface e uma falha do decodificador convidado continuam.",
    },

    "rita-intro-menu": {
      title: "Introdução da publicadora, menu de título e a cena por trás",
      summary:
        "O título entrou num laço estável de gráficos e áudio a 1920×1080 e desenhou sua sequência animada da publicadora, o menu de título e a cena pós-menu. Essa cena vem de um alvo convidado real de 480×270 levado pela cadeia CRT e de pós-processamento, o que substituiu o antigo ruído em tela cheia.",
      imageAlt:
        "Introdução da publicadora de Mighty Morphin Power Rangers: Rita's Rewind, renderizada pelo PS5PCEM",
    },
    "rita-playable": {
      title: "Jogável e finalizável",
      summary:
        "O mantenedor confirmou uma partida completa em 24 de setembro. A captura mostra o Ranger vermelho na fase de treinamento do Command Center com HUD, barra de vida, objetivos e indicações de botões, todos respondendo ao controle. O caminho de reserva de escalonamento CRT, estreitamente casado, continua necessário na máquina de referência.",
      imageAlt:
        "Rita's Rewind, partida com o Ranger vermelho no Command Center, renderizada pelo PS5PCEM",
    },

    "jets-tutorial": {
      title: "START GAME chega ao tutorial em 4K",
      summary:
        "O conteúdo do título foi resolvido, o registro de recursos AGC se completou, e o laço completo de gráficos, computação e saída se sustentou. START GAME passou da tela de carregamento até um tutorial reconhecível em 3840×2160, e uma sessão sem supervisão seguiu viva além da apresentação 300.",
      imageAlt: "Tutorial de Jets 'n' Guns 2, renderizado pelo PS5PCEM",
    },
    "jets-playable": {
      title: "Jogável e finalizável",
      summary:
        "O mantenedor confirmou uma partida completa. Fases, HUD, pontuação, inimigos e a cena em parallax são todos desenhados corretamente. A análise de um quadro de 70 ms encontrou 18 ms esperando pela GPU em 33 envios, 11 ms em pontos de verificação de recursos e 13 ms preparando 894 buffers convidados.",
      imageAlt:
        "Jets 'n' Guns 2, partida com a nave do jogador, o HUD e a pontuação, renderizada pelo PS5PCEM",
    },
    "jets-audio": {
      title: "O áudio para de se cortar",
      summary:
        "Dois portos de saída ativos disputavam o dispositivo de áudio do anfitrião, desmontando a mixagem e reabrindo o dispositivo várias vezes por quadro. A versão 0.3.2 corrigiu o roteamento; o status existente de jogável e finalizável não foi afetado.",
    },

    "cat-quest-render-fixes": {
      title:
        "Um mundo de cabeça para baixo, texto corrompido e cores trocadas, todos corrigidos",
      summary:
        "O mundo era desenhado de cabeça para baixo enquanto a interface não; a cobertura de fragmentos e as passagens só de estêncil corrompiam o texto dos menus; faltava a interface AGC original de mapeamento de interpolantes, então a arte das aventuras e os cenários usavam saídas de vértice para fragmento erradas; e os formatos de saída registrados eram ignorados, trocando vermelho e azul. Os quatro foram corrigidos.",
      imageAlt:
        "Lista de idiomas de Cat Quest III com texto legível recortado dentro do painel, renderizada pelo PS5PCEM",
    },
    "cat-quest-playable": {
      title: "Jogável e finalizável",
      summary:
        "O mantenedor confirmou uma partida completa. Em paralelo, o trabalho de tradução de shaders por quadro amostrado caiu de cerca de 40 ms para 7 ms e os envios de buffers de uns 125 MiB para 65–75 MiB, levando a ilha inicial de cerca de 148 ms para uma mediana de 124 ms.",
      imageAlt:
        "Cat Quest III, partida na ilha com o HUD, montanhas e mar azul, renderizada pelo PS5PCEM",
    },

    "precinct-title-menu": {
      title: "Os dois filmes de introdução, o menu de título e um primeiro quadro de jogo",
      summary:
        "O grafo convidado de seis imagens se ligou, os plug-ins do Unity iniciaram, e os dois filmes de introdução tocaram em 4K sincronizado com som estéreo antes de aparecerem a arte do título e uma confirmação NEW GAME legível. Uma sessão anterior protegida chegou ao aviso de Cruz e produziu a primeira imagem de jogo verificada no motor.",
      imageAlt:
        "The Precinct, menu de título com a confirmação NEW GAME, renderizado pelo PS5PCEM",
    },
    "sarah-playable": {
      title: "Jogável e finalizável no limite de quadros",
      summary:
        "Partida completa confirmada, com o menu de título e a primeira cena mantendo o limite de 60 FPS — 5.280 apresentações em 90 segundos. O carregamento exigiu primeiro restaurar eboot.bin e sce_module/libc.prx das cópias que o patcher de eboot da própria cópia deixou depois de truncar os dois.",
      imageAlt:
        "Dreaming Sarah, cena de floresta com um NPC, renderizada pelo PS5PCEM",
    },
    "terminator-playable": {
      title: "Jogável e finalizável",
      summary:
        "Terminado sem problemas relatados. Fundos, personagens, HUD, texturas e cores são todos corretos, e os quadros de inicialização aquecidos medem 22–65 ms. O alfa das texturas, a ordem dos canais e a amostragem sRGB preservam o equilíbrio de cores pretendido.",
      imageAlt:
        "Terminator 2D, partida com o personagem, o HUD e uma cena no deserto, renderizada pelo PS5PCEM",
    },
    "asterix-playable": {
      title: "Jogável e finalizável",
      summary:
        "Partida completa confirmada a 28–31 ms por quadro, com uma sessão de desenvolvimento de 3.000 apresentações sem envios rejeitados. A composição em tela cheia permanece residente na GPU, e a saída preserva a orientação da janela convidada sem passar pela memória do anfitrião.",
      imageAlt:
        "Asterix & Obelix: Slap Them All!, partida com o HUD e uma placa GO, renderizada pelo PS5PCEM",
    },
    "jurassic-playable": {
      title: "Jogável e finalizável",
      summary:
        "Partida completa confirmada. A renderização na inicialização foi restaurada junto com o logotipo do título, o pedido de confirmação, as capas da coleção e a prévia animada. Percorrer as prévias ainda pode esgotar um conjunto de descritores de mídia, após o que as prévias seguintes congelam.",
      imageAlt:
        "Tela de seleção de Jurassic Park Classic Games Collection com capas, renderizada pelo PS5PCEM",
    },
    "reanimal-title-menu": {
      title: "Um menu de título animado em 4K, sem seus rótulos",
      summary:
        "Os módulos nativos e de firmware foram resolvidos, a sequência do logotipo da empresa tocou, e o menu de título animado em 3840×2160 se sustentou com seu fundo de boia, logotipo, reflexos da água e aviso SELECT visíveis. Os rótulos centrais seguem sendo apenas pequenas marcas vermelhas, então a navegação nunca foi verificada.",
      imageAlt:
        "Menu de título animado de REANIMAL com rótulos incompletos, renderizado pelo PS5PCEM",
    },
    "propagation-bootstrap": {
      title: "Inicialização do Unreal até o primeiro envio",
      summary:
        "O pacote de 8,8 GiB foi montado, a inicialização de ICU e da configuração se completou, o arquivo global de shaders pré-compilado foi aberto, os shaders AGC foram criados, e o primeiro buffer de comandos foi enviado. A sessão é anterior aos construtores de pacotes de sincronização atuais e precisa ser repetida.",
    },
    "pistol-whip-modules": {
      title: "Os módulos de VR carregam, os arquivos do Unity começam a carregar",
      summary:
        "O plug-in nativo de PS VR2 e o módulo Burst foram ambos carregados, e o título começou a carregar seus arquivos de dados do Unity. Avançar mais depende de suporte a headset, rastreamento e OpenXR no anfitrião, que o projeto adiou de propósito.",
    },
  },
};

export default pt;
