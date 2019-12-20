#!make
include docker/.env
export $(shell sed 's/=.*//' docker/.env)

docker-env: copy-env up php-build db-migrate hosts

copy-env:
	@yes | cp -rf docker/.env.dist docker/.env
	@mkdir log

console-php: ## Connect php
	@docker-compose -f docker/docker-compose.yml exec php bash

console-db: ## Connect db
	@docker-compose -f docker/docker-compose.yml exec db bash

console-nginx: ## Connect to server
	@docker-compose -f docker/docker-compose.yml exec nginx bash

php-build: ## Connect php
	@echo "\n\033[1;m Installing dependencies for the app.\033[0m"
	@docker-compose -f docker/docker-compose.yml exec php bash -c "composer install"

db-migrate: ## Migrate DB
	@docker-compose -f docker/docker-compose.yml exec php bash -c "php yii migrate && php yii seed"

up:
	@echo "\n\033[1;m Spinning up containers for Local dev environment... \033[0m"
	@docker-compose -f docker/docker-compose.yml up -d
	@$(MAKE) --no-print-directory status

restart:
	@echo "\n\033[1;m Spinning restart containers for Local dev environment... \033[0m"
	@docker-compose -f docker/docker-compose.yml restart
	@$(MAKE) --no-print-directory status

hosts:
	@echo "\n\033[1;m Adding record in to your local /etc/hosts file.\033[0m"
	@echo "\n\033[1;m Please use your local sudo password.\033[0m"
	@echo '127.0.0.1 localhost '${SERVER_NAME}' www.'${SERVER_NAME}''| sudo tee -a /etc/hosts
	@echo "\n\033[1;m Add next to your bookmarks:\033[0m"
	@echo 'http://${SERVER_NAME}:${WEBSERVER_PORT}'
	@echo 'http://${SERVER_NAME}:${PHPMYADMIN_PORT} - PhpMyAdmin'

status:
	@echo "\n\033[1;m Containers statuses \033[0m"
	@docker-compose -f docker/docker-compose.yml ps

logs-nginx:
	@docker-compose -f docker/docker-compose.yml logs --tail=100 -f nginx
logs-php:
	@docker-compose -f docker/docker-compose.yml logs --tail=100 -f php
logs-db:
	@docker-compose -f docker/docker-compose.yml logs --tail=100 -f db
