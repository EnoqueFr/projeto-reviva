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

## [v5] — em andamento

### Corrigido
- **Fundo branco nas logos de colaboradores**: as 7 logos foram reprocessadas com remoção de fundo (o problema não era CSS — os arquivos originais tinham fundo sólido "queimado" na própria imagem, sem transparência real). Agora usam `.webp` com canal alpha e fallback `.jpg` com fundo branco apenas para navegadores sem suporte a WebP+alpha.
- **CSS inline extraído**: os blocos `<style>` embutidos no `<head>` de `index.html` e `equipe.html` foram movidos para arquivos próprios (`home.css` e `equipe.css`), permitindo cache do navegador entre páginas. Todos os `style="..."` inline restantes (margens, cores pontuais) viraram classes utilitárias em `style.css` (`.mt-32`, `.mb-36`, `.mb-30`, `.pt-0`, `.text-paper`).
- **Focus trap ausente no menu mobile**: um usuário navegando só por teclado conseguia dar Tab e sair do menu para links "escondidos" atrás dele. Implementado focus trap real — Tab e Shift+Tab agora ficam presos aos links do menu enquanto ele estiver aberto, e o foco retorna ao botão de menu ao fechar.
- **Frase confusa no CTA final**: "Sua visita ou apoio pode revivar uma nova geração" usava "revivar" (não é verbo válido em português) como trocadilho forçado com o nome do projeto. Trocada por "Sua visita ou seu apoio pode mudar a vida de uma criança".
- **Botão flutuante sobrepondo o footer**: o CTA fixo mobile ("Fala com a gente →") permanecia visível mesmo quando o rodapé estava na tela, cobrindo os links de contato/Instagram do footer. Agora ele some automaticamente perto do fim da página.
- **Dessincronia no carrossel mobile**: o clique nas setas usava um valor de scroll fixo (306px, calculado para desktop), mas o slide no mobile tem largura variável (`72vw`). Em telas menores, isso cortava o próximo card pela metade. Agora o scroll é calculado dinamicamente a partir da largura real do slide.
- **FAQ inacessível por teclado**: as perguntas eram `<div>` clicáveis sem suporte a navegação por teclado. Adicionado `role="button"`, `tabindex="0"`, `aria-expanded` dinâmico e resposta a Enter/Espaço.
- **Grade de colaboradores no mobile**: 7 logos em 3 colunas deixava 1 item sozinho e desalinhado na última linha; ajustada para 2 colunas.
- **Menu mobile podendo cortar conteúdo em telas baixas**: adicionado `overflow-y: auto` e fonte responsiva (`clamp`) nos links do menu, para telas de pouca altura (ex: celular em paisagem) não esconderem o botão de CTA.

### Adicionado
- **`<link rel="canonical">`** em ambas as páginas — previne penalização de SEO por conteúdo duplicado quando a URL é acessada com parâmetros (ex: UTMs de campanha). *(nota: aponta para um domínio placeholder `projetoreviva.vercel.app`; atualizar assim que o deploy real tiver uma URL definitiva)*
- **`<link rel="preload">`** da imagem do Hero (`grupo-completo-cruz.webp`) — instrui o navegador a baixar a imagem de maior peso da tela antes de terminar de processar o HTML, melhorando o LCP (Largest Contentful Paint).
- **`role="region"` e `aria-live="polite"`** no carrossel de fotos, ajudando leitores de tela a contextualizar a mudança de slides.
- **Fotos reais de Rebecca Sabino e Bruno Oliveira** na seção de equipe (`index.html` e `equipe.html`), substituindo os placeholders de ícone genérico.
- **Nova seção "Quem já colaborou com a gente"**: grade com 7 logos de profissionais/negócios que já participaram de ações ou aulas do Reviva (NutriFit, Reviva Spa, Priscila Viana Nutricionista, Hope Jiu Jitsu, Ítalo Caveirão BJJ, TC Brothers, Rayssa Vitória Jiu-Jitsu).

### Alterado
- **Reordenação das seções** em `index.html` para uma sequência mais lógica: Hero → Sobre → Dia a dia (carrossel) → Equipe → Ação Social → Colaboradores → Apadrinhamento → FAQ → Depoimento → Local → CTA final.
- **Redução de efeitos visuais** ("menos landing page de IA"): removidos os glows radiais do hero e do CTA final, hovers de botão simplificados (sem scale/sombra colorida exagerada), sombras de foto neutralizadas.
- **Redução de ícones decorativos**: pilares "Jiu-Jitsu/Formação/Fé" e linhas de endereço/horário agora usam apenas tipografia (números, texto), sem SVG de apoio. Marquee do topo trocado por uma faixa de texto estática simples.
- **Textos reescritos** para soar menos "copy genérica": títulos e CTAs mais diretos, menos adjetivação.
- **Frequência da Ação Social especificada**: "de tempos em tempos" → "uma vez por mês", tanto no rótulo quanto no texto corrido.
- **Citação/depoimento reescrita**: trocada a frase genérica anterior por uma ancorada no slogan oficial do projeto ("Transformando vidas, restaurando esperanças"). Estilo visual das aspas simplificado (barra lateral discreta no lugar de aspas grandes decorativas).
- **Cards da equipe em `index.html`** migrados de lista vertical para grade de 3 colunas com foto, nome, cargo e bio curta — mesmo padrão visual usado nos cards de colaboradores.

