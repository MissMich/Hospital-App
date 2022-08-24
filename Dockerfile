FROM node:gallium-alpine

ENV NODE_ENV=production
ENV PORT=3003

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

# RUN npm install
RUN yarn

COPY . .

EXPOSE 3003

CMD ["yarn", "start"]