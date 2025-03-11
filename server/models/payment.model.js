import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String },
    phone_number: { type: String, required: true, default: "0912227599"},
    currency: { enum: ["ETB", "USD"] },
    // currency: { type: String, default: "ETB"},
    amount: { type: String, required: true },
    tx_ref: { type: String, required: true },
    callback_url: {
      type: String,
      default: "https://etblog.onrender.com/payment-successful",
    },
    return_url: { type: String, default: "https://etblog.onrender.com/" },

    // charge and reference is generated to provide from chapa
    charge: { type: String},
    reference: {type: String},

    customization: {
      title: { type: String },
      description: { type: String },
    },
  },
  { timestamp: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
