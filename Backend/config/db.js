import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        const connection = await mongoose.connect("mongodb://127.0.0.1:27017/content-management-system");
        if(connection){
            console.log(`DB connected successfully`);
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectToDb;