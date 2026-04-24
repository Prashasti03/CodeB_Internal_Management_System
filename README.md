Invoice Management Module

Github Link - https://github.com/Prashasti03/CodeB_Internal_Management_System

README.md

# Internal Management System (IMS)

Overview
The Internal Management System (IMS) is a full-stack web application designed to manage internal business operations with secure authentication and role-based access control.
It enables Admin users to manage organizational hierarchy (Groups, Chains, Brands, Zones) and allows Sales users to create and manage estimates and generate invoices for clients. The system ensures proper validation, security, and data integrity across all modules and automates the financial workflow from estimate creation to invoice generation.
________________________________________
Live Links
•	Frontend (Vercel)
https://code-b-internal-management-system.vercel.app
•	Backend (Render)
https://codeb-internal-management-system.onrender.com
•	GitHub Repository
https://github.com/Prashasti03/CodeB_Internal_Management_System
________________________________________
Features
Authentication Module
•	User Registration with Email Verification
•	Secure Login using JWT
•	Role-Based Access (Admin / Sales)
•	Forgot Password & Reset Password via Email
•	Session Management (Auto Logout)
•	Secure Logout
•	Protected Routes (Frontend + Backend)
________________________________________
Group Management Module (Admin Only)
•	Create new groups
•	Prevent duplicate group creation
•	View all groups
•	Update existing group details
•	Activate / Deactivate groups only if no chains are attached
•	Role-based restriction (Admin only)
•	Proper error handling with user-friendly messages
________________________________________
Chain Management Module (Admin Only)
•	Add new chains with:
o	Company Name
o	GST Number
o	Associated Group
•	View all chains
•	Update chain details
•	Soft delete chains only if not associated with any brands
•	Filter chains by group
•	Dropdown populated with only active groups
•	Relationship handling (Each chain linked to a group)
•	Role-based restriction (Admin only)
________________________________________
Brand Management Module (Admin Only)
•	Add new Brand associated with a Chain
•	View all brands
•	Update brand details
•	Soft delete brands only if not associated with any zones
•	Filter brands by chains or groups
•	Each brand is linked to a chain
•	Role-based restriction (Admin only)
________________________________________
Zone Management Module (Admin Only)
•	Add new zone associated with a brand
•	View all zones
•	Update zone details
•	Soft delete zones with confirmation popup
•	Filter zones based on brands, chains, and groups
•	Role-based restriction (Admin only)
________________________________________
Estimate Management Module (Admin & Sales)
The Estimate Management Module enables users to create, update, and manage sales estimates linked to clients and their organizational hierarchy.
Key Functionalities
Create Estimate
•	Input client details:
o	Group Name
o	Chain ID
o	Brand Name
o	Zone Name
•	Add service details:
o	Service description
o	Quantity (Units)
o	Cost per unit
•	Automatically calculates total cost
•	Define delivery date and delivery details
•	Saves estimate and links it with Chain ID for future invoice generation
View Estimates
•	Display all estimates in a structured table
•	Includes key details like:
o	Chain ID
o	Service
o	Quantity
o	Cost
o	Total Cost
o	Delivery Date
Update Estimate
•	Edit existing estimate details
•	Automatically recalculates total cost
•	Updates timestamp for tracking changes
Delete Estimate
•	Delete estimate with confirmation popup
•	Prevents accidental deletion
Purpose
•	Acts as a base for Invoice Generation
•	Improves tracking of services and costs
•	Ensures accurate financial workflow
________________________________________
Invoice Management Module (Admin & Sales)
The Invoice Management Module automates invoice generation based on estimates and ensures efficient handling of payments and client communication.
Key Functionalities
Generate Invoice
•	“Generate Invoice” button added in Estimate Dashboard
•	Fetches all estimate details automatically
•	Creates invoice linked to estimate_id
•	Generates unique invoice number automatically
•	Only email field is editable
Create Invoice
•	Prefilled form using estimate data
•	Non-editable fields ensure data consistency
•	Generates invoice instantly after payment
PDF Generation
•	Automatically generates invoice in PDF format
•	Includes:
o	Invoice Number
o	Estimate ID
o	Service Details
o	Quantity & Pricing
o	Total Amount
o	Client Email
Download Invoice
•	Users can download invoice as PDF from dashboard
Email Integration
•	Invoice PDF is sent to client email automatically
•	Uses Spring Boot Mail Sender with attachment support
Manage Invoice Dashboard
•	View all generated invoices
•	Displays:
o	Invoice Number
o	Estimate ID
o	Email ID
Search Functionality
•	Search invoices based on:
o	Invoice Number
o	Estimate ID
o	Chain ID
o	Company Name
Update Invoice
•	Only email ID can be updated
•	Ensures invoice integrity with estimate
Delete Invoice
•	Delete invoice with confirmation popup
•	Allows regeneration from estimate if needed
Purpose
•	Automates financial workflow
•	Reduces manual errors
•	Improves client communication
•	Ensures compliance with structured invoice generation
________________________________________
Tech Stack
Frontend
•	ReactJS (Vite)
•	Axios
•	React Router
•	Bootstrap
Backend
•	Spring Boot
•	Spring Security
•	JWT Authentication
•	MySQL (Aiven Cloud)
•	JPA / Hibernate
•	JavaMailSender (Email Service)
•	OpenPDF (PDF Generation)
________________________________________
Project Structure
•	frontend/ → React Application
•	backend/ → Spring Boot APIs
________________________________________
Setup Instructions
Frontend
cd frontend
npm install
npm run dev
Deployed on Vercel:
https://code-b-internal-management-system.vercel.app
________________________________________
Backend
cd backend
./mvnw spring-boot:run
Deployed on Render:
https://codeb-internal-management-system.onrender.com
________________________________________
User Guide
1. Registration
•	Enter Name, Email, Password
•	Select Role (Admin / Sales)
•	Verify email via link
2. Login
•	Enter credentials
•	Redirect to dashboard
3. Forgot Password
•	Enter registered email
•	Receive reset link
4. Reset Password
•	Open link from email
•	Enter new password
5. Dashboard Access
•	Admin → Full access
•	Sales → Limited access
________________________________________
6. Estimate to Invoice Flow
•	Create Estimate
•	Click “Generate Invoice”
•	Enter email
•	System:
o	Generates invoice
o	Creates PDF
o	Sends email with attachment
o	Stores invoice in database
________________________________________
7. Invoice Management
•	View all invoices
•	Download invoice PDF
•	Update email
•	Delete invoice with confirmation
________________________________________
8. Logout
•	Secure logout
•	Clears session
________________________________________
9. Session Timeout
•	Auto logout after inactivity
________________________________________
10. Security Features
•	JWT-based authentication
•	Role-based authorization
•	Protected APIs
•	Secure password hashing
•	CORS configuration
•	Stateless session handling

