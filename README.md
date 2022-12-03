# Backend - Sistema de Vendas
Projeto de estudo para aperfeiçoamento de skills de desenvolvimento backend.

Aplicação para gestão de vendas com funcionalidades para criação de cadastro de produtos, cadastro de clientes, pedidos de compras e gestão de usuários, com autenticação via Token JWT, recuperação de senha por email, etc.

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
* Testes unitários
* TDD
* DDD
* CORS
* Classe de tratamento de erros 
* Service, Controller e Repository
* Middlewares
* Bloqueio de múltiplas requisições por segundo
* Autenticação com token de acesso (JWT)
* Orquestração de container com docker-compose

## Como rodar a aplicação em desenvolvimento:
* Clone o repositório e abra a pasta com o projeto
```
$ git clone https://github.com/arthurisvi/backend-sistema-vendas.git
$ cd backend-sistemas-vendas
```
* Renomeie o arquivo "ormconfig.example.json" para "ormconfig.json"
* Altere o nome do arquivo ".env.example" para ".env"

## Caso utilize Docker
* No arquivo ormconfig.json, utilize as seguintes configurações:
```json
{
    "type": "postgres",
    "host": "db",
    "port": 5432,
    "username": "postgres",
    "password": "docker",
    "database": "apivendas",
    "entities": [
        "./src/modules/**/infra/typeorm/entities/*.ts"
    ],
    "migrations": ["./src/shared/infra/typeorm/database/migrations/*.ts"],
    "cli": {
        "migrationsDir": "./src/shared/infra/typeorm/database/migrations"
    }
}

```
* No arquivo .env, altere a váriavel REDIS_HOST como no exemplo a seguir:
```
REDIS_HOST=redis
```
* Execute o seguinte comando docker
```
$ docker-compose up
``` 

## Sem Docker
* Primeiro, instale as dependências do projeto
```
$ yarn
ou
$ npm install
```

OBS: Lembre-se, por não estar utilizando o Docker, é necessário possuir uma instância de banco de dados Postgres e do Redis em sua máquina.

* Agora, no arquivo ormconfig.json, adicione as suas credenciais locais de banco de dados de "username" e "password"
* Verifique as variáveis no arquivo .env e adeque a suas configurações local do Redis

Por último, execute o seguinte comando para rodar a aplicação em ambiente dev:
```
$ yarn dev
ou
$ npm run dev
```
O servidor estará em execução no endereço http://localhost:3333.

