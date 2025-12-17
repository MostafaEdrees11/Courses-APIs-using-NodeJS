# Courses APIs Project Documentation

## 📋 Overview

This API provides a comprehensive backend solution for managing online courses, user accounts, and authentication. Built with Node.js, it offers RESTful endpoints for course management, user administration, and secure authentication using JWT tokens.

Whether you're building a learning management system, course marketplace, or educational platform, this API provides all the essential functionality you need to get started quickly.

---

## ✌ ‍🏍 Available endPoints

| Endpoint                 | Method   | Description                                      | Auth Required            |
| ------------------------ | -------- | ------------------------------------------------ | ------------------------ |
| `/api/courses`           | `GET`    | Retrieve paginated list of all courses           | ❌ No                    |
| `/api/courses/:id`       | `GET`    | Get detailed information about a specific course | ❌ No                    |
| `/api/courses`           | `POST`   | Create a new course                              | ✅ Yes                   |
| `/api/courses/:id`       | `PATCH`  | Update an existing course                        | ✅ Yes                   |
| `/api/courses/:id`       | `DELETE` | Delete a course from the system                  | ✅ Yes                   |
| `/api/users`             | `GET`    | Retrieve list of all registered users            | ✅ Yes (Admin & Manager) |
| `/api/users/:id`         | `GET`    | Get my account information                       | ✅ Yes                   |
| `/api/users/:id`         | `PATCH`  | Update user profile information                  | ✅ Yes                   |
| `/api/users/:id`         | `DELETE` | Delete a user account from the system            | ✅ Yes (Admin & Manager) |
| `/api/auth/register`     | `POST`   | Create a new user account                        | ❌ No                    |
| `/api/auth/login`        | `POST`   | Authenticate and receive JWT token               | ❌ No                    |
| `/api/uploads/:filename` | `GET`    | Retrieve an uploaded file by filename            | ❌ No                    |

---

## Quick Start Guide

### Step 1: Set Up Environment

1. Import the **NodeJS-Courses-APIs-Environment** into your workspace
2. Configure the following variables:
   - `hostname`: Your server hostname (e.g., `localhost` or your domain)
   - `port`: Your server port (e.g., `3000`)
   - `BASE_URL`: Will be auto-constructed as `{{hostname}}:{{port}}`

### Step 2: Register & Authenticate

1. Use the **Register** endpoint in the Auth folder to create a new account
2. Use the **Login** endpoint to authenticate and receive your JWT token
3. The JWT token will be automatically saved to the `{{JWT}}` environment variable

### Step 3: Start Making Requests

- All authenticated endpoints will automatically use the `{{JWT}}` variable
- Browse the folders to explore available endpoints
- Check individual request descriptions for detailed usage information

---

## 🌐 Base URL Configuration

```
{{BASE_URL}}/api
```

The base URL is constructed from environment variables:

- **Development**: `http://localhost:3000`
- **Production**: `https://courses-apis-project-using-node-js.vercel.app`

---

## 🔐 Authentication

This API uses **JSON Web Token (JWT)** for secure authentication.

### Authentication Flow

1. **Register** a new account using `/api/auth/register`
   - Provide required user details (email, password, name, etc.)
   - Receive confirmation of account creation
2. **Login** with credentials using `/api/auth/login`
   - Submit email and password
   - Receive JWT token in response
3. **Use Token** for protected endpoints
   - Token is automatically stored in `{{JWT}}` environment variable
   - Include in Authorization header: `Bearer {{JWT}}`
   - Token is required for all course and user management operations

### Token Usage Example

```
Authorization: Bearer {{JWT}}
```

### Token Expiration

- Tokens expire after a set period (check with your backend configuration)
- When expired, simply login again to receive a new token
- Expired tokens will return a `401 Unauthorized` response

---

## 📦 API Modules

### Courses Module

Comprehensive CRUD operations for course management.

**Features:**

- Retrieve all courses with pagination support
- Get detailed information about specific courses
- Create new courses with rich metadata
- Update existing course information
- Delete courses from the system

**Use Cases:**

- Building course catalogs
- Managing educational content
- Creating learning paths
- Course administration dashboards

---

### 👥 Users Module

Complete user account management and administration.

