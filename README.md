# 🎉 **GrievEase** - Decentralized Public Grievance Reporting System 🎉

**GrievEase** is a decentralized, **MERN stack**-powered platform designed to streamline the process of reporting, tracking, and resolving public grievances. Empower citizens to directly connect with municipal officers, track the status of their complaints in real time, and communicate seamlessly.

---

## 🚀 **Features**

- **💬 Real-Time Chat**: Engage in live communication between citizens and officers to resolve complaints faster.
- **📍 Location Tracking**: Seamlessly add your complaint location with Google Maps integration.
- **⚙️ Officer Dashboard**: Officers can view, accept, and resolve complaints, ensuring smooth workflow.
- **📝 Complaint Submission**: Submit complaints with categories, descriptions, urgency, and exact locations.
- **📊 Admin Panel**: Admins can manage users and monitor complaint statuses.

---

## 🛠️ **Technologies Used**

- **Frontend**:  
  React.js | Google Maps API | Material UI
- **Backend**:  
  Node.js | Express | MongoDB | JWT Authentication
- **Real-Time Communication**:  
  Socket.IO

---

## 📥 **Getting Started**

### **1. Clone the Repository**

git clone https://github.com/shiv-anshu-gupta/GrievEase.git
cd GrievEase

2. Frontend Setup
   Navigate to the frontend folder:
   Install dependencies:
   Add Google Maps API key in the .env file:
   Run the frontend
3. Backend Setup
   Navigate to the server folder:
   Install dependencies:
   Create a .env file for MongoDB URI and JWT secret:
   Start the backend server

🌍 Google Maps Integration
The Google Maps API integration allows users to pinpoint their complaint's exact location when submitting it.

Don't forget to add your Google Maps API key in the .env file for this feature to work.
📡 API Endpoints
POST /api/complaint/submit
Submit a new complaint with details like category, description, and location.

GET /api/complaint/all
Fetch all complaints, public and private.

POST /api/complaint/{id}/accept
Officers can accept a complaint and begin the resolution process.

🔐 Security
JWT Authentication is used for secure user login and accessing protected routes.

Encrypted storage of user data and complaint information ensures privacy.

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

✨ Contact
For any queries or feedback, feel free to contact:
Shivanshu Gupta
Email: shivanshu.gupta@example.com
GitHub: shiv-anshu-gupta
=======

# GrievEase

This is my National Level Hackathon Project
