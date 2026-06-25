import mongoose from "mongoose";
const ConnectDB = async () => {
    try {
        const Conn = await mongoose.connect(process.env.MONGOOSE_URI)
        console.log(`MongoDB Connected: ${Conn.connection.host}`);
        
    } catch (error) {
        console.log(`CONNECTION FAILED ${error.message}`);
        process.exit(1);
        
    }
}
export default ConnectDB;