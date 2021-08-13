const express = require('express')
const router = express.Router()
const {authCheck}= require('../midllewares/auth')

//controllers
const {userCart,getUserCart,emptyCart,saveAdress,applyCouponToUserCart,createOrder,orders,addToWhishlist,wishlist,removeWishlist,cashOrder}= require('../controllers/userControllers')
//get cart from cart
router.post('/user/cart',authCheck,userCart)
router.get('/user/cart',authCheck,getUserCart)
router.delete('/user/cart',authCheck,emptyCart)
router.post('/user/adress',authCheck,saveAdress)


//coupon
router.post('/user/cart/coupon',authCheck,applyCouponToUserCart)
//order and cash order
router.post('/user/order',authCheck,createOrder)
router.post('/user/cash-order',authCheck,cashOrder)
//get orders
router.get('/user/orders',authCheck,orders)

//whishlist
router.post('/user/whishlist',authCheck,addToWhishlist)
router.get('/user/whishlist',authCheck,wishlist)
router.put('/user/whishlist/:productId',authCheck,removeWishlist)

module.exports = router