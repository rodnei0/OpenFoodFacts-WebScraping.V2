import prisma from "../database.js";

export interface Product {
    code: number;
    barcode: string;
    imported_t: string ;
    url: string;
    product_name: string;
    quantity: string;
    categories: string;
    packaging: string;
    brands: string;
    image_url: string;
}


export interface Products extends Array<Product> { };

export const insertProducts = async (producstData: Products) => {
	const result = await prisma.products.createMany({
		data: producstData
	});

	return result
};

export const getProducts = async () => {
	const result = await prisma.products.findMany();

	return result
};

export const getProductByCode = async (code: number) => {
	const result = await prisma.products.findUnique({
		where: {
			code: code,
		}
	})

	return result
};

export const getStoredLinks = async () => {
	const result = await prisma.products.findMany({
		select: {
			url: true
		}
	});

	const links = result.map(({url}) => url);

	return links
}