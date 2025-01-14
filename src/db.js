import mongoose from 'mongoose';
const DB_NAME="foodapp";
const MongoURI="mongodb+srv://shivanshpathak64:shivanshdb123@cluster0.6qil9vv.mongodb.net/foodapp"


const connectDB=async()=>{
    try {
      const result=await  mongoose.connect(MongoURI);
      const fetcheddata= result.connection.db.collection("foodData");
      const data=await fetcheddata.find({}).toArray()
      if(!data){
        console.log("Cannot get data from database");
      }
      else{
        const catdata=result.connection.db.collection("foodCategory");
        const foodcat=await catdata.find({}).toArray();

        if(!foodcat){
          console.log("Cannot get data from database");
        }
        else{
          global.fooddata=data;
          global.foodcategory=foodcat;
        }
      }
      
      console.log("MOngoDB connected Successfully");
    } catch (error) {
        console.log("Connnection failed",error);
        process.exit(1);
        
    }
}

export default connectDB;