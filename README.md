🚀 Subscription Tracker API
A scalable backend API for managing user subscriptions with automated renewal reminders using Upstash Workflow & QStash.

Built with Node.js, Express, MongoDB, and Cloud Background Jobs.

📌 Overview
Subscription Tracker is a production-ready REST API that allows users to:

✅ Create and manage subscriptions
✅ Track renewal dates automatically
✅ Trigger background reminder workflows
✅ Secure endpoints with JWT authentication
✅ Run delayed jobs using Upstash Workflow
The system is designed with scalable background processing using serverless workflow orchestration.

🛠 Tech Stack
Backend

Node.js
Express.js
MongoDB Atlas
Mongoose ODM
Authentication

JWT (JSON Web Tokens)
Protected routes middleware
Background Jobs

Upstash Workflow
QStash (HTTP-based message queue)
Delayed execution using sleepUntil
Dev Tools

Nodemon
ESLint
Postman for API testing
⚙️ Architecture
text

Client Request
     ↓
Express API
     ↓
MongoDB (Stores Subscription)
     ↓
Upstash Workflow Trigger
     ↓
Delayed Reminder Execution



The workflow engine schedules reminders at:

7 days before renewal
5 days before renewal
2 days before renewal
1 day before renewal


🔐 Features
✅ Authentication
User registration & login
JWT-based authorization
Protected subscription routes



✅ Subscription Management
Create subscription
Fetch user subscriptions
Auto-calculated renewal date
Status tracking (active, expired, cancelled)
✅ Automated Reminder System
Workflow triggered upon subscription creation
Background job scheduling using Upstash
Delayed execution with context.sleepUntil()
Idempotent workflow runs
