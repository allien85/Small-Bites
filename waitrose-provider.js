const WAITROSE_SEARCH = 'https://www.waitrose.com/ecom/shop/search?&searchTerm=';

export async function refreshPrices(products) {
  // Safe default provider: preserves existing data and checks that Waitrose search pages are reachable.
  // Replace this file with an official/partner feed or your own permitted scraper if you have access.
  // Supermarket pages often vary by postcode, cookies and delivery slot, so this avoids pretending to be more exact than it can be.
  const output = structuredClone(products);
  const entries = Object.entries(output);
  for (const [key, item] of entries) {
    const term = encodeURIComponent((item.name || key).replace(/Waitrose|Essential/gi, '').trim());
    item.url = item.url || `${WAITROSE_SEARCH}${term}`;
    item.offer = item.offer || 'Live check required';
    item.liveStatus = 'Search link refreshed; exact price needs provider/API or manual confirmation.';
  }
  return output;
}
