# Requirements

- Node.js 12
- NPM 6

# Short description

A full-featured boilerplate of a NodeJS REST API application with 2 entities: user and post, that includes: lists with pagination, validation, simple authorization, Swagger.

# Description

A NodeJS boilerplate application that includes:

- Code style tools (eslint)
- Express framework
- Sequelize ORM
- Authorization
- JWT token validation
- Fixtures (sequelize seeders)
- Migrations
- Error handling
- CORS providing
- Validation
- Pagination list API endpoint
- POST/PUT/PATCH methods API endpoints
- Serialize/Deserialize data
- Logger
- Swagger

### Routes:

- POST `/auth` - Authentication by username and password
- GET `/posts` - Get a list of posts
- POST `/posts` - Create post
- GET `/posts/{postId}` - Get a post by id.
- PUT `/posts/{postId}` - Put update the post
- PATCH `/posts/{postId}` - Patch update the post
- DELETE `/posts/{postId}` - Delete the post
- `/api-docs` - UI Swagger
- `/api-docs.json` - Swagger specs

**All routes, except for the login and swagger route require user's authorization.**

# Deployment

## Locally

1. Create .env file from dist:
    ```bash
    cp .env.dist .env
    ```

2. Install dependencies
    ```bash
    npm install
    ```
   
3. Serve with hot reload
    ```bash
    npm run dev
    ```
   
Your app available at localhost:3000
   
*  Run migrate:
    ```bash
    npm run migrate
    ```

*  Run seed (fixtures):
    ```bash
    npm run seed
    ```

   
## Docker

1. Create .env file from dist:
    ```bash
    cp .env.dist .env
    ```

2. Add record in to your local hosts file.
    ```bash
    make hosts
    ```

2. Start spinup scenario
    ```bash
    make docker-env
    ```

Your app available by the specified HOST_BACKEND in .env file (e.g. code-sample-nodejs.local)

*  For additional commands
    ```bash
    make help
    ```
   
*  Run migrate:
    ```bash
    make backend-migrate
    ```

*  Run seed (fixtures):
    ```bash
    make backend-seed
    ```
