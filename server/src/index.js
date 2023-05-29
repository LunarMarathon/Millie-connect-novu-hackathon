import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import fetch from "node-fetch"
import NovuNotification from './novu.js';
import schedule from 'node-schedule';
// import { EmailSubscriberModel } from "../models/EmailSubscribers.js";

const app = express();
const PORT = process.env.PORT || 3001

app.use(express.json());
app.use(cors());

mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ze3xvva.mongodb.net/cluster0?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
    .then(() => console.log("Connection successful"))
    .catch((err) => console.log(err));

//schema for email subscribers
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

const EmailSubscriberModel = mongoose.model("emailSubscribers", EmailSubscriberSchema);

//schema for anon posts
const AnonPostSchema = new mongoose.Schema({
    Post: {
        type: String,
        required: true
    }
});

const AnonPostModel = mongoose.model("anonPosts", AnonPostSchema);

//self-care activity 
const api = "http://www.boredapi.com/api/activity?type=recreational&type=social&type=diy&type=cooking&type=relaxation&type=music"

const getActivity = async () => {
    const response = await fetch(api);
    const json = await response.json();
    const { activity, type } = json;
    console.log(activity, type)
    return activity
}

// sends mail to each sub - used with cron
const fetchSubdata = async () => {
    const subLink = "http://127.0.0.1:3001/";
    const response = await fetch(subLink);
    const json = await response.json();
    for (let item of json) {
        const activity = await getActivity()
        NovuNotification(item.Username, item.Email, item._id, activity);
    }
}

app.get("/", async (req, res) => {
    try {
        const resJson = await EmailSubscriberModel.find({})
        res.json(resJson).status(200)
    } catch (error) {
        console.log(error);
    }
})

app.post("/", async (req, res) => {

    const { Username, Email } = req.body;

    if (!Email || !Username) {
        res.json("Please fill all the details!").status(400);

    }

    try {
        const newSubcriber = await EmailSubscriberModel.create({ Username, Email });
        const id = newSubcriber._id
        const activity = await getActivity()

        // sends first mail when they sign up
        NovuNotification(Username, Email, id, activity);

        res.json(newSubcriber).status(201)

    } catch (error) {
        res.json(error).status(500);
    }

})

app.get("/posts", async (req, res) => {
    try {
        const resJson = await AnonPostModel.find({})
        res.json(resJson).status(200)
    } catch (error) {
        console.log(error);
    }
})

app.post("/posts", async (req, res) => {

    const { Post } = req.body;

    if (!Post) {
        res.json("Post is empty!").status(400);

    }

    try {
        const newPost = await AnonPostModel.create({ Post });
        res.json(newPost).status(201)

    } catch (error) {
        res.json(error).status(500);
    }

})

// cron 
// daily at 9 am
const job = schedule.scheduleJob('0 9 * * *', async function () {
    fetchSubdata()
})

app.listen(PORT, () => {
    console.log("Server started at: ", PORT)
})
