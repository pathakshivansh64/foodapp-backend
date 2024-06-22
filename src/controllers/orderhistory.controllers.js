import { Order } from "../models/order.models.js";
import { asynchandler } from "../utility/asynchandler.js";





const insertOrderHistory=asynchandler(async(req,res)=>{
   // console.log("aaya")
    const {email,order_data}=req.body;


    const user=await Order.findOne({email});
   

    if(!user){
        await Order.create({
            email,
            orders:[order_data]
        })
       // console.log("iubdc",user,order_data)
        return res.status(200).json({success:true});
    }
    else{
        //console.log("iubdc",user,order_data)
        await Order.findOneAndUpdate({email},{
            $push:{orders:order_data}
        }).then(()=>{
            //console.log("iubdc",user,order_data)
            return res.status(200).json({success:true});
        })
        .catch((err)=>{
            console.log(err)
        })
       

       
    }
})

const showOrderHistory=asynchandler(async(req,res)=>{
     const {email}=req.body

     if(!email){
        return res.status(400).json({success:false,message:"Cannot get your credentials"})
     }

     const user=await Order.findOne({email});

     if(!user){
        return res.status(400).json({success:false,message:"User is not present"})
     }

     return res.status(200).json({success:true,orders:user.orders})
})

export{insertOrderHistory,showOrderHistory}