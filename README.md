# Portfolio & Blog API

A secure, robust RESTful API built with Node.js, Express, and MongoDB for managing a personal portfolio website with blog functionality.

## Live Demo

- **API URL**: [Your deployed API URL]
- **Frontend URL**: [Your deployed frontend URL]

## Features

- User authentication with JWT
- Password hashing with bcrypt
- CRUD operations for Projects
- CRUD operations for Blog Posts
- Comment system for blog posts
- Contact form message handling
- Protected routes with authorization
- Security headers with Helmet
- MVC architecture pattern

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- Helmet
- CORS

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/users/register` | Register a new user | Public |
| POST | `/api/users/login` | Login and get JWT token | Public |
| GET | `/api/users/profile` | Get user profile | Protected |

### Projects

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/projects` | Get all projects | Public |
| GET | `/api/projects/:id` | Get a single project | Public |
| POST | `/api/projects` | Create a new project | Protected |
| PUT | `/api/projects/:id` | Update a project | Protected |
| DELETE | `/api/projects/:id` | Delete a project | Protected |

### Blog Posts

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blog` | Get all blog posts | Public |
| GET | `/api/blog/:id` | Get a single post with comments | Public |
| POST | `/api/blog` | Create a new post | Protected |
| PUT | `/api/blog/:id` | Update a post (author only) | Protected |
| DELETE | `/api/blog/:id` | Delete a post (author only) | Protected |

### Comments

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blog/:postId/comments` | Get comments for a post | Public |
| POST | `/api/blog/:postId/comments` | Add a comment to a post | Protected |

### Contact

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/contact` | Send a contact message | Public |
| GET | `/api/contact` | Get all messages | Protected |

## Data Models

### User
- `username` (String, required, unique)
- `email` (String, required, unique)
- `password` (String, required, min 6 chars)

### Project
- `title` (String, required)
- `description` (String, required)
- `imageUrl` (String, optional)
- `repoUrl` (String, optional)
- `liveUrl` (String, optional)
- `user` (ObjectId, ref: User)

### BlogPost
- `title` (String, required)
- `content` (String, required)
- `author` (ObjectId, ref: User)
- `timestamps` (auto-generated)

### Comment
- `body` (String, required)
- `author` (ObjectId, ref: User)
- `post` (ObjectId, ref: BlogPost)
- `timestamps` (auto-generated)

### Message
- `name` (String, required)
- `email` (String, required)
- `message` (String, required)
- `timestamps` (auto-generated)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [your-repo-url]
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Start the server
```bash
# Development
npm run dev

# Production
npm start
```

The API will be running at `http://localhost:5000`

## Authentication

Protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

To get a token:
1. Register a new user via `POST /api/users/register`
2. Or login via `POST /api/users/login`

## Request/Response Examples

### Register User
```json
POST /api/users/register
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Project
```json
POST /api/projects
Authorization: Bearer <token>
{
  "title": "My Awesome Project",
  "description": "A description of my project",
  "imageUrl": "https://example.com/image.jpg",
  "repoUrl": "https://github.com/user/repo",
  "liveUrl": "https://myproject.com"
}
```

## Deployment

This API is designed to be deployed on platforms like:
- Render
- Heroku
- Railway
- Vercel (serverless)

Make sure to set all environment variables in your deployment platform.

## License

MIT
