# Express Backend
FROM node:20-alpine

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++ postgresql-dev

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Create necessary directories
RUN mkdir -p logs uploads

# Expose port
EXPOSE 9000

# Start the application
CMD ["pnpm", "run", "start"]