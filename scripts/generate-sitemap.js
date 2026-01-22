
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://invest-navi.com';
const TARGET_FILE = path.join(__dirname, '../public/sitemap.xml');

// Static routes from App.tsx (manually curated list based on analysis)
const staticRoutes = [
    '/',
    '/top2',
    '/basics',
    '/stocks',
    '/nisa',
    '/investment-trust',
    '/crypto',
    '/tools-detail',
    '/comparison',
    '/crypto-comparison',
    '/fx-comparison',
    '/securities-comparison',
    '/guide/financial-analysis',
    '/tools',
    '/tools/compound-interest',
    '/tools/saving-calculator',
    '/tools/risk-assessment',
    '/tools/stock-return',
    '/tools/fund-return',
    '/tools/crypto-return',
    '/tools/fx-calculator',
    '/tools/portfolio-analysis',
    '/risk-diagnostic',
    '/articles/ml-stock-prediction',
    '/articles/dl-forex-prediction',
    '/articles/ai-portfolio-optimization',
    '/articles',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/legal',
    '/contact',
    '/company',
    // Specific Comparison Routes
    '/fx/dmm-fx',
    '/stocks/dmm-stock',
    '/fx/matsui-fx',
    '/fx/sbi-fx',
    '/fx/gaitame',
    '/fx/ig',
    '/fx/rakuten',
    '/fx/gmo-click',
    '/fx/min-fx',
    '/fx/hirose',
    '/fx/gmo-gaika',
    '/fx/mufg-e-smart',
    '/securities/sbi',
    '/securities/rakuten',
    '/securities/monex',
    '/securities/ig',
    '/securities/matsui',
    '/securities/dmm',
    '/securities/au-kabucom',
    '/securities/gmo-click',
    '/securities/sbi-pro',
    '/securities/rakuten-pro',
    '/securities/monex-pro',
    '/crypto/gmo-coin',
    '/crypto/dmm-bitcoin',
    '/crypto/bitflyer',
    '/crypto/coincheck',
    '/crypto/liquid-by-quoine',
    '/crypto/binance',
    '/crypto/bybit',
    '/crypto/coinbase',
    '/crypto/kraken',
    '/crypto/kucoin',
    '/crypto/gemini',
    '/crypto/bitstamp',
    '/crypto/bitfinex',
    '/crypto/huobi',
    '/crypto/okx',
    '/crypto/ftx',
    '/crypto/bitbank',
    '/crypto/sbi-vc-trade',
    '/crypto/bitpoint',
    '/crypto/binance-japan',
    '/crypto/bittrade',
    '/crypto/rakuten-wallet',
    '/crypto/line-bitmax',
    '/crypto/bitget',
    '/demo/rorze-stock',
    '/screener',
    '/chart'
];

// Helper to extract IDs using regex
const extractIds = (filePath, regex) => {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const ids = [];
        let match;
        while ((match = regex.exec(content)) !== null) {
            ids.push(match[1]);
        }
        return ids;
    } catch (error) {
        console.warn(`Warning: Could not read file ${filePath}:`, error.message);
        return [];
    }
};

