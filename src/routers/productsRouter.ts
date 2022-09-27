import { Router } from "express"
import * as productsController from '../controllers/productsController.js';

const productRouter = Router();

productRouter.get("/", productsController.get);
productRouter.get("/products", productsController.getProducts);
productRouter.get("/products/:code", productsController.getProductByCode);

export default productRouter;

