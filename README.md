# Internal Management System (IMS)

## Overview
This project is an Internal Management System (IMS) designed to manage users, authentication, and role-based access control for Admin and Sales users. It includes secure authentication mechanisms and an admin-controlled Group Management module.

## Features

### Authentication Module
- User Registration with Email Verification
- Secure Login using JWT
- Role-Based Access (Admin / Sales)
- Forgot Password & Reset Password via Email
- Session Management (Auto Logout)
- Secure Logout

### Group Management Module (Admin Only)
- Create new groups
- Prevent duplicate group creation
- View all groups
- Update existing group details
- Activate / Deactivate groups if no chains are attached to it, else if any is linked with the group, it cannot be deactivated
- Role-based restriction (Only Admin can manage groups)
- Proper error handling with user-friendly messages

## Tech Stack
Frontend:
- ReactJS
- Axios
- React Router
- Bootstrap

Backend:
- Spring Boot
- Spring Security
- JWT Authentication
- MySQL
- JPA / Hibernate

## Project Structure
- frontend/ → React Application
- backend/ → Spring Boot APIs

## Setup Instructions

### Frontend
```bash
cd frontend
npm install
npm run dev
Deployed on Netlify - 'https://idyllic-pastelito-b100f6.netlify.app'

### Backend
cd backend
./mvnw spring-boot:run
Deployed on Render - 'https://codeb-internal-management-system.onrender.com'


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

### 6. Group Management (Admin Only)
- Navigate to Groups section
- Add new group
- Edit existing group
- Toggle group status (Active/Inactive) based on the condition that no chains are linked to it
- Duplicate group names are restricted with proper error messages

---

### 7. Logout
- Click logout button
- Session cleared securely

---

### 8. Session Timeout
- Auto logout after inactivity / token expiry

---

### 9. Security Features
- JWT-based authentication
- Role-based authorization using Spring Security
- Protected APIs
- Secure password handling
- CORS configuration for frontend-backend communication
