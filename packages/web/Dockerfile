FROM node:alpine

ENV API_URL=http://api:5000

WORKDIR /app

COPY package.json .

COPY . .

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm run build

EXPOSE 3000

CMD ["npm", "start"]
