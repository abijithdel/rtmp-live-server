Livestreamer Backend - Information & Setup Guide

### 1. Prerequisites
- Node.js installed
- PostgreSQL installed and running locally

### 2. Environment Setup
Create a `.env` file in the root directory with the following variables:
PORT=3000
JWT_SECRET=your_super_secret_jwt_key

### 3. Folder Initialization
Create the following directories in the root folder if they don't exist:
- `media/`
- `public/uploads/images/`

### 4. Database Initialization
The `users` table is created automatically on startup by `src/dbConfig.js`. 
You need to manually create the `livestream` table if it doesn't exist:
```sql
CREATE TABLE livestream (
    id SERIAL PRIMARY KEY,
    thumbnail VARCHAR(255),
    title VARCHAR(255),
    description VARCHAR(255),
    status VARCHAR(50),
    endview INT,
    streamkey VARCHAR(255)
);
```

### 5. Running the Application
- Install dependencies: `npm install`
- For development: `npm run dev`
- For production: `npm start`

### 6. API Endpoints
**Auth APIs:**
- `POST /api/auth/register`
  Body: `{ "username": "...", "email": "...", "password": "..." }`
- `POST /api/auth/login`
  Body: `{ "email": "...", "password": "..." }`

**Live APIs (Planned/In Progress):**
- `GET /api/live/...` (Requires Auth Token in Header: `Authorization: Bearer <token>`)

*Note: For more detailed architectural info, see `api_architecture.md` artifact.*