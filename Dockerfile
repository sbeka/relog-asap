# Use the official Node.js image
FROM node:20

# Set the working directory
WORKDIR /app

# Clone the repository
RUN git clone https://github.com/sbeka/relog-asap .

ENV REACT_APP_API_URL=http://localhost:8012/copilot/invoke2

# Install dependencies
RUN npm install

# Build the app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
