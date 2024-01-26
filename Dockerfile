FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm -g i pnpm && pnpm i

COPY . .

CMD ["npm", "run", "start:dev"]