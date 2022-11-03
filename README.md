## Application Overview

It's an API built using [NodeJS](https://nodejs.org/en/about/) and [Express](https://expressjs.com/) to search over a list of users with pagination and filters over Postgres database with caching for a higher performance through Redis.

## Contents

- [Getting started](#getting-started)
  - [Running seeds](#running-seeds)
- [Accessing the database](#accessing-the-database)
- [Available APIs](#available-apis)
- [Examples](#examples)

## 

### Getting started

Open a terminal on the root folder of the project and:

1. run `nvm use` or `n auto` according to your environment setup (to use compatible node version)
2. run `yarn install` [make sure to have yarn installed](https://classic.yarnpkg.com/lang/en/docs/install/)
3. rename `.env-sample` to `.env` so you have all necessary env vars setup. [Please check Running Seeds](#running-seeds)
4. docker-compose up local ([now more about docker-compose here](https://docs.docker.com/compose/gettingstarted/))
5. after running migrations, you should be able to check server running at `http://localhost:3000/status`

#### Running seeds

There are a few ways of running seeds:

##### #1 Option: 

Install [Knex](https://knexjs.org/) to your machine and run: `knex seed:run`

##### #2 Option:

Before running step 4 from [Getting started](#getting-started), update the variable `SEED_ON_DEPLOY=true`. 

Be aware that in case of code changes (due to the live load behavior) or restarting docker it will run the seeds again. So as soon as the application is up running, update your .env to the previous state to avoid undisired behaviours.

##### #3 Option:

Just run the script located at `/src/scripts` from the application's root folder:

```bash 
npx ts-node src/scripts/runSeed.ts
```

### Accessing the database

Using your database IDE of preference, use the database url located at `.env` the database should be exposed and accessible.

### Available APIs

#### #1 Get user by id

It should return only one user based on its ID.
If not found throws `User not found` 404 error

```bash
Method: GET
API: `/api/users/:id`
URL Parameters: id as int
```

#### #1 Get users paginated 

It should return all users paginated (based no page parameter)
If empty return an empty array

```bash
Method: GET
API: `/api/users/`
Query Parameters (optional):
  - page as 0 <= page <= ...
  - size as 0 <= size <= 100
  - search as string
  - type as userType(normal or artist)
```
### Examples

#### #1 - load 100 artist users per page with gmail accounts

```bash
/api/users/?search=@gmail&page=0&size=100&type=artist
```

#### #2 - load  100 common users per page whose last names are Tesla

```bash
/api/users/?search=Tesla&page=0&size=100&type=normal
```

#### #3 - load first 10 users

```bash
/api/users/?size=10
```

#### #4 - Load user whose id is 200

```bash
/api/users/200
```
