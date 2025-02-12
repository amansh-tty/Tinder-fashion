import express from "express";
import { getProducts, getProductById, addProduct, deleteProduct } from "../controllers/productController";

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", addProduct);
router.delete("/products/:id", deleteProduct);

export default router;
