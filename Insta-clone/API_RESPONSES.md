# Insta-clone API Responses Reference

This document is generated from current server route + controller code under `server/src`.

## Base URL
- Local: `http://localhost:3000`

## Authentication / Credentials

### Public request credentials (body fields)
- `POST /api/auth/register`
  - `username`
  - `email`
  - `password`
  - optional: `bio`, `profileImage`
- `POST /api/auth/login`
  - one of: `username` or `email`
  - `password`

### Private request credentials
Private APIs require cookie-based auth.
- Required cookie: `token=<jwt>`
- Middleware behavior (`identifyUser`):
  - `401` if token missing
  - `401` if token invalid/expired

Example private call headers:
```http
Cookie: token=<your_jwt_token>
```

Example cURL private call:
```bash
curl -X GET http://localhost:3000/api/user/get-me \
  -H "Cookie: token=<your_jwt_token>"
```

## Example Test Credentials
Use these for manual testing:
```json
{
  "username": "demo_user",
  "email": "demo_user@example.com",
  "password": "Demo@12345",
  "bio": "Testing Insta clone API",
  "profileImage": "https://example.com/avatar.png"
}
```

---

## Auth APIs

### 1) Register
- Method: `POST`
- URL: `/api/auth/register`
- Access: Public
- Body example:
```json
{
  "username": "demo_user",
  "email": "demo_user@example.com",
  "password": "Demo@12345",
  "bio": "Testing Insta clone API",
  "profileImage": "https://example.com/avatar.png"
}
```

#### Responses
- `200`
```json
{
  "message": "User registered successfully",
  "user": {
    "username": "demo_user",
    "email": "demo_user@example.com",
    "bio": "Testing Insta clone API",
    "profileImage": "https://example.com/avatar.png"
  }
}
```
- `409`
```json
{ "message": "Email is already registered" }
```
or
```json
{ "message": "Username is already taken" }
```

### 2) Login
- Method: `POST`
- URL: `/api/auth/login`
- Access: Public
- Body example (username login):
```json
{
  "username": "demo_user",
  "password": "Demo@12345"
}
```
- Body example (email login):
```json
{
  "email": "demo_user@example.com",
  "password": "Demo@12345"
}
```

#### Responses
- `200`
```json
{
  "message": "User logged in successsfully",
  "user": {
    "username": "demo_user",
    "email": "demo_user@example.com",
    "bio": "Testing Insta clone API",
    "profileImage": "https://example.com/avatar.png"
  }
}
```
- `404`
```json
{ "message": "User not found" }
```
- `401`
```json
{ "message": "Invalid Password" }
```

---

## User APIs (Private)

### 3) Get Me
- Method: `GET`
- URL: `/api/user/get-me`
- Required credentials: cookie token

#### Responses
- `200`
```json
{
  "message": "user details fetched successfully",
  "user": {
    "username": "demo_user",
    "email": "demo_user@example.com",
    "bio": "Testing Insta clone API",
    "profileImage": "https://example.com/avatar.png"
  }
}
```
- `404`
```json
{ "message": "user not found" }
```
- `401` (middleware)
```json
{ "message": "token not provided, user is not authorized" }
```
or
```json
{ "message": "user is not authorized" }
```

### 4) Get All Users
- Method: `GET`
- URL: `/api/user/`
- Required credentials: cookie token

#### Responses
- `200`
```json
{
  "message": "users details fetched successfully",
  "allUsers": [
    {
      "_id": "<userId>",
      "username": "demo_user",
      "email": "demo_user@example.com",
      "bio": "Testing Insta clone API",
      "profileImage": "https://example.com/avatar.png"
    }
  ]
}
```
- `404` (rare in current code path)
```json
{ "message": "users not found" }
```
- `401` (middleware)
```json
{ "message": "token not provided, user is not authorized" }
```
or
```json
{ "message": "user is not authorized" }
```

### 5) Get User By Username
- Method: `GET`
- URL: `/api/user/get-user/:username`
- Required credentials: cookie token
- Example: `/api/user/get-user/demo_user`

