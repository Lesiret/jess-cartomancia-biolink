import React, { useState, useEffect } from 'react';
import { SmartImage } from './SmartImage';
const dominioPensamentoImg = '/assets/images/dominio_pensamento_1790368396903.jpg';
const adocamentoAmorosoImg = '/assets/images/adocamento_amoroso_1790368856499.jpg';
const comeToMeImg = '/assets/images/come_to_me_altar_1790369122772.jpg';
const feiticoPaixaoImg = '/assets/images/feitico_paixao_1790433496062.jpg';
const dominioSexualImg = '/assets/images/dominio_sexual_1790433528054.jpg';
const clarezaMentalImg = '/assets/images/clareza_mental_1790433924479.jpg';
const reconciliacaoAmorosaImg = '/assets/images/reconciliacao_amorosa_1790433944798.jpg';
const amarracaoAmorosaImg = '/assets/images/amarracao_amorosa_1790433966281.jpg';
const obsessaoAmorosaImg = '/assets/images/obsessao_amorosa_1790433997260.jpg';
const separacaoCasalImg = '/assets/images/separacao_casal_1790435171740.jpg';
const breakUpComeToMeImg = '/assets/images/break_up_come_to_me_1790435193633.jpg';
const vinegarJarImg = '/assets/images/vinegar_jar_1790435208635.jpg';
const glamourEncantoImg = '/assets/images/glamour_encanto_1790435739413.jpg';
const queenBeeImg = '/assets/images/queen_bee_altar_1790435776470.jpg';
const aberturaAmorImg = '/assets/images/abertura_amor_altar_1790435826491.jpg';
const amorProprioImg = '/assets/images/amor_proprio_altar_1790435873832.jpg';
const fertilidadeImg = '/assets/images/fertilidade_altar_1790435901285.jpg';
const focoConcentracaoImg = '/assets/images/foco_conc_altar_1790435933881.jpg';
const limpezaImg = '/assets/images/limpeza_altar_1790435958370.jpg';
const protecaoImg = '/assets/images/protecao_altar_1790435994625.jpg';
const corteLacosImg = '/assets/images/corte_lacos_altar_1790436020620.jpg';
const regenEmocionalImg = '/assets/images/regen_emoc_altar_1790436044166.jpg';
const conchaReveladoraImg = '/assets/images/concha_revel_altar_1790436059764.jpg';
const romperViciosImg = '/assets/images/romper_vicios_altar_1790436076783.jpg';
const aberturaCaminhosProspImg = '/assets/images/abertura_caminhos_prosp_1790436935103.jpg';
const prosperidadeImg = '/assets/images/prosperidade_altar_1790436962864.jpg';
const atracaoDinheiroImg = '/assets/images/atracao_dinheiro_altar_1790436990989.jpg';
const coroaSucessoImg = '/assets/images/coroa_sucesso_altar_1790437022627.jpg';
const blockbusterImg = '/assets/images/blockbuster_altar_1790437045573.jpg';
const magiaCompromissoImg = '/assets/images/magia_compromisso_1790437072796.jpg';
const uniaoCasalImg = '/assets/images/uniao_casal_1790437093820.jpg';

// Formulários carregados sob demanda (Code Splitting / Lazy Loading)
const ConsultaAmorosaForm = React.lazy(() =>
  import('./ConsultaAmorosaForm').then((m) => ({ default: m.ConsultaAmorosaForm }))
);
const ConsultaFinanceiraForm = React.lazy(() =>
  import('./ConsultaFinanceiraForm').then((m) => ({ default: m.ConsultaFinanceiraForm }))
);
const ConsultaAutoconhecimentoForm = React.lazy(() =>
  import('./ConsultaAutoconhecimentoForm').then((m) => ({ default: m.ConsultaAutoconhecimentoForm }))
);
const ConsultaMensalMesaRealForm = React.lazy(() =>
  import('./ConsultaMensalMesaRealForm').then((m) => ({ default: m.ConsultaMensalMesaRealForm }))
);
const ConsultaPerguntasObjetivasForm = React.lazy(() =>
  import('./ConsultaPerguntasObjetivasForm').then((m) => ({ default: m.ConsultaPerguntasObjetivasForm }))
);
const ConsultaAvaliacaoMagiaForm = React.lazy(() =>
  import('./ConsultaAvaliacaoMagiaForm').then((m) => ({ default: m.ConsultaAvaliacaoMagiaForm }))
);
const FichaRealizacaoMagiaForm = React.lazy(() =>
  import('./FichaRealizacaoMagiaForm').then((m) => ({ default: m.FichaRealizacaoMagiaForm }))
);
const MentoriaBruxariaForm = React.lazy(() =>
  import('./MentoriaBruxariaForm').then((m) => ({ default: m.MentoriaBruxariaForm }))
);

const FormLoadingSkeleton: React.FC = () => (
  <div className="w-full flex flex-col items-center justify-center py-16 animate-fadeIn text-center">
    <div className="w-8 h-8 border-2 border-[#C082A0]/25 border-t-[#C082A0] rounded-full animate-spin mb-3" />
    <span className="font-cinzel text-xs uppercase tracking-widest text-[#A0557A]">
      Carregando formulário...
    </span>
  </div>
);

interface ScheduleNavFlowProps {
  onBackToHome: () => void;
  whatsappNumber: string;
  showToast: (msg: string) => void;
  onOpenPix: (amount?: string) => void;
}

export interface SpellItem {
  id: string;
  title: string;
  price: string;
  image: string;
  description: string;
  extraPriceInfo?: string;
}

export interface ConsultationItem {
  id: string;
  title: string;
  bullets?: string[];
  description: string;
  price: string;
  priceNote?: string;
}

export interface ConsultationCategory {
  id: string;
  title: string;
  items: ConsultationItem[];
}

export const LOVE_CONSULTATIONS: ConsultationItem[] = [
  {
    id: 'padroes_nas_relacoes',
    title: 'Padrões nas Relações',
    bullets: [
      'Padrões que se repetem nos relacionamentos',
      'Bloqueios emocionais ou energéticos no amor',
      'O que você precisa aprender no momento',
      'Por que certas relações não fluem',
      'Caminhos para atrair relações mais saudáveis',
    ],
    description:
      'Se você sente que seus caminhos amorosos estão travados, ou que repete ciclos, ou parece que conhece sempre a mesma pessoa em corpos diferentes, é porque tem um motivo e essa leitura traz clareza para descobrirmos o que seu subconsciente está trazendo à tona.',
    price: 'R$ 100,00',
  },
  {
    id: 'analise_relacionamento',
    title: 'Análise de Relacionamento',
    bullets: [
      'Como está a energia do relacionamento hoje',
      'O que cada um sente',
      'Os principais obstáculos e desgastes',
      'Tendências para o futuro da relação',
      'O que pode ser feito para melhorar, curar ou ajustar o vínculo',
    ],
    description:
      'É uma análise completa do seu relacionamento, trazendo esclarecimentos sobre a situação vivida. Traga o seu contexto e as suas dúvidas que eu te ajudo!',
    price: 'R$ 75,00',
  },
  {
    id: 'meu_ex_vai_voltar',
    title: 'Meu Ex Vai Voltar?',
    bullets: [
      'Sentimentos reais do ex',
      'Se ainda existe vínculo emocional',
      'Se o ciclo está encerrado ou em aberto',
      'Possibilidade de contato ou retorno',
      'Tendências do futuro entre vocês',
      'Orientação espiritual para insistir ou seguir em frente',
    ],
    description:
      'Analisamos como ele está se sentindo, mas vamos além: entendemos se realmente ele é a pessoa ideal para você; se o ciclo está encerrado ou se ainda existe volta.',
    price: 'R$ 70,00',
  },
  {
    id: 'analise_ficante',
    title: 'Análise de Ficante',
    bullets: [
      'Intenções reais da pessoa',
      'O que ela sente x o que irá fazer',
      'Se há envolvimento emocional ou é algo passageiro',
      'Chances de evolução para algo sério',
      'Como agir para não se machucar',
    ],
    description:
      'Se você se sente perdida dentro dessa relação, cheia de dúvidas e incertezas, o baralho pode trazer esclarecimentos e luz no fim do túnel para você resolver essa situação.',
    price: 'R$ 75,00',
  },
  {
    id: 'novo_amor',
    title: 'Novo Amor',
    bullets: [
      'Como está sua energia amorosa no momento',
      'Se há alguém se aproximando ou em potencial',
      'Que tipo de relação tende a surgir',
      'Bloqueios ou padrões que impedem a fluidez no amor',
      'Orientação sobre como agir para atrair um relacionamento mais saudável',
    ],
    description:
      'Uma leitura direcionada para entender sua frequência afetiva, desbloquear travas e abrir seus caminhos para a chegada de uma nova história de amor saudável e recíproca.',
    price: 'R$ 75,00',
  },
];

