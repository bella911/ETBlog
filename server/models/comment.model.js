import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    likes: {
      type: Array,
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// comments: [
//   {
//       text: {
//           type: String,
//           required: true,
//       },
//       user: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "User",
//           required: true,
//       },
//   },
// ],

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;