FROM node:22-alpine3.19

# Set the working directory inside the container
WORKDIR /frontend_app

# Copy package.json and package-lock.json first for better build caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app’s source code
COPY . .

# Expose the Vite port
EXPOSE 5173

# Set the environment variable to make Vite accessible from outside the container
ENV HOST=0.0.0.0

# Start the app
CMD ["npm", "run", "dev"]