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
# 📄 API Documentation – GrievEase Backend

## 🛡️ Authentication APIs

| Method | Route                      | Description                              | Protection |
|:------:|:---------------------------|:-----------------------------------------|:----------:|
| POST   | `/register`                 | Register a new user (with profile pic)    | Public     |
| POST   | `/login`                    | Login user                               | Public     |
| GET    | `/verify-user`              | Verify user token and get user data       | Protected  |
| POST   | `/logout`                   | Logout user                              | Protected  |
| GET    | `/`                         | Welcome route (simple message)           | Public     |
| GET    | `/verify-email`             | Verify email using token                 | Public     |
| GET    | `/profile`                  | Get user profile                         | Protected  |
| PUT    | `/update`                   | Update user profile                      | Protected  |
| GET    | `/resend-verification`      | Resend email verification link           | Protected  |

---

## 📢 Complaint APIs

| Method | Route                          | Description                              | Protection |
|:------:|:-------------------------------|:-----------------------------------------|:----------:|
| POST   | `/submit`                      | Submit a new complaint (with image)      | Protected  |
| GET    | `/all`                         | Get all complaints                       | Public     |
| POST   | `/:id/like`                    | Like a complaint                         | Public     |
| POST   | `/:id/unlike`                  | Unlike a complaint                       | Public     |
| GET    | `/pending`                     | Get pending complaints                   | Protected  |
| PATCH  | `/:complaintId/accept`          | Officer accepts assigned complaint       | Protected  |
| GET    | `/my`                          | Get complaints submitted by the user     | Protected  |
| GET    | `/assigned`                    | Get complaints assigned to officer       | Protected  |

---

## 📍 Location APIs (Google Maps Integration)

| Method | Route             | Description                               | Protection |
|:------:|:------------------|:------------------------------------------|:----------:|
| GET    | `/autocomplete`    | Get location suggestions (autocomplete)  | Public     |

---

## 📝 Notes

- **Protected Routes** require a valid authentication token (JWT) in the headers.
- **Image Uploads** must be sent as `multipart/form-data`.
- **Google Maps API** is required for the `/autocomplete` route (env variable: `GOOGLE_MAPS_API_KEY`).
- Error handling is done with proper status codes and messages.

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Google Maps API
- Cloudinary / Local storage (for images)


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
