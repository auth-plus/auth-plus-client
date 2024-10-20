FROM node:20.14.0-slim AS dependency
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:20.14.0-slim AS deploy
WORKDIR /app
COPY --from=dependency /app/build ./build
COPY package.json package.json
EXPOSE 3000
ENTRYPOINT [ "node", "./build/index.js" ]