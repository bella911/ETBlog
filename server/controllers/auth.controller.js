
// review this auth lastly
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { fullName, username, email, password, gender } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      // profilePicture: gender === "male"? boyProfilePic : girlProfilePic,
      profilePicture: gender === "male" ? girlProfilePic : boyProfilePic ,
    });

    if (newUser) {
      
      await newUser.save();
    
      // Generate JWT token here
      // generateTokenAndSetCookie(newUser._id, res);


      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

      const { password: pass, ...rest } = user._doc;
      
      generateTokenAndSetCookie(user._id, res);

      res.status(200).json(rest)
  
    } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// // google authentication have to modify for future
export const google = async (req, res) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    // console.log(user)
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
      const { password: pass, ...rest } = user._doc;


      res
        .cookie("token",token,
          {
            // maxAge: 15 * 24 * 60 * 60 * 1000, //MS
            httpOnly: true, // prevent XSS attacks cross-site scripting attacks
            // secure: true,
            // sameSite: "strict",
          }
        )
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      // console.log(newUser)

      const token = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET_KEY
      );

      res
        .cookie("token",token,
          {
            // maxAge: 15 * 24 * 60 * 60 * 1000, //MS
            httpOnly: true, // prevent XSS attacks cross-site scripting attacks
            // secure: true,
            // sameSite: "strict",
          }
        )
        .status(200)
        .json(newUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    // res.status(200).json(req.user._id);
    // const user = await User.findById(req.user._id).select("-password"); // req.user._id value if sign in first
    // res.status(200).json(req.user)
    const user = await User.findById(req.user.userId)
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMe controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// export const logout = (req, res) => {
// 	try {
// 		res.cookie("jwt", "", { maxAge: 0 });
// 		res.status(200).json({ message: "Logged out successfully" });
// 	} catch (error) {
// 		console.log("Error in logout controller", error.message);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// };