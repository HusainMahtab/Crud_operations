import { User } from "../models/user.model.js";
import  Jwt  from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
 

const verifyJWT=asyncHandler(async(req,res,next)=>{
    try {
        // console.log(req.cookies)
        const token=req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ","")

        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }
       
        const decodedToken=Jwt.verify(token,process.env.ACCESS_TOKEN_SECREAT);
        console.log("Decoded Token:",decodedToken)
    
       const user=await User.findById(decodedToken?._id)
        
       delete user.password
       delete user.refreshToken
    
       if(!user){
          throw new ApiError(401,"Invalid Access Token")
       }
       req.user=user;
       next()
      } catch (error) {
          throw new ApiError(401,error?.message || "Invalid access token");
      }

})


export default  verifyJWT

