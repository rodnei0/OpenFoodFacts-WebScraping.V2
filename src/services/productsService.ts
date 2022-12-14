import * as productRepository from "../repositories/productsRepositories.js";
import { notFoundError } from "../utils/errorUtils.js";

export const getProducts = async () => {
  const products = await productRepository.getProducts();

  if (products.length === 0)
    throw notFoundError(
      "There is no products in database, make a web scrape first!"
    );

  return products;
};

export const getProductByCode = async (code: number) => {
  const product = await productRepository.getProductByCode(code);

  if (!product)
    throw notFoundError("There is no product with this code in the database!");

  return product;
};

console.log("teste");
console.log("teste2");
console.log("teste3");
console.log("teste3.1");
console.log("teste4");
console.log("teste4.1");
console.log("teste5");
console.log("teste6");
