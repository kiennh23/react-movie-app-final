FROM node:18.8-alpine as builder

WORKDIR /app

COPY . ./

RUN yarn
RUN yarn build

FROM nginx:alpine

ENV NODE_ENV production
ENV BACKEND_URL http://localhost:8080

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]