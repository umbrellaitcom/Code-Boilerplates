include .env
export $(shell sed 's/=.*//' .env)

RUN = docker-compose run --rm
START = docker-compose up -d
STOP = docker-compose stop
LOGS = docker-compose logs
EXEC = docker-compose exec
STATUS = docker-compose ps
CLEAN = docker-compose down -v --rmi all 2> /dev/null

.PHONY: up restart status console-db clean

docker-env:
	@$(MAKE) init-wpvipgo-core
	@$(MAKE) up

up:
	@echo "\n\033[0;33m Spinning up docker environment... \033[0m"
	@$(START)
	@$(MAKE) --no-print-directory status

stop:
	@echo "\n\033[0;33m Spinning stop docker environment... \033[0m"
	@$(STOP)
	@$(MAKE) --no-print-directory status

restart:
	@$(STOP)
	@$(START)
	@$(MAKE) --no-print-directory status

logs-wp:
	@$(LOGS) --tail=100 -f wordpress

logs-db:
	@$(LOGS) --tail=100 -f db

console-wp:
	@$(EXEC) wordpress bash

console-db:
	@$(EXEC) db bash

status:
	@echo "\n\033[1;m Containers statuses \033[0m"
	@$(STATUS)

clean:
	@echo "\033[1;31m\033[5m *** Removing containers ***\033[0m"
	@$(CLEAN)
	@$(MAKE) --no-print-directory status

install-phpcs:
	npm install --save-dev
	composer install
	vendor/bin/phpcs --config-set installed_paths $(shell pwd)/vendor/wp-coding-standards/wpcs,$(shell pwd)/vendor/automattic/vipwpcs

test:
	./vendor/bin/phpcbf $(shell pwd)/src/wp-content/plugins/sampleplugin/*.php --standard=WordPress -w -p
	./vendor/bin/phpcbf $(shell pwd)/src/wp-content/plugins/sampleplugin/core --standard=WordPress -w -p
	./vendor/bin/phpcs $(shell pwd)/src/wp-content/plugins/sampleplugin/core --standard=WordPress
	./vendor/bin/phpcs $(shell pwd)/src/wp-content/plugins/sampleplugin/*.php --standard=WordPress
	./vendor/bin/phpcs $(shell pwd)/src/wp-content/plugins/sampleplugin/core --standard=WordPressVIPMinimum
	./vendor/bin/phpcs $(shell pwd)/src/wp-content/plugins/sampleplugin/*.php --standard=WordPressVIPMinimum

db-dump:
	@echo "\033[1;31m\033[5m *** Make a db dump ***\033[0m"
	@$(EXEC) -T db bash -c "mysqldump -uroot -p ${MYSQL_DATABASE} > /docker-entrypoint-initdb.d/dump.sql"

init-wpvipgo-core:
	@echo "\033[1;31m\033[5m *** Cloning MU Plugins ***\033[0m"
	git clone --recursive git@github.com:Automattic/vip-go-mu-plugins.git  src/wp-content/mu-plugins;\
