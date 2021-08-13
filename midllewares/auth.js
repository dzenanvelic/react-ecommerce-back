const admin = require('../firebase')
const User = require('../models/user')

exports.authCheck = async(req,res,next)=>{
    //console.log(req.headers);
    try {
        const firebaseUser = await admin
        .auth()
        .verifyIdToken(req.headers.authtoken)
req.user = firebaseUser
//console.log("FIREBASE USER IN AUTHCHECK", firebaseUser);
next()
    } catch (error) {
        console.log("AuthcheckToken", error);
        res.status(401).json({error:"Token is expired or bad token"})
    }
    
}
exports.adminCheck =async(req,res,next)=>{
    const {email}= req.user
const adminUser = await User.findOne({email}).exec()
if(adminUser.role !== 'admin'){
    res.status(403).json({
        error:"Access denied, You must be admin for this function"
    })
}else{
    next()
}

}