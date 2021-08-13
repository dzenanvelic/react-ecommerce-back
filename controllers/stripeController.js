const User = require('../models/user')
const Cart = require('../models/cart')
const Product = require('../models/product')
const Coupon = require('../models/couponModel')
const stripe = require('stripe')(process.env.STRIPE_SECRET)




exports.createPaymentIntent=async(req,res)=>{
   // console.log(req.body)
  const {couponApplied}=req.body
//apply coupon

//calc price

//find user
const user =await User.findOne({email:req.user.email})
//get user cart total
const {cartTotal,totalAfterDiscount}=await Cart.findOne({orderedBy:user._id}).exec()

//console.log("CART TOTAL",cartTotal,"TOTAL AFTER DISC",totalAfterDiscount)

let finalAmount = 0
if(couponApplied && totalAfterDiscount){
    finalAmount = totalAfterDiscount * 100;
}else{
    finalAmount = cartTotal * 100;
}
//create payment intent with amount and currency

const paymentIntent= await stripe.paymentIntents.create({
    amount:finalAmount,
    currency:'usd',
})
res.send({
    clientSecret:paymentIntent.client_secret,cartTotal,totalAfterDiscount,payable:finalAmount,
})
}