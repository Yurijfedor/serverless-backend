FROM node:18.16.0

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

CMD ["npm", "start"]