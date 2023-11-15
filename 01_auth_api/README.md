# serverless-backend

test-app

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your development machine
- Docker installed on your machine for containerization

## Getting Started

1. Clone this repository:

   git clone https://github.com/yourusername/your-app-name.git

2. Navigate to the project directory:
   cd your-app-name

3. Create a .env file in the root directory with the following environment variables:

- DB_USER=your_db_user
- DB_HOST=localhost
- DB_DATABASE=your_db_name
- DB_PASSWORD=your_db_password
- PORT=port
- SECRET_KEY=your_secret_key
- REFRESH_SECRET_KEY=your_refresh_secret_key

4. Build and start the Docker containers:

   docker-compose up --build
   Your app should now be running and accessible at http://localhost:5000.

## Usage

- Register a new user by making a POST request to /auth/sign-up.
- Sign in using credentials by making a POST request to /auth/sign-in.
- Access protected routes by including the Authorization header with a valid access token:
  Authorization: Bearer <access_token>
- Find the country associated with the user's IP address using a supabase client making a GET request to /locate.
- Storing and retrieving users JSON data to the postgresSQL database making a PUT and GET request to /me/title_of_data and providing a valid access token:
  Authorization: Bearer <access_token>
- Shorten long URLs making a POST request to /shorten and providing in request body an original link.
- Retrieving an original url by making a GET request to /:shortId

## Acknowledgments

- Express.js
- PostgreSQL
- Docker
- bcrypt
- jsonwebtoken
- @supabase/supabase-js
- uuid
