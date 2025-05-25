FROM node:18-alpine

WORKDIR /usr/src/app

# Install latest stable npm and clean cache
#RUN npm install -g npm@9.6.7 && npm cache clean --force

# Copy only package files first to leverage Docker layer caching
COPY package*.json ./

# Use legacy-peer-deps to avoid peer dependency issues
RUN npm install --legacy-peer-deps

# Copy rest of the application files
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
