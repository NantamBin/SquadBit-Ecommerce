FROM node:22-alpine3.20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
RUN npm audit fix

COPY . .

COPY .env ./
COPY prisma ./prisma

EXPOSE 3000
EXPOSE 8180

RUN npx prisma generate

CMD ["npm", "run", "dev"]