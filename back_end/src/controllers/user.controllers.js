import {User} from "../models/user.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {Apiresponce} from "../utils/ApiResponce.js"


const generateAceessAndRefreshToken=async(userId)=>{
  try {
      const user=await User.findById(userId)
      const accessToken=user.generateAccessToken()
      const refreshToken=user.generateRefreshToken()
  
      user.refreshToken=refreshToken
      await user.save({validateBeforeSave:false})
  
      return {accessToken,refreshToken}
  } catch (error) {
     console.log("Error:",error)
     throw new ApiError(500,"Error While Generating AccessToken and RefreshToken")
  }
    
    
}


// Register users
const RegisterUser=asyncHandler(async(req,res)=>{
     const {userName,email,password,phoneNumber}=req.body

     if (!userName) {
          throw new ApiError(401,"userName is Required")
     } else if(!email){
         throw new ApiError(401,"email is required")
     }else if(!password){
      throw new ApiError(401,"Pawword is required")
     }
         
     const existedUser= await User.findOne({
       $or:[{userName},{email}]
     })

     if(existedUser){
        throw new ApiError(401,"User is Already Exists")
     }

     const user=await User.create({
        userName,
        email:email.toLowerCase(),
        password,
        phoneNumber
     })
      
     console.log("passwordHashed:",user.password)

     if(!user){
        throw new ApiError(402,"Something went wrong while creating user")
     }

     delete user.password
     delete user.refreshToken

     return res
     .status(200)
     .json(
        new Apiresponce(200,user,"User Registerd Successfully")
     )

})

//login users
const loginUsers=asyncHandler(async(req,res)=>{
   const {email,password}=req.body
   if(!(email || password)){
      throw new ApiError(404,"This fileds are Required")
   }
   
   const user=await User.findOne({
      $or:[{email},{password}]
   })

   if(!user){
      throw new ApiError(404,"User does't Exists")
   }

   const isPasswordValid=await user.isPasswordCorrect(password)

   if(!isPasswordValid){
      throw new ApiError(404,"Password does't match")
   }
  
   const {accessToken,refreshToken}=await generateAceessAndRefreshToken(user._id)
   // console.log("AccessToke:",accessToken);

   const loggInUser=await User.findById(user._id)
   
   delete loggInUser.password
   delete loggInUser.refreshToken

   const options={
        httpOnly:true,
        secure:true
   }

  return res
  .status(200)
  .cookie("Access Token:",accessToken,options)
  .cookie("Refresh Token:",refreshToken,options)
  .json(
   new Apiresponce(200,{loggInUser,accessToken,refreshToken},"User login Successfully")
  )

})

const logOut=asyncHandler(async(req,res)=>{
     
      await User.findByIdAndUpdate(
         req.user._id,
         
         {
            $set:{
               refreshToken:undefined
            }
         },
         {
            new:true
         }
      )

      const options={
         httpOnly:true,
         secure:true
      }

      return res
      .status(200)
      .clearCookie("accessToken",options)
      .clearCookie("refreshToken",options)
      .json(
         new Apiresponce(200,{},"User logOut Successfully")
      )
})

const addUser=asyncHandler(async(req,res)=>{
   const {userName,email,password,phoneNumber}=req.body;
   if(!(userName || email || password)){
      throw new ApiError(402,"These filds are required");
   }
   const user=await User.create({
      userName,
      email,
      password,
      phoneNumber,
   })
   
   if(!user){
      throw new ApiError(401,"User dose't Create");
   }
   return res
   .status(200)
   .json(new Apiresponce(200,{user},"User created Successfully"));
})

const updateUser=asyncHandler(async(req,res)=>{
   const {userName,email,phoneNumber}=req.body
   if(!(userName || email || phoneNumber)){
      throw new ApiError(400,"These filds are Required")
   }
  let user=await User.findById(req.params._id)
  console.log(user)
  if(!user){
   throw new ApiError(400,"User is not found")
  }
 const Modifieduser=await User.findByIdAndUpdate(req.params._id,req.body,{
   $set:[{userName},{email},{phoneNumber}]
  })
  
   return res
   .status(200)
   .json(new Apiresponce(200, Modifieduser,"User Updated Successfully") )
})

const deleteUser=asyncHandler(async(req,res)=>{
     const user=await User.findById(req.params._id)
     console.log("user is:",user)
     if(!user){
      throw new ApiError(400,"User is not Found")
     }

     const deletedUser=await User.findOneAndDelete(req.params._id);
     if(!deleteUser){
      throw new ApiError(400,"User is Not deleted")
     }

                                                     

     return res
     .status(200)
     .json(new Apiresponce(200,{deletedUser},"User deleted Sucessfully"))
})

const getAllUsers=asyncHandler(async(req,res)=>{
   const allUsers=await User.find()
  
   if(!allUsers){
      throw new ApiError(404,"Users data is not found")
   }
   return res
   .status(200)
   .json(new Apiresponce(200,allUsers,"Users Fetched Successfully"))
})


export {
    RegisterUser,
    loginUsers,
    logOut,
    addUser,
    updateUser,
    deleteUser,
    getAllUsers
}