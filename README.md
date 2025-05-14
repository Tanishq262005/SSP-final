
# Skill Sharing Platform

**Skill Sharing Platform** is a real-time, full-stack web application designed for students and professionals to showcase their skills, share project work, and interact through an integrated chat interface. Built with the MERN stack, containerized using Docker, and aligned with Agile and DevOps practices, the platform supports collaborative learning and continuous integration/deployment pipelines.

---

## Table of Contents

-Overview
-Key Features
-Technology Stack
-System Architecture
-Installation and Deployment
-Functional Requirements
-Directory Structure
-API & WebSocket Events
-Security Practices
-Testing Strategy
-Future Enhancements
-Authors

---

## Overview

The Skill Sharing Platform addresses a common gap in academic and project environments: the absence of a unified, interactive space where learners can collaborate, display achievements, and receive feedback. This platform provides a secure and scalable environment where users can:

- Register securely using unique credentials
- Upload project files and showcase their work
- Communicate in real-time via chat
- View chat history and maintain a portfolio
- Collaborate and engage with peers and mentors

---

## Key Features

- Secure user registration with MongoDB-based credential management
- Real-time chat module using Socket.IO
- Project upload functionality with title, description, and file support
- Persistent chat and project data stored in MongoDB
- Docker-based deployment for consistent environments
- GitHub Actions-based CI/CD workflow
- Modular codebase following Agile development lifecycle

---

## Technology Stack

**Frontend:**  
- HTML5, CSS3  
- JavaScript (Vanilla)  

**Backend:**  
- Node.js  
- Express.js  
- Socket.IO  

**Database:**  
- MongoDB  
- Mongoose ODM  

**DevOps & Deployment:**  
- Docker, Docker Compose  
- GitHub Actions (CI/CD)  
- MongoDB Atlas (planned cloud integration)  

---

## System Architecture

```
+----------------+     WebSocket/API     +--------------------+     Native Protocol     +-----------------+
|   Frontend     | <-------------------> |  Node.js + Express  | <---------------------> |    MongoDB       |
| (Static HTML)  |     (HTTP + WS)       |    (REST + IO)      |        (Mongoose)      |   (Containerized)|
+----------------+                      +--------------------+                          +-----------------+
```

---

## Installation and Deployment

### Local Deployment

1. **Clone the repository**
```bash
git clone https://github.com/Tanishq262005/SSP-final.git
cd signup
```

2. **Install Node.js dependencies**
```bash
npm install
```

3. **Start MongoDB (if not using Docker)**
```bash
mongod --dbpath /your/db/path
```

4. **Run the development server**
```bash
node server.js
```

5. **Access locally**
```
http://localhost:3000
```

---

### Docker Deployment

1. **Build and run with Docker Compose**
```bash
docker-compose up --build
```

2. Access at `http://localhost:3000`

---

## Functional Requirements

| Feature                | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| Signup/Login           | Secure user registration and authentication                                 |
| Real-time Chat         | Bi-directional communication with persistent message storage                |
| Project Upload         | File submission form with project title and description                     |
| Chat History           | Automatic loading of chat messages on page load                             |
| Notifications          | Popup messages for upload confirmation                                      |
| CI/CD                  | GitHub Actions-based automated testing, build, and deployment               |
| Containerization       | Dockerized environment with orchestrated backend and database services      |

---

## Directory Structure

```
signup/
├── models/                 # Mongoose schemas (User, ChatMessage)
├── public/                 # Static HTML files (signup, chat UI)
├── .dockerignore           # Docker ignore rules
├── dockerfile              # Docker image definition
├── docker-compose.yml      # Multi-container configuration
├── package.json            # Node.js dependencies and metadata
├── server.js               # Application entry point
```

---

## API & WebSocket Events

### REST API Endpoints

- **POST** `/signup`: Register a new user  
- **POST** `/chat`: Save a chat message  
- **GET** `/chat`: Retrieve all chat messages  

### WebSocket Events

| Event            | Direction      | Description                      |
|------------------|----------------|----------------------------------|
| `send_message`   | Client → Server | Send a new chat message          |
| `receive_message`| Server → Client | Broadcast a message to all users |

---

## Security Practices

- Passwords are encrypted before storage (bcrypt recommended)
- Sensitive credentials are managed via environment variables
- CORS and input sanitization enforced
- HTTPS enforced for production deployment
- MongoDB uses access control and authentication
- No hardcoded secrets in codebase

---

## Testing Strategy

- **Unit Testing:** API endpoint logic (signup, chat)
- **Integration Testing:** Combined form/backend interaction
- **Schema Validation:** Ensures MongoDB collections adhere to defined structure
- **End-to-End Testing:** Simulate real user scenarios (registration → chat → upload)
- **CI/CD Validation:** GitHub Actions run builds and test suites on every push

---

## Future Enhancements

- AI-based skill recommendations
- Live video streaming for workshops
- Admin dashboard for user/content management
- OAuth login via LinkedIn/GitHub
- Upload version history and project tagging
- Analytics dashboard for user engagement

---

## Authors

Project by students of RV University  
**Team Members:**
- Uday Laur (1RVU23CSE516)  
- Shreyas Chaudhary (1RVU23CSE444)  
- Tanishq Jain (1RVU23CSE502)  
- Tharun R (1RVU23CSE511)  

Under the guidance of  
**Prof. Lakshminarayana Garudadri**  
School of Computer Science and Engineering, RV University

---
