const express = require('express')
const router = express.Router()

//middlewares
const {authCheck,adminCheck}= require('../midllewares/auth')

const {orders,orderStatus}= require('../controllers/adminController')

//routes
router.get('/admin/orders', authCheck,adminCheck,orders)
router.put('/admin/order-status', authCheck,adminCheck,orderStatus)


module.exports = router