export const CONSULTATION_CATEGORIES: Record<string, ConsultationCategory> = {
  con_amorosa: {
    id: 'con_amorosa',
    title: 'Consultas Amorosas',
    items: LOVE_CONSULTATIONS,
  },
  con_financeira: {
    id: 'con_financeira',
    title: 'Financeira / Profissional',
    items: [
      {
        id: 'trabalho_ou_financas',
        title: 'Trabalho ou Finanças',
        bullets: [
          'Situação financeira/profissional atual',
          'Bloqueios e oportunidades',
          'Caminhos de crescimento',
          'Tendências no trabalho ou profissão',
          'Orientações para decisões mais seguras',
        ],
        description:
          'Aqui podemos analisar possibilidades de áreas de emprego, atuação ou estudo que você tem dúvida. Essa leitura também mostra se existe alguma trava energética, identifica a raiz do problema e aponta o que pode ser feito para destravar o caminho. Traga o seu contexto e as suas dúvidas que eu te ajudo!',
        price: 'R$ 100,00',
      },
    ],
  },
  con_avaliacao_magia: {
    id: 'con_avaliacao_magia',
    title: 'Avaliação de Magia',
    items: [
      {
        id: 'avaliacao_de_magia',
        title: 'Avaliação de Magia',
        bullets: [
          'Análise prévia antes da realização da magia',
          'Identificação se há caminhos abertos',
          'Orientação sobre qual o trabalho mais indicado',
          'Verificação da adequação energética para o seu objetivo',
        ],
        description:
          'Esta consulta é realizada antes da feitura de uma magia para analisar energeticamente a situação, verificar se há caminhos abertos e indicar o trabalho espiritual mais adequado.',
        price: 'R$ 60,00',
      },
    ],
  },
  con_acompanhamento_feitico: {
    id: 'con_acompanhamento_feitico',
    title: 'Acompanhamento de Feitiço',
    items: [
      {
        id: 'acompanhamento_de_feitico',
        title: 'Acompanhamento de Feitiço',
        bullets: [
          'Acompanhamento de magias já realizadas',
          'Avaliação se o trabalho foi aceito e assentado',
          'Verificação de possíveis interferências e bloqueios',
          'Orientações sobre reforços necessários',
        ],
        description:
          'Leitura para acompanhar um trabalho espiritual já realizado. Mostra se o trabalho foi aceito, como está a movimentação energética, se há interferências e qual reforço pode ser necessário.',
        price: 'R$ 40,00',
      },
    ],
  },
  con_autoconhecimento: {
    id: 'con_autoconhecimento',
    title: 'Autoconhecimento',
    items: [
      {
        id: 'autoconhecimento_leitura',
        title: 'Autoconhecimento',
        bullets: [
          'Entender sua personalidade e como os outros te percebem',
          'Descobrir seus pontos fortes e áreas de crescimento',
          'Identificar mudanças que podem trazer mais equilíbrio e sucesso pessoal',
          'Conectar-se à sua energia e propósito',
        ],
        description:
          'Mostra como os outros te enxergam, como você realmente é, seus pontos fortes e desafios, o que pode mudar e qual arcano está guiando sua energia no momento. As cartas trazem um aconselhamento e orientações sobre como lidar com desafios.',
        price: 'R$ 100,00',
      },
    ],
  },
  con_mensal_mesa_real: {
    id: 'con_mensal_mesa_real',
    title: 'Mensal / Mesa Real',
    items: [
      {
        id: 'leitura_mensal',
        title: 'Leitura Mensal',
        bullets: [
          'Análise abrangente de como será o seu mês',
          'Dicas e orientações observando: financeira, profissional, relacionamento, vida social, familiar e espiritualidade',
          'Envie um contexto geral de cada área para direcionar a leitura',
        ],
        description:
          'Aqui, teremos uma análise abrangente de como será o seu mês, com dicas e orientações, observando as áreas: financeira, profissional, relacionamento, vida social, familiar e espiritualidade.\n\nPara que a leitura seja mais direcionada, peço que me envie um contexto geral de cada área.',
        price: 'R$ 150,00',
      },
      {
        id: 'mesa_real',
        title: 'Mesa Real',
        bullets: [
          'Vida amorosa',
          'Trabalho e carreira',
          'Finanças',
          'Família',
          'Saúde',
          'Influências externas',
          'Bloqueios e oportunidades',
          'Direção dos acontecimentos',
        ],
        description:
          'A Mesa Real é o método mais profundo e estruturado do Petit Lenormand, utilizando as 36 cartas para oferecer uma visão ampla e detalhada da vida da consulente.',
        price: 'R$ 230,00',
      },
    ],
  },
  con_perguntas_objetivas: {
    id: 'con_perguntas_objetivas',
    title: 'Perguntas Objetivas',
    items: [
      {
        id: 'consulta_livre',
        title: 'Consulta Livre',
        bullets: [
          'Tempo: 60 minutos — R$ 125,00',
          'Tempo: 1h30 (90 minutos) — R$ 155,00',
          'Perguntas ilimitadas durante o tempo contratado',
          'Atendimento online ao mesmo tempo com respostas em áudio + foto',
        ],
        description:
          'A consulta livre é um método onde você tem um tempo determinado para fazer quantas perguntas quiser, estaremos on-line ao mesmo tempo e irei enviando as respostas com áudio+foto.',
        price: 'A partir de R$ 125,00',
        priceNote: '60 min: R$ 125,00 | 1h30: R$ 155,00',
      },
      {
        id: 'perguntas_tabela',
        title: 'Perguntas',
        bullets: [
          '1 pergunta — R$ 20,00',
          '2 perguntas — R$ 35,00',
          '3 perguntas — R$ 55,00',
          '4 perguntas — R$ 75,00',
          '5 perguntas — R$ 95,00',
        ],
        description:
          'Indicado para dúvidas simples, quando você precisa de um direcionamento rápido e direto do baralho.',
        price: 'A partir de R$ 20,00',
        priceNote: '1 perg: R$ 20 | 2 perg: R$ 35 | 3 perg: R$ 55 | 4 perg: R$ 75 | 5 perg: R$ 95',
      },
    ],
  },
};

export const LOVE_SPELLS: SpellItem[] = [
  {
    id: 'dominio_pensamento',
    title: 'DOMÍNIO DE PENSAMENTO',
    price: 'R$ 650,00',
    image: dominioPensamentoImg,
    description:
      'Um feitiço desenhado para trazer a atenção do outro e voltar todo o foco dele para você. A intenção não é apenas que a pessoa não consiga tirar você da cabeça, mas que coisas do dia a dia remetam a você. Através deste trabalho, despertamos sonhos, desejo, saudade, vontade de star juntos, vontade de mandar mensagem, permitindo direcionar a mente da pessoa para as intenções que você desejar.',
  },
  {
    id: 'adocamento_amoroso',
    title: 'ADOÇAMENTO AMOROSO',
    price: 'R$ 450,00',
    image: adocamentoAmorosoImg,
    description:
      'Um feitiço desenhado para suavizar os ânimos e trazer muito mais carinho e harmonia para a sua relação ou amado. A intenção é quebrar barreiras de orgulho, mágoas ou teimosia, deixando a pessoa mais dócil, receptiva e afetuosa em relação a você. Através deste trabalho, acalmamos as energias e os atritos, facilitando o diálogo e despertando no outro a vontade de estar perto de forma leve, romântica e compreensiva. É um bom feitiço para reconciliações ou para reaproximar uma relação que esteja fria ou distante.',
  },
  {
    id: 'come_to_me',
    title: 'COME TO ME',
    price: 'R$ 450,00',
    image: comeToMeImg,
    description:
      'Um feitiço desenhado para criar um magnetismo e puxar a pessoa desejada na sua direção. A intenção é encurtar distâncias, sejam elas físicas ou emocionais, despertando no outro uma urgência de entrar em contato, de mandar mensagem e estar ao seu lado. O trabalho tem a intenção de quebrar afastamentos, gerando um impulso para que a pessoa tome a iniciativa e a procure. É o feitiço ideal para quem deseja que o outro venha ao seu encontro.',
  },
  {
    id: 'feitico_paixao',
    title: 'FEITIÇO DE PAIXÃO',
    price: 'R$ 550,00',
    image: feiticoPaixaoImg,
    description:
      'Um feitiço intencionado para acender o fogo interno, o desejo e criar uma atração física e emocional avassaladora. A intenção é despertar no outro um fascínio e uma vontade ardente de estar consigo. Através deste trabalho, elevamos a energia da sedução e da luxúria, quebrando a frieza ou distanciamento, para que a pessoa sinta uma urgência apaixonada e a procure. É o feitiço ideal para química física/emocional, intensificar o romance ou reacender a chama de uma relação, intencionando que o outro fique rendido aos seus encantos.',
  },
  {
    id: 'dominio_sexual',
    title: 'DOMÍNIO SEXUAL',
    price: 'R$ 600,00',
    image: dominioSexualImg,
    description:
      'Feitiço com a intenção para dominar os desejos e a energia sexual da outra pessoa. A intenção é criar uma atração carnal avassaladora e exclusiva, fazendo com que o outro sinta uma urgência física incontrolável e uma entrega total aos seus encantos. Através deste trabalho, direcionamos a mente e o corpo da pessoa para que todas as suas fantasias, líbido e vontades estejam focados apenas em voce. É o feitiço ideal para quem deseja ser a única fonte de prazer do outro, dominando a intimidade, quebrando bloqueios sexuaias, e garantindo uma ligação física intensa, possessiva e inesquecível.',
  },
  {
    id: 'clareza_mental',
    title: 'HARMONIZAÇÃO E CLAREZA MENTAL',
    price: 'R$ 450,00',
    image: clarezaMentalImg,
    description:
      'Feito para dissipar confusões, trazer paz e iluminar a mente. A intenção é limpar a energia de dúvidas, medos, mágoas ou pensamentos turbulentos, criando um estado de profunda serenidade. Através deste trabalho, suavizamos a forma como a pessoa enxerga a situação (ou enxerga você), facilitando o diálogo, a empatia e a tomada de decisões com a cabeça fria. É o feitiço ideal para dissolver mal-entendidos, acalmar mentes agitadas, quebrar bloqueios de orgulho gerados por confusão e trazer tranquilidade para quem está distante ou indeciso.',
  },
  {
    id: 'reconciliacao_amorosa',
    title: 'RECONCILIAÇÃO AMOROSA',
    price: 'R$ 500,00',
    image: reconciliacaoAmorosaImg,
    description:
      'Feito com a intenção de curar feridas, apagar mágoas do passado e unir novamente os caminhos de quem se separou. A intenção deste trabalho é quebrar as barreiras de orgulho e ressentimento, substituindo-as por saudade, afeto e a lembrança dos bons momentos vividos a dois. Através desta magia, reabrimos os canais de comunicação e criamos um ambiente energético propício ao perdão e a um recomeço. É o feitiço ideal para trazer de volta quem se afastou, reacendendo o amor de forma suave, curada e harmoniosa.',
  },
  {
    id: 'amarracao_amorosa',
    title: 'AMARRAÇÃO AMOROSA',
    price: 'R$ 3.500,00',
    image: amarracaoAmorosaImg,
    description:
      'Um feitiço intenso e definitivo, trabalhado e firmado ao longo de 7 noites para entrelaçar os seus destinos e amarrar a pessoa amada ao outro de forma profunda. A intenção é criar um laço espiritual e energético tão forte que o outro sinta que a vida só tem sentido e flui plenamente quando está ao seu lado. Através deste ciclo de sete dias, selamos a união camada por camada, bloqueamos o interesse do alvo por terceiros e geramos uma ligação duradoura, resistente a influências externas e marcada por uma forte necessidade de estar consigo.',
  },
  {
    id: 'obsessao_amorosa',
    title: 'OBSESSÃO AMOROSA',
    price: 'R$ 1.200,00',
    image: obsessaoAmorosaImg,
    description:
      'O nível mais extremo de atração, domínio mental e paixão. Este feitiço é feito para criar dependência, fazendo com que você se torne o único foco e o centro do universo da outra pessoa. A intenção é que o alvo perca a paz longe de você, sentindo uma urgência e um desespero incontroláveis pela sua presença em todos os momentos do dia. Através deste trabalho, o desejo é elevado à obsessão, trazendo uma devoção, possessiva e incapacidade de viver longe de você.',
  },
  {
    id: 'magia_compromisso',
    title: 'MAGIA DE COMPROMISSO',
    price: 'R$ 650,00',
    image: magiaCompromissoImg,
    description:
      'Um feitiço direcionado para quem busca sair da instabilidade e construir um compromisso firme, sólido e maduro. A intenção é alinhar os objetivos do casal, fortalecendo a vontade de assumir a relação com responsabilidade e clareza. Através deste trabalho, estimulamos o desejo de estabilidade e o foco num futuro a dois, afastando hesitações e indecisões para que a convivência evolua de forma natural para um compromisso oficial.',
  },
  {
    id: 'uniao_casal',
    title: 'UNIÃO DE CASAL',
    price: 'R$ 600,00',
    image: uniaoCasalImg,
    description:
      'Serve para aproximar e fortalecer o vínculo entre duas pessoas, promovendo a harmonia, o companheirismo e a cumplicidade. A intenção é afastar distanciamentos, problemas de comunicação e desentendimentos do dia a dia, consolidando uma base de respeito e afeto mútuo. Também feito para uni-los espiritualmente e fisicamente em um só.',
  },
];

