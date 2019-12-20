FROM node:12.14.0

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

#Install packages required
RUN apt-get update && \
	apt-get install -y \
	apt-utils \
	curl \
	apt-transport-https \
	libgflags-dev

RUN npm config set user 0
RUN npm config set unsafe-perm true

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @angular/cli

# add app
COPY . /usr/src/app

# start app
CMD ng serve -c ${API} --host 0.0.0.0 --disable-host-check
