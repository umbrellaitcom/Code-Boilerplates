#!/usr/bin/env bash
set -e
rm -rf docker/nginx/configs/conf.d/backend.conf >> /dev/null

cat <<EOF > docker/nginx/configs/conf.d/backend.conf
server {
    listen 80;
    server_name ${HOST_BACKEND};

    location / {
        proxy_pass http://backend:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Accept-Encoding "";
        proxy_set_header Proxy "";
        add_header 'Cache-Control' 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0';
        expires off;
    }
}
EOF