export const DAMAGE_SPELLS: SpellItem[] = [
  {
    id: 'separacao_casal',
    title: 'SEPARAÇÃO DE CASAL',
    price: 'R$ 550,00',
    image: separacaoCasalImg,
    description:
      'Para gerar atritos, esfriar sentimentos e romper definitivamente os laços energéticos e emocionais entre duas pessoas. A intenção é plantar a semente da incompatibilidade, fazendo com que qualquer afinidade se transforme em irritação, desgaste e distanciamento intolerável. Através deste trabalho, cortamos a harmonia e a paciência da relação, criando um ambiente insustentável que levará o casal ao fim e ao afastamento. É o feitiço ideal para desmanchar uniões, quebrar alianças e abrir caminho quando uma relação de terceiros é um obstáculo na sua vida.',
  },
  {
    id: 'break_up_come_to_me',
    title: 'BREAK UP & COME TO ME (SEPARE E FIQUE COMIGO)',
    price: 'R$ 600,00',
    image: breakUpComeToMeImg,
    description:
      'Um feitiço de dupla ação, serve para afastar a pessoa amada da sua atual relação e puxá-la diretamente para os seus braços. A intenção é agir em duas frentes simultâneas: primeiro, azedamos e cortamos a ligação do casal existente, gerando um rompimento; em seguida, despertamos no alvo um magnetismo e uma necessidade de procurar por você. Através deste trabalho, intencionamos que a pessoa não apenas termine o compromisso atual, mas que sinta o impulso de correr para você.',
  },
  {
    id: 'vinegar_jar',
    title: 'VINEGAR JAR',
    price: 'R$ 500,00',
    extraPriceInfo: '+ R$ 100,00 mensais para alimentar o jar',
    image: vinegarJarImg,
    description:
      'Um feitiço para amargar os caminhos, as relações e a rotina de uma pessoa, trazendo estagnação e prejuízos para a sua vida pessoal. A intenção deste trabalho é azedar a harmonia de uma situação específica ou trancar as vias de progresso do alvo, instalando uma energia pesada de discórdia, perdas e irritação. Através desta magia, a paz e a resiliência são corroídas, fazendo com que obstáculos e desentendimentos ganhem força no dia a dia, moldando o peso da energia de acordo com as dificuldades que deseja direcionar ao outro. É o feitiço ideal para desestabilizar laços, travar o sucesso de alguém ou devolver a amargura que lhe foi causada, agindo de forma profunda e silenciosa na energia de quem o recebe.',
  },
];

export const PERSONAL_SPELLS: SpellItem[] = [
  {
    id: 'glamour_encanto',
    title: 'GLAMOUR E ENCANTAMENTO',
    price: 'R$ 500,00',
    image: glamourEncantoImg,
    description:
      'Desperta o seu magnetismo pessoal e te envolve em um campo energético de brilho e atração. A intenção é alterar a forma como você é percebido pelas outras pessoas, projetando fascínio, beleza e autoconfiança. Através deste trabalho, a sua presença ganha destaque, atraindo olhares, favores e portas abertas por onde você passar. É o feitiço ideal para realçar as suas melhores qualidades e encantar naturalmente quem cruzar o seu caminho e usar sua beleza/encanto a seu favor.',
  },
  {
    id: 'queen_bee',
    title: 'QUEEN BEE (ABELHA RAINHA)',
    price: 'R$ 550,00',
    image: queenBeeImg,
    description:
      'Um trabalho de poder, influência e soberania pessoal. Desenhado para colocar você no centro das atenções e conferir autoridade à sua presença. A intenção é que a sua voz seja ouvida, as suas vontades respeitadas e que as pessoas ao seu redor sintam o desejo natural de agradar e colaborar com você. Através desta magia, despertamos a energia de liderança, tornando você a figura central e mais cobiçada em qualquer ambiente social ou profissional.',
  },
  {
    id: 'abertura_amor',
    title: 'ABERTURA DE CAMINHOS AMOROSOS',
    price: 'R$ 1.000,00',
    extraPriceInfo: 'Feito em 2 noites',
    image: aberturaAmorImg,
    description:
      'Um feitiço focado em limpar bloqueios e atrair novas oportunidades afetivas para a sua vida. A intenção é desfazer nós energéticos de relacionamentos passados, travas emocionais ou estagnação, permitindo que o fluxo do amor volte a circular livremente. Através deste trabalho, elevamos a sua vibração e preparamos o seu campo para atrair conexões genuínas, criando o cenário espiritual adequado para o romance florescer.',
  },
  {
    id: 'amor_proprio',
    title: 'AMOR PRÓPRIO',
    price: 'R$ 600,00',
    image: amorProprioImg,
    description:
      'Um ritual de reconexão e valorização profunda de si mesmo. Feito para curar inseguranças, nutrir a sua autoestima e fortalecer o seu escudo emocional. A intenção é que você passe a enxergar a própria beleza e poder, priorizando o seu bem-estar e estabelecendo limites saudáveis nas suas relações. Através desta magia, ajudamos a despertar a sua versão mais segura e radiante de dentro para fora.',
  },
  {
    id: 'fertilidade',
    title: 'FERTILIDADE',
    price: 'R$ 600,00',
    image: fertilidadeImg,
    description:
      'Um feitiço desenhado especificamente para despertar a força da geração de vida e preparar o seu ventre para a maternidade. A intenção é nutrir o corpo, a mente e o campo espiritual, criando um ambiente energético acolhedor, saudável e perfeitamente receptivo para a chegada de um bebê. Através deste trabalho, alinhamos os seus ciclos com a energia vital da criação, ajudando a dissolver bloqueios espirituais que possam estar dificultando a gravidez e abençoando o seu corpo. É a magia ideal para quem deseja engravidar, trazendo o fluxo sagrado da vida para o seu caminho.',
  },
  {
    id: 'foco_concentracao',
    title: 'FOCO E CONCENTRAÇÃO',
    price: 'R$ 500,00',
    image: focoConcentracaoImg,
    description:
      'Um trabalho desenhado para ancorar a mente e cortar a névoa mental. A intenção é afastar distrações, pensamentos intrusivos e a procrastinação, trazendo lucidez e direcionamento. Através desta magia, organizamos a energia dos seus pensamentos, proporcionando a clareza necessária para que você consiga absorver conhecimentos e dedicar-se aos seus estudos, metas e trabalho com determinação.',
  },
  {
    id: 'limpeza',
    title: 'LIMPEZA',
    price: 'R$ 450,00',
    image: limpezaImg,
    description:
      'Um ritual profundo de purificação e descarrego energético. Desenhado para varrer do seu campo espiritual toda a carga pesada, inveja, miasmas e energias estagnadas que causam cansaço e bloqueios. A intenção é lavar a sua aura, trazendo leveza e renovação. Através deste trabalho, libertamos você daquilo que não lhe pertence e que pesa nos seus ombros, restaurando a sua vitalidade e o fluxo natural da sua rotina.',
  },
  {
    id: 'protecao',
    title: 'PROTEÇÃO',
    price: 'R$ 450,00',
    image: protecaoImg,
    description:
      'Um feitiço desenhado para erguer firmes escudos de defesa ao redor da sua energia, corpo e caminhos. A intenção é criar uma barreira energética contra ataques espirituais, más intenções, inveja e vibrações destrutivas. Através deste trabalho, blindamos a sua aura e a ocultamos dos olhos daqueles que desejam o seu mal, proporcionando a paz de espírito necessária para você caminhar sem medo de interferências negativas.',
  },
  {
    id: 'corte_lacos',
    title: 'CORTE DE LAÇOS EMOCIONAIS',
    price: 'R$ 500,00',
    image: corteLacosImg,
    description:
      'Um trabalho de libertação e encerramento de ciclos. Desenhado para romper conexões energéticas e cordões que ainda mantêm você preso a situações, mágoas ou pessoas do passado. A intenção é desfazer a amarra espiritual que drena a sua energia ou causa sofrimento prolongado. Através desta magia, devolvemos a sua independência emocional, permitindo que você siga em frente de forma leve, sem carregar o peso do que já terminou.',
  },
  {
    id: 'regen_emocional',
    title: 'REGENERAÇÃO EMOCIONAL',
    price: 'R$ 550,00',
    image: regenEmocionalImg,
    description:
      'Um feitiço de cura e acolhimento espiritual, desenhado para tratar feridas da alma e desgastes profundos. A intenção é costurar o que foi quebrado por dentro, trazendo alívio para tristezas, traumas ou períodos de grande estresse. Através deste trabalho, nutrimos o seu campo com energias de conforto e renovação, ajudando a reconstruir a sua força interior para que você possa voltar a sentir paz no seu próprio tempo.',
  },
  {
    id: 'concha_reveladora',
    title: 'CONCHA REVELADORA',
    price: 'R$ 500,00',
    image: conchaReveladoraImg,
    description:
      'Um feitiço desenhado para dissipar ilusões, quebrar máscaras e trazer à tona o que está oculto. A intenção é lançar luz sobre sombras, revelar segredos e mostrar as verdadeiras intenções de situações ou pessoas ao seu redor. Através deste trabalho, aguçamos a sua intuição e movimentamos a energia para que a verdade se manifeste no seu caminho, permitindo que você enxergue a realidade com total clareza.',
  },
  {
    id: 'romper_vicios',
    title: 'ROMPER VÍCIOS',
    price: 'R$ 530,00',
    image: romperViciosImg,
    description:
      'Um trabalho de força e superação, focado em quebrar padrões repetitivos e destrutivos na sua vida. A intenção é enfraquecer o desejo e a dependência por aquilo que faz mal ao seu corpo ou à sua mente, cortando a raiz energética da auto-sabotagem. Através desta magia, fortalecemos a sua vontade e a sua resiliência, criando o suporte espiritual que facilita o seu processo de afastar-se daquilo que o consome.',
  },
];