**Features:**

- List all registered users
- Retrieve individual user profiles
- Update user information and profiles
- Delete user accounts

**Use Cases:**

- User management dashboards
- Profile management systems
- Administrative tools
- User analytics and reporting

---

### 🔑 Auth Module

Secure user registration and authentication system.

**Features:**

- New user registration with validation
- Secure login with JWT token generation
- Password encryption and security
- Token-based session management

**Use Cases:**

- User onboarding flows
- Login/logout functionality
- Session management
- Security and access control

---

### 📁 Uploads Module

File upload and retrieval operations for user content.

**Features:**

- Profile image upload and storage
- Image retrieval and serving

**Use Cases:**

- User profile pictures
- Course thumbnails
- Content media management
- Avatar systems

---

## 🌍 Environment Variables

| Variable   | Type   | Description                                 | Example                                   |
| ---------- | ------ | ------------------------------------------- | ----------------------------------------- |
| `hostname` | String | Server hostname or domain                   | `localhost` or `api.example.com`          |
| `port`     | Number | Server port number                          | `3000` or `8080`                          |
| `BASE_URL` | String | Complete base URL (auto-constructed)        | `http://localhost:3000`                   |
| `JWT`      | String | Authentication token (auto-set after login) | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

**Note:** The `JWT` variable is automatically populated after successful login. You don't need to set it manually.

---

## 📤 Response Format

All API responses follow a consistent JSON structure:

### Success Response

```json
{
  "status": "success",
  "data": {
    // Response data here
  }
}
```

### Error Response

```json
{
  "status": "error",
  "message": "Error description",
  "code": error_code
}
```

---

## ⚠️ Error Handling & Status Codes

### HTTP Status Codes

| Code  | Status                | Description                             |
| ----- | --------------------- | --------------------------------------- |
| `200` | OK                    | Request successful                      |
| `201` | Created               | Resource created successfully           |
| `400` | Bad Request           | Invalid request parameters or body      |
| `401` | Unauthorized          | Missing or invalid authentication token |
| `403` | Forbidden             | Insufficient permissions                |
| `404` | Not Found             | Resource not found                      |
| `422` | Unprocessable Entity  | Validation errors                       |
| `429` | Too Many Requests     | Rate limit exceeded                     |
| `500` | Internal Server Error | Server-side error                       |

### Common Error Scenarios

**Authentication Errors:**

- Missing token: `401 Unauthorized`
- Expired token: `401 Unauthorized`
- Invalid token: `401 Unauthorized`

**Validation Errors:**

- Missing required fields: `400 Bad Request`
- Invalid data format: `400 Bad Request`

**Resource Errors:**

- Resource not found: `404 Not Found`

---

# 🎓 Courses Module

Complete course management system with full CRUD operations. This module allows you to create, retrieve, update, and delete courses in your learning platform.

---

## 📋 Available Endpoints

| Endpoint           | Method   | Description                                      | Auth Required |
| ------------------ | -------- | ------------------------------------------------ | ------------- |
| `/api/courses`     | `GET`    | Retrieve paginated list of all courses           | ❌ No         |
| `/api/courses/:id` | `GET`    | Get detailed information about a specific course | ❌ No         |
| `/api/courses`     | `POST`   | Create a new course                              | ✅ Yes        |
| `/api/courses/:id` | `PATCH`  | Update an existing course                        | ✅ Yes        |
| `/api/courses/:id` | `DELETE` | Delete a course from the system                  | ✅ Yes        |

---

## 🔐 Authentication Requirements

- **Public Endpoints:** GET requests (retrieve courses) are publicly accessible
- **Protected Endpoints:** POST, PATCH, DELETE require valid JWT token
- **Authorization Header:** `Bearer {{JWT}}`

---

## 💡 Common Use Cases

### 1. **Course Catalog Display**

Retrieve all courses with pagination to display in your application's course catalog or marketplace.

```
GET /api/courses?limit=10&page=1
```

### 2. **Course Detail Page**

Fetch complete information about a specific course for detailed view pages.

```
GET /api/courses/{courseId}
```

### 3. **Course Creation**

Add new courses to your platform with all necessary metadata.

```
POST /api/coursesBody: { title, description, price, instructor, etc. }
```

