import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { refreshPrices } from './providers/waitrose-provider.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const app = express();
const port = process.env.PORT || 3000;
const livePath = path.join(root, 'data/products.live.json');
const seedPath = path.join(root, 'data/products.seed.json');

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(root, 'public')));

async function readProductData() {
  try { return JSON.parse(await fs.readFile(livePath, 'utf8')); }
  catch { return JSON.parse(await fs.readFile(seedPath, 'utf8')); }
}

app.get('/api/prices', async (_req, res) => {
  res.json(await readProductData());
});

app.post('/api/prices', async (req, res) => {
  const payload = req.body;
  if (!payload || typeof payload !== 'object' || !payload.products) {
    return res.status(400).json({ error: 'Expected { lastRefresh, products }' });
  }
  await fs.writeFile(livePath, JSON.stringify(payload, null, 2));
  res.json({ ok: true, saved: true });
});

app.post('/api/refresh', async (_req, res) => {
  try {
    const current = await readProductData();
    const refreshed = await refreshPrices(current.products);
    const payload = { lastRefresh: new Date().toISOString(), products: refreshed };
    await fs.writeFile(livePath, JSON.stringify(payload, null, 2));
    res.json(payload);
  } catch (err) {
    res.status(502).json({ error: err.message, hint: 'Use manual JSON import if live provider is blocked.' });
  }
});

app.listen(port, () => console.log(`Meal planner running on http://localhost:${port}`));
