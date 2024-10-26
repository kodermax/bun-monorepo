FROM oven/bun:1.1.33 AS build

WORKDIR /app

# Cache packages
COPY package.json package.json
COPY bun.lockb bun.lockb

COPY /apps/server/package.json ./apps/server/package.json

RUN bun install

COPY /apps/server ./apps/server



ENV NODE_ENV=production

RUN bun build --compile --minify-whitespace --minify-syntax --target bun --outfile server ./apps/server/src/index.ts

FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build --chown=1000:1000 --chmod=555 /app/server /bin/

ENV NODE_ENV=production
USER 1000:1000
EXPOSE 8000
ENTRYPOINT ["/bin/server"]
