# Changelog — Projeto Reviva

Histórico de versões da landing page. Formato livre, em português, pensado para acompanhamento do projeto — não segue estritamente Keep a Changelog/SemVer, mas se inspira neles.

---

## [v8] — em andamento

### Adicionado
- **Seção de privacidade/LGPD no README** — documentação de quais dados são coletados pelo formulário de inscrição, base legal, retenção e direitos do titular (sem expor nenhum dado real).

### Alterado
- **URLs limpas**: `vercel.json` do site com `cleanUrls: true` — `/equipe.html` agora é `/equipe`, sem `.html`/`index` aparecendo na barra de endereço. Todos os links internos (`index.html`, `equipe.html`) atualizados para as versões limpas (`/`, `/equipe`).
- **Fundo do Hero e do CTA final**: trocado de grafite/preto (`--ink`) para um escuro puxado pro verde (`--ink-forest`), reforçando a identidade de cor do projeto.
- **Mais detalhes em verde**: números de destaque do Hero e "eyebrows" das seções Equipe, Colaboradores e Valores alternando entre laranja e verde (antes só laranja).
- **Título "Painel de colaboradores" redesenhado**: card centralizado com a faixa de cor característica do site no topo, logo em destaque — antes era só um formulário solto na página.
- **Títulos de seção e alguns botões em maiúsculo**, para reforçar a linguagem visual do site (que já usa fonte mono + maiúsculo nos "eyebrows").

### Corrigido
- **Travamento/engasgo ao rolar a página**: o header usava `backdrop-filter: blur()`, recalculado a cada pixel rolado — trocado por um fundo sólido semi-opaco (bem mais leve pra GPU, principalmente no celular). A barra de progresso no topo também recalculava o layout da página em todo evento de scroll, sem economia nenhuma — agora represada com `requestAnimationFrame`.

---

## [v7] — em andamento

### Adicionado
- **Backend Node.js/Express dedicado** (repositório separado `reviva-backend`), com PostgreSQL, autenticação JWT e hash de senha (bcrypt). Endpoints: `POST /api/inscricoes` (público), `GET`/`PATCH /api/inscricoes` (colaborador), `POST /api/auth/login`.
- **Formulário de inscrição** (seção `#inscricao` em `index.html`) — nome da criança, idade, nome do responsável e WhatsApp. Envia pra API própria em vez de ir direto pro banco.
- **Painel de colaboradores** (`painel.html` + `painel.css` + `painel.js`) — login por e-mail/senha, lista as inscrições recebidas com link direto pro WhatsApp do responsável, e permite mudar o status de cada uma (pendente/contatado/matriculado/descartado). Página sem link na navegação pública (`noindex`), acesso só por URL direta.
- Rate limiting no backend: 5 envios de formulário/hora por IP, 10 tentativas de login/15min — proteção básica contra spam e força bruta.

### Alterado
- **CTAs do site trocados de "Vem falar com a gente" para "Quero inscrever meu filho"**, agora apontando pro formulário (`#inscricao`) em vez do Instagram — no hero, header, menu mobile, botão flutuante e CTA final de `index.html` e `equipe.html`. O Instagram continua disponível como opção secundária (CTA final e seção de inscrição).
- Linha "Como se inscrever" da seção Local passou a citar as duas opções (Instagram e formulário).

### Pendente
- Deploy da API em produção (código pronto, falta hospedar — ver README do `reviva-backend`) e configurar `API_BASE_URL` em `app.js`/`painel.js`.
- Criar o primeiro login de colaborador em produção.

---

## [v6] — em andamento

### Corrigido
- **Botão flutuante "solto" no Safari iOS**: faltava `viewport-fit=cover` na tag `<meta name="viewport">` de `index.html` e `equipe.html`, o que fazia o navegador recalcular o viewport (e o botão "pular") toda vez que a barra de endereço aparecia/sumia. Adicionado `viewport-fit=cover` + `bottom: max(16px, env(safe-area-inset-bottom))` no `.floating-cta`.
- **og:image relativo**: `og:image` e `twitter:image` de `index.html` e `equipe.html` apontavam para um caminho relativo (`img/...`), o que quebra o preview ao compartilhar o link em apps como WhatsApp/Instagram. Agora usam URL absoluta (`https://projetoreviva.vercel.app/img/...`).
- **Nome errado da coordenadora**: "Rebecca Sabino" corrigido para "Rebecca Oliveira" em todos os pontos (texto da seção Sobre, cards da equipe em `index.html`, card grande em `equipe.html`, meta description).
- **Logo do header não clicável no mobile**: `<div class="logo">` trocada por `<a href="index.html" class="logo">` em ambas as páginas.
- **Grade de colaboradores desalinhada com número ímpar de itens**: `.colab-grid` trocada de CSS Grid (`auto-fit`) para Flexbox com `justify-content: center`, centralizando automaticamente o último item de uma linha incompleta — sem depender de contar quantos itens existem.

### Adicionado
- **Foto individual do Josué Silva** (sem outra pessoa no quadro), substituindo a foto genérica dele ensinando uma aluna no card resumido (`index.html`) e no card grande (`equipe.html`).
- **Seção Ação Social ampliada de 3 para 4 cards**: Saúde, Aromoterapia, Jurídico e Alimentação — refletindo a variedade real de frentes que já rolam nos dias de ação social.

### Alterado
- Pequenos acentos de cor verde adicionados ao lado do laranja já existente (3º número da faixa "Sobre o projeto" e número do 3º pilar), para dar mais equilíbrio entre as duas cores da paleta.

### Pendente
- Formulário de inscrição inline (opção extra, ao lado do CTA do Instagram) e banco de dados via Supabase — aguardando criação do projeto Supabase pelo usuário.
- Legendas definitivas dos 4 cards de Ação Social — usando por ora "Saúde", "Aromoterapia", "Jurídico" e "Alimentação"; podem ser ajustadas.

---

## [v1 a v5] — versões iniciais (resumo)

Histórico condensado das cinco primeiras versões — do protótipo com ilustrações genéricas até a base que sustenta o site hoje.

- **v1** — Estrutura inicial da landing page (Hero, Sobre, Pilares, Galeria, Depoimento, Localização, CTA), com ilustrações SVG no lugar de fotos reais.
- **v2** — Primeiras fotos reais do projeto, logo oficial integrada, compressão de imagens (~8.8MB → ~470KB).
- **v3** — Nova seção "Ação Social"; paleta de cores extraída do logo oficial (laranja/verde); tipografia definitiva (Archivo Black + Inter + JetBrains Mono); textos revisados por tom e empatia.
- **v4** — SEO e conversão: Open Graph/Twitter Card, botão flutuante mobile, seção FAQ; CSS e JS extraídos para arquivos compartilhados; correção do endereço e do menu mobile em `equipe.html`.
- **v5** — Acessibilidade (focus trap no menu, FAQ navegável por teclado, `aria-live` no carrossel); performance (`preload` da imagem do Hero); nova seção de Colaboradores; reordenação das seções para uma sequência mais lógica; redução de efeitos visuais "de IA" (menos glow, menos ícone decorativo).


### Pendente nesta versão
- ...
```
