📋 TaskFlow

TaskFlow is a full-stack Todo Application built to make managing daily tasks simple, secure, and insightful. Unlike basic todo apps, TaskFlow provides secure authentication, account management, deadline tracking, and completion analytics — all wrapped in a clean and responsive interface.

The app is developed using the MERN-style architecture (without React for frontend) where the frontend uses HTML, CSS, and vanilla JavaScript (DOM manipulation), the backend uses Express.js, and the database is powered by MongoDB.

✨ Why TaskFlow?

Most todo apps only let you add and remove tasks. TaskFlow goes a step further by:

Requiring secure login, so your tasks are always private.

Giving you a completion rate metric (%), so you know how productive you’ve been.

Offering a profile page where you can view all your account details and task history.

Allowing account updates (password change) and even account deletion.

Maintaining session security with JWTs and browser localStorage.

This makes TaskFlow not only a todo tracker but also a personal productivity monitor.

🚀 Features

🔐 Authentication & Authorization

Register with your name, email, and password.

Login securely with JWT-based tokenization.

Passwords are hashed using bcrypt before being saved.

Input validation is enforced via Zod (ensures proper email, username length, etc.).

📝 Todo Management

Add tasks with deadlines (calendar date picker).

Mark tasks as completed and monitor your progress.

View completion rate (%) based on completed vs. total tasks.

Delete tasks you no longer need.

👤 Profile Dashboard

Displays user details: Name, Email.

Shows task stats: total tasks created, completed tasks, completion percentage.

Options to update password or delete the entire account.

🔄 User Session Management

Tokens are stored in localStorage for persistent login.

Logout anytime, and you can log back in instantly.

🛠️ Tech Stack

Frontend: HTML, CSS, JavaScript (DOM Manipulation)

Backend: Node.js, Express.js

Database: MongoDB with Mongoose

Validation: Zod

Authentication & Security:

Password hashing with bcrypt

JWT for token-based authentication

LocalStorage for session management
