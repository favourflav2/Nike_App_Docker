# 1st command tells docker to use the node image from dockhub
FROM node:18-alpine

# Work Directory
WORKDIR /frontend_dockerfile

# We copy the package.json to the image....  (.) is for the root directory where the dockefile is located
COPY package.json .

# This is going to install all the dependiceis we need after we copy the package.json
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]