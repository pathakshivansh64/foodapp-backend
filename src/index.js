import dotenv from "dotenv"
import { app } from "./app.js";
import connectDB from "./db.js";
const PORT=4000;

dotenv.config({
path:'./.env'
})

connectDB()
.then(()=>{
    app.listen(`${PORT||5000}`,()=>{
        console.log(`Server is listening on port http://localhost:${PORT}`)
    })
})
.catch((error)=>{
   console.log("App is unable to listen ",error);
})