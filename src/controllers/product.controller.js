import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";

//Get the latest products
const getProducts = asynchandler(async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(5); //-1 is descending
  if (!products || products.length === 0) {
    throw new ApiError(404, "You don't have any product, please create one");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products are fetched successfully"));
});

//Creating a new product
const createProduct = asynchandler(async (req, res) => {
  const { description, name, price, variants } = req.body;

  if ([description, name, price].some((field) => field?.trim === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const productVariants = Array.isArray(variants) ? variants : [];
  const createdProduct = await Product.create({
    description,
    name,
    price,
    variants: productVariants,
  });

  if (!createdProduct) {
    throw new ApiError(500, "Something went wrong while creating product");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdProduct, "Product is added successfully")
    );
});

//Searching for existing product by name, description or by variant name
const searchProducts = asynchandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    throw new ApiError(404, "Invalid search");
  }

  const searchResults = await Product.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { "variants.name": { $regex: query, $options: "i" } },
    ],
  });

  if (searchResults.length === 0) {
    throw new ApiError(404, "No products found matching the search criteria");
  }

  return res.json(
    new ApiResponse(200, searchResults, "Products found successfully")
  );
});

// Update the product
const updateProduct = asynchandler(async (req, res) => {
  const { description, name, price, variants } = req.body;
  const productId = req.params.id;

  if ([description, name, price].some((field) => field?.trim === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const product = await Product.findOne({
    _id: productId,
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      $set: {
        description,
        name,
        price,
        variants,
      },
    },
    { new: true }
  );

  if (!updatedProduct) {
    throw new ApiError(500, "Something went wrong while updating the product");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

//Delete the product
const deleteProduct = asynchandler(async (req, res) => {
  const productId = req.params.id;
  const { variantId } = req.query;

  //Deleting variant of product
  if (variantId) {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $pull: {
          variants: { _id: variantId },
        },
      },
      { new: true }
    );

    if (!updatedProduct) {
      throw new ApiError(
        500,
        "Something went wrong while deleting the variant"
      );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedProduct, "Variant deleted successfully")
      );
  }

  // Deleting product if variant is not choosen
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new ApiError(404, "Unauthorized request or product not found");
  }
  const deletedProduct = await Product.findByIdAndDelete(productId);
  if (!deletedProduct) {
    throw new ApiError(500, "Something went wrong while deleting the product");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, deletedProduct, "Product deleted successfully"));
});

export {
  getProducts,
  createProduct,
  searchProducts,
  updateProduct,
  deleteProduct,
};
