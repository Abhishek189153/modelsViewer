# 3D Viewer Studio

A full-stack MERN application for uploading, visualizing, and interacting with 3D `.glb` models using Three.js and AWS cloud storage.

---

# Live Demo

Frontend URL:

```bash
ADD_FRONTEND_URL_HERE
```

Backend URL:

```bash
ADD_BACKEND_URL_HERE
```

---

# Features

## Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Persistent User Sessions

## 3D Viewer

* Upload `.glb` 3D models
* Real-time Three.js rendering
* OrbitControls support

  * Rotate
  * Zoom
  * Pan
* HDR environment lighting
* Interactive camera controls

## Cloud Storage

* AWS S3 model storage
* MongoDB persistence
* Cloud-ready architecture

## Camera Persistence

* Save camera positions
* Restore camera state across sessions

## Model Management

* Upload models
* View models
* Delete models
* Automatic UI refresh

---

# Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* React Three Fiber
* Drei
* Lucide React

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer

## Cloud & Deployment

* AWS S3
* MongoDB Atlas
* Render / EC2
* CloudFront Ready

---

# Project Architecture

```text
Frontend (React + Three.js)
        ↓
REST API (Express.js)
        ↓
MongoDB Atlas
        ↓
AWS S3 Storage
```

---

# Folder Structure

## Backend

```text
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── app.js
│
├── server.js
└── package.json
```

## Frontend

```text
frontend/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── routes/
│   └── App.jsx
│
└── package.json
```

---

# Environment Variables

## Backend `.env`

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET

AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY
AWS_REGION=YOUR_REGION
AWS_BUCKET_NAME=YOUR_BUCKET
```

## Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

# Installation

## Clone Repository

```bash
git clone YOUR_GITHUB_REPO
```

---

# Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# AWS S3 Setup

## Create S3 Bucket

* Enable public object access
* Add bucket CORS configuration

## Recommended CORS

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

---

# API Endpoints

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

## Models

```text
POST   /api/models/upload
GET    /api/models
PUT    /api/models/:id/camera
DELETE /api/models/:id
```

---

# Optimization Techniques Used

* Browser asset caching
* AWS S3 static asset delivery
* React state optimization
* Lazy loading with Suspense
* Modular backend architecture
* Protected route middleware
* Cloud-based storage architecture

---

# Security Features

* JWT authentication
* Password hashing with bcrypt
* Protected APIs
* Environment variable management
* CORS configuration
* Secure cloud storage integration

---

# Future Improvements

* Redis caching
* Drag & Drop uploads
* Model thumbnails
* Real-time collaboration
* Multi-format model support
* Model compression pipeline
* AI-powered model optimization

---

# Video Walkthrough

Add Loom video link here:

```bash
ADD_LOOM_VIDEO_LINK
```

---


# Author

Abhishek Pant




