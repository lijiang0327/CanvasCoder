FROM node:18-alpine

WORKDIR /src

RUN npm install pnpm -g

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install

COPY ./app ./app
COPY ./components ./components
COPY ./public ./public
COPY ./store ./store
COPY ./utils ./utils
COPY ./next.config.js ./next.config.js
COPY ./postcss.config.js ./postcss.config.js
COPY ./tailwind.config.ts ./tailwind.config.ts
COPY ./tsconfig.json ./tsconfig.json
COPY ./.eslintrc.json ./eslintrc.json

RUN pnpm build

CMD pnpm start
