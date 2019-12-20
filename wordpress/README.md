Requirements
---
Node.JS 12.4.0

Short description
---
A form that allows posting a review. This review will be displayed on the site.

Description
---
Includes:

- Code styles tools:
  - PHPCS with WordPressVIPMinimum and WordPress standards (use `make test` in root directory)
  - ESLint
  - Stylelint
- React
- Gutenberg component Reviews Slider for showing the latest reviews on the front page.
- Gutenberg component Reviews Form for adding new reviews from the front part.
- Widget which displays list of the latest reviews.
- Custom post type for managing and adding new reviews from admin part.

Deployment
---
- Clone repo and go to folder with project.
- Run command `make docker-env`
- Open [http://0.0.0.0:8000/wp-admin](http://0.0.0.0:8000/wp-admin)
  - Login: `wp`
  - Password: `wp`
- That's it. You are awesome!
