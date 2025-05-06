# Step 1: Use an official Node.js runtime as a base image
FROM node:22-bullseye AS builder

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire application to the container
COPY . .

# Step 6: Build the Next.js application
RUN npm run build

# Step 7: Create a production stage to serve the app
FROM node:22-bullseye AS production

# Step 8: Set the working directory
WORKDIR /app

# Step 9: Copy only the build output and dependencies from the builder stage
COPY --from=builder /app ./

# Step 10: Expose the port the app will run on
EXPOSE 3000
EXPOSE 5000

# Step 11: Start the Next.js application in production mode
CMD ["npm", "start"]
