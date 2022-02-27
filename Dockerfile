FROM node:16

WORKDIR /app

EXPOSE 3000 35729

COPY package.json /app
COPY yarn.lock /app

RUN yarn install

COPY . /app

CMD ["yarn", "start"]
