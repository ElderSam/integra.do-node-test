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
## [Veja a Documentação completa do projeto](https://nickel-name-fe9.notion.site/Teste-Integra-do-backend-c453ec2b24434f39a1ff039ed2e57ab9)