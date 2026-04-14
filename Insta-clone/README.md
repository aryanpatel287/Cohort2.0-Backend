# Insta-clone

Insta-clone is a full-stack social feed project with authentication, posts, likes, follow requests, followers, following, and profile views.

## Tech Stack

### Client
- React
- React Router
- Axios
- Sass
- Vite

### Server
- Node.js
- Express 5
- MongoDB with Mongoose
- JWT (cookie-based auth)
- Multer
- ImageKit

## Repository Structure

- [client](client)
  - React app, routes, contexts, hooks, components, and styles
- [server](server)
  - Express API, controllers, routes, models, middleware, DB config
- [API_RESPONSES.md](API_RESPONSES.md)
  - Endpoint reference with success/error payload examples
- [STYLING_RULES.md](STYLING_RULES.md)
  - Styling and UI convention rules

## Local Setup

### 1) Clone and install

### Client
```bash
cd client
npm install
```

### Server
```bash
cd server
npm install
```

### 2) Environment variables (server)

Create a file named `.env` inside [server](server) with:

```env
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
IMAGEKIT_PRIVATE_KEY=<your_imagekit_private_key>
```

### 3) Run in development

### Start server
```bash
cd server
npm run dev
```

Server runs on:
- http://localhost:3000

### Start client
```bash
cd client
npm run dev
```

Client runs on:
- http://localhost:5173

## Key Features

- Register and login with JWT cookie auth
- Profile page with follow status
- Follow request lifecycle:
  - pending
  - accepted
  - rejected
- Followers and following lists
- Create post with image upload
- Feed with like and unlike support
- Responsive layout with desktop and mobile panels

## API Base Paths

- Auth: `/api/auth`
- Users: `/api/user`
- Posts: `/api/posts`
- Follow: `/api/follow`, `/api/unfollow`

Detailed endpoint responses are documented in [API_RESPONSES.md](API_RESPONSES.md).

## UI/Styling Conventions

Follow the rules documented in [STYLING_RULES.md](STYLING_RULES.md) when updating UI.

## Current Status Notes

- This project is under active development.
- Some response messages and edge-case handling may evolve as features are refined.
