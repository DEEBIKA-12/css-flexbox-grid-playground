# Use the official Nginx image to serve the static web app
FROM nginx:alpine

# Remove the default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy our app files into Nginx's web directory
COPY app/ /usr/share/nginx/html/

# Copy our custom Nginx configuration
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Nginx listens on port 80 inside the container
EXPOSE 80