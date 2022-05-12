

<div align="center">
<h1>DESAFIO GRX</h1>
<br/><br/>
Proposto por: <a href="http://www.grtsolucoes.com.br/">GRX Soluções</a><br/><br/>

<div align="left">
  <h2><strong>Stack principal:</strong></h2>
</div>

![Typescript][typescript-shield]
![Docker][docker-shield]
![Eslint][eslint-shield]

<div align="left">
  <h3><strong>Frontend:</strong></h3>
</div>

![React][react-shield]
![ReactRouter][react-router-shield]
![ReactHookForm][react-hook-form-shield]
![ReactQuery][react-query-shield]
![Axios][axios-shield]
![Yup][yup-shield]
![Bulma][bulma-shield]

<div align="left">
  <h3><strong>Backend:</strong></h3>
</div>

![NodeJS][node-shield]
![ExpressJS][express-shield]
![AJV][ajv-shield]

</div>

---

## Sobre o Projeto
<br/>

![InitialScreenshot][initial-screenshot]
![ResponseScreenshot][response-screenshot]

  O projeto a seguir, apresenta-se como uma solução de um sistema para:
  - coletar do usuário respostas às perguntas pré-cadastradas por meio de um cliente web;
  - analisar as respostas e por meio de um score dar o peso pras respostas;
  - escrever a resposta em um arquivo `.txt` no servidor.
  - exibir a pontuação das respostas para o usuário

  Como diferencial, não há conteúdo estático no projeto fora dos `JSON`s de cliente e servidor. Logo, a edição dos arquivos JSON na pasta `constants` de cliente e servidor é o suficiente para cadastrar novas questões ou alterar/remover as existentes do lado do cliente, assim como, criar ou alterar novas pontuações baseadas nas respostas do lado do servidor.

  > Lembre-se: O projeto utilizou-se de uma estrutura monorepo para facilitar o desenvolvimento. O deploy deverá ser feito em ambientes separados para segurança (Dica: O `docker` já está configurado para rodar o ambiente de desenvolvimento, poucas alterações serão necessárias para o deploy da imagem em algum registry para posteriormente colocar em produção.)

---

## Instalação

### Ambiente desenvolvimento
<br/>

Opção Docker:
  - Você pode rodar o comando `docker-compose up` na raiz. Na primeira execução, o comando vai fazer o build da imagem o que pode levar alguns minutos, após utilize apenas esse comando para rodar seu ambiente de desenvolvimento nas próximas;

Opção Local:
  - Faça o `git clone` do projeto
  - Rode na raiz do projeto o comando:

```npm install && cd react_client && npm  install```

  - Rode o comando: `npm run dev` na raiz;
   - Acesse o app em: `http://localhost:3000`;

<br/>

---

## Uso do sistema
<br/>

   A função de edição das questões em formato `JSON`, você descobre abaixo como fazer. Essa abstração busca permitir edições rápidas nas questões apresentadas e igualmente alteração do score registrado pelo sistema. Nesse formato, mesmo a internacionalização(tradução) também poderá ser aplicada mais facilmente.

> * # Cliente:

  ```
    react_client/src/constants/survey.json
  ```

Nesse arquivo devemos configurar como será a visualização da pesquisa, você poderá acrescentar perguntas, editar ou remover a seu critério sem precisar refazer um build quando em produção. Veja o padrão:

  ```javascript
     {
      "survey": "Título da Pesquisa",
      "questions": {
        "question1": {
          "statement": "Enunciado",
          "type": "Tipo",
          "answers": ["respostas", "aceitas"],
          "error": "Mensagem de erro"
        },
      },
      "answers": {
        "respostas": "Respostas",
        "aceitas": "Aceitas",
        "pelo": "Pelo",
        "servidor": "Servidor",
      },
      "responses": {
        "positives": "Positiva",
      }
    }
  ```

  Dessa forma, é possível acrescentar ou alterar questões.

  Temos disponíveis as questões do tipo: `"select", "textarea" e "radio"`

  Para sincronizar as novas questões com o backend veja a próxima seção. Ainda no frontend, para concluir a edição se houver validações a serem feitas você poderá configurar no arquivo:

  ```
  react_client/src/constants/validation.ts
  ```

  Utilizamos a popular lib `yup` para as validações.

> Lembre-se de alterar também o arquivo `src/types/types.ts` que conterá guardiões de tipo. Caso necessário novo build esse passo é obrigatório, pois o compilador do `Typescript` está configurado em modo estrito com pouca permissividade.

---

 > * # Servidor:

```
  src/constants/pointsByAnswer.json
```
O JSON do servidor é configurado aninhando-se o número da questão, as classificações de respostas aceitas e finalmente a pontuação de cada resposta em seu grupo como no exemplo abaixo:

  ```javascript
    {
    "question1": {
      "positives": {
        "yes": 1
      },
      "negatives": {
        "no": 1
      }
    }
  ```
  Cadastramos a pontuação da questão e as possibilidades de resposta seguindo esse padrão.

  > Lembre-se de alterar também o arquivo `src/types/types.ts` que conterá guardiões de tipo para o backend. Caso necessário novo build esse passo é obrigatório, pois o compilador do `Typescript` está configurado em modo estrito com pouca permissividade.

