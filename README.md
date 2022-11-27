# Api de Vendas
Projeto de estudo para aperfeiçoamento de skills de desenvolvimento backend.

Aplicação para gestão de vendas com funcionalidades para criação de cadastro de produtos, cadastro de clientes, pedidos de compras e gestão de usuários, com autenticação via Token JWT, recuperação de senha por email, atualização de perfil e atualização de avatar.

## Conhecimentos trabalhados:

* NodeJS
* Express
* TypeScript
* PostgreSQL
* Docker
* Celebrate
* Nodemailer
* API Restful
* CORS
* Classe de tratamento de erros 
* Service, Controller e Repository
* Middlewares
* Autenticação com token de acesso (JWT)
* TypeORM (migrations, relationships)


## Rodar a aplicação em desenvolvimento:

Após clonar o repositório e abrir a pasta do projeto, execute os seguintes comandos:

```
$ yarn 
ou
$ npm install
```
* Agora, modifique as credenciais do seu banco de dados no arquivo ormconfig.example.json
* Altere o nome do arquivo 'ormconfig.example.json' para 'ormconfig.json

Por último, execute o seguinte comando para rodar a aplicação em ambiente dev:
```
$ yarn dev
ou
$ npm run dev
```
O servidor estará em execução no endereço http://localhost:3333.

