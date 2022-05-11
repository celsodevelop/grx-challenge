

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

  O projeto a seguir, apresenta um sistema para coletar perguntas no cliente web, analisar o score e escrever a resposta em um arquivo .txt no servidor.

  Como diferencial, não há conteúdo estático no projeto fora dos `JSON`s de cliente e servidor. Logo, a edição dos arquivos JSON nas pastas `/constants` de cliente e servidor é o suficiente para cadastrar novas questões ou alterar/remover as existentes, assim como, criar ou alterar novas pontuações baseadas nas respostas.

  Lembre-se: O projeto utilizou-se de uma estrutura monorepo para facilitar o desenvolvimento. O deploy deverá ser feito em ambientes separados para segurança (Dica: O `docker` já está configurado para rodar o ambiente de desenvolvimento, poucas alterações serão necessárias para o deploy da imagem em algum registry para posteriormente colocar em produção.)

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

   ### Cliente: `react_client/src/constants/survey.json`

      - Nesse arquivo devemos configurar o sistema da seguinte forma:

     ```
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
  Dessa forma, é possível acrescentar ou alterar questões. Lembre-se de alterar também o arquivo `react_client/src/types/types.ts` que conterá guardiões de tipo para o sistema.

  Temos disponível as questões do tipo: `"select", "textarea" e "radio"`

 ### Servidor: `src/constants/pointsByAnswer.json`

      - Nesse arquivo devemos configurar o sistema da seguinte forma:

     ```
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

<br/>

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

[axios-shield]: https://img.shields.io/badge/Axios-20232A?style=for-the-badge&logo=data:image/png;base64,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WxBLGGlOmPD1WjmlfecWt/leCSNOMOEJ8mexzJv2nF/0xB0gmPBYOaWf/eLGn//Nr+/8UiyBdYIJX9ZKVdp37rorWODLBBMeyfnDThrf6woWeBy/koV1+dSdew9n/Esu4EmcMBl5OaW5c4vbT5aeAxhsgskI69wYy9Wed5a2Xy49CQAA1IJvmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABAgmAAQIJgAECCYABDwvwEAAP//1BFJjTgch4IAAAAASUVORK5CYII=&logoColor=white

[react-hook-form-shield]: https://img.shields.io/badge/React_Hook_Forms-444245?style=for-the-badge&logo=data:image/png;base64,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
[type-url]: https://www.typescriptlang.org
[node-url]: https://nodejs.org/
[github-url]: https://github.com/celsodevelop
[grx-url]: http://www.grtsolucoes.com.br/
