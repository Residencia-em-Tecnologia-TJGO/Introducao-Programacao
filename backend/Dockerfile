FROM node:18.13.0

WORKDIR /app

COPY package.json package-lock.json ./

# Remove qualquer node_modules antigo e instala dependências corretamente
RUN rm -rf node_modules package-lock.json && npm install

# Reinstala bcrypt para evitar problemas com binários incompatíveis
RUN npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
