const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({

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
category_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category'
}

}, { timestamps: true })


module.exports = mongoose.model('subcategory', subCategorySchema)