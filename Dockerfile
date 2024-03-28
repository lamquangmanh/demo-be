# Stage 1: install dependencies
FROM node:18-alpine AS base

# Stage 2: deps
# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
# Set the working directory inside the container  
WORKDIR /app 
# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND yarn.lock (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package.json package-lock.json* ./
# Install app dependencies using the `yarn --frozen-lockfile` command instead of `yarn`
RUN npm ci

# Stage 3: build
# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# In order to run `yarn run build` we need access to the Nest CLI which is a dev dependency.
# In the previous deps stage we ran `yarn --frozen-lockfile` which installed all dependencies,
# so we can copy over the node_modules directory from the deps image
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Add Argument
ARG API_URL
# Install only the production dependencies and clean cache to optimize image size.
RUN npm run build

# Stage 4: runner
# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Set NODE_ENV variable in production
ENV NODE_ENV production

# Set the owner of the current directory and all its contents to the 'node' user
RUN chown node .

# Copy only the necessary files
COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/dist dist
COPY --chown=node:node --from=builder /app/node_modules node_modules

# Use the node user from the image (instead of the root user)
USER node

# Expose the port the app will run on  
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start:prod"]
