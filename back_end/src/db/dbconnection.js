import mongoose from "mongoose"
import {DB_NAME} from "../costant.js"
const dbConnect=async()=>{
    try {
        const dbconnectInstance=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("MongoDB connected Successfully")
    } catch (error) {
        console.log("DB is not Connected",error)
    }
}


export {dbConnect}