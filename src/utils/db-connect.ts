import mongoose from "mongoose";

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