FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
COPY prisma ./prisma
COPY .env ./

EXPOSE 3000 8180

RUN npx prisma generate

CMD ["npm", "start"]
