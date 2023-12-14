FROM node:16.16-alpine AS dependencies

WORKDIR /app

COPY yarn.lock ./
COPY package.json ./
RUN yarn

FROM node:16.16-alpine AS build
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN yarn build
ENV NODE_ENV production
RUN yarn install --frozen-lockfile --production && yarn cache clean

FROM node:16.16-alpine AS deploy
WORKDIR /app
ENV NODE_ENV production
COPY --from=build ./app/dist ./dist
COPY --from=build ./app/node_modules ./node_modules

CMD ["node", "dist/src/main.js"]