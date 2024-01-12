# Use an official Node.js LTS image as the base image
FROM node:lts-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application files to the container
COPY . .

# Build the application
RUN npm run build

# Stage 2: Use a minimal Nginx image for serving the built app
FROM nginx:alpine

# Copy the built app from the builder stage to the nginx image
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port that Nginx will run on
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]

