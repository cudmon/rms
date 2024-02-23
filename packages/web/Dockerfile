FROM node:alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package.json .

COPY . .

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm run build

EXPOSE 3000

CMD ["npm", "start"]
