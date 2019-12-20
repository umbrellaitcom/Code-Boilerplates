#!make
include .env

export $(shell sed 's/=.*//' .env)
.PHONY: nginx-config rebuild install-vendors up stop restart status console-php console-nginx clean help

WARNING_COLOR = \033[01;33m
CLEAR_COLOR = \033[0m

DOCKER = docker-compose -f docker/docker-compose.yml -p ${APP_NAME}

docker-env: nginx-config up

nginx-config:
	@echo "\n\033[0;33m Generating nginx config... \033[0m"
	@bash ./sh-config-nginx.sh

rebuild: stop
	@echo "\n\033[1;m Rebuilding containers... \033[0m"
	@${DOCKER} build --no-cache

up:
	@echo "\n\033[1;m Spinning up containers... \033[0m"
	@${DOCKER} up -d
	@$(MAKE) --no-print-directory status

stop:
	@echo "\n\033[0;33m Halting containers... \033[0m"
	@${DOCKER} stop
	@$(MAKE) --no-print-directory status

restart:
	@echo "\n\033[0;33m Restarting containers... \033[0m"
	@${DOCKER} stop
	@${DOCKER} up -d
	@$(MAKE) --no-print-directory status

status:
	@echo "\n\033[1;m Containers statuses \033[0m"
	@${DOCKER} ps

backend-migrate:
	@${DOCKER} exec backend sh -c "npm run migrate"

backend-migrate-undo:
	@${DOCKER} exec backend sh -c "npm run migrate-undo"

backend-seed:
	@${DOCKER} exec backend sh -c "npm run seed"

backend-seed-undo:
	@$(DOCKER) exec backend sh -c "npm run seed-undo"

clean:
	@echo "\033[1;31m\033[5m *** Removing containers and Application (./src)! ***\033[0m"
	@echo "\033[1;31m\033[5m *** Ensure that you commited changes!*** \033[0m"
	@${DOCKER} down --rmi all 2> /dev/null
	@sudo rm -rf docker/nginx/configs/conf.d/backend.conf
	@sudo rm -rf docker/mysql/data
	@$(MAKE) --no-print-directory status

console-web-srv:
console-backend:
console-db:
console-%:
	@$(DOCKER) exec $* sh

logs-web-srv:
logs-backend:
logs-db:
logs-%:
	@$(DOCKER) logs --tail=100 -f $*

hosts:
	@echo "\n\033[1;m Adding record in to your local hosts file.\033[0m"
	@echo "\n\033[1;m Please use your local sudo password.\033[0m"
	@echo "127.0.0.1 localhost ${HOST_BACKEND}" | sudo tee -a /etc/hosts

help:
	@echo "\033[1;32mdocker-env\t\t- Main scenario, used by default\033[0m"

	@echo "\n\033[1mMain section\033[0m"
	@echo "nginx-config\t\t- generates nginx config file based on .env parameters"
	@echo "rebuild\t\t\t- build containers w/o cache"
	@echo "up\t\t\t- start project"
	@echo "stop\t\t\t- stop project"
	@echo "restart\t\t\t- restart containers"
	@echo "status\t\t\t- show status of containers"

	@echo "\n\033[1;31m\033[5mclean\t\t\t- Reset project. All Local application data will be lost!\033[0m"

	@echo "\n\033[1mConsole section\033[0m"
	@echo "console-db\t\t- run bash console for database container"
	@echo "console-backend\t\t- run bash console for backend application container"
	@echo "console-web-srv\t\t- run bash console for web server container"

	@echo "\n\033[1mLogs section\033[0m"
	@echo "logs-db\t\t\t- show database logs"
	@echo "logs-backend\t\t- show backend application logs"
	@echo "logs-web-serv\t\t- show web server logs"