O servidor API REST está configurado para rodar na porta 5000 por default no ambiente de desenvolvimento.
```
localhost:5000
```
Respondendo às requisições HTTP, esse servidor possui esquema de validação própria das entradas aceitas via lib `Ajv`. A validação do lado do backend pode ser encontrada no JSON
```
schemas/answer.json
```
Também deve ser editado após a compilação para acomodar a validação das novas questões ou mais possibilidades de respostas pra mesma questão.


 Abaixo um exemplo do modelo do contrato encontrado nas rotas disponíveis:

- Rota

      /answer

- Request
     ```javascript
    {
      "question1": "yes",
      "question2": "yes",
      "question3": "now",
      "question4": "I would like to improve my technical and softskill abilities at GRX"
    }
    ```
- Response
    ```javascript
    {
      "positives": 4,
      "negatives": 0,
      "not_avaliated": 0
    }
    ```

---

## Etapa mais desafiadora

A integração das bibliotecas React Query e React-hook-forms foi bastante desafiadora a medida em que elas fazem o gerenciamento dos estados no formulário e requisição do servidor. Foi adicionado à proposta um botão de `reset` para a pessoa poder responder novamente. Houve um trabalho longo para orquestrar esses estados da biblioteca de forms, dos componentes com o react-query. Em tempo, o maior entendimento do código do react-hook-forms, pesquisa de issues no github e leitura do código fonte foi a fonte para conseguir fazer funcionar o `reset`.

---

## O que faltou?

Seria interessante a criação de testes ao longo do processo de desenvolvimento, como não foi feito, deveria-se fazer no mínimo um teste de integração. O teste cobrindo os casos de envio e erro ajudariam muito no desenvolvimento de novas features posteriormente, como a inclusão de novos tipos de questões.

---

## Feedback sobre a proposta

O desafio proposto embora pareça simples à primeira vista, ele é capaz de te desafiar. O desafio passa principalmente em relação às arquiteturas possíveis e seleção de ferramentas e tecnologias que você possa utilizar na solução. A abstração para modelos mais dinâmicos é compreendida em fase mais avançada do projeto e traz uma experiência importante na criação de softwares fullstack. Talvez eu pudesse sugerir um prazo maior pra realização do projeto em bom nível sem extrapolar o prazo.

---

## License

      UNLICENSED yet.

---

## Authors

  > Celso Oliva - [celsodevelop][github-url]

---

## Acknowledgements

