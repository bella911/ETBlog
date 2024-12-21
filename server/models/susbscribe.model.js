import mongoose, { Schema, model } from "mongoose";

const subscriberSchema = new mongoose.Schema({
    email:{
        type: String,
        require: true,
        unique: true
    }, 
    counter: {
        type: Number,
        default: 0
    }
}, {timestamps: true}
)

const Subscriber = mongoose.model("Subscriber", subscriberSchema);
export default Subscriber;