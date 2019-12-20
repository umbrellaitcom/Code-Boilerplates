FROM php:7.2-fpm

RUN apt-get update && apt-get install -y \
    git \
    openssh-server \
    openssh-client \
    unzip \
    libicu-dev \
    libgmp-dev \
    libmagickwand-dev --no-install-recommends

RUN apt-get update && apt-get install -y libmagickwand-6.q16-dev --no-install-recommends \
&& ln -s /usr/lib/x86_64-linux-gnu/ImageMagick-6.8.9/bin-Q16/MagickWand-config /usr/bin \
&& pecl install imagick \
&& echo "extension=imagick.so" > /usr/local/etc/php/conf.d/ext-imagick.ini

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer --version

# Type docker-php-ext-install to see available extensions
RUN docker-php-ext-configure intl
RUN docker-php-ext-configure bcmath
RUN docker-php-ext-install pdo pdo_mysql intl zip gmp bcmath
RUN pecl install redis-3.1.3 && docker-php-ext-enable redis

# install xdebug
RUN pecl install xdebug
RUN docker-php-ext-enable xdebug
RUN echo "error_reporting = E_ALL" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN echo "display_startup_errors = On" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN echo "display_errors = On" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN echo "xdebug.remote_enable=1" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN echo "xdebug.remote_connect_back=1" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN echo "xdebug.idekey=\"PHPSTORM\"" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN echo "xdebug.remote_port=9001" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

RUN echo 'alias sf="php bin/console"' >> ~/.bashrc

RUN useradd -ms /bin/bash yii2-boilerplate
USER yii2-boilerplate

WORKDIR /var/www/yii2-boilerplate

ENV PATH="~/.composer/vendor/bin:./vendor/bin:${PATH}"


EXPOSE 9000

CMD ["php-fpm"]
