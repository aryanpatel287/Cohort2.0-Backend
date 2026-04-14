# Insta-clone Server

Backend API for Insta-clone built with Express, MongoDB, JWT cookie auth, and ImageKit.

## Tech Stack

- Node.js
- Express 5
- MongoDB + Mongoose
- JWT
- Cookie Parser
- CORS
- Multer
- ImageKit

## Postman Collection

- [Cohort 2.0 Backend Collection](https://www.postman.com/aryanpatel287-9653818/workspace/cohort2-0-backend/collection/47014706-011a9c41-321a-465f-9fa2-3334193592a5?action=share&source=copy-link&creator=47014706)

## Run Locally

```bash
npm install
npm run dev
```

Default server URL:
- http://localhost:3000

## Environment Variables

Create `.env` in this folder with:

```env
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
IMAGEKIT_PRIVATE_KEY=<your_imagekit_private_key>
```

## API Modules

- Auth routes
- User routes
- Post routes
- Follow routes
- App fallback route for client-side routing

Detailed API responses and request examples are documented in [../API_RESPONSES.md](../API_RESPONSES.md).
