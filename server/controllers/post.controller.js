// import express from "express";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

// create new post
export const createPost = async (req, res) => {
  try {
    const userId = req.user.userId;
    // if (
    //   !req.body.title ||
    //   !req.body.author ||
    //   !req.body.image ||
    //   !req.body.description
    // ) {
    //   return res.status(400).send({
    //     message: "Send all required fields: title, author, image, description",
    //   });
    // }


    const newPost = {
      user: userId,
      title: req.body.title,
      author: req.body.author,
      image: req.body.image,
      description: req.body.description,
    };

    // const post = await newPost.save();
    const post = await Post.create(newPost);

    return res.status(201).send(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Get All Posts from database
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: "desc" });
    return res.status(200).json({
      countPosts: posts.length,
      data: posts,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Update a Post Item
export const updatePost = async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      // !req.body.image ||
      !req.body.description
    ) {
      return res.status(400).send({
        message: "Send all required fields: title, author, image, description",
      });
    }
    const updatedPost = {
      title: req.body.title,
      author: req.body.author,
      image: req.body.image,
      description: req.body.description,
    };

    const { id } = req.params;

    const result = await Post.findByIdAndUpdate(id, updatedPost);

    if (!result) {
      return res.status(404).json({ message: "Post item not found" });
    }

    return res.status(200).json({ message: "Post Item updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Delete a post item
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Post.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Post item not found" });
    }

    return res.status(200).send({ message: "Post item deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// get single post
export const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    return res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// comment on posts
export const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user.userId;

    if (!text) {
      return res.status(400).json({ error: "Text field is required" });
    }
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // return res.status(200).json({text, postId, userId});
    const comment = { user: userId, text };

    post.comments.push(comment);
    await post.save();

    const user = await User.findById(userId)

    res.status(200).json({ post, likedUser: user }); // send comments and commented user info
  } catch (error) {
    console.log("Error in commentOnPost controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Likes and unlike of post
export const likeUnlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.userId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const userLikedPost = post.likes?.includes(userId);
    if (userLikedPost) {
      // Unlike post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

      const updatedLikes = post.likes.filter(
        (id) => id !== null && id.toString() !== userId.toString()
      );
      res.status(200).json({ updatedLikes, message: ", remove like" });
    } else {
      // Like post
      post.likes.push(userId);
      await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
      await post.save();

      const notification = new Notification({
        from: userId,
        to: post.user,
        type: "like",
      });
      await notification.save();

      // update post views
      // countViews(postId, res);

      const updatedLikes = post.likes;
      res.status(200).json({ updatedLikes, message: ", like your post" });
    }
  } catch (error) {
    console.log("Error in likeUnlikePost controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get liked posts
export const getLikedPosts = async (req, res) => {
  const userId = req.params.id;
  // res.json({userId})

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    res.status(200).json(likedPosts);
  } catch (error) {
    console.log("Error in getLikedPosts controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get following posts
export const getFollowingPosts = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const following = user.following;

    const feedPosts = await Post.find({ user: { $in: following } })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    res.status(200).json(feedPosts);
  } catch (error) {
    console.log("Error in getFollowingPosts controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// display specific user posts
export const getUserPosts = async (req, res) => {
  try {
    const { username } = req.params;

    // return res.status(200).json("hello abel from get posts")
    const user = await User.findOne({ username });
    // return res.status(200).json(user._id)

    if (!user) return res.status(404).json({ error: "User not found" });

    const posts = await Post.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    return res.status(200).json({ data: posts });
  } catch (error) {
    console.log("Error in getUserPosts controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete user comment
export const deleteComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { commentId } = req.params;
    // return res.status(200).json({message: "value comes from backend", postId, commentId});
    const result = await Post.findByIdAndUpdate({ _id: postId }, { $pull: { comments: { _id: commentId } } })

    if (!result)
      res.status(404).json({ message: "Comment item not found" });

    res.status(200).json({ message: 'Comment deleted successfully' });

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// list commented users
export const getCommentedUsers = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    if (post) {
      const users = [];
      post.comments.map((comment) => users.push(comment.user)) // filter the commented user address and store users array

      const commentedUsers = await User.find({ _id: { $in: users } })
      res.status(200).json(commentedUsers)
    }

  } catch (error) {
    console.log("Error in getCommentedPersons controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


// count views on the post
export const countViews = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId); 
    if(post){
     const update = await Post.findByIdAndUpdate( postId , { views: ++post.views } );
      res.status(200).json(update.views);
    }
  } catch (error) {
    console.log("Error in total post viewer controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }

}