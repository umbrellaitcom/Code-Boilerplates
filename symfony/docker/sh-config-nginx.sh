#!/usr/bin/env bash

rm -rf docker/nginx/symfony.conf >> /dev/null

cat <<EOF > docker/nginx/symfony.conf
server {
    server_name uit-food-order.local;
    root /var/www/symfony/public;

    location / {
        try_files \$uri @rewriteapp;
    }

    location @rewriteapp {
        rewrite ^(.*)$ /index.php/\$1 last;
    }

    location ~ ^/(index|app_dev|config)\.php(/|$) {
        fastcgi_pass php-upstream;
        fastcgi_split_path_info ^(.+\.php)(/.*)$;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
        fastcgi_param HTTPS off;
    }

    error_log /var/log/nginx/symfony_error.log;
    access_log /var/log/nginx/symfony_access.log;
}
EOF
