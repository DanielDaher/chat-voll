# chat-voll
Boas vindas ao Chat Voll, o site onde pode se registrar e conversar com outras pessoas em tempo real!

## Objetivos:

O objetivo do projeto é facilitar a comunicação através de um sistema de chat para conversas em grupo.

## Para acessar o link da aplicação e ver seu funcionamento, clique no link abaixo:
[CHAT-VOLL](https://chat-voll-danieldaher.vercel.app/)

Observação: o backend da aplicação está hospedado na heroku, então pode ser que o primeiro login/cadastro de usuário demore alguns instantes. Basta aguardar.

Se preferir, pode instalar o projeto em sua máquina e rodá-lo localmente seguindo os passos abaixo:

## Como rodar a aplicação no computador:

#### Seu computador precisa de Git (para versionamento do código), Node.js & npm (para executar a aplicação) e MongoDB (que será nosso banco de dados). Clique nos links, caso ainda não tenha instalado algum desses:

 - [ ] [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
 - [ ] [Node.js e npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
 - [ ] [MongoDB](https://docs.mongodb.com/manual/installation/)

- O **MongoDB** precisa estar ativo para que a aplicação funcione. Digite o seguinte comando no terminal, para verificar isso:
`sudo service mongod status`.

  Caso a propriedade **Active** não esteja como *Active(running)* digite no terminal `sudo service mongod start`. Talvez o sistema te peça sua senha de usuário. Basta digitar, sabendo que os caracteres de senha não aparecem no terminal.

Agora sim estamos prontos para instalar o projeto.

## Instalando a aplicação:

1. Primeiro, abra um novo terminal e clone o repositório utilizando o comando 
`git clone git@github.com:DanielDaher/chat-voll.git`

2. Em seguida, digite `cd chat-voll` para entrar no diretório (pasta) do projeto, que acabou de ser criada.

3. Vá para a pasta do Backend, rodando `cd backend` no terminal, e execute `npm install` para instalar as dependências necessárias.

4. Com o comando `npm run dev`, o backend da aplicação já estará funcionando. Aguarde alguns segundos, que o terminal mostrará a mensagem "Ouvindo a porta 3001", o que significa que está tudo certo. Lembrando que, para executar este passo é necessário que seu **MongoDB** esteja ativo.

5. Abra outro terminal (para não interromper o backend, que deve continuar rodando) e acesse a pasta do projeto novamente.

6. Agora, ao invés de entrar na pasta do backend, vamos para o frontend com o comando `cd frontend` no terminal.

7. Instale mais dependências com `npm install`

8. Ao término da etapa anterior, rode no terminal `npm run dev`. Isto pode demorar alguns segundos, aguarde até que o terminal te informe `event: compiled client and server successfully`. Então você pode abrir seu navegador e digitar a url http://localhost:3000. Ou então, basta clicar na url que o terminal apresenta na opção `ready`.

9. E agora é só desfrutar do site!
