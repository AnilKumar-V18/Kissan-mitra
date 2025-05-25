FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy application source
COPY . .

# Expose your app's port
EXPOSE 8000

# Add a test runner command so Jenkins can reuse it (optional)
RUN chmod +x ./node_modules/.bin/*

# Default start command
CMD ["npm", "start"]
