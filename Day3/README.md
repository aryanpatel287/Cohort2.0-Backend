# Day 3 - Handling POST Requests & JSON Data

## Overview
Working with POST requests and parsing JSON data in Express.

## What's Covered
- Using `express.json()` middleware to parse JSON request bodies
- Creating a POST endpoint to accept data
- Building a simple in-memory notes storage
- Implementing POST `/notes` and GET `/notes` endpoints

## Technical Concepts
- **Middleware**: `express.json()` parses incoming JSON payloads and makes them available in `req.body`
- **HTTP POST Method**: Used for sending data to the server
- **In-Memory Storage**: Data stored in a variable (lost on server restart)
- **req.body**: Contains the parsed JSON data from the client

## Run
```bash
npm install
node app.js
```
Test with Postman or cURL by sending POST requests to `http://localhost:3000/notes`
