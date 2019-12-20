# Requirements

- Node.JS 12

# Short description

A full-featured boilerplate of a Angular 8 application with 3 pages that includes: list of posts, post details and simple authorization.

# Description

A Angular boilerplate application that includes:

- Code style tools
- Utilising `@angular/material`
- Authorization
- Virtual scrolling
- JWT token
- List of posts
- Popup
- Form with validation
- Error handling
- Mocking up layer of backend's responses

### Routes:

- /login
- /posts - list of posts
- /settings/:id - post details

**All routes, except for the login route require user's authorization.**

# Deployment
    
- Clone the project
- Move to the project directory
- Create `.env` file `cp .env.dist .env` and fill it in by your needs
- Run the command `ng serve --open`
