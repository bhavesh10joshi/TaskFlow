# 📋 TaskFlow

TaskFlow is a robust, full-stack Todo Application designed to make managing daily tasks easy, secure, and insightful. Built with a MERN-style architecture (using vanilla JS for the frontend), TaskFlow offers far more than simple task tracking, adding analytics, account management, and strong security to help users boost productivity.[^1]

***

## ✨ Why TaskFlow?

- Most todo apps are limited — TaskFlow brings:
    - Secure login for absolute privacy
    - Productivity insights with detailed completion rates (%)
    - A profile dashboard for all account details and task history
    - Account update and delete options
    - Persistent session security using JWT and browser localStorage[^1]
- The result: TaskFlow is not just a todo tracker, but a personal productivity monitor.[^1]

***

## 🚀 Features

- **🔐 Authentication \& Authorization**
    - Register with name, email, and password
    - Login with JWT-based tokenization for security
    - Passwords hashed using bcrypt before database storage
    - Input validation through Zod (ensuring proper username, email, etc.)[^1]
- **📝 Todo Management**
    - Create tasks with custom deadlines (calendar date picker)
    - Mark tasks as completed and track completion
    - View dynamic completion rate (% completed vs. total tasks)
    - Delete obsolete tasks at any time[^1]
- **👤 Profile Dashboard**
    - Displays user info: name, email, etc.
    - Shows detailed task stats: total, completed, completion percentage
    - Options to update password or delete account entirely[^1]
- **🔄 Session Management**
    - Persistent logins with JWT stored in localStorage
    - Easily logout and restore sessions securely[^1]

***

## 🛠️ Tech Stack

| Layer | Technology |
| :-- | :-- |
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Validation | Zod |
| Auth \& Secure | JWT, bcrypt, localStorage |


***

## 🏁 How To Use

1. **Clone the repository:**

```bash
git clone https://github.com/bhavesh10joshi/TaskFlow.git
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**
    - Configure MongoDB connection and JWT secret in a `.env` file.
4. **Start the application:**

```bash
npm start
```

5. **Visit in browser:**
    - Open `http://localhost:<PORT>` to begin managing tasks!

***

## 📦 Key Functionality Overview

- **Register/Login:** Secure and simple onboarding experience for new/existing users
- **Add Tasks:** Input a new todo—set a deadline and monitor progress instantly
- **View Profile:** Access all user and task statistics in one personalized dashboard
- **Analytics:** Track productivity via completion percentages and task stats
- **Account Management:** Change password or delete account any time[^1]

***

## 👨‍💻 Author

**bhavesh10joshi**

***

## 📜 License

Distributed under the MIT License.

***

Contribute and explore TaskFlow on [GitHub](https://github.com/bhavesh10joshi/TaskFlow).[^1]

<div align="center">⁂</div>

[^1]: https://github.com/bhavesh10joshi/TaskFlow
