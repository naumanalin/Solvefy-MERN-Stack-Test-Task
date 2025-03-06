# Solvefy MERN Stack Test Task

### 🚀 RESTful API Endpoints

This backend provides API endpoints for managing:

- 🧑 User authentication 

## User/Auth End Points

| No. | Title                   | Method | Route |
|----|--------------------------|--------|--------------------------------|
| 1  | Signup                  | POST   | `/api/user/signup`            |
| 2  | Login                   | POST   | `/api/user/login`             |
| 3  | Verification request    | GET    | `/api/user/verify/req`        |
| 4  | Verify account          | POST   | `/api/user/verify/account`    |
| 5  | Loged User Data         | GET    | `/api/user`                   | 
| 6  | Logout                  | GET    | `/api/user/logout`            |
| 7  | Recover/Forgot password | comming | soon ...                     |


## 🧑‍💻 Users API
### 🔹 User Signup

POST /api/user/signup - Register a new user

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


POST /api/user/login - Authenticate user
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
