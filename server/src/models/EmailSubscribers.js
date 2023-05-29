import mongoose from "mongoose";

const EmailSubscriberSchema = new mongoose.Schema({
  Username: { 
    type: String, 
    required: true
  },
  Email: { 
    type: String, 
    required: true 
  }
});

export const EmailSubscriberModel = mongoose.model("emailSubscribers", EmailSubscriberSchema);