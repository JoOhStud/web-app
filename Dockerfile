# # Stage 1: Build the React app
# CMD ["nginx", "-g", "daemon off;"]
# FROM node:alpine AS build
FROM node:alpine
# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the app
COPY . .

# Build the app
# RUN npm run build

CMD ["npm", "run", "dev"]

# Start Nginx
# # CMD ["nginx", "-g", "daemon off;"]
# FROM nginx:alpine 
# # Copy the built React app to Nginx's web server directory
# COPY --from=build /app/dist /usr/share/nginx/html
# # Copy nginx config files
# COPY --from=build /app/config/nginx/default.conf /etc/nginx/conf.d
# # Copy configuration script
# COPY --from=build /app/config/nginx/generate-config.sh /docker-entrypoint.d/

# # Expose port 8000 for the Nginx server
# EXPOSE 80

# RUN addgroup --gid 20001 docker \
#     && adduser --disabled-password --uid 10001 --ingroup docker docker \
#     && chmod 755 /docker-entrypoint.d/generate-config.sh \
#     && dos2unix /docker-entrypoint.d/generate-config.sh \
#     && touch /var/run/nginx.pid /run/nginx.pid \
#     && chown --recursive docker:docker /usr/share/nginx/html /var/cache/nginx /var/run/nginx.pid /run/nginx.pid

# # Set the user as the default user for the container
# USER docker

# CMD ["nginx", "-g", "daemon off;"]