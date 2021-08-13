
const subCategory = require('../models/subcategory')
const slugify = require('slugify')
const Product = require('../models/product')

exports.create = async(req,res)=>{
    const{name,parent}= req.body 
    try {
        const category = await subCategory({name,parent, slug:slugify(name)}).save()
        res.json(category)
    } catch (error) {
        console.log("CREATE SUB CATEGORY ERROR",error);
res.status(400).send('ERROR IN ATTEMPT TO CREATE SUB CATEGORY ')
    }
    
    
}
exports.read = async(req,res)=>{
const sub = await subCategory.findOne({slug:req.params.slug}).exec()
  const products = await Product.find({subs:sub})
.populate('category').populate('subs')
res.json({sub,products})
}
exports.remove = async(req,res)=>{
    try {
        const deleted = await subCategory.findOneAndDelete({slug:req.params.slug}).exec()
    res.json(deleted)
    } catch (error) {
        console.log("SUB CATEGORY DELETED ERROR", error);
    }
    

}
exports.update = async(req,res)=>{
    const{name,parent}= req.body
    try {
        const updated = await subCategory.findOneAndUpdate({slug:req.params.slug},{name,parent,slug:slugify(name)},{new:true})
        res.json(updated)
    } catch (error) {
        console.log("UPDATE SUB  CATEGORY ERROR",error);
        res.status(400).send("Create sub category error")
    }
    

}
exports.list = async(req,res)=>{
    try {
        const subs = await subCategory.find({}).sort({createdAt:-1}).exec()
      
res.json(subs)
    } catch (error) {
       console.log("SUB CATEGORIES ERROR",error); 
    }

}