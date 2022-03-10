# integra.do-node-test

## Start
### install dependencies
``$ yarn install``

### run
``$ yarn start``

--------------------------------

## PARTE 1
- [x] varrer uma API que retorna todas as universidades contidas em cada país da lista fornecida
        API: http://universities.hipolabs.com/search?country=[COUNTRY]

- [ ] salvar estas informações no banco de dados.
        * Criar uma collection no MongoDB para armazenar as universidades separadamente.

-------------------------------
## Dockerizing
1. create [Dockerfile](./Dockerfile) & .dockerignore

2. [Build image](./Makefile)
  run "$ docker build -t [YOUR_IMAGE] ."
        eg: "$ docker build -t YOUR_DOCKER_USER/server-api ."

3. start your server (container)
run "$ docker run -p [PORT]:[PORT] -d [YOUR_API_DOCKER_IMAGE]"
        eg: docker run -p 5000:5000 -d api-server