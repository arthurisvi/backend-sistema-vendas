# Api de Vendas
Projeto de estudo para aperfeiçoamento de skills de desenvolvimento backend.

Aplicação para gestão de vendas com funcionalidades para criação de cadastro de produtos, cadastro de clientes, pedidos de compras e gestão de usuários, com autenticação via Token JWT, recuperação de senha por email, atualização de perfil e atualização de avatar.

## Conhecimentos trabalhados:

### Tecnologias
* NodeJS
* Express
* TypeScript
* TypeORM
* Redis
* PostgreSQL
* Docker
* Jest Framework

### Conceitos
* API Restful
* Design Patterns
* Princípios SOLID
* TDD
* DDD
* CORS
* Classe de tratamento de erros 
* Service, Controller e Repository
* Middlewares
* Bloqueio de múltiplas requisições por segundo
* Autenticação com token de acesso (JWT)

## Rodar a aplicação em desenvolvimento:

Após clonar o repositório e abrir a pasta do projeto, execute os seguintes comandos:

```
$ yarn 
ou
$ npm install
```
* Agora, modifique as credenciais do seu banco de dados no arquivo ormconfig.example.json
* Altere o nome do arquivo 'ormconfig.example.json' para 'ormconfig.json

* Configure as variáveis de ambiente no .env.example

OBS: APP_SECRET refere-se a uma secret criada por você para a criação do token JWT

REDIS refere-se as configurações do servidor Redis da sua máquina*
* Altere o nome do arquivo de '.env.example' para '.env'

Por último, execute o seguinte comando para rodar a aplicação em ambiente dev:
```
$ yarn dev
ou
$ npm run dev
```
O servidor estará em execução no endereço http://localhost:3333.

