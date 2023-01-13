const category=require('../models/category')
const subcategory=require('../models/subCategory.js')

const getDetails=async(req,res)=>{
let allCollectionsData= await category.aggregate([{ 
    $lookup: {
        from: "subcategories",
        let: {
            category_id: "$_id"
        },
      pipeline:[
        {
            $match: { $expr: { $eq: ["$category_id", "$$category_id"] } }
        },
        {
            $lookup: {
                from: 'childcategories',
                localField: '_id',
                foreignField: 'subCategory_id',
                as: 'childcategory'
            }
        },{$project:{_id:0,createdAt:0,updatedAt:0,__v:0,category_id:0}}
      ],
        as: "subcategory"
    }},{$project:{_id:0,createdAt:0,updatedAt:0,__v:0}}
])
return res.send(allCollectionsData)
}
module.exports=getDetails