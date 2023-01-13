const childCategoryModel=require('../models/childCategory')
const validator=require('../validation/validations.js')
const {uploadFile}= require('../validation/aws.js')

const childCreateCategory=async(req,res)=>{
    try{
    let files = req.files;
    let childCategoryDetails = req.body
    let subCategoryId=req.params.subCategoryId
    let {name,slug,image}=childCategoryDetails
    childCategoryDetails.subCategory_id=subCategoryId
    
    if (!validator.isValidRequestBody(childCategoryDetails)) {
        return res.status(400).send({ status: false, message: "please provide valid child category Details" })
    }

    if (!validator.isValidObjectId(subCategoryId)) {
        return res.status(400).send({ status: false, message: "please provide valid category Details" })
    }

    if (!validator.isValid(name)) {
        return res.status(400).send({ status: false, message: "name is required" })
    }
 
    if (!validator.isValid(slug)) {
        return res.status(400).send({ status: false, message: "slug is required" })
    }

    let Image = await uploadFile(files[0]);
    childCategoryDetails.image = Image
    const saveChildCatrgoryInDb = await childCategoryModel.create(childCategoryDetails);

    return res.status(201).send({ status: true, message: "category created successfully!!", data: saveChildCatrgoryInDb });

} catch (err) {

    return res.status(500).send({ status: false, error: err.message })

}
}

module.exports=childCreateCategory