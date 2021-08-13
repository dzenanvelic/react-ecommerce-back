const express = require('express')
const router = express.Router()



// import middlewareds
const {authCheck,adminCheck}= require('../midllewares/auth')
//import
const {create,read,update ,remove,list }= require('../controllers/subCategoryControllers.js')

//routes

router.post('/sub', authCheck,adminCheck,create)
router.get('/subs', list)
router.get('/sub/:slug',read)
router.put('/sub/:slug', authCheck,adminCheck,update)
router.delete('/sub/:slug', authCheck,adminCheck,remove)











module.exports = router