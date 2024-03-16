import mongoose from 'mongoose'

const connectDB = () => {
    try {
        const connection = mongoose.connect(process.env.URI_MONGODB);
        console.log('Connect to MongoDB successfully!')
        return connection;
    } catch (error) {
        throw new Error(error.toString())
    }
}

export default connectDB;