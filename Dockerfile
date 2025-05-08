# Step 1: Use an official Node.js runtime as a base image
FROM node:22-bullseye AS builder

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY . ./

# Step 3.1: Build .env file
ARG NODE_ENV
ARG PORT
ARG GRPC_HOST
ARG GRPC_PORT
ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_PASS
ARG DB_NAME
ARG JWT_SECRET
ARG JWT_EXPIRATION
ARG REDIS_HOST
ARG REDIS_PORT
ARG REDIS_PASSWORD

ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
ENV GRPC_HOST=$GRPC_HOST
ENV GRPC_PORT=$GRPC_PORT
ENV DB_HOST=$DB_HOST
ENV DB_PORT=$DB_PORT
ENV DB_USER=$DB_USER
ENV DB_PASS=$DB_PASS
ENV DB_NAME=$DB_NAME
ENV JWT_SECRET=$JWT_SECRET
ENV JWT_EXPIRATION=$JWT_EXPIRATION
ENV REDIS_HOST=$REDIS_HOST
ENV REDIS_PORT=$REDIS_PORT
ENV REDIS_PASSWORD=$REDIS_PASSWORD

RUN echo "NODE_ENV=$NODE_ENV" >> .env
RUN echo "PORT=$PORT" >> .env
RUN echo "GRPC_HOST=$GRPC_HOST" >> .env
RUN echo "GRPC_PORT=$GRPC_PORT" >> .env
RUN echo "DB_HOST=$DB_HOST" >> .env
RUN echo "DB_PORT=$DB_PORT" >> .env
RUN echo "DB_USER=$DB_USER" >> .env
RUN echo "DB_PASS=$DB_PASS" >> .env
RUN echo "DB_NAME=$DB_NAME" >> .env
RUN echo "JWT_SECRET=$JWT_SECRET" >> .env
RUN echo "JWT_EXPIRATION=$JWT_EXPIRATION" >> .env
RUN echo "REDIS_HOST=$REDIS_HOST" >> .env
RUN echo "REDIS_PORT=$REDIS_PORT" >> .env
RUN echo "REDIS_PASSWORD=$REDIS_PASSWORD" >> .env


# Step 4: Install dependencies
RUN yarn install --frozen-lockfile

# Step 5: Copy the entire application to the container
COPY . .

# Step 6: Build the Next.js application
RUN yarn run build

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
CMD ["npm", "start:prod"]
