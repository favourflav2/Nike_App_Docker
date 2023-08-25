# 1st command tells docker to use the node image from dockerhub
FROM node:18-alpine

RUN npm install -g nodemon

# Work Directory
WORKDIR /backend_dockerfile

# This is for caching ... if we make a change to our app when we build we wont have to keep running npm install since it wont be changed.. everthing above will be cached
COPY package.json .

RUN npm install

# Copy ... copy lets us cipy what we want fro our current directory into the container ... in our case this is our root directory ./ EVERYTHING IN SERVER IS WHAT WE WANT TO COPY TO OUR CONTAINER ROOT DIRECTORY WITCH IS /backend
# /backend is the folder we are going to be copying into hence .
COPY . .

# WE need this for docker desktop contianer so we can see it there
EXPOSE 5001

CMD ["npm", "run", "docker"]