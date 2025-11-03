# 🧩 API Documentation

> This document describes all API endpoints used in the **ProciourOne** application, including request payloads and example responses.

---

## 🏗️ Base URL

**Production:** `https://api.prociourone.com/v1`  
**Development:** `http://122.163.121.176:3005/v1`

---

## 🧑‍💼 AUTHENTICATION

### 🔐 Login

**Endpoint:**  
`POST /AuthMicroservices/login`

**Headers: Payload **

````json
{
    "username": "vendor",
    "password": "vendor@123"
}

``` responce json

{
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InZlbmRvciIsInJvbGUiOiJWZW5kb3IiLCJleHAiOjE3NjIxNzI3ODd9.fCKahZiFoL5Lgk65l0PtRrlN1dU6L-8VD0Ogg8qPTq4",
    "email": "vendor23@gmail.com",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InZlbmRvciIsImV4cCI6MTc2MjE3MzY4N30.Lk94P5AFfgGONmS3CGKVNCAK113ME0C9WRA76HKSzuQ",
    "role": "Vendor",
    "user_id": 2,
    "username": "vendor"
  },
  "isSuccess": true,
  "message": "Login successful",
  "statusCode": 200
}
````
