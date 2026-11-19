/* Índices nativos aguardam o mapeamento da exportação real do 3DVista. */
window.MGTourSkinConfig = {
  title: 'W.Breitkopf', unit: 'Rio do Sul', version: '1.0.0',
  assetBase: new URL('../assets/', document.currentScript.src).href,
  logo: 'logo-wbreitkopf.png', soundtrack: 'trilha-instrumental.mp3', vrUrl: null,
  website: 'https://www.wbreitkopf.com.br/',
  telephone: {label:'(47) 3525-1377',href:'tel:+554735251377'},
  address: 'Rodovia BR-470, km 135, nº 1100 · Bairro Rainha · Rio do Sul/SC · CEP 89162-020',
  hours: 'Segunda a sexta, das 8h às 18h',
  contacts: [
    {name:'Vendas',phone:'(47) 9 9922-5209',url:'https://wa.me/5547999225209',icon:'truck',description:'Converse sobre seu próximo Volkswagen.'},
    {name:'Peças',phone:'(47) 9 9922-5213',url:'https://wa.me/5547999225213',icon:'parts',description:'Consulte peças e acessórios para seu caminhão.'},
    {name:'Oficina',phone:'(47) 9 9922-5214',url:'https://wa.me/5547999225214',icon:'tool',description:'Fale com a equipe de assistência técnica.'}
  ],
  socials: [
    {name:'Instagram',url:'https://www.instagram.com/w.breitkopf_caminhoes/'},
    {name:'Facebook',url:'https://www.facebook.com/W.Breitkopf/'},
    {name:'TikTok',url:'https://www.tiktok.com/@w.breitkopf'}
  ],
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15900.762440394365!2d-49.58987885881912!3d-27.17123581410446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dfb9b75f6f933d%3A0xb7f852857aef597e!2sW.%20Breitkopf%20Caminh%C3%B5es%20Rio%20do%20Sul!5e1!3m2!1spt-BR!2sbr!4v1795099177677!5m2!1spt-BR!2sbr',
  directions: 'https://goo.gl/maps/XxqHVovWSWCf7E3S7',
  scenes: [
    {id:'patio',name:'Pátio de caminhões',short:'Pátio',group:'Caminhões',sheet:'ambientes-externos.png',col:0,row:0,icon:'truck',nativeIndex:null,tag:'Seu próximo caminho começa aqui.',description:'Uma primeira visão da concessionária e dos caminhões Volkswagen. Explore os ambientes e descubra os espaços pensados para cada etapa da sua visita.',detail:'O pátio dá início ao percurso proposto para o tour. Na versão final, os pontos de navegação conectarão a chegada, o showroom e o estacionamento.',links:[1,9],contact:0},
    {id:'showroom',name:'Showroom Volkswagen',short:'Showroom',group:'Caminhões',sheet:'ambientes-internos.png',col:0,row:0,icon:'truck',nativeIndex:null,tag:'De perto, cada detalhe faz diferença.',description:'Entre no showroom e conheça o espaço de exposição dos caminhões, com acesso ao atendimento e à área de peças.',detail:'A proposta conecta os modelos expostos aos pontos de informação e à equipe comercial. Informações específicas dos veículos serão incluídas com os modelos definidos para o tour final.',links:[2,6],contact:0},
    {id:'cafe',name:'Coffee Lake Café',short:'Coffee Lake',group:'Atendimento',sheet:'ambientes-internos.png',col:1,row:0,icon:'coffee',nativeIndex:null,tag:'Uma pausa que faz parte da experiência.',description:'Um café, uma conversa e tempo para conhecer a W. Breitkopf com tranquilidade.',detail:'O Coffee Lake Café integra o percurso de acolhimento proposto para a unidade. Este ambiente usa a imagem ilustrativa fornecida para demonstrar o layout.',links:[3,1],contact:0},
    {id:'espera',name:'Sala de espera',short:'Sala de espera',group:'Atendimento',sheet:'ambientes-internos.png',col:0,row:1,icon:'chair',nativeIndex:null,tag:'Seu tempo merece conforto.',description:'Conheça o espaço reservado aos clientes durante sua passagem pela concessionária.',detail:'A sala de espera se conecta, na proposta de navegação, ao café e ao atendimento de pós-vendas. Os trajetos finais serão definidos a partir dos panoramas da unidade.',links:[2,7],contact:2},
    {id:'doca',name:'Doca de peças',short:'Doca de peças',group:'Serviços',sheet:'ambientes-externos.png',col:1,row:0,icon:'parts',nativeIndex:null,tag:'Estrutura para manter você em movimento.',description:'Explore o ambiente destinado à operação de peças e sua conexão com a estrutura da concessionária.',detail:'Este ponto apresenta a doca de peças na proposta. A equipe poderá indicar as áreas que devem ficar disponíveis na visita virtual final.',links:[6,7],contact:1},
    {id:'entregas',name:'Área técnica de entregas',short:'Entregas técnicas',group:'Serviços',sheet:'ambientes-externos.png',col:0,row:1,icon:'key',nativeIndex:null,tag:'O início de uma nova jornada.',description:'O espaço proposto para apresentar o caminhão e seus detalhes no momento da entrega.',detail:'A janela pode receber orientações de entrega, conteúdo sobre o veículo e vídeos, quando esses materiais forem fornecidos e aprovados.',links:[1,0],contact:0},
    {id:'pecas',name:'Peças no showroom',short:'Peças e acessórios',group:'Serviços',sheet:'ambientes-internos.png',col:0,row:2,icon:'parts',nativeIndex:null,tag:'Tudo conectado ao seu Volkswagen.',description:'Um espaço de peças e acessórios integrado à visita ao showroom.',detail:'O visitante pode conhecer este ambiente e falar diretamente com o setor de peças de Rio do Sul. Valores e disponibilidade devem ser consultados com a equipe.',links:[1,4],contact:1},
    {id:'posvendas',name:'Pós-vendas e oficina',short:'Pós-vendas',group:'Serviços',sheet:'ambientes-externos.png',col:1,row:1,icon:'tool',nativeIndex:null,tag:'A parceria continua depois da entrega.',description:'Conheça a estrutura de atendimento e assistência técnica da concessionária.',detail:'A W. Breitkopf divulga assistência técnica e manutenção de caminhões e ônibus Volkswagen e MAN. Use o contato da oficina de Rio do Sul para consultar serviços.',links:[3,5],contact:2},
    {id:'gerencia',name:'Sala do gerente',short:'Gerência',group:'Atendimento',sheet:'ambientes-internos.png',col:1,row:1,icon:'people',nativeIndex:null,tag:'Espaço para boas conversas.',description:'Um ambiente de atendimento e relacionamento dentro da proposta de visita.',detail:'A sala da gerência integra os pontos solicitados para a apresentação. O acesso final no tour pode ser mantido ou ajustado conforme a aprovação da unidade.',links:[1,2],contact:0},
    {id:'estacionamento',name:'Estacionamento do pátio',short:'Estacionamento',group:'Caminhões',sheet:'ambientes-externos.png',col:0,row:2,icon:'parking',nativeIndex:null,tag:'Bem-vindo à W. Breitkopf.',description:'Uma visão ilustrativa dos acessos e da área externa, para começar sua visita.',detail:'A vista aérea é uma referência visual enviada para o estudo. Ela não representa uma planta nem comprova a configuração real do estacionamento de Rio do Sul.',links:[0,1],contact:0}
  ]
};
