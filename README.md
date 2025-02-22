# Task Management Application

## Overview

Demo Link: https://drive.google.com/file/d/1Fs8-AKNKbAkFHlpz7SSsz97ZLKdY1tWj/view?usp=sharing

Salary expectations per month: $2,6000

This task management application was built with **React + TypeScript** (frontend), **Node.js** (backend), and **PostgreSQL** (database).

---

## Setup Instructions

### Prerequisites

- Node.js (version 20+)
- npm (version 10+)
- Postgresql (version 16.6+)

### How to install the application

1. Clone the repository:

```bash
  git clone https://github.com/s3lven/lumaa-spring-2025-swe
  cd lumaa-spring-2025-swe
```

2. Navigate to the backend and install dependencies

```bash
  cd backend
  npm install
```

3. In a separate terminal, navigate to the frontend and install dependencies

```bash
  cd frontend
  npm install
```

### Environment Variables

Create a `.env` file in the `backend` folder and ensure that it is getting ignored by git. This file should contain the JWT secrets and database connection string.

```.env
# PostgreSQL connection string in the format:
# postgres://username:password@host:port/database
PG_CONNECTION_STRING=postgres://your_username:your_password@localhost:5432/lumaa

# JWT secret for signing/verifying tokens. Use a strong random string.
JWT_SECRET=your_strong_jwt_secret
```

Similarly, create a `.env` file in the `frontend` folder. This file should contain the backend host URL that is used in `vite.config.ts`.

```.env
# Ensure that this has the VITE_ prefix to be picked up in the Vite config:
VITE_BACKEND_HOST=http://localhost:3000
```

### Setting up the database

1. After installing Postgresql, create a new database

```bash
  psql # as a user that has database creation permissions

  CREATE DATABASE lumaa;
  \q # Leave psql
```

2. Navigate to the backend and run the migration script. This will create empty tables for `tasks` and `users`.

```bash
  cd backend
  npm run migrate:latest
```

### How to run the application

1. Navigate to the backend and run: `npm run dev`

2. In a separate terminal, navigate to the frontend and run: `npm run dev`

---

## Features

### 1. Authentication
- **Endpoints**:
  - `POST /auth/register` – Create a new user
  - `POST /auth/login` – Login user, return a JWT
- **Only authenticated users can perform task operations.**
  - **Password Hashing**: Uses `argon2` to store passwords securely.
  - **Token Verification**: Verifies the token (JWT) on each request to protected routes.

### 2. Backend

- **Endpoints**:
  - `GET /tasks` – Retrieve a list of tasks.
  - `POST /tasks` – Create a new task.
  - `PUT /tasks/:id` – Update a task (e.g., mark as complete, edit text).
  - `DELETE /tasks/:id` – Delete a task.

### 3. Frontend (React + TypeScript)

- **Login / Register**:
  - Simple forms for Register and Login.
  - Store JWT in local storage upon successful login.
  - If not authenticated, the user should not see the tasks list.
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
  - In the `vite.config.ts` file, the frontend is configred to find the backend with the `VITE_BACKEND_HOST` environment variable in `frontend/.env`.

---
