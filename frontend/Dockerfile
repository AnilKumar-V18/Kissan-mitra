FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Use legacy-peer-deps to avoid npm peer dependency errors
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
