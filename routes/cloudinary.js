const express = require('express')
const { upload,remove } = require('../controllers/cloudinaryControllers')
const router = express.Router()

const {authCheck,adminCheck}= require('../midllewares/auth')

//routes
router.post('/uploadimages',authCheck,adminCheck,upload)
router.post('/removeimage',authCheck,adminCheck,remove)


module.exports = router