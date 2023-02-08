# Mini Rede Social

Desafio pessoal para o segundo projeto da **Mentoria Conquiste Sua Vaga - Time 23B.**

## Objetivo
- Continuar a metodologia **CTD (Código Todo Dia)**.
- Iniciar a metodologia **COD (Crescimento Orientado por Desafios)**.
- Praticar modelagem orientada a documentos.
- Aplicar a biblioteca bcryptjs para hash das senhas.
- Aplicar a biblioteca passport para autenticação de usuários.

## Funcionalidades
- **USUÁRIO SEM PERFIL**<br>
  1. Visualizará as postagens marcadas como públicas.<br>
  2. Poderá criar um perfil a partir de um e-mail válido (único na rede).<br>
     O perfil estará disponível para uso após ativação via link enviado para o e-mail informado.<br>
     O e-mail também será utilizado para recuperação de senha.

- **USUÁRIO COM PERFIL**<br>
  1. Poderá enviar solicitação de vínculo para outros perfis.
  2. Poderá aceitar ou recusar solicitações de vínculo.
  3. Poderá cadastrar postagem e indicar seu nível de privacidade (pública, permitida para meus vínculos e pessoal).
  4. Visualizará, além das postagens públicas, aquelas permitidas pelos seus perfis vinculados.
  5. Poderá marcar uma reação de aprovação nas postagens.
  6. Poderá visualizar os perfis que marcaram reação de aprovação em uma postagem.
    
## Tecnologias que serão utilizadas
- HTML5 + CSS3 + JAVASCRIPT
- NODE.JS + MONGODB
- BIBLIOTECAS<br>
  express, express-handlebars, express-session, mongoose, connect-mongo, dotenv, connect-flash, nodemailer, bcryptjs e passport
- Observações:
  - Será utilizado o padrão de projeto MVC (Model - View - Controller)
  - O Handlebars será o template engine para a camada View.<br>
    As telas serão as mais simples possíveis, uma vez que o foco do projeto será nas camadas Model e Controller.
  
## Como acessar
- **Deploy** <br>
  O link será disponibilizado aqui!
- **Para instalar e executar o projeto** <br>
  1. Fazer clone deste repositório. <br>
     `https://github.com/simeaomessias/miniredesocial.git`
  2. Certificar que o npm está instalado. <br>
     O npm pode ser obtido instalando o [Node](https://nodejs.org/en/).
  3. Configurar os valores da seguintes variaveis de ambiente:<br>
     - A lista de variáveis será disponibilizada aqui. <br>
  4. Executar o comando *npm start*. <br>
     Acesse http://localhost:8081 para visualizar no navegador.

## Cronologia
- **Dia 1 (06/02/23):** Criação e configuração do projeto. <br>

## Autor
https://github.com/simeaomessias


