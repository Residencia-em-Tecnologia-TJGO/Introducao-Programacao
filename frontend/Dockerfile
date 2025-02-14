# Frontend Dockerfile (frontend/Dockerfile)
FROM node:18.13.0

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 9000

CMD ["npm", "run", "dev"]
