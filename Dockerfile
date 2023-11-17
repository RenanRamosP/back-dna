# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Run migrations
RUN npm run typeorm:migrate


# Expose the port the app runs on
EXPOSE 3001

# Define environment variable
ENV NODE_ENV=production

# Command to run the application
CMD ["npm","run", "start"]
