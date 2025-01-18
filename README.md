# Task Management API

A **RESTful API** for managing tasks with features like user authentication, task creation, updating, deleting, and searching. Built with **Node.js**, **Express.js**, and **MongoDB**, this project includes JWT-based authentication and follows best practices for routing, middleware, and error handling.

---

## Features

1. **Authentication**:
   - User registration, login, and logout.
   - JWT-based authentication to secure routes.

2. **Task Management**:
   - Create, retrieve, update, and delete tasks.
   - Tasks are user-specific, ensuring only the task owner can view or modify their tasks.

3. **Search and Pagination**:
   - Search tasks by title using query parameters.
   - Paginate tasks for efficient data retrieval.

4. **Secure and Scalable**:
   - Password hashing with `bcrypt`.
   - Configurable environment variables via `.env`.

---

## Project Structure

task-api/ │ ├── backend/ │ ├── config/ # Database connection configuration │ ├── controllers/ # Controllers for task and auth logic │ ├── middlewares/ # Middleware for request logging, error handling, and authentication │ ├── models/ # Mongoose schemas for User and Task │ ├── routes/ # API route definitions │ ├── .env # Environment variables (not tracked by Git) │ ├── .gitignore # Ignored files and directories │ ├── app.js # Main application entry point │ └── package.json 

# Project metadata and dependencies

---

## Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v16 or later)
- **npm** (comes with Node.js)
- **MongoDB** (Local or Cloud instance)

---

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/KRITHIKus/Task-Management-API.git
   cd Task-Management-API/backend

## 2.Install Dependencies:

bash
Copy
Edit
npm install

## 3. Set Up Environment Variables

Create a `.env` file in the backend directory with the following content:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

Replace `your_mongo_connection_string` and `your_jwt_secret` with your actual MongoDB connection string and JWT secret, respectively.

---

## 4. Start the Server

### Development Mode (with nodemon):
```bash
npm run dev
```

### Production Mode:
```bash
npm start

## 5.Test the API: Use tools like Postman or cURL to interact with the API. See below for endpoint details.

### API Endpoints

#### **Authentication**
| Method | Endpoint              | Description                   |
|--------|------------------------|-------------------------------|
| POST   | `/api/auth/register`  | Register a new user           |
| POST   | `/api/auth/login`     | Log in and get a JWT token    |
| POST   | `/api/auth/logout`    | Log out the user              |

#### **Task Management**
| Method | Endpoint              | Description                             |
|--------|------------------------|-----------------------------------------|
| POST   | `/api/tasks`           | Create a new task (requires auth)       |
| GET    | `/api/tasks`           | Get all tasks (supports search/pagination) |
| GET    | `/api/tasks/:id`       | Get a specific task by its ID           |
| PUT    | `/api/tasks/:id`       | Update a specific task by its ID        |
| DELETE | `/api/tasks/:id`       | Delete a specific task by its ID        |


# API Testing Guide

You can test the API endpoints using tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/). Below are the steps and examples for testing each endpoint:

## 1. User Registration

- **Method:** `POST`
- **Endpoint:** `/api/auth/register`
- **Body:**

```json
{
    "username": "testuser",
    "password": "password123"
}
```

- **Expected Response:**

```json
{
    "message": "User registered",
    "user": {
        "_id": "user_id_here",
        "username": "testuser"
    }
}
```

## 2. User Login

- **Method:** `POST`
- **Endpoint:** `/api/auth/login`
- **Body:**

```json
{
    "username": "testuser",
    "password": "password123"
}
```

- **Expected Response:**

```json
{
    "message": "Login successful",
    "token": "jwt_token_here"
}
```

## 3. Create a Task

- **Method:** `POST`
- **Endpoint:** `/api/tasks`
- **Headers:**
  - Authorization: `Bearer jwt_token_here`
- **Body:**

```json
{
    "title": "My Task",
    "description": "Details about my task"
}
```

- **Expected Response:**

```json
{
    "_id": "task_id_here",
    "title": "My Task",
    "description": "Details about my task",
    "status": "Pending",
    "createdAt": "timestamp_here",
    "updatedAt": "timestamp_here"
}
```

## 4. Get All Tasks

- **Method:** `GET`
- **Endpoint:** `/api/tasks`
- **Headers:**
  - Authorization: `Bearer jwt_token_here`
- **Query Parameters (Optional):**
  - `search`: Search by task title
  - `page`: Page number (default: 1)
  - `limit`: Number of tasks per page (default: 10)

- **Expected Response:**

```json
{
    "tasks": [
        {
            "_id": "task_id_here",
            "title": "My Task",
            "description": "Details about my task",
            "status": "Pending",
            "createdAt": "timestamp_here",
            "updatedAt": "timestamp_here"
        }
    ],
    "total": 1
}
```

## 5. Get a Task by ID

- **Method:** `GET`
- **Endpoint:** `/api/tasks/:id`
- **Headers:**
  - Authorization: `Bearer jwt_token_here`

- **Expected Response:**

```json
{
    "_id": "task_id_here",
    "title": "My Task",
    "description": "Details about my task",
    "status": "Pending",
    "createdAt": "timestamp_here",
    "updatedAt": "timestamp_here"
}
```

## 6. Update a Task

- **Method:** `PUT`
- **Endpoint:** `/api/tasks/:id`
- **Headers:**
  - Authorization: `Bearer jwt_token_here`
- **Body:**

```json
{
    "title": "Updated Task Title",
    "status": "Completed"
}
```

- **Expected Response:**

```json
{
    "_id": "task_id_here",
    "title": "Updated Task Title",
    "description": "Details about my task",
    "status": "Completed",
    "createdAt": "timestamp_here",
    "updatedAt": "timestamp_here"
}
```

## 7. Delete a Task

- **Method:** `DELETE`
- **Endpoint:** `/api/tasks/:id`
- **Headers:**
  - Authorization: `Bearer jwt_token_here`

- **Expected Response:**

```json
{
    "message": "Task deleted successfully"
}

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **Logging**: Morgan

---
