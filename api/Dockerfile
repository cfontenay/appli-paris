FROM node
COPY src/ /app/src
COPY package.json /app
COPY tsconfig.json /app
WORKDIR /app

EXPOSE ${PORT}
RUN npm install
CMD ["npm", "start"]