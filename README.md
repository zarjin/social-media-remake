# NetBook - Social Media Application

NetBook is a full-stack social media application that allows users to connect, share posts, and interact with each other. The application features user authentication, profile management, post creation, and social interactions like following users and liking posts.

## Features

- **User Authentication**
  - Register and login with JWT authentication
  - Protected routes for authenticated users
  - Public routes for non-authenticated users

- **User Profiles**
  - Customizable profile and cover images
  - User information (name, about, work)
  - Follow/unfollow functionality
  - View followers and following lists

- **Posts**
  - Create, read, update, and delete posts
  - Upload images with posts
  - Like/unlike posts
  - Timeline view with posts from followed users

- **UI/UX**
  - Responsive design with Tailwind CSS
  - Modern UI with animations
  - Toast notifications for user feedback

## Tech Stack

### Frontend
- React 19
- React Router v7
- Tailwind CSS
- Axios for API requests
- Context API for state management
- React Toastify for notifications
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Cloudinary for image storage
- Multer for file uploads

## Project Structure

```
social-media-remake/
├── frontend/             # React frontend application
│   ├── public/           # Public assets
│   ├── src/              # Source files
│   │   ├── components/   # Reusable components
│   │   ├── context/      # Context providers
│   │   ├── pages/        # Page components
│   │   └── ...
│   └── ...
├── backend/              # Node.js backend application
│   ├── configs/          # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middlewares/      # Custom middlewares
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   └── ...
└── ...
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Cloudinary account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zarjin/social-media-remake.git
   cd social-media-remake
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Create `.env` files in both frontend and backend directories (see Environment Variables section below).

### Environment Variables

#### Backend (.env)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### Frontend (.env)
```
VITE_AUTH_API=http://localhost:5000/api/auth
VITE_USER_API=http://localhost:5000/api/user
VITE_POST_API=http://localhost:5000/api/post
```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## License

This project is licensed under the ISC License.
