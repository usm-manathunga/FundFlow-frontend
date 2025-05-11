# FundFlow Frontend – Microfinance Portal (Next.js + React)

This is the frontend application for **FundFlow**, a microfinance loan and credit scoring platform. Built with **Next.js**, **React**, and **Bootstrap 5**, it provides interfaces for both **admins** and **customers** to manage loans, apply for credit, and track application statuses.

---

## Tech Stack

| Technology    | Role                            |
|---------------|----------------------------------|
| Next.js       | React framework for frontend     |
| React         | UI library                       |
| Bootstrap 5   | Responsive styling               |
| Axios         | API communication with backend   |
| SweetAlert2   | User-friendly alerts & feedback  |

---



### ✅ Prerequisites
- Node.js (v18+)
- npm or yarn

### ▶️ Run the app locally

```bash
cd frontend
npm install
npm run dev



🖥Pages & Routes

Login	/login	Login as admin/user
Admin Dashboard	/admin	View all customers and loans
Add Customer	/addCustomers	Create a new customer
Edit/Delete Customer	/showAllCustomers	Manage customers
Apply for Loan	/loan/apply	Submit loan application (user only)



🧠 Assumptions
User role is determined by backend and stored in frontend localStorage

No JWT used;

Login Page
![image](https://github.com/user-attachments/assets/fa50e458-b987-4b7f-835f-819c8bb57ec2)

Admin dashboard
![image](https://github.com/user-attachments/assets/6657c9ff-e2cf-486b-9778-6def5ac6a2ae)

Add customer UI
![image](https://github.com/user-attachments/assets/a8c707a8-0b98-4c1b-b690-fa2a78093a34)

Edit and delete a customer

![image](https://github.com/user-attachments/assets/e85e55c6-ee15-4f36-a16f-97ce72dffb9e)

Customer load add UI
![image](https://github.com/user-attachments/assets/0761b5c9-0e50-4db1-97c8-3e13ef92e320)





