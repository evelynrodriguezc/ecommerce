const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectBD = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser : true,
            useUnifiedTopology : true
        })
    } catch (error) {
        console.error("Error connection with MongoDB", error);
        process.exit(1);
    }
}