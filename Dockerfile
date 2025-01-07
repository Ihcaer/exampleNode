FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "if [ \"$RUN_TESTS\" = \"true\" ]; then npm test; else npm start; fi"]