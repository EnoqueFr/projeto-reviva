# Projeto Reviva — Landing Page

Landing page institucional do **Projeto Reviva**, iniciativa social da Comunidade Cristã Tenda da Aliança (Prefeito José Walter, Fortaleza/CE) que usa o Jiu-Jitsu como ferramenta de formação de caráter, disciplina e propósito para crianças e adolescentes.

🔗 Instagram oficial: [@projetorevivaoficial](https://www.instagram.com/projetorevivaoficial)

---

## Estrutura do projeto

```
reviva-site/
├── index.html      → Página principal (hero, sobre, ação social, carrossel, equipe, apadrinhamento, FAQ, localização)
├── equipe.html      → Página dedicada à equipe/liderança do projeto
├── style.css        → Estilos compartilhados entre as páginas (variáveis, header, botões, menu mobile, footer)
├── home.css         → Estilos específicos de index.html
├── equipe.css       → Estilos específicos de equipe.html
├── app.js           → Scripts compartilhados (menu mobile com focus trap, carrossel, FAQ, scroll reveal, botão flutuante)
└── img/             → Imagens do projeto (fotos reais + logo + logos de colaboradores), em WebP com fallback JPEG
```

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

- [ ] Formulário de inscrição inline (grava em banco de dados)
- [ ] Banco de dados via Supabase (schema + Row Level Security)
- [ ] Painel/login simples para a equipe visualizar inscrições recebidas

## Deploy

Site estático — está sendo hospedado gratuitamente no Vercel sem nenhuma configuração especial. 
---

*Projeto social sem fins lucrativos. Este repositório contém apenas o código da landing page — não armazena dados pessoais de alunos ou responsáveis.*
