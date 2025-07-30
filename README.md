# Authentication API

A simple authentication API built with Node.js, Express.js, and MongoDB. This API provides secure user registration and login with JWT-based authentication.

## Features

- ✅ User registration with password hashing
- ✅ Secure login with JWT tokens
- ✅ Password validation and hashing with bcrypt
- ✅ Input validation with express-validator
- ✅ MongoDB integration with Mongoose

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- npm or yarn

## Installation

1. Clone the repository or navigate to your project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   PORT=3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication Routes

#### 1. Register User
- **POST** `/api/auth/register`
- **Description**: Register a new user account
- **Body**:
  ```json
  {
    "username": "john_doe",
    "gmail": "john@example.com",
    "password": "SecurePass123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "_id": "user_id",
      "username": "john_doe",
      "gmail": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
  ```

#### 2. Login User
- **POST** `/api/auth/login`
- **Description**: Authenticate user and get JWT token
- **Body**:
  ```json
  {
    "gmail": "john@example.com",
    "password": "SecurePass123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "user": {
      "_id": "user_id",
      "username": "john_doe",
      "gmail": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
  ```

### Utility Routes

#### Health Check
- **GET** `/`
- **Description**: Check if API is running
- **Response**:
  ```json
  {
    "message": "Authentication API is running",
    "endpoints": {
      "register": "POST /api/auth/register",
      "login": "POST /api/auth/login"
    }
  }
  ```

#### Get All Users (Testing - Remove in Production)
- **GET** `/api/users`
- **Description**: Get all users (for testing purposes)
- **Response**: Array of users without passwords

## Validation Rules

### Registration Validation
- **Username**: 3-50 characters, alphanumeric only
- **Email**: Valid email format
- **Password**: Minimum 6 characters, must contain uppercase, lowercase, and number

### Login Validation
- **Email**: Valid email format
- **Password**: Required

## Security Features

- 🔐 Password hashing with bcrypt (12 salt rounds)
- 🎫 JWT tokens with 7-day expiration
- ✅ Input validation and sanitization
- 🔒 Password strength requirements
- 🚫 Duplicate username/email prevention

## Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message",
  "details": "Additional error details (if available)"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (invalid credentials)
- `404`: Not Found
- `500`: Internal Server Error

## Testing the API

### Using cURL

1. **Register a new user**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "username": "testuser",
       "gmail": "test@example.com",
       "password": "SecurePass123"
     }'
   ```

2. **Login**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "gmail": "test@example.com",
       "password": "SecurePass123"
     }'
   ```

### Using Postman

1. Import the API endpoints into Postman
2. Set the base URL to `http://localhost:3000`

## Project Structure

```
nodeMongo/
├── index.js              # Main server file
├── package.json          # Dependencies and scripts
├── .env                  # Environment variables
├── README.md            # This file
├── models/
│   └── User.js          # User model schema
├── middleware/
│   └── validate.js      # Input validation middleware
└── routes/
    └── auth.js          # Authentication routes
```

## Environment Variables

Create a `.env` file with the following variables:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=3000
```

## Production Considerations

1. **Security**:
   - Change the JWT secret to a strong, unique key
   - Use HTTPS in production
   - Implement rate limiting
   - Add CORS configuration if needed

2. **Database**:
   - Use a production MongoDB instance
   - Set up proper database indexes
   - Implement database connection pooling

3. **Monitoring**:
   - Add logging (Winston, Morgan)
   - Set up error monitoring
   - Implement health checks

## License

This project is licensed under the ISC License.

## Support

For issues and questions, please create an issue in the repository. 