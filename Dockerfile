FROM node:16.14.2 AS builder
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

WORKDIR /app
COPY . .
COPY .env.prod .env

# install node packages
ENV NODE_OPTIONS="--max-old-space-size=8192"

# RUN pnpm set progress=false && pnpm config set depth 0
RUN pnpm i
RUN pnpm run build

# expose port and define CMD
#EXPOSE 8080
#CMD ["npm", "run", "start"]

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
