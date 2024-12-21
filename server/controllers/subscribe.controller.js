import Subscriber from "../models/susbscribe.model.js";

export const createSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Enter your email address" });
    }
    // const firstSub = await Subscriber.find({email: {$exists: false}});
    const checkSubs = await Subscriber.find({});
    if(checkSubs){
      const counter = checkSubs.length + 1;
      const sub = await Subscriber.create({ email, counter });
    res.status(200).json({ message: sub });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getSubscriber = async (req, res) => {
    try {
      const subs = await Subscriber.find({});
      res.json(subs);
    } catch (error) {
      res.status(500).json(error.message);
    }
}

export const deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Subscriber.findByIdAndDelete(id)
    res.json("delete successfully")
  } catch (error) {
    res.status(500).json(error.message)
  }
}
