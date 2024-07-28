FROM node:alpine

WORKDIR "/app"
COPY . .
WORKDIR "/app/api"
RUN npm run build
CMD ["npm", "start"]