### 4. **Course Updates**

Modify existing course information such as pricing, description, or availability.

```
PATCH /api/courses/{courseId}Body: { price: 49.99 }
```

### 5. **Course Removal**

Remove courses that are no longer available or relevant.

```
DELETE /api/courses/{courseId}
```

---

## 📊 Pagination Support

The GET all courses endpoint supports pagination:
**Query Parameters:**

- `limit`: Number of courses per page (default: 10, max: 100)
- `page`: Page number (default: 1)

---

## 🎯 Request/Response Examples

### Get All Courses Response

```json
{
  "status": "success",
  "data": {
    "courses": [
      {
        "_id": "693c8f69cf98d4b067254885",
        "title": "HTML5 course",
        "price": 890
      },
      {
        "_id": "693c8f78cf98d4b067254887",
        "title": "JS course",
        "price": 800
      },
      {
        "_id": "693c8f88cf98d4b067254889",
        "title": "Node JS course",
        "price": 1000
      }
    ]
  }
}
```

### Create Course Request

```json
{
  "status": "success",
  "data": {
    "course": {
      "_id": "693d7afaae0d54274d210a8e",
      "title": "Rust course",
      "price": 1500
    }
  }
}
```

### Update Course Request

JSON

```json
{
  "status": "success",
  "data": null
}
```

---

## ⚠️ Error Responses

**Course Not Found (404):**

```json
{
  "status": "fail",
  "message": "Course not found",
  "code": 404
}
```

**Validation Error (400):**

```json
{
  "status": "fail",
  "message": [
    {
      "type": "field",
      "value": "ss",
      "msg": "Course price must be number & between 0 to 5000$.",
      "path": "price",
      "location": "body"
    }
  ],
  "code": 400
}
```

**Unauthorized (401):**

```json
{
  "status": "error",
  "message": "Invalid JWT token",
  "code": 401
}
```

---

# 👥 Users Module

Comprehensive user management and administration system. This module provides endpoints for managing user accounts, profiles, and administrative operations.

---

## 📋 Available Endpoints

| Endpoint         | Method   | Description                           | Auth Required            |
| ---------------- | -------- | ------------------------------------- | ------------------------ |
| `/api/users`     | `GET`    | Retrieve list of all registered users | ✅ Yes (Admin & Manager) |
| `/api/users/:id` | `GET`    | Get my account information            | ✅ Yes                   |
| `/api/users/:id` | `PATCH`  | Update user profile information       | ✅ Yes                   |
| `/api/users/:id` | `DELETE` | Delete a user account from the system | ✅ Yes (Admin & Manager) |

---

## 🔐 Authentication & Authorization

- **All endpoints require authentication** with valid JWT token
- **Admin privileges required** for:
  - Viewing all users (GET /api/users)
  - Deleting user accounts (DELETE /api/users/:id)
- **Users can access/modify** their own profile data
- **Authorization Header:** `Bearer {{JWT}}`

---

## 💡 Common Use Cases

### 1. **User Management Dashboard**

Retrieve all users for administrative dashboards and user management interfaces.

```
GET /api/users
```

### 2. **User Profile Display**

Fetch detailed user information for profile page.

```
GET /api/users/{userId}
```

### 3. **Profile Updates**

Allow users to update their profile information.

```
PATCH /api/users/{userId}Body: { firstName, lastName, email, password }
```

### 4. **Account Deletion**

Remove user accounts for administrative actions.

```
DELETE /api/users/{userId}
```

---

## 🎯 Request/Response Examples

### Get All Users Response

