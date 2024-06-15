# Dockerfile
FROM node:14.17.3
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
EXPOSE ${PORT}
CMD ["npm", "start"]
