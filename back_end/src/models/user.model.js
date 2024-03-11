import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema=new mongoose.Schema(
    {
        userName:{
            type:String,
            required:true,
            maxlength:50,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
            maxlength:10,
        },
        phoneNumber:{
            type:Number,
            unique:true
        },
        refreshToken:{
            type:String
        }
    },
    {timestamps:true}
    )



    userSchema.pre("save",async function(next){
        if(!this.isModified("password")) return next()
       this.password=await bcrypt.hash(this.password, 10)
       next()
    })

    // login time compare original password and hash password

    userSchema.methods.isPasswordCorrect = async function (password) {
        return await bcrypt.compare(password, this.password);
      };

    // generate access token
    userSchema.methods.generateAccessToken=function(){
        return jwt.sign(
            {
               id:this._id,
               username:this.userName,
               email:this.email,
               

            },
            process.env.ACCESS_TOKEN_SECREAT,
            {
                expiresIn:process.env.EXPIRE_ACCESS_TOKEN
            }
        )
    }


    userSchema.methods.generateRefreshToken=function(){
        jwt.sign(
            {
                id:this._id
            },
            process.env.REFRESH_TOKEN_SECREAT,
            {
                expiresIn:process.env.EXPIRE_REFRESH_TOKEN
            }
        )
    }

    
    export const User=mongoose.model("User",userSchema)

   