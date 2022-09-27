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
	const codes = producstData.map(product => product.code)
	const result = await prisma.products.findMany({
		where: {
			code: {
				in: codes
			}
		}
	})

	if (result) {
		const newProducts = producstData.filter((product, index) => !codes.includes(product.code))
		await prisma.products.createMany({
			data: newProducts
		})
	} else {
		await prisma.products.createMany({
			data: producstData
		})
	}
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