```json
{
  "status": "success",
  "data": {
    "users": [
      {
        "profileImg": "profile.jpg",
        "_id": "694194632aa39151bdcf5b25",
        "firstName": "Anas",
        "lastName": "Mostafa",
        "email": "anas@gmail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkFhYWExQGdtYWlsLmNvbSIsImlkIjoiNjk0MTk0NjMyYWEzOTE1MWJkY2Y1YjI1Iiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzY1OTA1NTA3LCJleHAiOjE3NjU5MDU1Njd9.98WOLQZw0gGOUAesVItTYVXS_xxE1s8AxcsBFDXPu-k",
        "role": "ADMIN"
      },
      {
        "profileImg": "profile.jpg",
        "_id": "6941aacba6a4cf5186edd5e3",
        "firstName": "Mostafa",
        "lastName": "Edrees",
        "email": "mostafa@gmail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vc3RhZmFAZ21haWwuY29tIiwiaWQiOiI2OTQxYWFjYmE2YTRjZjUxODZlZGQ1ZTMiLCJyb2xlIjoiTUFOQUdFUiIsImlhdCI6MTc2NTkxMTI0MywiZXhwIjoxNzY1OTExMzAzfQ.VGIFk6FBtg3x9lIZlXZZBM7kCQqF-Z5j_7jf22OZvrM",
        "role": "MANAGER"
      },
      {
        "_id": "69428e2b306de0f61972345e",
        "firstName": "Nour",
        "lastName": "Mostafa",
        "email": "nour@gmail.com",
        "role": "USER",
        "profileImg": "user-1765969451178.jpeg",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vdXJAZ21haWwuY29tIiwiaWQiOiI2OTQyOGUyYjMwNmRlMGY2MTk3MjM0NWUiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc2NTk2OTQ1MSwiZXhwIjoxNzY1OTY5NTExfQ._eJ7NtKWKM_8okKYKycZvCBtyIViSO8J3WMuWdqbW_E"
      }
    ]
  }
}
```

### Get Specific User Response

```json
{
  "status": "success",
  "data": {
    "user": {
      "profileImg": "profile.jpg",
      "_id": "6941aacba6a4cf5186edd5e3",
      "firstName": "Mostafa",
      "lastName": "Edrees",
      "email": "mostafa@gmail.com"
    }
  }
}
```

### Update User Request

```json
{
  "firstName": "SASA",
  "lastName": "EDREES",
  "email": "sasa@gmail.com"
}
```

### Update User Response

```json
{
  "status": "success",
  "data": null
}
```

---

## ⚠️ Error Responses

**Unauthorized Access (403):**

```json
{
  "status": "error",
  "message": "Access Denied ❌❌.",
  "code": 401
}
```

**Validation Error (400):**

```json
{
  "status": "fail",
  "message": [
    {
      "type": "field",
      "value": "SASA00",
      "msg": "firstName must consist of letters only a-z & A-Z",
      "path": "firstName",
      "location": "body"
    },
    {
      "type": "field",
      "value": "EDREES55",
      "msg": "lastName must consist of letters only a-z & A-Z",
      "path": "lastName",
      "location": "body"
    }
  ],
  "code": 400
}
```

---

## 👤 User Roles

| Role        | Permissions                                            |
| ----------- | ------------------------------------------------------ |
| **USER**    | View own profile, update own data, enroll in courses   |
| **ADMIN**   | Access to user management opertions                    |
| **MANAGER** | Full access to all course & user management operations |

---

# 🔑 Auth Module

Secure authentication system for user registration and login. This module handles user identity verification, account creation, and JWT token generation for secure API access.

---

## 📋 Available Endpoints

| Endpoint             | Method | Description                        | Auth Required |
| -------------------- | ------ | ---------------------------------- | ------------- |
| `/api/auth/register` | `POST` | Create a new user account          | ❌ No         |
| `/api/auth/login`    | `POST` | Authenticate and receive JWT token | ❌ No         |

---

## 💡 Common Use Cases

### 1. **New User Onboarding**

Register new users.

```
POST /api/auth/registerBody: { firstName, lastName, email, password, role, profileImg }
```

### 2. **User Login**

Authenticate existing users and establish secure sessions.

```
POST /api/auth/loginBody: { email, password }
```

### 3. **Session Management**

Use JWT tokens for stateless authentication across requests.

### 4. **Password Security**

Passwords are hashed and never stored in plain text.

### 5. **Token Refresh**

Login again when tokens expire to maintain access.

---

## 🎯 Request/Response Examples

### Register Request

```form-data
firstName: Mostafa
lastName: Edrees
email: mostafa@gmail.com
password: Mmmm1234
role: MANAGER
profileImg: (file upload)
```

### Register Success Response

