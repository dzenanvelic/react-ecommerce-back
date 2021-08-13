const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const Coupon = require('../models/couponModel')
const Order = require('../models/order')
const { findOneAndUpdate } = require('../models/user')
const uniqueid = require('uniqueid')
exports.userCart = async(req,res)=>{
    console.log("REQ BODY CART",req.body);//cart:[]
    const {cart}= req.body

    let products =[]

    const user = await User.findOne({email:req.user.email}).exec()

    //check if cart already exists
    let cartExistByThisUser= await Cart.findOne({orderedBy:user._id}).exec()
    if(cartExistByThisUser){
        cartExistByThisUser.remove()
        console.log("removed old cart");
    }
    for(let i=0; i<cart.length;i++){
let object={}
object.product = cart[i]._id
object.count=cart[i].count
object.color=cart[i].color
//get price for creating  total
let productForPrice = await Product.findById(cart[i]._id).select("price").exec();
object.price= productForPrice.price
products.push(object)
    }
    //console.log("products",products);
    let cartTotal=0
    for(let i=0; i<products.length;i++){
        cartTotal= cartTotal + products[i].price * products[i].count
    }
    //console.log("cart total", cartTotal)
    let newCart = await new Cart({
        products,
        cartTotal,
        orderedBy:user._id,

    }).save()
   // console.log('new cart----->',newCart)
    res.json({ok:true})
}
exports.getUserCart=async(req,res)=>{
    const user = await User.findOne({email:req.user.email}).exec()
    let cart = await Cart.findOne({orderedBy:user._id}).populate('products.product',).exec()
    const{products,cartTotal,totalAfterDiscount}= cart
    res.json({products,cartTotal,totalAfterDiscount})
}
exports.emptyCart=async(req,res)=>{
    const user = await User.findOne({email:req.user.email}).exec()
    let cart = await Cart.findOneAndRemove({orderedBy:user._id}).exec()
    res.json(cart)
}

exports.saveAdress=async(req,res)=>{
const userAdress=await User.findOneAndUpdate({email:req.user.email},{address:req.body.adress}).exec()
res.json({ok:true})
}
exports.applyCouponToUserCart=async(req,res)=>{
    const{coupon}= req.body
    console.log("COUPON",coupon)
    const validCoupon = await Coupon.findOne({name:coupon}).exec()
    if(validCoupon === null){
        return res.json({
            err:"Invalid coupon"
        })
    }
    console.log('VALID COUPON',validCoupon)
    const user = await User.findOne({email:req.user.email})

    let {products,cartTotal}= await Cart.findOne({orderedBy:user._id}).populate('products.product', '_id title price').exec()

    console.log("cart total",cartTotal,'discount%',validCoupon.discount)
    //total after discount
    let totalAfterDiscount = (cartTotal = (cartTotal * validCoupon.discount)/100).toFixed(2)

    Cart.findOneAndUpdate({orderedBy:user._id},{totalAfterDiscount},{new:true}).exec()
    res.json(totalAfterDiscount)
}
//order
exports.createOrder=async(req,res)=>{
    const {paymentIntent}=req.body.stripeResponse
    const user = await User.findOne({email:req.user.email})

    let {products} =await Cart.findOne({orderedBy:user._id}).exec()
let newOrder = await new Order({products,paymentIntent,orderedBy:user._id}).save()
//console.log("New order true",newOrder)
//decrement qty incr sold
let bulkOption = products.map((item)=>{
return {
    updateOne:{
        filter:{
            _id:item.product._id
        },
        update:{$inc:{quantity: -item.count,sold: +item.count}}
    }
} 
})
let updated = await Product.bulkWrite(bulkOption,{new:true})
console.log("product qty-- changed dcmt and sold ++",updated)
res.json({ok:true})
}

exports.orders= async(req,res)=>{
    const user = await User.findOne({email:req.user.email}).exec()

    const orders = await Order.find({orderedBy:user._id}).populate("products.product").sort({createdAt:-1}).exec()

    res.json(orders)
}//whishlist


exports.addToWhishlist=async(req,res)=>{
const{productId}= req.body

const user = await User.findOneAndUpdate({email:req.user.email},{$addToSet:{wishlist:productId}},{new:true}).exec()
res.json({ok:true})
}

exports.wishlist=async(req,res)=>{
    const list = await User.findOne({email:req.user.email}).select("wishlist").populate('wishlist').exec()
    res.json(list)
}

exports.removeWishlist=async(req,res)=>{
const {productId}= req.params
const user = await User.findOneAndUpdate({email:req.user.email},{$pull:{wishlist:productId}},{new:true}).exec()
res.json({ok:true})
}

exports.cashOrder=async(req,res)=>{

    const {COD,couponApplied}=req.body
   
//if COD true create order with cash on delivery status

if(!COD) return res.status(400).send("Create cash order failed")
    const user = await User.findOne({email:req.user.email})


    let userCart =await Cart.findOne({orderedBy:user._id}).exec()

    //applied coupon
    let finalAmount = 0
if(couponApplied && userCart.totalAfterDiscount){
    finalAmount = userCart.totalAfterDiscount * 100;
}else{
    finalAmount = userCart.cartTotal * 100;
}

//save new order
let newOrder = await new Order({products:userCart.products,paymentIntent:
    {
        id:uniqueid(),
        amount:finalAmount,
        currency:"usd",
        status:"Cash On Delivery",
        created:Date.now(),
        payment_method_types:["cash"],

    },orderedBy:user._id,orderStatus:"Cash on Delivery"}).save()
//console.log("New order true",newOrder)
//decrement qty incr sold
let bulkOption = userCart.products.map((item)=>{
return {
    updateOne:{
        filter:{
            _id:item.product._id
        },
        update:{$inc:{quantity: -item.count,sold: +item.count}}
    }
} 
})
let updated = await Product.bulkWrite(bulkOption,{new:true})
console.log("product qty-- changed dcmt and sold ++",updated)
res.json({ok:true})
}