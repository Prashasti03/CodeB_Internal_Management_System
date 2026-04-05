# Internal Management System (IMS)

## Overview
This project is an Internal Management System (IMS) designed to manage users, authentication, and role-based access control for Admin and Sales users.

## Features

### Authentication Module
- User Registration with Email Verification
- Secure Login using JWT
- Role-Based Access (Admin / Sales)
- Forgot Password & Reset Password via Email
- Session Management (Auto Logout)
- Secure Logout

## Tech Stack
Frontend:
- ReactJS
- Axios
- React Router

Backend:
- Spring Boot
- Spring Security
- JWT Authentication
- MySQL

## Project Structure
- frontend/ → React Application
- backend/ → Spring Boot APIs

## Setup Instructions

### Frontend
```bash
cd frontend
npm install
npm run dev

### Backend
cd backend
./mvnw spring-boot:run


---

# 9. END USER DOCUMENTATION

Use this in submission:

---

## User Authentication Module – End User Guide

### 1. Registration
- User fills Name, Email, Password
- Select Role (Admin / Sales)
- Receives email verification link

---

### 2. Login
- Enter email and password
- Redirected to dashboard on success

---

### 3. Forgot Password
- Click “Forgot Password”
- Enter registered email
- Receive reset link via email

---

### 4. Reset Password
- Open email link
- Enter new password
- Login again

---

### 5. Dashboard Access
- Admin → full access
- Sales → limited access

---

### 6. Logout
- Click logout button
- Session cleared securely

---

### 7. Session Timeout
- Auto logout after inactivity / token expiry

---