#### Responses
- `200`
```json
{
  "message": "user found successfully",
  "userDetails": {
    "_id": "<userId>",
    "username": "demo_user",
    "email": "demo_user@example.com",
    "bio": "Testing Insta clone API",
    "profileImage": "https://example.com/avatar.png",
    "followStatus": "none"
  }
}
```
`followStatus` values in current logic: `none | pending | accepted | rejected`

- `404`
```json
{ "message": "user not found" }
```
- `401` (middleware)
```json
{ "message": "token not provided, user is not authorized" }
```
or
```json
{ "message": "user is not authorized" }
```

---

## Post APIs (Private)

### 6) Create Post
- Method: `POST`
- URL: `/api/posts/`
- Required credentials: cookie token
- Content-Type: `multipart/form-data`
- Form fields:
  - `image` (file, required)
  - `caption` (string, optional)

Example cURL:
```bash
curl -X POST http://localhost:3000/api/posts/ \
  -H "Cookie: token=<your_jwt_token>" \
  -F "image=@/path/to/image.jpg" \
  -F "caption=My first post"
```

#### Responses
- `200`
```json
{
  "message": "post created successfully",
  "post": {
    "caption": "My first post",
    "imageUrl": "https://ik.imagekit.io/..."
  }
}
```
- `401` (middleware)
```json
{ "message": "token not provided, user is not authorized" }
```
or
```json
{ "message": "user is not authorized" }
```

### 7) Get My Posts
- Method: `GET`
- URL: `/api/posts/`
- Required credentials: cookie token

#### Responses
- `200`
```json
{
  "message": "posts fetched successfuly",
  "posts": [
    {
      "_id": "<postId>",
      "caption": "My first post",
      "imageUrl": "https://ik.imagekit.io/...",
      "user": "<userId>"
    }
  ]
}
```

### 8) Get Post Details
- Method: `GET`
- URL: `/api/posts/details/:postId`
- Required credentials: cookie token

#### Responses
- `200`
```json
{
  "message": "post fetched successfully",
  "post": {
    "caption": "My first post",
    "imageUrl": "https://ik.imagekit.io/..."
  }
}
```
- `404`
```json
{ "message": "post not found" }
```
- `403`
```json
{ "message": "forbidden content" }
```

### 9) Like Post
- Method: `POST`
- URL: `/api/posts/like/:postId`
- Required credentials: cookie token

#### Responses
- `200`
```json
{ "message": "liked post successfully" }
```
- `200` (already liked)
```json
{ "message": "post is already liked" }
```
- `404`
```json
{ "message": "post not found" }
```

### 10) Unlike Post
- Method: `POST`
- URL: `/api/posts/unlike/:postId`
- Required credentials: cookie token

#### Responses
- `200`
```json
{ "message": "unliked post successfully" }
```
- `400`
```json
{ "message": "post is not liked" }
```

### 11) Feed
- Method: `GET`
- URL: `/api/posts/feed`
- Required credentials: cookie token

#### Responses
- `200`
```json
{
  "message": "all posts fetched successfully",
  "posts": [
    {
      "_id": "<postId>",
      "caption": "My first post",
      "imageUrl": "https://ik.imagekit.io/...",
      "user": {
        "_id": "<userId>",
        "username": "demo_user"
      },
      "isLiked": true,
      "likeCount": 3
    }
  ]
}
```

---

## Follow APIs (Private)

### 12) Follow User
- Method: `POST`
- URL: `/api/follow/:userId`
- Required credentials: cookie token

#### Responses
- `200` new follow request
```json
{
  "message": "Follow request sent to <followeeUserId>",
  "followRecord": {
    "_id": "<followRecordId>",
    "follower": "<myUserId>",
    "followee": "<followeeUserId>",
    "status": "pending"
  }
}
```
- `200` already pending/accepted
```json
{
  "message": "follow request already sent to <followeeUserId>",
  "followStatus": "pending",
  "followRecord": {
    "_id": "<followRecordId>",
    "follower": "<myUserId>",
    "followee": "<followeeUserId>",
    "status": "pending"
  }
}
```
- `200` re-request after rejected
```json
{
  "message": "follow request sent successfully",
  "newFollowRecord": {
    "_id": "<followRecordId>",
    "status": "pending"
  }
}
```
- `400`
```json
{ "message": "follower and followee cannot be same" }
```
- `404`
```json
{ "message": "user: <followeeUserId> not found" }
```

