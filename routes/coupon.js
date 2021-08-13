const express = require('express')
const router = express.Router()



// import middlewareds
const {authCheck,adminCheck}= require('../midllewares/auth')
//import
const {create ,remove,list }= require('../controllers/couponController')

//routes

router.post('/coupon', authCheck,adminCheck,create)
router.get('/coupons', list)

router.delete('/coupon/:couponId', authCheck,adminCheck,remove)


module.exports=router