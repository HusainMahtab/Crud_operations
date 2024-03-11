import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
const app=express()

app.use(cors({
    origin:"*",
}))

app.use(express.json(
    {
        limit:"16kb"
    }
))

app.use(express.urlencoded({
    limit:"16kb",
    extended:true
}))

app.use(express.static("public"))

app.use(cookieParser())

// import router
import router from "../src/routes/user.routes.js"


app.use("/api/v1/users",router)
export {app}