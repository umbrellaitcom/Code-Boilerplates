# Requirements

- Node.JS 12
- Yarn 1.17

# Short description

A full-featured boilerplate of a React SPA application with 2 pages that includes: lists, pagination, simple authorization, advanced access token refreshing mechanism.

# Description

A React boilerplate application that includes:

- Code style tools
- Theming utilising `@material-ui/core` (React Material UI)
- Data management level - Redux, Saga utilising `redux-saga-requests`
- Authorization
- JWT token validation/refreshing mechanisms
- Table with pagination
- Popup
- Form with validation utilising `yup`
- Error handling
- Request layer utilising `axios`
- Verification of backend's responses
- Mocking up layer of backend's responses

### Routes:

- `/login`
- `/settings/users` - list of users with pagination
- `/settings/categories` - an additional tab

**All routes, except for the login route require user's authorization.**

# Deployment

- `NPM_AUTH_TOKEN=YOUR_UMBRELLA_IT_NPM_AUTH_TOKEN yarn install`
- `NPM_AUTH_TOKEN=YOUR_UMBRELLA_IT_NPM_AUTH_TOKEN yarn start`
