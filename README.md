<p align="center">
   <img src=".github/mockup.png" height="480px" />
</p>

<br />

<p align="center">	
  
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/bkkater/parking-web?color=6CBAD9&style=for-the-badge">

  <a href="https://github.com/bkkater/parking-web/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/bkkater/parking-web?color=6CBAD9&style=for-the-badge">
  </a> 
  
  <img alt="License" src="https://img.shields.io/badge/license-MIT-6CBAD9?style=for-the-badge">
</p>

<br />
<br />


# :pushpin: Tabela de Conteúdo

* [Propósito do projeto](#closed_book-propósito-do-projeto)
* [O que utilizei](#computer-o-que-utilizei)
* [Principais dificuldades](#adhesive_bandage-principais-dificuldades)
* [Como rodar](#construction_worker-como-rodar)

# :closed_book: Propósito do projeto

Este projeto foi desenvolvido como parte de um desafio de programação, com o objetivo de criar uma aplicação web para gerenciamento de um estacionamento. 

A ideia era utilizar as tecnologias Next.js 14, React 18 e explorar as funcionalidades do Tailwind CSS. O projeto serviu também como um desafio pessoal para aprimorar habilidades de desenvolvimento web e explorar novas tecnologias.

# :computer: O que utilizei

-   [React](https://pt-br.reactjs.org/)
-   [Next.js](https://nextjs.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Radix-UI](https://www.radix-ui.com/)
-   [React Hook Form](https://react-hook-form.com/)
-   [Cypress](https://www.cypress.io/)
-   [Lucide](https://lucide.netlify.app/)


# :rocket: Funcionalidades

- **Registro de Entrada, Saída de Veículos e Pagamento**: O usuários pode registrar a entrada e saída de veículos, fornecendo sua placa.
- **Histórico do Veículo**: O usuário pode acessar o registro completo do histórico de entrada e saída do veículo, informações sobre o tempo total e pagamento.

# :adhesive_bandage: Principais dificuldades

Acredito que tenha conseguido construir nesse desafio uma aplicação boa em questão de UX para a UI proposta. Porém como nem tudo são flores, encontrei alguns problemas: 

- Debug de requisições server side do next - o que me fez optar por fazer client-side. 
- Manipulação de estados do React Hooks Form, principalmente do isSubmitSuccessful, onde acabei escolhendo por criar um estado próprio.
- Problemas na cobertura de testes por não ter escolhido uma boa opção no desenvolvimento dos errors handlers.

Após o desafio, todos esses problemas serão refatorados para que funcionem da melhor forma possível em quesito dee código, sem perder os detalhes na experiência do usuário.

# :construction_worker: Como rodar
```bash
# Clone o Repositório
$ git clone https://github.com/bkkater/parking-web.git
# Vá para a pasta parking-web
$ cd parking-web
# Instale as depedencias
$ npm install
# Rode a aplicação
$ npm run dev
```

:closed_book: LICENSE
Esse projeto está sobre MIT license.

