FROM node:18-alpine

WORKDIR /app

COPY app.js .

ENV PORT=3000

EXPOSE 3000

HEALTHCHECK CMD wget --spider -q http://localhost:3000/health || exit 1

CMD ["node", "app.js"]