export const PROSPERITY_SPELLS: SpellItem[] = [
  {
    id: 'abertura_caminhos_prosp',
    title: 'ABERTURA DE CAMINHOS',
    price: 'R$ 470,00',
    image: aberturaCaminhosProspImg,
    description:
      'Um feitiço para remover barreiras energéticas e abrir espaço para que novas oportunidades entrem na sua vida. A intenção é limpar a estrada da sua jornada pessoal, desfazendo nós e estagnações que impedem o seu avanço. Através deste trabalho, renovamos a circulação de energia ao seu redor, preparando o seu campo para receber novos caminhos, possibilidades e conexões com leveza e fluidez. É o ritual ideal para quando sente a vida travada e precisa abrir espaço para o novo se manifestar.',
  },
  {
    id: 'prosperidade',
    title: 'PROSPERIDADE',
    price: 'R$ 500,00',
    image: prosperidadeImg,
    description:
      'Um feitiço focado em expandir o fluxo de abundância, fartura e crescimento na vida como um todo. A intenção é alinhar a sua energia com a frequência da prosperidade e do bem-estar, atraindo estabilidade material, novas fontes de recursos e frutos concretos para os seus esforços. Através deste trabalho, movimentamos o seu campo espiritual para dissipar a sensação de escassez e criar uma atmosfera de expansão, permitindo que a fartura e a segurança financeira encontrem caminhos naturais para se manifestar na sua rotina.',
  },
  {
    id: 'atracao_dinheiro',
    title: 'ATRAÇÃO DE DINHEIRO',
    price: 'R$ 350,00',
    image: atracaoDinheiroImg,
    description:
      'Um feitiço focado em movimentar e alinhar a sua energia diretamente com o fluxo financeiro e a circulação de capital. A intenção deste trabalho é fortalecer a sua capacidade magnética de atrair valores, ganhos e novas fontes de rendimento para a sua vida.',
  },
  {
    id: 'coroa_sucesso',
    title: 'COROA DE SUCESSO',
    price: 'R$ 350,00',
    image: coroaSucessoImg,
    description:
      'Um feitiço tradicional de exaltação, brilho e vitória, desenhado para elevar a sua presença e colocar os seus esforços em evidência. A intenção deste trabalho é coroar as suas iniciativas com prestígio, respeito e reconhecimento, fazendo com que as suas qualidades sobressaiam em qualquer ambiente. É o ritual ideal para momentos decisivos, como exames, avaliações, projetos importantes ou para conquistar o devido valor e destaque na sua trajetória pessoal e profissional.',
  },
  {
    id: 'blockbuster',
    title: 'BLOCKBUSTER',
    price: 'R$ 370,00',
    image: blockbusterImg,
    description:
      'Um feitiço de impacto e força, feito para quebrar travamentos profundos e persistentes da sua vida. A intenção desse trabalho é cortar obstáculos, abrir portas fechadas e ciclos de estagnados, limpando para que a sua vida volte a andar.',
  },
];

type ScreenType =
  | 'categories'
  | 'magias_intro'
  | 'magia_avaliacao'
  | 'magias_list'
  | 'magia_amorosa_list'
  | 'magia_amorosa_detail'
  | 'magias_prosperidade_list'
  | 'magias_prosperidade_detail'
  | 'magias_dano_list'
  | 'magias_dano_detail'
  | 'magias_pessoais_list'
  | 'magias_pessoais_detail'
  | 'consultas_list'
  | 'consultas_subcategory_list'
  | 'consultas_detail'
  | 'pagamento_checkout'
  | 'consulta_amorosa_form'
  | 'consulta_financeira_form'
  | 'consulta_autoconhecimento_form'
  | 'consulta_mensal_mesa_real_form'
  | 'consulta_perguntas_objetivas_form'
  | 'consulta_avaliacao_magia_form'
  | 'magia_realizacao_form'
  | 'mentoria_info'
  | 'mentoria'
  | 'ebooks';

