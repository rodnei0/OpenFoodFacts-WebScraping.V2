import { Router } from "express";
import productRouter from "./productsRouter.js";

const router = Router();

router.use(productRouter);

export default router;