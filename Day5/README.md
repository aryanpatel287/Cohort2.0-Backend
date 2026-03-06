# Day 5 - Notes REST API

## Overview
A simple in-memory Notes CRUD REST API built with Express.js.

## Endpoints

### GET /notes
Returns all notes.

**Response `200`:**
```json
{ "notes": [ { "title": "...", "description": "..." } ] }
```

---

### GET /notes/:index
Returns a single note by index.

**Response `200`:**
```json
{ "notes": { "title": "...", "description": "..." } }
```

---

### POST /notes
Creates a new note.

**Request Body:**
```json
{ "title": "...", "description": "..." }
```

**Response `201`:**
```json
{ "message": "Note created successfully" }
```

---

### PATCH /notes/:index
Partially updates a note by index. Only the fields provided in the request body are updated.

**Request Body (any or all fields):**
```json
{ "title": "...", "description": "..." }
```

**Response `200`:**
```json
{ "message": "Note updated successfully" }
```

**Response `400`** — index is not a number:
```json
{ "message": "Invalid index" }
```

**Response `200`** — index out of range:
```json
{ "message": "Requested index does not exist" }
```

---

### DELETE /notes/:index
Deletes a note by index.

**Response `200`:**
```json
{ "message": "Note deleted successfully" }
```

**Response `400`** — index is not a number:
```json
{ "message": "Invalid index" }
```

**Response `404`** — index out of range:
```json
{ "message": "Requested index does not exist" }
```

---

## Running the Server
```bash
npm run dev
```
Server runs on **http://localhost:3000**

## 🔗 Postman Collection
[Test APIs on Postman](https://www.postman.com/aryanpatel287-9653818/workspace/cohort2-0-backend/collection/47014706-011a9c41-321a-465f-9fa2-3334193592a5?action=share&source=copy-link&creator=47014706)
