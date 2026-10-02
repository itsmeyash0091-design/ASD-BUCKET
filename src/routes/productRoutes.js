import express from "express";
import {
    getAllProducts,
    getProduct,
    addProduct,
    editProduct,
    removeProduct
} from "../controllers/productController.js";
import { validateCreateProduct, validateUpdateProduct } from "../middlewares/productMiddleware.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getProduct);
router.post("/products", validateCreateProduct, addProduct);
router.patch("/products/:id", validateUpdateProduct, editProduct);
router.delete("/products/:id", removeProduct);

export default router;
