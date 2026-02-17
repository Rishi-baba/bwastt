import mongoose from "mongoose";
const connnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "Bwastt"
        });
        console.log("connected db");
    }
    catch (error) {
        console.log(error);
    }
};
export default connnectDB;
