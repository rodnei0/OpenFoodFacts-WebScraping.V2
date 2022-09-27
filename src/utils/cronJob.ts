import { scrapeProducts } from "./scrapeProducts.js";
import cron from 'node-cron';

cron.schedule('0 1 * * *', () => {
    scrapeProducts();
});