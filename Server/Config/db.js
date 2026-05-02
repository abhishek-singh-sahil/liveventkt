const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_ONLINE_URI)
        // await mongoose.connect(process.env.MONGO_OFFLINE_URI)
        console.log("DB connected ");
    
    }catch{
        console.log("DB connection failed !");
        
    }
    }

module.exports = connectDB;