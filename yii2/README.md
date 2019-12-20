## Requirements

- Docker engine for your platform ([Windows](https://docs.docker.com/docker-for-windows/) [Linux](https://docs.docker.com/engine/installation/#/on-linux) [Mac](https://docs.docker.com/docker-for-mac/install/))
- [Docker-compose](https://docs.docker.com/compose/install/)
    - Make sure you have at least in your Docker resources preferences:
        - 5 GB RAM
        - 4 CPU
        - 1 GB swap
- Git client
- [Make](https://en.wikipedia.org/wiki/Make_(software))

## Short Description

An MVC pattern boilerplate application that has two pages: login page (you can use admin/admin) combination, posts page. Every post has its own CRUD page.

## Description

An Yii2 application that includes:

- Bootstrap theme style
- Authorization
- Table with pagination
- Forms with validation
- Error handling
- Seeding DB from a remote source


**Routes:**

- `/` - index page
- `/posts` - list of existed posts (with searching, filtering and pagination features)
- `/login` - login page
- `/posts/create` - form page for creating a new post
- `/posts/update` - form page for updating existed post
- `NOTE: all of this pages, except for the login page require user's authorization`

## Deploy :

- Clone the project
- Move to the project directory
- Create .env file - <code>touch docker/.env</code>
- Run the following command - <code>make docker-env</code>
- Run your app - <code>http://yii2.boilerplate.local:YOUR_PORT/</code>

