const express = require('express')
const router = express.Router()


// import middlewareds
const {authCheck,adminCheck}= require('../midllewares/auth')
//import
const {create,read,update ,remove,list,getSubs }= require('../controllers/categoryControllers.js')

//routes

router.post('/category', authCheck,adminCheck,create)
router.get('/categories', list)
router.get('/category/:slug',read)
router.put('/category/:slug', authCheck,adminCheck,update)
router.delete('/category/:slug', authCheck,adminCheck,remove)
router.get('/category/subs/:_id',getSubs)

module.exports = router