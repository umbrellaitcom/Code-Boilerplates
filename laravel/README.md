## Requirements

You will require:

- Docker engine for your platfom ([Windows](https://docs.docker.com/docker-for-windows/) [Linux](https://docs.docker.com/engine/installation/#/on-linux) [Mac](https://docs.docker.com/docker-for-mac/install/))
- [Docker-compose](https://docs.docker.com/compose/install/)
- Git client
- [Make](https://en.wikipedia.org/wiki/Make_(software))

## Short description

A full-featured boilerplate of a Laravel REST API application with entities management, lists with pagination, validation, simple authorization, Swagger.

## Description

A Laravel application that includes:
 * API Doc
 * Eloquent ORM
 * Migrations
 * Builder pattern
 * Serializer
 * Validation
 * JWT Authorization

#### **Routes**
 * `/api/auth/register` POST - registers a new user
 * `/api/auth/login` POST - Get a JWT token via given credentials
 * `/api/auth/me` POST - Get the authenticated User
 * `/api/auth/logout` POST - Log the user out (Invalidate the token)
 * `/api/auth/refresh` POST - Refresh a token
 * `/api/menu` GET - get daily menu
 * `/api/menu` POST - create menu
 * `/api/menu` PUT - update menu
 * `/api/menu/item/list` GET - get the list of all available menu items
 * `/api/menu/item/{id}` GET - get current menu item by id
 * `/api/menu/item/{id}` PUT - update menu item
 * `/api/menu/item/{id}` DELETE - delete existing menu item
 * `/api/menu/item` POST - create new menu item

```
The API Doc is available here:
- /api/documentation
```


## Deployment

Set up database and migrations first using

 * create .env file from dist: `cp .env.example .env`
 * run `docker-compose up -d`
 * run `docker-compose exec app composer update`
 * run `docker-compose exec app php artisan key:generate`
 * run `docker-compose exec app php artisan jwt:secret`
 * run `docker-compose exec app php artisan l5-swagger:generate`
 * run `docker-compose exec app php artisan db:create`
 * run `docker-compose exec app php artisan migrate`

Build and run the application

* run `docker-compose up -d`

