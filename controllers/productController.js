const Product = require("../models/Product");

// সব পণ্য দেখা
exports.getAllProducts = async (req, res) => {
  try {
    const { category, isNewStock } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (isNewStock) filter.isNewStock = isNewStock === "true";

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// একটি পণ্যের ডিটেলস
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "পণ্য পাওয়া যায়নি" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// নতুন পণ্য যোগ
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// পণ্য এডিট
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product)
      return res.status(404).json({ message: "পণ্য পাওয়া যায়নি" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// পণ্য ডিলিট
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ message: "পণ্য পাওয়া যায়নি" });
    res.json({ message: "পণ্য ডিলিট হয়েছে ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
