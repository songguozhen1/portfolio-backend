# Portfolio & Blog API

A secure, robust RESTful API built with Node.js, Express, and MongoDB for managing a personal portfolio website with blog functionality.

## Live Demo

- **API URL**: https://portfolio-backend-gamma-blond.vercel.app
- **Frontend URL**: https://portfolio-frontend-zz0508s-projects.vercel.app
- **Source Code**: https://github.com/songguozhen1/portfolio-backend

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

#### Register User
- **Endpoint**: `POST /api/users/register`
- **Purpose**: Create a new user account
- **Access**: Public
- **Request Body**:
  ```json
  {
    "username": "string (required, unique)",
    "email": "string (required, unique, valid email)",
    "password": "string (required, min 6 characters)"
  }
  ```
- **Response**: User object with JWT token

#### Login
- **Endpoint**: `POST /api/users/login`
- **Purpose**: Authenticate user and receive JWT token
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "string (required)",
    "password": "string (required)"
  }
  ```
- **Response**: User object with JWT token

#### Get Profile
- **Endpoint**: `GET /api/users/profile`
- **Purpose**: Get authenticated user's profile
- **Access**: Protected (requires JWT token)
- **Headers**: `Authorization: Bearer <token>`
- **Response**: User object without password

---

### Projects

#### Get All Projects
- **Endpoint**: `GET /api/projects`
- **Purpose**: Retrieve all projects
- **Access**: Public
- **Response**: Array of project objects

#### Get Single Project
- **Endpoint**: `GET /api/projects/:id`
- **Purpose**: Retrieve a specific project by ID
- **Access**: Public
- **Params**: `id` - MongoDB ObjectId of the project
- **Response**: Single project object

#### Create Project
- **Endpoint**: `POST /api/projects`
- **Purpose**: Create a new project
- **Access**: Protected (requires JWT token)
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "title": "string (required)",
    "description": "string (required)",
    "imageUrl": "string (optional)",
    "repoUrl": "string (optional)",
    "liveUrl": "string (optional)"
  }
  ```
- **Response**: Created project object

#### Update Project
- **Endpoint**: `PUT /api/projects/:id`
- **Purpose**: Update an existing project
- **Access**: Protected (requires JWT token, must be project owner)
- **Headers**: `Authorization: Bearer <token>`
- **Params**: `id` - MongoDB ObjectId of the project
- **Request Body**: Same as Create Project (all fields optional)
- **Response**: Updated project object

#### Delete Project
- **Endpoint**: `DELETE /api/projects/:id`
- **Purpose**: Delete a project
- **Access**: Protected (requires JWT token, must be project owner)
- **Headers**: `Authorization: Bearer <token>`
- **Params**: `id` - MongoDB ObjectId of the project
- **Response**: Success message

---

### Blog Posts

#### Get All Blog Posts
- **Endpoint**: `GET /api/blog`
- **Purpose**: Retrieve all blog posts
- **Access**: Public
- **Response**: Array of blog post objects with author info

#### Get Single Blog Post
- **Endpoint**: `GET /api/blog/:id`
- **Purpose**: Retrieve a specific blog post with comments
- **Access**: Public
- **Params**: `id` - MongoDB ObjectId of the blog post
- **Response**: Blog post object with populated author and comments

#### Create Blog Post
- **Endpoint**: `POST /api/blog`
- **Purpose**: Create a new blog post
- **Access**: Protected (requires JWT token)
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "title": "string (required)",
    "content": "string (required)"
  }
  ```
- **Response**: Created blog post object

#### Update Blog Post
- **Endpoint**: `PUT /api/blog/:id`
- **Purpose**: Update an existing blog post
- **Access**: Protected (requires JWT token, must be post author)
- **Headers**: `Authorization: Bearer <token>`
- **Params**: `id` - MongoDB ObjectId of the blog post
- **Request Body**:
  ```json
  {
    "title": "string (optional)",
    "content": "string (optional)"
  }
  ```
- **Response**: Updated blog post object

#### Delete Blog Post
- **Endpoint**: `DELETE /api/blog/:id`
- **Purpose**: Delete a blog post
- **Access**: Protected (requires JWT token, must be post author)
- **Headers**: `Authorization: Bearer <token>`
- **Params**: `id` - MongoDB ObjectId of the blog post
- **Response**: Success message

---

### Comments

#### Get Comments for Post
- **Endpoint**: `GET /api/blog/:postId/comments`
- **Purpose**: Retrieve all comments for a specific blog post
- **Access**: Public
- **Params**: `postId` - MongoDB ObjectId of the blog post
- **Response**: Array of comment objects with author info

#### Add Comment
- **Endpoint**: `POST /api/blog/:postId/comments`
- **Purpose**: Add a comment to a blog post
- **Access**: Protected (requires JWT token)
- **Headers**: `Authorization: Bearer <token>`
- **Params**: `postId` - MongoDB ObjectId of the blog post
- **Request Body**:
  ```json
  {
    "body": "string (required)"
  }
  ```
- **Response**: Created comment object

---

### Contact

#### Send Contact Message
- **Endpoint**: `POST /api/contact`
- **Purpose**: Submit a contact form message
- **Access**: Public
- **Request Body**:
  ```json
  {
    "name": "string (required)",
    "email": "string (required, valid email)",
    "message": "string (required)"
  }
  ```
- **Response**: Success message with created message object

#### Get All Contact Messages
- **Endpoint**: `GET /api/contact`
- **Purpose**: Retrieve all contact form submissions
- **Access**: Protected (requires JWT token)
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Array of message objects

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
git clone https://github.com/songguozhen1/portfolio-backend.git
cd portfolio-backend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```
**Note**: Port 5001 is used instead of 5000 to avoid conflicts with macOS ControlCenter.

4. (Optional) Seed the database with test data
```bash
node seed.js
```
This creates an admin user (admin@portfolio.com / admin123) and sample projects, blog posts, comments, and messages.

5. Start the server
```bash
# Development
npm run dev

# Production
npm start
```

The API will be running at `http://localhost:5001`

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
