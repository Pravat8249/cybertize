const productModel=require('../models/productModel')
exports . addProducts=async(req,res)=>{
    const newProduct=new productModel(req.body)
    newProduct.validate().then(async (_noerr)=>{
     newProduct.save().then(()=>{
        res.send('added product successfull')
     })
    }).catch((err) => {
        return res.send(err)
    })
}