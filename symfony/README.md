## Requirements

You will require:

- Docker engine for your platfom ([Windows](https://docs.docker.com/docker-for-windows/) [Linux](https://docs.docker.com/engine/installation/#/on-linux) [Mac](https://docs.docker.com/docker-for-mac/install/))
- [Docker-compose](https://docs.docker.com/compose/install/)
- Git client
- [Make](https://en.wikipedia.org/wiki/Make_(software))

## Short description

Backend API to order food by Umbrella IT employees from internal food suppliers. Work is in progress.

## Description

A Symfony application that includes:
 * API Doc
 * Doctrine ORM
 * Migrations
 * Data fixtures
 * Builder pattern
 * Serializer
 * Validation

#### **Routes**
 * `/menu` GET - get daily menu
 * `/menu` POST - create menu
 * `/menu` PUT - update menu
 * `/menu/item/list` GET - get the list of all available menu items
 * `/menu/item/{id}` GET - get current menu item by id
 * `/menu/item/{id}` PATCH - update menu item
 * `/menu/item/{id}` DELETE - delete existing menu item
 * `/menu/item` POST - create new menu item

```
The API Doc is available here:
- /doc
```


## Deployment

 * create .env file from dist: `cp .env.dist .env`
 * run `make docker-env`

 * For additional commands

```
make help
```

 * The app is available here [http://api.uit-food-order.local/doc](http://api.uit-food-order.local/doc)
