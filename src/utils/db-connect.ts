import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

mongoose.set('strictQuery', true);

const connect = async () => {
    try{ 
        const uri = process.env.DB_URI as string
        await mongoose.connect(uri)
        console.log("connected to DB")
    } catch(e){
        console.log("can't connect to DB")
    }
}

export default connect