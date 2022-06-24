#!make
include .env
export $(shell sed 's/=.*//' .env)
RED='\033[0;31m'        #  ${RED}
GREEN='\033[0;32m'      #  ${GREEN}
BOLD='\033[1;m'			#  ${BOLD}
WARNING=\033[37;1;41m	#  ${WARNING}
END_COLOR='\033[0m'		#  ${END_COLOR}

DOCKER = docker-compose -f docker/docker-compose.yml -p ${COMPOSE_PROJECT_NAME}

.PHONY: nginx-config generate-jwt-keys rebuild install-vendors up schema-update  stop restart status console-php console-nginx clean help

docker-env: nginx-config generate-jwt-keys install-vendors up schema-update

nginx-config:
	@. ./docker/sh-config-nginx.sh

generate-jwt-keys:
	bash -c "mkdir -p config/jwt"
	bash -c "openssl genpkey -pass pass:'${JWT_PASSPHRASE}' -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096"
	bash -c "openssl pkey -passin pass:'${JWT_PASSPHRASE}' -in config/jwt/private.pem -out config/jwt/public.pem -pubout"

rebuild: stop
	@echo "\n\033[1;m Rebuilding containers... \033[0m"
	@${DOCKER} build --no-cache

install-vendors:
	${DOCKER} run --rm --no-deps php composer install

schema-update:
	${DOCKER} run --rm --no-deps php bash -c 'php bin/console doctrine:cache:clear-metadata --env=${ENV} && php bin/console doctrine:schema:update --env=${ENV} --force --complete --dump-sql'

up:
	@echo "\n\033[1;m Spinning up containers for ${ENVIRONMENT} environment... \033[0m"
	@${DOCKER} up -d
	@$(MAKE) --no-print-directory status

hosts:
	@echo "\n\033[1;m Adding record in to your local hosts file.\033[0m"
	@echo "\n\033[1;m Please use your local sudo password.\033[0m"
	@echo "127.0.0.1 localhost api.${APP_NAME}.${ENVIRONMENT}" | sudo tee -a /etc/hosts

stop:
	@echo "\n\033[1;m Halting containers... \033[0m"
	@${DOCKER} stop
	@echo "\n\033[1;m Removing networks... \033[0m"
	@if docker network rm ${COMPOSE_PROJECT_NAME}_network &>/dev/null; then echo "Removing ${COMPOSE_PROJECT_NAME}_network ... \033[0;32mdone\033[0m"; fi
	@$(MAKE) --no-print-directory status

restart:
	@echo "\n\033[1;m Restarting containers... \033[0m"
	@${DOCKER} stop
	@${DOCKER} up -d
	@$(MAKE) --no-print-directory status

status:
	@echo "\n\033[1;m Containers statuses \033[0m"
	@${DOCKER} ps
	@echo "\n\033[1;m Network status \033[0m"
	@. ./docker/sh-network-status.sh

console-php:
	@${DOCKER} exec php bash
console-nginx:
	@${DOCKER} exec nginx bash
console-db:
	@${DOCKER} exec db bash
logs:
	@${DOCKER} logs --tail=100 -f
logs-nginx:
	@${DOCKER} logs --tail=100 -f nginx
logs-php:
	@${DOCKER} logs --tail=100 -f php
logs-db:
	@${DOCKER} logs --tail=100 -f db

help:
	@echo "\033[1;32mdocker-env\t\t- Main scenario, used by default\033[0m"

	@echo "\n\033[1mMain section\033[0m"
	@echo "clone\t\t\t- clone Application repo"
	@echo "rebuild\t\t\t- build containers w/o cache"
	@echo "up\t\t\t- start project"
	@echo "stop\t\t\t- stop project"
	@echo "restart\t\t\t- restart containers"
	@echo "status\t\t\t- show status of containers"
	@echo "nginx-config\t\t- generates nginx config file based on .env parameters"

	@echo "\n\033[1;31m\033[5mclean\t\t\t- Reset project. All Local application data will be lost!\033[0m"

	@echo "\n\033[1mConsole section\033[0m"
	@echo "console-php\t\t- run bash console for PHP application container"
	@echo "console-nginx\t\t- run bash console for web server container"

	@echo "\n\033[1mLogs section\033[0m"
	@echo "logs-php\t\t- show PHP logs"
	@echo "logs-nginx\t\t- show web server logs"
