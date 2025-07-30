# Node.js Authentication API

A simple and secure authentication API built with Node.js, Express, and MongoDB. This project provides user registration, login, and JWT-based authentication.

## 🚀 Features

- **User Registration** - Secure user registration with password hashing
- **User Login** - JWT-based authentication
- **Password Security** - Bcrypt password hashing
- **Input Validation** - Express-validator for request validation
- **MongoDB Integration** - Mongoose ODM for database operations
- **Environment Configuration** - Dotenv for environment variables


## 📡 API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Other Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API status and available endpoints |
| GET | `/api/users` | Get all users (testing only) |

```
## 🔒 Security Features

- **Password Hashing**: Uses bcryptjs for secure password storage
- **JWT Tokens**: JSON Web Tokens for stateless authentication
- **Input Validation**: Express-validator for request sanitization
- **Environment Variables**: Secure configuration management


## 🛡️ Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port number | 3000 |
| `MONGODB_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | Secret key for JWT signing | Required |

