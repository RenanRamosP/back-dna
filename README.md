# DNA Analyze Backend Built with TypeORM

Steps to run this project:

1. create a `.env` file based on `.env.example` file and the docker-compose.yml file on the root folder
2. Run `yarn` command to install dependencies
3. Run `docker-compose up -d` on the root directory to start the database
4. Run `yarn dev` command to start the server
5. \*\*if necessary run the migrations with `yarn typeorm:migrate`
6. then run `yarn dev` again
