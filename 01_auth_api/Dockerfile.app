FROM node:18.16.0

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm uninstall bcrypt

RUN npm install bcrypt --build-from-source


CMD ["npm", "start"]