import mongoose from "mongoose";

import {DB_URI , NODE_ENV} from "../config/env.js";

if(!DB_URI){
    console.error("DB_URI is not defined in the environment variables.");
    process.exit(1);
}

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI)
        console.log(`MongoDB connected successfully in ${NODE_ENV} mode`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;