* [Typescript](https://www.typescriptlang.org)

---

<div align="center">
GRX Challenge - 2022 &copy;
</div>

<!-- MARKDOWN LINKS -->
[initial-screenshot]: ./data/assets/initial_screen.png
[response-screenshot]: ./data/assets/response_screen.png
[npm-shield]: https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white
[typescript-shield]: https://img.shields.io/static/v1?logo=TYPESCRIPT&message=TypeScript&style=for-the-badge&color=3178C6&logoColor=fff&labelColor=gray&label=
[react-shield]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAF
[docker-shield]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[bulma-shield]: https://img.shields.io/badge/Bulma_CSS-38B2AC?style=for-the-badge&logo=bulma&logoColor=white
[node-shield]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[react-query-shield]: https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white
[react-router-shield]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[eslint-shield]: https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white
[express-shield]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[ajv-shield]: https://img.shields.io/badge/ajv-%3361459.svg?style=for-the-badge&logo=ajv&logoColor=%3361DAFB
[yup-shield]: https://img.shields.io/badge/Yup-666613?style=for-the-badge&logoColor=white

[axios-shield]: https://img.shields.io/badge/Axios-20232A?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABhlBMVEUAAABOIsNMIb9JILdXJtpRJM1PI8dcKul1Pv9RJMxaKeRHILNjLftWJ9tYKOBbKeZNI8JBHaNSJc9RJMtfLPFEHqtWJ9hUJtMPAR1AHKFWJ9krE21xNP8hDlMzF4L/nf94N/8ZCj8ZCj4eDUseDUxhLPZjLflYKN9PJMhMIr8zFoAzF4E2GIlOI8Y0F4NbKudJIbpXKN66Vf9GILJVJ9dZKeNDHqpiLflVJ9hQJMtTJtI2GI1oL/9wNP88G5g5GpMrFHA6GpdBHaZHILc+GppLIb1XKN1YKN5UJtVZKeJZKeJVJtdXJ91VJtZZKeJWJ9pZKOFaKeRUJtZXJ9xZKeJaKeRTJdBYKN9aKeNaKeROI8ZVJ9dWJ9lXKN1aKeQpEmlVJ9dVJ9hYKOBMI8FQJctNI8RaKeNZKeJZKOBYKN5TJtFZKeJXJ907G5xUJtZZKeNZKOFVJ9dTJtNXKN5UJtVaKeRaKeRHILNMI8FVJ9hZKeFYKN5SJdBWJ9kAAABaKeNaKeT///8HoEAIAAAAf3RSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEDTERE7m0bFVlqM7xFVVHb/Qx38vo2kJbJ+wJ8fXYQFg795dW3N9FBAVb9sSZNjxP+SgsIf9osSDUBBihG0QAAAAFiS0dEgRK6rv4AAAAHdElNRQfmBQwCGhQnjJg/AAAAy0lEQVQoz2NgoCNgZGJmwS3LysbuwoFbmtPVzZ0Lhxw3Dy+fh6cXP3ZZAUEubx/fej/s0kLCIv4BgUHYpUXFxCWCQ0JxSUtKhYVHNETikpaWiYqOiY3DJS0rFy+vkIDTcEUlZRXVRJzSIKBGDWl1DU0GLZzSSckpqQzauKTT0jMys3h0cEo3ZOfk6urhkM7LLyjUN9DF5bSi4hJDI2McLi8tK68wMTXD7jHzyqpqC0sraxz+tqmptbVjwAkM6vjtDXBLOzg6OTPQEQAAWZk5ojBMYn4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDUtMTJUMDI6MTk6NTkrMDA6MDCc/8YeAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA1LTEyVDAyOjE5OjU5KzAwOjAw7aJ+ogAAAABJRU5ErkJggg==&logoColor=white

[react-hook-form-shield]: https://img.shields.io/badge/React_Hook_Forms-444245?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABy1BMVEUHEioIEysKFCwIEioLFS0CDiYAByABDSUKFS0AAxwaIjk7QlY8Q1YfJz0FECgIEyoGESkEDyeIjJjz/Pr////3//6WmqUJFCwAAx2Okp36xtnwibDxi7HxirHwiK/4vdOipq8ABh8JFCsADCQkK0H8///4v9ToSITrT4nrUIroRoPzrcgzOk8ACSIABR5LUmPufqjrUYrtXpPsW5HsXJLsWZDsWJDsV47sVo7sXZPrU4zscqBcY3MAAhxNVGbuf6nrUYvtZJftZZjuaJryjLLyjbPua5zsWpHsc6BeZXVNVGXrVI3we6bxgqvxhK3zl7nyjbLxha7wf6rwgKrsVY3sW5LrUozyjrTtXpTxibDweaXweqbtYpbrTYjyjrPtYJXsWpDsWI/uZ5ntZpnxh6/tXZPyi7HrUovrVIzsVY7xiLDtYZbsXpPxh67ub57ubZ7xiK/sXZLxhq7rT4rvd6TweabveKTwfajuaZvwe6frTIfrTojveqbwfKjwf6nsc6FNU2XufKfsV4/scZ9eZXQACiMuNUrzq8bpRYPwm7s/RVmrr7fxo8HAxMoACyQDDicSHDOytr0bJTsBDCUJEysDDiYACCE5QFRdZHQrF5XEAAAAAWJLR0QUkt/JNQAAAAd0SU1FB+YFDAIaFCeMmD8AAAGhSURBVCjPY2CgBmBkQgGMKJLMLKxsKICdA0kBIwMnFzcPMuDl5IPL8wsICgmLoABRMXG4PIeEpIiUtIwsHMjIyYsoKDJBZJWUVVTV1DVAQBOMgISWtoiOrjhEs56+iIGhkbGJqZm5sYmFmZmJsaWVtYiNLQtU2k7E3sHY1MLRydnF1c3RycLU3cpDxBMu7QXUbeLt4+vnb2oREBgUHBIahi7tbhLuEBEZFe0XExsXbwo0HFU6wSgy0T0+KTnG3SIlxgxTOjXNIiQ9IyM90yor2wyb7pxcl7x8l4LCImy6jWQTHZ2MjJycLAqwGx7iUBwSUuyAy/DQktKk5Kgyd6xOM8oyiS6vcC6vDMVmN9DfYbFVmoZV1RquGP62dzAJicqqqa2srI3Orcs0tqpHkm4QaUwvNG5yqnAGgorkJncT72aRFqi0eGubSHuHt5UVOC6BsWll5d3RKdLFBo1wJsVukZ7meg8PIAIR1vXNnSK9fbDUwtg/YaIIGuidNFkcltimTJ02fYYnEmjp6kPIAvWLT7NFAWyMSLIg97GgACaq5C0AtfWHKjU4unIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDUtMTJUMDI6MTc6NTQrMDA6MDDj4ZdtAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA1LTEyVDAyOjE3OjU0KzAwOjAwkrwv0QAAAABJRU5ErkJggg==
[type-url]: https://www.typescriptlang.org
[node-url]: https://nodejs.org/
[github-url]: https://github.com/celsodevelop
[grx-url]: http://www.grtsolucoes.com.br/
