const categoryModel=require('../models/category')
const validator=require('../validation/validations.js')
const {uploadFile}= require('../validation/aws.js')

const createCategory=async(req,res)=>{
    try{ 
    let files = req.files;
    let categoryDetails = req.body
    let {name,slug,image}=categoryDetails

    if (!validator.isValidRequestBody(categoryDetails)) {
        return res.status(400).send({ status: false, message: "please provide valid category Details" })
    }

    if (!validator.isValid(name)) {
        return res.status(400).send({ status: false, message: "name is required" })
    }
 
    if (!validator.isValid(slug)) {
        return res.status(400).send({ status: false, message: "slug is required" })
    }

    let Image = await uploadFile(files[0]);
    categoryDetails.image = Image
    console.log(categoryDetails)
    const saveCatrgoryInDb = await categoryModel.create(categoryDetails);

    return res.status(201).send({ status: true, message: "category created successfully!!", data: saveCatrgoryInDb });

} catch (err) {

    return res.status(500).send({ status: false, error: err.message })

}
}

module.exports=createCategory