const mongoose = require("mongoose");

const childCategorySchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: true,
    lowercase: true
},

image: {
  type:String,
  required: true,
},
subCategory_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subcategory'
}

}, { timestamps: true })


module.exports = mongoose.model('childcategory', childCategorySchema)