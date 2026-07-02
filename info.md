Livestreamer Backend - Information & Setup Guide

### 1. Prerequisites
- Node.js installed
- PostgreSQL installed and running locally

### 2. Environment Setup
Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
JWT_SECRET=super_secret_jwt_key_livestream
ORIGIN=http://localhost:5173
```

### 3. Folder Initialization
Create the following directories in the root folder if they don't exist:
- `media/`
- `public/uploads/images/`

### 4. Running the Application
- Install dependencies: `npm install`
- For development: `npm run dev`
- For production: `npm start`

### 5. API Endpoints

#### **Auth APIs:**
- `POST /api/auth/register`
  - **Headers**: `Content-Type: application/json`
  - **Body**:
    ```json
    {
      "username": "your_username",
      "email": "your_email@example.com",
      "password": "your_password"
    }
    ```
  - **Description**: Registers a new user.

- `POST /api/auth/login`
  - **Headers**: `Content-Type: application/json`
  - **Body**:
    ```json
    {
      "email": "your_email@example.com",
      "password": "your_password"
    }
    ```
  - **Description**: Logs in a user and returns a signed JWT token.

#### **Live APIs:**
- `POST /api/live/create`
  - **Headers**: `Content-Type: multipart/form-data`
  - **Body (Form Data)**:
    - `thumbnail`: File (The image file for the stream thumbnail)
    - `title`: String (The title of the livestream)
    - `description`: String (The description of the livestream)
    - `status`: String (The initial status of the stream, e.g., `pending`)
  - **Description**: Creates a new livestream entry, generates a unique 18-character stream key, and saves it to the database.

- `POST /api/live/update`
  - **Headers**: `Content-Type: application/json`
  - **Body**:
    ```json
    {
      "id": 1,
      "status": "pending"
    }
    ```
  - **Description**: Updates the status of a livestream. If the status is updated to `pending`, it deactivates the stream key. If updated to `schedule`, it activates the stream key.

- `GET /api/live/all`
  - **Headers**: `Content-Type: application/json`
  - **Body (Optional)**:
    ```json
    {
      "filter": "status_to_filter"
    }
    ```
  - **Description**: Retrieves live streams. If a `filter` is specified, retrieves only streams matching that status. Otherwise, retrieves all streams with `running` or `pending` status.

- `GET /api/live/alive`
  - **Query Parameters**:
    - `id`: The database ID of the stream (e.g., `/api/live/alive?id=1`)
  - **Description**: Retrieves data for a specific livestream.

*Note: For more detailed architectural info, see `api_architecture.md` artifact.*