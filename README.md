# Projeto Reviva — Landing Page

Landing page e sistema de inscrição do **Projeto Reviva**, iniciativa social da Comunidade Cristã Tenda da Aliança (Fortaleza/CE) que usa o Jiu-Jitsu como ferramenta de formação de caráter, disciplina e propósito para crianças e adolescentes.

🔗 **[projetoreviva.vercel.app](https://projetoreviva.vercel.app)**
📷 Instagram: [@projetorevivaoficial](https://www.instagram.com/projetorevivaoficial)

---

## Funcionalidades

- Landing page institucional com apresentação do projeto, equipe, ações sociais e localização
- Formulário de inscrição que grava direto no banco via API própria
- Painel administrativo autenticado para a equipe visualizar e gerenciar inscrições recebidas
- Totalmente responsivo, com foco em acessibilidade (navegação por teclado, leitores de tela) e performance

## Stack

- **HTML / CSS / JavaScript puro** — sem framework, sem build step
- **Fontes:** Archivo Black, Inter, JetBrains Mono
- Integração com [`reviva-backend`](https://github.com/EnoqueFr/reviva-backend) (API Node.js/Express) para inscrições e autenticação do painel
- Deploy: Vercel

## Estrutura

```
reviva-site/
├── index.html       → página principal
├── equipe.html      → equipe e liderança
├── painel.html       → painel administrativo (autenticado)
├── style.css         → estilos compartilhados
├── home.css / equipe.css / painel.css
├── app.js / painel.js
└── img/
```

## Rodando localmente

```bash
git clone https://github.com/EnoqueFr/projeto-reviva.git
cd projeto-reviva
npx serve .
```

Site 100% estático — qualquer servidor local serve (Live Server, `python -m http.server`, etc). Para o formulário e o painel funcionarem, é necessário ter a [API](https://github.com/EnoqueFr/reviva-backend) rodando e configurar `API_BASE_URL` em `app.js` e `painel.js`.

## Paleta de cores

| Cor | Hex |
|---|---|
| Laranja | `#F77F04` |
| Verde | `#78BF0A` |
| Dourado | `#E8B84B` |
| Grafite | `#15160F` |

## Privacidade e LGPD

O formulário de inscrição coleta dados pessoais de menores de idade e de seus responsáveis (nome, idade, contato). O tratamento segue os princípios da LGPD:

- **Dados coletados:** apenas nome da criança, idade, nome do responsável e WhatsApp — o mínimo necessário para viabilizar a matrícula
- **Base legal:** consentimento do responsável legal (Art. 7º, I e Art. 14 da LGPD)
- **Finalidade:** exclusivamente contato para matrícula — sem uso para terceiros ou publicidade
- **Segurança:** dados armazenados em PostgreSQL, acessíveis somente via API autenticada (JWT + bcrypt)
- **Direitos do titular:** acesso, correção ou exclusão mediante contato pelo Instagram oficial

## Licença

Projeto social sem fins lucrativos. Código aberto para fins de portfólio — este repositório não armazena dados pessoais de alunos ou responsáveis.
