import { readProducts, writeProducts } from "../db/productRepository.js";

const productCache = {};

const clearProductCache = () => {
    Object.keys(productCache).forEach((cacheKey) => delete productCache[cacheKey]);
};

const fetchProductsWithDelay = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return readProducts();
};

export const getProducts = async () => {
    const cacheKey = "/products";

    if (productCache[cacheKey]) {
        return productCache[cacheKey];
    }

    const products = await fetchProductsWithDelay();
    productCache[cacheKey] = products;
    return products;
};

export const getProductById = async (productId) => {
    const cacheKey = `/products/${productId}`;

    if (productCache[cacheKey]) {
        return productCache[cacheKey];
    }

    const products = await fetchProductsWithDelay();
    const product = products.find((item) => String(item.id) === String(productId));
    const result = product || null;
    productCache[cacheKey] = result;
    return result;
};

export const createProduct = async (newProduct) => {
    const products = await readProducts();
    products.push(newProduct);
    await writeProducts(products);
    clearProductCache();
    return newProduct;
};

export const patchProduct = async (productId, updateData) => {
    const products = await readProducts();
    const index = products.findIndex((item) => String(item.id) === String(productId));

    if (index === -1) {
        return null;
    }

    products[index] = { ...products[index], ...updateData, id: products[index].id };
    await writeProducts(products);
    clearProductCache();
    return products[index];
};

export const deleteProduct = async (productId) => {
    const products = await readProducts();
    const index = products.findIndex((item) => String(item.id) === String(productId));

    if (index === -1) {
        return null;
    }

    const [deletedProduct] = products.splice(index, 1);
    await writeProducts(products);
    clearProductCache();
    return deletedProduct;
};
