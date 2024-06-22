import mongoose,{Schema} from "mongoose";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
const jwtsecret="fooddeliveryapp"


const userSchema=new Schema({

    name:{
        type:String,
        required:true,
        lowercase:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    }

},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateauthtoken=async function(){
    return jwt.sign(
    {
       id:this._id,
       email:this.email,

    },jwtsecret)

}
export const User=mongoose.model("User",userSchema)