import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.dbConnectionString);
        console.log(`DB connected successfully to ${connection.connection.name}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectToDb;