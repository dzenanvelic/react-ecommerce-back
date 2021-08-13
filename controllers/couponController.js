const Coupon=require('../models/couponModel')


exports.create = async (req,res)=>{
    
    try {
        /* console.log(req.body.coupon)
       return  */
       const{name, expire,discount}= req.body.coupon
       res.json(await new Coupon({name, expire,discount}).save())
    } catch (error) {
        res.json("SAVE COUPON ERROR",error)
        console.log("COUPON SAVE ERROR",error)
    }
}
exports.list = async(req,res)=>{
 try {
        const coupons= await Coupon.find({}).sort({createdAt:-1}).exec()
        res.status(200).json(coupons)
    } catch (error) {
        console.log('====================================');
        console.log("GET COUPONS ERROR",error);
        console.log('====================================');
    }
}
exports.remove = async(req,res)=>{
 try {
   res.json(await Coupon.findByIdAndDelete(req.params.couponId).exec())
   
    } catch (error) {
        console.log("ERROR DEL COUPON", coupon)
        res.status(500).json("ERROR DEL COUPON",error)
    }
}