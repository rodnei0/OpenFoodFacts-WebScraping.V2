import * as puppeteer from 'puppeteer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);

interface Product {
    code: number;
    barcode: string;
    status: string;
    imported_t?: string;
    url?: string;
    product_name: string;
    quantity: string;
    categories: string;
    packaging: string;
    brands: string;
    image_url?: string;
};

interface Products extends Array<Product> { };

const products: Products = [];
let counter = 1;
const baseImageUrl = 'https://static.openfoodfacts.org/images/products/';


(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto('https://world.openfoodfacts.org');
    
/*     const links = await page.evaluate(() => {
            let elements = Array.from(document.querySelectorAll('#products_match_all li a'))
            let links = elements.map(link => {
                if (link instanceof HTMLAnchorElement) {
                    return link.href
                }
            })
            return links
    }); */

	/* 		const code = await page.$eval('#barcode', element => {if (element instanceof HTMLElement) return element.innerText})
        const barcode = code+" (EAN / EAN-13)";
        const status = "imported";
        const imported_t = dayjs().utc().format();
        const url = link;
        const product_name = await page.$eval('h1', element => {if (element instanceof HTMLElement) return element.innerText.split(' -')[0]});
        const quantity = await page.$eval('#field_quantity_value', element => {if (element instanceof HTMLElement) return element.innerText});
        const categories = await page.$eval('#field_categories_value', element => {if (element instanceof HTMLElement) return element.innerText});
        const packaging = await page.$eval('#field_packaging_value', element => {if (element instanceof HTMLElement) return element.innerText});
        const brands = await page.$eval('#field_brands_value', element => {if (element instanceof HTMLElement) return element.innerText}); */

    const links = await page.$$eval('#products_match_all li a', element => element.map(link => {
		if (link instanceof HTMLAnchorElement) return link.href
	}));
    
	// for (let i = 0; i < 3; i++) {
	for (const link of links) {
		console.log('Produto: ',counter);
		// await page.goto(links[i]);
		await page.goto(link);

		const productData: Product = await page.evaluate(() => {
			let code = '';
			let codeElement = document.querySelector('#barcode');
			if (codeElement instanceof HTMLElement) {
				code = codeElement.innerText
			}

			const barcode = code+" (EAN / EAN-13)";
			const status = "imported";

			let product_name = '';
			let product_nameElement = document.querySelector('h1');
			if (product_nameElement instanceof HTMLElement) {
				product_name = product_nameElement.innerText.split(' -')[0]
			}

			let quantity = '';
			let quantityElement = document.querySelector('#field_quantity_value');
			if (quantityElement instanceof HTMLElement) {
				quantity = quantityElement.innerText
			}

			let categories = '';
			let categorieslement = document.querySelector('#field_categories_value');
			if (categorieslement instanceof HTMLElement) {
				categories = categorieslement.innerText
			}

			let packaging = '';
			let packagingElement = document.querySelector('#field_packaging_value');

			if (packagingElement instanceof HTMLSpanElement) {
				packaging = packagingElement.innerText
			}

			let brands = '';
			let brandslement = document.querySelector('#field_brands_value a');
			if (brandslement instanceof HTMLAnchorElement) {
				brands = brandslement.innerText
			}

			let image_url = '';
			let image_urlElement = document.querySelector('#og_image');
			if (image_urlElement instanceof HTMLImageElement) {
				image_url = image_urlElement.src
			}

			return {
				code: parseInt(code),
				barcode,
				status,
				product_name,
				quantity,
				categories,
				packaging,
				brands,
				image_url
			}
		})

		const product: Product = {
			code: productData.code,
			barcode: productData.barcode,
			status: productData.status,
			imported_t: dayjs().utc().format(),
			// url: links[i],
			url: link,
			product_name: productData.product_name,
			quantity: productData.quantity,
			categories: productData.categories,
			packaging: productData.packaging,
			brands: productData.brands,
			image_url: productData.image_url
		}

        products.push(product)

		counter++;
	}

    console.log(products);

    await browser.close();
  })();