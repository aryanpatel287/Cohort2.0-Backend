# Day 4 - Full CRUD API with Modular Structure

## Overview
Building a complete CRUD (Create, Read, Update, Delete) API with proper code organization.

## What's Covered
- Complete CRUD operations for a Notes API
- Separation of concerns: `server.js` for server startup, `src/app.js` for routes
- Dynamic routing with URL parameters (`:index`)
- Input validation using `isNaN()`
- Exporting modules with `module.exports`

## API Endpoints
- `POST /notes` — Create a new note
- `GET /notes` — Retrieve all notes
- `PATCH /notes/:index` — Update a note's description
- `DELETE /notes/:index` — Delete a note by index

## Technical Concepts
- **CRUD Operations**: Create, Read, Update, Delete
- **Route Parameters**: Accessing dynamic values from URL using `req.params`
- **HTTP Methods**: POST, GET, PATCH, DELETE
- **Modular Architecture**: Separating application logic from server configuration
- **Validation**: Checking if URL parameters are valid numbers

## Run
```bash
npm install
npm run dev  # Uses nodemon for auto-restart on file changes
```
Test all endpoints using Postman at `http://localhost:3000`

## 🔗 Postman Collection
[Test APIs on Postman](https://www.postman.com/aryanpatel287-9653818/workspace/cohort2-0-backend/collection/47014706-011a9c41-321a-465f-9fa2-3334193592a5?action=share&source=copy-link&creator=47014706)
