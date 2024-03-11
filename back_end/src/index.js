
import {app} from "./app.js"
import dotenv from "dotenv"
import {dbConnect} from "../src/db/dbconnection.js"
dotenv.config({
   path:"./env"
})

dbConnect()
.then(()=>{
     app.on("error",(err)=>{
        console.log("Error in Listing App",err)
        throw err
     })
     app.listen(process.env.PORT || 3000,()=>{
      console.log(`App is Live on port:${process.env.PORT}` );
     })
})
.catch((err)=>{
    console.log("DB connection Falid !!",err);
})