```json
{
  "status": "success",
  "data": {
    "user": {
      "firstName": "Mostafa",
      "lastName": "Edrees",
      "email": "mostafa@gmail.com",
      "role": "MANAGER",
      "profileImg": "user-1765986138856.jpeg",
      "_id": "6942cf5bc508a4d244f1af4f",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vc3RhZmFAZ21haWwuY29tIiwiaWQiOiI2OTQyY2Y1YmM1MDhhNGQyNDRmMWFmNGYiLCJyb2xlIjoiTUFOQUdFUiIsImlhdCI6MTc2NTk4NjEzOSwiZXhwIjoxNzY1OTg2MTk5fQ.0QA2s25uy5WA5CNTQseFn-Ei08g_QdJRvY3lNX66H0A"
    }
  }
}
```

### Login Request

```json
{
  "email": "mostafa@gmail.com",
  "password": "Mmmm1234"
}
```

### Login Success Response

```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vc3RhZmFAZ21haWwuY29tIiwiaWQiOiI2OTQyY2Y1YmM1MDhhNGQyNDRmMWFmNGYiLCJyb2xlIjoiTUFOQUdFUiIsImlhdCI6MTc2NTk4NjE3NywiZXhwIjoxNzY1OTg2MjM3fQ.or5ySBj0wEVJ0imdXxwAA82Dy991_kpvf9HV2V7tlDI"
  }
}
```

**Note:** The JWT token is automatically saved to the `{{JWT}}` environment variable for use in subsequent requests.

---

## ⚠️ Error Responses

### Registration Errors

**Email Already Exists (409):**

```json
{
  "status": "fail",
  "message": "User already exists.",
  "code": 400
}
```

**Validation Error (400):**

```json
{
  "status": "fail",
  "message": [
    {
      "type": "field",
      "value": "Mostafa0",
      "msg": "firstName must consist of letters only a-z & A-Z",
      "path": "firstName",
      "location": "body"
    },
    {
      "type": "field",
      "value": "Edrees0",
      "msg": "lastName must consist of letters only a-z & A-Z",
      "path": "lastName",
      "location": "body"
    },
    {
      "type": "field",
      "value": "mmmm1234",
      "msg": "Password must be at least 8 characters, include only one uppercase letter and special characters from !@#%&. Password maximum length is 30 characters.",
      "path": "password",
      "location": "body"
    }
  ],
  "code": 400
}
```

**Weak Password (400):**

```json
{
  "status": "fail",
  "message": [
    {
      "type": "field",
      "value": "mmmm1234",
      "msg": "Password must be at least 8 characters, include only one uppercase letter and special characters from !@#%&. Password maximum length is 30 characters.",
      "path": "password",
      "location": "body"
    }
  ],
  "code": 400
}
```

### Login Errors

**Invalid Credentials (401):**

```json
{
    "status": "fail",
    "message": "This mail doen't exist.",
    "code": 400
}

{
    "status": "fail",
    "message": "Password is incorrect.",
    "code": 400
}
```

---

## 🎫 Token Usage

After successful login, use the JWT token in all protected endpoints:

### Header Format

```
Authorization: Bearer {{JWT}}
```

### Token Payload (Decoded)

```json
{
  "id": "6941acc5a6a4cf5186edd5f2",
  "email": "john.doe@example.com",
  "role": "USER",
  "iat": 1705836600,
  "exp": 1705923000
}
```

---

## 🚀 Integration Example

```javascript
// Register new userconst registerResponse = await fetch('{{BASE_URL}}/api/auth/register', {  method: 'POST',  headers: { 'Content-Type': 'application/json' },  body: JSON.stringify({    name: 'John Doe',    email: 'john@example.com',    password: 'SecurePass123!',     })});
// Loginconst loginResponse = await fetch('{{BASE_URL}}/api/auth/login', {  method: 'POST',  headers: { 'Content-Type': 'application/json' },  body: JSON.stringify({    email: 'john@example.com',    password: 'SecurePass123!'  })});
const { data } = await loginResponse.json();
const token = data.token;
// Use token for protected requestsconst coursesResponse = await fetch('{{BASE_URL}}/api/courses', {  headers: { 'Authorization': `Bearer ${token}` }});
```

---

**Created By:** AI Model at Postman
**Maintained By:** Mostafa Edrees
