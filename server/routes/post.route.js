import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getFollowingPosts,
  updatePost,
  getPost,
  likeUnlikePost,
  getUserPosts,
  commentOnPost,
  deleteComment,
  getLikedPosts,
  getCommentedUsers,
  countViews
} from "../controllers/post.controller.js";
import { protectPath } from "../utils/protectPath.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/create", verifyToken, createPost); // add protectPath
router.get("/getallposts", getAllPosts);
router.get("/followingposts", verifyToken, getFollowingPosts);
router.get("/getpost/:id", getPost);
router.put("/updatepost/:id", verifyToken, updatePost);
router.put("/like/:id", verifyToken, likeUnlikePost); // liked post normal
router.get("/user/:username", verifyToken, getUserPosts);
router.post("/comment/:id", verifyToken, commentOnPost);
router.delete("/:id", verifyToken, deletePost);
router.delete("/:postId/comment/:commentId", deleteComment); // delete user comment
router.get("/likes/:id", getLikedPosts);
router.get("/commentedusers/:id",verifyToken, getCommentedUsers);
router.get("/count/:id", countViews);


export default router;


