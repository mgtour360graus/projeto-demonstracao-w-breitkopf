# Projeto Demonstração — W. Breitkopf

Apresentação de tour personalizado para a unidade de Rio do Sul, criada por MG Tour para avaliação visual do cliente.

- Dez ambientes, busca, filtros, informações por espaço e contatos da unidade.
- Desktop com menu em vidro separado da faixa compacta de miniaturas; botão central para recolher/reabrir. Mobile com imagem livre e funções em janelas sob demanda.
- Informações do ambiente aparecem por quatro segundos. Consulta permanente pelo menu.
- Janelas móveis com 90% da altura útil, cabeçalho fixo e rolagem interna, incluindo correção direcionada ao colapso de conteúdo observado no iOS.
- Botões com relevo 3D, sombras e movimentos suaves no desktop; redução de movimento respeitada.
- Mapa em janela de 90% da largura e altura disponíveis.
- Trilha instrumental original, animada, com volume baixo e botão de ativar/mutar.
- Botão VR — Oculus / Meta Quest preparado somente no menu mobile; a imersão depende dos panoramas reais e da integração com o 3DVista.

## Abrir e hospedar

Abra `index.html` pelo endereço do GitHub Pages. Para usar em outro servidor estático, copie os arquivos deste repositório preservando as pastas. `apresentacao.html` reúne interface, imagens e áudio em um único arquivo.

## Estrutura

- `mg-tour-skin/config.js`: ambientes e contatos; índices da playlist ainda pendentes.
- `mg-tour-skin/skin.js` e `skin.css`: interface e adaptação responsiva.
- `MAIN-VIEWER-INICIAR.js`: ponte candidata de integração, a validar em cópia do projeto real.
- `assets/`: imagens e áudio.
- `capa-editavel.html` e `thumbnail-1920x1080.jpg`: capa proposta.
- `documentacao/`: fontes, instruções e verificação.

## Estado

Proposta visual com imagens ilustrativas fornecidas para o estudo. Não é a exportação panorâmica real do 3DVista. Revisão de responsividade e separação dos painéis conferida em dez dimensões, com janelas móveis em cinco dimensões/orientações, em navegador Chromium emulado. Busca, navegação, recolher/reabrir e exibição por quatro segundos conferidos. Testes em iPhone físico/Safari e headset ainda pendentes; ver `documentacao/REVISAO-CLEAN5.txt`.

Paleta e dados comerciais consultados no site oficial: https://www.wbreitkopf.com.br/. O tour anterior do grupo foi usado somente como referência de identidade. Não se atribui a ele a unidade de Rio do Sul.

Marcas e imagens permanecem de seus respectivos titulares. Publicação demonstrativa para análise do cliente.
