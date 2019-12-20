FROM wordpress:5.4.2-php7.4-apache
RUN \
    apt-get update && \
    apt-get install -y curl zip unzip subversion && \
    pecl install xdebug && \
    curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
    chmod +x wp-cli.phar && \
    mv wp-cli.phar /usr/local/bin/wp
