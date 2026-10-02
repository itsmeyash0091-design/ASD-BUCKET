export const validateCreateProduct = (req, res, next) => {
    const { id, name, price } = req.body;

    if (typeof id !== "number" || typeof name !== "string" || typeof price !== "number") {
        return res.status(400).json({
            error: "Invalid payload. 'id' must be a number, 'name' must be a string, and 'price' must be a number."
        });
    }

    next();
};

export const validateUpdateProduct = (req, res, next) => {
    const { name, price } = req.body;

    if (name === undefined && price === undefined) {
        return res.status(400).json({
            error: "Invalid update payload. Please provide at least 'name' or 'price' to update."
        });
    }

    if (name !== undefined && typeof name !== "string") {
        return res.status(400).json({
            error: "Invalid data type. 'name' must be a string."
        });
    }

    if (price !== undefined && typeof price !== "number") {
        return res.status(400).json({
            error: "Invalid data type. 'price' must be a number."
        });
    }

    next();
};

export default validateCreateProduct;
