const express = require('express')
const router = express.Router()

// import middlewareds
const {authCheck,adminCheck}= require('../midllewares/auth')
//import
const {createOrUpdateUser,currentUser }= require('../controllers/authControllers')



router.post('/create-or-update-user',authCheck,createOrUpdateUser)
router.post('/current-user',authCheck,currentUser)
router.post('/current-admin',authCheck,adminCheck,currentUser)


module.exports = router