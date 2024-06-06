# Use the official Node.js image
FROM node:20

# Set the working directory
WORKDIR /app

# Clone the repository
RUN git clone https://github.com/sbeka/relog-asap .

# Install dependencies
RUN npm install

# Build the app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]