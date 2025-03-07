# Solvefy MERN Stack Test Task

### 🚀 RESTful API Endpoints

This backend provides API endpoints for managing:

- 🧑 User authentication 

## User/Auth End Points

| No. | Title                   | Method | Base URL Like              | Route                    |
|---- |-------------------------|--------|----------------------------|--------------------------|
| 1   | Signup                  | POST   | `http://localhost:3000`    | `/api/signup`           |
| 2   | Login                   | POST   | `http://localhost:3000`    | `/api/login`            |
| 3   | Dashboard               | GET    | `http://localhost:3000`    | `/api/dashboard`        |
| 4   | Upload Profile Picture  | POST   | `http://localhost:3000`    | `/api/upload/picture`   |
| 5   | Update Profile Info     | POST   | `http://localhost:3000`    | `/api/update/profile`   |
| 6   | Change Password         | POST   | `http://localhost:3000`    | `/api/change/password`  |
| 7   | Logout                  | GET    | `http://localhost:3000`    | `/api/logout`           |



## 🧑‍💻 Users API
### 🔹 User Signup

POST /api/signup - Register a new user

### 📥 Request Body (JSON):
```json
{
  "name": "Ali Khan",
  "email": "alikhan@example.com",
  "password": "123"
}
```
📤 Success JSON Response:
  ```json
{
    "success": true,
    "message": "🎉 Successfully registered! Please check your email for verification."
}
```

### 🔹 User Login


POST /api/login - Authenticate user
### 📤 Response (JSON):
```json 
{
    "success": true,
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YmVkYjk5YTY4M2Q0MTZhZGI2OWRiZiIsImVtYWlsIjoiYWxpa2hhbkBleGFtcGxlLmNvbSIsImlhdCI6MTc0MDU2MTQ2NCwiZXhwIjoxNzQxMTY2MjY0fQ.5R53XftrJ9ZuWpAOO2DPV17Dk6SHyRd8XZ2p3w4Rck8"
}
```

## 💰 Transactions API


🔗 **Live Demo**: 

📧 **Contact**: naumanalin865@gmail.com | <a href="https://noumanali.vercel.app/" target="_blank" rel="noopener noreferrer">Portfolio</a>
