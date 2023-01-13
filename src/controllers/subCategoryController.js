const subCategoryModel=require('../models/subCategory')
const validator=require('../validation/validations.js')
const {uploadFile}= require('../validation/aws.js')

const createsubCategory=async(req,res)=>{
    try{
    let files = req.files;
    let subCategoryDetails = req.body
    let categoryId=req.params.categoryId
    let {name,slug,image}=subCategoryDetails
    subCategoryDetails.category_id=categoryId

    if (!validator.isValidRequestBody(subCategoryDetails)) {
        return res.status(400).send({ status: false, message: "please provide valid category Details" })
    }

    if (!validator.isValidObjectId(categoryId)) {
        return res.status(400).send({ status: false, message: "please provide valid categoryId" })
    }

    if (!validator.isValid(name)) {
        return res.status(400).send({ status: false, message: "name is required" })
    }
 
    if (!validator.isValid(slug)) {
        return res.status(400).send({ status: false, message: "slug is required" })
    }

    let Image = await uploadFile(files[0]);
    subCategoryDetails.image = Image
    const saveSubCatrgoryInDb = await subCategoryModel.create(subCategoryDetails);

    return res.status(201).send({ status: true, message: "category created successfully!!", data: saveSubCatrgoryInDb });

} catch (err) {

    return res.status(500).send({ status: false, error: err.message })

}
}
module.exports=createsubCategory