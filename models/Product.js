const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ["শাড়ি", "জামা", "থ্রি-পিস", "সালোয়ার কামিজ"],
    required: true,
  },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  stock: { type: Number, default: 0 },
  images: [String],
  description: { type: String },
  fabric: { type: String },
  embroidery: { type: Boolean, default: false },
  guarantee: { type: Boolean, default: false },
  sizes: [String],
  colors: [String],
  isNewStock: { type: Boolean, default: false },
},
 { timestamps: true },
);
module.exports = mongoose.model("Product", productSchema);