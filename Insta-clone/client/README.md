# Insta-clone Client

Frontend for Insta-clone built with React + Vite.

## Tech Stack

- React
- React Router
- Axios
- Sass
- Vite

## Run Locally

```bash
npm install
npm run dev
```

Default local URL:
- http://localhost:5173

To expose on LAN:

```bash
npm run dev -- --host
```

## Build

```bash
npm run build
npm run preview
```

## Key Client Features

- Authentication screens and session-aware UI
- Feed, post creation, like/unlike
- Profile pages with follow status
- Followers, following, and follow requests panels
- Responsive desktop + mobile navigation/panels

## Project Conventions

- Shared UI styles are in [src/features/shared/styles](src/features/shared/styles).
- Feature-specific styles are colocated in each feature folder.
- Follow app-wide styling rules from [../STYLING_RULES.md](../STYLING_RULES.md).

## API Docs

Use [../API_RESPONSES.md](../API_RESPONSES.md) for response examples and endpoint references.

## Postman Collection

- [Cohort 2.0 Backend Collection](https://www.postman.com/aryanpatel287-9653818/workspace/cohort2-0-backend/collection/47014706-011a9c41-321a-465f-9fa2-3334193592a5?action=share&source=copy-link&creator=47014706)
