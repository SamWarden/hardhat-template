# Specify a base image
FROM node:20.11.1-buster-slim

# Specify a working directory
WORKDIR /usr/src/app

RUN apt-get update \
 && apt-get install -y gcc git

# Copy the dependencies file
COPY ./package.json ./yarn.lock ./

# Install dependencies
RUN yarn install

COPY ./ ./

ENTRYPOINT ["yarn", "run"]
