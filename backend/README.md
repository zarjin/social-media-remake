# NetBook Backend

This is the backend API for NetBook, a social media platform. It provides endpoints for user authentication, profile management, post creation, and social interactions.

## Features

- User authentication with JWT
- User profile management
- Post creation, retrieval, updating, and deletion
- Social features (follow/unfollow, like/unlike)
- Image upload to Cloudinary

## Tech Stack

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Cloudinary for image storage
- Multer for file uploads

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/logout` - Logout a user
- `GET /api/auth/check-auth` - Check if user is authenticated

### User

- `POST /api/user/update-user` - Update user profile
- `PUT /api/user/following/:id` - Follow/unfollow a user
- `GET /api/user/get-auth-user` - Get authenticated user data
- `GET /api/user/get-all-users` - Get all users
- `GET /api/user/get-user/:id` - Get user by ID

### Post

- `POST /api/post/create-post` - Create a new post
- `PUT /api/post/like-post/:id` - Like/unlike a post
- `PUT /api/post/update-post/:id` - Update a post
- `DELETE /api/post/delete-post/:id` - Delete a post
- `GET /api/post/get-post/:id` - Get a post by ID
- `GET /api/post/get-all-posts` - Get all posts
- `GET /api/post/get-timeline-posts` - Get timeline posts (posts from followed users)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the server in development mode with nodemon for automatic reloading.

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Project Structure

```
backend/
├── configs/          # Configuration files (DB, Cloudinary)
├── controllers/      # Route controllers
├── middlewares/      # Custom middlewares
├── models/           # Mongoose models
├── routes/           # API routes
└── server.js         # Entry point
```

## Models

### User

- name: String (required)
- email: String (required, unique)
- password: String (required)
- profile: String (image URL)
- cover: String (image URL)
- follower: Array of User IDs
- following: Array of User IDs
- about: String
- work: String
- createdAt: Date

### Post

- userId: ObjectId (reference to User)
- desc: String
- img: String (image URL)
- likes: Array of User IDs
- createdAt: Date

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. The token is stored in an HTTP-only cookie and verified on protected routes using the `isAuthentication` middleware.

## File Upload

Files are uploaded to Cloudinary using Multer and the Cloudinary storage engine. Different folders are used for different types of uploads (profiles, covers, posts).
