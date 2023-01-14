const { default: mongoose } = require('mongoose')
const productModel=require('../models/productModel')

exports.filterDetails = async (req, res) => {

    let pipeline = [
      {$match:{category:mongoose.Types.ObjectId(req.body.category)}}
    ]

    if (req.body.isSort) {
        if(req.body.sort_key=="desc"){
            pipeline.push(
                {
                    $sort: {
                        sortprice:-1
                    }
                }
            )
        }else if(req.body.sort_key=="asc"){
            pipeline.push(
                {
                    $sort: {
                        sortprice:1
                    }
                }
            )
        }
    }
    if (req.body.isFilter) {
        if (req.body.isColor) {
           pipeline.push(
            {
                "$match": {
                  "attributes": {
                    "$elemMatch": {
                      "color": {
                        "$elemMatch": {
                          "colorCode": {
                            "$all": req.body.color_id
                          }
                        }
                      }
                    }
                  }
                }
              }
           )
        }
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
        if(req.body.lower||req.body.greater){
            pipeline.push(
                {
                    $match: {
                      "sortprice": {
                        $gt: req.body.lower,
                        $lt: req.body.greater
                      }
                    }
                  }
            )
        }
    }
    console.log(pipeline)
    let data = await productModel.aggregate(pipeline)
    return res.send(data)
}