### Pendente
- Foto individual do Josué Silva sozinho (sem outra pessoa no quadro) — aguardando envio; card dele ainda usa a foto ensinando uma aluna.
- Formulário de inscrição inline / banco de dados Supabase — ainda não iniciado.
- Deploy em produção (GitHub → Vercel) — ainda não realizado; usuário está no processo de aprender o passo a passo.

---

## [v4]

### Corrigido
- **Endereço incorreto**: grafia errada "Rua Vinte e Seis" corrigida para o nome real, "Rua Vinte Seis" (sem o "e"), em todos os pontos da página (texto, card de endereço, footer, embed do mapa). CEP `60810-670` adicionado, que estava faltando desde a v1.
- **Bug do menu mobile em `equipe.html`**: o HTML do overlay `.mobile-menu` não existia nessa página, então o botão hambúrguer aparecia mas não abria nada. *(correção aplicada agora em ambas as páginas)*
- **Bug visual no marquee** (faixa "Jiu-Jitsu · Formação · Fé · Comunidade"): a animação usava um número ímpar de itens duplicados, causando um "engasgo" visível no meio do loop. Corrigido com dois blocos (`.marquee-set`) idênticos e `translateX(-50%)` matematicamente exato. *(nota: esse elemento foi substituído por uma faixa de texto estática na v5)*

### Alterado
- **Hierarquia do Hero**: nome do projeto ("Projeto Reviva", com logo) agora aparece *antes* da localização geográfica, que virou informação secundária abaixo do título.
- **Tom dos CTAs**: textos como "Inscrever no Instagram" trocados por convites mais humanos — "Vem conversar com a gente", "Vem falar com a gente", "Manda um oi pra gente no Instagram".
- **CSS extraído** para `style.css` compartilhado entre `index.html` e `equipe.html` (antes duplicado em cada arquivo).
- **JS extraído** para `app.js` compartilhado (menu mobile, scroll reveal, belt progress, carrossel, FAQ, botão flutuante).

### Adicionado
- **Seção FAQ** (acordeão) com 5 perguntas frequentes: gratuidade, nível de experiência necessário, equipamento, idade, e como funciona a parte de fé.
- **Botão flutuante mobile** ("Fala com a gente →"), fixo na parte inferior da tela, aparece após o usuário passar do Hero — padrão de alta conversão para mobile.
- **Open Graph e Twitter Card** (`og:title`, `og:description`, `og:image`, etc.) para pré-visualização correta ao compartilhar o link no WhatsApp/Instagram/redes sociais.
- **`aria-controls`** no botão do menu mobile, apontando para `#mobileMenu` (melhoria de acessibilidade para leitores de tela).

---

## [v3]

### Adicionado
- **Nova seção "Ação Social"**: fotos e texto sobre os eventos periódicos de atendimento à comunidade (saúde, glicemia, aferição de pressão) — até então a página só falava de Jiu-Jitsu infantil.
- **Fotos reais do projeto** substituindo todas as ilustrações genéricas: grupo com a cruz ao fundo (hero), roda de mãos dadas, aula com tatame cheio, técnica no tatame, fila de instrutores.
- **Mapa real** via embed do Google Maps, substituindo a ilustração SVG genérica de "mapa" usada nas versões anteriores.
- Fallback `<picture>` com WebP + JPEG em todas as imagens (correção de imagens que não carregavam em certos ambientes).

### Alterado
- **Paleta de cores**: extraída via análise de pixels do logo oficial (`#F77F04` laranja, `#78BF0A` verde), substituindo a paleta terracota/oliva inventada nas versões anteriores.
- **Tipografia**: Archivo Black + Inter + JetBrains Mono, no lugar de Anton/Fraunces/Space Grotesk.
- **Textos revisados por tom/empatia**:
  - "Mais que uma academia de luta" → "Um lugar para pertencer e crescer" (o projeto não deveria se definir em oposição a "academia")
  - "Apadrinhe — quem não tem condições" → "Apadrinhe uma criança e ajude a garantir sua vaga no tatame" (removida exposição direta da condição financeira das famílias)

### Removido
- Página `josue.html` (versão "personal trainer" do instrutor Josué, com CTAs comerciais) — substituída por `equipe.html`, focada inteiramente no projeto social.
- Fotos de contexto de academia comercial (fora do escopo do Reviva).

---

## [v2]

### Adicionado
- Fotos reais do projeto pela primeira vez (grupo, roda de conversa, técnica, instrutores).
- Logo oficial do Projeto Reviva integrada ao header/footer/favicon.
- Compressão de imagens (WebP, ~8.8MB → ~470KB no total).

### Corrigido
- Primeira tentativa de correção de imagens que não carregavam (troca de paths).

---

## [v1] — versão inicial

### Adicionado
- Estrutura base da landing page: Hero, Sobre, Pilares, Galeria (ilustrada), Depoimento, Localização (ilustração genérica), CTA final, Footer.
- Identidade visual inicial em terracota/oliva/dourado (paleta não derivada do logo real — logo ainda não havia sido compartilhada).
- Ilustrações SVG customizadas no lugar de fotos reais (ainda não disponíveis).

---

## Como registrar uma atualização futura

Ao aplicar mudanças, adicionar uma nova seção no topo deste arquivo seguindo o modelo:

```md
## [vX] — AAAA-MM-DD (ou "em andamento")

### Adicionado
- ...

### Alterado
- ...

### Corrigido
- ...

### Removido
- ...

### Pendente nesta versão
- ...
```
