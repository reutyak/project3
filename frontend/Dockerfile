# FROM node:14 as build-stage

# WORKDIR /frontend
# COPY package.json .
# RUN npm install
# COPY . .

# ARG REACT_APP_API_BASE_URL
# ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

# RUN npm run build

FROM node:alpine
# ENV NODE_ENV = production
WORKDIR  /vacations/frontend
RUN npm install -g npm@9.1.1
RUN npm i -g ts-node
RUN npm i -g nodemon

# RUN npm config set http-proxy http://<my company proxy>:8099
# RUN npm config set https-proxy http://<my company proxy>:8099
COPY package*.json /vacations/frontend

# COPY package.json ./
# COPY package-lock.json ./
RUN npm install
COPY . /vacations/frontend
EXPOSE 3000
ENTRYPOINT npm start