export const ScheduleNavFlow: React.FC<ScheduleNavFlowProps> = ({
  onBackToHome,
  whatsappNumber,
  showToast,
  onOpenPix,
}) => {
  const [screenStack, setScreenStack] = useState<ScreenType[]>(['categories']);
  const [selectedSpellForRealizacao, setSelectedSpellForRealizacao] = useState<{
    title: string;
    price: string;
  } | null>(null);
  const [selectedLoveSpell, setSelectedLoveSpell] = useState<SpellItem>(LOVE_SPELLS[0]);
  const [selectedProsperitySpell, setSelectedProsperitySpell] = useState<SpellItem>(PROSPERITY_SPELLS[0]);
  const [selectedDamageSpell, setSelectedDamageSpell] = useState<SpellItem>(DAMAGE_SPELLS[0]);
  const [selectedPersonalSpell, setSelectedPersonalSpell] = useState<SpellItem>(PERSONAL_SPELLS[0]);
  const [selectedConsultationCategory, setSelectedConsultationCategory] = useState<string>('con_amorosa');
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationItem>(LOVE_CONSULTATIONS[0]);
  const [pendingPayment, setPendingPayment] = useState<{
    title: string;
    price: string;
    extraInfo?: string;
    targetFormScreen: ScreenType;
  } | null>(null);
  const [pixCopied, setPixCopied] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  // Preload spell altar images in background for instant responsiveness
  useEffect(() => {
    const imagesToPreload = [
      dominioPensamentoImg,
      adocamentoAmorosoImg,
      comeToMeImg,
      feiticoPaixaoImg,
      dominioSexualImg,
      clarezaMentalImg,
      reconciliacaoAmorosaImg,
      amarracaoAmorosaImg,
      obsessaoAmorosaImg,
      separacaoCasalImg,
      breakUpComeToMeImg,
      vinegarJarImg,
      glamourEncantoImg,
      queenBeeImg,
      aberturaAmorImg,
      amorProprioImg,
      fertilidadeImg,
      focoConcentracaoImg,
      limpezaImg,
      protecaoImg,
      corteLacosImg,
      regenEmocionalImg,
      conchaReveladoraImg,
      romperViciosImg,
      aberturaCaminhosProspImg,
      prosperidadeImg,
      atracaoDinheiroImg,
      coroaSucessoImg,
      blockbusterImg,
      magiaCompromissoImg,
      uniaoCasalImg,
    ];

    const timer = setTimeout(() => {
      imagesToPreload.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }, 120);

    return () => clearTimeout(timer);
  }, []);


  const currentScreen = screenStack[screenStack.length - 1];

  const pushScreen = (screen: ScreenType) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setScreenStack((prev) => [...prev, screen]);
  };

  const goBack = () => {
    if (screenStack.length > 1) {
      setScreenStack((prev) => prev.slice(0, -1));
    } else {
      onBackToHome();
    }
  };

  const openWhatsApp = (message: string) => {
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${cleanNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Helper to render consistent, elegant category/navigation cards (clean boutique card style, no icons/emojis)
  const renderPinkButton = ({
    id,
    title,
    onClick,
    badge,
  }: {
    id: string;
    title: string;
    subtitle?: string;
    onClick: () => void;
    badge?: string;
  }) => (
    <button
      key={id}
      type="button"
      onClick={onClick}
      className="group w-full flex items-center justify-between px-5 py-4 min-h-[52px] rounded-2xl bg-white hover:bg-[#FAF4F7] active:bg-[#FAF0F5] border border-[#EBD7E2] hover:border-[#C082A0] active:border-[#C082A0] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_14px_rgba(192,130,160,0.12)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out text-left cursor-pointer touch-manipulation select-none"
    >
      <div className="flex items-center gap-2 min-w-0 pr-2">
        <span className="font-cinzel text-xs md:text-[13px] tracking-[0.14em] uppercase font-bold text-[#1E1E1E] group-hover:text-[#A0557A] group-active:text-[#A0557A] transition-colors">
          {title}
        </span>
        {badge && (
          <span className="text-[9px] font-sans font-medium px-2 py-0.5 rounded-full uppercase tracking-wider bg-rose-50 text-[#C082A0] border border-[#C082A0]/30 shrink-0">
            {badge}
          </span>
        )}
      </div>

      <span className="font-cinzel text-base text-[#C082A0] font-semibold group-hover:translate-x-0.5 group-active:translate-x-0.5 transition-transform shrink-0">
        ›
      </span>
    </button>
  );

  // Helper to render high-end ritual/spell catalog cards with photo thumbnail, title and price
  const renderSpellCard = (spell: SpellItem, onSelect: () => void) => (
    <button
      key={spell.id}
      type="button"
      onClick={onSelect}
      className="group w-full flex items-center gap-3.5 p-3 rounded-2xl bg-white hover:bg-[#FAF4F7] active:bg-[#FAF0F5] border border-[#EBD7E2] hover:border-[#C082A0] active:border-[#C082A0] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_rgba(192,130,160,0.12)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out text-left cursor-pointer touch-manipulation select-none"
    >
      {/* Altar thumbnail preview */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 bg-neutral-100 border border-neutral-100/80">
        <SmartImage
          src={spell.image}
          alt={spell.title}
          wrapperClassName="w-full h-full"
          className="group-hover:scale-105 group-active:scale-105 transition-transform duration-300"
          loading="lazy"
          width={64}
          height={64}
        />
      </div>

      {/* Content: Title & Price */}
      <div className="flex-1 min-w-0 pr-1">
        <h4 className="font-playfair text-sm sm:text-[15px] font-bold text-[#1E1E1E] group-hover:text-[#A0557A] group-active:text-[#A0557A] transition-colors line-clamp-1 leading-snug">
          {spell.title}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-cinzel text-xs font-bold text-[#C082A0]">
            {spell.price}
          </span>
          {spell.extraPriceInfo && (
            <span className="text-[10px] text-[#9A8B90] truncate">
              • {spell.extraPriceInfo}
            </span>
          )}
        </div>
      </div>

      {/* Subtle details indicator */}
      <div className="shrink-0 flex items-center pr-2 text-sm font-cinzel font-bold text-[#C082A0] group-hover:translate-x-0.5 group-active:translate-x-0.5 transition-transform">
        <span>›</span>
      </div>
    </button>
  );

  // Helper to render consultation cards with title and price
  const renderConsultationCard = (item: ConsultationItem, onSelect: () => void) => (
    <button
      key={item.id}
      type="button"
      onClick={onSelect}
      className="group w-full flex items-center justify-between px-5 py-4 min-h-[52px] rounded-2xl bg-white hover:bg-[#FAF4F7] active:bg-[#FAF0F5] border border-[#EBD7E2] hover:border-[#C082A0] active:border-[#C082A0] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_14px_rgba(192,130,160,0.12)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out text-left cursor-pointer touch-manipulation select-none"
    >
      <div className="flex-1 min-w-0 pr-3">
        <h4 className="font-playfair text-sm sm:text-[15px] font-bold text-[#1E1E1E] group-hover:text-[#A0557A] group-active:text-[#A0557A] transition-colors leading-snug">
          {item.title}
        </h4>
        <span className="inline-block font-cinzel text-xs font-bold text-[#C082A0] mt-1">
          {item.price}
        </span>
      </div>

      <div className="shrink-0 flex items-center pr-1 text-sm font-cinzel font-bold text-[#C082A0] group-hover:translate-x-0.5 group-active:translate-x-0.5 transition-transform">
        <span>›</span>
      </div>
    </button>
  );

  // Helper to render prominent CTA buttons (Fazer Pagamento, Agendar Avaliação, etc.)
  const renderActionButton = ({
    title,
    onClick,
  }: {
    title: string;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center px-6 py-4 min-h-[52px] rounded-2xl bg-[#C082A0] hover:bg-[#B07290] text-white shadow-[0_4px_14px_rgba(192,130,160,0.28)] hover:shadow-[0_6px_20px_rgba(192,130,160,0.38)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 ease-out cursor-pointer text-center"
    >
      <span className="font-cinzel text-xs md:text-[13px] tracking-[0.16em] uppercase font-bold text-white text-center">
        {title}
      </span>
    </button>
  );

  return (
    <div className="w-full flex flex-col items-center animate-fadeIn">
      {/* Top Back Navigation Bar */}
      {currentScreen !== 'consulta_amorosa_form' && currentScreen !== 'consulta_financeira_form' && currentScreen !== 'consulta_autoconhecimento_form' && currentScreen !== 'consulta_mensal_mesa_real_form' && currentScreen !== 'consulta_perguntas_objetivas_form' && currentScreen !== 'consulta_avaliacao_magia_form' && currentScreen !== 'magia_realizacao_form' && currentScreen !== 'mentoria' && (
        <div className="w-full flex items-center justify-start mb-5">
          <button
            onClick={goBack}
            type="button"
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-xl text-xs font-cinzel font-semibold tracking-[0.14em] text-[#A0557A] bg-white border border-[#C082A0]/40 hover:border-[#C082A0] hover:bg-rose-50/50 shadow-sm active:scale-95 transition-all duration-200 cursor-pointer uppercase"
            aria-label="Voltar para a tela anterior"
          >
            VOLTAR
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN 1: CATEGORIAS PRINCIPAIS                          */}
      {/* ======================================================== */}
      {currentScreen === 'categories' && (
        <div className="w-full flex flex-col items-center">
          <h2 className="font-playfair text-2xl md:text-[28px] font-semibold tracking-[0.04em] text-[#1E1E1E] text-center mb-1">
            Agendar uma Consulta
          </h2>
          <p className="font-playfair italic text-[14px] text-[#716468] text-center max-w-[320px] mb-6">
            Escolha uma das opções abaixo para prosseguir:
          </p>

          <section className="w-full space-y-3.5">
            {renderPinkButton({
              id: 'cat_magias',
              title: 'Magias',
              onClick: () => pushScreen('magias_intro'),
            })}

            {renderPinkButton({
              id: 'cat_consultas',
              title: 'Consultas',
              onClick: () => pushScreen('consultas_list'),
            })}

            {renderPinkButton({
              id: 'cat_mentoria',
              title: 'Mentoria de Bruxaria',
              onClick: () => pushScreen('mentoria_info'),
            })}

            {renderPinkButton({
              id: 'cat_ebooks',
              title: 'E-books',
              onClick: () => pushScreen('ebooks'),
            })}
          </section>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN 2: MAGIAS - TEXTO & DECISÃO                       */}
      {/* ======================================================== */}
      {currentScreen === 'magias_intro' && (
        <div className="w-full flex flex-col items-center">
          <h2 className="font-playfair text-2xl md:text-[28px] font-semibold tracking-[0.04em] text-[#1E1E1E] text-center mb-3">
            Magias
          </h2>

          {/* User's Exact Explanation Card */}
          <div className="w-full bg-white rounded-2xl p-5 md:p-6 border border-neutral-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] mb-6 text-neutral-700">
            <h3 className="font-playfair font-semibold text-base text-[#1E1E1E] mb-3 text-center">
              Antes de escolher sua magia
            </h3>

            <p className="text-[13px] md:text-sm leading-relaxed text-[#55474B] mb-3">
              Cada situação é única. Por isso, antes de realizar uma magia, recomendo uma consulta de avaliação, onde analisamos o seu caso e verificamos se aquele trabalho é realmente adequado para o seu objetivo.
            </p>

            <p className="text-[13px] md:text-sm leading-relaxed text-[#55474B] mb-4">
              A consulta não é obrigatória. Caso você já saiba qual magia deseja realizar e opte por seguir sem a avaliação, o trabalho será realizado conforme a sua solicitação, sem uma análise prévia da situação.
            </p>

            <div className="pt-2 border-t border-rose-50 text-center">
              <span className="font-cinzel text-xs font-bold tracking-wider text-[#C082A0] uppercase">
                Como você deseja prosseguir?
              </span>
            </div>
          </div>

          {/* Action Choice Buttons in Pink */}
          <section className="w-full space-y-3.5">
            {renderPinkButton({
              id: 'opt_avaliacao',
              title: 'Quero fazer a consulta de avaliação',
              onClick: () => pushScreen('magia_avaliacao'),
            })}

            {renderPinkButton({
              id: 'opt_direto',
              title: 'Já sei qual magia quero',
              onClick: () => pushScreen('magias_list'),
            })}
          </section>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN 2B: MAGIAS - CONSULTA DE AVALIAÇÃO                */}
      {/* ======================================================== */}
      {currentScreen === 'magia_avaliacao' && (
        <div className="w-full flex flex-col items-center">
          <h2 className="font-playfair text-2xl md:text-[28px] font-semibold tracking-[0.04em] text-[#1E1E1E] text-center mb-1">
            Consulta de Avaliação
          </h2>
          <p className="font-playfair italic text-[14px] text-[#716468] text-center max-w-[320px] mb-5">
            Análise do seu caso antes da realização do trabalho
          </p>

          <div className="w-full bg-white rounded-2xl p-5 border border-neutral-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] mb-5">
            <p className="text-xs md:text-[13px] text-[#55474B] leading-relaxed">
              Na consulta de avaliação, analisamos o seu caso com o oráculo para entender a fundo a sua energia e o cenário atual, confirmando qual magia trará os melhores resultados para o seu objetivo.
            </p>
          </div>

          {renderActionButton({
            title: 'Agendar Avaliação no WhatsApp',
            onClick: () => {
              openWhatsApp(
                `Olá Jess! Gostaria de agendar a consulta de avaliação para analisarmos meu caso e verificarmos a magia mais adequada.`
              );
            },
          })}
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN 2C: SUBCATEGORIAS DE MAGIAS (DIRETO)              */}
      {/* ======================================================== */}
      {currentScreen === 'magias_list' && (
        <div className="w-full flex flex-col items-center">
          <h2 className="font-playfair text-2xl md:text-[28px] font-semibold tracking-[0.04em] text-[#1E1E1E] text-center mb-1">
            Escolha sua Magia
          </h2>
          <p className="font-playfair italic text-[14px] text-[#716468] text-center max-w-[320px] mb-4">
            Selecione a opção desejada:
          </p>

          {/* 5 Magia Subcategories as Pink Cards */}
          <section className="w-full space-y-3">
            {[
              {
                id: 'magia_amorosa',
                title: 'Magia Amorosa',
                msgTitle: 'a Magia Amorosa',
              },
              {
                id: 'magia_prosperidade',
                title: 'Magia Prosperidade',
                msgTitle: 'a Magia de Prosperidade',
              },
              {
                id: 'magias_pessoais',
                title: 'Magias Pessoais',
                msgTitle: 'as Magias Pessoais',
              },
              {
                id: 'magias_dano',
                title: 'Magias de Dano',
                msgTitle: 'a Magia de Dano',
              },
            ].map((magia) =>
              renderPinkButton({
                id: magia.id,
                title: magia.title,
                onClick: () => {
                  if (magia.id === 'magia_amorosa') {
                    pushScreen('magia_amorosa_list');
                  } else if (magia.id === 'magia_prosperidade') {
                    pushScreen('magias_prosperidade_list');
                  } else if (magia.id === 'magias_dano') {
                    pushScreen('magias_dano_list');
                  } else if (magia.id === 'magias_pessoais') {
                    pushScreen('magias_pessoais_list');
                  }
                },
              })
            )}
          </section>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN: LISTA DE FEITIÇOS DE MAGIA AMOROSA               */}
      {/* ======================================================== */}
      {currentScreen === 'magia_amorosa_list' && (
        <div className="w-full flex flex-col items-center">
          <h2 className="font-playfair text-2xl md:text-[28px] font-semibold tracking-[0.03em] text-[#1E1E1E] text-center mb-1">
            Magias Amorosas
          </h2>
          <p className="font-playfair italic text-[14px] text-[#716468] text-center max-w-[340px] mb-5">
            Selecione o ritual para conferir os detalhes e agendar
          </p>

          <section className="w-full space-y-3">
            {LOVE_SPELLS.map((spell) =>
              renderSpellCard(spell, () => {
                setSelectedLoveSpell(spell);
                pushScreen('magia_amorosa_detail');
              })
            )}
          </section>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN: DETALHE DO FEITIÇO DE MAGIA AMOROSA             */}
      {/* ======================================================== */}
      {currentScreen === 'magia_amorosa_detail' && selectedLoveSpell && (
        <div className="w-full flex flex-col items-center">
          <div className="w-full bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] mb-4">
            {/* Imagem do altar acima */}
            <div className="w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-rose-50/40">
              <SmartImage
                src={selectedLoveSpell.image}
                alt={`${selectedLoveSpell.title} - Altar Ritualístico`}
                wrapperClassName="w-full h-full"
                loading="eager"
              />
            </div>

            {/* Informações detalhadas abaixo */}
            <div className="p-5 md:p-6 flex flex-col">
              <h3 className="font-playfair text-lg md:text-xl font-bold tracking-[0.03em] text-[#1E1E1E] mb-2.5">
                {selectedLoveSpell.title}
              </h3>

              <p className="text-[13px] md:text-sm text-[#55474B] leading-relaxed mb-4 text-justify">
                {selectedLoveSpell.description}
              </p>

              <div className="pt-3.5 border-t border-rose-50 flex items-center justify-between">
                <span className="font-cinzel text-xs font-semibold text-[#716468] uppercase tracking-wider">
                  Investimento
                </span>
                <span className="font-playfair text-xl md:text-2xl font-bold text-[#C082A0]">
                  {selectedLoveSpell.price}
                </span>
              </div>
            </div>
          </div>

          {renderActionButton({
            title: 'Fazer Pagamento via Pix',
            onClick: () => {
              setSelectedSpellForRealizacao({
                title: selectedLoveSpell.title,
                price: selectedLoveSpell.price,
              });
              setPendingPayment({
                title: selectedLoveSpell.title,
                price: selectedLoveSpell.price,
                extraInfo: 'Ritual consagrado em altar individual com fotos e vídeos',
                targetFormScreen: 'magia_realizacao_form',
              });
              pushScreen('pagamento_checkout');
            },
          })}
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN: LISTA DE FEITIÇOS DE PROSPERIDADE                */}
      {/* ======================================================== */}
      {currentScreen === 'magias_prosperidade_list' && (
        <div className="w-full flex flex-col items-center">
          <h2 className="font-playfair text-2xl md:text-[28px] font-semibold tracking-[0.03em] text-[#1E1E1E] text-center mb-1">
            Magias de Prosperidade
          </h2>
          <p className="font-playfair italic text-[14px] text-[#716468] text-center max-w-[340px] mb-5">
            Selecione o ritual para conferir os detalhes e agendar
          </p>

          <section className="w-full space-y-3">
            {PROSPERITY_SPELLS.map((spell) =>
              renderSpellCard(spell, () => {
                setSelectedProsperitySpell(spell);
                pushScreen('magias_prosperidade_detail');
              })
            )}
          </section>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN: DETALHE DO FEITIÇO DE PROSPERIDADE              */}
      {/* ======================================================== */}
      {currentScreen === 'magias_prosperidade_detail' && selectedProsperitySpell && (
        <div className="w-full flex flex-col items-center">
          <div className="w-full bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] mb-4">
            {/* Imagem do altar acima */}
            <div className="w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-rose-50/40">
              <SmartImage
                src={selectedProsperitySpell.image}
                alt={`${selectedProsperitySpell.title} - Altar Ritualístico`}
                wrapperClassName="w-full h-full"
                loading="eager"
              />
            </div>

            {/* Informações detalhadas abaixo */}
            <div className="p-5 md:p-6 flex flex-col">
              <h3 className="font-playfair text-lg md:text-xl font-bold tracking-[0.03em] text-[#1E1E1E] mb-2.5">
                {selectedProsperitySpell.title}
              </h3>

              <p className="text-[13px] md:text-sm text-[#55474B] leading-relaxed mb-4 text-justify">
                {selectedProsperitySpell.description}
              </p>

              <div className="pt-3.5 border-t border-rose-50 flex items-center justify-between">
                <span className="font-cinzel text-xs font-semibold text-[#716468] uppercase tracking-wider">
                  Investimento
                </span>
                <span className="font-playfair text-xl md:text-2xl font-bold text-[#C082A0]">
                  {selectedProsperitySpell.price}
                </span>
              </div>
            </div>
          </div>

          {renderActionButton({
            title: 'Fazer Pagamento via Pix',
            onClick: () => {
              setSelectedSpellForRealizacao({
                title: selectedProsperitySpell.title,
                price: selectedProsperitySpell.price,
              });
              setPendingPayment({
                title: selectedProsperitySpell.title,
                price: selectedProsperitySpell.price,
                extraInfo: 'Ritual consagrado em altar individual com fotos e vídeos',
                targetFormScreen: 'magia_realizacao_form',
              });
              pushScreen('pagamento_checkout');
            },
          })}
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN: LISTA DE FEITIÇOS DE MAGIAS DE DANO             */}
      {/* ======================================================== */}
      {currentScreen === 'magias_dano_list' && (
        <div className="w-full flex flex-col items-center">
          <h2 className="font-playfair text-2xl md:text-[28px] font-semibold tracking-[0.03em] text-[#1E1E1E] text-center mb-1">
            Magias de Dano
          </h2>
          <p className="font-playfair italic text-[14px] text-[#716468] text-center max-w-[340px] mb-5">
            Selecione o ritual para conferir os detalhes e agendar
          </p>

          <section className="w-full space-y-3">
            {DAMAGE_SPELLS.map((spell) =>
              renderSpellCard(spell, () => {
                setSelectedDamageSpell(spell);
                pushScreen('magias_dano_detail');
              })
            )}
          </section>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN: DETALHE DA MAGIA DE DANO                        */}
      {/* ======================================================== */}
      {currentScreen === 'magias_dano_detail' && selectedDamageSpell && (
        <div className="w-full flex flex-col items-center">
          <div className="w-full bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] mb-4">
            {/* Imagem do altar acima */}
            <div className="w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-rose-50/40">
              <SmartImage
                src={selectedDamageSpell.image}
                alt={`${selectedDamageSpell.title} - Altar Ritualístico`}
                wrapperClassName="w-full h-full"
                loading="eager"
              />
            </div>

            {/* Informações detalhadas abaixo */}
            <div className="p-5 md:p-6 flex flex-col">
              <h3 className="font-playfair text-lg md:text-xl font-bold tracking-[0.03em] text-[#1E1E1E] mb-2.5">
                {selectedDamageSpell.title}
              </h3>

              <p className="text-[13px] md:text-sm text-[#55474B] leading-relaxed mb-4 text-justify">
                {selectedDamageSpell.description}
              </p>

              <div className="pt-3.5 border-t border-rose-50 flex items-center justify-between">
                <span className="font-cinzel text-xs font-semibold text-[#716468] uppercase tracking-wider">
                  Investimento
                </span>
                <div className="text-right">
                  <span className="font-playfair text-xl md:text-2xl font-bold text-[#C082A0]">
                    {selectedDamageSpell.price}
                  </span>
                  {selectedDamageSpell.extraPriceInfo && (
                    <div className="text-[11px] font-sans font-medium text-[#716468] mt-0.5">
                      {selectedDamageSpell.extraPriceInfo}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {renderActionButton({
            title: 'Fazer Pagamento via Pix',
            onClick: () => {
              setSelectedSpellForRealizacao({
                title: selectedDamageSpell.title,
                price: selectedDamageSpell.price,
              });
              setPendingPayment({
                title: selectedDamageSpell.title,
                price: selectedDamageSpell.price,
                extraInfo: 'Ritual consagrado em altar individual com fotos e vídeos',
                targetFormScreen: 'magia_realizacao_form',
              });
              pushScreen('pagamento_checkout');
            },
          })}
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN: LISTA DE MAGIAS PESSOAIS                         */}
      {/* ======================================================== */}
      {currentScreen === 'magias_pessoais_list' && (
        <div className="w-full flex flex-col items-center">
          <h2 className="font-playfair text-2xl md:text-[28px] font-semibold tracking-[0.03em] text-[#1E1E1E] text-center mb-1">
            Magias Pessoais
          </h2>
          <p className="font-playfair italic text-[14px] text-[#716468] text-center max-w-[340px] mb-5">
            Selecione o ritual para conferir os detalhes e agendar
          </p>

          <section className="w-full space-y-3">
            {PERSONAL_SPELLS.map((spell) =>
              renderSpellCard(spell, () => {
                setSelectedPersonalSpell(spell);
                pushScreen('magias_pessoais_detail');
              })
            )}
          </section>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN: DETALHE DA MAGIA PESSOAL                         */}
      {/* ======================================================== */}
      {currentScreen === 'magias_pessoais_detail' && selectedPersonalSpell && (
        <div className="w-full flex flex-col items-center">
          <div className="w-full bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] mb-4">
            {/* Imagem do altar acima */}
            <div className="w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-rose-50/40">
              <SmartImage
                src={selectedPersonalSpell.image}
                alt={`${selectedPersonalSpell.title} - Altar Ritualístico`}
                wrapperClassName="w-full h-full"
                loading="eager"
              />
            </div>

            {/* Informações detalhadas abaixo */}
            <div className="p-5 md:p-6 flex flex-col">
              <h3 className="font-playfair text-lg md:text-xl font-bold tracking-[0.03em] text-[#1E1E1E] mb-2.5">
                {selectedPersonalSpell.title}
              </h3>

              <p className="text-[13px] md:text-sm text-[#55474B] leading-relaxed mb-4 text-justify">
                {selectedPersonalSpell.description}
              </p>

              <div className="pt-3.5 border-t border-rose-50 flex items-center justify-between">
                <span className="font-cinzel text-xs font-semibold text-[#716468] uppercase tracking-wider">
                  Investimento
                </span>
                <div className="text-right">
                  <span className="font-playfair text-xl md:text-2xl font-bold text-[#C082A0]">
                    {selectedPersonalSpell.price}
                  </span>
                  {selectedPersonalSpell.extraPriceInfo && (
                    <div className="text-[11px] font-sans font-medium text-[#716468] mt-0.5">
                      {selectedPersonalSpell.extraPriceInfo}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {renderActionButton({
            title: 'Fazer Pagamento via Pix',
            onClick: () => {
              setSelectedSpellForRealizacao({
                title: selectedPersonalSpell.title,
                price: selectedPersonalSpell.price,
              });
              setPendingPayment({
                title: selectedPersonalSpell.title,
                price: selectedPersonalSpell.price,
                extraInfo: 'Ritual consagrado em altar individual com fotos e vídeos',
                targetFormScreen: 'magia_realizacao_form',
              });
              pushScreen('pagamento_checkout');
            },
          })}
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN 3: CONSULTAS & SUBCATEGORIAS                     */}
      {/* ======================================================== */}
      {currentScreen === 'consultas_list' && (
        <div className="w-full flex flex-col items-center">
          <h2 className="font-playfair text-2xl md:text-[28px] font-semibold tracking-[0.04em] text-[#1E1E1E] text-center mb-1">
            Consultas
          </h2>
          <p className="font-playfair italic text-[14px] text-[#716468] text-center max-w-[320px] mb-4">
            Selecione a categoria desejada:
          </p>

          {/* Subcategorias de Consultas in Pink */}
          <section className="w-full space-y-3">
            {[
              {
                id: 'con_amorosa',
                title: 'Amorosa',
              },
              {
                id: 'con_financeira',
                title: 'Financeira / Profissional',
              },
              {
                id: 'con_avaliacao_magia',
                title: 'Avaliação de Magia',
              },
              {
                id: 'con_acompanhamento_feitico',
                title: 'Acompanhamento de Feitiço',
              },
              {
                id: 'con_autoconhecimento',
                title: 'Autoconhecimento',
              },
              {
                id: 'con_mensal_mesa_real',
                title: 'Mensal / Mesa Real',
              },
              {
                id: 'con_perguntas_objetivas',
                title: 'Perguntas Objetivas',
              },
            ].map((con) =>
              renderPinkButton({
                id: con.id,
                title: con.title,
                onClick: () => {
                  setSelectedConsultationCategory(con.id);
                  pushScreen('consultas_subcategory_list');
                },
              })
            )}
          </section>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN: LISTA DE CONSULTAS DA SUBCATEGORIA               */}
      {/* ======================================================== */}
      {currentScreen === 'consultas_subcategory_list' && (
        <div className="w-full flex flex-col items-center">
          <h2 className="font-playfair text-2xl md:text-[28px] font-semibold tracking-[0.04em] text-[#1E1E1E] text-center mb-1">
            {CONSULTATION_CATEGORIES[selectedConsultationCategory]?.title || 'Consultas'}
          </h2>
          <p className="font-playfair italic text-[14px] text-[#716468] text-center max-w-[320px] mb-4">
            Selecione a leitura desejada:
          </p>

          <section className="w-full space-y-3">
            {CONSULTATION_CATEGORIES[selectedConsultationCategory]?.items.map((item) =>
              renderConsultationCard(item, () => {
                setSelectedConsultation(item);
                pushScreen('consultas_detail');
              })
            )}
          </section>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN: DETALHE DA CONSULTA                              */}
      {/* ======================================================== */}
      {currentScreen === 'consultas_detail' && selectedConsultation && (
        <div className="w-full flex flex-col items-center">
          <div className="w-full bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] mb-4">
            {/* Informações detalhadas */}
            <div className="p-5 md:p-6 flex flex-col">
              <h3 className="font-playfair text-xl md:text-2xl font-bold tracking-[0.03em] text-[#1E1E1E] mb-4 text-center">
                {selectedConsultation.title}
              </h3>

              {/* Tópicos abordados / Bullets */}
              {selectedConsultation.bullets && selectedConsultation.bullets.length > 0 && (
                <div className="bg-[#FAF6F8] rounded-xl p-4 mb-4 border border-[#F2E5EC]">
                  <p className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-[#A06080] mb-2.5">
                    O que é analisado nesta leitura:
                  </p>
                  <ul className="space-y-2">
                    {selectedConsultation.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start text-xs md:text-[13px] text-[#55474B]">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C082A0] mt-1.5 mr-2.5 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Descrição em profundidade */}
              <p className="text-[13px] md:text-sm text-[#55474B] leading-relaxed mb-4 text-justify whitespace-pre-line">
                {selectedConsultation.description}
              </p>

              {/* Bloco de Valor */}
              <div className="pt-3.5 border-t border-rose-50 flex items-center justify-between">
                <div>
                  <span className="font-cinzel text-xs font-semibold text-[#716468] uppercase tracking-wider block">
                    Investimento
                  </span>
                  {selectedConsultation.priceNote && (
                    <span className="text-[11px] text-[#8A797E]">
                      {selectedConsultation.priceNote}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="font-playfair text-xl md:text-2xl font-bold text-[#C082A0]">
                    {selectedConsultation.price}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full space-y-2.5">
            {renderActionButton({
              title: 'Fazer Pagamento via Pix',
              onClick: () => {
                const targetForm: ScreenType =
                  selectedConsultationCategory === 'con_amorosa'
                    ? 'consulta_amorosa_form'
                    : selectedConsultationCategory === 'con_financeira'
                    ? 'consulta_financeira_form'
                    : selectedConsultationCategory === 'con_autoconhecimento'
                    ? 'consulta_autoconhecimento_form'
                    : selectedConsultationCategory === 'con_mensal_mesa_real'
                    ? 'consulta_mensal_mesa_real_form'
                    : selectedConsultationCategory === 'con_perguntas_objetivas'
                    ? 'consulta_perguntas_objetivas_form'
                    : selectedConsultationCategory === 'con_avaliacao_magia'
                    ? 'consulta_avaliacao_magia_form'
                    : 'consulta_amorosa_form';

                setPendingPayment({
                  title: selectedConsultation.title,
                  price: selectedConsultation.price,
                  extraInfo: selectedConsultation.priceNote || undefined,
                  targetFormScreen: targetForm,
                });
                pushScreen('pagamento_checkout');
              },
            })}

            <button
              type="button"
              onClick={() => {
                openWhatsApp(
                  `Olá Jess! Gostaria de agendar a consulta ${selectedConsultation.title} (${selectedConsultation.price}).`
                );
              }}
              className="w-full flex items-center justify-center px-5 py-3 rounded-2xl bg-white border border-[#C082A0]/40 text-[#A06080] hover:bg-rose-50/50 transition-all cursor-pointer"
            >
              <span className="font-cinzel text-xs md:text-[12px] tracking-[0.12em] uppercase font-bold text-center">
                Tirar Dúvidas / Agendar via WhatsApp
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN: MENTORIA DE BRUXARIA (INFORMAÇÕES & VALORES)     */}
      {/* ======================================================== */}
      {currentScreen === 'mentoria_info' && (
        <div className="w-full flex flex-col items-center animate-fadeIn">
          <h2 className="font-playfair text-2xl md:text-[28px] font-semibold tracking-[0.03em] text-[#1E1E1E] text-center mb-1 uppercase">
            Mentoria de Bruxaria
          </h2>
          <p className="font-playfair italic text-[14px] text-[#716468] text-center max-w-[360px] mb-5">
            Acompanhamento individual e direcionamento prático
          </p>

          <div className="w-full bg-white rounded-2xl p-5 md:p-6 border border-[#EBD7E2] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-6 mb-5">
            {/* Print 1: Sobre a mentoria */}
            <div className="bg-[#FAF4F7] rounded-xl p-4 sm:p-5 border border-[#EBD7E2]/70 text-[#55474B] text-xs sm:text-sm leading-relaxed">
              <h3 className="font-playfair font-bold text-base sm:text-lg text-[#1E1E1E] mb-2.5 pb-2 border-b border-[#EBD7E2]">
                Sobre a mentoria
              </h3>
              <p className="mb-3 text-justify">
                Uma mentoria para quem deseja conhecer a bruxaria de forma mais aprofundada, construir uma prática pessoal e entender os fundamentos por trás dos elementos, símbolos e práticas mágicas.
              </p>
              <p className="text-justify text-[#423338]">
                Ao longo da mentoria, vamos passar pela história da bruxaria, fundamentos da prática, altar, Roda do Ano, Hécate e correspondências mágicas, além de trabalhar formas de estudo e construção de uma prática própria.
              </p>
            </div>

            {/* Print 2: Formato da mentoria (O que está incluso) */}
            <div>
              <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#A0557A] mb-3">
                Formato da mentoria
              </h3>
              <div className="space-y-2 text-xs sm:text-[13px] text-[#423338] mb-3.5">
                {[
                  '8 encontros individuais',
                  '1 encontro por semana (remoto)',
                  'Material de apoio em PDF',
                  'Exercícios e práticas entre os encontros',
                  'Canal privado para dúvidas durante a mentoria',
                  'Conteúdo adaptado ao nível e às dúvidas da aluna',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2 rounded-xl bg-rose-50/40 border border-rose-100/60">
                    <span className="text-[#C082A0] font-bold text-sm leading-none mt-0.5">•</span>
                    <span className="font-medium text-neutral-800">{item}</span>
                  </div>
                ))}
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF0F5] border border-[#EAD4E1] text-[#55474B] text-xs sm:text-[13px] leading-relaxed italic text-center">
                Aqui você não precisa acompanhar uma turma ou ter vergonha de perguntar. O processo é individual e o conteúdo pode ser aprofundado de acordo com os seus interesses e dificuldades.
              </div>
            </div>

            {/* Print 3: Para quem é essa mentoria */}
            <div className="pt-2 border-t border-[#F2E5EC]">
              <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#A0557A] mb-3">
                Para quem é essa mentoria
              </h3>
              <div className="space-y-2 text-xs sm:text-[13px] text-[#423338] mb-3">
                {[
                  'quem está começando do zero',
                  'quem já pratica, mas sente que falta fundamento;',
                  'quem tem dificuldade para organizar os estudos;',
                  'quem quer desenvolver uma prática pessoal.',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-[#EBD7E2]/70">
                    <span className="text-[#C082A0] font-bold text-sm leading-none mt-0.5">•</span>
                    <span className="text-neutral-800">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs font-medium text-[#716468] italic text-center mt-2">
                Não é necessário nenhum conhecimento prévio.
              </p>
            </div>

            {/* Investimento */}
            <div className="pt-2 border-t border-[#F2E5EC]">
              <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#A0557A] mb-3">
                Investimento
              </h3>

              <div className="flex items-center justify-center p-2.5 rounded-xl bg-rose-50/40 border border-rose-100/60 mb-3">
                <span className="font-playfair text-base sm:text-lg font-bold text-[#A0557A]">
                  R$ 1.200,00
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  pushScreen('mentoria');
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#C082A0] hover:bg-[#B07290] text-white font-cinzel text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer text-center"
              >
                Entrar na lista de espera
              </button>
            </div>
          </div>

          {/* Dúvidas no WhatsApp */}
          <button
            type="button"
            onClick={() => {
              openWhatsApp(
                'Olá Jess! Gostaria de saber mais informações sobre a Mentoria Individual de Bruxaria.'
              );
            }}
            className="w-full flex items-center justify-center px-5 py-3 rounded-2xl bg-white border border-[#C082A0]/40 text-[#A06080] hover:bg-rose-50/50 transition-all cursor-pointer"
          >
            <span className="font-cinzel text-xs tracking-[0.12em] uppercase font-bold text-center">
              Tirar Dúvidas sobre a Mentoria no WhatsApp
            </span>
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN: CHECKOUT DE PAGAMENTO VIA PIX (PRIMEIRO PASSO)   */}
      {/* ======================================================== */}
      {currentScreen === 'pagamento_checkout' && pendingPayment && (
        <div className="w-full flex flex-col items-center animate-fadeIn">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 border border-[#C082A0]/30 text-xs font-cinzel font-bold text-[#A0557A] tracking-widest uppercase mb-3">
            <span>Etapa 1 de 2 • Pagamento</span>
          </div>

          <h2 className="font-playfair text-2xl md:text-[28px] font-semibold tracking-[0.03em] text-[#1E1E1E] text-center mb-1">
            Pagamento via Pix
          </h2>
          <p className="font-playfair italic text-[14px] text-[#716468] text-center max-w-[340px] mb-5">
            Realize a transferência para liberar o preenchimento da sua ficha
          </p>

          {/* Card Resumo do Serviço */}
          <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-[#EBD7E2] shadow-[0_2px_8px_rgba(0,0,0,0.03)] mb-4">
            <span className="font-cinzel text-[11px] font-semibold uppercase tracking-wider text-[#8A797E]">
              Serviço Selecionado
            </span>
            <div className="flex items-center justify-between gap-3 mt-1 pt-1 border-t border-rose-50">
              <div className="flex-1 min-w-0">
                <h3 className="font-playfair text-base sm:text-lg font-bold text-[#1E1E1E] leading-snug">
                  {pendingPayment.title}
                </h3>
                {pendingPayment.extraInfo && (
                  <p className="text-xs text-[#716468] mt-0.5">
                    {pendingPayment.extraInfo}
                  </p>
                )}
              </div>
              <div className="text-right shrink-0">
                <span className="font-playfair text-xl sm:text-2xl font-bold text-[#C082A0]">
                  {pendingPayment.price}
                </span>
              </div>
            </div>
          </div>

          {/* Card Chave Pix e QR Code */}
          <div className="w-full bg-white rounded-2xl p-5 border border-[#EBD7E2] shadow-[0_4px_16px_rgba(0,0,0,0.04)] mb-5 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#A0557A]">
                  Chave Pix (CNPJ)
                </span>
                <span className="text-[11px] text-[#716468]">Jéssica / Jess Cartomancia</span>
              </div>

              {/* Box da chave com botão de copiar */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF4F7] border border-[#EBD7E2]">
                <span className="flex-1 font-mono text-xs sm:text-sm font-semibold text-[#1E1E1E] truncate select-all px-1">
                  49.013.412/0001-55
                </span>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      if (navigator.clipboard && window.isSecureContext) {
                        await navigator.clipboard.writeText('49013412000155');
                      } else {
                        const ta = document.createElement('textarea');
                        ta.value = '49013412000155';
                        ta.style.position = 'fixed';
                        ta.style.opacity = '0';
                        document.body.appendChild(ta);
                        ta.focus();
                        ta.select();
                        document.execCommand('copy');
                        document.body.removeChild(ta);
                      }
                      setPixCopied(true);
                      showToast('Chave PIX copiada com sucesso!');
                      setTimeout(() => setPixCopied(false), 3000);
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-cinzel font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    pixCopied
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-[#C082A0] hover:bg-[#B07290] text-white shadow-xs active:scale-95'
                  }`}
                >
                  {pixCopied ? '✓ Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>

            {/* Alternar QR Code */}
            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={() => setShowQrCode((prev) => !prev)}
                className="text-xs font-cinzel font-semibold text-[#A0557A] hover:underline cursor-pointer tracking-wider uppercase inline-flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                {showQrCode ? 'Ocultar QR Code' : 'Visualizar QR Code para leitura no celular'}
              </button>

              {showQrCode && (
                <div className="mt-3 p-3 bg-neutral-50 rounded-2xl border border-neutral-100 flex flex-col items-center animate-fadeIn">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent('49013412000155')}`}
                    alt="QR Code PIX Jess Cartomancia"
                    className="w-40 h-40 rounded-lg bg-white p-2 border border-neutral-200 shadow-xs"
                  />
                  <span className="text-[11px] text-neutral-500 mt-2">
                    Abra o app do seu banco e aponte a câmera
                  </span>
                </div>
              )}
            </div>

            {/* Passo a passo claro */}
            <div className="bg-[#FAF7F9] rounded-xl p-3.5 border border-[#EBD7E2]/60 text-[#55474B] text-xs leading-relaxed space-y-1.5">
              <p className="font-cinzel font-bold text-[11px] uppercase tracking-wider text-[#A0557A] mb-1">
                Instruções:
              </p>
              <p>1. Copie a chave Pix acima ou faça a leitura do QR Code no app do seu banco.</p>
              <p>2. Transfira o valor de <strong>{pendingPayment.price}</strong>.</p>
              <p>3. Guarde o comprovante em seu aparelho celular.</p>
              <p>4. Em seguida, clique no botão abaixo para preencher os dados do seu atendimento.</p>
            </div>
          </div>

          {/* BOTÃO PRINCIPAL SOLICITADO PELO USUÁRIO */}
          <button
            type="button"
            onClick={() => {
              pushScreen(pendingPayment.targetFormScreen);
            }}
            className="w-full flex items-center justify-center px-6 py-4 min-h-[54px] rounded-2xl bg-[#C082A0] hover:bg-[#B07290] text-white border border-[#B06B8D]/30 shadow-[0_4px_16px_rgba(192,130,160,0.3)] hover:shadow-[0_6px_22px_rgba(192,130,160,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-out cursor-pointer text-center mb-3 touch-manipulation select-none"
          >
            <span className="font-cinzel text-xs md:text-[13px] tracking-[0.16em] uppercase font-bold text-white text-center">
              JÁ CONCLUÍ O PAGAMENTO → PREENCHER FICHA
            </span>
          </button>

          {/* Ajuda / Dúvidas */}
          <button
            type="button"
            onClick={() => {
              openWhatsApp(
                `Olá Jess! Estou na etapa de pagamento de ${pendingPayment.title} (${pendingPayment.price}) e tenho uma dúvida.`
              );
            }}
            className="text-xs font-cinzel font-semibold tracking-wider text-[#716468] hover:text-[#A0557A] hover:underline cursor-pointer uppercase py-1"
          >
            Teve alguma dúvida com o pagamento? Falar no WhatsApp
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* FORMULÁRIOS DINÂMICOS (CARREGADOS SOB DEMANDA)           */}
      {/* ======================================================== */}
      <React.Suspense fallback={<FormLoadingSkeleton />}>
        {/* SCREEN: FORMULÁRIO PRÉ-CONSULTA AMOROSA */}
        {currentScreen === 'consulta_amorosa_form' && selectedConsultation && (
          <ConsultaAmorosaForm
            consultation={selectedConsultation}
            whatsappNumber={whatsappNumber}
            onBack={goBack}
            showToast={showToast}
            onProceedToPayment={() => {
              showToast('Ficha enviada! Lembre-se de anexar seu comprovante no WhatsApp.');
              setTimeout(() => onBackToHome(), 2500);
            }}
          />
        )}

        {/* SCREEN: FORMULÁRIO PRÉ-CONSULTA FINANCEIRA / PROFISSIONAL */}
        {currentScreen === 'consulta_financeira_form' && selectedConsultation && (
          <ConsultaFinanceiraForm
            consultation={selectedConsultation}
            whatsappNumber={whatsappNumber}
            onBack={goBack}
            showToast={showToast}
            onProceedToPayment={() => {
              showToast('Ficha enviada! Lembre-se de anexar seu comprovante no WhatsApp.');
              setTimeout(() => onBackToHome(), 2500);
            }}
          />
        )}

        {/* SCREEN: FORMULÁRIO PRÉ-CONSULTA AUTOCONHECIMENTO */}
        {currentScreen === 'consulta_autoconhecimento_form' && selectedConsultation && (
          <ConsultaAutoconhecimentoForm
            consultation={selectedConsultation}
            whatsappNumber={whatsappNumber}
            onBack={goBack}
            showToast={showToast}
            onProceedToPayment={() => {
              showToast('Ficha enviada! Lembre-se de anexar seu comprovante no WhatsApp.');
              setTimeout(() => onBackToHome(), 2500);
            }}
          />
        )}

        {/* SCREEN: FORMULÁRIO PRÉ-CONSULTA MENSAL / MESA REAL */}
        {currentScreen === 'consulta_mensal_mesa_real_form' && selectedConsultation && (
          <ConsultaMensalMesaRealForm
            consultation={selectedConsultation}
            whatsappNumber={whatsappNumber}
            onBack={goBack}
            showToast={showToast}
            onProceedToPayment={() => {
              showToast('Ficha enviada! Lembre-se de anexar seu comprovante no WhatsApp.');
              setTimeout(() => onBackToHome(), 2500);
            }}
          />
        )}

        {/* SCREEN: FORMULÁRIO PRÉ-CONSULTA PERGUNTAS OBJETIVAS */}
        {currentScreen === 'consulta_perguntas_objetivas_form' && selectedConsultation && (
          <ConsultaPerguntasObjetivasForm
            consultation={selectedConsultation}
            whatsappNumber={whatsappNumber}
            onBack={goBack}
            showToast={showToast}
            onProceedToPayment={() => {
              showToast('Ficha enviada! Lembre-se de anexar seu comprovante no WhatsApp.');
              setTimeout(() => onBackToHome(), 2500);
            }}
          />
        )}

        {/* SCREEN: FORMULÁRIO AVALIAÇÃO DE MAGIA */}
        {currentScreen === 'consulta_avaliacao_magia_form' && selectedConsultation && (
          <ConsultaAvaliacaoMagiaForm
            consultation={selectedConsultation}
            whatsappNumber={whatsappNumber}
            onBack={goBack}
            showToast={showToast}
            onProceedToPayment={() => {
              showToast('Ficha enviada! Lembre-se de anexar seu comprovante no WhatsApp.');
              setTimeout(() => onBackToHome(), 2500);
            }}
          />
        )}

        {/* SCREEN: FICHA PARA REALIZAÇÃO DA MAGIA */}
        {currentScreen === 'magia_realizacao_form' && (
          <FichaRealizacaoMagiaForm
            initialMagiaTitle={selectedSpellForRealizacao?.title || 'Magia Selecionada'}
            initialMagiaPrice={selectedSpellForRealizacao?.price || 'A combinar'}
            onBack={goBack}
            onSubmitSuccess={() => {
              showToast('Ficha do ritual enviada com sucesso! Anexe seu comprovante no WhatsApp.');
              setTimeout(() => onBackToHome(), 2500);
            }}
          />
        )}

        {/* SCREEN: MENTORIA DE BRUXARIA (FORMULÁRIO) */}
        {currentScreen === 'mentoria' && (
          <MentoriaBruxariaForm
            whatsappNumber={whatsappNumber}
            onBack={goBack}
            onBackToHome={onBackToHome}
            showToast={showToast}
          />
        )}
      </React.Suspense>

      {/* ======================================================== */}
      {/* SCREEN 5: EBOOKS                                         */}
      {/* ======================================================== */}
      {currentScreen === 'ebooks' && (
        <div className="w-full flex flex-col items-center">
          <h2 className="font-playfair text-2xl md:text-[28px] font-semibold tracking-[0.04em] text-[#1E1E1E] text-center mb-1">
            E-books
          </h2>
          <p className="font-playfair italic text-[14px] text-[#716468] text-center max-w-[320px] mb-5">
            Materiais didáticos e guias práticos
          </p>

          <section className="w-full space-y-3.5">
            {renderPinkButton({
              id: 'ebook_link',
              title: 'Acessar Catálogo de E-books',
              badge: 'Em Breve',
              onClick: () => {
                showToast('O link oficial dos e-books estará disponível em breve!');
              },
            })}

            {renderPinkButton({
              id: 'ebook_whatsapp',
              title: 'Tirar dúvidas sobre E-books no WhatsApp',
              onClick: () => {
                openWhatsApp(
                  'Olá Jess! Gostaria de mais informações sobre seus e-books e materiais digitais.'
                );
              },
            })}
          </section>
        </div>
      )}
    </div>
  );
};

export default ScheduleNavFlow;
