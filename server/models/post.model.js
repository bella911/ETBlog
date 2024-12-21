import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true,
    },
    title:{
        type: String,
        // required: true,
    },
    author:{
        type: String,
        // required: true,
    },
    image:{
        type: String,
    },
    description:{
        type: String,
        // required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    comments: [
        {
            text: {
                type: String,
                required: true,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        },
    ],
    views: {
        type: Number,
        default: 0,
    },
},  {timestamps: true}
);

const Post = mongoose.model("Post", postSchema);

export default Post;