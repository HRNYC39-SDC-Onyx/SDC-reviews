FROM node:14
WORKDIR /sdc-reviews
COPY ["package.json", "package-lock*.json", "./"]
RUN npm install
COPY . .
CMD ["node", "server/app.js"]
