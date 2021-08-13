const Category = require('../models/category')
const slugify = require('slugify')
const Sub = require('../models/subcategory')
const Product = require('../models/product')
exports.create = async(req,res)=>{
    const{name}= req.body 
    try {
        const category = await Category({name, slug:slugify(name)}).save()
        res.json(category)
    } catch (error) {
        console.log("CREATE CATEGORY ERROR",error);
res.status(400).send('ERROR IN ATTEMPT TO CREATE CATEGORY ')
    }
    
    
}
exports.read = async(req,res)=>{
const category = await Category.findOne({slug:req.params.slug}).exec()
const products = await Product.find({category})
.populate('category')


.exec()
res.json({category,products})
//res.json(category)
}
exports.remove = async(req,res)=>{
    try {
        const deleted = await Category.findOneAndDelete({slug:req.params.slug}).exec()
    res.json(deleted)
    } catch (error) {
        console.log("CATEGORY DELETED ERROR", error);
    }
    

}
exports.update = async(req,res)=>{
    const{name}= req.body
    try {
        const updated = await Category.findOneAndUpdate({slug:req.params.slug},{name,slug:slugify(name)},{new:true})
        res.json(updated)
    } catch (error) {
        console.log("UPDATE CATEGORY ERROR",error);
        res.status(400).send("Create category error")
    }
    

}
exports.list = async(req,res)=>{
    try {
        const categories = await Category.find({}).sort({createdAt:-1}).exec()
res.json(categories)
    } catch (error) {
       console.log("CATEGORIES ERROR",error); 
    }

}
exports.getSubs=(req,res)=>{
Sub.find({parent:req.params._id}).exec((error,subs)=>{
   if(error){
       console.log(error);
   } else{
       res.json(subs)
   }
})
}