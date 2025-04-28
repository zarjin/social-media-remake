# NetBook Frontend

This is the frontend application for NetBook, a social media platform built with React and Vite.

## Features

- User authentication (register, login, logout)
- Profile management with customizable profile and cover images
- Post creation, viewing, and interaction (likes)
- Follow/unfollow functionality
- Timeline view with posts from followed users
- Responsive design with Tailwind CSS

## Tech Stack

- React 19
- React Router v7
- Tailwind CSS
- Axios for API requests
- Context API for state management
- React Toastify for notifications
- Lucide React for icons

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview`

Locally preview the production build.

### `npm run lint`

Runs ESLint to check for code quality issues.

## Environment Variables

Create a `.env` file in the frontend directory with the following variables:

```
VITE_AUTH_API=http://localhost:5000/api/auth
VITE_USER_API=http://localhost:5000/api/user
VITE_POST_API=http://localhost:5000/api/post
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React Context providers
├── pages/          # Page components
├── App.jsx         # Main application component
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## Dependencies

- React and React DOM
- React Router for navigation
- Axios for API requests
- React Toastify for notifications
- Tailwind CSS for styling
- Lucide React for icons
- clsx and tailwind-merge for conditional class names
