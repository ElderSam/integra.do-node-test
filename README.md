# integra.do-node-test

## Start
### With Docker
Run commands;

        "$ cd config/production" // enter in production folder
        "$ docker-compose up" // build and and start containers (node + mongoDB)

----------------
### Without Docker
#### 1. Run commands;

        install dependencies
        "$ yarn install"

        run
        "$ yarn start:prod"

#### 2. set mongoDB database

#### 3. change .env files;
```
MONGO_URI='mongodb://localhost:27017/[YOUR_DB_NAME]'
```
--------------------------------

## PARTE 1
- [x] varrer uma API que retorna todas as universidades contidas em cada país da lista fornecida
        API: http://universities.hipolabs.com/search?country=[COUNTRY]

- [x] salvar estas informações no banco de dados.
        * Criar uma collection no MongoDB para armazenar as universidades separadamente.

## PARTE 2
- [x] criar uma API que viabilize um CRUD (create, retrieve, update, delete) das universidades anteriormente cadastradas no MongoDB.