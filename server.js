const express = require('express')
const mongoose = require('mongoose')
const morgan= require('morgan')
 require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
//import routes
const authRoutes = require('./routes/auth')
//app
const app = express()

//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true,
     useUnifiedTopology: true,
     useFindAndModify:false,
    
})
.then(()=> console.log('DB CONNECTED'))
.catch(err=>console.log(`DB CONNECTION ERROR ${err}`)
    )

//middlewares
app.use(morgan("dev"))
app.use(bodyParser.json({limit:"2mb"}))
app.use(cors())

//routes middleware

/* fs.readdirSync('./routes').map((r)=>app.use('/api',require('./routes/'+r)))
 */
fs.readdirSync('./routes').map((r)=>app.use('/api',require('./routes/'+ r)))
//port
const port = process.env.PORT
app.listen(port ,()=>{
   console.log(`Server is runing on port ${port}`)
})