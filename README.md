# integra.do-node-test

## Start
### With Docker
Run commands;

        "$ cd config/production" // enter in production folder
        "$ docker-compose up" // build and and start containers

### Without Docker
Run commands;

        install dependencies
        "$ yarn install"

        run
        "$ yarn start:prod"

--------------------------------

## PARTE 1
- [x] varrer uma API que retorna todas as universidades contidas em cada país da lista fornecida
        API: http://universities.hipolabs.com/search?country=[COUNTRY]

- [x] salvar estas informações no banco de dados.
        * Criar uma collection no MongoDB para armazenar as universidades separadamente.

-------------------------------
## Tutorials & tips;

### Dockerizing
[Ambiente de desenvolvimento NodeJS com Docker e Docker Compose](https://www.youtube.com/watch?v=AVNADGzXrrQ&list=PLmX5_ydv5jg-WRtaCb72IbYiuYvIacooR&index=5)
[Docker Compose in 6 minutes! Mongo, Express, React, Node (MERN) Application Tutorial](https://www.youtube.com/watch?v=0B2raYYH2fE)

1. create [Dockerfile](./Dockerfile) & .dockerignore

2. [Build image](./Makefile)
run;
```
$ docker build -t [YOUR_IMAGE] .

example: "$ docker build -t YOUR_DOCKER_USER/server-api ."
```

3. start your server (container)

```
run "$ docker run -p [PORT]:[PORT] -d [YOUR_API_DOCKER_IMAGE]"

example: docker run -p 5000:5000 -d api-server
```

---------

### [How to create your first MERN (MongoDB, Express JS, React JS and Node JS) Stack](https://medium.com/swlh/how-to-create-your-first-mern-mongodb-express-js-react-js-and-node-js-stack-7e8b20463e66)