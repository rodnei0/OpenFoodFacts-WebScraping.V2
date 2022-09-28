import { getStoredLinks, insertProducts } from '../repositories/productsRepositories.js';
import { Products, Product } from '../repositories/productsRepositories.js';
import * as puppeteer from 'puppeteer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);

const products: Products = [];
let counter = 1;
let pageNumber = 2;

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
	const baseUrl = 'https://world.openfoodfacts.org/';
    await page.goto(baseUrl);

	const linksFromDb = await getStoredLinks();

	const getLinks = async () => {
		let result  = await page.$$eval('#products_match_all li a', element => element.map(link => {
			if (link instanceof HTMLAnchorElement) return link.href
		}));

		result = result.filter((link) => !linksFromDb.includes(link!))

		if (result.length < 100) {
			await page.goto(baseUrl+pageNumber.toString());
			pageNumber++;
			result = await getLinks();
		} else {
			result = result.slice(0,100)
		}

		return result;
	}
    
	const links = await getLinks();

	for (const link of links) {
		console.log('Produto: ',counter);
		await page.goto(link!);

		const productData: Product = await page.evaluate(() => {
			let code = '';
			let codeElement = document.querySelector('#barcode');
			if (codeElement instanceof HTMLElement) {
				code = codeElement.innerText
			}

			const barcode = code+" (EAN / EAN-13)";

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
				imported_t: '',
				url: '',
				product_name,
				quantity,
				categories,
				packaging,
				brands,
				image_url
			}
		})

		if (!productData.code) {
			productData.code = parseInt(link!.split('/')[4]);
			productData.barcode = link!.split('/')[4]+" (EAN / EAN-13)"
		} 

		const product: Product = {
			code: productData.code,
			barcode: productData.barcode,
			imported_t: dayjs().utc().format(),
			url: link!,
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

	const result = await insertProducts(products);

	console.log(result)

    await browser.close();
  })();