### 13) Unfollow User
- Method: `POST`
- URL: `/api/unfollow/:userId`
- Required credentials: cookie token

#### Responses
- `200`
```json
{ "message": "you have unfollowed <followeeUserId>" }
```
- `200` (nothing to unfollow)
```json
{ "message": "you are not following <followeeUserId>" }
```
- `400`
```json
{ "message": "follower and followee cannot be same" }
```
- `400`
```json
{ "message": "to unfollow, the follow request must be accepted" }
```

### 14) Get All Follow Records (following + followers)
- Method: `GET`
- URL: `/api/follow/all-follow-records`
- Required credentials: cookie token

#### Responses
- `200`
```json
{
  "message": "all followee fetched successfully",
  "allFollowRecords": {
    "followingRecords": [
      {
        "_id": "<followRecordId>",
        "status": "accepted",
        "followee": {
          "_id": "<userId>",
          "username": "other_user"
        }
      }
    ],
    "followerRecords": [
      {
        "_id": "<followRecordId>",
        "status": "accepted",
        "follower": {
          "_id": "<userId>",
          "username": "other_user"
        }
      }
    ]
  }
}
```

### 15) Get Received Follow Requests
- Method: `GET`
- URL: `/api/follow/requests`
- Required credentials: cookie token

#### Responses
- `200`
```json
{
  "message": "all follow requests fetched successfully",
  "allFollowRequests": [
    {
      "_id": "<followRecordId>",
      "status": "pending",
      "follower": {
        "_id": "<userId>",
        "username": "request_sender"
      }
    }
  ]
}
```

### 16) Accept Follow Request
- Method: `PATCH`
- URL: `/api/follow/requests/accept/:followRecordId`
- Required credentials: cookie token

#### Responses
- `200`
```json
{
  "message": "follow request accepted",
  "newFollowRecord": {
    "follower": "<followerUserId>",
    "followee": "<myUserId>",
    "status": "accepted"
  }
}
```
- `404`
```json
{ "message": "follow request not found" }
```
- `403`
```json
{ "message": "you are not allowed to accept this follow request" }
```
- `400`
```json
{ "message": "cannot accept, follow request is already rejected" }
```
- `200` (already accepted)
```json
{ "message": "follow request is already accepted" }
```

### 17) Reject Follow Request
- Method: `PATCH`
- URL: `/api/follow/requests/reject/:followRecordId`
- Required credentials: cookie token

#### Responses
- `200`
```json
{
  "message": "request rejected successfully",
  "newFollowRecord": {
    "follower": "<followerUserId>",
    "followee": "<myUserId>",
    "status": "rejected"
  }
}
```
- `404`
```json
{ "message": "follow request not found" }
```
- `403`
```json
{ "message": "you are not allowed to accept this follow request" }
```
- `400`
```json
{ "message": "cannot reject, follow request is already accepted" }
```
- `200` (already rejected)
```json
{ "message": "follow request is already rejected" }
```

---

## App Route (Client Fallback)

### 18) Non-API Routes
- Method: `GET`
- URL pattern: any route not starting with `/api`
- Handler returns client `index.html`
- Access: Public

---

## Common Auth Error Responses (Private APIs)
From middleware:
- `401`
```json
{ "message": "token not provided, user is not authorized" }
```
- `401`
```json
{ "message": "user is not authorized" }
```

---

## Notes
- This document reflects current code behavior, including exact message strings.
- Some controllers can also throw uncaught runtime errors (for example missing `req.file` in create post), which are not standardized here because no centralized error handler response format is currently defined.
