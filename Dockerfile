FROM node:24.11.1-trixie-slim AS dependency
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:24.11.1-trixie-slim AS deploy
WORKDIR /app
COPY --from=dependency /app/build ./build
COPY package.json package.json
EXPOSE 3000
ENTRYPOINT [ "node", "./build/index.js" ]