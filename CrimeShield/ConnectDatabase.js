const mongoose = require("mongoose");

const str = process.env.MONGO_DB_STRING;

async function connectDB() {
    try {
        mongoose.connect(str).then(() => {
            console.log("Connected to MongoDB Database!");
        })
    } catch (error) {
        console.log(error);
        setTimeout(connectDB,5000);
    }
}
connectDB();