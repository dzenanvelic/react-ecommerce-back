const express = require('express')
const router = express.Router()


// import middlewareds
const {authCheck,adminCheck}= require('../midllewares/auth')
//import
const {create,listAll,remove,read,update ,list,rating,total,listRelated,searchFilters}= require('../controllers/productControllers.js')

//routes

router.post('/product', authCheck,adminCheck,create)
router.get('/products/total', total)
router.get('/products/:count', listAll)
router.delete('/product/:slug',authCheck,adminCheck,remove)
router.get('/product/:slug',read)
router.put('/product/:slug',authCheck,adminCheck, update)
router.post('/products', list)

//rating
router.put('/product/star/:productId',authCheck, rating)
router.get('/product/related/:productId',listRelated)
//search
router.post('/search/filters',searchFilters)

module.exports = router 