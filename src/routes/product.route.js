import { Router } from "express";
import {
  getProducts,
  createProduct,
  searchProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/create").post(createProduct);
router.route("/latest").get(getProducts);
router.route("/search").get(searchProducts);
router.route("/update/:id").patch(updateProduct);
router.route("/delete/:id").delete(deleteProduct);
export default router;