const getDynamicRoutes = () => {
    const routes = [];

    // Extract Article IDs
    const articlesPath = path.join(__dirname, '../src/pages/Articles.tsx');
    // Regex to match id: "..." in the articles array
    const articleIds = extractIds(articlesPath, /id:\s*"([^"]+)"/g);
    articleIds.forEach(id => {
        // Check if it's likely an article ID (heuristic)
        if (id && !staticRoutes.some(r => r.includes(id))) {
            // Based on Articles.tsx, individual articles are at /articles/:id IN THEORY but 
            // checked App.tsx: <Route path="/articles/:id" element={<ArticleDetail />} />
            // AND GuideDetail seems to handle /guide/:id.
            // Looking at Articles.tsx content, it seems mixed. 
            // Some are guides, some are articles.
            // Let's assume typical usage based on App.tsx:
            // /articles/:id and /guide/:id

            // Current Article.tsx has items with type: "article" or "guide" or no type (defaults?)
            // Since we are regexing, we might miss the 'type' association.
            // Simple approach: Add to both or try to differentiate if possible.
            // Actually, let's look at the extracted IDs from the previous file view of Articles.tsx:
            // guide: nisa-beginner, stocks-beginner, investment-trust
            // article: ai-investment-fundamentals
            // others: crypto-trends-2024 (looks like article/guide?), etc.

            // To be safe and comprehensive, we will add them as /guide/:id AND /articles/:id 
            // but wait, duplicate content? 
            // Better approach: Read the file content more robustly or just assume /guide/ for known guides
            // and /articles/ for others.
            // Given the limited regex parsing, I'll add them to /guide/ if they look like the ones we saw,
            // but to be safe, I'll add all found IDs to /guide/:id AND /articles/:id is risky.

            // Let's look at App.tsx again.
            // <Route path="/guide/:id" element={<GuideDetail />} />
            // <Route path="/articles/:id" element={<ArticleDetail />} />

            // In Articles.tsx:
            // type: "guide" -> nisa-beginner, etc.
            // type: "article" -> ai-investment-fundamentals

            // I'll try to extract with type if possible.
        }
    });

    // Re-reading Articles.tsx with a better regex to capture type
    const articlesContent = fs.readFileSync(articlesPath, 'utf-8');
    // Match object blocks to cleaner parse (simple regex for object props)
    // This is a bit complex for regex. 
    // Simplified strategy: 
    // 1. Get all IDs. 
    // 2. Check known static lists or patterns. 

    // Let's just grab all IDs found in Articles.tsx that look like slugs
    const allIdsInArticles = extractIds(articlesPath, /id:\s*"([a-zA-Z0-9-]+)"/g);

    // Also check GuideDetail.tsx for keys in the `articles` object
    const guideDetailPath = path.join(__dirname, '../src/pages/GuideDetail.tsx');
    // Pattern: "key": { ... }
    const guideIds = extractIds(guideDetailPath, /"([a-zA-Z0-9-]+)":\s*{/g);

    // Combine unique IDs
    const uniqueIds = [...new Set([...allIdsInArticles, ...guideIds])];

    uniqueIds.forEach(id => {
        // Heuristic: default to guide, but also add article if it feels right?
        // Actually, sitemap should be precise.
        // Based on my view of GuideDetail.tsx, it handles: nisa-beginner, stocks-beginner, investment-trust, investment-basics
        // Articles.tsx has those + others.

        // I will add /guide/:id for all unique IDs found.
        // And /articles/:id for all unique IDs found.
        // This ensures coverage even if it produces some 404s (which Google will just ignore).
        // However, it's better to be accurate.

        // Let's rely on the lists.
        // If it is in GuideDetail.tsx keys, it is definitely a guide.
        if (guideIds.includes(id)) {
            routes.push(`/guide/${id}`);
        } else {
            // If it's only in Articles.tsx, it might be an article.
            // But Articles.tsx also lists guides.
            // I'll add to /articles/ for those not in GuideDetail keys?
            // Let's just add to both to be safe, or just /articles/ if not confirmed guide.
            // Actually, let's just add to /guide/ and /articles/ for now to ensure we hit the target.
            // A better script would import the data, but we can't easily import TS/React into a partial JS script.

            routes.push(`/articles/${id}`); // Most safely
            if (!guideIds.includes(id)) {
                // If not in guide keys, maybe it's just an article.
            }
        }

        // Also add /guide/${id} if it was in guideIds (already did)
        // Check for overlap: nisa-beginner is in both?
        // In GuideDetail.tsx: "nisa-beginner": { ... }
        // In Articles.tsx: id: "nisa-beginner"
        // So it will be added as /guide/nisa-beginner.
        // Should we also add /articles/nisa-beginner? 
        // App.tsx has both routes. 
        // It's possible the same ID serves content on both (or redirects).
        // I will add both to be comprehensive.
        if (!guideIds.includes(id)) {
            // If we didn't add it as a guide yet, add as guide too?
            // No, keep it simple.
        }
    });

    // Remove duplicates from routes
    return [...new Set(routes)];
};


const generateSitemap = () => {
    const dynamicRoutes = getDynamicRoutes();
    const allRoutes = [...staticRoutes, ...dynamicRoutes];
    const uniqueRoutes = [...new Set(allRoutes)]; // Final dedupe

    const currentDate = new Date().toISOString().split('T')[0];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueRoutes.map(route => `  <url>
    <loc>${BASE_URL}${route.startsWith('/') ? route : '/' + route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(TARGET_FILE, sitemap);
    console.log(`Sitemap generated with ${uniqueRoutes.length} locations at ${TARGET_FILE}`);
};

generateSitemap();
