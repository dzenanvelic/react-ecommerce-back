const mongoose = require('mongoose')
const {ObjectId}= mongoose.Schema

const couponSchema = new mongoose.Schema({
name:{
    type:String,
    unique:true,
    trim:true,
    uppercase:true,
    required:[true,"Name is required"],
    minlength:[6, "Too short"],
    maxlength:[12,"Too long"]
},
expire:{
    type:Date,
    required:true,
},
discount:{
    type:Number,
    required:true
}
},{timestamps:true})

module.exports = mongoose.model("Coupon", couponSchema)