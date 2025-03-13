import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import path from 'path';

// route
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import notificationRoutes from "./routes/notification.route.js";

import subscriber from "./routes/subscribe.route.js";
import comment from "./routes/comment.route.js"

import chapaPayment from "./routes/payment.route.js";
dotenv.config();

const __dirname = path.resolve(); // locate current location
const app = express();
const PORT = process.env.PORT; // choose the env port. if that port not work use the 3000 as alternative

// assign port and call db function
app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port:", PORT);
});
// allow the to access each other eg..when logout from client permit to access from the server
// app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

//  run the path through app.use path
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/user", userRoute);
app.use("/api", subscriber);
app.use("/api/comment", comment);
app.use("/api/donate", chapaPayment);
app.use("/api/notifications", notificationRoutes);



// call client side dist
app.use(express.static(path.join(__dirname, '/client/dist')));

// assign all client side location on back end for render deployment 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});