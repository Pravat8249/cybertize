const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

 
}, { timestamps: true })


module.exports = mongoose.model('product', productSchema)