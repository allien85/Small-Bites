import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { refreshPrices } from './providers/waitrose-provider.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const seedPath = path.join(root, 'data/products.live.json');
let data;
try { data = JSON.parse(await fs.readFile(seedPath, 'utf8')); }
catch { data = JSON.parse(await fs.readFile(path.join(root, 'data/products.seed.json'), 'utf8')); }
const products = await refreshPrices(data.products);
const out = { lastRefresh: new Date().toISOString(), products };
await fs.writeFile(path.join(root, 'data/products.live.json'), JSON.stringify(out, null, 2));
console.log('Price data refreshed:', out.lastRefresh);
