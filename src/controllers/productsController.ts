import { Request, Response } from "express";
import * as productService from '../services/productsService.js';

export const get = async (req: Request, res: Response) => {
    res.send("Server is up and running!").status(200)
};

export const getProducts = async (req: Request, res: Response) => {
    const products = await productService.getProducts();

    res.send(products).status(200)
};

export const getProductByCode = async (req: Request, res: Response) => {
    const { code } = req.params;

    const products = await productService.getProductByCode(code);

    res.send(products).status(200)
};