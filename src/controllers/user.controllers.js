import { asynchandler } from "../utility/asynchandler.js";
import mongoose from "mongoose";
import { User } from "../models/user.models.js";





const signup=(asynchandler(async(req,res)=>{

    let success=false;

    

   

    const {name,email,password}=req.body

    if(!name||!email||!password){
        return res.status(400).json({success,message:"Complete all Parameters"})
    }

   

    //console.log(name,email,password);

    let user=await User.findOne({
        $or:[{name},{email}]
    })
    //console.log("user",user)

    if(user){
      return  res.status(400).json({success,error:"User already exists!"});
    }
    

    user=await User.create({
        name,
        email,
        password
    })



    const createduser=await User.findById(user._id).select("-password");

    if(!createduser){
        return res.status(500).json({error:"Something went wrong while creating user"})
    }

    success=true;
    return res.status(200).json({success,createduser,message:"User created successfully"})

}))

const login=asynchandler(async(req,res)=>{
    let success=false;
    const {email,password}=req.body

    if(!email||!password){
      return  res.status(400).json({success,message:"Credentials is required"})
    }

    const user=await User.findOne({email})

    if(!user){
        return res.status(400).json({success,error:"Sorry! you entered wrong credentials"})
    }

    const isPasswordvalid= await user.isPasswordCorrect(password);

    if(!isPasswordvalid){
        return res.status(400).json({success,error:"Sorry! you entered wrong credentials"})
    }

    const authtoken=await user.generateauthtoken();
    

    success=true;

    return res.status(200).json({success,authtoken,message:"User loggedIn successfully!"});
})


export {signup,login}