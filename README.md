# 🏘️ Community Reporter and Monitoring Portal

A MERN stack-based web application to help citizens report and monitor local community issues effectively.

🔗 **Live Demo**: [https://community-report.onrender.com/](https://community-report.onrender.com/)

---

## 📌 Project Overview

**Community Reporter and Monitoring Portal** is a web application that aims to resolve local village/city problems by connecting citizens with local area heads. Often, local issues like garbage overflow, potholes, or broken streetlights go unnoticed and can lead to serious problems if not addressed early.

This portal allows **citizens** to report issues with detailed information, and **local heads** to monitor and prioritize the most critical problems based on community voting.

---

## 💡 Problem Statement

- Local issues often go unreported or unnoticed.
- Village/city heads may not be present or aware of ground-level problems.
- Small issues can lead to bigger environmental or health hazards.

---

## ✅ Solution

This web application empowers citizens to:
- 📤 Post issues with title, description, image, location, and date.
- 🗳️ Vote on the most urgent issues reported by others.
- 🧑‍💼 Enable heads to view top-voted issues and prioritize resolutions.

---

## 🧱 Tech Stack

### 🖥️ Frontend
- HTML, CSS, JavaScript
- React.js

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB (Atlas)

### 🛠️ Tools Used
- **VS Code** – Development
- **Postman** – API Testing
- **MongoDB Atlas** – Cloud Database

---

## 🔐 User Roles

- **Citizen Dashboard**:
  - Submit issues with relevant details.
  - View all reported issues.
  - Vote on issues submitted by others.

- **Head Dashboard**:
  - View all submitted issues.
  - Sort issues based on votes.
  - Mark issues as "Reviewed", "In Progress", or "Resolved".

---

## 📷 Screenshots (Optional)

*(Add screenshots of citizen dashboard, head dashboard, issue submission form, etc.)*

---

## 🚀 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/community-report.git
cd community-report

# Install backend dependencies
cd backend
npm install

# Start backend server
npm start

# Install frontend dependencies
cd ../frontend
npm install

# Start frontend development server
npm start
