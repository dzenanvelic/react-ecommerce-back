const { findOneAndUpdate } = require('../models/user')
const User = require('../models/user')

exports.createOrUpdateUser  = async(req,res)=>{
   const {name, picture, email}= req.user
   const user = await User.findOneAndUpdate({email},{name:email.split('@')[0], picture}, {new:true})
   if(user){
       res.json(user)
      // console.log("USER UPDATED", user);
   }else{
       const newUser = new User({name:email.split('@')[0], email, picture}).save()
       res.json(newUser)
      // console.log("NEW USER CREATED", newUser);
   }
}
exports.currentUser=async(req, res)=>{
    await User.findOne({email:req.user.email}).exec((error,user)=>{if(error)
        console.log("USER not found",error);
    
        res.json(user)
    }
    )
}