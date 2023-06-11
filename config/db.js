<<<<<<< HEAD
const mongoose = require('mongoose');
const connectDB = async () => {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/hitech");
    console.log("Mongo connected")
}
<<<<<<< HEAD
module.exports = connectDB
=======
const mongoose = require('mongoose');
const connectDB = async () => {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/hitech");
    console.log("Mongo connected")
}
module.exports   = connectDB; 
>>>>>>> batsukh
=======
module.exports   = connectDB; 
>>>>>>> 8bf766bc18eea96dde63f1efab934f9f83203263
