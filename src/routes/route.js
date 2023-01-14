const express=require('express')
const router=express.Router()


const category=require('../controllers/categoryController')
const subCategory=require('../controllers/subCategoryController')
const childCategory=require('../controllers/childCategoryController')
const getDetails=require('../controllers/getdata')
const {filterDetails}=require('../controllers/cartFilter')
const {addProducts}=require('../controllers/createProduct')


router.post('/category',category)
router.post('/subcategory/:categoryId',subCategory)
router.post('/childcategory/:subCategoryId',childCategory)
router.get('/user',getDetails)
router.get('/filter',filterDetails)


module.exports=router