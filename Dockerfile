FROM node:16.14.2 AS builder
WORKDIR /app
COPY . .
# install node packages
RUN npm set progress=false && npm config set depth 0
RUN npm install 
RUN npm install socket.io-client
RUN npm run build

# expose port and define CMD
EXPOSE 8080
CMD ["npm", "run", "dev"]
