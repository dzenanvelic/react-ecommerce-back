const express = require('express')

const router = express.Router()

const {createPaymentIntent}= require('../controllers/stripeController')
//authcheck
const {authCheck}= require('../midllewares/auth')

router.post('/create-payment-intent',authCheck,createPaymentIntent)






module.exports=router