FROM node:18-alpine

WORKDIR /usr/src/app

# Copy only package files first to leverage caching
COPY package*.json ./

#RUN npm install -g npm@9.6.7  # update npm to stable version

# Use --legacy-peer-deps to avoid peer dependency conflicts
RUN npm install --legacy-peer-deps

# Copy all other files
COPY . .

EXPOSE 8000

CMD ["npm", "start"]
