import mongoose from 'mongoose';


export const connectToDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        //establish db connection
        const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mklqq.mongodb.net/jobPortal`;
        await mongoose.connect(url);
        console.log('DB connection established 👻')

    } catch (error) {
        console.error('Error: ',error.message);
    }
}