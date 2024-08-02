FROM node:18
COPY package*.json ./ index.js /
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
