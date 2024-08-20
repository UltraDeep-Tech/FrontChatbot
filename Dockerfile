
# Use a specific Node.js runtime as the base image

FROM node:20-alpine 
# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container and install dependencies
COPY package.json ./
COPY yarn.lock ./
# COPY package-lock.json ./
RUN yarn install

# Copy the rest of the app's files to the container
COPY . .

# Build the app
RUN yarn build

# Start the app when the container is run
CMD ["yarn", "start"]
