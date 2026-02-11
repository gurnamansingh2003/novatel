const Product = require("../models/product.model");

/**
 * CREATE PRODUCT
 * POST /api/products
 */
const createProduct = async (req, res) => {
  try {
    const { name, description, images, category, specifications } = req.body;

    // Validation
    if (!name || !images || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, Category, and Images are required.",
      });
    }

    const product = await Product.create({
      name,
      description,
      images,
      category,
      specifications, 
      isActive: true
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET ALL PRODUCTS
 * GET /api/products
 */
const getAllProducts = async (req, res) => {
  try {
    // Only fetch products where isActive is true
    const products = await Product.find({ isActive: { $ne: false } });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching products" });
  }
};

/**
 * GET PRODUCT BY ID
 * GET /api/products/:id
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching product" });
  }
};

/**
 * UPDATE PRODUCT
 * PUT /api/products/:id
 */
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Updated successfully", data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * DELETE PRODUCT (SOFT DELETE)
 * DELETE /api/products/:id
 */
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting product" });
  }
};

// EXPORT ALL FUNCTIONS
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};