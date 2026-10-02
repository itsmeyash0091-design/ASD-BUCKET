import {
    getProducts,
    getProductById,
    createProduct,
    patchProduct,
    deleteProduct
} from "../services/productService.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await getProductById(productId);

        if (!product) {
            return res.status(404).json({ error: `Product not found with ID ${productId}.` });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addProduct = async (req, res) => {
    try {
        const newProduct = await createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const editProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await patchProduct(productId, req.body);

        if (!updatedProduct) {
            return res.status(404).json({ error: `Product not found with ID ${productId}.` });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await deleteProduct(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: `Product not found with ID ${productId}.` });
        }

        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};