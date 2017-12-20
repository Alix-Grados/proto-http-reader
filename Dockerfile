FROM mhart/alpine-node:latest

WORKDIR /app
ADD package.json /app/
RUN npm install
ADD app.js /app/

EXPOSE 3000

CMD ["npm", "start"]