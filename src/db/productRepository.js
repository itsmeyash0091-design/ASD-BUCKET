import fs from "fs/promises";
import path from "path";

const dbFilePath = path.join(import.meta.dirname, "db.json");

export const readProducts = async () => {
    const data = await fs.readFile(dbFilePath, "utf-8");
    return JSON.parse(data);
};

export const writeProducts = async (products) => {
    await fs.writeFile(dbFilePath, JSON.stringify(products, null, 4));
};
