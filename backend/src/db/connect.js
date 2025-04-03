import mongoose from "mongoose"

const connect = async () => {
    try{
        console.log("Attempting to connect to database....");
        await mongoose.connect(process.env.MONGO_URI, {}) //MONGO_URI held in .env from cluster
    }
    catch(error)
    {
        console.log("Failed to connect to database...", error.message);
        process.exit(1);
    }
};

export default connect;