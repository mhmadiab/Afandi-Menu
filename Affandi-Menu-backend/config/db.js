import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://mhmadiab17:07510250m$D@cluster0.qsfca.mongodb.net/food-del')
    .then(()=>{
        console.log("database connected")
    })
    .catch((error)=>{
        console.log(error)
    })
}