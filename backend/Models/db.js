const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL).then(() => {
    console.log("MongoDB connected...");
}).catch((error) => {
    console.log("MongoDB Connection Error: ", error);
});