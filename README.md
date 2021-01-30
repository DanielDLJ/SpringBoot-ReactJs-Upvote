# Segware - DEV FullStack Code Challenge

This project is a SpringBoot REST API and Web developed to the Segware.

## About the test
The application must allow:

- List the current posts and their “upvotes”;
- Add a new post;
- Add an “upvote” to a post.

## Getting Startted
Follow this instructions to get a copy of this project in your local env to develop and test.

###  Tools
To run the project you will need:
- [NodeJS](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/products/docker-desktop)
- [IntelliJ IDEA](https://www.docker.com/products/docker-desktop)

### Installing Dependencies
Clone this repo:
```sh
git clone https://github.com/DanielDLJ/SpringBoot-ReactJs-Upvote.git
cd SpringBoot-ReactJs-Upvote
cd reactjs-upvote
```

You can use npm to this task, but it is recommended to use [Yarn](https://yarnpkg.com/). To install it:
```sh
npm install -g yarn
```

Then, install projects dependencies:
```
yarn
```

### Database
To install Neo4j image in docker:
```sh
docker pull neo4j
```


To create the two databases (production and test):
```sh
docker run --name ProductionBD -p7474:7474 -p7687:7687 -e NEO4J_AUTH=neo4j/1234 neo4j 
docker run --name TestBD -p=7475:7474 -p=7688:7687 -e NEO4J_dbms_connector_bolt_advertised__address=:7688 -e NEO4J_AUTH=neo4j/1234 neo4j
```

### Test
You can test within the IntelliJ IDEA software

## Running Web

```sh
cd SpringBoot-ReactJs-Upvote
cd reactjs-upvote
yarn start
```

## Running API
You can run inside the IntelliJ IDEA software

