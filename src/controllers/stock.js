const { default: mongoose } = require('mongoose')
const productModel=require('../models/productModel')

exports.stockCheck = async (req, res) => {

    let pipeline = [
      {$match:{_id:mongoose.Types.ObjectId(req.body.productId)}}
    ]
     if (req.body.isSize) {
        pipeline.push(
            {
                $match:{
                    "attributes":{
                        "$elemMatch":{
                           "title":{
                            "$all":req.body.size_id
                           }
                        }
                    }
                }
            }
        )
    }

    console.log(pipeline)
    let data=null
    try{
        data = await productModel.aggregate(pipeline)
        if(!data.length){
          return res.send('no product found') 
        }
      }catch(err){
        return res.send(err)
      }
      let arr=[]
      let result=data[0]?.attributes.filter(x=>{
        x.color.forEach(e=>{
          e.fabric.forEach(f=>{
           arr.push(f.stock)
          })
        })
      })
      let output=arr.every(x=>x==0)
      if(!output){
        res.send(data)
      }else{
        res.send('product out of stock')
      }
}