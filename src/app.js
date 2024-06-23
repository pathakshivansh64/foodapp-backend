import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';

const app=express()

app.use(cors())

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true,limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes

import userrouter from './routes/user.routes.js'
import displaydata from './routes/data.routes.js'

app.use('/user',userrouter)
app.use('/data',displaydata)
app.get('/',(req,res)=>{
    res.send("hello")
})



export {app}