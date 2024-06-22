import { asynchandler } from "../utility/asynchandler.js";
import mongoose from "mongoose";


const displaydata=asynchandler((req,res)=>{
    res.send([global.fooddata,global.foodcategory]);
})

export {displaydata}
