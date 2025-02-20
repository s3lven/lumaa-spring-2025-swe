# Task Management Application

## Overview

This task management application was built with **React + TypeScript** (frontend), **Node.js** (backend), and **PostgreSQL** (database). The application supports:

1. **Register** (sign up) and **Log in** (sign in) users.
2. After logging in, allow users to:
   - **View a list of tasks**.
   - **Create a new task**.
   - **Update an existing task** (e.g., mark complete, edit).
   - **Delete a task**.

---

## Setup Instructions

### Prerequisites

- Node.js (version 20+)
- npm (version 10+)
- Postgresql (version 16.6+)

### How to install and run the application

1. Clone the repository:

```bash
  git clone https://github.com/s3lven/lumaa-spring-2025-swe
  cd lumaa-spring-2025-swe
```

2. Navigate to the backend and install dependencies

```bash
  cd backend
  npm install
  npm run dev
```

3. In a separate terminal, navigate to the frontend and install dependencies

```bash
  cd frontend
  npm install
  npm run dev
```

### Environment Variables

Create a `.env` file and ensure that it is getting ignored by git. This file should contain the JWT secrets and database connection string.

```.env
# PostgreSQL connection string in the format:
# postgres://username:password@host:port/database
PG_CONNECTION_STRING=postgres://your_username:your_password@localhost:5432/your_database

# If needed, break up the connection string into
DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, and DB_PORT variables.

# JWT secret for signing/verifying tokens. Use a strong random string.
JWT_SECRET=your_strong_jwt_secret
```

### How to setup the database

Navigate to the backend and run the migration script. This will create empty tables for `tasks` and `users`.

```bash
  cd backend
  npm run migrate:latest
```

---

## Features

### 1. Authentication

- **User Model**:
  - `id`: Primary key
  - `username`: Unique string
  - `password`: Hashed string
- **Endpoints**:
  - `POST /auth/register` – Create a new user
  - `POST /auth/login` – Login user, return a token (e.g., JWT)
- **Secure the Tasks Routes**: Only authenticated users can perform task operations.
  - **Password Hashing**: Uses `argon2` to store passwords securely.
  - **Token Verification**: Verifies the token (JWT) on each request to protected routes.

### 2. Backend

- **Tasks CRUD**:
  - `GET /tasks` – Retrieve a list of tasks.
  - `POST /tasks` – Create a new task.
  - `PUT /tasks/:id` – Update a task (e.g., mark as complete, edit text).
  - `DELETE /tasks/:id` – Delete a task.
- **Task Model**:
  - `id`: Primary key
  - `title`: string
  - `description`: string (optional)
  - `isComplete`: boolean (default `false`)
- **Database**: PostgreSQL
  - Provide instructions/migrations to set up:
    - `users` table (with hashed passwords)
    - `tasks` table

### 3. Frontend (React + TypeScript)

- **Login / Register**:
  - Simple forms for **Register** and **Login**.
  - Store JWT (e.g., in `localStorage`) upon successful login.
  - If not authenticated, the user should not see the tasks page.
- **Tasks Page**:
  - Fetch tasks from `GET /tasks` (including auth token in headers).
  - Display the list of tasks.
  - Form to create a new task (`POST /tasks`).
  - Buttons/fields to update a task (`PUT /tasks/:id`).
  - Button to delete a task (`DELETE /tasks/:id`).
- **Navigation**:
  - Show `Login`/`Register` if not authenticated.
  - Show `Logout` if authenticated.
- **Setup**:
  - `npm install` then `npm start` (or `npm run dev`) to run.
  - Document how to point the frontend at the backend (e.g., `.env` file, base URL).

---

## Other Deliverables
- Video Demo
- Salary Expectations per Month
