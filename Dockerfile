# Use an updated Node.js base image
FROM node:18-alpine as base

# Set the working directory
WORKDIR /home/node/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Separate runtime stage for development
FROM base as dev

# Copy application files
COPY . .

# Set appropriate permissions for the non-root user
RUN chown -R node:node /home/node/app

# Use non-root user for security
USER node

# Expose the application port
EXPOSE 4242

# Command to start the app
CMD ["node", "server.js"]
