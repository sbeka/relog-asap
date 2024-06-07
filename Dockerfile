# Use the official Node.js image
FROM node:20

# Set the working directory
WORKDIR /app

# Clone the repository
RUN git clone https://github.com/sbeka/relog-asap.git .

# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
