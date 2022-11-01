# Installs Node.js image
FROM node:18.12.0

# sets the working directory for any RUN, CMD, COPY command
# all files we put in the Docker container running the server will be in /usr/src/app (e.g. /usr/src/app/package.json)
WORKDIR /usr/src/app

# Copies package.json, yarn.lock, tsconfig.json, .env to the root of WORKDIR
COPY ["package.json", "yarn.lock", "tsconfig.json", ".env", "./"]

# Install yarn
RUN npm install yarn

# Delete package-lock.json if any
RUN rm package-lock.json

# Copies everything in the src directory to WORKDIR/src
COPY ./src ./src

# Installs all packages
RUN yarn install

# Runs the dev npm script to build & start the server
CMD ["yarn", "dev"]