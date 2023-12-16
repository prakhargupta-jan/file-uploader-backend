# Project Name

This is a backend server for a web application. It handles file uploads and storage of those files in server as well as storage of data of those files in databases for easier operations.

## Technologies Used

- Express.js: A web application framework for Node.js
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js
- Multer: A middleware for handling file uploads
- XLSX: A library for reading and writing Excel files
- dotenv: A module for loading environment variables from a .env file
- cors: A middleware for enabling Cross-Origin Resource Sharing
- morgan: A middleware for logging HTTP requests
- nodemon: A tool for automatically restarting the server during development

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the server with `npm start`

## API Endpoints

- POST /api/file-upload: Upload a file and extract data from it
- GET /api/get-files: Get a list of all uploaded files
- GET /api/get-files/:id: Download a specific file by its ID
