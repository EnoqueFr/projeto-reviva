# Projeto Reviva — Landing Page

Landing page institucional do **Projeto Reviva**, iniciativa social da Comunidade Cristã Tenda da Aliança (Prefeito José Walter, Fortaleza/CE) que usa o Jiu-Jitsu como ferramenta de formação de caráter, disciplina e propósito para crianças e adolescentes.

🔗 Instagram oficial: [@projetorevivaoficial](https://www.instagram.com/projetorevivaoficial)

---

## Estrutura do projeto

```
reviva-site/
├── index.html      → Página principal (hero, sobre, ação social, carrossel, equipe, inscrição, apadrinhamento, FAQ, localização)
├── equipe.html      → Página dedicada à equipe/liderança do projeto
├── painel.html      → Painel restrito aos colaboradores (login + lista de inscrições recebidas)
├── style.css        → Estilos compartilhados entre as páginas (variáveis, header, botões, menu mobile, footer)
├── home.css         → Estilos específicos de index.html
├── equipe.css       → Estilos específicos de equipe.html
├── painel.css       → Estilos específicos de painel.html
├── app.js           → Scripts compartilhados (menu mobile com focus trap, carrossel, FAQ, scroll reveal, botão flutuante, envio do formulário de inscrição)
├── painel.js        → Script do painel de colaboradores (login, listagem e atualização de status das inscrições)
└── img/             → Imagens do projeto (fotos reais + logo + logos de colaboradores), em WebP com fallback JPEG
```

## Backend

O formulário de inscrição e o painel de colaboradores conversam com uma **API própria em Node.js/Express**, num repositório separado (`reviva-backend`) — veja o README dele para detalhes de setup, endpoints e deploy. Resumo:

- `POST /api/inscricoes` — recebe as inscrições do formulário (público)
- `GET /api/inscricoes` / `PATCH /api/inscricoes/:id` — usado pelo painel (exige login)
- `POST /api/auth/login` — login dos colaboradores (JWT)

Em `app.js` e `painel.js`, a constante `API_BASE_URL` precisa apontar pra URL da API depois do deploy dela.

## Stack

Site 100% estático — sem build, sem dependências de backend (por enquanto).

- **HTML/CSS/JS puro**, sem frameworks
- **Fontes:** Archivo Black (títulos), Inter (corpo), JetBrains Mono (labels/UI) — via Google Fonts
- **Imagens:** convertidas para WebP com fallback JPEG (`<picture>`), comprimidas e redimensionadas
- **Mapa:** embed do Google Maps (iframe, sem necessidade de API key)

## Paleta de cores

Extraída diretamente do logo oficial do projeto:

| Cor | Hex | Uso |
|---|---|---|
| Laranja | `#F77F04` | Cor primária, CTAs, destaques |
| Laranja escuro | `#C4630A` | Hover, texto de destaque em fundo claro |
| Verde | `#78BF0A` | Seção de apadrinhamento, acentos |
| Verde escuro | `#4E8A05` | Gradientes, hover |
| Dourado | `#E8B84B` | Acentos pontuais (faixa de graduação) |
| Grafite (ink) | `#15160F` | Fundo escuro (hero, carrossel, footer) |
| Papel | `#FDFDF9` | Fundo claro principal |
| Papel aquecido | `#F6F3EA` | Fundo claro secundário (seções alternadas) |

## Conteúdo e dados reais do projeto

- **Início:** julho de 2026
- **Atende:** 15 crianças/adolescentes, 5–15 anos
- **Liderança:** Josué Silva (instrutor, faixa azul), Rebecca Sabino, Bruno Oliveira
- **Treinos:** segunda-feira 19h · sábado 15h
- **Modelo:** taxa simbólica só para custeio do tatame; programa de apadrinhamento para quem precisar
- **Inscrição:** via mensagem direta no Instagram
- **Endereço:** R. Vinte Seis, Prefeito José Walter, Fortaleza/CE, 60810-670
- **Ação social:** eventos periódicos de atendimento à comunidade (saúde, aferição de pressão, teste de glicemia)

## Seções da `index.html`

1. Hero — chamada principal + CTA + estatísticas rápidas
2. Faixa de texto — pilares em destaque (Jiu-Jitsu, Formação, Fé, Comunidade)
3. Sobre o projeto — texto institucional + 3 pilares
4. Carrossel "Dia a dia" — fotos reais no tatame
5. Equipe (resumo) — cards do Josué, Rebecca e Bruno, com link para `equipe.html`
6. Ação Social — fotos e explicação dos eventos de atendimento à comunidade (mensal)
7. Colaboradores — logos de quem já participou de ações ou aulas do Reviva
8. Apadrinhamento — CTA de apadrinhar uma criança
9. FAQ — perguntas frequentes em acordeão
10. Depoimento
11. Localização — endereço, horários, mapa embedado
12. CTA final
13. Footer

## Acessibilidade e performance

- Imagens com `alt` descritivo em todas as fotos
- `<picture>` com WebP + fallback JPEG (compatibilidade ampla)
- `loading="lazy"` em todas as imagens fora da primeira dobra
- Navegação por teclado (`:focus-visible`) e `aria-expanded`/`aria-controls` no menu mobile
- Design mobile-first: menu hambúrguer, botão flutuante de CTA, áreas de toque ≥44px
- Open Graph e Twitter Card configurados para pré-visualização ao compartilhar o link

## Próximos passos (planejados, não implementados)

- [ ] Legendas definitivas dos 4 cards de Ação Social — usando por ora "Saúde", "Aromoterapia", "Jurídico" e "Alimentação"
- [ ] Página de política de privacidade dedicada (hoje a informação de LGPD vive só neste README — ideal ter uma página `/privacidade` linkada no formulário e no footer)

## Privacidade e LGPD

O formulário de inscrição (`#inscricao`) coleta dados pessoais de menores de idade e de seus responsáveis, então o projeto segue os princípios da LGPD (Lei 13.709/2018) no que for aplicável a uma iniciativa social de pequeno porte:

- **Dados coletados**: nome da criança/adolescente, idade, nome do responsável e telefone (WhatsApp) — o mínimo necessário para viabilizar a matrícula e o contato. Nenhum dado sensível (saúde, documento, endereço) é pedido no formulário.
- **Base legal**: consentimento do responsável legal, dado ao preencher e enviar o formulário voluntariamente (Art. 7º, I e Art. 14 da LGPD, que trata do tratamento de dados de crianças e adolescentes mediante consentimento de ao menos um dos pais/responsável).
- **Finalidade**: exclusivamente viabilizar o contato para matrícula no Projeto Reviva — os dados não são usados para nenhum outro fim, nem compartilhados com terceiros ou usados para publicidade.
- **Armazenamento e segurança**: os dados ficam num banco PostgreSQL, acessível só pela API própria (`reviva-backend`) e só por colaboradores autenticados (login com senha com hash bcrypt + sessão JWT). Nada de dado pessoal fica no código-fonte ou nos repositórios — nem deste, nem do backend.
- **Retenção**: sem prazo automático de exclusão implementado ainda (ver "Próximos passos" do backend) — hoje a exclusão de um registro é manual, feita por um colaborador direto no banco, mediante pedido do titular/responsável.
- **Direitos do titular**: qualquer responsável pode pedir acesso, correção ou exclusão dos dados da criança entrando em contato pelo Instagram oficial do projeto.

## Deploy

Site estático — está sendo hospedado gratuitamente no Vercel sem nenhuma configuração especial.
---

*Projeto social sem fins lucrativos. Este repositório contém apenas o código da landing page — não armazena dados pessoais de alunos ou responsáveis.*
