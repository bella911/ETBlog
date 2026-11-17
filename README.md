# ETBlog
ETBlog – Full-Stack Blogging and Social Media Platform
ETBlog is a full-stack blogging and social media platform that allows users to create, publish, manage, and interact with blog posts. It provides an interactive environment for content sharing, user engagement, and communication through likes, comments, and notifications.

🚀 Features

- User Authentication: Secure registration and login using JWT authentication.
- Post Management: Create, edit, delete, and publish blog posts.
- Social Interaction: Like and comment on posts.
- User Profiles: Manage user accounts and profile information.
- Notifications: Receive notifications for user interactions.
- Responsive Design: User-friendly interface optimized for different screen sizes.
- Protected Routes: Restrict access to authenticated users.
- RESTful API: Backend API for managing users, posts, comments, and interactions.


🛠️ Technologies Used

Frontend

- React.js
- Tailwind CSS
- Axios
- JavaScript

Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)


📂 Project Structure

....i will add soon after well organized....
        
⚙️ Installation and Setup

1. Clone the repository
```bash
git clone YOUR_REPOSITORY_URL
cd ETBlog
```

2. Install frontend dependencies
```bash
cd client
npm install
```
3. Install backend dependencies
```bash
cd ../server
npm install
```
4. Configure environment variables

Create a ```.env``` file inside the server directory:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Configure any additional environment variables required by your application.

5. Run the application

Start the backend:
```bash
cd server
npm run dev
```
Start the frontend in another terminal:
```bash
cd client
npm run dev
```
🔐 Authentication

ETBlog uses JSON Web Tokens (JWT) to authenticate users and protect private routes and API endpoints.

📸 Screenshots

.... i will add soon ...

🌐 Live Demo

....Due to the conflict between the USA and Iran, the MongoDB server in Bahrain went down, so I had to create a new database. ....



👨‍💻 Developer

Abel Gezahegn Zewdu

Full-Stack Web Developer

- GitHub: 
- LinkedIn: https://www.linkedin.com/in/abel-gezahegn-28a5ab1ab/

📄 License

This project is developed for learning and practical software development purposes. Add a license file if you intend to distribute it under a specific open-source license.

