# Day 91 — Fullstack Notes CRUD App

A fullstack Notes application built with **React + Vite** (client) and **Express + MongoDB/Mongoose** (server). Supports full CRUD operations: Create, Read, Update, and Delete notes. The client is deployed via a production build served statically by the Express server on Render.

**Live Demo:** [https://cohort2-0-backend-z7gf.onrender.com](https://cohort2-0-backend-z7gf.onrender.com)

---

## Project Structure

```
Day91_Fullstack_NotesCRUD/
├── client/                        # React + Vite frontend
│   ├── .env                       # Dev env: VITE_API_URL=http://localhost:3000
│   ├── .env.production            # Prod env: VITE_API_URL=https://cohort2-0-backend-z7gf.onrender.com
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx               # App entry — BrowserRouter + NotesContext wrapping
│       ├── App.jsx                # Root component — renders NoteInput, Notes grid, NoteModal
│       ├── api/
│       │   ├── axiosInstance.js   # Axios instance with baseURL from VITE_API_URL
│       │   └── NotesApi.jsx       # fetchNotes() — GET /api/notes
│       ├── context/
│       │   └── NotesContext.jsx   # Global state: notes[], selectedNote, setNotesData()
│       └── components/general/
│           ├── note-card-layout/  # Note.jsx — displays a single note card
│           ├── note-delete/       # NoteDelete.jsx — DELETE /api/notes/:id
│           ├── note-input/        # NoteInput.jsx — POST /api/notes (create form)
│           └── note-modal/        # NoteModal.jsx — PATCH /api/notes/:id (edit modal)
│
└── server/                        # Express + Mongoose backend
    ├── .env                       # MONGO_URI (MongoDB Atlas)
    ├── server.js                  # Entry: loads dotenv, connects DB, starts on port 3000
    ├── package.json
    ├── config/
    │   └── database.js            # mongoose.connect(process.env.MONGO_URI)
    ├── models/
    │   └── note.module.js         # Mongoose schema: { title: String, description: String }
    ├── src/
    │   └── app.js                 # Express app — all API routes + static file serving
    └── public/                    # Built React app (output of `npm run build` in client)
        └── index.html
```

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 19, Vite 7, React Router v7   |
| HTTP      | Axios 1.x                           |
| State     | React Context API                   |
| Backend   | Express 5                           |
| Database  | MongoDB Atlas via Mongoose 9        |
| Dev Tools | Nodemon, ESLint                     |
| Hosting   | Render (backend + static frontend)  |

---

## API Endpoints

All routes are prefixed with `/api`.

| Method   | Route              | Description                       | Request Body              | Response                          |
|----------|--------------------|-----------------------------------|---------------------------|-----------------------------------|
| `POST`   | `/api/notes`       | Create a new note                 | `{ title, description }`  | `{ message, note }`               |
| `GET`    | `/api/notes`       | Get all notes                     | —                         | `{ message, notes[] }`            |
| `GET`    | `/api/notes/:id`   | Get a single note by ID           | —                         | `{ message, notes }`              |
| `PATCH`  | `/api/notes/:id`   | Update a note (partial update)    | `{ title?, description? }`| `{ message, updatedNote }`        |
| `DELETE` | `/api/notes/:id`   | Delete a note by ID               | —                         | `{ message }`                     |
| `GET`    | `*`                | Wildcard — serves React SPA       | —                         | `public/index.html`               |

---

## Data Model

```js
// models/note.module.js
{
  title: String,
  description: String
}
```

MongoDB collection name: `notes` (auto-pluralized by Mongoose from model name `"notes"`).

---

## Environment Variables

### Server (`server/.env`)

| Variable    | Description                       |
|-------------|-----------------------------------|
| `MONGO_URI` | MongoDB Atlas connection string   |

### Client (`client/.env` / `client/.env.production`)

| Variable       | Dev Value                                          | Production Value                                  |
|----------------|----------------------------------------------------|---------------------------------------------------|
| `VITE_API_URL` | `http://localhost:3000`                            | `https://cohort2-0-backend-z7gf.onrender.com`     |

Vite automatically picks `.env.production` during `npm run build`.

---

## Setup & Running Locally

### Prerequisites

- Node.js v18+
- A MongoDB Atlas cluster (or local MongoDB)

### 1. Server

```bash
cd server
npm install
# Create .env with MONGO_URI=<your-mongodb-uri>
npm run dev        # starts with nodemon on port 3000
```

### 2. Client (development)

```bash
cd client
npm install
# .env already has VITE_API_URL=http://localhost:3000
npm run dev        # Vite dev server at http://localhost:5173
```

---

## Building for Production

The server serves the client's built files from `server/public/`. To update the build:

```bash
# 1. Build the client
cd client
npm run build      # outputs to client/dist/

# 2. Copy the build output into server/public/
#    (replace existing files in server/public/ with client/dist/ contents)

# 3. Start the server
cd ../server
npm run dev
```

The Express wildcard route (`app.get("*name", ...)`) ensures all unmatched routes return `public/index.html`, enabling client-side routing via React Router.

---

## Frontend Architecture

### State Management — `NotesContext`

A single React Context (`NotesDataContext`) holds the entire app state and is provided at the root:

```
NotesContext (Provider)
  └── App
        ├── NoteInput     → POST  (create)
        ├── Note (×N)     → READ  (display)
        │     └── NoteDelete → DELETE
        └── NoteModal     → PATCH (update, shown on note click)
```

**Context values:**
- `notes` — array of all notes from the DB
- `setNotes` — direct state setter
- `selectedNote` — the note currently open in the modal
- `setSelectedNote` — opens/closes the edit modal
- `setNotesData()` — async function that re-fetches notes from the API and updates state

### Axios Instance

```js
// src/api/axiosInstance.js
axios.create({ baseURL: import.meta.env.VITE_API_URL })
```

All API calls use this shared instance so the base URL is configured in one place and switches automatically between dev and production.

---

## Component Breakdown

### `NoteInput.jsx`
- Collapsible form (textarea hidden until title is focused)
- Auto-resizing textarea via `scrollHeight`
- On submit: `POST /api/notes` → calls `setNotesData()` to refresh the list

### `Note.jsx`
- Displays `title` and `description`
- Clicking the card sets `selectedNote` in context → opens `NoteModal`
- Renders `NoteDelete` inside, uses `e.stopPropagation()` to prevent modal from opening on delete

### `NoteDelete.jsx`
- Renders a Remix Icon trash button
- On click: `DELETE /api/notes/:id` → fetches updated list → updates context

### `NoteModal.jsx`
- Modal overlay shown when `selectedNote` is set
- Pre-fills title and description from the selected note
- On save: `PATCH /api/notes/:id` → calls `setNotesData()` → closes modal

---

## Key Concepts Demonstrated

- **Fullstack architecture** — decoupled React SPA + Express REST API
- **React Context API** — shared state without Redux/Zustand
- **Axios instance pattern** — single configured instance reused across components
- **Environment-based config** — `.env` vs `.env.production` with Vite
- **Serving SPA from Express** — `express.static` + wildcard fallback route
- **Mongoose CRUD** — `create`, `find`, `findById`, `findByIdAndDelete`, `findByIdAndUpdate`
- **PATCH semantics** — partial update with field fallback (`req.body.title || note.title`)

---

## Deployment

- **Backend + Frontend** hosted on [Render](https://render.com)
- Live URL: `https://cohort2-0-backend-z7gf.onrender.com`
- The server serves both the REST API under `/api/*` and the React SPA for all other routes
