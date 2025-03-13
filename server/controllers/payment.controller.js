import { Chapa } from "chapa-nodejs";
import Payment from "../models/payment.model.js";
import dotenv from "dotenv";
dotenv.config()
// create new chapa
const chapa = new Chapa({
  secretKey: process.env.CHAPA_TEST_SECRET_KEY,
  // secretKey: "CHASECK_TEST-t0Z1GElgr9QuKAzJ2gKLHCC789C18VV3",
});

// initialize chapa payment
export const pay = async (req, res) => {
  // Generate transaction reference
  const tx_ref = await chapa.genTxRef({
    removePrefix: false, // defaults to `false`
    prefix: "donate-tx", // defaults to `TX`
    size: 20, // defaults to `15`
  });

  try {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      currency,
      amount,
      callback_url,
      return_url,
    } = req.body;

    const chapaResponse = await chapa.initialize({
      first_name: first_name,
      last_name: "",
      email: "",
      phone_number: "0912227599",
      currency: "ETB",
      amount: amount,
      tx_ref: tx_ref,
      callback_url: "",
      return_url: `http://localhost:5173/confirm-payment/${tx_ref}`,
      customization: {
        title: "Donation",
        description: `Donate ${amount}birr `,
      },
    });
    
    // res.status(200).json( {chapaResponse, tx_ref})
    res.status(200).json( {checkout_url: chapaResponse.data.checkout_url, tx_ref})

  } catch (error) {
    console.log("Error in payment chapa", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// pay()

// verify payment and store transaction info database
export const verifyPay = async (req, res) => {

    const txId = req.params.txId;
    const response = await chapa.verify({
        tx_ref: txId,
      });
      res.status(200).json(response)

      // check value already exist
      // const existRecord = await Payment.findOne({tx_ref: txId})
      // if(existRecord){
      //   console.log("the transaction already stored")

      //   return res.status(400).json({messages: "the transaction already stored"})
      // }
      
      //   if payment successfully send copy transaction on my database
      if(response.data.status === "success"){     
        console.log("the value not comming here")
        const newPayment = new Payment({
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                email: response.data.email,
                phone_number: response.data.phone_number,
                currency: response.data.currency,
                amount: response.data.amount,
                tx_ref: response.data.tx_ref,
                charge: response.data.charge,
                reference: response.data.reference,
                customization: {
                    title: response.data.customization.title,
                    description: response.data.customization.description
                },
              });
              await newPayment.save();
      }

};
